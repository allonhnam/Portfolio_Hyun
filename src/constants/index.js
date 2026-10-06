  const navLinks = [
    {
      id: 1,
      name: "Projects",
      type: "finder",
    },
    {
      id: 2,
      name: "Experience",
      type: "experience",
    },
    {
      id: 3,
      name: "Contact",
      type: "contact",
    },
    {
      id: 4,
      name: "Resume",
      type: "resume",
    },
  ];
  
  const navIcons = [
    {
      id: 1,
      img: "/icons/wifi.svg",
    },
    {
      id: 2,
      img: "/icons/search.svg",
    },
    {
      id: 3,
      img: "/icons/user.svg",
    },
    {
      id: 4,
      img: "/icons/mode.svg",
    },
  ];
  
  const dockApps = [
    {
      id: "finder",
      name: "Portfolio", // was "Finder"
      icon: "finder.png",
      canOpen: true,
    },
    // {
    //   id: "safari",
    //   name: "Articles", // was "Safari"
    //   icon: "safari.png",
    //   canOpen: true,
    // },
    // {
    //   id: "photos",
    //   name: "Gallery", // was "Photos"
    //   icon: "photos.png",
    //   canOpen: true,
    // },
    {
      id: "contact",
      name: "Contact", // or "Get in touch"
      icon: "contact.png",
      canOpen: true,
    },
    {
      id: "terminal",
      name: "Skills", // was "Terminal"
      icon: "terminal.png",
      canOpen: true,
    },
    {
      id: "trash",
      name: "Archive", // was "Trash"
      icon: "trash.png",
      canOpen: true,
    },
  ];
  
  const blogPosts = [
  ];
  
  const techStack = [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "TypeScript/JavaScript"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo"],
    },
    {
      category: "Styling",
      items: ["Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Java"],
    },
    {
      category: "Database",
      items: ["MongoDB", "PostgreSQL", "ETL", "AWS"],
    },
    {
      category: "Dev Tools",
      items: ["Git", "GitHub", "Docker", "Claude AI", "OpenAI"],
    },
  ];
  
  const socials = [
    {
      id: 1,
      text: "Github",
      icon: "/icons/github.svg",
      bg: "#f4656b",
      link: "https://github.com/allonhnam",
    },
    {
      id: 4,
      text: "LinkedIn",
      icon: "/icons/linkedin.svg",
      bg: "#05b6f6",
      link: "https://www.linkedin.com/in/allonnam/",
    },
  ];
  
  const photosLinks = [
    {
      id: 1,
      icon: "/icons/gicon1.svg",
      title: "Library",
    },
    {
      id: 2,
      icon: "/icons/gicon2.svg",
      title: "Memories",
    },
    {
      id: 3,
      icon: "/icons/file.svg",
      title: "Places",
    },
    {
      id: 4,
      icon: "/icons/gicon4.svg",
      title: "People",
    },
    {
      id: 5,
      icon: "/icons/gicon5.svg",
      title: "Favorites",
    },
  ];
  
  const gallery = [
    {
      id: 1,
      img: "/images/gal1.png",
    },
    {
      id: 2,
      img: "/images/gal2.png",
    },
    {
      id: 3,
      img: "/images/gal3.png",
    },
    {
      id: 4,
      img: "/images/gal4.png",
    },
  ];
  
  export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
  };
  
  const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
      // ▶ Project 1
      {
        id: 5,
        name: "Ubliss Medical Aesthetics",
        icon: "/images/folder.png",
        kind: "folder",
        position: "top-10 left-5", // icon position inside Finder
        windowPosition: "top-10 left-5", // desktop icon position
        children: [
          {
            id: 1,
            name: "Ubliss Project.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-5 left-10",
            description: [
              "UBLISS Medical Aesthetics is an award winning practice in Queens, New York that blends advanced K Beauty treatments with a warm, personal touch.",
              "As the founding engineer, I redesigned the customer journey so patients can explore treatments, compare services, view before-and-after results, and book appointments without ever picking up the phone.",
              "I connected the site to the practice's booking platform and built a responsive, multilingual experience for its diverse New York audience, covering everything from promotions and memberships to patient education and aftercare.",
              "The platform highlights treatments like Ultherapy, microneedling, dermal fillers, and neurotoxin injections. The new experience helped increase completed bookings by 37 percent.",
              "In 2025, the site reached 9,913 visits and grew traffic by 260 percent year over year, with a strong mix of mobile and desktop visitors.",
              "The product is built around speed, clarity, accessibility, and trust, since for many visitors the website is their first interaction with the clinic.",
            ],
          },
          {
            id: 2,
            name: "ublissny.com",
            icon: "/images/safari.png",
            kind: "file",
            fileType: "url",
            href: "https://www.ublissny.com/",
            position: "top-5 left-52",
          },
          {
            id: 3,
            name: "ubliss-booking.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-5 right-10",
            imageUrl: "/images/project1.png",
          },
          {
            id: 4,
            name: "ubliss-homepage.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-10",
            imageUrl: "/images/ubliss-homepage.png",
          },
          {
            id: 5,
            name: "ubliss-services.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-52",
            imageUrl: "/images/ubliss-services.png",
          },
          {
            id: 6,
            name: "ubliss-analytics.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 right-10",
            imageUrl: "/images/ubliss-analytics.png",
          },
        ],
      },
  
      // ▶ Project 2
      {
        id: 6,
        name: "AI Coach",
        icon: "/images/folder.png",
        kind: "folder",
        position: "top-52 right-80",
        windowPosition: "top-40 left-5",
        children: [
          {
            id: 1,
            name: "AI Coach Project.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-5 right-10",
            description: [
              "AI Coach is a conversational learning platform that pairs you with a custom AI tutor and walks you through a real lesson using natural, back and forth voice conversation.",
              "Instead of static tutorials, you pick a subject, a voice, and a personality, then talk through topics like Next.js, quantum computing, or derivatives just like you would with a real tutor.",
              "Think of it like having a patient tutor on call, one who remembers your recent sessions and picks up right where you left off.",
              "It's built with React.js, Node.js, and Clerk for secure authentication, and it helped raise full session completion by 33 percent.",
            ],
          },
          {
            id: 2,
            name: "ai-coach.com",
            icon: "/images/safari.png",
            kind: "file",
            fileType: "url",
            href: "https://ai-coach-dusky.vercel.app/",
            position: "top-20 left-20",
          },
          {
            id: 4,
            name: "ai-coach.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/project-2.png",
          },
          {
            id: 5,
            name: "AI Coach GitHub",
            icon: "/icons/github.svg",
            kind: "file",
            fileType: "url",
            href: "https://github.com/allonhnam/ai_coach",
            position: "top-60 right-20",
          },
        ],
      },
  
      // ▶ Project 3
      {
        id: 7,
        name: "AI Interviewer",
        icon: "/images/folder.png",
        kind: "folder",
        position: "top-10 left-80",
        windowPosition: "top-72 left-5",
        children: [
          {
            id: 1,
            name: "AI Interviewer Project.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-5 left-10",
            description: [
              "ID: test@gmail.com",
              "PW: testtest",
              "AI Interviewer is an AI-powered mock interview platform that helps candidates practice realistic interview questions and receive instant feedback.",
              "You can create a personalized interview for a specific role, choose the interview type, and rehearse your answers in a natural voice conversation.",
              "Past sessions stay organized in one place, making it easy to revisit feedback, track scores, and sharpen your responses before the real interview.",
              "It's built with Next.js and TypeScript, with Firebase powering the application's data and authentication workflows.",
            ],
          },
          {
            id: 2,
            name: "ai-interviewer.app",
            icon: "/images/safari.png",
            kind: "file",
            fileType: "url",
            href: "https://ai-interviewer-one-eta.vercel.app/",
            position: "top-10 right-20",
          },
          {
            id: 3,
            name: "ai-interviewer-session.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 right-80",
            imageUrl: "/images/project-3.png",
          },
          {
            id: 4,
            name: "ai-interviewer-home.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/ai-interviewer.png",
          },
          {
            id: 5,
            name: "AI Interviewer GitHub",
            icon: "/icons/github.svg",
            kind: "file",
            fileType: "url",
            href: "https://github.com/allonhnam/ai_interviewer",
            position: "top-60 right-20",
          },
        ],
      },
    ],
  };
  
  const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
      {
        id: 1,
        name: "me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-10 left-5",
        imageUrl: "/images/Hyun.png",
      },
      {
        id: 2,
        name: "casual-me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-28 right-72",
        imageUrl: "/images/Hyun-2.jpeg",
      },
      {
        id: 3,
        name: "conference-me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-52 left-80",
        imageUrl: "/images/Hyun-3.png",
      },
      {
        id: 4,
        name: "about-me.txt",
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        position: "top-60 left-5",
        subtitle: "Pleasure to meet you!",
        image: "/images/Hyun.png",
        description: [
          "Hey! I’m Hyun 👋, a founding engineer who loves turning early stage ideas into products people actually use.",
          "I work across the stack with React, Node.js, and Next.js, and lately I’ve been researching how to turn messy unorganized data into clean structured output using the lowest tier LLM that can still match a much bigger model’s results.",
          "Before software I was a financial analyst crunching numbers, so I care just as much about business impact as I do about clean code.",
          "Outside of work you’ll find me finishing my master’s in Computer Science at Georgia Tech, hunting down good coffee, or tinkering on side projects late into the night 😅",
        ],
      },
    ],
  };
  
  const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
      {
        id: 1,
        name: "Resume.pdf",
        icon: "/images/pdf.png",
        kind: "file",
        fileType: "pdf",
        // you can add `href` if you want to open a hosted resume
        // href: "/your/resume/path.pdf",
      },
    ],
  };
  
  const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
      {
        id: 1,
        name: "trash1.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-10 left-10",
        imageUrl: "/images/trash-1.png",
      },
    ],
  };
  
  export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
  };
  
  const INITIAL_Z_INDEX = 1000;
  
  const DEFAULT_WINDOW_STATE = {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  };

  const WINDOW_CONFIG = {
    finder: { ...DEFAULT_WINDOW_STATE },
    contact: { ...DEFAULT_WINDOW_STATE },
    resume: { ...DEFAULT_WINDOW_STATE },
    safari: { ...DEFAULT_WINDOW_STATE },
    photos: { ...DEFAULT_WINDOW_STATE },
    terminal: { ...DEFAULT_WINDOW_STATE },
    experience: { ...DEFAULT_WINDOW_STATE },
    trash: { ...DEFAULT_WINDOW_STATE },
    txtfile: { ...DEFAULT_WINDOW_STATE },
    imgfile: { ...DEFAULT_WINDOW_STATE },
  };
  
  export { INITIAL_Z_INDEX, WINDOW_CONFIG };
