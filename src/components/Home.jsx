import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const projects = locations.work?.children ?? [];

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const handleOpenProjectFilder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    };

  useGSAP(() => {
    const folders = document.querySelectorAll(".folder");
    const instances = [];

    folders.forEach((el) => {
      const [instance] = Draggable.create(el, {
        cursor: false,
        onPress() {
          if (!el.classList.contains("selected")) {
            document
              .querySelectorAll(".folder.selected")
              .forEach((folder) => folder.classList.remove("selected"));
          }
        },
        onDrag() {
          if (!el.classList.contains("selected")) return;

          document.querySelectorAll(".folder.selected").forEach((other) => {
            if (other === el) return;
            gsap.set(other, { x: `+=${this.deltaX}`, y: `+=${this.deltaY}` });
          });
        },
      });

      instances.push(instance);
    });

    return () => instances.forEach((instance) => instance.kill());
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFilder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
