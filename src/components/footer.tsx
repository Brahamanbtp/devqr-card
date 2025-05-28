// components/footer.tsx
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full px-4 py-4 border-t border-border bg-background text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 static">
      <div className="flex items-center gap-1 text-sm text-center">
        Built with{" "}
        <span className="text-pink-500 animate-bounce">❤️</span> by{" "}
        <span className="font-semibold text-foreground">DevQRCard</span> ©{" "}
        {new Date().getFullYear()}
      </div>

      <div className="flex gap-4 text-lg">
        <a
          href="https://github.com/Brahamanbtp/devqr-card"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-foreground transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-foreground transition-colors"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
