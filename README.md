# 🌟 **CrustBot** 🌟  
_A user-friendly chatbot for answering Crustdata API questions with precision and style._

## 🚀 **Features**
- 🎨 **Interactive Chat Interface**: Engaging and easy-to-use frontend for users.  
- ⚙️ **Dynamic Question Matching**: Matches user questions to predefined answers using fuzzy logic.  
- 📡 **FastAPI Backend**: High-performance backend to handle API requests seamlessly.  
- 📚 **Expandable Knowledge Base**: Easily update Q&A data for enhanced support.  
- 🌐 **Ready for Deployment**: Frontend deployable on Netlify; backend containerized via Docker.  

---

## 🛠️ **Tech Stack**
- **Frontend**: React + TailwindCSS  
- **Backend**: FastAPI (Python)  
- **Database**: JSON (extendable to SQLite/PostgreSQL)  
- **Deployment**: Docker, Netlify  

---

## 🏗️ **Setup and Installation**

### 🔧 Prerequisites
- Node.js & npm  
- Python 3.9+  
- Docker (optional for backend)

### 💻 Local Setup

#### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/footcricket05/CrustBot.git
   cd CrustBot/backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 8000
   ```

#### **Frontend**
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🐳 **Docker Setup**
1. Build the backend image:
   ```bash
   docker build -t CrustBot-backend ./backend
   ```
2. Run the backend container:
   ```bash
   docker run -d -p 8000:8000 CrustBot-backend
   ```

---

## 🌐 **Deployment**
- **Frontend**: Deploy the `dist` folder on [Netlify](https://www.netlify.com/).  
- **Backend**: Host on any cloud platform (AWS, Heroku, etc.) or expose locally using Ngrok.  

---

## 🤖 **Usage**
1. Open the deployed frontend.
2. Ask questions like:
   - "How do I search for people by their current title?"
   - "What are the rate limits for API usage?"
3. Get instant, accurate responses powered by the backend.

---

## 🛡️ **Contributing**
1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-branch`.  
3. Commit your changes: `git commit -m 'Add some feature'`.  
4. Push to the branch: `git push origin feature-branch`.  
5. Submit a pull request.  

---

## 📄 **License**
This project is licensed under the MIT License.  
