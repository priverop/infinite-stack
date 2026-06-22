import { useState } from 'react';

interface CheckpointsProps {
  saveCheckpoint: (name: string) => void;
  listCheckpoints: () => string[];
  loadCheckpointState: (name: string) => void;
  deleteCheckpoint: (name: string) => void;
}

export default function Checkpoints({
  saveCheckpoint,
  listCheckpoints,
  loadCheckpointState,
  deleteCheckpoint
}: CheckpointsProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [checkpoints, setCheckpoints] = useState<string[]>([]);

  const openModal = () => {
    setCheckpoints(listCheckpoints());
    setOpen(true);
  };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    saveCheckpoint(trimmed);
    setCheckpoints(listCheckpoints());
    setName('');
  };

  const handleLoad = (checkpoint: string) => {
    loadCheckpointState(checkpoint);
    setOpen(false);
  };

  const handleDelete = (checkpoint: string) => {
    deleteCheckpoint(checkpoint);
    setCheckpoints(listCheckpoints());
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        style={{ width: 'auto' }}
        className="p-0 font-normal underline not-italic whitespace-nowrap hover:text-ink-muted transition-colors">
        Checkpoints
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-md rounded-lg border border-line bg-card p-6 not-italic text-ink-muted"
            onClick={(e) => e.stopPropagation()}>
            <p className="mb-4 text-base">Checkpoints</p>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Checkpoint name"
                className="flex-1 rounded border border-line bg-bg px-3 py-2 text-sm not-italic"
              />
              <button
                type="button"
                onClick={handleSave}
                disabled={!name.trim()}
                className="ghost disabled:opacity-40">
                Save
              </button>
            </div>
            {checkpoints.length === 0 ? (
              <p className="text-sm text-ink-faint">No checkpoints saved yet.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {checkpoints.map((checkpoint) => (
                  <li key={checkpoint} className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm">{checkpoint}</span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleLoad(checkpoint)} className="ghost">
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(checkpoint)}
                        className="ghost text-loss">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-end">
              <button type="button" onClick={() => setOpen(false)} className="ghost">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
