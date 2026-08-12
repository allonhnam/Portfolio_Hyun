import useWindowStore from "#store/window.js";
import { X, Minus, Maximize2 } from "lucide-react";

const WindowsControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id="window-controls" className="group/controls">
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => closeWindow(target)}
      >
        <X className="control-icon" strokeWidth={3} />
      </button>

      <button
        type="button"
        className="minimize"
        aria-label="Minimize"
        onClick={() => minimizeWindow(target)}
      >
        <Minus className="control-icon" strokeWidth={3} />
      </button>

      <button
        type="button"
        className="maximize"
        aria-label="Maximize"
        onClick={() => maximizeWindow(target)}
      >
        <Maximize2 className="control-icon" strokeWidth={3} />
      </button>
    </div>
  );
};

export default WindowsControls;
