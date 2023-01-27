import { useEffect, useState } from "react";

export function useFetchData(url, page) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    let cancel = false;

    async function fetchData() {
      try {
        setIsLoading(true);

        // params de l'url
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append("skip", (page - 1) * 18);
          queryParam.append("limit", 18);
        }

        const response = await fetch(url + `?${queryParam}`); //equivaut à : `${url}?skip=${(page - 1) * 18}&limit=18`

        if (response.ok && !cancel) {
          const newData = await response.json();
          setData((x) =>
            Array.isArray(newData) ? [...x, ...newData] : [...x, newData]
          );
        }
      } catch (e) {
        console.log("ERREUR");
        setError("Erreur");
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => (cancel = true);
  }, [url, page]);

  return [[data, setData], isLoading, error]; // on a besoin de ces props dans HomePage
}