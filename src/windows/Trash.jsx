import WindowsControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations } from "#constants";
import useWindowStore from "#store/window";

const Trash = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div id="window-header">
        <WindowsControls target="trash" />
        <h2>Archive</h2>
      </div>

      <ul className="content">
        {locations.trash.children.map((item) => (
          <li
            key={item.id}
            className={item.position}
            onClick={() => openWindow("imgfile", item)}
          >
            <img src={item.icon} alt={item.name} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

const TrashWindow = WindowWrapper(Trash, "trash");

export default TrashWindow;
