import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserAPI, deleteUserAPI } from './MockApi';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';
import { SHA256, enc } from 'crypto-js';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phoneNumber: '',
    nationality: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        name: user.name,
        password: '',
        confirmPassword: '',
        birthdate: user.birthdate,
        phoneNumber: user.phoneNumber || '',
        nationality: user.nationality || '',
        status: user.status || '대학(원)생',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const updateData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        nationality: formData.nationality,
        status: formData.status,
      };

      if (formData.password) {
        const salt = Math.random().toString(36).substring(2);
        const hashedPassword = SHA256(formData.password + salt).toString(enc.Hex);
        updateData.salt = salt;
        updateData.hashedPassword = hashedPassword;
      }

      const updatedUser = await updateUserAPI(user.id, updateData);
      updateProfile(updatedUser);

      alert('정보가 수정되었습니다.');
      navigate('/'); 
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const input = prompt("탈퇴하려면 'DELETE'라고 입력하세요.");
    if (input !== 'DELETE') return;

    setIsLoading(true);
    try {
      await deleteUserAPI(user.id);
      alert("계정이 삭제되었습니다.");
      logout(); 
      navigate('/'); 
    } catch (error) {
      alert("탈퇴 실패: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-form-container">
        <h2>회원 정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input 
              id="name"
              name="name" 
              value={formData.name}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">새 비밀번호</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="변경시에만 입력"
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">새 비밀번호 확인</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword" 
              placeholder="변경시에만 입력"
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="birthdate">생년월일 (8자리)</label>
            <input 
              id="birthdate"
              name="birthdate" 
              value={formData.birthdate}
              maxLength="8"
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">전화번호</label>
            <input 
              id="phoneNumber"
              name="phoneNumber" 
              value={formData.phoneNumber}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="nationality">국적</label>
            <input 
              id="nationality"
              name="nationality" 
              value={formData.nationality}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="status">신분</label>
            <select 
              id="status"
              name="status" 
              value={formData.status}
              onChange={handleChange} 
              required
            >
              <option value="대학(원)생">대학(원)생</option>
              <option value="직장인">직장인</option>
              <option value="무직">무직</option>
            </select>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? '처리 중...' : '수정하기'}
            </button>
            <button type="button" onClick={handleDelete} disabled={isLoading} className="delete-button">
              회원 탈퇴
            </button>
          </div>
        </form>
        
        <p className="switch-text">
          <span onClick={() => navigate(-1)}>뒤로가기</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
