import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full px-4 py-4 border-t border-border bg-background text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 fixed bottom-0 left-0 z-50">
      <div className="flex items-center gap-1 text-sm">
        Built with{" "}
        <span className="text-pink-500 animate-bounce">❤️</span> by{" "}
        <span className="font-semibold text-foreground">DevQRCard</span> ©{" "}
        {new Date().getFullYear()}
      </div>

      <div className="flex gap-4 text-muted-foreground text-lg">
        <a
          href="https://github.com/Brahamanbtp/devqr-card"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
