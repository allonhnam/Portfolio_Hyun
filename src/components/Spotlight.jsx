import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { dockApps, navLinks } from "#constants";

import useWindowStore from "#store/window";
import useSpotlightStore from "#store/spotlight";

const SEARCHABLE_APPS = [
  ...navLinks.map(({ name, type }) => ({ name, windowKey: type })),
  ...dockApps
    .filter((app) => app.canOpen)
    .map((app) => ({ name: app.name, windowKey: app.id })),
];

const Spotlight = () => {
  const { isOpen, close } = useSpotlightStore();
  const { openWindow } = useWindowStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const handlePointerDown = (e) => {
      if (e.target.closest(".spotlight-overlay, .icon-hover, .icon")) return;
      close();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const results = SEARCHABLE_APPS.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase()),
  );

  const openResult = (windowKey) => {
    openWindow(windowKey);
    close();
  };

  return (
    <div className="spotlight-overlay">
      <div className="spotlight">
        <SearchIcon size={20} className="text-gray-400" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Spotlight Search"
        />
      </div>

      {query && (
        <ul className="spotlight-results">
          {results.length === 0 && <li className="empty">No results</li>}
          {results.map((result) => (
            <li key={result.windowKey} onClick={() => openResult(result.windowKey)}>
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Spotlight;
