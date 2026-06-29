import { useState } from 'react';

interface EmailHintProps {
  visible: boolean;
  raised?: boolean;
  onDismiss: () => void;
}

export default function EmailHint({ visible, raised = false, onDismiss }: EmailHintProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!visible) return null;

  function close(): void {
    setIsOpen(false);
    onDismiss();
  }

  return (
    <>
      <button
        type="button"
        className={`email-hint-badge${raised ? ' email-hint-badge--raised' : ''}`}
        aria-label="You have a new email"
        onClick={() => setIsOpen(true)}
      >
        <span className="email-hint-icon" aria-hidden>
          ✉️
        </span>
        <span className="email-hint-dot" aria-hidden />
      </button>

      {isOpen && (
        <div className="email-modal-overlay" onClick={close}>
          <div
            className="email-modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Email from Tamayo"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="email-modal-head">
              <div className="flex flex-col">
                <strong className="text-xs uppercase tracking-widest text-teal">
                  New email
                </strong>
                <span className="font-mono text-sm text-ink mt-0.5">From: Tamayo</span>
              </div>
              <button
                type="button"
                className="email-modal-close"
                aria-label="Close"
                onClick={close}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Hey bro! Would you like to generate new income streams without leaving your
              current job? Trust me bro, I've been informed TOO WELL... Keep clicking and
              I'll let you know!!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
