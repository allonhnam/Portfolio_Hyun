import WindowsControls from "#components/WindowsControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Image = () => {
  const { windows } = useWindowStore();
  const { data } = windows.imgfile;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowsControls target="imgfile" />
        <p>{name}</p>
      </div>

      <div className="preview">
        <img src={imageUrl} alt={name} />
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
