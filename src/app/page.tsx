"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleCreateClick = () => {
    setTimeout(() => {
      router.push("/create");
    }, 200);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-[var(--background)] text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/logo-devqr.png"
          alt="DevQRCard Logo"
          width={100}
          height={100}
          className="mb-6 dark:invert"
          priority
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold tracking-tight"
      >
        Welcome to <span className="text-blue-600 dark:text-blue-400">DevQRCard</span> 🚀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-4 text-lg max-w-xl text-gray-600 dark:text-gray-400"
      >
        Your all-in-one developer profile, portfolio, and QR-card generator — beautifully simple, instantly shareable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Link href="/create">
          <button className="bg-blue-600 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Create Your Card
          </button>
        </Link>

        <a
          href="https://github.com/Brahamanbtp/devqr-card"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-300 dark:border-gray-600 text-[var(--foreground)] px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          View on GitHub
        </a>
      </motion.div>
    </main>
  );
}
