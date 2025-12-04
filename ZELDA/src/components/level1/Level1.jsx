import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Level1() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // --- 스타일 변수 (두 컴포넌트에서 동일하게 사용) ---
    const primaryColor = '#0070c0'; // AltoroMutual 메인 파란색
    const secondaryColor = '#dc3545'; // 경고 빨간색
    const successColor = '#155724'; // 성공 진한 녹색
    const containerBg = '#f5f5f5';
    const mainPanelBg = '#fff';
    const borderColor = '#ccc';

    // --- 시뮬레이터 로직 상수 ---
    const tautologyPattern = /('|--|#|or\s+1=1|or\s+'a'='a'|'\s*=\s*')/i;
    
    // --- UI 스타일 (인라인) ---
    const inputStyle = { 
        width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', 
        border: '1px solid #aaa', borderRadius: '3px' 
    };
    const buttonStyle = { 
        width: '100%', padding: '10px', backgroundColor: secondaryColor, color: 'white', 
        border: 'none', cursor: 'pointer', borderRadius: '3px', marginTop: '10px' 
    };
    const messageBoxStyle = (isSuccess) => ({
        marginTop: '15px', padding: '10px', border: '1px solid', borderRadius: '4px',
        whiteSpace: 'pre-wrap', fontWeight: 'bold',
        backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
        color: isSuccess ? successColor : '#721c24',
        borderColor: isSuccess ? '#c3e6cb' : secondaryColor
    });


    // --------------------------------------------------
    // 핸들러 함수 정의
    // --------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        const user_input = (username + " " + password).toLowerCase();

        // 1. 🚨 Tautology-Based Injection 공격 감지 및 페이지 이동
        if (tautologyPattern.test(user_input)) {
            setMessage(`🎉 SQL Injection 성공! 관리자 페이지로 이동합니다...`);

            setTimeout(() => {
                navigate('/admin-secret'); // 성공 페이지로 이동
            }, 1000);

            return;
        }

        // 2. ❌ SQL 문법 오류 시뮬레이션
        if (username.includes("'") || password.includes("'")) {
            return setMessage(
                `
                ❌ SQL Syntax Error: 문법 오류로 서버 응답 실패.
                (서버가 raw error를 반환하여 공격자에게 정보가 노출되는 시나리오입니다.)
                `
            );
        }
        
        // 3. 일반적인 실패
        setMessage('❌ 인증 실패. Invalid username or password.');
    };

    // --------------------------------------------------
    // JSX 렌더링 시작
    // --------------------------------------------------
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: containerBg, minHeight: '100vh' }}>
            
            {/* 상단 헤더 */}
            <header style={{ backgroundColor: mainPanelBg, borderBottom: '3px solid #eee', padding: '10px 50px', display: 'flex', justifyContent: 'space-between' }}>
                <h1 style={{ color: primaryColor, fontSize: '1.5rem', margin: 0 }}>Hacking Lab - Level 1: SQL Injection Study</h1>
                <a href="/" style={{ color: primaryColor, textDecoration: 'none', lineHeight: '1.5rem' }}>메인으로 돌아가기</a>
            </header>
            
            {/* 메인 콘텐츠 (사이드바 + 학습 영역) */}
            <div style={{ display: 'flex', maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
                
                {/* 1. 사이드바 (목차) */}
                <aside style={{ width: '250px', backgroundColor: '#e9e9e9', border: `1px solid ${borderColor}`, padding: '15px', marginRight: '20px', borderRadius: '5px' }}>
                    <h4 style={{ color: primaryColor, borderBottom: `2px solid ${borderColor}`, paddingBottom: '5px', marginBottom: '15px' }}>SQLi 학습 목차</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ padding: '5px 0' }}><a href="#theory" style={{ color: '#333', textDecoration: 'none' }}>1. Tautology 공격 이론</a></li>
                        <li style={{ padding: '5px 0' }}><a href="#practice" style={{ color: primaryColor, fontWeight: 'bold', textDecoration: 'none' }}>2. 실습 영역 (로그인 폼)</a></li>
                        <li style={{ padding: '5px 0' }}><a href="#code" style={{ color: '#333', textDecoration: 'none' }}>3. 취약 코드 분석</a></li>
                        <li style={{ padding: '5px 0' }}><a href="#defense" style={{ color: '#333', textDecoration: 'none' }}>4. 방어 코드</a></li>
                    </ul>
                </aside>

                {/* 2. 학습 및 실습 본문 */}
                <main style={{ flexGrow: 1, backgroundColor: mainPanelBg, border: `1px solid ${borderColor}`, padding: '30px', borderRadius: '5px' }}>
                    
                    <h2 style={{ color: primaryColor, borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                        SQL Injection Level 1: Tautology-Based (무조건 참)
                    </h2>

                    {/* --- 이론 영역 --- */}
                    <h3 id="theory" style={{ color: primaryColor, marginTop: '25px' }}>1. Tautology-Based 공격 이론</h3>
                    <p>
                        **목표:** WHERE 절의 논리 조건을 항상 **참(True)**으로 만들어 ID/PW 일치 여부와 상관없이 인증을 통과합니다.
                    </p>
                    <p style={{ background: '#eee', padding: '10px', borderLeft: `5px solid ${secondaryColor}` }}>
                        **공격 페이로드:** <code style={{ fontWeight: 'bold', color: secondaryColor }}>' OR 1=1 --</code>
                    </p>
                    <p>
                        **서버의 가상 실행 쿼리:** <code style={{ background: '#fff9d6', padding: '2px 5px' }}>SELECT * FROM users WHERE password = '' OR 1=1 --' AND user='admin'</code>
                    </p>

                    <h3 id="practice" style={{ color: primaryColor, marginTop: '30px' }}>2. 실습 영역 (로그인 폼)</h3>
                    <div style={{ padding: '20px', border: '1px dashed #aaa', maxWidth: '400px', margin: '15px 0' }}>
                        
                        {/* ⭐️ 로그인 폼 (실습 영역) */}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">아이디</label>
                            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} required />

                            <label htmlFor="password">비밀번호</label>
                            <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />

                            <button type="submit" style={buttonStyle}>
                                LOGIN (Try SQL Injection)
                            </button>
                        </form>
                        
                        {/* 실습 결과 메시지 */}
                        {message && (
                            <pre style={messageBoxStyle(message.includes('성공'))}>
                                {message.includes('성공') ? '🎉 ' : '❌ '}{message}
                            </pre>
                        )}
                    </div>
                    
                    {/* --- 학습 자료 계속 --- */}
                    <h3 id="code" style={{ color: primaryColor, marginTop: '30px' }}>3. 취약 코드 분석</h3>
                    <pre style={{ background: '#222', color: '#00ff41', padding: '15px', overflowX: 'auto', borderRadius: '4px' }}>
                        {`// 🚨 서버의 취약한 코드 (사용자 입력값을 직접 삽입)
const query = 
    "SELECT * FROM users WHERE password = '" + password + "'";
// 💡 방어: ' OR 1=1 -- 를 넣으면 쿼리 자체가 공격 코드(SQL)로 변질됩니다.`}
                    </pre>

                    <h3 id="defense" style={{ color: primaryColor, marginTop: '30px' }}>4. 방어 코드 (Prepared Statement)</h3>
                    <pre style={{ background: '#222', color: '#fff', padding: '15px', overflowX: 'auto', borderRadius: '4px' }}>
                        {`// ✅ 안전한 코드 (Prepared Statement 사용)
const query = "SELECT * FROM users WHERE password = ?";
// DB 드라이버가 입력값을 코드가 아닌 '데이터'로만 인식하게 합니다.
DB.execute(query, [password]); `}
                    </pre>

                    <div id="next" style={{ marginTop: '30px', textAlign: 'center' }}>
                         <button 
                            onClick={() => window.location.href = '/'} 
                            style={{ padding: '10px 20px', backgroundColor: primaryColor, color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                        >
                            메인으로 돌아가기
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Level1;
