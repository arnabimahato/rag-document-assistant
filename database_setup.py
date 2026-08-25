import chromadb
from sentence_transformers import SentenceTransformer

# Load models and database
embed_model = SentenceTransformer('all-MiniLM-L6-v2')
db_client = chromadb.PersistentClient(path="./rag_storage")
doc_collection = db_client.get_or_create_collection(name="pdf_knowledge")