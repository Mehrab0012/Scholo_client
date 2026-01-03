Scholarship Stream - Frontend

The Scholarship Stream Frontend is a modern, responsive interface for students and administrators to manage scholarships and applications. Built with React, it integrates with a backend API to provide real-time scholarship data, application submissions, and secure payment processing.

Features

Responsive UI: Works seamlessly on desktop, tablet, and mobile.

User Authentication: Sign up, login, and manage profiles using Firebase Auth.

Scholarship Listing: Browse and filter available scholarships.

Application Submission: Submit applications and upload documents.

Payment Integration: Pay application fees securely using Stripe.

Application Status: Track the status of applications in real-time.

Admin Support: Admins can manage scholarships and applications easily.

Tech Stack

Frontend Framework: React.js

Routing: React Router DOM

State Management: React Context API + Hooks

HTTP Requests: Axios

UI & Styling: Tailwind CSS / Material UI, React Icons

Authentication: Firebase Auth

Payments: Stripe API

Getting Started
Prerequisites

Node.js >= 18

Backend API deployed (locally or on Vercel)

Firebase project for authentication

Installation

Clone the repository:

git clone https://github.com/Mehrab0012/Scholo_client.git
cd scholarship-stream-frontend



The app will run at  https://scholarshipstream.netlify.app.

Folder Structure
scholarship-stream-frontend/
│
├─ public/            # Static assets
├─ src/
│   ├─ components/    # Reusable UI components (Navbar, Footer, Buttons)
│   ├─ pages/         # Pages (Home, Scholarships, Application, Profile)
│   ├─ context/       # React Context for global state
│   ├─ api/           # Axios API calls
│   ├─ assets/        # Images, icons, logos
│   ├─ styles/        # CSS / Tailwind files
│   └─ App.js         # Main app component with routing
├─ .env               # Environment variables
├─ package.json
└─ README.md

Deployment on Vercel

Install Vercel CLI (optional):

npm i -g vercel


Deploy your project:

vercel


In the Vercel dashboard, go to Settings → Environment Variables and add all variables from .env.

Redeploy the project to make the environment variables effective.

Your app will now be live on a Vercel URL.

Contributing

Fork the repository

Create a feature branch (git checkout -b feature/YourFeature)

Commit changes (git commit -m 'Add feature')

Push to branch (git push origin feature/YourFeature)

Open a Pull Request

License

This project is licensed under the MIT License.

Contact

Developer: Mehrab H

Email: mehrabhossainfr@gmail.com