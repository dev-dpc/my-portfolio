import {
  FaReact, FaNodeJs, FaPhp, FaHtml5, FaCss3Alt, FaGit, FaGithub, FaDocker, FaWordpress, FaLinux,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript,
  SiMongodb, SiMysql, SiPostgresql, SiRubyonrails, SiRuby, SiExpress, SiFlutter, SiFigma, SiWebflow,
  SiGithubactions,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export const profile = {
  name: 'Daniel Cañada',
  roles: ['Daniel Cañada', 'a Software Engineer', 'a Problem Solver'],
  bio: 'Full Stack Software Engineer with over 3 years of experience building secure, scalable systems. Proficient across the stack in Node.js, Ruby on Rails, PHP, and React. Combines a strong foundation in backend architecture with a keen eye for UI/UX design to deliver impactful, end-to-end digital solutions.',
  email: 'danielpeter.canada@gmail.com',
  github: 'https://github.com/dev-dpc',
  linkedin: 'https://linkedin.com/in/danielpcañada',
};

export type TechItem = { name: string; Icon: IconType };

export const categorizedTech: Record<string, TechItem[]> = {
  'Frontend': [
    { name: 'React', Icon: FaReact },
    { name: 'Next.js', Icon: SiNextdotjs },
    { name: 'JavaScript', Icon: SiJavascript },
    { name: 'TypeScript', Icon: SiTypescript },
    { name: 'HTML5', Icon: FaHtml5 },
    { name: 'CSS3', Icon: FaCss3Alt },
    { name: 'Tailwind CSS', Icon: SiTailwindcss },
  ],
  'Backend': [
    { name: 'Node.js', Icon: FaNodeJs },
    { name: 'Express', Icon: SiExpress },
    { name: 'Ruby on Rails', Icon: SiRubyonrails },
    { name: 'Ruby', Icon: SiRuby },
    { name: 'PHP', Icon: FaPhp },
  ],
  'Databases': [
    { name: 'MySQL', Icon: SiMysql },
    { name: 'MongoDB', Icon: SiMongodb },
    { name: 'PostgreSQL', Icon: SiPostgresql },
  ],
  'Design': [
    { name: 'Figma', Icon: SiFigma },
    { name: 'Webflow', Icon: SiWebflow },
  ],
  'Tools & DevOps': [
    { name: 'Git', Icon: FaGit },
    { name: 'GitHub', Icon: FaGithub },
    { name: 'Docker', Icon: FaDocker },
    { name: 'Linux', Icon: FaLinux },
    { name: 'CI/CD', Icon: SiGithubactions },
  ],
  'CMS & Mobile': [
    { name: 'WordPress', Icon: FaWordpress },
    { name: 'Flutter', Icon: SiFlutter },
  ],
};

export const experienceData = [
  {
    role: 'Software Engineer II',
    company: 'Akubo Software Philippines, Inc.',
    period: 'Feb 2026 - Present',
    description: [
      'Directed the technical roadmap and maintenance of AkuboIT, scaling the Ruby on Rails ecosystem and overseeing all architectural decisions as Lead Developer.',
      'Modernized DevOps with automated testing suites, cutting manual QA and increasing deployment stability.',
      'Architected AkuboGiving, replacing legacy systems with a scalable, high-performance platform.',
      'Hardened security via 2FA and RBAC to protect sensitive payment workflows and user data.',
      'Integrated external APIs for real-time payment processing and custom donation tracking.',
    ],
    stack: ['Ruby on Rails', 'PHP', 'MySQL', 'MongoDB', 'Docker'],
  },
  {
    role: 'Software Engineer',
    company: 'Akubo Software Philippines, Inc.',
    period: 'Jan 2023 - Jan 2026',
    description: [
      'Boosted page speeds by 20% through advanced query optimization and critical backend bug fixes for AkuboIT.',
      'Scaled web-based IT software by developing new high-performance features and system architectures.',
      "Improved AkuboCRM (PHP) stability, reducing user-reported bugs by 25% through codebase modernization, and assisted in v3 development.",
      'Collaborated on UI/UX redesigns to align technical performance with intuitive user experiences.',
    ],
    stack: ['Ruby on Rails', 'PHP', 'MySQL', 'MongoDB', 'JavaScript'],
  },
  {
    role: 'Independent Contractor - Full Stack Web Developer',
    company: 'Freelance',
    period: 'Nov 2025 - March 2026',
    description: [
      'Optimized data flow for internal administrative workflows and contributed to Fraud API development, collaborating on backend logic to identify and mitigate high-risk activity within internal systems.',
      'Developed automation scripts to streamline repetitive system tasks, improving operational efficiency and reducing manual intervention.',
    ],
    stack: ['Ruby on Rails', 'JavaScript', 'TypeScript', 'MongoDB', 'Automation', 'CI/CD'],
  },
  {
    role: 'Website Developer (client based)',
    company: 'Freelance',
    period: 'Apr 2025 - Nov 2025',
    description: 'Corporate website redesign and author portfolio site using WordPress.',
    stack: ['WordPress'],
  },
];

export const educationData = [
  {
    degree: 'BS in Computer Engineering',
    school: 'University of St. La Salle - Bacolod',
    period: '2018 - 2022',
    achievements: [
      "Dean's List - 4 semesters",
      'External Vice President (ICpEP.se USLS) - 2019-2020',
      'Outreach Committee Head (ICpEP.se USLS) - 2018-2019',
      'Thesis: A Response and Recording System for Women and Children using GSM/GPS',
    ],
  },
  {
    degree: 'Senior High School',
    school: 'Liceo De La Salle - USLS, Bacolod City',
    period: '2016 - 2018',
    achievements: ['With Honors'],
  },
  {
    degree: 'Elementary - Junior High School',
    school: 'St. Benilde School, Bacolod City',
    period: '2006-2016',
    achievements: ['With Honors'],
  },
];

export const projects = [
  {
    title: 'Meksus Forge 3D Printing Services',
    client: 'Engineering Head, Startup Business',
    period: 'Feb 2026 - Present',
    description: [
      'Architected and launched a full-stack e-commerce platform using Next.js and Supabase from scratch.',
      'Built core features including secure user authentication, database architecture, and server-side rendering.',
      'Optimized site performance via Next.js server-side rendering, improving page load speeds by 50%.',
      'Maintained 99.9% uptime by leading troubleshooting, debugging, and system monitoring efforts.',
      'Translated business goals into technical roadmaps, prioritizing feature rollouts based on user data.',
    ],
    tech: ['Next.js', 'Supabase', 'SSR'],
    link: 'https://www.meksusforge.com' as string | null,
  },
  {
    title: 'Mobile App Backend - E-commerce & E-Load',
    client: 'Quick Bond Plush (Bangladesh)',
    period: 'Feb 2025 - Apr 2025',
    description: [
      'Designed and developed secure RESTful APIs using Node.js and Express.js for a mobile app supporting e-commerce and e-load services.',
      'Implemented JWT authentication, RBAC, and strict input validation to protect user data and endpoints.',
      'Built core API features for registration, login, and transactional flows.',
      'Collaborated closely with Flutter developers to ensure smooth backend-frontend integration.',
      'Enabled HTTPS to secure data in transit for production environment.',
    ],
    tech: ['Node.js', 'Express.js', 'JWT', 'MongoDB', 'HTTPS'],
    link: null as string | null,
  },
  {
    title: 'Portfolio Website',
    period: '2025',
    description: [
      'Personal portfolio built with Next.js and Tailwind CSS, featuring dark/light mode, AOS animations, and responsive design.',
      'Used shadcn/ui and React Icons for consistent design system and accessible components.',
      'Optimized for mobile and desktop viewing with smooth transitions and accessible structure.',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui', 'AOS'],
    link: 'https://github.com/dev-dpc/my-portfolio' as string | null,
  },
  {
    title: 'Weather Forecast UI',
    period: '2025',
    description: ['A responsive weather dashboard that shows current and 7-day forecast using Open-Meteo API. Built with Next.js, TailwindCSS, and ShadCN components.'],
    tech: ['Next.js', 'React', 'TailwindCSS', 'ShadCN', 'Open-Meteo API'],
    link: `${process.env.NEXT_PUBLIC_BASE_PATH}/weather` as string | null,
  },
];
