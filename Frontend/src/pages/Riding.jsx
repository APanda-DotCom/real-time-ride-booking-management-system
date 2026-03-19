import React, { useContext, useEffect } from "react";
import LocationGif from "../assets/Location.gif";
import Logo from "../assets/uber-seeklogo.svg";
import UberCar from "../assets/car.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { TfiHome } from "react-icons/tfi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();


  useEffect(() => {
    const handleRideEnded = () => {
      navigate("/home");
    };

    socket.on("ride-ended", handleRideEnded);
    return () => socket.off("ride-ended", handleRideEnded);
  }, [socket, navigate]);

  // 🎬 Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 💳 Handle Payment
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token"); // USER token
      console.log("PAYMENT BUTTON CLICKED");
      if (!token) {
        alert("User not logged in");
        return;
      }

      if (!ride?._id) {
        alert("Ride ID missing");
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      // 1️⃣ Create order (backend)
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/create-order`,
        { rideId: ride._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2️⃣ Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: ride.fare * 100,
        currency: "INR",
        order_id: data.orderId,
        name: "Ride Go",
        description: "Ride Payment",

        handler: async function (response) {
          console.log("Razorpay FULL RESPONSE:", response);

          if (
            !response.razorpay_order_id ||
            !response.razorpay_payment_id ||
            !response.razorpay_signature
          ) {
            alert("Payment verification failed");
            return;
          }

          try {
            // Verify payment with backend
            await axios.post(
              `${import.meta.env.VITE_BASE_URL}/payments/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // ✅ NAVIGATE USER TO PAYMENT SUCCESS PAGE
            navigate("/payment-success", {
              state: {
                amount: ride.fare,
                rideId: ride._id,
              },
            });
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            alert("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-4 top-4 h-12 w-12 
                   flex items-center justify-center 
                   rounded-full bg-slate-900 text-white 
                   shadow-lg shadow-black/30
                   transition-all duration-300
                   hover:scale-110 hover:bg-slate-700"
      >
        <TfiHome className="text-xl" />
      </Link>

      <div className="h-1/2">
        <LiveTracking />

        <img
          className="w-10 absolute right-20 top-5"
          src={Logo}
          alt="Uber Logo"
        />

        <div className="h-1/2 p-4">
          <div className="flex items-center justify-between">
            <img className="h-24" src={UberCar} alt="uber-car-logo" />

            <div className="text-right">
              <h2 className="text-lg font-medium">
                {(ride?.captain?.fullname?.firstname ?? "") +
                  " " +
                  (ride?.captain?.fullname?.lastname ?? "")}
              </h2>

              <h3 className="text-xl font-semibold -mt-1 -mb-1">
                {ride?.captain?.vehicle?.plate || "N/A"}
              </h3>

              <p className="text-sm text-gray-600">
                Maruti Suzuki Wagnor
              </p>
            </div>
          </div>

          <div className="w-full mt-2">
            <div className="flex items-center gap-3 p-2 border-b-2 border-gray-200">
              <MdOutlineLocationOn className="text-xl text-red-600" />
              <div>
                <h3 className="text-base font-medium">Drop Location</h3>
                <p className="text-xs text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <GiCash className="text-xl text-green-600" />
              <div>
                <h3 className="text-base font-medium">
                  ₹{ride?.fare}
                </h3>
                <p className="text-xs text-gray-600">
                  Online Payment
                </p>
              </div>
            </div>
          </div>

          {/* 💳 PAYMENT BUTTON */}
          <button
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700 
                       text-white font-semibold py-2.5 
                       rounded-lg mt-5 
                       transition-all duration-200 active:scale-95"
          >
            Make a payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;