interface ActionsProps {
  sellWebsite: () => void;
  createWebsite: () => void;
  isDisabled: boolean;
}

export default function Actions({ sellWebsite, createWebsite, isDisabled }: ActionsProps) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <button className="primary" onClick={createWebsite}>
        Create Website
      </button>
      <button className="secondary" onClick={sellWebsite} disabled={isDisabled}>
        Sell Website
      </button>
    </div>
  );
}
