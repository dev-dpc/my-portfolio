'use client';

import { Bebas_Neue } from 'next/font/google';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import {
  profile,
  categorizedTech,
  experienceData,
  educationData,
  projects,
} from '@/data/portfolio';

const display = Bebas_Neue({ subsets: ['latin'], weight: '400' });

const navItems = ['Intro', 'Stack', 'Work', 'Study', 'Projects', 'Connect'];

const techIconMap = Object.fromEntries(
  Object.values(categorizedTech).flat().map((t) => [t.name.toLowerCase(), t.Icon])
) as Record<string, React.ComponentType<{ className?: string }>>;

function stackIcons(stack: string[]) {
  const matched = stack
    .map((name) => ({ name, Icon: techIconMap[name.toLowerCase()] }))
    .filter((t): t is { name: string; Icon: React.ComponentType<{ className?: string }> } => Boolean(t.Icon))
    .slice(0, 3);
  return matched.length ? matched : [{ name: 'work', Icon: FaBriefcase }];
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="text-xs">&nbsp;</span>;
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`${display.className} text-lg tracking-wide cursor-pointer hover:text-blue-500 hover:-translate-y-0.5 transition-all duration-200`}
    >
      {theme === 'light' ? 'DARK' : 'LIGHT'}
    </button>
  );
}

function Skew({ className = '' }: { className?: string }) {
  return (
    <div data-aos="fade-down" data-aos-duration="500">
      <div className={`h-16 sm:h-24 -skew-y-2 origin-top-left ${className}`} />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 overflow-x-clip">

      {/* Sticky side nav (desktop) */}
      <nav className="hidden lg:flex flex-col justify-between items-center fixed left-0 top-0 h-screen w-16 py-8 z-40">
        <ul className="flex flex-col gap-8 items-center">
          {navItems.map((n) => (
            <li key={n}>
              <a
                href={`#${n.toLowerCase()}`}
                className={`${display.className} text-sm tracking-[0.3em] hover:text-blue-500 transition-colors [writing-mode:vertical-rl]`}
              >
                {n}
              </a>
            </li>
          ))}
        </ul>
        <div className="[writing-mode:vertical-rl]">
          <ThemeSwitch />
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center gap-4 px-6 py-5 bg-white/90 dark:bg-neutral-950/90 backdrop-blur">
        <p className={`${display.className} text-xl tracking-widest shrink-0`}>DPC</p>
        <ul className="no-scrollbar flex flex-1 gap-6 items-center overflow-x-auto">
          {navItems.map((n) => (
            <li key={n} className="shrink-0">
              <a
                href={`#${n.toLowerCase()}`}
                className={`${display.className} text-sm tracking-[0.2em] hover:text-blue-500 transition-colors`}
              >
                {n}
              </a>
            </li>
          ))}
        </ul>
        <div className="shrink-0">
          <ThemeSwitch />
        </div>
      </div>

      <div className="lg:pl-16">

        {/* Hero */}
        <section id="intro" className="relative scroll-mt-17 lg:scroll-mt-0 px-6 sm:px-16 pt-10 sm:pt-24 pb-20 overflow-hidden">
          <span className={`${display.className} absolute -top-4 right-0 sm:right-10 text-[10rem] sm:text-[16rem] leading-none text-neutral-100 dark:text-neutral-900 select-none pointer-events-none`}>
            DC
          </span>
          <p data-aos="fade-down" className="relative text-xs tracking-[0.4em] uppercase text-blue-500 mb-6">Portfolio / 2026</p>
          <h1 data-aos="fade-down" data-aos-delay="100" className={`${display.className} relative text-6xl sm:text-8xl lg:text-9xl leading-[0.9] mb-8`}>
            {profile.name}
          </h1>
          <p data-aos="fade-down" data-aos-delay="200" className="relative max-w-md text-lg sm:ml-24 text-neutral-600 dark:text-neutral-400">
            {profile.bio}
          </p>
        </section>

        <Skew className="bg-blue-600" />

        {/* Tech stack — color block */}
        <section id="stack" className="scroll-mt-17 lg:scroll-mt-0 bg-blue-600 text-white px-6 sm:px-16 py-16 sm:py-20">
          <h2 data-aos="fade-down" className={`${display.className} text-4xl sm:text-5xl mb-10 tracking-wide`}>Tools &amp; Tech</h2>
          <div className="space-y-8">
            {Object.entries(categorizedTech).map(([category, items], idx) => (
              <div key={category} className={idx % 2 === 1 ? 'sm:pl-24' : ''}>
                <p data-aos="fade-down" data-aos-delay={idx * 60} className="text-xs tracking-[0.3em] uppercase text-blue-200 mb-3">{category}</p>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  {items.map((tech, i) => (
                    <span
                      key={tech.name}
                      data-aos="fade-down"
                      data-aos-delay={idx * 60 + i * 40}
                      data-aos-duration="500"
                      className={`${display.className} tracking-wide flex items-center gap-2 ${i % 3 === 0 ? 'text-3xl' : i % 3 === 1 ? 'text-2xl' : 'text-xl'} text-white/90`}
                    >
                      <tech.Icon className="text-lg opacity-80" />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Skew className="bg-blue-600" />

        {/* Experience — asymmetric index rows */}
        <section id="work" className="scroll-mt-17 lg:scroll-mt-0 px-6 sm:px-16 py-20">
          <h2 data-aos="fade-down" className={`${display.className} text-4xl sm:text-5xl mb-14 tracking-wide`}>Work</h2>
          <div className="space-y-16">
            {experienceData.map((exp, i) => {
              const icons = stackIcons(exp.stack);
              return (
              <div
                key={exp.role + exp.company}
                data-aos="fade-down"
                data-aos-delay={i * 120}
                className={`grid sm:grid-cols-[auto_1fr] sm:items-center gap-4 sm:gap-12 ${i % 2 === 1 ? 'sm:ml-16' : ''}`}
              >
                <div className="flex gap-3 sm:flex-col sm:gap-4 text-neutral-200 dark:text-neutral-800">
                  {icons.map(({ name, Icon }) => (
                    <Icon key={name} className="text-5xl sm:text-6xl" />
                  ))}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-sm text-blue-500 mb-1">{exp.company}</p>
                  <p className="text-xs text-neutral-500 mb-4">{exp.period}</p>
                  {Array.isArray(exp.description) ? (
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 mb-4">
                      {exp.description.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  ) : (
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">{exp.description}</p>
                  )}
                  <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-neutral-500">
                    {exp.stack.map((s) => <span key={s}>{s}</span>)}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </section>

        <Skew className="bg-neutral-900 dark:bg-neutral-100" />

        {/* Education — dark block */}
        <section id="study" className="scroll-mt-17 lg:scroll-mt-0 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-6 sm:px-16 py-16 sm:py-20">
          <h2 data-aos="fade-down" className={`${display.className} text-4xl sm:text-5xl mb-14 tracking-wide`}>Study</h2>
          <div className="space-y-12">
            {educationData.map((edu, idx) => (
              <div
                key={edu.degree}
                data-aos="fade-down"
                data-aos-delay={idx * 120}
                className={idx % 2 === 1 ? 'sm:ml-24' : ''}
              >
                <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">{edu.period}</p>
                <h3 className="text-xl sm:text-2xl font-semibold mb-1">{edu.degree}</h3>
                <p className="text-sm text-neutral-400 dark:text-neutral-600 mb-3">{edu.school}</p>
                <ul className="space-y-1 text-neutral-300 dark:text-neutral-700 text-sm">
                  {edu.achievements.map((a) => <li key={a}>&mdash; {a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Skew className="bg-neutral-900 dark:bg-neutral-100" />

        {/* Projects — magazine spread */}
        <section id="projects" className="scroll-mt-17 lg:scroll-mt-0 px-6 sm:px-16 py-20">
          <h2 data-aos="fade-down" className={`${display.className} text-4xl sm:text-5xl mb-14 tracking-wide`}>Projects</h2>
          <div className="space-y-20">
            {projects.map((proj, i) => (
              <div
                key={proj.title}
                data-aos="fade-down"
                data-aos-delay={i * 120}
                className={`flex flex-col sm:flex-row gap-6 sm:gap-16 ${i % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : ''}`}
              >
                <div className="sm:w-1/3 shrink-0">
                  <h3 className="text-2xl font-semibold mb-1">{proj.title}</h3>
                  {proj.client && <p className="text-sm italic text-neutral-500 mb-1">{proj.client}</p>}
                  <p className="text-xs text-neutral-500">{proj.period}</p>
                  <div className={`h-1 w-16 bg-blue-600 mt-4 -skew-x-12 ${i % 2 === 1 ? 'sm:ml-auto' : ''}`} />
                </div>
                <div className="sm:w-2/3">
                  <ul className={`space-y-1 text-neutral-600 dark:text-neutral-400 mb-4 ${i % 2 === 1 ? 'sm:text-right' : ''}`}>
                    {proj.description.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                  <p className={`flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-neutral-500 mb-3 ${i % 2 === 1 ? 'sm:justify-end' : ''}`}>
                    {proj.tech.map((t) => <span key={t}>{t}</span>)}
                  </p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-blue-500 hover:underline hover:translate-x-1 transition-transform duration-200 text-sm"
                    >
                      View project &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="connect" className="relative scroll-mt-17 lg:scroll-mt-0 px-6 sm:px-16 py-24 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <h2 data-aos="fade-down" className={`${display.className} text-5xl sm:text-7xl mb-10 tracking-wide`}>Let&apos;s talk</h2>
          <div data-aos="fade-down" data-aos-delay="100" className="flex flex-wrap items-center gap-6 sm:gap-10 text-lg mb-16">
            <a href={`mailto:${profile.email}`} className="hover:text-blue-500 transition-colors underline underline-offset-4">Email</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors underline underline-offset-4">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors underline underline-offset-4">LinkedIn</a>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH}/cv-daniel.pdf`}
              download="Daniel_Cañada_CV.pdf"
              className={`${display.className} px-5 py-2 tracking-wide text-base bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 transition-all duration-200 -skew-x-6`}
            >
              <span className="inline-block skew-x-6">Download CV</span>
            </a>
          </div>
          <p className="text-xs text-neutral-500">&copy; {new Date().getFullYear()} Dev DPC. All rights reserved.</p>
        </section>
      </div>
    </main>
  );
}
