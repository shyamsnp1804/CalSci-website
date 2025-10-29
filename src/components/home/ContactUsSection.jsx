import { useState } from "react";
import DisplayLayout from "../DisplayLayout";
import { Mail, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Member 1",
    image: "/images/member1.jpg",
    email: "member1@example.com",
    linkedin: "https://linkedin.com/in/member1",
  },
  {
    name: "Member 2",
    image: "/images/member2.jpg",
    email: "member2@example.com",
    linkedin: "https://linkedin.com/in/member2",
  },
  {
    name: "Member 3",
    image: "/images/member3.jpg",
    email: "member3@example.com",
    linkedin: "https://linkedin.com/in/member3",
  },
  {
    name: "Member 4",
    image: "/images/member4.jpg",
    email: "member4@example.com",
    linkedin: "https://linkedin.com/in/member4",
  },
  {
    name: "Member 5",
    image: "/images/member5.jpg",
    email: "member5@example.com",
    linkedin: "https://linkedin.com/in/member5",
  },
];

const ContactUsSection = () => {
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
      <section className="relative w-full min-h-fit flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-1">
        <div className="relative w-full md:w-[50%] flex flex-col items-center justify-center">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#f8fdf7] border-4 border-[#52b788] flex items-center justify-center z-10 shadow-md">
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#1b4332]">
                CalSci
              </h2>
            </div>
            {teamMembers.map((member, index) => {
              const angle = (index / teamMembers.length) * 2 * Math.PI;
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={index}
                  className="absolute flex flex-col items-center text-center"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#95d5b2] shadow-md object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="mt-2 text-sm font-semibold text-[#1b4332]">
                    {member.name}
                  </h3>
                  <div className="flex flex-col items-center mt-1 space-y-1">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-[#2d6a4f] hover:text-[#1b4332] underline"
                    >
                      {member.email}
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1b4332] hover:text-[#2d6a4f]"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-[45%]">
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-[#1b4332] mb-3">
            Be in Touch
          </h1>
          <p className="text-[#2d6a4f] font-mono text-lg mb-8">
            Ask us anything or share your thoughts — we’d love to hear from you.
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
      </section>
    </DisplayLayout>
  );
};

export default ContactUsSection;
