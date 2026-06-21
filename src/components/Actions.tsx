import { useState } from 'react';

interface ActionsProps {
  sellWebsite: () => void;
  createWebsite: () => void;
  isDisabled: boolean;
  agiAchieved: boolean;
  flipPurchased: boolean;
}

export default function Actions({
  sellWebsite,
  createWebsite,
  isDisabled,
  agiAchieved,
  flipPurchased
}: ActionsProps) {
  const [animationBuy, setAnimationBuy] = useState(false);
  const [animationSell, setAnimationSell] = useState(false);

  const handleCreate = () => {
    setAnimationBuy(true);
    createWebsite();
  };

  const handleSell = () => {
    setAnimationSell(true);
    sellWebsite();
  };

  if (agiAchieved) return null;

  return (
    <div className="flex flex-col gap-2 mt-4">
      <button
        className={`primary ${animationBuy ? 'animate-heartbeat animate-duration-[50ms]' : ''}`}
        onClick={handleCreate}
        onAnimationEnd={() => setAnimationBuy(false)}>
        Create Website
      </button>
      <button
        className={`secondary ${animationSell ? 'animate-jiggle animate-duration-[50ms]' : ''}`}
        onClick={handleSell}
        disabled={isDisabled}
        onAnimationEnd={() => setAnimationSell(false)}>
        {flipPurchased ? 'Sell Website (+1%)' : 'Sell Website'}
      </button>
    </div>
  );
}
