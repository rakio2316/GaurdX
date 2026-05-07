import { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Filter, CheckCircle2, AlertCircle, Clock, MapPin } from 'lucide-react';
import { cn, formatDate } from '../lib/utils';

export default function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      title: 'CRITICAL: Weapon Detected',
      severity: 'critical',
      tag: 'weapon detected',
      description: 'High-confidence weapon detection at east perimeter gate. Immediate response required.',
      timestamp: 'Apr 30 17:08:30',
      location: 'East Gate - Sector 4',
      status: 'unread'
    },
    {
      id: '2',
      title: 'Perimeter Breach Attempt',
      severity: 'high',
      tag: 'perimeter breach',
      description: 'Individual observed attempting to bypass fence security at north perimeter.',
      timestamp: 'Apr 30 17:05:12',
      location: 'North Fence - Sector 2',
      status: 'unread'
    },
    {
      id: '3',
      title: 'Unauthorized Drone Activity',
      severity: 'high',
      tag: 'suspicious activity',
      description: 'Repeated unauthorized drone detected in restricted airspace zone Delta.',
      timestamp: 'Apr 30 16:55:00',
      location: 'Airspace - Zone Delta',
      status: 'read',
      acknowledged: true
    }
  ]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Alerts</h2>
          <p className="text-sm text-zinc-500 mt-1">2 unread alerts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="bg-[#161F2A] border border-[#1E293B] text-white text-[11px] rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500/50 uppercase font-bold tracking-widest">
            <option>All Severities</option>
            <option>Critical</option>
            <option>High</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all">
            <CheckCircle2 className="w-4 h-4" />
            Mark all read
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={cn(
              "bg-[#161F2A] border border-[#1E293B] p-6 rounded-2xl relative transition-all group",
              alert.status === 'unread' ? "border-cyan-500/30 ring-1 ring-cyan-500/10 shadow-[0_4px_20px_rgba(6,182,212,0.05)]" : "opacity-60"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {alert.status === 'unread' && (
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shadow-[0_0_8px_#06b6d4]" />
                )}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className={cn("text-lg font-bold", alert.severity === 'critical' ? 'text-red-500' : 'text-white')}>
                      {alert.title}
                    </h4>
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border",
                      alert.severity === 'critical' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      alert.severity === 'high' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                      "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
                    )}>
                      {alert.severity}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 font-bold uppercase tracking-widest border border-zinc-700">
                      {alert.tag}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">{alert.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!alert.acknowledged && (
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-white/5 hover:bg-zinc-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
                    <Check className="w-3 h-3" />
                    Acknowledge
                  </button>
                )}
                <button className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {alert.timestamp}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {alert.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
