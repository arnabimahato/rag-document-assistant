from pypdf import PdfReader

def get_text_from_file(filepath: str) -> str:
    """Reads PDF or TXT files."""
    if filepath.endswith('.pdf'):
        reader = PdfReader(filepath)
        return "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def chunk_text(text: str, chunk_size: int = 800, overlap: int = 100) -> list:
    """Splits text into overlapping pieces."""
    chunks = []
    for i in range(0, len(text), chunk_size - overlap):
        chunks.append(text[i:i + chunk_size])
    return chunks