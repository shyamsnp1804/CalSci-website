import { useState } from "react";
import DisplayLayout from "../DisplayLayout";
import { Mail, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "",
    image: "",
    email: "",
    linkedin: "",
  },
  {
    name: "",
    image: "",
    email: "",
    linkedin: "",
  },
  {
    name: "",
    image: "",
    email: "",
    linkedin: "",
  },
  {
    name: "",
    image: "",
    email: "",
    linkedin: "",
  },
  {
    name: "",
    image: "",
    email: "",
    linkedin: "",
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
      } else {
        setStatus({ ok: false, msg: "Something went wrong. Try again." });
      }
    } catch {
      setStatus({ ok: false, msg: "Network error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DisplayLayout>
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-center md:justify-between gap-12 z-10 max-w-6xl">
          <div className="w-full md:w-[45%] flex flex-col space-y-6">
            <h1 className="text-4xl sm:text-5xl font-mono font-bold text-[#1b4332] mb-3">
              Our Team
            </h1>

            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center bg-[#f8fdf7] border border-[#95d5b2] rounded-xl p-4 hover:shadow-md hover:scale-[1.01] transition-transform duration-200"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#52b788] mr-4"
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-[#1b4332]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#2d6a4f]">{member.email}</p>
                </div>
                <div className="flex space-x-3 ml-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[#1b4332] hover:text-[#2d6a4f]"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1b4332] hover:text-[#2d6a4f]"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-[50%]">
            <h1 className="text-4xl sm:text-5xl font-mono font-bold text-[#1b4332] mb-3">
              Be in Touch
            </h1>
            <p className="text-[#2d6a4f] font-mono text-lg mb-8">
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
