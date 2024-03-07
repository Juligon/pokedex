# Pokedex

Welcome to the Pokedex App! This is a Pokemon application that allows users to view, filter, and get details about Pokemon. The project is developed with Node.js and Express in the backend and Ionic React in the frontend.

## Features

- View a list of Pokemon
- Filter Pokemon by name and ID
- View details of each Pokemon, including Type, Experience, Abilities, Height, and Weight

## API Endpoints

The application uses the following API endpoints:

- Get all Pokemon: `https://pokemonapi.up.railway.app/api/pokemons/`
- Get a specific Pokemon by name or ID: `https://pokemonapi.up.railway.app/api/pokemons/{name or id}`

## Deployment

The app is deployed and accessible at [https://thepokedexapp.vercel.app](https://thepokedexapp.vercel.app).

## Running the Backend

To run the backend, make sure you have Node.js installed. Navigate to the backend folder and run:

cd api
npm install
npm start

The backend server will be running at http://localhost:3001.

## Running the Frontend:

To run the frontend, make sure you have Node.js and Ionic installed. Navigate to the frontend folder and run:

cd client
npm install
ionic serve

The frontend will be accessible at http://localhost:8100 by default.


