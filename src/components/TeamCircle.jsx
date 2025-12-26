import { useState, useEffect } from "react";
import { Mail, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Shoubhik Saha",
    image: "/images/member1.jpg",
    email: "mailto:sobik@calsci.io",
    linkedin: "https://www.linkedin.com/in/hellosobik",
  },
  {
    name: "Rupesh Verma",
    image: "/images/member2.jpg",
    email: "mailto:rupesh@calsci.io",
    linkedin: "https://www.linkedin.com/in/rupesh-verma-b950681a0",
  },
  {
    name: "Nagesh Pandey",
    image: "/images/nagesh.jpeg",
    email: "mailto:nagesh@calsci.io",
    linkedin: "https://www.linkedin.com/in/nagesh-pandey-748936366",
  },
  {
    name: "Nityanda",
    image: "/images/member4.jpg",
    email: "mailto:nitya@calsci.io",
    linkedin: "https://www.linkedin.com/in/nityananda-haldar-a44969256",
  },
  {
    name: "Akarsh",
    image: "/images/member5.jpg",
    email: "mailto:akarsh@calsci.io",
    linkedin: "",
  },
];

const getSizes = () => {
  const w = window.innerWidth;

  if (w < 640) {
    return { radius: 170, img: 96, name: "text-l" };
  }
  if (w < 1024) {
    return { radius: 170, img: 96, name: "text-l" };
  }
  return { radius: 170, img: 96, name: "text-l" };
};

const TeamCircle = () => {
  const [sizes, setSizes] = useState(getSizes());

  useEffect(() => {
    const onResize = () => setSizes(getSizes());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="relative w-[26rem] h-[26rem] flex items-center justify-center mx-auto">
      <div
        className="absolute z-20 w-32 h-32 rounded-full bg-[#f8fdf7] 
        border-4 border-[#52b788] flex items-center justify-center 
        shadow-xl text-xl font-mono font-bold text-[#1b4332]"
      >
        CalSci
      </div>
      {teamMembers.map((member, i) => {
        const angle = (i / teamMembers.length) * 2 * Math.PI - Math.PI / 2;

        const x = Math.cos(angle) * sizes.radius;
        const y = Math.sin(angle) * sizes.radius;

        return (
          <div
            key={i}
            className="absolute flex flex-col items-center text-center"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <div
              className="rounded-full border-4 border-[#95d5b2] 
              shadow-lg hover:scale-105 transition-transform bg-white"
              style={{
                width: sizes.img,
                height: sizes.img,
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className={`mt-2 font-semibold text-[#1b4332] ${sizes.name}`}>
              {member.name}
            </span>
            <div className="flex gap-2 mt-1">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1b4332] hover:text-[#52b788]"
                >
                  <Linkedin size={14} />
                </a>
              )}
              <a
                href={member.email}
                className="text-[#1b4332] hover:text-[#52b788]"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamCircle;
