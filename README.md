# GreenLoop

A circular economy platform connecting waste pickers and recyclers.

## Features
- **Waste Pickers**: Register ID, find nearby recyclers, verify identity.
- **Recyclers**: List services, manage materials/prices, toggle capacity status.
- **Maps**: Google Maps integration for location services.
- **Matching**: Distance-based filtering using Haversine formula.

## Setup Instructions

### Prerequisites
1. Node.js & npm
2. SQLite (or PostgreSQL for production)

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Google Maps (Required for Geocoding & Maps)
GOOGLE_MAPS_API_KEY="your_api_key_here"

# Uploads (Optional, defaults to local disk)
UPLOAD_DIR="./uploads"
```

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Database Setup:
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Run Migrations
   npm run db:migrate
   
   # Seed Database
   npm run db:seed
   ```

3. Run Development Server:
   ```bash
   npm run dev
   ```

### Deployment
This project is configured for Replit. For other platforms, ensure you build the frontend and serve it alongside the Express backend.

```bash
npm run build
npm start
```
