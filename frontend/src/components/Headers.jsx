import AutobahnSVG from "../assets/autobahn_logo.svg";

const Header = ({ address }) => {
  return (
    <div>
      <div className="flex space-between">
        <h2 className="mt-8 text-4xl font-light font-bold">Disperse Tokens</h2>
        {address && (
          <span className="text-l pt-2 font-light">
            🏎💨
          </span>
        )}
      </div>
      <div></div>
      <p className="pt-8 text-xl font-light">
        <i>verb</i> distribute TXL or tokens to multiple addresses
      </p>
    </div>
  );
};

export default Header;
