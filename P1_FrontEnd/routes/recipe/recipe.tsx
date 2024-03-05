import { Handlers } from "$fresh/server.ts";
import axios from "npm:axios";
import type { Recipe } from "../../types.ts";

const API_KEY = "znePXGJLOJAxcnwf6Bk39A==vlwOGak6aRup48jM";
const BASE_URL = "https://api.api-ninjas.com/v1/recipe";

export const handler: Handlers<Recipe[]> = {
  GET: async (req, { render }) => {
    const url = new URL(req.url);
    const recipeQuery = url.searchParams.get("recipe");

    if (!recipeQuery) {
      return new Response("Recipe query is missing", { status: 400 });
    }

    const apiUrl = `${BASE_URL}?query=${encodeURIComponent(recipeQuery)}`;

    try {
      const { data } = await axios.get<Recipe[]>(apiUrl, { headers: { "X-Api-Key": API_KEY } });

      if (data.length === 0) {
        return new Response("Tienes la nevera vacía", { status: 404 });
      }

      return render(data);
    } catch (error) {
      console.error(error);
      return new Response("Error fetching recipes", { status: 500 });
    }
  },
};

export default function Page({ data }: { data: Recipe[] }) {
  return (
    <ol className="listarecetas">
      {data.map((recipe, index) => (
        <li key={index} className="recetas">
          <p className="Titulo"><strong>Titulo: </strong>{recipe.title}</p>
          <p className="Ingrediente"><strong>Ingredientes: </strong>
            <ul>
              {recipe.ingredients.split('|').map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </p>
          <p className="Porciones"><strong>Porciones:</strong> {recipe.servings}</p>
          <p className="Instrucciones"><strong>Instrucciones: </strong>
            <ul>
              {recipe.instructions.split('.').filter(instruction => instruction.trim()).map((instruction, i) => (
                <li key={i}>{instruction.trim()}.</li>
              ))}
            </ul>
          </p>
        </li>
      ))}
    </ol>
  );
}
