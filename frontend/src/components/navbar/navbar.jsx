import '@/styles/fonts.css'

export default function Navbar() {
  return (
    <nav className="bg-transparent flex justify-center items-center gap-10 h-20 mt-5 text-white katibeh text-2xl">
      <div className="flex gap-10">
        <button>
          <p>Home</p>
        </button>
        <button>
          <p>Features</p>
        </button>
        <button>
          <p>Sign in</p>
        </button>
      </div>
    </nav>
  );
}
