import { useState } from 'react';
import { Search, Download, RefreshCw, ChevronDown, Calendar, Database } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DataLogs() {
  const [activeTab, setActiveTab] = useState<'detections' | 'alerts'>('detections');

  const logs = [
    { time: 'Apr 30 17:08', type: 'Weapon', threat: 'CRITICAL', confidence: '94%', status: 'ACTIVE', location: 'East Gate - Sector 4' },
    { time: 'Apr 30 17:08', type: 'Suspicious Activity', threat: 'HIGH', confidence: '87%', status: 'INVESTIGATING', location: 'North Fence - Sector 2' },
    { time: 'Apr 30 17:08', type: 'Unauthorized Person', threat: 'MEDIUM', confidence: '76%', status: 'ACTIVE', location: 'Building C - Roof Access' },
    { time: 'Apr 30 17:08', type: 'Vehicle', threat: 'LOW', confidence: '92%', status: 'RESOLVED', location: 'Loading Dock B' },
    { time: 'Apr 30 17:08', type: 'Suspicious Activity', threat: 'HIGH', confidence: '81%', status: 'ACTIVE', location: 'Airspace - Zone Delta' },
    { time: 'Apr 30 17:08', type: 'Package', threat: 'MEDIUM', confidence: '68%', status: 'INVESTIGATING', location: 'Main Entrance' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Data Logs</h2>
          <p className="text-sm text-zinc-500 mt-1">Historical data storage & export</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </header>

      <div className="flex items-center justify-between">
        <div className="flex items-center bg-[#161F2A] border border-[#1E293B] rounded-xl p-1">
          <button 
            onClick={() => setActiveTab('detections')}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-2",
              activeTab === 'detections' ? "bg-[#0F1720] text-white border border-[#1E293B] shadow-lg" : "text-zinc-500 hover:text-white"
            )}
          >
            Detections (6)
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-2",
              activeTab === 'alerts' ? "bg-[#0F1720] text-white border border-[#1E293B] shadow-lg" : "text-zinc-500 hover:text-white"
            )}
          >
            Alerts (6)
          </button>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-[#161F2A] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#0F1720] border-b border-[#1E293B]">
            <tr>
              <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Time</th>
              <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Type</th>
              <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Threat</th>
              <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Confidence</th>
              <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Location</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-zinc-800/30 transition-colors group cursor-pointer">
                <td className="p-6 text-xs text-zinc-500 font-mono">{log.time}</td>
                <td className="p-6 text-sm font-bold text-white">{log.type}</td>
                <td className="p-6">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border",
                    log.threat === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                    log.threat === 'HIGH' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                    log.threat === 'MEDIUM' ? "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" :
                    "bg-green-500/10 text-green-500 border-green-500/20"
                  )}>
                    <div className={cn(
                      "w-1 h-1 rounded-full",
                      log.threat === 'CRITICAL' ? "bg-red-500" :
                      log.threat === 'HIGH' ? "bg-orange-500" :
                      log.threat === 'MEDIUM' ? "bg-cyan-500" :
                      "bg-green-500"
                    )} />
                    {log.threat}
                  </div>
                </td>
                <td className="p-6 text-sm text-zinc-400 font-mono">{log.confidence}</td>
                <td className="p-6">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    log.status === 'ACTIVE' ? "text-red-500" :
                    log.status === 'INVESTIGATING' ? "text-orange-500" :
                    "text-green-500"
                  )}>
                    {log.status}
                  </span>
                </td>
                <td className="p-6 text-xs text-zinc-400">{log.location}</td>
                <td className="p-6 text-right">
                  <ChevronDown className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
