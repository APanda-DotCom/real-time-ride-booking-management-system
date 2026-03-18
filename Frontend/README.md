# Real-Time Ride-Booking Management System - Frontend

A modern React frontend for the Real-Time Ride-Booking Management System ride-sharing application with user and captain authentication, real-time ride booking, and location management.

## Features

 User & Captain authentication with JWT  
 Ride booking and fare calculation  
 Location search and suggestions  
 Real-time UI updates with context API  
 Protected routes and role-based navigation  
 Responsive design with Tailwind CSS  
 GSAP animations for smooth UX  

## Tech Stack

- **Framework**: React 19.2.0
- **Routing**: React Router 7.11.0
- **Styling**: Tailwind CSS 3.4.19
- **HTTP Client**: axios 1.13.2
- **Animations**: GSAP 3.14.2
- **Icons**: react-icons 5.5.0
- **Build Tool**: Vite 7.2.4

## Prerequisites

- Node.js v20.19.0+
- Backend API running on http://localhost:4000
- npm or yarn

## Setup & Installation

### 1. Navigate to Frontend
```bash
cd Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
VITE_BASE_URL=http://localhost:4000
```

## Running the Frontend

### Development mode
```bash
npm run dev
```
Opens on http://localhost:5173 (or next available port)

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Project Structure

```
Frontend/
├── src/
│   ├── assets/              # Images, logos, gifs
│   ├── components/          # Reusable UI components
│   ├── context/             # Global state management
│   ├── pages/               # Full page components
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Pages & Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | Start | - | Landing page |
| `/login` | UserLogin | - | User login |
| `/signup` | UserSignup | - | User registration |
| `/home` | Home | ✅ User | Book rides, search locations |
| `/riding` | Riding | ✅ User | Ongoing ride info |
| `/user/logout` | UserLogout | ✅ User | Logout user |
| `/captain-login` | CaptainLogin | - | Captain login |
| `/captain-signup` | CaptainSignup | - | Captain registration |
| `/captain-home` | CaptainHome | ✅ Captain | Captain dashboard |
| `/captain-riding` | CaptainRiding | ✅ Captain | Active ride |

## Context & State

**UserContext**: Manages user login state, fullname, email  
**CaptainContext**: Manages captain login state, vehicle info  

Token stored in `localStorage` with key `token`

## Key Components

- **LocationPanel**: Location suggestions display
- **VehiclePanel**: Vehicle type selection with fares
- **ConfirmRidePopUp**: Ride confirmation dialog
- **LookingForDriver**: Ride search animation
- **WaitingForDriver**: Driver waiting status

## API Integration

All requests include:
```
Authorization: Bearer <token>
```

Main endpoints:
- User auth: `/users/register`, `/users/login`, `/users/logout`
- Captain auth: `/captains/register`, `/captains/login`, `/captains/logout`
- Maps: `/maps/get-suggestions`
- Rides: `/rides/get-fare`, `/rides/create`

## Authentication

Protected routes redirect to login if token missing.  
Token expires after 24 hours.

## Styling

- Tailwind CSS utility-first approach
- Custom CSS for animations
- Mobile-responsive design
- Dark mode support

## Build & Deploy

```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, or similar
```

## Environment Variables

```env
VITE_BASE_URL=http://localhost:4000
```

## License

ISC
