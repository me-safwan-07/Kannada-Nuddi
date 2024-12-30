# 🎯 Kannada Nuddi - News Blogging Platform  

**Kannada Nuddi** is a dynamic and responsive news blogging platform built using the **MERN** (MongoDB, Express, React, Node.js) stack. This project empowers users to create, manage, and categorize news articles with a streamlined admin dashboard. It also features a rich text editor, customizable categories, and weather integration.  

---

## 🚀 Features  
- **📑 Dynamic News Management** – Add, update, and delete news articles.  
- **🗂️ Custom Categories** – Organize news by categories with drag-and-drop functionality.  
- **📝 Rich Text Editor** – Create articles with images, videos, and text formatting using Quill.js.  
- **📊 Dashboard Analytics** – View monthly statistics of news posts and categories.  
- **🌤️ Weather Integration** – Real-time weather updates displayed in the top navigation bar.  
- **📱 Responsive Design** – Fully optimized for desktop, tablet, and mobile screens.  
- **🔒 Authentication** – Admin login system using JWT and Passport.js.  
- **📡 API-Driven** – Fetch data dynamically from backend APIs.  

---

## 📁 Project Structure  
```bash
me-safwan-07-Kannada-Nuddi/
│
├── client/                     # Frontend (React + Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── common/         # Common UI components (Header, Footer, etc.)
│   │   │   └── core/           # Core functional components (TextEditor, Stories)
│   │   ├── context/            # React Context for state management
│   │   ├── pages/              # Page components (Home, Dashboard, Login)
│   │   ├── services/           # API service handlers
│   │   └── main.jsx            # Application entry point
│   ├── tailwind.config.js      # TailwindCSS configuration
│   └── vite.config.js          # Vite development server config
│
└── server/
    ├── controllers/            # Express route handlers
    ├── models/                 # Mongoose models and schemas
    ├── routes/                 # API route handlers
    ├── config/                 # Passport, database config, etc.
    ├── middleware/             # Authentication and role-based access
    ├── server.js               # Main server entry point
    └── utils/                  # Utility functions (error handling, database seed)
```

---

## ⚙️ Setup Instructions  

### Prerequisites  
Ensure you have the following installed:  
- **[Node.js](https://nodejs.org/)** (v18 or higher)  
- **[MongoDB](https://www.mongodb.com/)**  
- **[Vite](https://vitejs.dev/)**  

### Installation  
```bash
# 1. Clone the repository
git clone https://github.com/your-username/me-safwan-07-Kannada-Nuddi.git

# 2. Install dependencies for both frontend and backend
npm run install:client
npm run install:server

# 3. Set up environment variables
cp .env.example client/.env
cp .env.example server/.env

# 4. Start the development server
npm run dev
```

---

## 🔑 Environment Variables  
The project uses environment variables for sensitive configurations. Below are the required variables:  

### Server (`/server/.env`):  
```env
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
GOOGLE_CLIENT_ID=<Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>
```  

### Client (`/client/.env`):  
```env
VITE_APP_BASE_URL=http://localhost:5000/api
VITE_APP_WEATHER_API_KEY=<Your Weather API Key>
```  

---

## 📡 API Endpoints  
### News Routes:  
- **`GET /api/news`** – Retrieve all news articles.  
- **`POST /api/news/create`** – Create a new article (Admin only).  
- **`GET /api/news/:id`** – Retrieve a single article by ID.  
- **`PUT /api/news/update/:id`** – Update an article by ID (Admin only).  
- **`DELETE /api/news/delete/:id`** – Delete an article by ID (Admin only).  

### Category Routes:  
- **`GET /api/category`** – Get all categories.  
- **`POST /api/category/add`** – Create a new category.  
- **`PUT /api/category/update`** – Update category order.  
- **`DELETE /api/category/delete/:id`** – Delete category by ID.  

### Auth Routes:  
- **`POST /api/auth/login`** – Admin login.  
- **`POST /api/auth/signup`** – Admin registration.  

---

## 🛠️ Technologies Used  
- **Frontend**:  
  - React  
  - Vite  
  - Tailwind CSS  
  - Axios  
  - Quill.js (Text Editor)  
  - Firebase  
- **Backend**:  
  - Node.js  
  - Express.js  
  - MongoDB (Mongoose)  
  - Passport.js (Authentication)  
- **Tools & Deployment**:  
  - Vercel (for server deployment)  
  - ESLint, PostCSS, Flowbite  

---

## 🤝 Contributing  
Contributions are welcome!  
If you have suggestions for improving this project, feel free to open an issue or submit a pull request.  

### Steps to Contribute:  
```bash
# 1. Fork the repository
# 2. Create a new branch
git checkout -b feature/awesome-feature

# 3. Make changes and commit
git commit -m "Add new feature"

# 4. Push to the branch
git push origin feature/awesome-feature

# 5. Open a Pull Request
```

---

## 📜 License  
This project is licensed under the **ISC License**.
