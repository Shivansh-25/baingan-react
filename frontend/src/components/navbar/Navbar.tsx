import "@/styles/fonts.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-transparent flex justify-center items-center gap-10 h-20 mt-5 text-white katibeh text-2xl">
      <div className="flex gap-10">
        <Link to="/">
          <button>
            <p>Home</p>
          </button>
        </Link>
        <button>
          <p>Features</p>
        </button>
        <Link to="/login">
          <button>
            <p>Sign in</p>
          </button>
        </Link>
      </div>
    </nav>
  );
}
