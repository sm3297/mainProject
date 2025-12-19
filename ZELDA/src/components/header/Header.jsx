import { Link } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';
import UserDetailModal from '../../pages/startpage/UserDetailModal';

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

    const [isModalOpen, setIsModalOpen] = useState(false); 

    return(
        <div>
            <header className="hacking-header">
                <div className="header-content">
                    <Link to="/" > 
                        <h1 className="hacking-title" >Hacking Lab </h1>
                        {level && <span className="level-title">| Level {level}</span>} 
                    </Link>

                    {isModalOpen && <UserDetailModal onClose={() => setIsModalOpen(false)} />}

                    <div className="top-nav">
                        {user ? (
                            <UserAvatar 
                                name={user.name} 
                                onClick={() => setIsModalOpen(true)} 
                            />
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
        </div>   
    )
}