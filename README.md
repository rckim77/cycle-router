# Cycle Router

A static browser tool for planning bike rides in and around New York City from natural-language text or voice input.

## Features

- Describe a route in natural language, such as "a scenic waterfront loop", "to Central Park", or "loop around Central Park, down the Hudson River Greenway, across Brooklyn Bridge, then back home".
- No baked-in start address; enter one per ride or save your own default start in the browser (stored locally only).
- Choose a target range: `0-10 miles`, `10-20 miles`, or `20+ miles`.
- Use browser voice input where `SpeechRecognition` is supported.
- View the generated ride on an OpenStreetMap-powered Leaflet map.
- Save routes locally in the browser for later.
- Share the current route through the Web Share API or a copied URL hash.

## Live demo

**https://rckim77.github.io/cycle-router/**

Hosted on [GitHub Pages](https://pages.github.com/) from the `main` branch (static files at repo root).

## Run locally

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

You can also open `index.html` directly, but some browsers limit voice input and clipboard sharing from local files.

The map, Leaflet assets, geocoding, and bike routing load from public services, so an internet connection is required.

## Routing Note

This is a lightweight client-side planning tool. It uses OpenStreetMap bike routing for the drawn route, snaps waypoints against the [NYC Open Data bike route network](https://data.cityofnewyork.us/dataset/New-York-City-Bike-Routes/mzxg-pwib), and recognizes common NYC cycling landmarks locally (including curated corridors such as LIC → Rockaway via Ocean Parkway and the Cross Bay Bridge). For unknown places, it uses Photon geocoding. Verify current street conditions, closures, turn restrictions, and bike-lane availability before riding.
