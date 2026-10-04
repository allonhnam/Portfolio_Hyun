import WindowsControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { useEffect, useState } from "react";

const MIN_IMAGE_WIDTH = 150;
const MAX_IMAGE_WIDTH = 2400;

const Image = () => {
  const { windows } = useWindowStore();
  const { data } = windows.imgfile;
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(null);
  }, [data?.imageUrl]);

  if (!data) return null;

  const { name, imageUrl } = data;

  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const wrap = e.currentTarget.parentElement;
    const startX = e.clientX;
    const startWidth = wrap.getBoundingClientRect().width;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      setWidth(
        Math.min(MAX_IMAGE_WIDTH, Math.max(MIN_IMAGE_WIDTH, startWidth + dx)),
      );
    };

    const handleMouseUp = () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    document.body.style.cursor = "nwse-resize";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div id="window-header">
        <WindowsControls target="imgfile" />
        <p>{name}</p>
      </div>

      <div className="preview">
        <div className="media-resize-wrap" style={width ? { width } : undefined}>
          <img src={imageUrl} alt={name} />
          <div className="media-resize-handle" onMouseDown={startResize} />
        </div>
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
