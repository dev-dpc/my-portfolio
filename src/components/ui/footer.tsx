'use client';

import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full mt-20 px-4 py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="max-w-4xl mx-auto space-y-4">

        {/* Contact Line */}
        <p className="flex justify-center items-center gap-2 text-base font-medium text-gray-800 dark:text-gray-200">
          <FaEnvelope className="text-blue-500" />
          <span>
            Interested in working together?{" "}
            <a
              href="mailto:danielpeter.canada@gmail.com"
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              Send me an email.
            </a>
          </span>
        </p>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 text-xl text-gray-600 dark:text-gray-400">
          <a
            href="https://github.com/dev-dpc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/danielpcañada"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0077b5] transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="/my-portfolio/cv-daniel.pdf"
            download="Daniel_Cañada_CV.pdf"
            className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm font-medium transition"
          >
            Download CV
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Dev DPC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
