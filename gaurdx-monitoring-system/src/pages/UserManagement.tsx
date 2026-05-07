import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { UserProfile } from '../types';
import { 
  ShieldCheck, 
  Trash2, 
  UserPlus, 
  MoreVertical, 
  Search,
  Shield,
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ ...doc.data() } as UserProfile));
      setUsers(usersData);
    });
    return unsubscribe;
  }, []);

  const toggleRole = async (userId: string, currentRole: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        role: currentRole === 'admin' ? 'operator' : 'admin'
      });
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm("ARE YOU SURE? This will remove all database permissions for this ID.")) {
      try {
        await deleteDoc(doc(db, "users", userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="font-serif italic text-3xl font-bold tracking-tight">Access Management</h2>
          <p className="font-mono text-[10px] opacity-50 uppercase tracking-widest mt-1">
            System Privileges & Identity Control
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#141414] text-[#E4E3E0] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:invert transition-all">
          <UserPlus className="w-4 h-4" />
          Authorize New ID
        </button>
      </header>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
          <input 
            type="text" 
            placeholder="FILTER BY IDENTITY..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#141414] px-12 py-4 font-mono text-xs focus:outline-none focus:bg-zinc-50 transition-colors"
          />
        </div>

        <div className="flex-1 bg-white border border-[#141414] overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#141414] text-[#E4E3E0] font-mono text-[10px] uppercase tracking-[0.2em] z-10">
              <tr>
                <th className="p-4 font-medium border-r border-[#E4E3E0]/20">Identity</th>
                <th className="p-4 font-medium border-r border-[#E4E3E0]/20 text-center">Status</th>
                <th className="p-4 font-medium border-r border-[#E4E3E0]/20 text-center">Authorization</th>
                <th className="p-4 font-medium text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-zinc-50 transition-colors group">
                  <td className="p-4 border-r border-[#141414]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 border border-[#141414] flex items-center justify-center">
                        <UserIcon className="w-5 h-5 opacity-40" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold">{user.email}</div>
                        <div className="font-mono text-[9px] opacity-40 uppercase tracking-tighter">
                          ID: {user.uid.slice(0, 12)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-r border-[#141414] text-center">
                    <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-green-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  </td>
                  <td className="p-4 border-r border-[#141414] text-center">
                    <button 
                      onClick={() => toggleRole(user.uid, user.role)}
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest transition-all",
                        user.role === 'admin' 
                          ? "bg-purple-100 text-purple-900 border border-purple-200" 
                          : "bg-blue-100 text-blue-900 border border-blue-200"
                      )}
                    >
                      {user.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                      {user.role}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => deleteUser(user.uid)}
                        className="p-2 hover:bg-red-50 text-red-600 transition-colors"
                        title="REVOKE ACCESS"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="pt-4 border-t border-[#141414] flex justify-between items-center opacity-40">
        <p className="font-mono text-[9px] uppercase tracking-widest">
          SYSTEM_LOG: {new Date().toISOString()} | MASTER_AUTH_ENABLED
        </p>
        <p className="font-mono text-[9px] uppercase tracking-widest">
          Total Authorized Units: {users.length}
        </p>
      </footer>
    </div>
  );
}
