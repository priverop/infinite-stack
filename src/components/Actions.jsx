export default function Actions({ sellWebsite, createWebsite }) {
  return (
    <div>
      <button className="primary" onClick={createWebsite}>
        Create Website
      </button>
      <button className="secondary mt-3" onClick={sellWebsite}>
        Sell Website
      </button>
    </div>
  );
}
