"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";

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
    alert("Profile saved to local storage ✅");
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement("a");
      link.download = "devqr-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Section */}
        <section>
          <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Create Your DevQRCard
          </h1>
          <form className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border px-4 py-2 rounded-md"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Short Bio / Tagline"
              rows={2}
              className="border px-4 py-2 rounded-md resize-none"
            />
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="GitHub URL"
              className="border px-4 py-2 rounded-md"
            />
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="border px-4 py-2 rounded-md"
            />
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Portfolio/Website URL"
              className="border px-4 py-2 rounded-md"
            />
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="Skills (comma separated)"
              className="border px-4 py-2 rounded-md"
            />
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
            className="w-full max-w-sm border p-6 rounded-lg shadow-md bg-white dark:bg-gray-900"
          >
            <h2 className="text-xl font-bold text-center mb-2 text-blue-600 dark:text-blue-400">
              Preview
            </h2>
            <p className="text-lg font-semibold">{form.name || "Your Name"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {form.bio || "Short bio goes here..."}
            </p>
            <div className="mt-4 space-y-1 text-sm">
              {form.github && <p>GitHub: {form.github}</p>}
              {form.linkedin && <p>LinkedIn: {form.linkedin}</p>}
              {form.website && <p>Website: {form.website}</p>}
              {form.skills && <p>Skills: {form.skills}</p>}
            </div>
            <div className="mt-4 text-center">
              <QRCodeCanvas value={profileUrl} size={128} />
              <p className="text-xs mt-2 break-all">{profileUrl}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSaveLocal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save to Local
            </button>
            <button
              onClick={handleDownload}
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Download
            </button>
          </div>

          <Link
            href="/"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
