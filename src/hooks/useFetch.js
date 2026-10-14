import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const list = await response.json();

        const details = await Promise.all(
          list.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url, {
              signal: controller.signal,
            });

            if (!detailResponse.ok) {
              throw new Error("No se pudo cargar una criatura");
            }

            const detail = await detailResponse.json();

            return {
              id: detail.id,
              name: detail.name,
              image:
                detail.sprites.other?.["official-artwork"]?.front_default ??
                detail.sprites.front_default,
              types: detail.types.map((item) => item.type.name),
            };
          }),
        );

        if (!controller.signal.aborted) {
          setData(details);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error al cargar los datos");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
