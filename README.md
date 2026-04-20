# 🎓 School Management System (MERN)

A full-stack School Management System built using the MERN stack. The application streamlines school operations by providing role-based access for Admin, Teachers, Students, and Manager with features like authentication, student management, notices, and leave application workflow.

---

## 🚀 Features

* 🔐 Role-based Authentication (Admin, Teacher, Student, Manager)
* 👨‍🏫 Teacher Management (added and managed by Admin)
* 🎓 Student Registration & Class-wise Management
* 📢 Notice System with audience targeting (All / Teachers / Students)
* 📝 Teacher Leave Application & Approval System
* 📊 Role-based Dashboards
* 📩 Contact Query Management (handled by Manager)

---

## 👥 User Roles & Permissions

### 🛠️ Admin

* Add and manage teachers
* View class-wise student details
* Assign teachers to classes
* Create notices (for all / teachers / students)
* Approve or reject teacher leave applications

### 👨‍🏫 Teacher

* Login via common portal
* Access assigned class students
* Apply for leave
* View leave status (Approved/Rejected/Pending)

### 🎓 Student

* Self registration
* Access personal dashboard

### 📞 Manager

* Handle contact form queries
* View user details (name, phone, message, date & time)
* Contact users based on queries

---

## ⚙️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Token)

---

## 🔄 Application Flow

1. Users login through a common login page (role-based access).
2. Admin manages teachers, students, and notices.
3. Teachers can view students and apply for leave.
4. Admin reviews and approves/rejects leave requests.
5. Teachers can track leave status in their dashboard.
6. Manager handles queries submitted through the contact form.

---

## 🛠️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Aman8221-del/school-management-system-mern.git

# Install dependencies
npm install

# Run backend
nodemon

# Run frontend
npm run dev
```

---

## 🌟 Key Highlights

* Role-based access control system
* Real-world workflow implementation (leave management)
* Clean and responsive UI
* Scalable backend architecture

---

## 📌 Future Improvements

* Attendance system
* Fee management
* Notifications (Email/SMS)
* Admin analytics dashboard

---

## 📬 Contact

For any queries or suggestions, feel free to connect.

---

⭐ If you like this project, don’t forget to give it a star!
