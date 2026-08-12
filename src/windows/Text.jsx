import WindowsControls from "#components/WindowsControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const { data } = windows.txtfile;

  if (!data) return null;

  const { name, image, subtitle, description = [] } = data;

  return (
    <>
      <div id="window-header">
        <WindowsControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="textfile">
        {image && <img src={image} alt={name} />}
        {subtitle && <p className="subtitle">{subtitle}</p>}

        <div className="description">
          {description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
