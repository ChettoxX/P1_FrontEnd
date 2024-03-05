import { Handlers } from "$fresh/server.ts";
import axios from "npm:axios";
import type { Joke } from "../../types.ts";

const API_KEY = "znePXGJLOJAxcnwf6Bk39A==vlwOGak6aRup48jM";
const BASE_URL = "https://api.api-ninjas.com/v1/jokes";

export const handler: Handlers<Joke[]> = {
  GET: async (_req, { params, render }) => {
    let { jokes } = params;
    jokes = Math.min(Math.max(jokes, 1), 10);

    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }

    const url = `${BASE_URL}?limit=${jokes}`;
    try {
      const { data } = await axios.get<Joke[]>(url, { headers: { "X-Api-Key": API_KEY } });

      if (!data.length) {
        return new Response("No tiene gracia", { status: 404 });
      }

      return render(data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

export default function Page({ data }: { data: Joke[] }) {
  return (
    <>
      {data.map(({ joke }, index) => (
        <div key={index} class="joke">
          <p><strong>Joke:</strong><i> {joke}</i></p>
        </div>
      ))}
      <a href="/">Volver al formulario de búsqueda</a>
    </>
  );
}
