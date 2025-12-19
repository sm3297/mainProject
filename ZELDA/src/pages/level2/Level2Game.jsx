import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Level2Game.css'; 

// --- 유틸리티 ---
function bytesToArray(b) { return Array.from(b); }
function arrToU8(a) { return new Uint8Array(a); }

const STORAGE = {
  notes: "safememo_data_v1",
  jwkBackup: "safememo_sess_key",
};
const SECRET_FLAG = "FLAG{Praise}";

export default function Level2Game() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [plainContent, setPlainContent] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState("");
  const [sysError, setSysError] = useState("");

  // 1. 초기화
  useEffect(() => {
    (async () => {
      const savedKey = sessionStorage.getItem(STORAGE.jwkBackup);
      const savedNotes = localStorage.getItem(STORAGE.notes);

      if (!savedKey || !savedNotes) {
        const k = await crypto.subtle.generateKey(
          { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
        );
        const jwk = await crypto.subtle.exportKey("jwk", k);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ct = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv }, k, new TextEncoder().encode(SECRET_FLAG)
        );

        const initial = [{
          id: 1,
          title: "🔒 [기밀] 프로젝트 알파 접근 코드",
          date: new Date().toLocaleDateString(),
          isEncrypted: true,
          iv: bytesToArray(iv),
          data: bytesToArray(new Uint8Array(ct)),
          content: "",
          sender: "Administrator"
        }];
        
        sessionStorage.setItem(STORAGE.jwkBackup, JSON.stringify(jwk));
        localStorage.setItem(STORAGE.notes, JSON.stringify(initial));
        setNotes(initial);
      } else {
        setNotes(JSON.parse(savedNotes));
      }
    })();
  }, []);

  // --- 핸들러 ---

  const handleSelectNote = (n) => {
    setSelected(n);
    setPlainContent("");
    setIsDecrypted(false);
    setSysError("");
    setShowRecovery(false);

    if (!n.isEncrypted) {
      setPlainContent(n.content);
      setIsDecrypted(true);
    } else {
      setSysError("⚠️ 복호화 실패: 세션 키를 찾을 수 없습니다.");
    }
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNote = {
      id: Date.now(),
      title: newTitle, 
      date: new Date().toLocaleDateString(),
      isEncrypted: false,
      content: "사용자 작성 메모",
      sender: "Me"
    };

    const updated = [newNote, ...notes];
    localStorage.setItem(STORAGE.notes, JSON.stringify(updated));
    setNotes(updated);
    setNewTitle("");
    setIsComposeOpen(false);
  };

  const handleDeleteNote = (e, noteId) => {
    e.stopPropagation();
    if(!confirm("삭제하시겠습니까?")) return;
    const updated = notes.filter(n => n.id !== noteId);
    setNotes(updated);
    localStorage.setItem(STORAGE.notes, JSON.stringify(updated));
    if (selected?.id === noteId) setSelected(null);
  };

  const handleManualDecrypt = async (e) => {
    e.preventDefault();
    try {
      const rawKeyString = recoveryKey.trim();
      if (!rawKeyString || rawKeyString.length < 10) throw new Error("Invalid Key");

      const jwkObject = {
        kty: "oct",
        k: rawKeyString,
        alg: "A256GCM",
        ext: true,
        key_ops: ["encrypt", "decrypt"]
      };

      const imported = await crypto.subtle.importKey("jwk", jwkObject, { name: "AES-GCM" }, true, ["decrypt"]);
      const buf = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: arrToU8(selected.iv) }, imported, arrToU8(selected.data)
      );

      setPlainContent(new TextDecoder().decode(buf));
      setIsDecrypted(true);
      setSysError("");
      setShowRecovery(false);
    } catch {
      alert("복구 실패: 올바른 키 값이 아닙니다.");
    }
  };

  const handleReset = () => {
    if(!confirm("초기화 하시겠습니까?")) return;
    localStorage.removeItem(STORAGE.notes);
    sessionStorage.removeItem(STORAGE.jwkBackup);
    location.reload();
  };

  const handleLogout = () => {
    if(!confirm("로그아웃 하시겠습니까?")) return;
    handleReset();
  };

  // --- 렌더링 ---
  return (
    <div className="safe-memo-container">
      
      {/* 1. 사이드바 */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon"></div>
          <span className="logo-text">SafeMemo</span>
        </div>

        <div className="sidebar-action">
          <button className="btn-compose" onClick={() => setIsComposeOpen(true)}>
            + 새 메모 작성
          </button>
        </div>

        <div className="note-list">
          <div className="list-label">보관함</div>
          {notes.map(n => (
            <div 
              key={n.id} 
              onClick={() => handleSelectNote(n)}
              className={`note-item ${selected?.id === n.id ? 'active' : ''}`}
            >
              <div className="note-meta">
                <span className="note-sender">{n.sender}</span>
                <button 
                  className="btn-delete"
                  onClick={(e) => handleDeleteNote(e, n.id)}
                  title="삭제"
                >
                  ×
                </button>
              </div>
              <div className="note-title-preview">
                {n.title}
              </div>
              <div className="note-date">{n.date}</div>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">U</div>
            <div className="user-name">User</div>
          </div>
          <div className="footer-actions">
            <button className="btn-text danger" onClick={handleReset}>초기화</button>
            <button className="btn-text" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </div>

      {/* 2. 메인 컨텐츠 */}
      <div className="main-content">
        {selected ? (
          <div className="note-viewer">
            <div className="note-header">
              {/* ⚠️ XSS 실행 지점 */}
              <h1 
                className="note-title"
                dangerouslySetInnerHTML={{ __html: selected.title }} 
              />
              <div className="note-info">
                <span>보낸 사람: <strong>{selected.sender}</strong></span>
                <span>•</span>
                <span>{selected.date}</span>
                {selected.isEncrypted && (
                  <span className={`encrypted-badge ${isDecrypted ? 'unlocked' : ''}`}>
                    • {isDecrypted ? "잠금 해제됨" : "E2E 암호화"}
                  </span>
                )}
              </div>
            </div>

            <hr className="divider" />

            <div className="note-body">
              {isDecrypted ? (
                <div className="content-box">
                  <div className="pre-wrap">{plainContent}</div>
                </div>
              ) : (
                <div className="lock-screen">
                  <div className="lock-icon">🔒</div>
                  <h3 className="lock-title">이 메모는 암호화되어 있습니다</h3>
                  
                  {sysError && <div className="error-msg">{sysError}</div>}

                  {!showRecovery ? (
                    <div>
                      <p className="recovery-hint">
                        시스템 오류로 세션 키가 손실되었습니다.<br/>
                        백업된 키가 있다면 수동으로 복구하십시오.
                      </p>
                      <button className="btn-outline" onClick={() => setShowRecovery(true)}>
                        키 수동 복구
                      </button>
                    </div>
                  ) : (
                    <form className="recovery-form" onSubmit={handleManualDecrypt}>
                      <label className="recovery-label">백업 키 (k 값) 입력:</label>
                      <input 
                        className="recovery-input"
                        type="text"
                        value={recoveryKey}
                        onChange={e => setRecoveryKey(e.target.value)}
                        placeholder="예: yclNsO52PLScyceOJWaBW..."
                      />
                      <div className="form-actions">
                        <button type="button" className="btn-outline" onClick={() => setShowRecovery(false)}>취소</button>
                        <button type="submit" className="btn-submit">복호화</button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            메모를 선택하여 내용을 확인하세요
          </div>
        )}
        <div className="mission-console">
            <div className="console-header">Hacking Flow</div>
            <div className="console-body">
                <p>1. 새 메모를 작성하세요. 제목에 아래 XSS 페이로드를 입력하고 저장하세요.</p>
                <div className="payload-box">
                    &lt;img src=x onerror="console.log(JSON.stringify(sessionStorage)); this.remove();"&gt;
                </div>
                <p>2. 방금 작성한 메모를 클릭하여 내용을 확인하세요.</p>
                <p>3. 개발자 도구 (F12) Console 탭을 확인하여 세션 키(JWK)를 탈취하세요.</p>
                <p>4. 탈취한 세션 키로 암호화된 기밀 메모의 잠금을 해제하세요.</p>
            </div>
        </div>
        <Link to="/level2" className="sim-exit-btn">🚪 이론으로 돌아가기</Link>
      </div>

      {/* 3. 새 메모 모달 */}
      {isComposeOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">새 메모 작성</h3>
            <form onSubmit={handleSaveNote}>
              <div className="form-group">
                <label className="form-label">제목</label>
                <input 
                  autoFocus
                  className="form-input"
                  type="text" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsComposeOpen(false)}>취소</button>
                <button type="submit" className="btn-submit">저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}