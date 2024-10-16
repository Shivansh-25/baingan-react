import "@/styles/basic.css"
import "@/styles/fonts.css";
import Navbar from "@/components/navbar/Navbar.jsx";
import Card2 from "../components/cards/homecard.jsx"
import CommunityIcon from "@/icons/communityIcon"
import ClubsIcon from "@/icons/clubsIcon";
import NewsIcon from "@/icons/newsIcon";
import FileShareIcon from "@/icons/fileShareIcon";
import ChatIcon from "@/icons/chatIcon";
import NetworkIcon from "@/icons/networkIcon";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <img
        src="/baingan1.png"
        width={400}
        height={300}
        alt="Baingan"
        className="absolute z-10 top-0 left-0"
      />
      <div className="flex flex-col gap-5 justify-center items-center h-screen katibeh text-white">
        <div className="text-6xl">
          <h1>Unlocking your campus experience</h1>
        </div>
        <div className="text-4xl">
          <h2>Academics, Clubs, Resources - all in one place</h2>
        </div>
        <button className="katibeh bg-[#8c40ba] p-5 rounded-[20px] text-white">
          WELCOME
        </button>
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
      <div className="flex gap-10 justify-center mb-20">
        <Card2
          title="Academic Communities"
          text="Join communities tailored to your major, classes, or personal interests to collaborate on notes, assignments, and form study groups. Connect with classmates to foster academic support and enhance your learning experience through shared insights and collective growth."
          icon={CommunityIcon}
        />
        <Card2
          title="Official Club Hub"
          text="Explore and engage with a diverse array of recognized clubs and student organizations tailored to your interests and academic pursuits. Stay informed about upcoming club events, workshops, and social activities, fostering connections with like-minded peers who share your passions."
          icon={ClubsIcon}
        />
        <Card2
          title="Campus News Feed"
          text="Stay connected with the pulse of campus life by following communities and clubs that matter to you. Access a centralized platform for posts, announcements, and updates, ensuring you never miss important campus news. Discover new opportunities, events, and initiatives that enrich your university experience."
          icon={NewsIcon}
        />
      </div>
      <div className="flex gap-10 justify-center mb-60">
        <Card2
          title="Secure File Sharing"
          text="Simplify collaboration and organization with secure file sharing for class notes, resources, and group projects. Upload, access, and manage academic materials seamlessly, facilitating teamwork and enhancing productivity. Ensure your study materials are readily available and easily retrievable whenever you need them."
          icon={FileShareIcon}
        />
        <Card2
          title="Integrated Chat"
          text="Foster real-time communication and coordination within your academic and extracurricular communities. Use integrated chat features to facilitate study groups, plan club activities, and maintain connections with fellow students. Streamline communication to stay engaged and informed across campus initiatives."
          icon={ChatIcon}
        />
        <Card2
          title="Alumni Network"
          text="Tap into a robust network of program alumni to build professional connections and gain valuable insights into career paths. Access mentorship opportunities, receive guidance on internships, jobs, and career development, and expand your professional circle with alumni who share your educational background and aspirations."
        icon={NetworkIcon}
        />
      </div>
    </div>
  );
};

export default Home;
