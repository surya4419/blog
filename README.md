# Project Title: Medium

## Description
Medium is a web application that allows users to create, read, and manage blog posts. It features user authentication, a blog management system, and a responsive frontend built with React.

## Technologies Used
- **Backend**: 
  - Hono (Web Framework)
  - TypeScript
  - Zod (Schema Validation)
  - CORS Middleware

- **Frontend**: 
  - React
  - React Router
  - Axios (HTTP Client)
  - Tailwind CSS (Styling)
  - Vite (Build Tool)

## Project Structure
```
/backend
  ├── src
  │   ├── index.ts          # Main application entry point
  │   ├── routes
  │   │   ├── user.ts       # User-related routes
  │   │   └── blog.ts       # Blog-related routes
  ├── package.json          # Backend dependencies and scripts
/common
  ├── package.json          # Shared dependencies
/frontend
  ├── src
  │   ├── App.tsx           # Main React component
  │   ├── components        # Reusable components
  │   └── pages             # Application pages
  ├── package.json          # Frontend dependencies and scripts
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

5. Start the frontend development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the ISC License.
