import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from text_processing import get_text_from_file, chunk_text
from llm_service import process_and_store, answer_question

app = FastAPI(title="Data Science RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

os.makedirs("uploads", exist_ok=True)

@app.post("/upload")
async def upload_doc(file: UploadFile = File(...)):
    path = f"uploads/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())
        
    text = get_text_from_file(path)
    chunks = chunk_text(text)
    count = process_and_store(chunks)
    
    return {"message": f"Processed {count} chunks successfully."}

@app.post("/ask")
async def ask_doc(question: str = Form(...)):
    if not question.strip():
        raise HTTPException(status_code=400, detail="Empty question")
        
    answer = answer_question(question)
    return {"answer": answer}