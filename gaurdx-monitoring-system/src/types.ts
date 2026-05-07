export type UserRole = 'admin' | 'operator';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export type AlertType = 'weapon' | 'suspicious_activity' | 'unauthorized_entry' | 'perimeter_breach' | 'vehicle' | 'package';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'active' | 'investigating' | 'resolved' | 'dismissed';

export interface Detection {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  timestamp: string;
  location: string;
  description: string;
  status: AlertStatus;
  confidence: number;
  robotId: string;
}

export type RobotStatus = 'patrolling' | 'active' | 'charging' | 'returning' | 'offline';

export interface Robot {
  id: string;
  name: string;
  status: RobotStatus;
  battery: number;
  speed: number;
  zone: string;
  lastSignal: string;
}
