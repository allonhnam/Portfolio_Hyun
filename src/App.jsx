import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useState } from "react";

import { Dock, Home, Navbar, Spotlight, Welcome } from "#components";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Trash, Experience } from "#windows";
import useWindowStore from "#store/window";

gsap.registerPlugin(Draggable);

const App = () => {
  const { windows, closeWindow } = useWindowStore();
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;

      // Let an open popover/Spotlight consume Escape first; a second press
      // then closes the window behind it.
      if (document.querySelector(".popover, .spotlight-overlay")) return;

      const openWindows = Object.entries(windows).filter(([, win]) => win.isOpen);
      if (openWindows.length === 0) return;

      const [topKey] = openWindows.reduce((top, current) =>
        current[1].zIndex > top[1].zIndex ? current : top,
      );

      closeWindow(topKey);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windows, closeWindow]);

  const handleDesktopMouseDown = (e) => {
    if (e.button !== 0) return;

    // Pressing on a folder manages its own selection state (see Home.jsx's
    // Draggable onPress) so group-drag isn't wiped out before it can start.
    if (!e.target.closest(".folder")) {
      document
        .querySelectorAll(".folder.selected")
        .forEach((folder) => folder.classList.remove("selected"));
    }

    if (e.target.closest("nav, #dock, .window, .folder, button, a, input")) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const folders = document.querySelectorAll(".folder");

    const handleMouseMove = (moveEvent) => {
      const x = Math.min(startX, moveEvent.clientX);
      const y = Math.min(startY, moveEvent.clientY);
      const width = Math.abs(moveEvent.clientX - startX);
      const height = Math.abs(moveEvent.clientY - startY);

      setSelection({ x, y, width, height });

      folders.forEach((folder) => {
        const box = folder.getBoundingClientRect();
        const intersects =
          box.left < x + width &&
          box.left + box.width > x &&
          box.top < y + height &&
          box.top + box.height > y;

        folder.classList.toggle("selected", intersects);
      });
    };

    const handleMouseUp = () => {
      setSelection(null);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <main onMouseDown={handleDesktopMouseDown}>
        <Navbar />
        <Welcome />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
        <Trash />
        <Experience />
        <Home />
        <Spotlight />

        {selection && (
          <div
            className="selection-box"
            style={{
              left: selection.x,
              top: selection.y,
              width: selection.width,
              height: selection.height,
            }}
          />
        )}
    </main>
  )
}

export default App;
