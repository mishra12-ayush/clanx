import React, { useState } from 'react';
import GamificationModal from './components/GamificationModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCFD] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 animate-in fade-in duration-700">
        <h1 className="text-5xl font-black text-[#1E293B] tracking-tight">
          Clannex <span className="text-[#E879F9]">Gamification</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto text-lg">
          Enable Gamification to start crafting your custom reward system.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-4 bg-[#E879F9] text-white font-bold rounded-2xl shadow-xl shadow-purple-100 hover:bg-[#d946ef] transition-all transform hover:scale-105 active:scale-95"
        >
          Enable Gamification
        </button>
      </div>

      <GamificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;