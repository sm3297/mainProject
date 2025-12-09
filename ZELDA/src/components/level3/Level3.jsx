// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Level3.css'; // 공통 CSS (Level 1과 동일한 디자인)

// export default function Level3() {
//     const [activeSection, setActiveSection] = useState('intro');

//     // --- JWT 시뮬레이터 상태 ---
//     const [headerJson, setHeaderJson] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
//     const [payloadJson, setPayloadJson] = useState('{\n  "user": "guest",\n  "role": "user"\n}');
//     const [encodedToken, setEncodedToken] = useState('');

//     // JSON이 바뀔 때마다 실시간으로 Base64 인코딩하여 토큰 생성
//     useEffect(() => {
//         try {
//             // 1. Header Encode
//             const head = btoa(headerJson.replace(/\s/g, '')); // 공백 제거 후 인코딩
//             // 2. Payload Encode
//             const body = btoa(payloadJson.replace(/\s/g, ''));
//             // 3. Signature (가짜)
//             const sig = "c2VjcmV0"; 

//             setEncodedToken(`${head}.${body}.${sig}`);
//         } catch (e) {
//             setEncodedToken("Invalid JSON format...");
//         }
//     }, [headerJson, payloadJson]);

//     const handleNavClick = (id) => setActiveSection(id);

//     return (
//         <div>
//             {/* 공통 헤더 */}
//             <header className="hacking-header">
//                 <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b', fontWeight: '800' }}>Hacking Lab <span style={{fontWeight:'400', color:'#94a3b8'}}>| Level 3</span></h1>
//                 <Link to="/" style={{ textDecoration: 'none', color: '#64748b', fontSize:'0.9rem', fontWeight: '500' }}>Exit</Link>
//             </header>
            
//             <div className="theory-container">
                
//                 {/* [왼쪽] 사이드바 */}
//                 <aside className="sidebar">
//                     <div className="sidebar-title">Curriculum</div>
//                     <ul className="sidebar-list">
//                         <li><a href="#intro" className={`sidebar-link ${activeSection === 'intro' ? 'active' : ''}`} onClick={() => handleNavClick('intro')}>01. JWT란?</a></li>
//                         <li><a href="#structure" className={`sidebar-link ${activeSection === 'structure' ? 'active' : ''}`} onClick={() => handleNavClick('structure')}>02. 토큰 구조 분석</a></li>
//                         <li><a href="#simulation" className={`sidebar-link ${activeSection === 'simulation' ? 'active' : ''}`} onClick={() => handleNavClick('simulation')}>03. 실시간 JWT 실습</a></li>
//                         <li><a href="#attack" className={`sidebar-link ${activeSection === 'attack' ? 'active' : ''}`} onClick={() => handleNavClick('attack')}>04. None 알고리즘 공격</a></li>
//                     </ul>
//                     <Link to="/level3Game" className="game-btn-sidebar">🚀 실전 해킹 (Shadow Bank)</Link>
//                 </aside>

//                 {/* [오른쪽] 본문 */}
//                 <main className="content-panel">
//                     <h1 className="section-title1">JWT Logic Flaw</h1>
//                     <p className="section-desc">현대 웹 인증의 표준인 JWT(JSON Web Token)의 구조와, 치명적인 설계 결함(None Algorithm)을 학습합니다.</p>
                    
//                     <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

//                     {/* 1. JWT란? */}
//                     <div id="intro" style={{ paddingTop: '10px' }}>
//                         <h2 className="sub-title1">01. JWT(JSON Web Token)란?</h2>
//                         <p className="text-body">
//                             JWT는 유저 정보를 JSON 형태로 담아 암호화(또는 인코딩)한 토큰입니다. 
//                             로그인 시 서버가 발급해주며, 클라이언트는 이 토큰을 저장했다가 요청할 때마다 제시하여 "나 로그인했어!"라고 증명합니다.
//                         </p>
//                     </div>

//                     {/* 2. 구조 */}
//                     <div id="structure" style={{ paddingTop: '20px' }}>
//                         <h2 className="sub-title1">02. 토큰의 3단 구조</h2>
//                         <p className="text-body">
//                             JWT는 점(<code>.</code>)으로 구분된 세 부분으로 이루어져 있습니다.
//                         </p>
//                         <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#374151' }}>
//                             <li><strong style={{color:'#ef4444'}}>Header:</strong> 토큰의 타입과 해시 알고리즘 정보 (예: HS256)</li>
//                             <li><strong style={{color:'#8b5cf6'}}>Payload:</strong> 실제 유저 데이터 (아이디, 권한 등)</li>
//                             <li><strong style={{color:'#10b981'}}>Signature:</strong> 데이터 변조를 막기 위한 서명</li>
//                         </ul>
//                     </div>

//                     {/* 3. 시뮬레이터 (Interactive) */}
//                     <div id="simulation" style={{ paddingTop: '20px' }}>
//                         <h2 className="sub-title1">03. JWT 해부기 (Interactive)</h2>
//                         <p className="text-body">
//                             아래 JSON을 수정해보세요. 자동으로 인코딩되어 토큰이 만들어지는 과정을 볼 수 있습니다.
//                         </p>

//                         <div className="practice-box">
//                             <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
//                                 <div style={{ flex: 1 }}>
//                                     <label style={{fontWeight:'bold', color:'#ef4444'}}>1. Header (JSON)</label>
//                                     <textarea 
//                                         className="lab-input" 
//                                         style={{ height: '80px', fontFamily: 'monospace' }}
//                                         value={headerJson}
//                                         onChange={(e) => setHeaderJson(e.target.value)}
//                                     />
//                                 </div>
//                                 <div style={{ flex: 1 }}>
//                                     <label style={{fontWeight:'bold', color:'#8b5cf6'}}>2. Payload (JSON)</label>
//                                     <textarea 
//                                         className="lab-input" 
//                                         style={{ height: '80px', fontFamily: 'monospace' }}
//                                         value={payloadJson}
//                                         onChange={(e) => setPayloadJson(e.target.value)}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="query-viewer" style={{ background: '#fff', border: '2px solid #e5e7eb', color: '#333' }}>
//                                 <div style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', fontSize: '12px', color: '#888' }}>
//                                     GENERATED TOKEN (Base64 Encoded)
//                                 </div>
//                                 <div style={{ wordBreak: 'break-all', fontSize: '1.1rem', fontWeight: 'bold' }}>
//                                     {encodedToken.split('.').map((part, i) => (
//                                         <span key={i} style={{ 
//                                             color: i === 0 ? '#ef4444' : i === 1 ? '#8b5cf6' : '#10b981' 
//                                         }}>
//                                             {part}{i < 2 ? '.' : ''}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* 4. 공격 기법 */}
//                     <div id="attack" style={{ paddingTop: '20px' }}>
//                         <h2 className="sub-title1">04. None 알고리즘 취약점 (CVE-2015-9235)</h2>
//                         <p className="text-body">
//                             일부 JWT 라이브러리는 헤더의 <code>alg</code> 값을 <code>none</code>으로 설정하면, 
//                             <strong>"서명이 없어도 되는 토큰이구나"</strong>라고 착각하고 검증을 건너뛰는 치명적인 버그가 있었습니다.
//                         </p>
                        
//                         <div className="info-box" style={{ borderLeft: '4px solid #ef4444', background: '#fef2f2' }}>
//                             <strong>🔥 공격 시나리오:</strong><br/>
//                             1. 헤더의 <code>"alg": "HS256"</code>을 <code>"none"</code>으로 바꾼다.<br/>
//                             2. 페이로드의 <code>"role": "user"</code>를 <code>"admin"</code>으로 바꾼다.<br/>
//                             3. 서명 부분(Signature)을 지워서 서버로 보낸다.<br/>
//                             4. 서버는 서명 검증 없이 <strong>관리자 권한</strong>을 승인한다!
//                         </div>
//                     </div>

//                     <div style={{ marginTop: '60px', textAlign: 'center' }}>
//                         <p style={{ marginBottom: '20px', color: '#64748b' }}>
//                             이제 이 원리를 이용하여 'Shadow Bank'의 VIP 금고를 열어보세요.
//                         </p>
//                         <Link to="/level3Game" className="btn-action">
//                             실전 미션 도전하기 →
//                         </Link>
//                     </div>

//                 </main>
//             </div>
//         </div>
//     );
// }


// import React, { useState, useEffect } from 'react';

// function SecretInvite() {
//   const [inviteCode, setInviteCode] = useState('');
//   const [message, setMessage] = useState('');

//   // -------------------------------------------------------------
//   // 🕵️‍♂️ Level 3 핵심 로직: 숨겨진 초대 코드 생성 함수
//   // -------------------------------------------------------------
//   useEffect(() => {
//     // 개발자가 실수로 window 객체에 함수를 노출시켰다는 설정
//     window.makeInviteCode = async () => {
//       console.log("%c[SYSTEM] 초대 코드 생성 프로세스 시작...", "color: yellow");
      
//       try {
//         // 1. Open API를 호출하여 무작위 데이터(UUID)를 가져옴
//         const response = await fetch('https://random-data-api.com/api/v2/users');
//         const data = await response.json();
        
//         // 2. 가져온 데이터(uid)를 기반으로 초대 코드 생성
//         // 예: uid가 "1234-5678"이면 -> Base64 인코딩 -> "MTIzNC01Njc4"
//         const secretUid = data.uid;
//         const code = btoa(secretUid); // Base64 Encoding (HTB 오마주)

//         console.log(`%c[SUCCESS] 초대 코드가 생성되었습니다!`, "color: #00ff00; font-size: 14px;");
//         console.log(`%cCode: ${code}`, "color: cyan; font-weight: bold; font-size: 16px;");
//         console.log("이 코드를 입력창에 복사해 넣으세요.");
        
//         return code;
//       } catch (error) {
//         console.error("API 연결 실패. 다시 시도하세요.");
//       }
//     };

//     // 힌트를 콘솔에 슬쩍 흘려줍니다.
//     console.log("%c[DEBUG] invite_api.js loaded.", "color: gray");
//     console.log("%c[HINT] 'makeInviteCode()' function is available for admins.", "color: gray");
//   }, []);
//   // -------------------------------------------------------------

//   const handleCheck = () => {
//     // 클라이언트 측 검증: Base64로 디코딩이 가능한지, 길이가 적절한지 체크
//     try {
//       if (!inviteCode) {
//         setMessage("❌ 코드를 입력하세요.");
//         return;
//       }
      
//       const decoded = atob(inviteCode); // 디코딩 시도
//       if (decoded.length > 10 && inviteCode.endsWith('=')) {
//         // 대충 형식이 맞으면 성공 처리 (서버가 없으므로 엄격한 검증 불가)
//         setMessage("🎉 ACCESS GRANTED! Welcome to HTB(Hack The Beginner).");
//       } else {
//         setMessage("❌ 유효하지 않은 초대 코드입니다.");
//       }
//     } catch (e) {
//       setMessage("❌ 유효하지 않은 초대 코드입니다.");
//     }
//   };

//   // 화면상의 가짜 버튼 (작동 안 함)
//   const handleFakeClick = () => {
//     console.log("Error: Button is disabled via UI. Try using the console.");
//     alert("이 버튼은 고장 났습니다.\n개발자 도구(F12) > Console을 확인해보세요.");
//   };

//   return (
//     <div style={{ 
//       padding: '50px', 
//       background: '#141d2b', // HTB 스타일 다크 블루 배경
//       color: '#fff', 
//       fontFamily: "'Courier New', monospace", 
//       minHeight: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center'
//     }}>
//       <h1 style={{ color: '#9fef00' }}>HTB: Join the Team</h1>
//       <p>초대 코드를 입력하여 멤버십을 활성화하세요.</p>

//       <div style={{ background: '#1b283b', padding: '30px', borderRadius: '5px', border: '1px solid #9fef00', width: '400px' }}>
//         <div style={{ marginBottom: '20px' }}>
//           <label style={{ display: 'block', marginBottom: '10px', color: '#9fef00' }}>INVITE CODE</label>
//           <input 
//             type="text" 
//             value={inviteCode}
//             onChange={(e) => setInviteCode(e.target.value)}
//             placeholder="Paste code here..."
//             style={{ width: '90%', padding: '10px', background: '#0d131c', border: '1px solid #555', color: 'white' }}
//           />
//         </div>

//         <button 
//           onClick={handleCheck}
//           style={{ 
//             width: '100%', padding: '10px', 
//             background: '#9fef00', color: '#141d2b', fontWeight: 'bold', 
//             border: 'none', cursor: 'pointer', fontSize: '16px' 
//           }}
//         >
//           Join Now
//         </button>

//         <hr style={{ borderColor: '#333', margin: '20px 0' }} />

//         <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center' }}>초대 코드가 없으신가요?</p>
        
//         {/* 이 버튼은 함정입니다 */}
//         <button 
//           onClick={handleFakeClick}
//           style={{ 
//             background: 'transparent', border: '1px dashed #555', color: '#aaa', 
//             padding: '5px 10px', cursor: 'pointer', fontSize: '12px', width: '100%' 
//           }}
//         >
//           [CLICK TO GENERATE INVITE CODE]
//         </button>
//       </div>

//       <h3 style={{ marginTop: '30px', color: message.includes('GRANTED') ? '#9fef00' : 'red' }}>{message}</h3>
//     </div>
//   );
// }

// export default SecretInvite;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Level3.css'; // 통합 CSS 파일 사용

function Level3() { 
    const [activeSection, setActiveSection] = useState('intro');
    const [balance, setBalance] = useState(1000000); // 100만원
    const [msg, setMsg] = useState("정상 로그인 상태");

    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
    };

    // CSRF 공격 시뮬레이션
    const attack = () => {
        if (balance > 0) {
            setBalance(0);
            setMsg("🚨 [ALERT] 비정상적인 이체 발생! 잔고가 0원이 되었습니다.");
        }
    };

    const reset = () => {
        setBalance(1000000);
        setMsg("정상 로그인 상태");
    };

    return (
        <div>
            {/* 상단바 */}
            <header className="hacking-header">
                <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b', fontWeight: '800' }}>
                    Hacking Lab <span style={{fontWeight:'400', color:'#94a3b8'}}>| Level 3</span>
                </h1>
                <Link to="/" style={{ textDecoration: 'none', color: '#64748b', fontSize:'0.9rem' }}>Exit</Link>
            </header>
            
            <div className="theory-container">
                {/* 사이드바 */}
                <aside className="sidebar">
                    <div className="sidebar-title">Curriculum</div>
                    <ul className="sidebar-list">
                        <li><a href="#intro" className={`sidebar-link ${activeSection === 'intro' ? 'active' : ''}`} onClick={() => handleNavClick('intro')}>01. CSRF란?</a></li>
                        <li><a href="#mechanism" className={`sidebar-link ${activeSection === 'mechanism' ? 'active' : ''}`} onClick={() => handleNavClick('mechanism')}>02. 공격 원리</a></li>
                        <li><a href="#simulation" className={`sidebar-link ${activeSection === 'simulation' ? 'active' : ''}`} onClick={() => handleNavClick('simulation')}>03. 피해 체험</a></li>
                        <li><a href="#defense" className={`sidebar-link ${activeSection === 'defense' ? 'active' : ''}`} onClick={() => handleNavClick('defense')}>04. 방어 기법</a></li>
                    </ul>
                    <Link to="/level3Game" className="game-btn-sidebar">실전 해킹 (Game Start)</Link>
                </aside>

                {/* 본문 */}
                <main className="content-panel">
                    <h1 className="section-title">CSRF (Cross-Site Request Forgery)</h1>
                    <p className="section-desc">사용자의 의지와 무관하게, 해커가 의도한 행위를 웹사이트에 요청하게 만드는 공격입니다.</p>
                    
                    <hr style={{ margin: '30px 0', borderTop: '1px solid #e2e8f0' }} />

                    {/* 1. 개요 */}
                    <div id="intro">
                        <h2 className="sub-title1">01. CSRF란?</h2>
                        <p className="text-body">
                            사용자가 특정 사이트(예: 은행)에 로그인되어 있다는 점을 악용합니다. 
                            해커가 보낸 링크를 클릭하는 순간, 브라우저는 사용자의 <strong>권한(쿠키/세션)</strong>을 실어서 해커가 원하는 명령(송금, 비번 변경)을 서버로 보냅니다.
                        </p>
                        <div className="info-box" style={{borderLeft: '4px solid #f59e0b'}}>
                            <strong>비유:</strong><br/>
                            여러분이 졸고 있을 때, 도둑이 여러분의 손가락(지문)을 가져다가 스마트폰 잠금을 풀고 송금해버리는 것과 같습니다.
                        </div>
                    </div>

                    {/* 2. 원리 */}
                    <div id="mechanism">
                        <h2 className="sub-title1">02. 공격 원리</h2>
                        <p className="text-body">브라우저는 요청을 보낼 때, 해당 도메인의 쿠키를 <strong>자동으로 포함</strong>합니다. 이게 핵심 취약점입니다.</p>
                        <div style={{background:'#1e293b', padding:'15px', borderRadius:'8px', color:'#fff', fontFamily:'monospace', fontSize:'0.9rem'}}>
                            &lt;!-- 해커가 만든 가짜 이미지 태그 --&gt;<br/>
                            &lt;img src="<span style={{color:'#facc15'}}>http://bank.com/transfer?to=hacker&amount=100</span>" width=0 height=0 /&gt;
                        </div>
                        <p className="text-body" style={{marginTop:'10px'}}>사용자가 이 이미지를 로딩하는 순간, 브라우저는 <code>bank.com</code>으로 송금 요청을 보냅니다.</p>
                    </div>

                    {/* 3. 시뮬레이션 */}
                    <div id="simulation">
                        <h2 className="sub-title1">03. 피해 시뮬레이션</h2>
                        <p className="text-body">오른쪽 '이벤트 당첨' 버튼은 해커가 심어놓은 함정입니다. 눌러보세요.</p>

                        <div className="practice-box" style={{display:'flex', gap:'20px', alignItems:'center'}}>
                            {/* 피해자 화면 */}
                            <div style={{flex:1, background:'#f1f5f9', padding:'15px', borderRadius:'8px'}}>
                                <div style={{fontWeight:'bold', color:'#2563eb'}}>🏦 내 통장</div>
                                <div style={{fontSize:'1.5rem', fontWeight:'bold', color: balance > 0 ? '#16a34a' : '#dc2626'}}>
                                    {balance.toLocaleString()} 원
                                </div>
                                <div style={{fontSize:'0.8rem', color:'#666'}}>{msg}</div>
                                <button onClick={reset} style={{marginTop:'10px', fontSize:'0.7rem'}}>초기화</button>
                            </div>

                            {/* 공격자 함정 */}
                            <div style={{flex:1, textAlign:'center'}}>
                                <div style={{fontSize:'0.8rem', color:'#64748b', marginBottom:'5px'}}>▼ 피싱 이메일 ▼</div>
                                <button onClick={attack} style={{
                                    background: 'linear-gradient(45deg, #ff00cc, #333399)',
                                    color: 'white', border:'none', padding:'10px 20px', 
                                    borderRadius:'20px', cursor:'pointer', fontWeight:'bold',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                }}>
                                    🎁 100만원 당첨금 받기 (Click)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 4. 방어 */}
                    <div id="defense">
                        <h2 className="sub-title1">04. 방어: CSRF Token</h2>
                        <p className="text-body">
                            서버가 랜덤한 <strong>난수(Token)</strong>를 생성해서 화면의 숨겨진 필드에 넣어줍니다.
                            요청이 들어올 때 이 Token이 없거나 틀리면 거부합니다. 해커는 이 랜덤 값을 알 수 없기 때문입니다.
                        </p>
                    </div>

                    <div style={{marginTop:'40px', textAlign:'center'}}>
                        <Link to="/level3Game" className="btn-action">실전 미션 도전하기 →</Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Level3;