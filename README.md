🤖 AI-Powered RAG Document Assistant

An AI-powered Retrieval-Augmented Generation (RAG) Document Assistant that allows users to upload PDF or TXT documents and ask questions based on the uploaded content.

The application processes documents locally, creates vector embeddings, performs semantic similarity search, and generates grounded answers using Llama 3.2 through Ollama. The system is designed with offline data privacy in mind.

✨ Features

- 📄 Upload PDF and TXT documents
- 🔍 Semantic similarity search
- 🧠 AI-powered contextual question answering
- 🤖 Local Llama 3.2 inference
- 📚 Document text extraction using PyPDF
- ✂️ Intelligent text chunking
- 🗃️ Persistent vector storage with ChromaDB
- 🛡️ Grounded responses to reduce hallucination
- 🔒 Local processing with zero external API requests
- 🌙 Responsive dark-mode interface
- 💬 Conversation history and real-time status feedback

🏗️ System Architecture

                ┌─────────────────────┐
                │    User Upload      │
                │     PDF / TXT       │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Text Extraction   │
                │  PyPDF / Text Reader│
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    Text Chunking    │
                │ Size: 1000          │
                │ Overlap: 200        │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Vector Embeddings   │
                │ all-MiniLM-L6-v2    │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     ChromaDB        │
                │  Vector Database    │
                └──────────┬──────────┘
                           │
                           │
        ┌──────────────────▼──────────────────┐
        │             User Query              │
        └──────────────────┬──────────────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Query Embedding    │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Similarity Search   │
                │       Top-K         │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Context + Prompt    │
                │     Assembly        │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     Llama 3.2       │
                │      Ollama         │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Grounded Answer   │
                └─────────────────────┘

🛠️ Technology Stack

Component| Technology
Frontend| HTML5, CSS3, JavaScript
Frontend Communication| Fetch API
Backend| Python
API Framework| FastAPI
Server| Uvicorn
Document Parsing| PyPDF
Embedding Model| all-MiniLM-L6-v2
Vector Database| ChromaDB
LLM| Llama 3.2
Local AI Runtime| Ollama

The technology stack is based on the project's technical documentation.

🔄 How It Works

1. Upload Document

The user uploads a PDF or TXT document.

2. Extract Text

The application extracts text from the uploaded document using PyPDF for PDFs and a text reader for TXT files.

3. Split Text into Chunks

The extracted text is divided into chunks of:

Chunk Size  : 1000 characters
Overlap     : 200 characters

The overlap helps preserve context between neighboring chunks.

4. Generate Embeddings

Each text chunk is converted into a vector embedding using:

all-MiniLM-L6-v2

5. Store in ChromaDB

The generated embeddings are stored locally in ChromaDB for persistent retrieval.

6. Ask a Question

The user enters a question related to the uploaded document.

7. Semantic Search

The question is converted into an embedding and compared with the stored document embeddings using Top-K similarity search.

8. Generate Answer

Relevant document context is combined with a grounded prompt and passed to Llama 3.2 through Ollama.

9. Return Grounded Response

The application returns an answer based on the retrieved document information. If the required information is unavailable, the system is designed to indicate that rather than inventing information.

📁 Suggested Project Structure

project/
│
├── backend/
│   ├── main.py
│   ├── service.py
│   ├── database_setup.py
│   ├── text_processing.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── README.md
└── ...

«Adjust the file names and folders according to your actual GitHub project structure.»

🚀 Installation & Setup

Step 1: Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER

Step 2: Install Python Dependencies

pip install -r requirements.txt

Step 3: Start Ollama

Make sure Ollama is running with Llama 3.2:

ollama run llama3.2

Step 4: Start the Backend

Run:

uvicorn main:app --reload

The project documentation specifies this command for starting the backend server.

Step 5: Open the Frontend

Open "index.html" using a local live server or directly in your browser, depending on your project configuration.

🔐 Privacy

This project is designed to process documents locally.

- Documents remain on the local machine.
- Embeddings are generated locally.
- ChromaDB is used locally.
- Llama 3.2 runs through local Ollama.
- The documentation specifies zero external API requests.

🎯 Use Cases

This project can be useful for:

- 📚 Study material Q&A
- 📄 Research documents
- 📖 Notes and textbooks
- 📝 Project documentation
- 💼 Private business documents
- 🔎 Local document search

⚙️ Configuration

Setting| Value
Supported Files| PDF, TXT
Chunk Size| 1000 characters
Chunk Overlap| 200 characters
Embedding Model| all-MiniLM-L6-v2
Vector Database| ChromaDB
LLM| Llama 3.2
LLM Runtime| Ollama

🌟 Future Improvements

Possible future improvements include:

- Support for additional document formats
- Improved document management
- Multiple document collections
- Better source/citation display
- Advanced search filters
- User authentication
- Chat export functionality
- Improved UI customization

👨‍💻 Project

AI-Powered RAG Document Assistant

Built using Python, FastAPI, ChromaDB, Sentence Transformers, Ollama, and Llama 3.2.

📄 License

No license information is currently specified for this project.
