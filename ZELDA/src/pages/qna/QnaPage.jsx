import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import { useAuth } from '../../context/AuthContext';
import { getAllQuestions, addQuestion, deleteQuestion } from './MockApi';
import './QnaPage.css';

function QnaPage() {
  const { user } = useAuth();
  const [qnaList, setQnaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllQuestions();
    setQnaList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !user) return;

    try {
      await addQuestion({
        question: newQuestion,
        answer: "답변 대기 중입니다. 관리자가 확인 후 답변을 등록할 예정입니다.",
        userId: user.id,
        authorName: user.name,
      });
      setNewQuestion("");
      fetchData(); // Re-fetch data
    } catch (error) {
      console.error("Failed to post new question:", error);
    }
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm("정말로 이 질문을 삭제하시겠습니까?")) return;

    try {
      await deleteQuestion(questionId);
      fetchData(); // Re-fetch data
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  return (
    <div className="qna-page-container">
      <Header user={user} />
      <main className="qna-main-content">
        <h1 className="qna-title">질문과 답변 (Q&A)</h1>
        <p className="qna-subtitle">Hacking Lab에 대해 궁금한 점을 질문하고 답변을 받아보세요.</p>
        
        {user ? (
          <div className="qna-form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="qna-input"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder={`${user.name}님, 질문을 입력하세요...`}
              />
              <button type="submit" className="qna-submit-btn">질문 등록</button>
            </form>
          </div>
        ) : (
          <div className="qna-login-prompt">
            질문을 등록하려면 <a href="/login">로그인</a>이 필요합니다.
          </div>
        )}

        {loading ? (
          <div className="qna-loading">Loading...</div>
        ) : (
          <div className="qna-list">
            {qnaList.map((item) => (
              <div key={item.id} className="qna-item">
                <div 
                  className="qna-question" 
                  onClick={() => toggleQuestion(item.id)}
                >
                  <div className="qna-question-header">
                    <span>Q. {item.question}</span>
                    {item.authorName && <span className="qna-author">by {item.authorName}</span>}
                  </div>
                  <span className={`qna-arrow ${openQuestionId === item.id ? 'open' : ''}`}>▼</span>
                </div>
                {openQuestionId === item.id && (
                  <div className="qna-answer">
                    <p>{item.answer}</p>
                    {user && item.userId === user.id && (
                      <div className="qna-actions">
                        <button onClick={() => handleDelete(item.id)} className="qna-delete-btn">
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default QnaPage;