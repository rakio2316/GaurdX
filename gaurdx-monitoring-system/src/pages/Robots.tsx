import { useState } from 'react';
import { Bot, Plus, Trash2, Edit2, Battery, Zap, Navigation, Activity, TrendingUp, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import { Robot } from '../types';

export default function Robots() {
  const [robots, setRobots] = useState<Robot[]>([
    { id: '1', name: 'Eagle-1', status: 'patrolling', battery: 87, speed: 35, zone: 'Zone Alpha', lastSignal: 'Now' },
    { id: '2', name: 'Hawk-2', status: 'active', battery: 62, speed: 28, zone: 'Zone Bravo', lastSignal: 'Now' },
    { id: '3', name: 'Falcon-3', status: 'charging', battery: 23, speed: 0, zone: 'Base', lastSignal: 'Now' },
    { id: '4', name: 'Osprey-4', status: 'patrolling', battery: 94, speed: 42, zone: 'Zone Charlie', lastSignal: 'Now' },
  ]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Robot Fleet</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage and monitor your aerial robots</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-[#090E14] hover:bg-cyan-400 font-bold rounded-lg text-sm transition-all shadow-lg shadow-cyan-500/20">
          <Plus className="w-5 h-5" />
          Add Robot
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {robots.map((robot) => (
          <div key={robot.id} className="bg-[#161F2A] border border-[#1E293B] rounded-2xl p-6 hover:border-zinc-700 transition-all group">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 transition-colors border border-zinc-700 shadow-inner">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{robot.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      robot.status === 'patrolling' ? "bg-cyan-500" : robot.status === 'active' ? "bg-green-500" : "bg-orange-500"
                    )} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">{robot.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-zinc-600 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                <button className="p-2 text-zinc-600 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5" />
                    Battery
                  </div>
                  <span>{robot.battery}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      robot.battery > 50 ? "bg-cyan-500" : robot.battery > 20 ? "bg-orange-500" : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                    )} 
                    style={{ width: `${robot.battery}%` }} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0F1720]/50 border border-[#1E293B] rounded-xl p-4">
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1 block">Speed</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-500/50" />
                    <span className="text-sm font-bold text-white">{robot.speed} km/h</span>
                  </div>
                </div>
                <div className="bg-[#0F1720]/50 border border-[#1E293B] rounded-xl p-4">
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1 block">Zone</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-500/50" />
                    <span className="text-sm font-bold text-white">{robot.zone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
