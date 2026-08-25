const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');
const uploadForm = document.getElementById('uploadForm');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');

const askForm = document.getElementById('askForm');
const questionInput = document.getElementById('questionInput');
const askBtn = document.getElementById('askBtn');
const chatHistory = document.getElementById('chatHistory');

// URL variables for backend
const API_BASE = 'http://127.0.0.1:8000';

// 1. Update UI when a file is selected
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = 'Click to select PDF/TXT';
    }
});

// 2. Handle File Upload
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    uploadBtn.textContent = 'Processing...';
    uploadBtn.disabled = true;
    uploadStatus.textContent = '';
    uploadStatus.className = 'status-message';

    try {
        const response = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            uploadStatus.textContent = data.message;
            uploadStatus.classList.add('success');
        } else {
            uploadStatus.textContent = data.detail || 'Upload failed.';
            uploadStatus.classList.add('error');
        }
    } catch (err) {
        uploadStatus.textContent = 'Connection to server failed.';
        uploadStatus.classList.add('error');
    } finally {
        uploadBtn.textContent = 'Ingest Document';
        uploadBtn.disabled = false;
    }
});

// 3. Handle Question Asking
askForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = questionInput.value.trim();
    if (!text) return;

    // Display user question
    addChatBubble(text, 'user');
    questionInput.value = '';
    
    // Display bot loading state
    const botMsgId = addChatBubble('Analyzing context...', 'bot');
    askBtn.disabled = true;

    try {
        const formData = new URLSearchParams();
        formData.append('question', text);

        const response = await fetch(`${API_BASE}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        });

        const data = await response.json();
        const activeBubble = document.getElementById(botMsgId);
        
        if (response.ok) {
            activeBubble.textContent = data.answer;
        } else {
            activeBubble.textContent = `Error: ${data.detail || 'Query failed.'}`;
            activeBubble.style.color = '#f56565';
        }
    } catch (err) {
        const activeBubble = document.getElementById(botMsgId);
        activeBubble.textContent = 'Error: Cannot reach the backend server.';
        activeBubble.style.color = '#f56565';
    } finally {
        askBtn.disabled = false;
    }
});

// Helper function to draw chat bubbles
function addChatBubble(text, senderClass) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${senderClass}`;
    bubble.textContent = text;
    
    const uniqueId = 'msg-' + Date.now();
    bubble.id = uniqueId;
    
    chatHistory.appendChild(bubble);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to bottom
    
    return uniqueId;
}
