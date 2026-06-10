import { GithubIcon } from './icons';

export default function Footer() {
  return (
    <footer className="mt-4 pt-4 border-t border-line text-ink-faint text-sm italic">
      <p>
        Inspired by{' '}
        <a
          href="https://drmeth.com/"
          rel="nofollow"
          target="_blank"
          className="text-teal font-semibold not-italic hover:text-teal-bright transition-colors">
          Dr. Meth
        </a>
        .
      </p>
      <p>
        <a
          href="https://github.com/priverop/infinite-stack"
          rel="nofollow"
          target="_blank"
          className="inline-block mt-2 text-ink-faint hover:text-ink-muted transition-colors">
          <GithubIcon />
        </a>
      </p>
    </footer>
  );
}
