import AutobahnSVG from "../assets/autobahn_logo.svg";

const Navbar = () => {
  return (
    <div>
      <div className="flex space-between mb-4">
        <img
          src={AutobahnSVG}
          style={{
            width: "180px",
            height: "90px",
          }}
          alt="Autobahn Network SVG"
        />
      </div>
    </div>
  );
};

export default Navbar;
