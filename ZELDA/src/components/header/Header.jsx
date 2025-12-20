import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LogoutModal from './LogoutModal';

const UserAvatar = ({ name, onClick }) => {
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    
    return (
      <div className="user-avatar-container" onClick={onClick} title="프로필 설정">
        <div className="user-avatar">
          {initial}
        </div>
      </div>
    );
};

export default function Header({ level, user }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
      logout();
      setIsLogoutModalOpen(false);
    };

    return(
        <div>
            <header className="hacking-header">
                <div className="header-content">
                    <Link to="/" > 
                        <h1 className="hacking-title" >Hacking Lab </h1>
                        {level && <span className="level-title">| Level {level}</span>} 
                    </Link>

                    <div className="top-nav">
                        <Link to="/qna" className="nav-btn">Q&A</Link>
                        {user ? (
                            <>
                                <UserAvatar 
                                    name={user.name} 
                                    onClick={() => navigate('/profile')} 
                                />
                                <button onClick={() => setIsLogoutModalOpen(true)} className="nav-btn">
                                    LOGOUT
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-btn">
                                LOGIN
                                </Link>
                                <Link to="/signup" className="nav-btn signup">
                                SIGN UP
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
            {isLogoutModalOpen && (
                <LogoutModal 
                    onConfirm={handleLogout}
                    onCancel={() => setIsLogoutModalOpen(false)}
                />
            )}
        </div>   
    )
}