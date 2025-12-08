// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 컨텍스트 생성
const AuthContext = createContext(null);

// Provider 컴포넌트 (App 전체를 감쌀 껍데기)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // 필요하다면 여기서 localStorage 저장 로직 추가 가능
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 어디서든 쉽게 유저 정보를 가져다 쓸 수 있는 훅
export const useAuth = () => useContext(AuthContext);