import { Handlers } from "$fresh/server.ts";
import axios from "npm:axios";
import type { Airport } from "../../types.ts";

const API_KEY = "znePXGJLOJAxcnwf6Bk39A==vlwOGak6aRup48jM";
const BASE_URL = "https://api.api-ninjas.com/v1/airports";

export const handler: Handlers<Airport[]> = {
  GET: async (_req, { params, render }) => {
    const { airport } = params;

    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }

    const url = `${BASE_URL}?name=${airport}`;
    try {
      const { data } = await axios.get<Airport[]>(url, { headers: { "X-Api-Key": API_KEY } });

      if (!data.length) {
        return new Response("Qué es un avión? Estamos en el 1367", { status: 404 });
      }

      return render(data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

export default function Page({ data }: { data: Airport[] }) {
  return (
    <>
      {data.map((airport, index) => (
        <div key={index} class="airport">
          <h1>{airport.name}</h1>
          <h2>Country, city and region: {airport.country}, {airport.city}, {airport.region}</h2>
          <p><strong>Icao:</strong> <i>{airport.icao}</i></p>
          <p><strong>Iata:</strong> <i>{airport.iata}</i></p>
          <p><strong>Elevation_ft:</strong> <i>{airport.elevation_ft}</i></p>
          <p><strong>Latitude:</strong> <i>{airport.latitude}</i></p>
          <p><strong>Longitude:</strong> <i>{airport.longitude}</i></p>
          <p><strong>Timezone:</strong> <i>{airport.timezone}</i></p>
          <hr />
        </div>
      ))}
      <a href="/">Back</a>
    </>
  );
}
