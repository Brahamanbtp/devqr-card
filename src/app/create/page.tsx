// src/components/CreateCard.tsx
"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

interface ProfileCard {
  id: string;
  name: string;
  bio: string;
  github: string;
  linkedin: string;
  website: string;
  skills: string;
  theme: string;
  image: string;
}

export default function CreateCard() {
  const [form, setForm] = useState<ProfileCard>({
    id: uuidv4(),
    name: "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
    skills: "",
    theme: "light",
    image: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState("default");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const editId = searchParams.get("id");
    if (editId) {
      const existing = JSON.parse(localStorage.getItem("devqr-cards") || "[]");
      const match = existing.find((card: ProfileCard) => card.id === editId);
      if (match) setForm(match);
    }
  }, [searchParams]);

  const profileUrl = `https://devqrcard.com/card/${encodeURIComponent(
    form.name.toLowerCase().replace(/\s+/g, "-")
  )}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setForm({ ...form, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLocal = () => {
    const existing = JSON.parse(localStorage.getItem("devqr-cards") || "[]");
    const index = existing.findIndex((card: ProfileCard) => card.id === form.id);

    if (index !== -1) {
      existing[index] = form;
    } else {
      existing.push(form);
    }

    localStorage.setItem("devqr-cards", JSON.stringify(existing));
    alert("Card saved ✅");
    router.push("/dashboard");
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement("a");
      link.download = `${form.name || "devqr-card"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <section>
          <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            {searchParams.get("id") ? "Edit Your DevQRCard" : "Create Your DevQRCard"}
          </h1>
          <form className="flex flex-col gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border px-4 py-2 rounded-md" />
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short Bio / Tagline" rows={2} className="border px-4 py-2 rounded-md resize-none" />
            <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" className="border px-4 py-2 rounded-md" />
            <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="border px-4 py-2 rounded-md" />
            <input name="website" value={form.website} onChange={handleChange} placeholder="Portfolio/Website URL" className="border px-4 py-2 rounded-md" />
            <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="border px-4 py-2 rounded-md" />
            <select name="theme" value={form.theme} onChange={handleChange} className="border px-4 py-2 rounded-md">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="border px-4 py-2 rounded-md">
              <option value="default">Default</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
            </select>
            <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="border px-4 py-2 rounded-md" />
          </form>
        </section>

        <section className="flex flex-col items-center gap-6">
          <div ref={cardRef} className={`w-full max-w-sm border p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 ${selectedTemplate}`}>
            <h2 className="text-xl font-bold text-center mb-2 text-blue-600 dark:text-blue-400">
              Preview
            </h2>
            {form.image && (
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                <Image src={form.image} alt="Profile" width={96} height={96} />
              </div>
            )}
            <p className="text-lg font-semibold mt-2">{form.name || "Your Name"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">{form.bio || "Short bio goes here..."}</p>
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
            <button onClick={handleSaveLocal} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              {searchParams.get("id") ? "Update" : "Save to Local"}
            </button>
            <button onClick={handleDownload} className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">
              Download
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
