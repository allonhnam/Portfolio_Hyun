import WindowsControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import { locations } from "#constants";
import { Search } from "lucide-react";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window";
import useSpotlightStore from "#store/spotlight";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const { toggle: toggleSpotlight } = useSpotlightStore();
  const contentRef = useRef(null);
  const [marquee, setMarquee] = useState(null);

  const openItem = (item) => {
    if(item.fileType === 'pdf') return openWindow("resume");
    if(item.kind === 'folder') return setActiveLocation(item);
    if(['fig', 'url'].includes(item.fileType) && item.href)
        return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item)
  };

  useGSAP(() => {
    const container = contentRef.current;
    if (!container || !activeLocation) return;

    const elements = container.querySelectorAll(".finder-item");
    const instances = [];

    elements.forEach((el, index) => {
      const item = activeLocation.children[index];

      const [instance] = Draggable.create(el, {
        bounds: container,
        cursor: false,
        onPress() {
          if (!el.classList.contains("selected")) {
            container
              .querySelectorAll(".finder-item.selected")
              .forEach((other) => other.classList.remove("selected"));
          }
          el.classList.add("selected");
        },
        onDrag() {
          if (!el.classList.contains("selected")) return;

          container.querySelectorAll(".finder-item.selected").forEach((other) => {
            if (other === el) return;
            gsap.set(other, { x: `+=${this.deltaX}`, y: `+=${this.deltaY}` });
          });
        },
        onClick: () => openItem(item),
      });

      instances.push(instance);
    });

    return () => instances.forEach((instance) => instance.kill());
  }, [activeLocation]);

  const handleContentMouseDown = (e) => {
    if (e.button !== 0) return;
    if (e.target.closest(".finder-item")) return;

    const container = contentRef.current;

    container
      .querySelectorAll(".finder-item.selected")
      .forEach((item) => item.classList.remove("selected"));

    const containerRect = container.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const items = container.querySelectorAll(".finder-item");

    const handleMouseMove = (moveEvent) => {
      const x = Math.min(startX, moveEvent.clientX);
      const y = Math.min(startY, moveEvent.clientY);
      const width = Math.abs(moveEvent.clientX - startX);
      const height = Math.abs(moveEvent.clientY - startY);

      setMarquee({
        left: x - containerRect.left,
        top: y - containerRect.top,
        width,
        height,
      });

      items.forEach((item) => {
        const box = item.getBoundingClientRect();
        const intersects =
          box.left < x + width &&
          box.left + box.width > x &&
          box.top < y + height &&
          box.top + box.height > y;

        item.classList.toggle("selected", intersects);
      });
    };

    const handleMouseUp = () => {
      setMarquee(null);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowsControls target="finder" />
        <Search className="icon" onClick={toggleSpotlight} />
      </div>

      <div className="flex h-full">
        <div className="sidebar">
          <ul>{renderList("Favorites", Object.values(locations))}</ul>
          <ul>{renderList("My Projects", locations.work.children)}</ul>
        </div>

        <ul className="content" ref={contentRef} onMouseDown={handleContentMouseDown}>
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={clsx("finder-item", item.position)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}

          {marquee && (
            <div
              className="selection-box"
              style={{ position: "absolute", ...marquee }}
            />
          )}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
