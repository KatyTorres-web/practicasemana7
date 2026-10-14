import { useState, memo, Profiler } from "react";

const SpiritCard = memo(function SpiritCard({ crystals }) {
  return (
    <article className="spirit-card">
      <div className="spirit-art">🧚🏻‍♀️</div>
      <span className="eyebrow">ESPÍRITU DEL JARDÍN</span>
      <h2>Lumi, la guardiana</h2>
      <p>Los cristales que has reunido iluminan su pequeño mundo mágico.</p>
      <div className="crystal-badge">💎 {crystals} cristales reunidos</div>
    </article>
  );
});

function App() {
  const [crystals, setCrystals] = useState(0);
  const [ambience, setAmbience] = useState(false);

  return (
    <main className={`game ${ambience ? "night" : ""}`}>
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">✦</span>
          <span>cozy quest</span>
        </div>
        <span className="chapter">CAPÍTULO 01 · EL JARDÍN</span>
      </header>

      <section className="hero">
        <span className="eyebrow">TU PEQUEÑO MUNDO MÁGICO</span>
        <h1>
          Un jardín lleno
          <br />
          de <em>maravillas.</em>
        </h1>
        <p>
          Reúne cristales, despierta a los espíritus y descubre la magia que te
          rodea.
        </p>
      </section>

      <section className="game-layout">
        <div className="garden-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ZONA DE EXPLORACIÓN</span>
              <h2>Claro de las luciérnagas</h2>
            </div>
            <span className="weather">☀️ Soleado</span>
          </div>

          <div className="garden-scene">
            <span className="cloud cloud-one">☁️</span>
            <span className="cloud cloud-two">☁️</span>
            <span className="sparkle sparkle-one">✦</span>
            <span className="sparkle sparkle-two">✧</span>
            <span className="tree tree-one">🌳</span>
            <span className="tree tree-two">🌲</span>
            <span className="flower flower-one">🌼</span>
            <span className="flower flower-two">🌷</span>
            <span className="flower flower-three">🍄</span>

            <button
              className="crystal crystal-one"
              onClick={() => setCrystals((c) => c + 1)}
              aria-label="Recolectar cristal azul"
              title="Recolectar cristal azul"
            >
              💎
            </button>
            <button
              className="crystal crystal-two"
              onClick={() => setCrystals((c) => c + 1)}
              aria-label="Recolectar cristal violeta"
              title="Recolectar cristal violeta"
            >
              🔮
            </button>

            <div className="scene-caption">
              <span>✦</span> Explora y recolecta tesoros
            </div>
          </div>

          <div className="action-row">
            <div className="resource">
              <span className="resource-icon">💎</span>
              <div>
                <strong>{crystals}</strong>
                <small>Cristales</small>
              </div>
            </div>

            <button
              className="primary-button"
              onClick={() => setCrystals((c) => c + 1)}
            >
              + Recolectar cristal
            </button>
          </div>
        </div>

        <aside className="side-panel">
          <Profiler id="SpiritCard" onRender={() => {}}>
            <SpiritCard crystals={crystals} />
          </Profiler>

          <div className="experiment-card">
            <span className="eyebrow">LABORATORIO REACT</span>
            <h3>Prueba el renderizado</h3>
            <p>
              Cambia el ambiente. El componente de Lumi está optimizado con{" "}
              <code>memo</code>.
            </p>
            <button
              className="secondary-button"
              onClick={() => setAmbience((value) => !value)}
            >
              {ambience ? "☀️ Volver al día" : "🌙 Cambiar ambiente"}
            </button>
            <div className="status-line">
              <span className="status-dot" />
              Estado local: {ambience ? "Noche mágica" : "Día luminoso"}
            </div>
          </div>
        </aside>
      </section>

      <footer className="footer">
        <span>COZY QUEST</span>
        <span>Una aventura construida con React ✦</span>
      </footer>
    </main>
  );
}

export default App;
