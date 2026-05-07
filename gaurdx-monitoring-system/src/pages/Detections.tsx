import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Detection } from '../types';
import { 
  Zap, 
  MapPin, 
  AlertTriangle, 
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Bot,
  Truck,
  Box,
  User,
  Eye
} from 'lucide-react';
import { cn, formatDate } from '../lib/utils';

export default function Detections() {
  const [detections, setDetections] = useState<Detection[]>([
    {
      id: '1',
      type: 'weapon',
      severity: 'critical',
      timestamp: new Date().toISOString(),
      location: 'East Gate - Sector 4',
      description: 'Firearm detected near east perimeter gate by thermal imaging',
      status: 'active',
      confidence: 94,
      robotId: 'eagle-1'
    },
    {
      id: '2',
      type: 'suspicious_activity',
      severity: 'high',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      location: 'North Fence - Sector 2',
      description: 'Individual observed circumventing fence line at unauthorized access point',
      status: 'investigating',
      confidence: 87,
      robotId: 'hawk-2'
    }
  ]);
  const [role, setRole] = useState('All Levels');

  useEffect(() => {
    const q = query(collection(db, "detections"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if(!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Detection));
        setDetections(data);
      }
    });
    return unsubscribe;
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'weapon': return <Shield className="w-5 h-5 text-red-500" />;
      case 'suspicious_activity': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'vehicle': return <Truck className="w-5 h-5 text-green-500" />;
      case 'package': return <Box className="w-5 h-5 text-orange-500" />;
      case 'unauthorized_entry': return <User className="w-5 h-5 text-red-500" />;
      default: return <Eye className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Detections</h2>
          <p className="text-sm text-zinc-500 mt-1">Weapon & suspicious activity detection log</p>
        </div>
        
        <div className="flex items-center gap-4">
           <select className="bg-[#161F2A] border border-[#1E293B] text-white text-xs rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500/50">
            <option>All Levels</option>
            <option>Critical Only</option>
            <option>High Severity</option>
          </select>
          <select className="bg-[#161F2A] border border-[#1E293B] text-white text-xs rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500/50">
            <option>All Status</option>
            <option>Active</option>
            <option>Resolved</option>
          </select>
        </div>
      </header>

      <div className="space-y-4">
        {detections.map((detection) => (
          <div 
            key={detection.id} 
            className="bg-[#161F2A] border border-[#1E293B] rounded-2x p-6 hover:border-zinc-700 transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#0F1720] rounded-xl flex items-center justify-center border border-[#1E293B] shadow-inner">
                  {getIcon(detection.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-white capitalize">{detection.type.replace('_', ' ')}</h4>
                     <span className={cn(
                        "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                        detection.severity === 'critical' ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                        detection.severity === 'high' ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" :
                        "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20"
                      )}>
                        {detection.severity}
                      </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 max-w-2xl">{detection.description}</p>
                  
                  <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {detection.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" />
                      {detection.robotId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-4">
                <div className="flex flex-col items-end">
                   <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{detection.confidence}% confidence</div>
                   <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{formatDate(detection.timestamp)}</div>
                </div>
                
                <div className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md",
                  detection.status === 'active' ? "text-red-500 bg-red-500/10" :
                  detection.status === 'investigating' ? "text-orange-500 bg-orange-500/10" :
                  "text-green-500 bg-green-500/10"
                )}>
                  {detection.status}
                </div>
              </div>
            </div>
            
            {/* Background accent */}
            <div className={cn(
              "absolute top-0 right-0 w-1 h-full",
              detection.severity === 'critical' ? "bg-red-500/30" : "bg-cyan-500/10"
            )} />
          </div>
        ))}
      </div>
    </div>
  );
}
