import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Check, Wifi } from "lucide-react";
import { navIcons, navLinks, locations } from "#constants";
import clsx from "clsx";

import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import useSpotlightStore from "#store/spotlight";

const ABOUT_ME_FILE = locations.about.children.find(
  (item) => item.name === "about-me.txt",
);

const getIconName = (img) => img.split("/").pop().replace(".svg", "");

const Navbar = () => {
  const { openWindow, windows } = useWindowStore();
  const { toggleTheme } = useThemeStore();
  const spotlight = useSpotlightStore();
  const [wifiOpen, setWifiOpen] = useState(false);

  useEffect(() => {
    if (!wifiOpen) return;

    const handlePointerDown = (e) => {
      if (e.target.closest(".popover, .icon-hover")) return;
      setWifiOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setWifiOpen(false);
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wifiOpen]);

  const handleIconClick = (icon) => {
    const name = getIconName(icon.img);

    if (name === "mode") {
      toggleTheme();
      return;
    }

    if (name === "wifi") {
      setWifiOpen((prev) => !prev);
      return;
    }

    if (name === "search") {
      spotlight.toggle();
      return;
    }

    if (name === "user") {
      openWindow("txtfile", ABOUT_ME_FILE);
    }
  };

  return (
    <nav>
      <div>
        <img src="images/logo.svg" alt="logo" className="dark:invert" />
        <p className="font-bold">Hyun Nam</p>

        <ul className="nav-links">
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              className={clsx(windows[type]?.isOpen && "active")}
              onClick={() => openWindow(type)}
            >
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
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
                    ? windows.txtfile?.isOpen
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
