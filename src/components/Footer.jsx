import { Mail, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1b4332] text-[#d8f3dc] py-10 px-6 font-mono">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 border-b border-[#95d5b2]/40 pb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#b7e4c7] mb-2">CalSci</h2>
          <p className="text-sm text-[#d8f3dc]/80">
            India’s open-source scientific programmable calculator project.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#b7e4c7] mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/docs"
                className="hover:text-[#95d5b2] transition-colors"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                to="/software/native"
                className="hover:text-[#95d5b2] transition-colors"
              >
                Native Software
              </Link>
            </li>
            <li>
              <Link
                to="/software/simulator"
                className="hover:text-[#95d5b2] transition-colors"
              >
                Simulator
              </Link>
            </li>
            <li>
              <Link
                to="/software/extension"
                className="hover:text-[#95d5b2] transition-colors"
              >
                VSCode Extension
              </Link>
            </li>
            <li>
              <Link
                to="/hardware/circuit"
                className="hover:text-[#95d5b2] transition-colors"
              >
                Circuit Design
              </Link>
            </li>
            <li>
              <Link
                to="/hardware/mechanical"
                className="hover:text-[#95d5b2] transition-colors"
              >
                Body Design
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#b7e4c7] mb-3">
            Connect with Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <Github className="w-4 h-4" />
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#95d5b2] transition-colors"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Linkedin className="w-4 h-4" />
              <a
                href="https://www.linkedin.com/company/calsci-io/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#95d5b2] transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:contact@calsci.io"
                className="hover:text-[#95d5b2] transition-colors"
              >
                contact@calsci.io
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
