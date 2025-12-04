import React from 'react';

function AdminPage() {
  // --- ⭐️ 스타일 변수 정의 (LoginSimulator와 동일) ⭐️ ---
  const primaryColor = '#0070c0';
  const secondaryColor = '#dc3545';
  const successColor = '#155724';
  const containerBg = '#f5f5f5';
  const mainPanelBg = '#fff';
  const borderColor = '#ccc';
  
  // --- UI 스타일 ---
  const btnStyle = { 
    padding: '10px 20px', 
    backgroundColor: primaryColor, 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer', 
    borderRadius: '4px' 
  };
  const successBoxStyle = {
    backgroundColor: '#d4edda', 
    color: successColor, 
    border: '1px solid #c3e6cb', 
    padding: '15px', 
    marginTop: '15px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  };
  const errorBoxStyle = {
    backgroundColor: '#f8d7da', 
    color: '#721c24', 
    border: `1px solid ${secondaryColor}`, 
    padding: '15px', 
    marginTop: '20px',
    borderRadius: '4px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: containerBg, minHeight: '100vh' }}>
      
      {/* 1. 상단 메뉴바 (LoginSimulator와 동일한 Hacking Lab 스타일) */}
      <header style={{ backgroundColor: mainPanelBg, borderBottom: '3px solid #eee', padding: '10px 50px', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: primaryColor, fontSize: '1.5rem', margin: 0 }}>Hacking Lab - Level 1: 공격 결과 보고서</h1>
        <div style={{ fontSize: '0.9rem' }}>
          <a href="#" onClick={() => window.location.href = '/'} style={{ color: primaryColor, textDecoration: 'none' }}>메인으로 돌아가기</a>
        </div>
      </header>
      
      {/* 2. 메인 콘텐츠 영역 (사이드바 + 본문) */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        
        {/* 3. 사이드바 (분석 목차 - LoginSimulator와 동일한 레이아웃 유지) */}
        <aside style={{ width: '250px', backgroundColor: mainPanelBg, border: `1px solid ${borderColor}`, padding: '15px', marginRight: '20px', borderRadius: '5px' }}>
          <h4 style={{ color: primaryColor, borderBottom: `2px solid ${borderColor}`, paddingBottom: '5px', marginBottom: '15px' }}>분석 모드 목차</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '5px 0' }}>&gt; 1. 공격 개요 및 요약</li>
            <li style={{ padding: '5px 0' }}>&gt; 2. 획득된 플래그</li>
            <li style={{ padding: '5px 0' }}>&gt; 3. 다음 레벨 정보</li>
          </ul>
        </aside>

        {/* 4. 메인 본문 영역 */}
        <main style={{ flexGrow: 1, backgroundColor: mainPanelBg, border: `1px solid ${borderColor}`, padding: '30px', borderRadius: '5px' }}>
          
          <h2 style={{ color: primaryColor, borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            [Level 1] SQL Injection Tautology-Based 공격 분석
          </h2>
          
          <h3 style={{ color: successColor, marginTop: '30px' }}>1. 공격 요약 및 결론</h3>

          {/* 5. SUCCESS 박스 (성공 메시지) */}
          <div style={successBoxStyle}>
            🎉 ACCESS GRANTED! 인증 우회에 성공했습니다.
          </div>
          
          <p style={{ color: '#555', marginTop: '15px' }}>
            **공격 요약:** Tautology-Based SQL Injection 페이로드를 사용하여 로그인 쿼리의 논리 구조를 **무조건 참(TRUE)**으로 변조하는 데 성공했습니다.
          </p>

          {/* 6. 보안 경고창 (빨간색 - AltoroMutual 스타일 유지) */}
          <div style={errorBoxStyle}>
            🚨 보안 경고: 관리자 로그인에서 SQL Injection 취약점이 악용되었습니다.
          </div>


          <h3 style={{ color: primaryColor, marginTop: '30px' }}>2. 획득된 플래그 (FLAG)</h3>

          {/* 7. 플래그 노출 영역 */}
          <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
            <strong style={{ display: 'block', marginBottom: '10px' }}>FLAG_LEVEL_2:</strong> 
            <span style={{ color: secondaryColor, fontWeight: 'bold', fontSize: '1.2rem' }}>
              {'Tautology_Bypass_Success_Go_Next'}
            </span>
          </div>
          
          <h3 style={{ color: primaryColor, marginTop: '30px' }}>3. 다음 레벨 안내</h3>
          <p>
            획득한 플래그를 사용하여 메인 페이지의 **Level 2** 접근을 시도하십시오. 다음 레벨은 **CSRF** 취약점을 다룹니다.
          </p>

          <button 
            onClick={() => window.location.href = '/'} 
            style={{ ...btnStyle, marginTop: '30px'}}
          >
            메인 레벨 선택 화면으로 돌아가기
          </button>

        </main>
      </div>
    </div>
  );
}

export default AdminPage;