import { useEffect, useState } from "react";
import { getRecipes } from "../apis";

export function useFetchRecipes(page) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    let cancel = false;

    async function fetchRecipes() {
      try {
        setIsLoading(true);

        // params de l'url (link API infos in the Readme file)
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append("skip", (page - 1) * 18);
          queryParam.append("limit", 18);
          queryParam.append("sort", "createdAt:-1");
        }
        const fetchedRecipes = await getRecipes(queryParam);
        if (!cancel) {
          // ajoute les recettes récupérées à la liste existante des recettes
          setRecipes((x) => [...x, ...fetchedRecipes]);
        }
      } catch (e) {
        setError("Erreur");
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }

    fetchRecipes();

    return () => (cancel = true);
  }, [page]);

  return [[recipes, setRecipes], isLoading, error]; // on a besoin de ces props dans HomePage
}
