import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. FastAPI 앱 인스턴스 생성 (Swagger UI 제목 설정)
app = FastAPI(title="개인 과제 메모 API")

# 2. CORS (Cross-Origin Resource Sharing) 설정
# 브라우저는 보안상 도메인이 다른 서버로의 요청(Vercel → Render)을 기본 차단합니다.
# 과제 실습 및 배포 환경에서 CORS 에러가 나지 않도록 모든 출처(*)를 허용해 둡니다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Vercel 배포 주소 및 로컬 호스트 모두 허용
    allow_credentials=False,
    allow_methods=["*"],        # GET, POST, DELETE 등 모든 HTTP 메서드 허용
    allow_headers=["*"],        # 모든 요청 헤더 허용
)

# 3. 데이터 모델 정의 (Pydantic)
# 클라이언트가 보낼 데이터와 서버가 응답할 데이터의 모양을 규격화합니다.
class MemoIn(BaseModel):
    content: str  # 등록할 메모 내용

class MemoOut(BaseModel):
    id: int       # 서버가 부여한 고유 번호
    content: str

# 4. 인메모리 데이터 저장소
# 서버 메모리에 저장되는 임시 리스트입니다. (실습용)
memos: list[dict] = []
next_id = 1


# ─── API 엔드포인트 (경로) ───

# 기본 루트 경로 (서버 정상 작동 확인용)
@app.get("/")
def read_root():
    return {"status": "ok", "message": "FastAPI 메모 서버가 정상 작동 중입니다!"}

# 1) 전체 메모 목록 조회 (GET)
@app.get("/memos", response_model=list[MemoOut])
def list_memos():
    return memos

# 2) 새 메모 추가 (POST)
@app.post("/memos", response_model=MemoOut)
def create_memo(memo: MemoIn):
    global next_id
    new_memo = {"id": next_id, "content": memo.content}
    memos.append(new_memo)
    next_id += 1
    return new_memo

# 3) 메모 삭제 (DELETE)
@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int):
    global memos
    for m in memos:
        if m["id"] == memo_id:
            memos = [x for x in memos if x["id"] != memo_id]
            return {"ok": True, "deleted_id": memo_id}
    raise HTTPException(status_code=404, detail="해당 메모를 찾을 수 없습니다.")