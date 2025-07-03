'use client';

import { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth, db } from '@/lib/firebase/config';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { getMessaging, getToken } from "firebase/messaging";

const AuthContext = createContext({ 
  user: null, 
  userInfo: null, 
  loading: true, 
  login: () => {}, 
  logout: () => {} 
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false); // Start as false for mock

  // Simulate user login
  const login = (loggedInUser, loggedInUserInfo) => {
    setUser(loggedInUser);
    setUserInfo(loggedInUserInfo);
  };

  // Simulate user logout
  const logout = () => {
    setUser(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ user, userInfo, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
