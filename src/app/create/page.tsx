"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import toast, { Toaster } from "react-hot-toast";

export default function CreateCard() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
    skills: "",
    theme: "light",
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const profileUrl = `https://devqrcard.com/card/${encodeURIComponent(
    form.name.toLowerCase().replace(/\s+/g, "-")
  )}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveLocal = () => {
    localStorage.setItem("devqrcard-profile", JSON.stringify(form));
    toast.success("Profile saved locally ✅");
  };

  const handleDownloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement("a");
      link.download = "devqr-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Card image downloaded 🎉");
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "devqr-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("QR code downloaded 🧾");
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied 📋");
  };

  const renderSkills = () => {
    return form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .map((skill, i) => (
        <span
          key={i}
          className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded-full text-xs mr-1 mb-1"
        >
          {skill}
        </span>
      ));
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-10">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Section */}
        <section>
          <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Create Your DevQRCard
          </h1>
          <form className="flex flex-col gap-4">
            {["name", "bio", "github", "linkedin", "website", "skills"].map((field) => (
              <input
                key={field}
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                className="border px-4 py-2 rounded-md"
              />
            ))}
            <select
              name="theme"
              value={form.theme}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </form>
        </section>

        {/* Preview Section */}
        <section className="flex flex-col items-center gap-6">
          <div
            ref={cardRef}
            className={`w-full max-w-sm border p-6 rounded-lg shadow-md ${
              form.theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-xl font-bold text-center mb-2 text-blue-600 dark:text-blue-400">
              Preview
            </h2>
            <p className="text-lg font-semibold">{form.name || "Your Name"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {form.bio || "Short bio goes here..."}
            </p>
            <div className="mt-4 space-y-1 text-sm">
              {form.github && <p>GitHub: <a href={form.github} className="underline text-blue-500" target="_blank">{form.github}</a></p>}
              {form.linkedin && <p>LinkedIn: <a href={form.linkedin} className="underline text-blue-500" target="_blank">{form.linkedin}</a></p>}
              {form.website && <p>Website: <a href={form.website} className="underline text-blue-500" target="_blank">{form.website}</a></p>}
              {form.skills && <div className="flex flex-wrap mt-2">{renderSkills()}</div>}
            </div>
            <div className="mt-4 text-center">
              <QRCodeCanvas value={profileUrl} size={128} />
              <p className="text-xs mt-2 break-all">{profileUrl}</p>
              <button
                onClick={copyLink}
                className="text-sm mt-1 text-blue-500 underline hover:text-blue-700"
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleSaveLocal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save to Local
            </button>
            <button
              onClick={handleDownloadCard}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Download Card
            </button>
            <button
              onClick={handleDownloadQR}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            >
              Download QR
            </button>
          </div>

          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
