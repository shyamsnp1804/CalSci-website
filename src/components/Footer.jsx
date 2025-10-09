import React from "react";
import { Link } from "react-router-dom";

const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors"
  >
    {children}
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CalSci
            </h2>
            <p className="mt-4 text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
              Simplifying industrial automation with robust, plug-and-play IoT
              solutions.
            </p>
            <div className="mt-6 flex space-x-6 justify-center md:justify-start">
              <SocialIcon href="#">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.54-.18-6.69-1.88-8.8-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.7-.02-1.36-.21-1.94-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.35 0-.69-.02-1.03-.06A12.02 12.02 0 0 0 8.5 20c7.48 0 11.57-6.2 11.57-11.57 0-.18 0-.35-.01-.52.79-.57 1.47-1.28 2-2.04z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12.013c0 4.97 3.657 9.043 8.438 9.875v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.77-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.057 22 16.982 22 12.013 22 6.477 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/calsci-io/">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300">
              Our Address
            </h3>
            <div className="mt-4 space-y-3 text-gray-400">
              <p>
                3rd Floor ORCHID CENTER
                <br />
                GOLF COURSE ROAD, SEC-53
                <br />
                DLF QE HARYANA
                <br />
                GURUGRAM, 122002
              </p>
              <a
                href="tel:+918527896692"
                className="block hover:text-white transition-colors"
              >
                +91-8527896692
              </a>
              <a
                href="mailto:contact@calsci.io"
                className="block hover:text-white transition-colors"
              >
                contact@calsci.io
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} CalSci. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
