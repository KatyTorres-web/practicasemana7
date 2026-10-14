import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useTheme } from "../context/ThemeContext.jsx";

//API URL para obtener los primeros 12 Pokémon de la PokeAPI
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=12";

function SpiritCollection() {
  const [retry, setRetry] = useState(0);
  const [discovered, setDiscovered] = useState([]);
  const { isNight, toggleTheme } = useTheme();

  const requestUrl = retry === 0 ? API_URL : `${API_URL}&retry=${retry}`;

  const { data, loading, error } = useFetch(requestUrl);

  function discoverSpirit(spirit) {
    setDiscovered((current) => {
      if (current.includes(spirit.id)) return current;
      return [...current, spirit.id];
    });
  }

  if (loading) {
    return (
      <section className="collection-section">
        <span className="eyebrow">BESTIARIO MÁGICO</span>
        <h2>Buscando espíritus...</h2>
        <div className="loading-state">
          <span className="loading-orb">✦</span>
          <p>Las criaturas están llegando al jardín.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="collection-section">
        <span className="eyebrow">BESTIARIO MÁGICO</span>
        <h2>El portal está cerrado</h2>
        <p>No pudimos encontrar a los espíritus.</p>
        <button
          className="primary-button"
          onClick={() => setRetry((value) => value + 1)}
        >
          Volver a intentar
        </button>
      </section>
    );
  }

  return (
    <section className="collection-section">
      <div className="collection-heading">
        <div>
          <span className="eyebrow">BESTIARIO MÁGICO</span>
          <h2>Espíritus por descubrir</h2>
          <p>Explora las criaturas que han aparecido en tu mundo.</p>
        </div>
        <div className="collection-tools">
          <span className="collection-count">
            ✨ {discovered.length} descubiertos
          </span>

          <button
            className="secondary-button theme-button"
            onClick={toggleTheme}
          >
            {isNight ? "☀️ Día" : "🌙 Noche"}
          </button>
        </div>
      </div>

      <div className="spirit-grid">
        {data.map((spirit) => {
          const isDiscovered = discovered.includes(spirit.id);

          return (
            <article className="spirit-tile" key={spirit.id}>
              <div className="spirit-tile-art">
                {spirit.image ? (
                  <img src={spirit.image} alt={spirit.name} loading="lazy" />
                ) : (
                  <span>✨</span>
                )}
                <span className="spirit-number">
                  #{String(spirit.id).padStart(3, "0")}
                </span>
              </div>

              <h3>{spirit.name}</h3>

              <div className="type-list">
                {spirit.types.map((type) => (
                  <span className="type-chip" key={type}>
                    {type}
                  </span>
                ))}
              </div>

              <button
                className={
                  isDiscovered ? "discovered-button" : "discover-button"
                }
                onClick={() => discoverSpirit(spirit)}
                disabled={isDiscovered}
              >
                {isDiscovered ? "✓ Descubierto" : "✦ Descubrir"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SpiritCollection;
