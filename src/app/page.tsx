import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-[var(--background)] text-[var(--foreground)]">
      <Image
        src="/logo-devqr.svg"
        alt="DevQRCard Logo"
        width={100}
        height={100}
        className="mb-6 dark:invert"
      />

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        Welcome to <span className="text-blue-600 dark:text-blue-400">DevQRCard</span> 🚀
      </h1>

      <p className="mt-4 text-lg max-w-xl text-gray-600 dark:text-gray-400">
        Your all-in-one developer profile, portfolio, and QR-card generator — beautifully simple, instantly shareable.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a
          href="/create"
          className="bg-blue-600 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Create Your Card
        </a>

        <a
          href="https://github.com/your-repo-url"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-300 dark:border-gray-600 text-[var(--foreground)] px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}
