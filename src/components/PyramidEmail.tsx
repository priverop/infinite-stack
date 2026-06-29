import { useState } from 'react';
import { PYRAMID_COST } from '../hooks/useGameLogic';
import { formatMoney } from '../utils/format';

interface PyramidEmailProps {
  visible: boolean;
  retry: boolean;
  canTry: boolean;
  cooldownLeft: number;
  onJoin: () => void;
}

export default function PyramidEmail({
  visible,
  retry,
  canTry,
  cooldownLeft,
  onJoin
}: PyramidEmailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [read, setRead] = useState(false);

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        className="email-hint-badge email-hint-badge--pyramid"
        aria-label="Email from Tamayo"
        onClick={() => { setIsOpen(true); setRead(true); }}>
        <span className="email-hint-icon" aria-hidden>
          ✉️
        </span>
        {(canTry || !read) && <span className="email-hint-dot" aria-hidden />}
      </button>

      {isOpen && (
        <div className="email-modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="email-modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Email from Tamayo"
            onClick={(e) => e.stopPropagation()}>
            <div className="email-modal-head">
              <div className="flex flex-col">
                <strong className="text-xs uppercase tracking-widest text-teal">
                  {retry ? 'Re: New email' : 'New email'}
                </strong>
                <span className="font-mono text-sm text-ink mt-0.5">From: Tamayo</span>
              </div>
              <button
                type="button"
                className="email-modal-close"
                aria-label="Close"
                onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <p className="text-sm text-ink-muted leading-relaxed mb-4">
              {retry
                ? "Don't give up bro!! Trust me, I've been informed TOO well!! You need to keep investing. Keep clicking!!"
                : "It's TIME bro!! Told you I'd let you know. Join my academy!! 5% chance you get in! Go??"}
            </p>

            <button
              type="button"
              className="ghost disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!canTry}
              onClick={onJoin}>
              {cooldownLeft > 0
                ? `Keep clicking — ${cooldownLeft} to go`
                : `Join: ${formatMoney(PYRAMID_COST)}`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
