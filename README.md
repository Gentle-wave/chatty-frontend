# Mini Web Chat App

A lightweight, real-time chat application that allows users to sign up, log in, view available users, and chat with them. Messages are stored in a backend server, while the frontend uses **Redux Toolkit** for state management and **Socket.IO** for real-time communication.

## Features

- 🔐 User Authentication (Sign Up and Login)
- 👥 View and Chat with Other Users
- 💬 Real-time Messaging with Socket.IO
- 📂 Message Persistence in the Backend
- 🎨 Styled with Tailwind CSS
- ⚡ Powered by Vite for Fast Development
- 🔄 State Management with Redux Toolkit

---

## Getting Started

### Prerequisites

- **Backend Server**: Ensure the backend server is running before starting the frontend.
- **API URL Configuration**: Update the `apiUrl` in `secret.ts` to match your local machine's IP address.

### Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/AjKenz/friend-connect.git>
   cd friend-connect

2. Install dependencies

```bash
    npm install



## Development

Update the apiUrl in app/secret.ts:

typescript
Copy code
export const apiUrl = "http://<your-local-ip>:<backend-port>";
Replace <your-local-ip> with your machine's IP address and <backend-port> with the backend server's port.

Start the development server:

```bash
   Copy code
   npm run dev
   Open the app in your browser at http://localhost:5173.

## Backend Configuration

Make sure the backend server is up and running before accessing the frontend. The backend handles user authentication, user data, and message storage.

## Building for Production
To create a production-ready build:

```bash Copy code 
   npm run build


**Deployment**
Deploy your production build using any preferred hosting service. Ensure the apiUrl in secret.ts is updated to point to the deployed backend server.

## Key Files
- Frontend:
    - app/secret.ts: Configure the backend apiUrl here.
- Backend:
    -Ensure proper setup for storing user data and messages.
**Technologies Used**
1. Frontend: React, Redux Toolkit, Tailwind CSS, Socket.IO, Vite
2. Backend: Node.js, Express, Socket.IO
3. State Management: Redux Toolkit
4. Real-Time Communication: Socket.IO

**Notes**

If you encounter any issues, ensure the backend server is running, and the IP address in secret.ts matches your local or deployed backend server.