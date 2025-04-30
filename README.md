# ExploreRoute

ExploreRoute is a smart web application that generates personalized tour itineraries based on your location, time constraints, and preferred attractions.

## Project Authors
- hh752
- wl758
- gg523

## Quick Start

### Running with Docker

```bash
# Build and run the application using Docker Compose
docker-compose up -d

# The application will be available at http://localhost:80
```

### Running without Docker

```bash
# Install dependencies
npm install

# Start the development server
npm start

# The application will be available at http://localhost:3000
```

## Development

### Project Structure

```
exploreroute/
│
├── public/                 # Static files
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
│
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── AboutPage.js    # Component for the About page
│   │   └── Header.js       # Header component
│   ├── App.js              # Main App component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
│
├── .dockerignore           # Files to ignore in Docker build
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # NPM package configuration
└── README.md               # Project documentation
```

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Key Features

- Interactive map for exploring attractions
- Location-based recommendations
- Automatic tour generation based on your preferences
- User authentication to save favorite locations and tours
