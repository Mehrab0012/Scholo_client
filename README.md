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


Install dependencies:

npm install


Create a .env file in the root directory with the following variables:

REACT_APP_API_URL=https://scholarshipstreambackend-8zb0h8nr5-mehrabs-projects-1f7e25fb.vercel.app/
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key


Start the development server:

npm start


The app will run at http://localhost:3000.

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