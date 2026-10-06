import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const projects = locations.work?.children ?? [];
const desktopItems = [
  ...projects,
  {
    id: "experience-shortcut",
    name: "Experience",
    icon: "/images/folder.png",
    kind: "shortcut",
    windowKey: "experience",
    windowPosition: "top-104 left-5",
  },
];

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const handleOpenProjectFilder = (event, project) => {
        // A drag ends with a browser click event. Ignore that click so the
        // shortcut stays where it was dropped instead of opening a window.
        if (event.currentTarget.dataset.wasDragged === "true") return;

        if (project.windowKey) {
          openWindow(project.windowKey);
          return;
        }
        setActiveLocation(project);
        openWindow("finder");
    };

  useGSAP(() => {
    const folders = document.querySelectorAll(".folder");
    const instances = [];

    folders.forEach((el) => {
      const [instance] = Draggable.create(el, {
        cursor: false,
        type: "x,y",
        minimumMovement: 4,
        onPress() {
          el.dataset.wasDragged = "false";
          if (!el.classList.contains("selected")) {
            document
              .querySelectorAll(".folder.selected")
              .forEach((folder) => folder.classList.remove("selected"));
          }
        },
        onDragStart() {
          el.dataset.wasDragged = "true";
        },
        onDrag() {
          if (!el.classList.contains("selected")) return;

          document.querySelectorAll(".folder.selected").forEach((other) => {
            if (other === el) return;
            gsap.set(other, { x: `+=${this.deltaX}`, y: `+=${this.deltaY}` });
          });
        },
        onDragEnd() {
          // React's click handler runs immediately after pointer release.
          // Clear the flag on the next event-loop turn.
          window.setTimeout(() => {
            el.dataset.wasDragged = "false";
          }, 0);
        },
      });

      instances.push(instance);
    });

    return () => instances.forEach((instance) => instance.kill());
  }, []);

  return (
    <section id="home">
      <ul>
        {desktopItems.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={(event) => handleOpenProjectFilder(event, project)}
          >
            <img src={project.icon || "/images/folder.png"} alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
