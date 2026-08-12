import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import clsx from "clsx";

import { useLayoutEffect, useRef } from "react";

const MIN_WIDTH = 320;
const MIN_HEIGHT = 200;

const RESIZE_HANDLES = [
  { dir: "n", className: "resize-n cursor-ns-resize" },
  { dir: "s", className: "resize-s cursor-ns-resize" },
  { dir: "e", className: "resize-e cursor-ew-resize" },
  { dir: "w", className: "resize-w cursor-ew-resize" },
  { dir: "ne", className: "resize-ne cursor-nesw-resize" },
  { dir: "sw", className: "resize-sw cursor-nesw-resize" },
  { dir: "nw", className: "resize-nw cursor-nwse-resize" },
  { dir: "se", className: "resize-se cursor-nwse-resize" },
];

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const visible = isOpen && !isMinimized;

    useGSAP(() => {
        const el = ref.current;
        if(!el || !visible) return;

        el.style.display = "block";

        gsap.fromTo(el,
            { scale: 0.8, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
    }, [visible]);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

       const header = el.querySelector("#window-header");

       const [instance] = Draggable.create(el, {
         trigger: header ?? el,
         type: "left, top",
         cursor: false,
         onPress: () => focusWindow(windowKey),
       })

       return () => instance.kill();
    }, [])

    useLayoutEffect(() => {
        const el = ref.current;
        if(!el) return;
        el.style.display = visible ? "block" : "none";
    }, [visible]);

    const startResize = (e, dir) => {
      e.stopPropagation();
      e.preventDefault();

      const el = ref.current;
      if (!el || isMaximized) return;

      focusWindow(windowKey);

      const rect = el.getBoundingClientRect();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = rect.width;
      const startHeight = rect.height;
      const startLeft = rect.left;
      const startTop = rect.top;

      const cursor = window.getComputedStyle(e.currentTarget).cursor;
      document.body.style.cursor = cursor;

      const handleMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        if (dir.includes("e")) {
          el.style.width = `${Math.max(MIN_WIDTH, startWidth + dx)}px`;
        }
        if (dir.includes("s")) {
          el.style.height = `${Math.max(MIN_HEIGHT, startHeight + dy)}px`;
        }
        if (dir.includes("w")) {
          const newWidth = Math.max(MIN_WIDTH, startWidth - dx);
          el.style.width = `${newWidth}px`;
          el.style.left = `${startLeft + (startWidth - newWidth)}px`;
        }
        if (dir.includes("n")) {
          const newHeight = Math.max(MIN_HEIGHT, startHeight - dy);
          el.style.height = `${newHeight}px`;
          el.style.top = `${startTop + (startHeight - newHeight)}px`;
        }
      };

      const handleMouseUp = () => {
        document.body.style.cursor = "";
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={clsx("absolute window", isMaximized && "maximized")}
      >
        <Component {...props} />

        {!isMaximized &&
          RESIZE_HANDLES.map(({ dir, className }) => (
            <div
              key={dir}
              className={clsx("resize-handle", className)}
              onMouseDown={(e) => startResize(e, dir)}
            />
          ))}

      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
