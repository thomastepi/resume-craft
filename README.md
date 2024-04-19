# Resume Craft React Frontend (AI-powered Resume Builder)
This repository focuses on the React frontend component of the Resume Craft application. It collaborates with a backend API (separate repository) to provide a user-friendly interface for creating and managing resumes.

## Key Features:
- **Dynamic User Profile Management:** Users can create and modify their profile information, including name, address, summary, phone number, email, education, work experience, projects, and more.
- **Interactive Form:** A dynamic form allows users to seamlessly enter and update their profile data.
- **Resume Generation:** Both AI-generated and pre-built template-based resumes are created using user profile data, empowering users to explore different options.
- **User Interface:** Leverages Ant Design to offer a clean, responsive, and intuitive experience for resume creation.
- **Communication with Backend:** Communicates with the backend API to handle user authentication, data storage, and AI-powered suggestions.

## Technologies Used:
 - React
 - React Router
 - Ant Design (UI framework)
 - Axios

### Backend Integration (High-Level Overview):
 - The backend API (separate repository) is built with Node.js and Express.js for server-side logic and API endpoints.
 - User accounts are managed securely using JWT (JSON Web Token) authentication.
 - MongoDB database stores user profile data and other application data.
 - Integration with OpenAI's chat completion endpoint (GPT-3.5 turbo) implemented in the backend to generate AI-powered resume suggestions.

**Please note:** This repository does not contain the backend API code. Refer to the separate backend repository for details on its implementation.

