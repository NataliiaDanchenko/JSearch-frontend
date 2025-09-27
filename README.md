# JSearch

**JSearch** is a web application for job searching and user profile management. Users can search for jobs, view details, like jobs, and create a profile with their personal information and desired job title. The interface is responsive and works on both mobile and desktop devices.

---

## 🚀 Features

- Job search by title with results displayed as cards  
- Job details page (`/job-details/:id`)  
- Profile creation (`/create-profile`) with name, desired job title, and about me  
- Like jobs and view them on `/liked`  
- Personalized job recommendations based on profile  

---

## 🛠 Technologies

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS 4, Formik + Yup, React Query, Next/Image  
- **Backend (optional):** Express.js, MongoDB + Mongoose  
- **API:** JSearch API (RapidAPI), Axios  
- **Storage:** localStorage for profile and liked jobs  

---

## 📦 Installation

```bash
git clone https://github.com/your-username/jsearch-frontend.git
cd jsearch-frontend
npm install
npm run dev
