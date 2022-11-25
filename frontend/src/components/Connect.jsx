const Connect = ({ connect }) => {
  return (
    <div className="pt-16">
      <h3 className="text-2xl font-light italic">1. Wallet Connection</h3>
      <button
        onClick={connect}
        className="px-2 mt-6 p-2 italic"
        style={{
            border: "2px solid #000",
        }}
      >
        connect wallet
      </button>
      <p className="mt-6">please unlock metamask</p>
    </div>
  );
};

export default Connect;
