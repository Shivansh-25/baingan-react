import "@/styles/basic.css";
import "@/styles/fonts.css";
import Navbar from "@/components/navbar/Navbar";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User signed up:", data);
      //router.push("/home");
    } else {
      setError(data.error);
    }
    if (data.error == "User already registered") {
      // router issue
      //router.push("/auth/login");
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <image
        src="/baingan1.png"
        width={400}
        height={300}
        alt="Baingan"
        className="absolute z-10 top-0 left-0"
      />
      <div className="flex flex-col justify-center items-center h-[85vh]">
        <div className="flex flex-col gap-5 justify-center items-center katibeh text-white">
          <div className="bg-[#2a2626] flex flex-col p-7 rounded-[20px] w-[20vw] text-white items-center justify-center">
            <div className="text-3xl mb-3 flex flex-col items-center justify-center">
              <h2>Sign Up</h2>
              <h3 className="text-xl mt-2">
                Welcome to <span className="text-purple-700">Baingan</span>
              </h3>
            </div>
            <div className="flex w-[100%] mt-3 flex-col items-center justify-center gap-5">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="bg-[#373333] rounded-xl p-2 w-[100%]"
                value={userData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="bg-[#373333] rounded-xl p-2 w-[100%]"
                value={userData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="bg-[#373333] rounded-xl p-2 w-[100%] "
                value={userData.password}
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="bg-[#373333] rounded-xl p-2 w-[100%] "
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
              <button
                className="bg-[#1e1515] p-3 pl-7 pr-7 rounded-xl mb-1 text-white"
                onClick={handleSignup}
              >
                Sign up
              </button>
              <div className="flex items-center mt-1 bg-[#1e1515] p-3 rounded-xl">
                <div className="flex items-center justify-center">
                  <FcGoogle />
                  <p className="ml-4">Sign in with Google</p>
                </div>
              </div>
              <div className="mt-4">
                <p>
                  <Link to="/login">
                    <span className="text-purple-500 cursor-pointer">
                      Sign in
                    </span>
                  </Link>
                  {"  "}
                  instead
                </p>
              </div>
              {/* {error && <p>{error}</p>} */}
              {error && <p>{error}</p>}
            </div>
          </div>
          <div className="flex gap-5 kaushan mt-9">
            <div className="text-2xl bg-[#272222] pl-12 pr-12 pt-5 rounded-[20px] text-white transform rotate-[-12deg]">
              <p>CLUBS</p>
            </div>
            <div className="text-2xl bg-[#272222] pl-12 pr-12 p-5 rounded-[20px] text-white transform rotate-[8deg]">
              <p>NOTES</p>
            </div>
            <div className="text-2xl bg-[#272222] pl-12 pr-12 p-5 rounded-[20px] text-white trasfrom rotate-[-11deg]">
              <p>MEMES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
