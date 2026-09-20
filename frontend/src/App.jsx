import { useState, useEffect } from "react";

// .env에 적어둔 백엔드 주소 가져오기 (없으면 기본값 사용)
const API_URL = import.meta.env.VITE_API_URL || "https://baf-assignment1.onrender.com";

export default function App() {
  // ─── 상태 관리 (React Hooks) ───
  const [darkMode, setDarkMode] = useState(false);
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("서버 연결 확인 중...");

  // 1. 화면이 처음 뜰 때 Render 백엔드에서 메모 목록 조회
  useEffect(() => {
    loadMemos();
  }, []);

  // 2. 메모 목록 조회 함수 (GET /memos)
  const loadMemos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/memos`);
      if (!res.ok) throw new Error("서버 응답 오류");
      const data = await res.json();
      setMemos(data);
      setApiStatus("🟢 백엔드 API 연결 정상 (Render)");
    } catch (error) {
      console.error(error);
      setApiStatus("🟡 백엔드 기동 중 (Render 슬립 해제 대기)");
    } finally {
      setLoading(false);
    }
  };

  // 3. 메모 추가 함수 (POST /memos)
  const addMemo = async () => {
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.trim() }),
      });
      if (res.ok) {
        setText("");
        loadMemos(); // 등록 후 최신 목록 다시 불러오기
      }
    } catch (error) {
      alert("메모 추가에 실패했습니다. 백엔드 서버 상태를 확인해 주세요.");
    }
  };

  // 4. 메모 삭제 함수 (DELETE /memos/{id})
  const deleteMemo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/memos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        loadMemos(); // 삭제 후 목록 갱신
      }
    } catch (error) {
      alert("메모 삭제에 실패했습니다.");
    }
  };

  // 엔터 키를 누르면 바로 메모 추가 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addMemo();
  };

  // ─── 다크 모드 / 라이트 모드 색상 테마 ───
  const theme = {
    bg: darkMode ? "#121212" : "#f4f6f9",
    cardBg: darkMode ? "#1e1e1e" : "#ffffff",
    text: darkMode ? "#e0e0e0" : "#2d3748",
    subText: darkMode ? "#a0aec0" : "#718096",
    primary: "#2563eb",
    border: darkMode ? "#333333" : "#e2e8f0",
    memoBg: darkMode ? "#2a2a2a" : "#f8fafc",
  };

  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      transition: "background-color 0.2s, color 0.2s"
    }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        
        {/* 상단 헤더 & 다크모드 토글 버튼 */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "19px", fontWeight: "700", margin: 0 }}>
            ☁️ 금융 클라우드 컴퓨팅 실습
          </h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.cardBg,
              color: theme.text,
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            {darkMode ? "☀️ 라이트 모드" : "🌙 다크 모드"}
          </button>
        </header>

        {/* 1. 개인 소개 카드 (1주차 실습 통합) */}
        <section style={{
          backgroundColor: theme.cardBg,
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          border: `1px solid ${theme.border}`,
          textAlign: "center"
        }}>
          <img 
            src="https://github.com/jeehoshin.png" 
            alt="신지호 프로필 사진"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "14px",
              border: `3px solid ${theme.primary}`
            }}
          />
          <h2 style={{ margin: "0 0 6px 0", fontSize: "22px" }}>신지호</h2>
          <p style={{ margin: "0 0 12px 0", color: theme.primary, fontWeight: "600", fontSize: "15px" }}>
            KAIST 디지털금융 MBA
          </p>
          <p style={{ margin: "0 0 18px 0", color: theme.subText, fontSize: "14px", lineHeight: "1.6" }}>
            NICE평가정보에서 기업신용평가모형 및 기업여신 자동심사모형 컨설팅 업무를 맡고 있습니다.<br />
            클라우드 컴퓨팅 실습 수업을 듣고 있습니다. 이번 과제를 통해 FastAPI와 Render를 활용한 백엔드 연동 경험을 쌓고자 합니다.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <a 
              href="https://github.com/jeehoshin" 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: theme.primary,
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              GitHub 프로필
            </a>
            <a 
              href={`${API_URL}/docs`} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "8px",
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.cardBg,
                color: theme.text,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              백엔드 Swagger 문서
            </a>
          </div>
        </section>

        {/* 2. 백엔드 연동 메모장 (2주차 실습 통합) */}
        <section style={{
          backgroundColor: theme.cardBg,
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          border: `1px solid ${theme.border}`
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <h3 style={{ margin: 0, fontSize: "17px" }}>📝 실시간 메모장 (FastAPI 연동)</h3>
            <button 
              onClick={loadMemos} 
              style={{
                background: "none",
                border: "none",
                color: theme.primary,
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              🔄 새로고침
            </button>
          </div>

          <div style={{ fontSize: "12px", color: theme.subText, marginBottom: "16px" }}>
            {apiStatus}
          </div>

          {/* 메모 입력창 */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <input 
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="클라우드 백엔드에 저장할 메모를 입력하세요..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "8px",
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.memoBg,
                color: theme.text,
                fontSize: "14px",
                outline: "none"
              }}
            />
            <button 
              onClick={addMemo}
              style={{
                padding: "12px 20px",
                backgroundColor: theme.primary,
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              추가
            </button>
          </div>

          {/* 메모 리스트 목록 */}
          {loading && memos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px", color: theme.subText, fontSize: "14px" }}>
              ⏳ 백엔드 서버에서 메모를 불러오는 중입니다...
            </div>
          ) : memos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px", color: theme.subText, fontSize: "14px" }}>
              등록된 메모가 없습니다. 첫 메모를 등록해 보세요!
            </div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {memos.map((m) => (
                <li 
                  key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 18px",
                    backgroundColor: theme.memoBg,
                    borderRadius: "10px",
                    marginBottom: "10px",
                    border: `1px solid ${theme.border}`,
                    wordBreak: "break-all"
                  }}
                >
                  <span style={{ fontSize: "15px" }}>{m.content}</span>
                  <button 
                    onClick={() => deleteMemo(m.id)}
                    style={{
                      marginLeft: "12px",
                      padding: "4px 10px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      flexShrink: 0
                    }}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
}