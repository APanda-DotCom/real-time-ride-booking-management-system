const axios = require("axios");
const captainModel = require('../models/captain.model');

/* =================== GET COORDINATES =================== */
const getCoordinates = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;

    if (!apikey) {
        throw new Error('GOOGLE_MAPS_API key is not set');
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
        throw new Error(`Geocode failed: ${response.data.status}`);
    }

    const location = response.data.results[0].geometry.location;

    return {
        lat: location.lat,
        lng: location.lng
    };
};

/* =================== DISTANCE & TIME =================== */
const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('origin and destination are required');
    }

    const apikey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;

    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
        throw new Error('Distance Matrix API failed');
    }

    const element = response.data.rows[0].elements[0];

    if (element.status === 'ZERO_RESULTS') {
        throw new Error('No routes found');
    }

    return element;
};

/* =================== AUTO SUGGESTION =================== */
const getAutoSuggestion = async (input) => {
    if (!input) {
        throw new Error('input is required');
    }

    const apikey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apikey}`;

    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
        throw new Error('Unable to fetch suggestions');
    }

    return response.data.predictions;
};

/* =================== CAPTAIN IN RADIUS =================== */
const getCaptainInTheRadius = async (lat, lng, radius) => {
    if (!lat || !lng || !radius) {
        throw new Error("lat, lng and radius are required");
    }

    return await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371]
            }
        }
    });
};

/* ✅ EXPORT EVERYTHING PROPERLY */
module.exports = {
    getCoordinates,
    getDistanceTime,
    getAutoSuggestion,
    getCaptainInTheRadius
};
