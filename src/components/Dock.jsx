import { useRef } from "react";
import { Tooltip } from "react-tooltip";

import gsap from "gsap";

import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";
import {
  ArchiveRestore,
  ContactRound,
  FolderOpen,
  Images,
  Newspaper,
  SquareTerminal,
} from "lucide-react";

const APP_ICONS = {
  finder: FolderOpen,
  safari: Newspaper,
  photos: Images,
  contact: ContactRound,
  terminal: SquareTerminal,
  trash: ArchiveRestore,
};

const Dock = () => {
  const { openWindow, closeWindow, minimizeWindow, focusWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if(!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    return () => icons.forEach((icon) => gsap.killTweensOf(icon));

  });


  const bounceIcon = (icon) => {
    if (!icon) return;

    icon.dataset.bouncing = "true";

    gsap.timeline({
      onComplete: () => delete icon.dataset.bouncing,
    })
      .to(icon, { y: -7, scale: 0.94, duration: 0.14, ease: "power2.out" })
      .to(icon, { y: 0, scale: 1, duration: 0.28, ease: "back.out(2)" });
  };

  const toggleApp = (app, icon) => {
    if(!app.canOpen) return;

    const window = windows[app.id];

    if (!window) {
      console.error(`Window not found for app: ${app.id}`);
      return
    }

    if (window.isOpen && window.isMinimized) {
      minimizeWindow(app.id);
      focusWindow(app.id);
    } else if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
      bounceIcon(icon);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, canOpen }) => {
          const AppIcon = APP_ICONS[id] ?? FolderOpen;

          return (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={(e) => toggleApp({ id, canOpen }, e.currentTarget)}
            >

                <AppIcon aria-hidden="true" />
            </button>
          </div>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
