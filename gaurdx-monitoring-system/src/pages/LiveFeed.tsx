import { useState } from 'react';
import { Bot, Maximize2, Monitor, LayoutGrid, Play, Shield, Wifi, Battery, Zap, Navigation, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

const robots = [
  { id: 'eagle-1', name: 'Eagle-1', status: 'patrolling', alt: 120, speed: 35, battery: 87, zone: 'Zone Alpha' },
  { id: 'hawk-2', name: 'Hawk-2', status: 'active', alt: 85, speed: 28, battery: 62, zone: 'Zone Bravo' },
  { id: 'falcon-3', name: 'Falcon-3', status: 'charging', alt: 0, speed: 0, battery: 23, zone: 'Base' },
  { id: 'osprey-4', name: 'Osprey-4', status: 'patrolling', alt: 145, speed: 42, battery: 94, zone: 'Zone Charlie' },
];

export default function LiveFeed() {
  const [selectedRobot, setSelectedRobot] = useState(robots[0]);
  const [viewMode, setViewMode] = useState<'single' | 'grid' | 'four'>('single');

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Live Feed</h2>
          <p className="text-sm text-zinc-500 mt-1">Real-time video streams from aerial robots</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={selectedRobot.id}
            onChange={(e) => setSelectedRobot(robots.find(r => r.id === e.target.value) || robots[0])}
            className="bg-[#161F2A] border border-[#1E293B] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500/50 min-w-[150px]"
          >
            {robots.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          
          <div className="flex items-center bg-[#161F2A] border border-[#1E293B] rounded-lg p-1">
            <button 
              onClick={() => setViewMode('single')}
              className={cn(
                "p-2 rounded-md flex items-center gap-2 text-xs font-bold uppercase transition-all",
                viewMode === 'single' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-zinc-500 hover:text-white"
              )}
            >
              <Monitor className="w-4 h-4" />
              Single
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-md flex items-center gap-2 text-xs font-bold uppercase transition-all",
                viewMode === 'grid' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-zinc-500 hover:text-white"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Dual
            </button>
            <button 
              onClick={() => setViewMode('four')}
              className={cn(
                "p-2 rounded-md flex items-center gap-2 text-xs font-bold uppercase transition-all",
                viewMode === 'four' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-zinc-500 hover:text-white"
              )}
            >
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-current rounded-sm" />
                <div className="w-1.5 h-1.5 bg-current rounded-sm" />
                <div className="w-1.5 h-1.5 bg-current rounded-sm" />
                <div className="w-1.5 h-1.5 bg-current rounded-sm" />
              </div>
              Quad
            </button>
          </div>
        </div>
      </header>

      {/* Video Container */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {viewMode === 'single' ? (
          <div className="h-full bg-[#0F1720] border border-[#1E293B] rounded-2xl overflow-hidden relative group">
            <VideoFeed robot={selectedRobot} />
          </div>
        ) : viewMode === 'grid' ? (
          <div className="h-full grid grid-cols-2 gap-4">
            <div className="bg-[#0F1720] border border-[#1E293B] rounded-2xl overflow-hidden relative group">
              <VideoFeed robot={robots[0]} />
            </div>
            <div className="bg-[#0F1720] border border-[#1E293B] rounded-2xl overflow-hidden relative group">
              <VideoFeed robot={robots[1]} />
            </div>
          </div>
        ) : (
          <div className="h-full grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-[#0F1720] border border-[#1E293B] rounded-2xl overflow-hidden relative group">
              <VideoFeed robot={robots[0]} />
            </div>
            <div className="bg-[#0F1720] border border-[#1E293B] rounded-2xl overflow-hidden relative group">
              <VideoFeed robot={robots[1]} />
            </div>
            <div className="bg-[#0F1720] border border-[#1E293B] rounded-2xl overflow-hidden relative group">
              <VideoFeed robot={robots[2]} />
            </div>
            <div className="bg-[#0F1720] border border-[#1E293B] rounded-2xl overflow-hidden relative group">
              <VideoFeed robot={robots[3]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoFeed({ robot }: { robot: typeof robots[0] }) {
  return (
    <>
      {robot.status === 'charging' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10">
          <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4 border border-zinc-700">
            <Zap className="w-6 h-6 text-orange-500 animate-pulse" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest text-center px-4">AWAITING SIGNAL...</h3>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 opacity-40" />
          
          {/* OSD (On-Screen Display) */}
          <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="bg-red-500 border border-red-600 px-1.5 py-0.5 flex items-center gap-1.5 text-white text-[8px] font-bold uppercase tracking-widest shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </div>
                <div className="text-white font-mono text-xs font-bold tracking-widest uppercase bg-black/40 px-2 py-0.5 backdrop-blur-sm">{robot.name}</div>
              </div>
              
              <div className="flex gap-2">
                <div className="bg-black/40 border border-white/10 p-1.5 backdrop-blur-sm flex flex-col gap-0.5">
                  <div className="flex items-center justify-between gap-3 text-[8px] font-mono text-white/60">
                    <span>FPS: 30.0</span>
                    <span>LAT: 120ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-[40%] h-[40%] border border-white/20 relative">
                <div className="absolute top-1/2 left-0 w-4 h-px bg-white -translate-y-1/2 -ml-2" />
                <div className="absolute top-1/2 right-0 w-4 h-px bg-white -translate-y-1/2 -mr-2" />
                <div className="absolute left-1/2 top-0 h-4 w-px bg-white -translate-x-1/2 -mt-2" />
                <div className="absolute left-1/2 bottom-0 h-4 w-px bg-white -translate-x-1/2 -mb-2" />
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-4 font-mono text-[8px] font-bold text-white/70 uppercase">
                 <div className="flex items-center gap-1.5">
                  <Navigation className="w-3 h-3 text-cyan-500" />
                  <span className="text-white">{robot.alt}m</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-green-500" />
                  <span className="text-white">{robot.speed}km/h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-orange-500" />
                  <span className="text-white">{robot.battery}%</span>
                </div>
              </div>
              
              <div className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-widest">
                {robot.zone}
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all shadow-lg">
              <Play className="w-3 h-3 fill-currentColor" />
            </button>
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-zinc-500 uppercase font-bold tracking-widest">AIRSTREAM SECURE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-zinc-400 hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
