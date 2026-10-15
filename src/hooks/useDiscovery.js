import { useCallback, useMemo, useState } from "react";

const QUEST_TARGET = 5;
const CRYSTALS_PER_DISCOVERY = 10;

function useDiscovery() {
  const [discovered, setDiscovered] = useState([]);

  const discoverSpirit = useCallback((spirit) => {
    setDiscovered((current) => {
      if (current.includes(spirit.id)) {
        return current;
      }

      return [...current, spirit.id];
    });
  }, []);

  const crystals = useMemo(
    () => discovered.length * CRYSTALS_PER_DISCOVERY,
    [discovered.length],
  );

  const progress = useMemo(
    () => Math.min((discovered.length / QUEST_TARGET) * 100, 100),
    [discovered.length],
  );

  const questCompleted = discovered.length >= QUEST_TARGET;

  return {
    discovered,
    discoverSpirit,
    crystals,
    progress,
    questCompleted,
    questTarget: QUEST_TARGET,
    crystalsPerDiscovery: CRYSTALS_PER_DISCOVERY,
  };
}

export default useDiscovery;
