"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleCreateClick = () => {
    setTimeout(() => {
      router.push("/create");
    }, 200);
  };

  return (
    <main className="flex flex-col min-h-screen justify-between bg-background text-foreground relative">
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <section className="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo-devqr.png"
            alt="DevQRCard Logo"
            width={120}
            height={120}
            className="mb-8 dark:invert"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          DevQRCard 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 max-w-2xl text-lg text-muted-foreground"
        >
          Build your developer profile, showcase your work, and share it instantly — all in one QR-powered identity card.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleCreateClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create Your Card
          </button>

          <Link
            href="https://github.com/Brahamanbtp/devqr-card"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-muted px-6 py-3 rounded-full hover:bg-muted transition"
          >
            View on GitHub
          </Link>
        </motion.div>
      </section>

      {/* Reusable Footer Component */}
      <Footer />
    </main>
  );
}
