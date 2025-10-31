import { useState, useEffect } from "react";
import DisplayLayout from "../DisplayLayout";
import { Mail, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Member 1",
    image: "/images/member1.jpg",
    email: "mailto:member1@example.com",
    linkedin: "https://linkedin.com/in/member1",
  },
  {
    name: "Member 2",
    image: "/images/member2.jpg",
    email: "mailto:member2@example.com",
    linkedin: "https://linkedin.com/in/member2",
  },
  {
    name: "Member 3",
    image: "/images/member3.jpg",
    email: "mailto:member3@example.com",
    linkedin: "https://linkedin.com/in/member3",
  },
  {
    name: "Member 4",
    image: "/images/member4.jpg",
    email: "mailto:member4@example.com",
    linkedin: "https://linkedin.com/in/member4",
  },
  {
    name: "Member 5",
    image: "/images/member5.jpg",
    email: "mailto:member5@example.com",
    linkedin: "https://linkedin.com/in/member5",
  },
];

const ContactUsSection = () => {
  const [radius, setRadius] = useState(140);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setRadius(90);
      else if (window.innerWidth < 1024) setRadius(120);
      else setRadius(150);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const WEB3FORMS_ACCESS_KEY = "ac7c8776-a78d-4732-b1a3-3e2994bc4480";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    form.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ ok: true, msg: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else setStatus({ ok: false, msg: "Something went wrong. Try again." });
    } catch {
      setStatus({ ok: false, msg: "Network error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DisplayLayout>
      <section className="relative w-full min-h-fit flex items-center justify-center py-16 px-4 sm:px-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          <div className="relative flex items-center justify-center w-full lg:w-1/2">
            <div className="relative flex items-center justify-center w-[20rem] h-[20rem] sm:w-[22rem] sm:h-[22rem]">
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#f8fdf7] border-4 border-[#52b788] flex items-center justify-center z-10 shadow-md">
                <h2 className="text-lg sm:text-xl font-mono font-bold text-[#1b4332]">
                  CalSci
                </h2>
              </div>
              {teamMembers.map((member, i) => {
                const angle = (i / teamMembers.length) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center text-center transition-transform duration-300"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#95d5b2] shadow-md object-cover hover:scale-110 transition-transform"
                    />
                    <h3 className="mt-1 text-xs sm:text-sm font-semibold text-[#1b4332]">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1b4332] hover:text-[#52b788]"
                      >
                        <Linkedin size={14} />
                      </a>
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
          </div>
          <div className="w-full lg:w-[45%] max-w-md flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[#1b4332] mb-3 text-center lg:text-left">
              Be in Touch
            </h1>
            <p className="text-[#2d6a4f] font-mono text-base sm:text-lg mb-8 text-center lg:text-left">
              Ask us anything or share your thoughts — we’d love to hear from
              you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#95d5b2] rounded-md focus:ring-2 focus:ring-[#52b788] outline-none bg-[#f1faee]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#95d5b2] rounded-md focus:ring-2 focus:ring-[#52b788] outline-none bg-[#f1faee]"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#95d5b2] rounded-md focus:ring-2 focus:ring-[#52b788] outline-none bg-[#f1faee]"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md font-semibold text-white bg-[#1b4332] hover:bg-[#2d6a4f] transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p
                  className={`text-sm mt-2 ${
                    status.ok ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {status.msg}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </DisplayLayout>
  );
};

export default ContactUsSection;
