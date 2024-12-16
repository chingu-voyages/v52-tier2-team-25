## Website Link

https://v52-tier2-team-25.vercel.app/

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Kirk Black: [GitHub](https://github.com/kirkblackjr) / [LinkedIn](https://www.linkedin.com/in/kirk-black-in-tech/)
- Troy: [GitHub](https://github.com/Troyzhenny) / [LinkedIn](https://www.linkedin.com/in/tevin-campbell/)
- Yashwanth: [GitHub](https://github.com/tigeryash) / [LinkedIn](https://www.linkedin.com/in/yashwanth-v-29a88392/)
- Tuyet Nguyen: [GitHub](https://github.com/hongtuyet91) / [LinkedIn](https://www.linkedin.com/in/nguyen-tuyet/)
- Deborah Lyra: [GitHub](https://github.com/DeborahLyra) / [LinkedIn](https://www.linkedin.com/in/deborah-prado-lyra-developer/)

# Solarite - Solar Panel Service Management System

## Overview

Solarite is a web application designed to streamline solar panel services in Los Angeles. The platform connects residents with solar panel service providers, offering installation, maintenance, and removal services through an efficient appointment booking system.

## Features

### For Users

- Account creation and management
- Schedule appointments for:
  - Solar panel installation
  - Maintenance services
  - Solar panel removal/haul-away
- Real-time appointment status tracking
- Address verification within Los Angeles area
- Appointment history view

### For Administrators

- Comprehensive appointment management dashboard
- Optimized daily route planning for service calls
- Real-time appointment status updates
- PDF generation for appointment details
- Appointment filtering and search capabilities

## Technology Stack

- Frontend: React with Vite
- Styling: Tailwind CSS
- Maps & Geocoding: Mapbox
- Authentication & Database: Supabase
- PDF Generation: jsPDF

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- npm or yarn
- Mapbox API key
- Supabase account and credentials

### Installation

1. Clone the repository
2. Install dependencies:
   npm install
3. Create a `.env` file with the following variables:
   VITE_MAPBOX_API_KEY=your_mapbox_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
4. Start the development server:
   npm run dev
