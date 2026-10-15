function Garden({ crystals, onCollectCrystal }) {
  return (
    <section className="garden-panel">
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
          onClick={onCollectCrystal}
          aria-label="Recolectar cristal azul"
          title="Recolectar cristal azul"
        >
          💎
        </button>

        <button
          className="crystal crystal-two"
          onClick={onCollectCrystal}
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

        <button className="primary-button" onClick={onCollectCrystal}>
          + Recolectar cristal
        </button>
      </div>
    </section>
  );
}

export default Garden;
