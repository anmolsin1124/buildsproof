import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Navbar from './Navbar';
import Footer from './Footer';

const DashBoard = () => {
  const navigate = useNavigate();
  const imageUrl = new URL('../public/DashBoard.png', import.meta.url).href;
  
  return (
    <div className="w-full bg-white">
      <Navbar />
      <div className="w-full h-screen relative">
        <img 
          src={imageUrl} 
          alt="Dashboard Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start pl-16 ">
          <h2 className="text-black text-5xl font-bold mb-4 drop-shadow-lg max-w-xl text-left">Get Hired Based on Your <span className="text-green-500">Real Work,</span><br />Not Just Resumes</h2>
          <p className="text-gray-700 text-lg mb-8 drop-shadow-lg max-w-2xl text-left">Showcase projects, solve problems, and connect with recruiters<br />— all in one platform.</p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button onClick={() => navigate('/login')} className="border-2 border-green-500  text-green-500 px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-500 hover:text-white transition cursor-pointer">Get Started</button>
              <button className="border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-500 hover:text-white transition cursor-pointer">Explore Projects</button>
            </div>
            <button className="border-2 bg-green-500 border-green-500 text-white px-31 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-green-500 transition cursor-pointer w-fit">Prove your Skill</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
