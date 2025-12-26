import DisplayLayout from "../DisplayLayout";
import TeamCircle from "../TeamCircle";
import { useState } from "react";

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB_FORM_ACCESS_KEY;

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
        setStatus({ ok: false, msg: "Something went wrong." });
      }
    } catch {
      setStatus({ ok: false, msg: "Network error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DisplayLayout>
      <section className="w-full py-20 px-2 sm:px-2">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <TeamCircle />
          <div className="w-full max-w-md">
            <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[#1b4332] mb-2">
              Be in Touch
            </h1>
            <p className="text-[#2d6a4f] font-mono mb-6">
              Ask us anything — we'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <input
                name="name"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-md border border-[#95d5b2]"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-md border border-[#95d5b2]"
              />

              <textarea
                name="message"
                rows="4"
                required
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-md border border-[#95d5b2]"
              />

              <button
                disabled={loading}
                className="w-full py-3 rounded-md bg-[#1b4332] text-white hover:bg-[#2d6a4f]"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p
                  className={`text-sm ${
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
