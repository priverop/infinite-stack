import { useState } from 'react';

interface ActionsProps {
  sellWebsite: () => void;
  createWebsite: () => void;
  isDisabled: boolean;
}

export default function Actions({ sellWebsite, createWebsite, isDisabled }: ActionsProps) {
  const [animation, setAnimation] = useState(false);

  const handleCreate = () => {
    setAnimation(true);
    createWebsite();
  };

  const handleSell = () => {
    setAnimation(true);
    sellWebsite();
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <button
        className={`primary ${animation ? 'animate-heartbeat animate-duration-[50ms]' : ''}`}
        onClick={handleCreate}
        onAnimationEnd={() => setAnimation(false)}>
        Create Website
      </button>
      <button
        className={`secondary ${animation ? 'animate-jiggle animate-duration-[50ms]' : ''}`}
        onClick={handleSell}
        disabled={isDisabled}
        onAnimationEnd={() => setAnimation(false)}>
        Sell Website
      </button>
    </div>
  );
}
