# 🚀 BorrowHub Frontend

## 🌍 Project Overview

BorrowHub is a full-stack web application that promotes environmental sustainability by encouraging people to **reuse and share items** instead of purchasing new ones. The platform helps reduce waste, supports a sharing culture, and strengthens community collaboration through an easy-to-use digital platform.

The frontend was developed using **React.js** and communicates with the backend through REST APIs to provide a dynamic and responsive user experience.

---

# 🛠️ Technologies Used

* ⚛️ React.js
* 🔀 React Router DOM
* 🎨 CSS3
* 🎯 React Icons
* 🔗 REST API
* ⚡ Vite

---

# 👤 User Features

The BorrowHub frontend provides the following features for users:

* ✅ Register a new account
* 🔑 Login securely
* 🏠 Browse available items
* 🔍 Search and filter items
* 📦 View item details
* ➕ Add new items
* 🖼️ Upload item images
* ✏️ Edit personal items
* 🗑️ Delete personal items
* 🤝 Send borrowing requests
* 📋 View borrowing requests
* 📊 Access personal dashboard

---

# 📄 Main Pages

* 🔐 Login
* 📝 Signup
* 🏡 Home
* 📦 Item Details
* ➕ Add Item
* ✏️ Edit Item
* 📊 Dashboard
* 💬 Requests
* 🛡️ Admin Dashboard

---

# 🧩 Main Components

* 🧭 Navbar
* 🎯 Hero Section
* ✨ Feature Section
* 🔍 Search Filters
* 📦 Items Grid
* 📝 Item Card

The project follows a reusable component-based architecture to improve maintainability and scalability.

---

# 🔗 API Integration

The frontend communicates with the Express.js backend using REST APIs.

### User Endpoints

* `GET /users`
* `POST /users`
* `PUT /users/:id`
* `DELETE /users/:id`

### Item Endpoints

* `GET /items`
* `POST /items`
* `PUT /items/:id`
* `DELETE /items/:id`

### Request Endpoints

* `GET /requests`
* `POST /requests`
* `PUT /requests/:id`
* `DELETE /requests/:id`

These endpoints enable dynamic interaction with the PostgreSQL database.

---

# 🌐 Environment Variables

Create a `.env` file and add:

```env
VITE_SERVER_URL=http://localhost:3000
```

For production deployment:

```env
VITE_SERVER_URL=https://your-backend-url.up.railway.app
```

---

# 📱 Responsive Design

The application is fully responsive and adapts to different screen sizes, providing an optimal experience on desktops, tablets, and mobile devices.

---

# ☁️ Deployment

The frontend application is deployed on **Railway** and communicates with the deployed Express.js backend using the `VITE_SERVER_URL` environment variable.

---

# 📂 Project Structure

```text
src/
│
├── assets/
├── components/
├── css/
├── pages/
├── App.jsx
└── main.jsx
```

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/borrowhub-frontend.git
```

Navigate to the project folder:

```bash
cd borrowhub-frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 👨‍💻 Author

**BorrowHub** was developed as a Full-Stack Web Application using **React.js, Express.js, PostgreSQL, REST APIs, GitHub, and Railway** as part of a university web development project.
