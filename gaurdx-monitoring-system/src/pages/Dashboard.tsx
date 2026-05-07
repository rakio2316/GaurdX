import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { Detection, Robot } from '../types';
import { 
  Eye, 
  Shield, 
  AlertTriangle, 
  Bot,
  Activity,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';

const chartData = [
  { time: '00:00', detections: 2, threats: 1 },
  { time: '04:00', detections: 1, threats: 0 },
  { time: '08:00', detections: 4, threats: 1 },
  { time: '12:00', detections: 8, threats: 2 },
  { time: '16:00', detections: 12, threats: 3 },
  { time: '20:00', detections: 6, threats: 1 },
  { time: 'Now', detections: 5, threats: 1 },
];

export default function Dashboard() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [robots, setRobots] = useState<Robot[]>([
    { id: '1', name: 'Eagle-1', status: 'patrolling', battery: 87, speed: 35, zone: 'Zone Alpha', lastSignal: 'Now' },
    { id: '2', name: 'Hawk-2', status: 'active', battery: 62, speed: 28, zone: 'Zone Bravo', lastSignal: 'Now' },
    { id: '3', name: 'Falcon-3', status: 'charging', battery: 23, speed: 0, zone: 'Base', lastSignal: 'Now' },
  ]);

  useEffect(() => {
    const q = query(collection(db, "detections"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Detection));
      setDetections(data);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Command Center</h2>
        <p className="text-sm text-zinc-500 mt-1">Real-time aerial surveillance monitoring</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          label="Total Detections" 
          value="6" 
          subValue="All time" 
          icon={Eye} 
          color="cyan"
        />
        <SummaryCard 
          label="Active Threats" 
          value="3" 
          subValue="Requires attention" 
          icon={Shield} 
          color="red"
          badge
        />
        <SummaryCard 
          label="Unread Alerts" 
          value="2" 
          subValue="Pending review" 
          icon={AlertTriangle} 
          color="orange"
          badge
        />
        <SummaryCard 
          label="Active Robots" 
          value="3" 
          subValue="Currently deployed" 
          icon={Bot} 
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#161F2A] border border-[#1E293B] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Detection Activity</h3>
              <p className="text-xs text-zinc-500">Last 24 hours</p>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-mono font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-cyan-500">Detections</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-500">Threats</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorDet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1720', border: '1px solid #1E293B', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="detections" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorDet)" />
                <Area type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorThr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Robot Fleet Panel */}
        <div className="bg-[#161F2A] border border-[#1E293B] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Robot Fleet</h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">3/4 active</span>
          </div>
          
          <div className="space-y-4 flex-1">
            {robots.map((robot) => (
              <div key={robot.id} className="bg-[#0F1720]/50 border border-[#1E293B] rounded-xl p-4 hover:border-cyan-500/30 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:text-cyan-500 transition-colors">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{robot.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          robot.status === 'patrolling' ? "bg-cyan-500" : robot.status === 'active' ? "bg-green-500" : "bg-orange-500"
                        )} />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{robot.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                     <div className="flex items-center justify-between text-[9px] font-mono mb-1 text-zinc-500">
                      <span>{robot.battery}%</span>
                    </div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          robot.battery > 50 ? "bg-cyan-500" : robot.battery > 20 ? "bg-orange-500" : "bg-red-500"
                        )} 
                        style={{ width: `${robot.battery}%` }} 
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-500">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {robot.speed} km/h
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {robot.zone.replace('Zone ', '')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, subValue, icon: Icon, color, badge }: { 
  label: string; 
  value: string; 
  subValue: string; 
  icon: any; 
  color: 'cyan' | 'red' | 'orange' | 'green';
  badge?: boolean;
}) {
  const colors = {
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
    red: "bg-red-500/10 border-red-500/20 text-red-500",
    orange: "bg-orange-500/10 border-orange-500/20 text-orange-500",
    green: "bg-green-500/10 border-green-500/20 text-green-500",
  };

  return (
    <div className={cn("bg-[#161F2A] border border-[#1E293B] p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-all")}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-4xl font-bold text-white tracking-tighter">{value}</span>
          </div>
        </div>
        <div className={cn("p-3 rounded-xl", colors[color])}>
          {badge ? <Icon className="w-6 h-6" fill="currentColor" fillOpacity={0.2} /> : <Icon className="w-6 h-6" />}
        </div>
      </div>
      <p className="text-xs text-zinc-500">{subValue}</p>
      
      {/* Decorative background element */}
      <div className={cn("absolute -bottom-6 -right-6 w-24 h-24 blur-3xl opacity-10 rounded-full", color === 'cyan' ? 'bg-cyan-500' : color === 'red' ? 'bg-red-500' : color === 'orange' ? 'bg-orange-500' : 'bg-green-500')} />
    </div>
  );
}
