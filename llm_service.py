import requests
from database_setup import embed_model, doc_collection

def process_and_store(chunks: list) -> int:
    """Vectors the chunks and stores them in ChromaDB."""
    old_docs = doc_collection.get()
    if old_docs['ids']:
        doc_collection.delete(ids=old_docs['ids'])
        
    vectors = embed_model.encode(chunks).tolist()
    ids = [f"chunk_{i}" for i in range(len(chunks))]
    doc_collection.add(documents=chunks, embeddings=vectors, ids=ids)
    return len(chunks)

def answer_question(question: str) -> str:
    """Searches DB and asks Ollama."""
    q_vec = embed_model.encode([question]).tolist()
    results = doc_collection.query(query_embeddings=q_vec, n_results=3)
    
    if not results['documents'] or not results['documents'][0]:
        return "The information was not found in the uploaded document."
        
    context = " ".join(results['documents'][0])
    prompt = f"Use strictly this context to answer. If not in context, say 'The information was not found in the uploaded document.'\n\nContext: {context}\n\nQuestion: {question}\nAnswer:"
    
    resp = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama3.2", "prompt": prompt, "stream": False
    })
    return resp.json().get("response", "Error.").strip()