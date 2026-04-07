import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Check, CalendarDays, ChevronLeft } from 'lucide-react';

const GamificationModal = ({ isOpen, onClose }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [innerDropdown, setInnerDropdown] = useState(false);
  const [tierView, setTierView] = useState(false);
  
  const [eventValue, setEventValue] = useState({ id: null, label: 'Select an event' });
  const [rewardValue, setRewardValue] = useState({ id: null, label: 'Select a reward' });
  const [isTimeBound, setIsTimeBound] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');

  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [tempX, setTempX] = useState('');
  const [tempY, setTempY] = useState(''); 
  const [selectedTier, setSelectedTier] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const eventOptions = [
    { id: 'orders', label: 'Brings more than #Y orders', hasX: true, placeholder: 'eg: 10' },
    { id: 'sales', label: 'Cross $X in sales', hasX: true, placeholder: 'eg: 100' },
    { id: 'posts', label: 'Posts X times every Y period', hasComplex: true },
    { id: 'onboard', label: 'Is Onboarded', hasX: false },
  ];

  const rewardOptions = [
    { id: 'flat', label: 'Flat $X bonus', hasX: true, placeholder: '$ e.g. 100' },
    { id: 'tier', label: 'Upgrade Commission Tier', hasX: false, isSubMenu: true },
  ];

  const durations = ["14 days", "1 month", "2 months", "3 months", "1 year"];
  const tiers = ["Bronze Tier", "Silver Tier", "Gold Tier", "Platinum Tier", "Diamond Tier"];

  
useEffect(() => {
  if (isOpen) {
    setActiveDropdown(null);
    setInnerDropdown(false);
    setTierView(false);
    setSelectedOptionId(null);
    
 
    setEventValue({ id: null, label: 'Select an event' });
    setRewardValue({ id: null, label: 'Select a reward' });
    setIsTimeBound(false);
    setExpiryDate('');
  
    setTempX('');
    setTempY('');
    setSelectedTier('');
  }
}, [isOpen]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => { setShowSuccess(false); onClose(); }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onClose]);

  if (!isOpen && !showSuccess) return null;

  const isFormValid = eventValue.id !== null && rewardValue.id !== null && (!isTimeBound || (isTimeBound && expiryDate !== ''));

  return (
    <>
      {showSuccess && (
        <div className="fixed top-10 right-10 z-[100] animate-in slide-in-from-right-full">
          <div className="bg-[#1E293B] text-white px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-slate-700">
            <div className="bg-emerald-500 rounded-full p-0.5"><Check size={12} strokeWidth={4} /></div>
            <span className="text-[14px] font-bold">Reward Created!</span>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/10 backdrop-blur-[2px] p-4 overflow-y-auto pt-20">
          <div className="w-full max-w-[440px] bg-white rounded-[24px] shadow-2xl relative animate-in zoom-in-95 flex flex-col max-h-[90vh]">
            
            {/* Header - Fixed */}
            <div className="p-8 pb-4 flex justify-between items-center">
              <h2 className="text-[20px] font-bold text-slate-800 tracking-tight">Create your reward system</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-visible px-8 pb-4 space-y-6">
              
              {/* Event Dropdown */}
              <div className="relative">
                <label className="block text-[13px] font-bold text-slate-600 mb-2">Reward event <span className="text-red-500">*</span></label>
                <button 
                  onClick={() => { setActiveDropdown(activeDropdown === 'event' ? null : 'event'); setSelectedOptionId(null); }}
                  className={`w-full h-11 px-4 flex items-center justify-between border-2 rounded-xl text-[14px] transition-all ${activeDropdown === 'event' ? 'border-[#E879F9] ring-4 ring-purple-50' : 'border-slate-100 text-slate-500'}`}
                >
                  <span className={eventValue.id ? 'text-slate-900 font-semibold' : ''}>{eventValue.label}</span>
                  <ChevronDown size={18} />
                </button>

                {activeDropdown === 'event' && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl py-2 overflow-hidden">
                    {eventOptions.map((opt) => (
                      <div key={opt.id} className="px-2">
                        <button onClick={() => { setSelectedOptionId(opt.id); setTempX(''); setTempY(''); if(!opt.hasX && !opt.hasComplex){ setEventValue({id: opt.id, label: opt.label}); setActiveDropdown(null); }}} className={`w-full text-left px-4 py-3 rounded-xl text-[14px] flex items-center justify-between ${selectedOptionId === opt.id ? 'text-[#E879F9] font-bold bg-purple-50/50' : 'text-slate-600 hover:bg-slate-50'}`}>
                          {opt.label} {selectedOptionId === opt.id && <Check size={16} />}
                        </button>
                        {selectedOptionId === opt.id && (opt.hasX || opt.hasComplex) && (
                          <div className="px-4 pb-4 pt-2 space-y-3">
                            <div className="flex gap-2">
                              <input type="text" placeholder={opt.placeholder || "eg: 4"} className="flex-1 h-10 px-3 border-2 border-[#E879F9] rounded-xl text-[14px] outline-none" value={tempX} onChange={(e) => setTempX(e.target.value.replace(/[^0-9]/g, ''))} />
                              {opt.hasComplex && (
                                <div className="flex-1 relative">
                                  <button onClick={() => setInnerDropdown(!innerDropdown)} className="w-full h-10 px-3 border-2 border-slate-100 rounded-xl text-[13px] text-slate-400 flex items-center justify-between">{tempY || "Select duration"} <ChevronDown size={14} /></button>
                                  {innerDropdown && (
                                    <div className="absolute z-[60] w-full mt-1 bg-white border border-slate-100 shadow-xl rounded-xl py-1 max-h-[120px] overflow-y-auto">
                                      {durations.map(d => (<button key={d} onClick={() => { setTempY(d); setInnerDropdown(false); }} className="w-full text-left px-4 py-2 text-[12px] hover:bg-purple-50 text-slate-600">{d}</button>))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end"><button onClick={() => { setEventValue({id: opt.id, label: opt.id === 'posts' ? `Posts ${tempX} times every ${tempY}` : opt.label.replace('X', tempX)}); setActiveDropdown(null); }} disabled={!tempX || (opt.id === 'posts' && !tempY)} className="px-8 py-2 bg-[#E879F9] text-white text-[13px] font-bold rounded-xl">Save</button></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reward Dropdown */}
              <div className="relative">
                <label className="block text-[13px] font-bold text-slate-600 mb-2">Reward with <span className="text-red-500">*</span></label>
                <button 
                  onClick={() => { setActiveDropdown(activeDropdown === 'reward' ? null : 'reward'); setTierView(false); setSelectedOptionId(null); }}
                  className={`w-full h-11 px-4 flex items-center justify-between border-2 rounded-xl text-[14px] transition-all ${activeDropdown === 'reward' ? 'border-[#E879F9] ring-4 ring-purple-50' : 'border-slate-100 text-slate-500'}`}
                >
                  <span className={rewardValue.id ? 'text-slate-900 font-semibold' : ''}>{rewardValue.label}</span>
                  <ChevronDown size={18} />
                </button>

                {activeDropdown === 'reward' && (
                  <div className="absolute z-40 w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden min-h-[150px]">
                    {!tierView ? (
                      <div className="py-2">
                        {rewardOptions.map((opt) => (
                          <div key={opt.id} className="px-2">
                            <button onClick={() => { if(opt.isSubMenu){ setTierView(true); } else { setSelectedOptionId(opt.id); setTempX(''); }}} className={`w-full text-left px-4 py-3 rounded-xl text-[14px] flex items-center justify-between ${selectedOptionId === opt.id ? 'text-[#E879F9] font-bold bg-purple-50/50' : 'text-slate-600 hover:bg-slate-50'}`}>
                              {opt.label} {selectedOptionId === opt.id && <Check size={16} />}
                            </button>
                            {selectedOptionId === opt.id && opt.hasX && (
                              <div className="px-4 pb-4 pt-1 space-y-3">
                                <input type="text" placeholder={opt.placeholder} className="w-full h-10 px-3 border-2 border-[#E879F9] rounded-xl text-[14px] outline-none" value={tempX} onChange={(e) => setTempX(e.target.value.replace(/[^0-9]/g, ''))} />
                                <div className="flex justify-end"><button onClick={() => { setRewardValue({id: opt.id, label: opt.label.replace('X', tempX)}); setActiveDropdown(null); }} className="px-8 py-2 bg-[#E879F9] text-white text-[13px] font-bold rounded-xl">Save</button></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-4 duration-200">
                        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                           <h3 className="text-[14px] font-bold text-slate-800">Select a commission tier</h3>
                           <label className="text-[10px] font-black text-slate-400 mt-1 block uppercase">Upgrade to <span className="text-red-500">*</span></label>
                        </div>
                        <div className="max-h-[160px] overflow-y-auto">
                          {tiers.map(t => (<button key={t} onClick={() => setSelectedTier(t)} className={`w-full text-left px-5 py-3 text-[13px] border-b border-slate-50 last:border-0 ${selectedTier === t ? 'text-[#E879F9] font-bold bg-purple-50/50' : 'text-slate-600 hover:bg-slate-50'}`}>{t}</button>))}
                        </div>
                        <div className="p-4 flex items-center justify-between border-t border-slate-50">
                          <button onClick={() => { setTierView(false); setSelectedTier(''); }} className="px-4 py-2 text-[12px] font-bold text-slate-400 flex items-center gap-1"><ChevronLeft size={14} /> Go Back</button>
                          <button onClick={() => { setRewardValue({ id: 'tier', label: `Upgrade to {${selectedTier}}` }); setActiveDropdown(null); setTierView(false); }} disabled={!selectedTier} className="px-6 py-2 bg-[#E879F9] text-white text-[12px] font-bold rounded-xl disabled:bg-slate-100">Save</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Time Bound */}
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-slate-800">Make the reward time bound</span>
                  <button onClick={() => setIsTimeBound(!isTimeBound)} className={`w-11 h-6 rounded-full relative transition-colors ${isTimeBound ? 'bg-[#E879F9]' : 'bg-slate-200'}`}>
                    <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.75 transition-all ${isTimeBound ? 'left-5.5' : 'left-1'}`} />
                  </button>
                </div>
                <p className="text-[12px] text-slate-400 mt-1 leading-snug">Choose an end date to stop this reward automatically.</p>
                {isTimeBound && (
                  <div className="mt-4 relative animate-in slide-in-from-top-1">
                    <input type="date" min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} className="w-full h-11 pl-4 pr-10 border-2 border-slate-100 rounded-xl text-[14px] font-medium text-slate-700" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    <CalendarDays size={18} className="absolute right-4 top-3 text-slate-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="p-8 pt-4 flex gap-4">
              <button onClick={onClose} className="flex-1 h-12 border-2 border-slate-100 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => setShowSuccess(true)} disabled={!isFormValid} className={`flex-1 h-12 rounded-2xl font-bold text-white shadow-xl transition-all ${!isFormValid ? 'bg-slate-100 text-slate-300' : 'bg-[#E879F9] hover:bg-[#d946ef]'}`}>Create Reward</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GamificationModal;