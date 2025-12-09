import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // Link 임포트 필수!
import './Level3.css'; // 통합 CSS

function Level3Game() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showModal, setShowModal] = useState(false);
    
    // 🛡️ [Security] 매번 바뀌는 CSRF 토큰 (서버 세션 흉내)
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        // 컴포넌트 로드 시 랜덤 토큰 생성
        const randomToken = Math.random().toString(36).substring(2, 12);
        setCsrfToken(randomToken);
    }, []);

    // 피해자(은행 관리자) 상태
    const [user, setUser] = useState({
        name: 'Admin_Kim',
        role: 'Super Administrator',
        password: 'secure_password_99'
    });

    // 📜 분석용 DVWA 소스코드
    const sourceCode = `<?php
// vulnerabilities/csrf/source/medium.php

if( isset( $_GET[ 'Change' ] ) ) {
    // 1. Anti-CSRF Token 검증
    if( $_GET[ 'user_token' ] == $_SESSION[ 'session_token' ] ) {
        $p_new = $_GET[ 'password_new' ];
        $p_conf = $_GET[ 'password_conf' ];

        if( $p_new == $p_conf ) {
            // Update DB...
            echo "<pre>Password Changed.</pre>";
        }
    } else {
        echo "<pre>CSRF token is incorrect.</pre>";
    }
}
?>`;

    // 🖥️ F12 콘솔 해킹 도구 등록
    useEffect(() => {
        console.clear();
        console.log("%c🔵 SHIELD BANK ADMIN SHELL", "color: #00aaff; font-size: 20px; font-weight: bold; padding: 10px; border: 2px solid #00aaff;");
        console.log("%c[Mission] CSRF 토큰을 찾아 비밀번호를 'hacker123'으로 바꾸시오.", "color: white;");
        console.log("%c[Hint] Elements 탭에서 숨겨진(input type='hidden') 태그를 찾으세요.", "color: #fbbf24;");
        console.log("%c👉 사용법: hack('?파라미터=값&...')", "color: lime; font-weight:bold;");

        window.hack = (queryString) => {
            if (!queryString || !queryString.startsWith('?')) {
                console.error("❌ Error: Query must start with '?'");
                return;
            }
            console.log(`%c[*] Payload Sent: ${queryString}`, "color: yellow");
            setSearchParams(new URLSearchParams(queryString));
            return "Request Sent.";
        };

        return () => { delete window.hack; };
    }, [setSearchParams]);

    // 🚨 서버 동작 로직 (토큰 검증)
    useEffect(() => {
        const change = searchParams.get('Change');
        const p_new = searchParams.get('password_new');
        const p_conf = searchParams.get('password_conf');
        const tokenInput = searchParams.get('user_token');

        if (change) {
            // 1. 토큰 검사
            if (tokenInput !== csrfToken) {
                console.error(`❌ CSRF token mismatch. (Server expected: HIDDEN, You sent: ${tokenInput || 'null'})`);
                alert("🚫 보안 경고: CSRF Token이 일치하지 않습니다.");
                return;
            }

            // 2. 비번 변경
            if (p_new && p_conf && p_new === p_conf) {
                setUser(prev => ({ ...prev, password: p_new }));
                console.log("%c✅ Password Changed Successfully.", "color: #00ff00; background: #003300; padding: 4px;");
                alert("System: Password Changed.");

                if (p_new === 'hacker123') {
                    setTimeout(() => alert("🎉 Level 3 Clear! 토큰 우회 성공!"), 500);
                }
            } else {
                alert("System: Passwords did not match.");
            }
        }
    }, [searchParams, csrfToken]);

    return (
        <div className="game-container-l3">
            <div className="dashboard-card-l3">
                <header className="bank-header-l3">
                    <div style={{display:'flex', alignItems:'center'}}>
                        <h1 style={{margin:0, fontSize:'1.3rem', fontWeight:'bold'}}>🛡️ SHIELD BANK</h1>
                        <span className="admin-tag-l3">ADMIN</span>
                    </div>
                    <button className="view-source-btn-l3" onClick={() => setShowModal(true)}>&lt;/&gt; Source</button>
                </header>

                <div className="bank-content-l3">
                    {/* 🕵️‍♂️ [핵심] 숨겨진 토큰 필드 (Elements 탭에서만 보임) */}
                    <form className="hidden-security-form">
                        <input type="hidden" name="user_token" value={csrfToken} id="token_field" />
                    </form>

                    <div className="user-profile-l3">
                        <div className="avatar-l3">👤</div>
                        <div>
                            <h3 style={{margin:0, color:'#1e293b'}}>{user.name}</h3>
                            <p style={{margin:0, fontSize:'0.85rem', color:'#64748b'}}>{user.role}</p>
                        </div>
                    </div>

                    <div className="security-status-l3">
                        <div className="status-item-l3">
                            <span>Security Level</span>
                            <span className="value-l3 medium">Medium (Token Protected)</span>
                        </div>
                        <div className="status-item-l3">
                            <span>Current Password</span>
                            <span className="value-l3 password">{user.password}</span>
                        </div>
                    </div>

                    <div style={{background:'#eff6ff', padding:'15px', borderRadius:'8px', fontSize:'0.9rem', color:'#1e40af', borderLeft:'4px solid #3b82f6'}}>
                        <strong>Mission:</strong> Press <strong>F12</strong> to find the hidden token and use <code>hack()</code> in Console.
                    </div>
                </div>
            </div>

            {/* 소스코드 모달 */}
            {showModal && (
                <div className="modal-overlay-l3" onClick={() => setShowModal(false)}>
                    <div className="modal-box-l3" onClick={e => e.stopPropagation()}>
                        <div className="modal-top-l3">
                            <span>vulnerabilities/csrf/source/medium.php</span>
                            <button onClick={() => setShowModal(false)} style={{background:'none',border:'none',color:'#fff',cursor:'pointer'}}>✕</button>
                        </div>
                        <pre className="code-block-l3">{sourceCode}</pre>
                    </div>
                </div>
            )}

            {/* 👇 [여기 추가됨!] 이론 페이지로 돌아가기 버튼 */}
            <Link to="/level3" className="sim-exit-btn">🚪 이론으로 돌아가기</Link>
        </div>
    );
}

export default Level3Game;