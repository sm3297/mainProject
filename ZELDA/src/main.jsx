import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './routes/AppRouter'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. 유저 관리소(Provider)가 앱 전체를 감쌈 */}
    <AuthProvider>
      {/* 2. 네비게이션(Router)이 화면 전환 담당 */}
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);