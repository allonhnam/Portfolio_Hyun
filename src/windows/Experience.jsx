import { useState } from "react";
import { ExternalLink } from "lucide-react";

import WindowsControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";

const experiences = [
  {
    id: "bnsf",
    company: "BNSF Railway - Berkshire Hathaway",
    initials: "BNSF",
    role: "Software Engineer Intern",
    context: "AI document processing and freight technology",
    period: "Jun 2026 - Aug 2026 · Remote",
    color: "#f97316",
    url: "https://www.bnsf.com/",
    summary:
      "Built reliable document-processing infrastructure for a large-scale freight network, connecting Spring Boot services, AI extraction, PostgreSQL audit trails, and Databricks-ready data pipelines.",
    highlights: [
      "Reduced AI processing costs by 80% by routing document extraction through a lower-cost model without sacrificing output structure.",
      "Converted PDFs containing up to 8,000 tokens into clean text before extraction, avoiding higher-cost image-based parsing.",
      "Architected a PostgreSQL audit and status layer that cut document trace time by an estimated 90%.",
      "Built idempotent Spring Boot intake logic that eliminated an estimated 10% duplicate-record rate before the ML pipeline.",
      "Delivered continuously updated structured data to Databricks, removing roughly 8-12 hours of manual preparation each week.",
    ],
    skills: ["Java", "Spring Boot", "PostgreSQL", "Databricks", "AI/LLM", "Document Processing"],
  },
  {
    id: "ubliss",
    company: "Ubliss Medical Aesthetics",
    initials: "UB",
    role: "Software Engineer",
    context: "Healthcare technology and digital operations",
    period: "Apr 2025 - Apr 2026 · New York, NY",
    color: "#b88922",
    url: "https://www.ublissny.com/",
    summary:
      "Owned the end-to-end product lifecycle across design, engineering, marketing, analytics, and clinical operations, building customer-facing experiences and internal systems that made the practice easier to discover, book, and operate.",
    highlights: [
      "Shipped product improvements that contributed to a 46% increase in company revenue within one year.",
      "Built an LLM-powered support experience and reduced typical response time from hours to under a minute.",
      "Redesigned booking and checkout flows, increasing completed bookings by 37% while reducing operational costs by 32%.",
      "Created ETL pipelines and dashboards covering more than 3,000 monthly active users and their booking activity.",
    ],
    skills: ["Product Engineering", "LLM Integration", "ETL", "Analytics", "Healthcare Systems"],
  },
  {
    id: "saleo",
    company: "Saleo",
    initials: "S",
    role: "Software Engineer - Contract",
    context: "Enterprise demo experience platform",
    period: "Jan 2025 - Apr 2025 · Alpharetta, GA",
    color: "#7c3aed",
    url: "https://saleo.io/",
    summary:
      "Improved application performance and platform reliability for an enterprise demo-experience product used to transform live software into tailored sales demonstrations.",
    highlights: [
      "Implemented optimized text search and replacement workflows, increasing usability and application performance by 30%.",
      "Overhauled backend infrastructure and reduced response latency by 10%.",
      "Strengthened CI/CD workflows for reliable, zero-downtime deployments supporting enterprise customers.",
    ],
    skills: ["Backend Engineering", "Algorithms", "Performance", "CI/CD", "Enterprise SaaS"],
  },
  {
    id: "flexport",
    company: "Flexport",
    initials: "F",
    role: "Financial Operation Analyst",
    context: "Global freight forwarding and supply chain",
    period: "Jul 2021 - Jun 2023 · New York, NY",
    color: "#2563eb",
    url: "https://www.flexport.com/",
    summary:
      "Used financial, shipment, and operational data to support decisions across a technology-driven global logistics platform, partnering closely with both operations and software engineering teams.",
    highlights: [
      "Analyzed more than $1 million in financial transactions using SQL and data visualization.",
      "Supplied freight data that helped engineering improve the internal quoting system by over 20%.",
      "Performed daily data cleaning and reporting with 99% accuracy across time and location data.",
    ],
    skills: ["SQL", "Financial Operations", "Data Visualization", "Freight Data", "Cross-functional Work"],
  },
];

const Experience = () => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const active = experiences.find((experience) => experience.id === activeId);

  return (
    <>
      <div id="window-header">
        <h2>Work Experience</h2>
        <WindowsControls target="experience" />
      </div>

      <div className="experience-layout">
        <aside className="experience-tabs" aria-label="Companies">
          <p className="eyebrow">Companies</p>
          {experiences.map((experience) => (
            <button
              type="button"
              key={experience.id}
              className={activeId === experience.id ? "active" : ""}
              onClick={() => setActiveId(experience.id)}
            >
              <span className="company-mark" style={{ backgroundColor: experience.color }}>
                {experience.initials}
              </span>
              <span>
                <strong>{experience.company}</strong>
                <small>{experience.role}</small>
              </span>
            </button>
          ))}
        </aside>

        <article className="experience-detail">
          <div className="experience-hero">
            <span className="company-mark large" style={{ backgroundColor: active.color }}>
              {active.initials}
            </span>
            <div>
              <p className="eyebrow">{active.context}</p>
              <h1>{active.company}</h1>
              <p className="role-line">{active.role} <span>{active.period}</span></p>
            </div>
            <a href={active.url} target="_blank" rel="noopener noreferrer">
              Visit company <ExternalLink />
            </a>
          </div>

          <p className="experience-summary">{active.summary}</p>

          <section>
            <h2>Impact & responsibilities</h2>
            <ul className="experience-highlights">
              {active.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </section>

          <div className="experience-skills">
            {active.skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </article>
      </div>
    </>
  );
};

const ExperienceWindow = WindowWrapper(Experience, "experience");

export default ExperienceWindow;
