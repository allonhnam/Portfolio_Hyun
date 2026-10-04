import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ArchiveRestore, Check, ContactRound, FolderOpen, Power, Search, SquareTerminal, UserRound, Wifi } from "lucide-react";
import { navIcons, navLinks, locations } from "#constants";
import clsx from "clsx";

import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import useSpotlightStore from "#store/spotlight";

const ABOUT_ME_FILE = locations.about.children.find(
  (item) => item.name === "about-me.txt",
);

const getIconName = (img) => img.split("/").pop().replace(".svg", "");

const START_APPS = [
  { name: "Portfolio", windowKey: "finder", Icon: FolderOpen },
  { name: "Contact", windowKey: "contact", Icon: ContactRound },
  { name: "Skills", windowKey: "terminal", Icon: SquareTerminal },
  { name: "Archive", windowKey: "trash", Icon: ArchiveRestore },
];

const Navbar = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const { toggleTheme } = useThemeStore();
  const spotlight = useSpotlightStore();
  const [wifiOpen, setWifiOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const userOpen =
    windows.txtfile?.isOpen &&
    windows.txtfile?.data?.name === ABOUT_ME_FILE?.name;

  const closeUserMenu = () => {
    if (userOpen) closeWindow("txtfile");
  };

  useEffect(() => {
    if (!wifiOpen && !startOpen) return;

    const handlePointerDown = (e) => {
      if (e.target.closest(".popover, .start-menu, .start-button, .icon-hover")) return;
      setWifiOpen(false);
      setStartOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setWifiOpen(false);
        setStartOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wifiOpen, startOpen]);

  const handleStartClick = () => {
    const willOpen = !startOpen;
    setWifiOpen(false);
    spotlight.close();
    closeUserMenu();
    setStartOpen(willOpen);
  };

  const openStartApp = (windowKey, data = null) => {
    openWindow(windowKey, data);
    setStartOpen(false);
  };

  const handleIconClick = (icon) => {
    const name = getIconName(icon.img);

    if (name === "mode") {
      setWifiOpen(false);
      setStartOpen(false);
      spotlight.close();
      closeUserMenu();
      toggleTheme();
      return;
    }

    if (name === "wifi") {
      const willOpen = !wifiOpen;
      setStartOpen(false);
      spotlight.close();
      closeUserMenu();
      setWifiOpen(willOpen);
      return;
    }

    if (name === "search") {
      const willOpen = !spotlight.isOpen;
      setWifiOpen(false);
      setStartOpen(false);
      closeUserMenu();
      if (willOpen) spotlight.toggle();
      else spotlight.close();
      return;
    }

    if (name === "user") {
      setWifiOpen(false);
      setStartOpen(false);
      spotlight.close();
      if (userOpen) {
        closeWindow("txtfile");
        return;
      }
      openWindow("txtfile", ABOUT_ME_FILE);
    }
  };

  return (
    <nav>
      <div>
        <button type="button" className={clsx("start-button", startOpen && "active")} aria-label="Start" aria-expanded={startOpen} onClick={handleStartClick}>
          <img src="/icons/windows.svg" alt="" className="brand-logo" />
        </button>
        <img src="/favicon.png" alt="Hyun Nam" className="profile-logo" />

        <ul className="nav-links">
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              className={clsx(windows[type]?.isOpen && "active")}
              onClick={() => { setStartOpen(false); openWindow(type); }}
            >
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      {startOpen && (
        <section className="start-menu" aria-label="Start menu">
          <button type="button" className="start-search" onClick={() => { setStartOpen(false); spotlight.toggle(); }}>
            <Search size={18} />
            <span>Type here to search</span>
          </button>
          <div className="start-section-heading"><h2>Pinned</h2><span>All apps</span></div>
          <div className="start-apps">
            {START_APPS.map(({ name, windowKey, Icon }) => (
              <button type="button" key={windowKey} className={clsx("start-app", windows[windowKey]?.isOpen && "open")} onClick={() => openStartApp(windowKey)}>
                <span className="start-app-icon"><Icon /></span>
                <span>{name}</span>
              </button>
            ))}
          </div>
          <div className="start-recommended">
            <h2>Recommended</h2>
            <p>Explore Hyun’s projects, experience, and engineering work.</p>
          </div>
          <footer className="start-footer">
            <button type="button" onClick={() => openStartApp("txtfile", ABOUT_ME_FILE)}>
              <span className="start-user"><UserRound /></span><span>Hyun Nam</span>
            </button>
            <button type="button" className="power-button" aria-label="Power"><Power /></button>
          </footer>
        </section>
      )}
      <div>
        <ul>
          {navIcons.map((icon) => {
            const name = getIconName(icon.img);
            const isActive =
              name === "wifi"
                ? wifiOpen
                : name === "search"
                  ? spotlight.isOpen
                  : name === "user"
                    ? userOpen
                    : false;

            return (
              <li key={icon.id} className="relative">
                <span
                  className={clsx("icon-hover", isActive && "active")}
                  onClick={() => handleIconClick(icon)}
                >
                  <img src={icon.img} alt={icon.img} />
                </span>

                {wifiOpen && name === "wifi" && (
                  <div className="popover">
                    <p className="popover-title">Wi-Fi</p>
                    <div className="popover-item">
                      <Wifi size={16} />
                      <span>Hyun's Wifi</span>
                      <Check size={14} className="ml-auto text-blue-500" />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mmA")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
