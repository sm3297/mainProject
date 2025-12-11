// // Level3Game.js
// import React, { useState, useEffect } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import './Level3.css'; 
// // 파일 경로 확인: './api'로 올바르게 import 되어야 합니다.
// import { fetchExchangeRateList } from './api'; 

// function Level3Game() {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [showModal, setShowModal] = useState(false);
    
//     // 🛡️ [Security] 매번 바뀌는 CSRF 토큰
//     const [csrfToken, setCsrfToken] = useState("");

//     // 🌎 API Data State 
//     const [exchangeData, setExchangeData] = useState([]); // <--- 데이터가 여기에 저장됩니다.
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState(''); 
    
//     // 피해자(일반 사용자 / 공격 목표) 상태
//     const [user, setUser] = useState({
//         name: 'Normal_User', 
//         role: 'Premium Member', 
//         password: 'secure_password_99'
//     });

//     // 📜 분석용 DVWA 소스코드 (생략)
//     const sourceCode = `<?php
// // ... (PHP 코드 유지) ...
// ?>`;
    
//     // --------------------------------------------------------
//     // [1] API 데이터 로드 (List 기능) 및 CSRF 토큰 생성
//     // --------------------------------------------------------
//     useEffect(() => {
//         const loadDataAndToken = async () => {
//             setLoading(true);
            
//             // API 모듈을 사용하여 데이터 로드. MOCK_DATA 또는 실제 데이터 반환.
//             const data = await fetchExchangeRateList();
            
//             // 데이터를 상태에 저장합니다.
//             if (Array.isArray(data) && data.length > 0) {
//                  setExchangeData(data);
//             } else {
//                  // 데이터가 없거나 배열이 아니면 빈 배열로 초기화 (혹시 모를 오류 방지)
//                  setExchangeData([]);
//             }

//             setLoading(false);
//         };
        
//         // CSRF 토큰 생성
//         const randomToken = Math.random().toString(36).substring(2, 12);
//         setCsrfToken(randomToken);
        
//         loadDataAndToken();
//     }, []); 
    
//     // --------------------------------------------------------
//     // [2] 콘솔 해킹 도구 등록 및 [3] 서버 동작 로직 (변경 없음)
//     // --------------------------------------------------------
//     useEffect(() => {
//         // ... (기존 콘솔 로직 유지) ...
//         console.clear();
//         console.log("%c🔵 SHIELD BANK SYSTEM SHELL", "color: #00aaff; font-size: 20px; font-weight: bold; padding: 10px; border: 2px solid #00aaff;");
//         console.log("%c[Mission] 로그인된 사용자(Normal_User)의 비밀번호를 CSRF 공격으로 'hacker123'으로 변경하시오.", "color: white;");
//         console.log("%c[Hint] URL: ?Change=1&password_new=hacker123&password_conf=hacker123&user_token=...", "color: #fbbf24;");
//         console.log("%c👉 사용법: hack('?파라미터=값&...')", "color: lime; font-weight:bold;");

//         window.hack = (queryString) => {
//             if (!queryString || !queryString.startsWith('?')) {
//                 console.error("❌ Error: Query must start with '?'");
//                 return;
//             }
//             console.log(`%c[*] Payload Sent: ${queryString}`, "color: yellow");
//             setSearchParams(new URLSearchParams(queryString));
//             return "Request Sent.";
//         };

//         return () => { delete window.hack; };
//     }, [setSearchParams]);


//     useEffect(() => {
//         const change = searchParams.get('Change');
//         const p_new = searchParams.get('password_new');
//         const p_conf = searchParams.get('password_conf');
//         const tokenInput = searchParams.get('user_token');

//         if (change) {
//             // 1. 토큰 검사
//             if (tokenInput !== csrfToken) {
//                 console.error(`❌ CSRF token mismatch. (Server expected: HIDDEN, You sent: ${tokenInput || 'null'})`);
//                 alert("🚫 보안 경고: CSRF Token이 일치하지 않습니다.");
//                 return;
//             }

//             // 2. 비번 변경
//             if (p_new && p_conf && p_new === p_conf) {
//                 setUser(prev => ({ ...prev, password: p_new }));
//                 console.log("%c✅ Password Changed Successfully.", "color: #00ff00; background: #003300; padding: 4px;");
//                 alert("System: Password Changed.");

//                 if (p_new === 'hacker123') {
//                     setTimeout(() => alert("🎉 Level 3 Clear! 토큰 우회 성공!"), 500);
//                 }
//             } else {
//                 alert("System: Passwords did not match.");
//             }
//         }
//     }, [searchParams, csrfToken]);
    
//     // List/Search 기능 구현: 데이터 필터링 (검색 기능)
//     // 이 로직은 `exchangeData` 상태에 데이터가 있다면 정상 작동합니다.
//     const filteredData = exchangeData.filter(item => {
//         const search = searchTerm.toUpperCase();
//         const matchesSearch = (item.cur_nm && item.cur_nm.toUpperCase().includes(search)) || 
//                               (item.cur_unit && item.cur_unit.toUpperCase().includes(search));
//         return matchesSearch;
//     });

//     // --------------------------------------------------------
//     // [4] 렌더링 부분 (변경 없음)
//     // --------------------------------------------------------
//     return (
//         <div className="game-container-l3">
//             <div className="dashboard-card-l3">
//                 <header className="bank-header-l3">
//                     <div style={{display:'flex', alignItems:'center'}}>
//                         <h1 style={{margin:0, fontSize:'1.3rem', fontWeight:'bold'}}>🔒 계정 보안 관리</h1>
//                         <span className="admin-tag-l3">USER</span>
//                     </div>
//                     <button className="view-source-btn-l3" onClick={() => setShowModal(true)}>&lt;/&gt; Source</button>
//                 </header>

//                 <div className="bank-content-l3">
//                     {/* 🕵️‍♂️ [핵심] 숨겨진 토큰 필드 */}
//                     <form className="hidden-security-form">
//                         <input type="hidden" name="user_token" value={csrfToken} id="token_field" />
//                     </form>

//                     {/* -------------------------------------------------------- */}
//                     {/* API 데이터 (List/Search) - 데이터는 filteredData를 통해 표시됩니다. */}
//                     {/* -------------------------------------------------------- */}
//                     <h3 style={{marginTop:'10px', marginBottom:'8px'}}>📈 거래소 현황 (시스템 상태 모니터링)</h3>
//                     <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
//                         <input
//                             type="text"
//                             placeholder="통화 검색 (USD, JPY, 위안화 등)"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             style={{padding:'6px', border:'1px solid #ccc', borderRadius:'4px', flexGrow: 1, fontSize:'0.9rem'}}
//                         />
//                          <span style={{alignSelf:'center', fontSize:'0.8rem', color: exchangeData.length > 10 ? '#16a34a' : '#ef4444'}}>
//                             Status: {loading ? 'Loading...' : (exchangeData.length > 10 ? 'API OK (Full List)' : 'Local/Partial Data')}
//                         </span>
//                     </div>
                    
//                     {/* API List Table (List 기능) */}
//                     <div className="rate-list-container-l3" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius:'6px' }}>
//                         <table style={{width: '100%', borderCollapse: 'collapse'}}>
//                             <thead>
//                                 <tr style={{backgroundColor: '#f1f5f9'}}>
//                                     <th style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>코드</th>
//                                     <th style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>통화명</th>
//                                     <th style={{padding:'5px', fontSize:'0.8rem', textAlign: 'right'}}>기준율</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {/* List 기능 구현: 필터링된 전체 목록 표시 */}
//                                 {filteredData.length > 0 ? filteredData.map((rate, index) => (
//                                     <tr key={rate.cur_unit || index} style={{borderBottom: '1px solid #f1f5f9'}}>
//                                         <td style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>{rate.cur_unit}</td>
//                                         <td style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>{rate.cur_nm}</td>
//                                         <td style={{padding:'5px', fontSize:'0.8rem', fontWeight:'bold', textAlign: 'right'}}>{rate.deal_bas_r}</td>
//                                     </tr>
//                                 )) : <tr><td colSpan="3" style={{padding:'5px', textAlign:'center', fontSize:'0.8rem'}}>검색 결과 없음</td></tr>}
//                             </tbody>
//                         </table>
//                     </div>
//                     {/* -------------------------------------------------------- */}


//                     {/* ... (비밀번호 변경 UI 및 힌트 영역 유지) ... */}
//                     <h2 style={{fontSize: '1.2rem', color: '#1e293b', marginTop:'30px', borderTop: '1px solid #e2e8f0', paddingTop: '20px'}}>
//                         🔐 비밀번호 변경 (공격 목표)
//                     </h2>
//                     <div className="user-profile-l3">
//                         <div className="avatar-l3">👤</div>
//                         <div>
//                             <h3 style={{margin:0, color:'#1e293b'}}>{user.name}</h3>
//                             <p style={{margin:0, fontSize:'0.85rem', color:'#64748b'}}>{user.role}</p>
//                         </div>
//                     </div>

//                     <div className="security-status-l3">
//                         <div className="status-item-l3">
//                             <span>Security Level</span>
//                             <span className="value-l3 medium">Medium (Token Protected)</span>
//                         </div>
//                         <div className="status-item-l3">
//                             <span>Current Password</span>
//                             <span className="value-l3 password">{user.password}</span>
//                         </div>
//                     </div>

//                     <div style={{background:'#fff3cd', padding:'15px', borderRadius:'8px', border: '1px solid #ffeeba', marginTop:'20px'}}>
//                         <strong style={{color: '#856404'}}>💡 미션 수행 힌트 (CSRF Medium)</strong>
//                         <ol style={{color: '#856404', marginTop: '5px', paddingLeft: '20px', fontSize: '0.9rem'}}>
//                             <li>**공격 목표 찾기:** 현재 페이지는 비밀번호 변경 요청을 처리하는 페이지입니다. (PHP 소스코드 참고)</li>
//                             <li>**토큰 위치 확인:** 브라우저 **F12**를 눌러 **Elements 탭**에서 숨겨진(Hidden) 입력 필드(<code>&lt;input type="hidden" name="user_token"...&gt;</code>)의 **value** 값을 찾으세요. </li>
//                             <li>**공격 명령어 조합:** 찾은 토큰 값을 아래 공격 명령어의 `[토큰 값]` 부분에 복사하여 넣으세요.
//                                 <div style={{fontFamily:'monospace', background:'#f8f9fa', padding:'8px', borderRadius:'4px', marginTop:'5px', overflowX:'auto'}}>
//                                     <code>hack('?Change=1&password_new=hacker123&password_conf=hacker123&user_token=[토큰 값]')</code>
//                                 </div>
//                             </li>
//                             <li>**실행:** 조합된 명령어를 **Console 탭**에 붙여넣고 Enter를 누르세요. </li>
//                         </ol>
//                     </div>

//                 </div>
//             </div>

//             {/* 소스코드 모달 (PHP 원본 유지) */}
//             {showModal && (
//                 <div className="modal-overlay-l3" onClick={() => setShowModal(false)}>
//                     <div className="modal-box-l3" onClick={e => e.stopPropagation()}>
//                         <div className="modal-top-l3">
//                             <span>vulnerabilities/csrf/source/medium.php</span>
//                             <button onClick={() => setShowModal(false)} style={{background:'none',border:'none',color:'#fff',cursor:'pointer'}}>✕</button>
//                         </div>
//                         <pre className="code-block-l3">{sourceCode}</pre>
//                     </div>
//                 </div>
//             )}

//             <Link to="/level3" className="sim-exit-btn">🚪 이론으로 돌아가기</Link>
//         </div>
//     );
// }

// export default Level3Game;

// // Level3Game.js
// import React, { useState, useEffect } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import './Level3.css'; 
// // 파일 경로 확인: './api'로 올바르게 import 되어야 합니다.
// import { fetchExchangeRateList } from './api'; 

// function Level3Game() {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [showModal, setShowModal] = useState(false);
    
//     // 🛡️ [Security] 매번 바뀌는 CSRF 토큰
//     const [csrfToken, setCsrfToken] = useState("");

//     // 🌎 API Data State 
//     const [exchangeData, setExchangeData] = useState([]); // <--- 데이터가 여기에 저장됩니다.
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState(''); 
    
//     // 피해자(일반 사용자 / 공격 목표) 상태
//     const [user, setUser] = useState({
//         name: 'Normal_User', 
//         role: 'Premium Member', 
//         password: 'secure_password_99'
//     });

//     // 📜 분석용 DVWA 소스코드 (PHP 원본 유지)
//     const sourceCode = `<?php
// // vulnerabilities/csrf/source/medium.php

// if( isset( $_GET[ 'Change' ] ) ) {
//     // 1. Anti-CSRF Token 검증 (핵심)
//     if( $_GET[ 'user_token' ] == $_SESSION[ 'session_token' ] ) {
//         $p_new = $_GET[ 'password_new' ];
//         $p_conf = $_GET[ 'password_conf' ];

//         if( $p_new == $p_conf ) {
//             // Update DB...
//             echo "<pre>Password Changed.</pre>";
//         }
//     } else {
//         echo "<pre>CSRF token is incorrect. Access Denied.</pre>";
//     }
// }
// ?>`;
    
//     // --------------------------------------------------------
//     // [1] API 데이터 로드 (List 기능) 및 CSRF 토큰 생성
//     // --------------------------------------------------------
//     useEffect(() => {
//         const loadDataAndToken = async () => {
//             setLoading(true);
            
//             // API 모듈을 사용하여 데이터 로드. MOCK_DATA 또는 실제 데이터 반환.
//             const data = await fetchExchangeRateList();
            
//             // 데이터를 상태에 저장합니다.
//             if (Array.isArray(data) && data.length > 0) {
//                  setExchangeData(data);
//             } else {
//                  // 데이터가 없거나 배열이 아니면 빈 배열로 초기화 (혹시 모를 오류 방지)
//                  setExchangeData([]);
//             }

//             setLoading(false);
//         };
        
//         // CSRF 토큰 생성
//         const randomToken = Math.random().toString(36).substring(2, 12);
//         setCsrfToken(randomToken);
        
//         loadDataAndToken();
//     }, []); 
    
//     // --------------------------------------------------------
//     // [2] 콘솔 해킹 도구 등록 및 미션 설정 (변경 없음)
//     // --------------------------------------------------------
//     useEffect(() => {
//         // ... (기존 콘솔 로직 유지) ...
//         console.clear();
//         console.log("%c🔵 SHIELD BANK SYSTEM SHELL", "color: #00aaff; font-size: 20px; font-weight: bold; padding: 10px; border: 2px solid #00aaff;");
//         console.log("%c[Mission] 로그인된 사용자(Normal_User)의 비밀번호를 CSRF 공격으로 'hacker123'으로 변경하시오.", "color: white;");
//         console.log("%c[Hint] URL: ?Change=1&password_new=hacker123&password_conf=hacker123&user_token=...", "color: #fbbf24;");
//         console.log("%c👉 사용법: hack('?파라미터=값&...')", "color: lime; font-weight:bold;");

//         window.hack = (queryString) => {
//             if (!queryString || !queryString.startsWith('?')) {
//                 console.error("❌ Error: Query must start with '?'");
//                 return;
//             }
//             console.log(`%c[*] Payload Sent: ${queryString}`, "color: yellow");
//             setSearchParams(new URLSearchParams(queryString));
//             return "Request Sent.";
//         };

//         return () => { delete window.hack; };
//     }, [setSearchParams]);


//     // --------------------------------------------------------
//     // [3] 서버 동작 로직 (토큰 검증 및 비밀번호 변경)
//     // --------------------------------------------------------
//     useEffect(() => {
//         const change = searchParams.get('Change');
//         // 공격자가 전송하는 파라미터 (password_new, password_conf, user_token)
//         const p_new = searchParams.get('password_new');
//         const p_conf = searchParams.get('password_conf');
//         const tokenInput = searchParams.get('user_token');

//         if (change) {
//             // 1. 토큰 검사 (서버 소스코드의 핵심 검증 로직)
//             if (tokenInput !== csrfToken) {
//                 console.error(`❌ CSRF token mismatch. (Server expected: HIDDEN, You sent: ${tokenInput || 'null'})`);
//                 alert("🚫 보안 경고: CSRF Token이 일치하지 않습니다.");
//                 return;
//             }

//             // 2. 비번 변경 (서버 소스코드의 최종 실행 로직)
//             if (p_new && p_conf && p_new === p_conf) {
//                 setUser(prev => ({ ...prev, password: p_new }));
//                 console.log("%c✅ Password Changed Successfully.", "color: #00ff00; background: #003300; padding: 4px;");
//                 alert("System: Password Changed.");

//                 if (p_new === 'hacker123') {
//                     setTimeout(() => alert("🎉 Level 3 Clear! 토큰 우회 성공!"), 500);
//                 }
//             } else {
//                 alert("System: Passwords did not match.");
//             }
//         }
//     }, [searchParams, csrfToken]);
    
//     // List/Search 기능 구현: 데이터 필터링 (검색 기능)
//     // 이 로직은 `exchangeData` 상태에 데이터가 있다면 정상 작동합니다.
//     const filteredData = exchangeData.filter(item => {
//         const search = searchTerm.toUpperCase();
//         const matchesSearch = (item.cur_nm && item.cur_nm.toUpperCase().includes(search)) || 
//                               (item.cur_unit && item.cur_unit.toUpperCase().includes(search));
//         return matchesSearch;
//     });

//     // --------------------------------------------------------
//     // [4] 렌더링 부분 (변경 없음)
//     // --------------------------------------------------------
//     return (
//         <div className="game-container-l3">
//             <div className="dashboard-card-l3">
//                 <header className="bank-header-l3">
//                     <div style={{display:'flex', alignItems:'center'}}>
//                         <h1 style={{margin:0, fontSize:'1.3rem', fontWeight:'bold'}}>🔒 계정 보안 관리</h1>
//                         <span className="admin-tag-l3">USER</span>
//                     </div>
//                     <button className="view-source-btn-l3" onClick={() => setShowModal(true)}>&lt;/&gt; Source</button>
//                 </header>

//                 <div className="bank-content-l3">
//                     {/* 🕵️‍♂️ [핵심] 숨겨진 토큰 필드 */}
//                     <form className="hidden-security-form">
//                         {/* 이 필드의 value가 공격 목표입니다. */}
//                         <input type="hidden" name="user_token" value={csrfToken} id="token_field" />
//                     </form>

//                     {/* -------------------------------------------------------- */}
//                     {/* API 데이터 (List/Search) - 데이터는 filteredData를 통해 표시됩니다. */}
//                     {/* -------------------------------------------------------- */}
//                     <h3 style={{marginTop:'10px', marginBottom:'8px'}}>📈 거래소 현황 (시스템 상태 모니터링)</h3>
//                     <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
//                         <input
//                             type="text"
//                             placeholder="통화 검색 (USD, JPY, 위안화 등)"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             style={{padding:'6px', border:'1px solid #ccc', borderRadius:'4px', flexGrow: 1, fontSize:'0.9rem'}}
//                         />
//                          <span style={{alignSelf:'center', fontSize:'0.8rem', color: exchangeData.length > 10 ? '#16a34a' : '#ef4444'}}>
//                             Status: {loading ? 'Loading...' : (exchangeData.length > 10 ? 'API OK (Full List)' : 'Local/Partial Data')}
//                         </span>
//                     </div>
                    
//                     {/* API List Table (List 기능) */}
//                     <div className="rate-list-container-l3" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius:'6px' }}>
//                         <table style={{width: '100%', borderCollapse: 'collapse'}}>
//                             <thead>
//                                 <tr style={{backgroundColor: '#f1f5f9'}}>
//                                     <th style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>코드</th>
//                                     <th style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>통화명</th>
//                                     <th style={{padding:'5px', fontSize:'0.8rem', textAlign: 'right'}}>기준율</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {/* List 기능 구현: 필터링된 전체 목록 표시 */}
//                                 {filteredData.length > 0 ? filteredData.map((rate, index) => (
//                                     <tr key={rate.cur_unit || index} style={{borderBottom: '1px solid #f1f5f9'}}>
//                                         <td style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>{rate.cur_unit}</td>
//                                         <td style={{padding:'5px', fontSize:'0.8rem', textAlign: 'left'}}>{rate.cur_nm}</td>
//                                         <td style={{padding:'5px', fontSize:'0.8rem', fontWeight:'bold', textAlign: 'right'}}>{rate.deal_bas_r}</td>
//                                     </tr>
//                                 )) : <tr><td colSpan="3" style={{padding:'5px', textAlign:'center', fontSize:'0.8rem'}}>검색 결과 없음</td></tr>}
//                             </tbody>
//                         </table>
//                     </div>
//                     {/* -------------------------------------------------------- */}


//                     {/* 원래 미션 UI (비밀번호 변경) */}
//                     <h2 style={{fontSize: '1.2rem', color: '#1e293b', marginTop:'30px', borderTop: '1px solid #e2e8f0', paddingTop: '20px'}}>
//                         🔐 비밀번호 변경 (공격 목표)
//                     </h2>
//                     <div className="user-profile-l3">
//                         <div className="avatar-l3">👤</div>
//                         <div>
//                             <h3 style={{margin:0, color:'#1e293b'}}>{user.name}</h3>
//                             <p style={{margin:0, fontSize:'0.85rem', color:'#64748b'}}>{user.role}</p>
//                         </div>
//                     </div>

//                     <div className="security-status-l3">
//                         <div className="status-item-l3">
//                             <span>Security Level</span>
//                             <span className="value-l3 medium">Medium (Token Protected)</span>
//                         </div>
//                         <div className="status-item-l3">
//                             <span>Current Password</span>
//                             <span className="value-l3 password">{user.password}</span>
//                         </div>
//                     </div>

//                     <div style={{background:'#fff3cd', padding:'15px', borderRadius:'8px', border: '1px solid #ffeeba', marginTop:'20px'}}>
//                         <strong style={{color: '#856404'}}>💡 미션 수행 힌트 (CSRF Medium)</strong>
//                         <ol style={{color: '#856404', marginTop: '5px', paddingLeft: '20px', fontSize: '0.9rem'}}>
//                             <li>**공격 목표 찾기:** 현재 페이지는 비밀번호 변경 요청을 처리하는 페이지입니다. (PHP 소스코드 참고)</li>
//                             <li>**토큰 위치 확인:** 브라우저 **F12**를 눌러 **Elements 탭**에서 숨겨진(Hidden) 입력 필드(<code>&lt;input type="hidden" name="user_token"...&gt;</code>)의 **value** 값을 찾으세요. </li>
//                             <li>**공격 명령어 조합:** 찾은 토큰 값을 아래 공격 명령어의 `[토큰 값]` 부분에 복사하여 넣으세요.
//                                 <div style={{fontFamily:'monospace', background:'#f8f9fa', padding:'8px', borderRadius:'4px', marginTop:'5px', overflowX:'auto'}}>
//                                     <code>hack('?Change=1&password_new=hacker123&password_conf=hacker123&user_token=[토큰 값]')</code>
//                                 </div>
//                             </li>
//                             <li>**실행:** 조합된 명령어를 **Console 탭**에 붙여넣고 Enter를 누르세요. </li>
//                         </ol>
//                     </div>

//                 </div>
//             </div>

//             {/* 소스코드 모달 (PHP 원본 유지) */}
//             {showModal && (
//                 <div className="modal-overlay-l3" onClick={() => setShowModal(false)}>
//                     <div className="modal-box-l3" onClick={e => e.stopPropagation()}>
//                         <div className="modal-top-l3">
//                             <span>vulnerabilities/csrf/source/medium.php</span>
//                             <button onClick={() => setShowModal(false)} style={{background:'none',border:'none',color:'#fff',cursor:'pointer'}}>✕</button>
//                         </div>
//                         <pre className="code-block-l3">{sourceCode}</pre>
//                     </div>
//                 </div>
//             )}

//             <Link to="/level3" className="sim-exit-btn">🚪 이론으로 돌아가기</Link>
//         </div>
//     );
// }

// export default Level3Game;




// Level3Game.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './Level3.css'; 
import { fetchExchangeRateList } from './api'; 

function Level3Game() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showSource, setShowSource] = useState(false); // 소스코드 토글
    
    const [csrfToken, setCsrfToken] = useState("");
    const [exchangeData, setExchangeData] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    // 검색어 상태
    const [searchTerm, setSearchTerm] = useState(''); 
    
    // 사용자 상태
    const [user, setUser] = useState({
        name: 'Trader_Alice', 
        balanceKRW: 100000000, 
        displayAmount: "100,000,000", 
        displayCurrency: "KRW", 
        transferStatus: "Normal",
        isReady: false 
    });

    // 📜 [핵심] PHP 소스코드 (비밀번호 변경 로직 구조)
    const sourceCode = `<?php
// vulnerabilities/csrf/source/medium.php 

if( isset( $_GET[ 'Change' ] ) ) {
    // 1. Check Anti-CSRF Token
    if( $_GET[ 'user_token' ] == $_SESSION[ 'session_token' ] ) {
        
        $p_new = $_GET[ 'password_new' ]; 
        $p_conf = $_GET[ 'password_conf' ]; 

        // 2. Logic Check (비밀번호 확인)
        if( $p_new == $p_conf ) {
            
            // [VULNERABILITY HERE!]
            // 개발자의 실수: 
            // 만약 현재 세션의 통화($_SESSION['currency'])가 'AUD'라면,
            // 비밀번호 변경 대신 '전액 이체'를 실행해버림.
            
            if( $_SESSION['currency'] == 'AUD' ) {
                execute_transfer_all(); 
                echo "Hacked: Transfer Success.";
            } else {
                // AUD가 아니면 그냥 비밀번호만 변경됨
                change_password($p_new);
                echo "Password Changed.";
            }
        } else {
            echo "Passwords do not match.";
        }
    } else {
        echo "Token Mismatch.";
    }
}
?>`;
    
    // 초기화
    useEffect(() => {
        const loadDataAndToken = async () => {
            setLoading(true);
            const data = await fetchExchangeRateList();
            if (Array.isArray(data)) setExchangeData(data);
            setLoading(false);
        };
        const randomToken = Math.random().toString(36).substring(2, 12);
        setCsrfToken(randomToken);
        loadDataAndToken();
    }, []); 
    
    // 환율 클릭 (장전: 세션 설정)
    const handleCurrencyClick = (rateItem) => {
        if (rateItem.cur_unit !== 'AUD') {
            alert("⚠️ 타겟은 '호주 달러(AUD)'입니다. AUD를 찾아 클릭하세요.");
            return;
        }

        const rate = parseFloat(rateItem.deal_bas_r.replace(/,/g, ''));
        const convertedAmount = (user.balanceKRW / rate).toFixed(2);

        setUser(prev => ({
            ...prev,
            displayAmount: parseFloat(convertedAmount).toLocaleString(),
            displayCurrency: "AUD",
            transferStatus: "⚠️ Transaction Pending...",
            isReady: true // $_SESSION['currency'] = 'AUD' 설정됨
        }));
    };

    // 콘솔 툴 설정
    useEffect(() => {
        console.clear();
        console.log("%c🏦 GLOBAL WEALTH BANK SHELL ACCESS", "color: #00ff00; background: #000; padding:5px; font-weight:bold;");
        console.log("%c[System] CSRF Vulnerability Testing Mode", "color: #ccc;");
        
        window.hack = (queryString) => {
            if (!queryString || !queryString.startsWith('?')) {
                console.error("❌ Error: Query must start with '?' (ex: ?Change=1...)");
                return;
            }
            console.log(`%c[*] Sending Payload: ${queryString}`, "color: yellow");
            setSearchParams(new URLSearchParams(queryString));
            return "Server responding...";
        };
        return () => { delete window.hack; };
    }, [setSearchParams]);

    // 서버 로직 시뮬레이션
    useEffect(() => {
        const change = searchParams.get('Change');
        const tokenInput = searchParams.get('user_token');
        const p_new = searchParams.get('password_new');
        const p_conf = searchParams.get('password_conf');

        if (change === '1') {
            // 1. 토큰 검사
            if (tokenInput !== csrfToken) {
                alert(`🚫 [Access Denied] CSRF Token 불일치!\n(Server: ${csrfToken} vs You: ${tokenInput})`);
                return;
            }

            // 2. 비밀번호 일치 여부 확인
            if (p_new !== p_conf) {
                alert("⚠️ [System] 비밀번호 확인($p_conf)이 일치하지 않습니다.");
                return;
            }

            // 3. 취약점 트리거 (AUD 세션 + 비밀번호 일치)
            if (p_new === 'hacker123' && user.isReady) {
                setUser(prev => ({
                    ...prev,
                    balanceKRW: 0,
                    displayAmount: "0",
                    transferStatus: `🚨 HACKED (Sent to Attacker)`
                }));
                alert(`[System] 취약점 공격 성공! ${user.displayAmount} AUD가 이체되었습니다.`);
                setTimeout(() => alert("🎉 Level 3 Clear! 완벽한 공격입니다!"), 500);
            } 
            else if (user.isReady && p_new !== 'hacker123') {
                // AUD는 선택했지만 비밀번호가 힌트와 다를 때 (로직상 성공이지만 미션 통일을 위해)
                 alert("⚠️ [System] 공격은 성공했으나, 패스워드를 'hacker123'으로 설정해주세요.");
            }
            else if (!user.isReady) {
                alert("⚠️ [System] 조건 불충분: 세션 통화가 설정되지 않았습니다. (환율표 클릭 필요)");
            }
        }
    }, [searchParams, csrfToken, user.isReady, user.displayAmount]);

    // 검색 필터링
    const filteredData = exchangeData.filter(item => {
        const search = searchTerm.toUpperCase();
        return (item.cur_nm && item.cur_nm.toUpperCase().includes(search)) || 
               (item.cur_unit && item.cur_unit.toUpperCase().includes(search));
    });

    return (
        <div className="game-container-l3">
            <div className="dashboard-card-l3">
                {/* 헤더 */}
                <header className="bank-header-l3"> 
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <div style={{fontSize:'1.5rem'}}>🏦</div>
                        <div>
                            <h1 style={{margin:0, fontSize:'1.2rem', fontWeight:'bold'}}>Global Wealth Bank</h1>
                            <div style={{fontSize:'0.8rem', opacity:0.8}}>Corporate Banking System</div>
                        </div>
                    </div>
                    {/* 소스코드 버튼 */}
                    <button 
                        className="view-source-btn-l3" 
                        onClick={() => setShowSource(!showSource)}
                        style={{border: showSource ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.3)'}}
                    >
                        {showSource ? 'Close Source Code' : '📜 View PHP Source'}
                    </button>
                </header>

                <div className="bank-content-l3">
                    
                    {/* 소스코드 영역 */}
                    {showSource && (
                        <div className="source-code-section">
                            <h4 style={{margin:'0 0 10px 0', color:'#374151'}}>🕵️‍♂️ Vulnerability Analysis (source/medium.php)</h4>
                            <pre className="code-block-viewer">{sourceCode}</pre>
                            <p style={{fontSize:'0.85rem', color:'#d00', marginTop:'10px', fontWeight:'bold'}}>
                                * Analyze: <code>$p_new == $p_conf</code> 조건과 <code>$_SESSION['currency']</code> 조건을 확인하세요.
                            </p>
                        </div>
                    )}

                    {/* 숨겨진 토큰 (F12용) */}
                    <form name="security_form">
                        <input type="hidden" name="user_token" value={csrfToken} />
                    </form>

                    {/* 1. 환율 리스트 */}
                    <div className="section-header" style={{marginTop:'20px'}}>
                        1. Select Currency (Set Session)
                    </div>

                    <input
                        className="search-box"
                        type="text"
                        placeholder="🔍 통화명 또는 코드 검색 (예: 호주, AUD)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="rate-list-container-l3">
                        <table className="rate-table">
                            <thead>
                                <tr>
                                    <th>Code</th><th>Name</th><th style={{textAlign:'right'}}>Rate</th><th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? filteredData.map((rate, index) => (
                                    <tr key={index} 
                                        className={`rate-row ${user.displayCurrency === rate.cur_unit ? 'selected' : ''}`}
                                        onClick={() => handleCurrencyClick(rate)} 
                                    >
                                        <td style={{fontWeight:'bold'}}>{rate.cur_unit}</td>
                                        <td>{rate.cur_nm}</td>
                                        <td style={{textAlign:'right'}}>{rate.deal_bas_r}</td>
                                        <td style={{textAlign:'center'}}>{rate.cur_unit === 'AUD' ? '🔴' : '○'}</td>
                                    </tr>
                                )) : <tr><td colSpan="4" style={{textAlign:'center', padding:'20px', color:'#666'}}>검색 결과 없음</td></tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 2. 자산 현황 */}
                    <div className="section-header" style={{marginTop:'30px'}}>
                        2. Wallet Status
                    </div>
                    <div className={`asset-card ${user.isReady ? 'danger' : ''}`}>
                         <div>
                            <div className="balance-label">Total Assets</div>
                            <div className={`balance-amount ${user.isReady ? 'changed' : ''}`}>
                                {user.displayAmount} <small>{user.displayCurrency}</small>
                            </div>
                         </div>
                         <div className={`transfer-status-badge ${user.isReady ? 'status-danger' : 'status-safe'}`}>
                            {user.transferStatus}
                         </div>
                    </div>

                    {/* 미션 가이드 (요청하신 힌트 부분) */}
                    <div className="mission-box" style={{marginTop: '30px', background:'#fffbeb', border:'1px solid #fcd34d'}}>
                        <div className="mission-title" style={{color:'#92400e'}}>🕵️‍♂️ Hacking Mission Guide</div>
                        <ol style={{color: '#92400e', paddingLeft: '20px', fontSize: '0.9rem', lineHeight:'1.7'}}>
                            <li><strong>분석:</strong> 상단 <code>View PHP Source</code>에서 파라미터(<code>password_new</code>, <code>password_conf</code>)를 확인하세요.</li>
                            <li><strong>준비:</strong> 위 환율표에서 <strong>AUD</strong>를 검색/클릭하여 세션을 <code>AUD</code>로 만드세요.</li>
                            <li><strong>탈취:</strong> <code>F12</code> &gt; <code>Elements</code> 탭에서 <code>user_token</code> 값을 찾으세요.</li>
                            <li><strong>공격:</strong> 아래 양식에 맞춰 콘솔에 입력하세요.</li>
                        </ol>
                        
                        {/* 여기가 요청하신 그 부분입니다! */}
                        <div className="code-block-l3" style={{background:'#1e1e1e', color:'#a3e635'}}>
                            hack('?Change=1&password_new=hacker123&password_conf=hacker123&user_token=[TOKEN]')
                        </div>
                    </div>

                </div>
            </div>
            
            <Link to="/level3" className="sim-exit-btn">🚪 이론으로 돌아가기</Link>
        </div>
    );
}

export default Level3Game;