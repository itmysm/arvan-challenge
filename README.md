# Arvan Cloud Dashboard Challenge

This project is a dashboard application developed for the Arvan Cloud technical challenge. It serves as a single-page dashboard with authentication, article management, and responsive components, created with **Vue 3**, **Pinia**, **Bootstrap**, and **Axios**. The backend is powered by **Xano** for data storage and API management, and the project is deployed on [Netlify](https://challenge-arvan.netlify.app).

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Scripts](#scripts)
- [Key Features](#key-features)
- [License](#license)

## Project Overview

The Arvan Cloud Dashboard is designed to demonstrate essential features for a typical admin interface, including:
- User authentication
- Article management (create, edit, and view articles)
- Dynamic components (alert, modal, and dropdown)
- Responsive layout with a navigation sidebar

## Technologies

The following libraries and tools were used to build this application:

- **Vue 3**: The framework for building the application.
- **Pinia**: State management for efficient and modular data handling.
- **Bootstrap**: Used for styling and layout, with custom SCSS for unique designs.
- **Axios**: For handling HTTP requests to Xano.
- **Xano**: Backend-as-a-Service, providing REST APIs for data management.
- **Vite**: A modern, fast build tool for bundling the project.
- **Netlify**: For hosting and deploying the application.

## Project Structure

Here’s an overview of the main files and folders:

```plaintext
project-root
├── dist                     # Production-ready files after build
├── public                   # Public assets, including favicons
├── src                      # Main application code
│   ├── assets               # Static assets and styles
│   ├── components           # Reusable UI components
│   │   ├── icons            # Icon components (e.g., close, menu)
│   │   ├── pages            # Components organized by feature
│   │   └── ui               # UI elements (Alert, Dropdown, Modal)
│   ├── layouts              # Layout components (e.g., Dashboard layout)
│   ├── middleware           # Middleware for route guards (e.g., auth)
│   ├── pages                # Main application pages (login, register, dashboard)
│   ├── router               # Vue Router configuration
│   ├── stores               # Pinia stores for state management
│   ├── utils                # Utility functions (e.g., date conversion)
│   └── types                # TypeScript type definitions
├── .editorconfig            # Editor configuration
├── .env                     # Environment variables
├── .gitignore               # Files to ignore in Git
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration file
└── package.json             # Project dependencies and scripts
```

## Setup and Installation

To set up the project locally, follow these steps:

### Prerequisites

- **Node.js** (version 16.x or later recommended)
- **npm** (included with Node.js)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/itmysm/arvan-challenge.git
   cd arvan-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add any required environment variables, such as the Xano API URL or API keys.

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Scripts

Here are the main scripts for development and production:

- **`dev`**: Runs the development server using Vite.
- **`build`**: Builds the project for production, including type-checking.
- **`preview`**: Launches a locally hosted version of the production build.
- **`type-check`**: Type-checks the project using TypeScript.
- **`lint`**: Lints and fixes issues in the code using ESLint.
- **`format`**: Formats code in the `src/` folder using Prettier.

For example, to build the project for production:

```bash
npm run build
```

## Key Features

1. **Authentication**:
   - Secure login and registration pages using Pinia for state management and middleware for route guards.

2. **Dashboard Layout**:
   - A responsive dashboard layout with a sidebar navigation for easy access to different sections.

3. **Article Management**:
   - A structured system for creating, editing, and viewing articles, with form components (`FormArticle.vue`) to handle input and validation.

4. **Reusable UI Components**:
   - Dynamic and reusable components like `Alert`, `Modal`, and `Dropdown`, ensuring a cohesive and interactive user experience.

5. **Utilities**:
   - Custom utility functions for tasks like date formatting and text shortening, enhancing readability and maintainability.

## License

This project was created for the Arvan Cloud technical challenge and is for demonstration purposes only.
