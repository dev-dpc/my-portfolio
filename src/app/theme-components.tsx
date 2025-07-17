'use client'
import {
  FaReact, FaNodeJs, FaPhp, FaHtml5, FaCss3Alt, FaGit, FaGithub, FaDocker, FaWordpress, FaGraduationCap, FaAward, FaUsers
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiBootstrap, SiMongodb, SiMysql, SiRubyonrails, SiFlutter
} from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';


const categorizedTech = {
  'Frontend': [
    { name: 'React', icon: <FaReact className="text-blue-400" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
    // { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="text-blue-600" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: 'Bootstrap', icon: <SiBootstrap className="text-purple-600" /> },
  ],
  'Backend': [
    { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
    { name: 'PHP', icon: <FaPhp className="text-indigo-600" /> },
    { name: 'Ruby on Rails', icon: <SiRubyonrails className="text-red-500" /> },
  ],
  'Databases': [
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
    { name: 'MySQL', icon: <SiMysql className="text-blue-600" /> },
  ],
  'Tools & DevOps': [
    { name: 'Git', icon: <FaGit className="text-red-500" /> },
    { name: 'GitHub', icon: <FaGithub className="text-gray-800 dark:text-white" /> },
    { name: 'Docker', icon: <FaDocker className="text-blue-500" /> },
  ],
  'CMS, Platforms, and Mobile': [
    { name: 'WordPress', icon: <FaWordpress className="text-blue-700" /> },
    { name: 'Flutter', icon: <SiFlutter className="text-blue-700" /> },
  ],
};

const experienceData = [
  {
    role: "Software Engineer",
    company: "Akubo Software Philippines, Inc.",
    period: "Jan 2023 - Present",
    description: [
        "Head developer of AkuboIT, an IT software management platform built on Ruby on Rails.",
        "Led the revamp of a donation platform with secure 2FA and modular PHP architecture.",
        "Enhanced product features with enhanced features, reduced bug reports by 15%, and improved backend stability.",
        "Worked closely with design to improve user experience across key workflows.",
    ],
    stack: ["Ruby on Rails", "PHP", "MySQL", "MongoDB", "JavaScript", "Bootstrap"],
  },
  {
    role: "Freelance Developer",
    company: "Various Clients",
    period: "Apr 2025 - Present",
    description:
      "Developed and maintained WordPress-based websites tailored to client needs.",
    stack: ["Wordpress"],
  },
  {
    role: "Mobile App Developer",
    company: "OJT - USLS Bacolod",
    period: "May 2021 - July 2021",
    description:[
        "Built and deployed mobile apps using Flutter, Node.js, Express, and MongoDB.",
        "Managed codebase via Git and implemented cloud hosting with Heroku."
    ],
    stack: ["Flutter", "Node.js", "Express", "MongoDB"],
  },
];

const educationData = [
  {
    degree: "BS in Computer Engineering",
    school: "University of St. La Salle - Bacolod",
    period: "2018 - 2022",
    achievements: [
      "Dean's List - 4 semesters",
      "External Vice President (ICpEP.se USLS) - 2019-2020",
      "Outreach Committee Head (ICpEP.se USLS) - 2018-2019",
      "Thesis: A Response and Recording System for Women and Children using GSM/GPS",
    ],
  },
  {
    degree: "Senior High School",
    school: " Liceo De La Salle - USLS, Bacolod City",
    period: "2016 - 2018",
    achievements: [
      "With Honors",
    ],
  },
  {
    degree: "Elementary - Junior High School",
    school: " St. Benilde School, Bacolod City",
    period: "2006-2016",
    achievements: [
      "With Honors",
    ],
  },
];


const projects = [
  {
    title: "Mobile App Backend – E-commerce & E-Load",
    client: "Quick Bond Plush (Bangladesh)",
    period: "Feb 2025 – Apr 2025",
    description: [
      "Designed and developed secure RESTful APIs using Node.js and Express.js for a mobile app supporting e-commerce and e-load services.",
      "Implemented JWT authentication, RBAC, and strict input validation to protect user data and endpoints.",
      "Built core API features for registration, login, and transactional flows.",
      "Collaborated closely with Flutter developers to ensure smooth backend-frontend integration.",
      "Enabled HTTPS to secure data in transit for production environment.",
    ],
    tech: ["Node.js", "Express.js", "JWT", "MongoDB", "HTTPS"],
    link: null, // leave null if not public
  },
  {
    title: "Portfolio Website",
    period: "2025",
    description: [
      "Personal portfolio built with Next.js and Tailwind CSS, featuring dark/light mode, AOS animations, and responsive design.",
      "Used shadcn/ui and React Icons for consistent design system and accessible components.",
      "Optimized for mobile and desktop viewing with smooth transitions and accessible structure.",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "AOS"],
    link: "/", // can be homepage
  },
];

export function Introduction() {
  return (
    <div>
        <h1 className="text-5xl font-semibold mb-4" data-aos="fade-up">
            Hi, I'm <span className="text-blue-400 dark:text-blue-600">
                <Typewriter
                words={['Daniel Cañada', 'a Software Engineer', 'a Problem Solver']}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={120}
                deleteSpeed={120}
                delaySpeed={2000}
                />
            </span>
            
        </h1>
        <p data-aos="fade-up">
            I'm a curious, adaptable, and solution-driven Software Engineer with a strong foundation in full-stack development. Adept in Ruby on Rails, PHP, Node.js, and React, with experience developing secure, high-performance systems. Demonstrated leadership, UI/UX design skills, and a passion for continuous learning.
        </p>
    </div>
  )
}

export function TechStack() {
  return (
    <section id="tech-stack" className="py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">Tech Stack</h2>
      <p className="mb-10 text-gray-600 dark:text-gray-300" data-aos="fade-up">
        Tools and technologies I use to build full-stack, maintainable, and performant web applications.
      </p>

      <div className="space-y-12 max-w-6xl mx-auto">
        {Object.entries(categorizedTech).map(([category, items]) => (
          <div key={category} data-aos="fade-up">
            <h3 className="text-xl font-semibold mb-6 text-left">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {items.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105 transition transform"
                >
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>

      <div className="space-y-10">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="relative pl-10 before:absolute before:top-1 before:left-1 before:w-1 before:h-full before:bg-blue-500"
          >
            <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {exp.company} • {exp.period}
            </div>
            {Array.isArray(exp.description) ? (
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-2 space-y-1">
                {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-2">{exp.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {exp.stack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


export function Education() {

  return (
    <section id="education" className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Education & Achievements</h2>

      <div className="space-y-12">
        {educationData.map((edu, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10"
          >
            <div className="flex flex-col items-center justify-start text-blue-600 dark:text-blue-400">
              <FaGraduationCap size={40} className="mb-2" />
              <div className="w-1 h-full bg-blue-600 dark:bg-blue-400 rounded"></div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{edu.school} • {edu.period}</p>

              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {edu.achievements.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaAward className="text-yellow-400" />
                    <span className="text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {

  return (
    <section id="projects" className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((proj, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-1">{proj.title}</h3>
            {proj.client && (
              <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-1">{proj.client}</p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{proj.period}</p>

            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1 text-sm">
              {proj.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-4">
              {proj.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
              >
                View Project &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}