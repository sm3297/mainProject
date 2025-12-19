import React from 'react';
import './LogoutModal.css';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>로그아웃</h2>
        <p>정말로 로그아웃 하시겠습니까?</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-confirm-logout-btn">
            예
          </button>
          <button onClick={onCancel} className="nav-btn">
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
