export default function Actions({ sellWebsite, createWebsite, isDisabled }) {
  return (
    <div>
      <button className="primary" onClick={createWebsite}>
        Create Website
      </button>
      <button className="secondary mt-3" onClick={sellWebsite} disabled={isDisabled}>
        Sell Website
      </button>
    </div>
  );
}
