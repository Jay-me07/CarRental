# 🚗 Car Rental – Full Stack MERN Web App

A modern **Car Rental** platform built with the **MERN stack**, offering users a seamless car booking experience and owners an interactive dashboard to manage cars, bookings, and revenue.

🟢 **Live Demo:** [https://car-rental-client-nu.vercel.app](https://car-rental-client-nu.vercel.app)

---

## ✨ Features

- 🔐 **Authentication & Authorization** for users and car owners
- 📅 **Car Booking System** with status tracking
- 📊 **Owner Dashboard**: Total cars, bookings, revenue, and recent activity
- 📷 **Optimized Image Uploads** via [ImageKit.io](https://imagekit.io/)
- 🎞️ **Smooth Animations** using Motion/React
- 📱 **Responsive Design** (mobile & desktop friendly)
- 💬 **Real-time Notifications** via React Hot Toast

---

## 🛠️ Tech Stack

| Technology        | Role                     |
|------------------|--------------------------|
| **MongoDB**      | Database                 |
| **Express.js**   | Backend API              |
| **React.js**     | Frontend UI              |
| **Node.js**      | Runtime Environment      |
| **ImageKit.io**  | Image Optimization/CDN   |
| **TailwindCSS**  | Styling                  |
| **Framer Motion**| Animations               |
| **React Hot Toast** | User feedback         |
| **JWT**          | Auth Token Management    |

---

## 📂 Project Structure

car-rental/
├── client/ # React frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── App.js
├── server/ # Node.js backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── index.js
├── .env
└── README.md


---

## 🚀 Getting Started Locally

### Prerequisites:
- Node.js
- MongoDB (local or Atlas)
- ImageKit.io account

### Steps:

1. **Clone Repository:**
   ```bash
   git clone https://github.com/Jay-me07/CarRental.git
   cd car-rental

2.cd server
npm install

3.cd ../client
npm install

4. Create .env file in server/:
 MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url

5. Run the App:
   # In root directory
cd server && npm run server 
cd client && npm run dev

```

