import { 
  OperationType, 
  handleFirestoreError 
} from "../lib/firestoreError";
import { auth, db } from "../lib/firebase";
import { onSnapshot, collection, query, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { UserProfile } from "../types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        try {
          const docRef = doc(db, "users", authUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, profile, loading };
}
