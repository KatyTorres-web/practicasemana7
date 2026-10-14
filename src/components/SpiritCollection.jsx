import { memo, useCallback, useMemo, useRef, useState } from "react";

import useFetch from "../hooks/useFetch";
import { useTheme } from "../context/ThemeContext.jsx";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=12";
const QUEST_TARGET = 5;

const SpiritTile = memo(function SpiritTile({
  spirit,
  isDiscovered,
  onDiscover,
}) {
  return (
    <article className={`spirit-tile ${isDiscovered ? "is-discovered" : ""}`}>
      <div className="spirit-tile-art">
        {spirit.image ? (
          <img src={spirit.image} alt={spirit.name} loading="lazy" />
        ) : (
          <span>✨</span>
        )}

        <span className="spirit-number">
          #{String(spirit.id).padStart(3, "0")}
        </span>

        {isDiscovered && <span className="discovery-stamp">✦</span>}
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
        className={isDiscovered ? "discovered-button" : "discover-button"}
        onClick={() => onDiscover(spirit)}
        disabled={isDiscovered}
      >
        {isDiscovered ? "✓ Descubierto" : "✦ Descubrir · +10"}
      </button>
    </article>
  );
});

function SpiritCollection() {
  const [retry, setRetry] = useState(0);
  const [discovered, setDiscovered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showOnlyNew, setShowOnlyNew] = useState(false);

  const searchRef = useRef(null);
  const { isNight, toggleTheme } = useTheme();

  const requestUrl = retry === 0 ? API_URL : `${API_URL}&retry=${retry}`;

  const { data, loading, error } = useFetch(requestUrl);

  // Referencia estable: actualizamos el estado con una función
  // para no depender del valor anterior de discovered.
  const discoverSpirit = useCallback((spirit) => {
    setDiscovered((current) => {
      if (current.includes(spirit.id)) return current;
      return [...current, spirit.id];
    });
  }, []);

  const types = useMemo(() => {
    if (!data) return [];

    return [...new Set(data.flatMap((spirit) => spirit.types))].sort();
  }, [data]);

  const filteredSpirits = useMemo(() => {
    if (!data) return [];

    return data.filter((spirit) => {
      const matchesName = spirit.name.includes(search.trim().toLowerCase());

      const matchesType =
        selectedType === "all" || spirit.types.includes(selectedType);

      const matchesDiscovery = !showOnlyNew || !discovered.includes(spirit.id);

      return matchesName && matchesType && matchesDiscovery;
    });
  }, [data, search, selectedType, showOnlyNew, discovered]);

  const progress = useMemo(
    () => Math.min((discovered.length / QUEST_TARGET) * 100, 100),
    [discovered.length],
  );

  const crystals = discovered.length * 10;
  const questCompleted = discovered.length >= QUEST_TARGET;

  function resetFilters() {
    setSearch("");
    setSelectedType("all");
    setShowOnlyNew(false);
  }

  if (loading) {
    return (
      <section className="collection-section">
        <div className="portal-banner">
          <span className="portal-orb">✦</span>
          <span className="eyebrow">PORTAL MÁGICO</span>
          <h2>El portal está despertando...</h2>
          <p>Buscando criaturas para tu aventura.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="collection-section">
        <div className="portal-banner">
          <span className="portal-orb">✧</span>
          <h2>El portal está cerrado</h2>
          <p>No pudimos traer las criaturas al jardín.</p>
          <button
            className="primary-button"
            onClick={() => setRetry((value) => value + 1)}
          >
            Volver a intentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="collection-section">
      <div className="portal-banner">
        <div className="portal-copy">
          <span className="eyebrow">✦ EXPEDICIÓN DEL JARDÍN</span>
          <h2>Despierta la magia.</h2>
          <p>
            Descubre criaturas, gana cristales y completa la misión del portal.
          </p>

          <button
            className="portal-button"
            onClick={() => searchRef.current?.focus()}
          >
            Explorar criaturas <span>↗</span>
          </button>
        </div>

        <div className="portal-visual" aria-hidden="true">
          <div className="portal-ring portal-ring-back" />
          <div className="portal-ring portal-ring-front" />
          <span className="portal-star star-a">✦</span>
          <span className="portal-star star-b">✧</span>
          <span className="portal-star star-c">✦</span>
          <span className="portal-creature">🧚🏻‍♀️</span>
        </div>

        <div className="portal-total">
          <span>💎</span>
          <div>
            <strong>{crystals}</strong>
            <small>cristales mágicos</small>
          </div>
        </div>
      </div>

      <div className="quest-card">
        <div className="quest-topline">
          <span className="quest-icon">🏆</span>
          <div className="quest-copy">
            <span className="eyebrow">MISIÓN PRINCIPAL</span>
            <h3>
              {questCompleted ? "¡Portal dominado!" : "Habitantes del jardín"}
            </h3>
            <p>
              {questCompleted
                ? "Has completado la misión y ganado 50 cristales."
                : "Descubre 5 criaturas para completar la misión."}
            </p>
          </div>
          <strong className="quest-count">
            {Math.min(discovered.length, QUEST_TARGET)}/{QUEST_TARGET}
          </strong>
        </div>

        <div
          className="quest-progress-track"
          role="progressbar"
          aria-label="Progreso de la misión"
          aria-valuenow={Math.min(discovered.length, QUEST_TARGET)}
          aria-valuemin={0}
          aria-valuemax={QUEST_TARGET}
        >
          <div
            className="quest-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="quest-bottomline">
          <span>
            {questCompleted
              ? "✦ Misión completada"
              : "Recompensa por criatura: +10 cristales"}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="collection-heading">
        <div>
          <span className="eyebrow">BESTIARIO MÁGICO</span>
          <h2>Tu colección de espíritus</h2>
          <p>Descubre criaturas y encuentra tus favoritas.</p>
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

      <div className="collection-controls">
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar una criatura..."
            aria-label="Buscar criatura por nombre"
          />
          <button
            type="button"
            className="focus-button"
            onClick={() => searchRef.current?.focus()}
          >
            Enfocar
          </button>
        </div>

        <label className="filter-control">
          <span>Tipo</span>
          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="all">Todos los tipos</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <button
          className={`new-filter ${showOnlyNew ? "active" : ""}`}
          onClick={() => setShowOnlyNew((value) => !value)}
          aria-pressed={showOnlyNew}
        >
          {showOnlyNew ? "✦ Solo nuevas: sí" : "✧ Solo nuevas"}
        </button>
      </div>

      <p className="results-caption">
        Mostrando {filteredSpirits.length} de {data.length} criaturas
      </p>

      {filteredSpirits.length === 0 ? (
        <div className="loading-state">
          <span className="loading-orb">✧</span>
          <p>No hay criaturas que coincidan con esos filtros.</p>
          <button className="secondary-button" onClick={resetFilters}>
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="spirit-grid">
          {filteredSpirits.map((spirit) => (
            <SpiritTile
              key={spirit.id}
              spirit={spirit}
              isDiscovered={discovered.includes(spirit.id)}
              onDiscover={discoverSpirit}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SpiritCollection;
