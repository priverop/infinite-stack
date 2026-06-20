import { useState } from 'react';
import { GithubIcon } from './icons';

interface FooterProps {
  removeState: () => void;
  removeStorage: () => void;
  onToggleStats: () => void;
}

export default function Footer({ removeState, removeStorage, onToggleStats }: FooterProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRemove = () => {
    removeState();
    removeStorage();
    setConfirmOpen(false);
  };

  return (
    <footer className="mt-4 pt-4 border-t border-line text-ink-faint text-sm italic">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2">
          <a
            href="https://github.com/priverop/infinite-stack"
            rel="nofollow"
            target="_blank"
            className="inline-block text-ink-faint hover:text-ink-muted transition-colors">
            <GithubIcon />
          </a>
          -
          <span className="whitespace-nowrap">
            Inspired by{' '}
            <a
              href="https://drmeth.com/"
              rel="nofollow"
              target="_blank"
              className="text-teal font-semibold not-italic hover:text-teal-bright transition-colors">
              Dr. Meth
            </a>
            .
          </span>
          <span className="not-italic whitespace-nowrap">- Auto-saves every 10 seconds.</span>
        </p>
        <button
          type="button"
          onClick={onToggleStats}
          style={{ width: 'auto' }}
          className="ml-auto p-0 font-normal underline not-italic whitespace-nowrap hover:text-ink-muted transition-colors">
          Stats
        </button>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          style={{ width: 'auto' }}
          className="p-0 font-normal underline not-italic whitespace-nowrap hover:text-ink-muted transition-colors">
          Remove savefile
        </button>
      </div>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setConfirmOpen(false)}>
          <div
            className="max-w-sm rounded-lg border border-line bg-card p-6 not-italic text-ink-muted"
            onClick={(e) => e.stopPropagation()}>
            <p className="mb-4 text-base">
              This will remove everything: money, team, buildings... This action cannot be undone.
              Are you sure?
            </p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setConfirmOpen(false)} className="ghost">
                Cancel
              </button>
              <button type="button" onClick={handleRemove} className="ghost text-loss">
                Remove savefile
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
