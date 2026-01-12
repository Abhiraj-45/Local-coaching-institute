# 🎓 Local Coaching Institute Website

A fully functional, responsive, and dynamic website designed for educational institutes and coaching centers. This project includes a secure **Admin Panel** for managing leads and a **Student Dashboard** for accessing course details.

## 🚀 Features

### 🌟 Frontend (User Experience)
- **Modern UI/UX:** Responsive design with smooth animations (AOS Library).
- **Hero Slider:** Auto-sliding images showcasing the institute environment.
- **Course & Batches:** Dynamic cards displaying course details and batch timings with icons.
- **Live Clock:** Real-time digital clock in the navigation bar.
- **Testimonials:** Sliding student reviews section.
- **Direct WhatsApp Chat:** Floating button for instant student enquiries.
- **Secure Authentication:** Signup/Login pages for students and admins.

### 🛡️ Backend & Admin Panel (Power Features)
- **Role-Based Access Control:** Separate login for Students and Admins (`admin@test.com`).
- **Enquiry Management:** Admins can view all student enquiries in a table format.
- **Excel Export:** One-click download of all student data/leads into `.csv` (Excel) format.
- **Live Counter:** Real-time counter showing total number of enquiries.
- **Delete Functionality:** Admins can remove old or spam enquiries.
- **Security:** Password hashing using `bcryptjs` and secure database connection.

## 🛠️ Tech Stack Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), AOS Animation Library, Swiper.js.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Local/Atlas).
- **Authentication:** JWT (JSON Web Tokens) / LocalStorage logic.


## ⚙️ Installation & Setup

If you want to run this project locally, follow these steps:

1) Navigate to the project folder
   cd local-coaching-institute
   
2) Install Dependencies (For Backend)
   cd backend
   npm install
   
3) Start the Server
   npm start
  (Make sure MongoDB is running in the background)

4) Open the Project
  (Open index.html in your browser or use Live Server.)

🤝 Contribution
Feel free to fork this repository and contribute to making it better!
