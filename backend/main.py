import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse  # ← 추가!
from pydantic import BaseModel

app = FastAPI(title="개인 과제 메모 API")

# (CORS 설정 및 Pydantic 모델, memos 리스트는 그대로 유지)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MemoIn(BaseModel):
    content: str

class MemoOut(BaseModel):
    id: int
    content: str

memos: list[dict] = []
next_id = 1


# ─── API 엔드포인트 ───

# charset=utf-8 을 명시하여 브라우저 한글 깨짐 방지
@app.get("/")
def read_root():
    return JSONResponse(
        content={"status": "ok", "message": "FastAPI 메모 서버가 정상 작동 중입니다!"},
        media_type="application/json; charset=utf-8",
    )

@app.get("/memos", response_model=list[MemoOut])
def list_memos():
    return memos

@app.post("/memos", response_model=MemoOut)
def create_memo(memo: MemoIn):
    global next_id
    new_memo = {"id": next_id, "content": memo.content}
    memos.append(new_memo)
    next_id += 1
    return new_memo

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int):
    global memos
    for m in memos:
        if m["id"] == memo_id:
            memos = [x for x in memos if x["id"] != memo_id]
            return {"ok": True, "deleted_id": memo_id}
    raise HTTPException(status_code=404, detail="해당 메모를 찾을 수 없습니다.")