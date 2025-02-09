<h1 align="center">Product Store</h1>

<p align="center">
  A modern e-commerce platform built with cutting-edge technologies for a delightful shopping experience.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PERN-Stack-blueviolet?style=for-the-badge" alt="PERN Stack Badge">
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-blue.svg?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS Badge">
  <img src="https://img.shields.io/badge/DaisyUI-Latest-success?style=for-the-badge" alt="DaisyUI Badge">
</p>

## Highlights ✨

- **🌟 Tech Stack:** PERN (PostgreSQL, Express.js, React, Node.js) + TailwindCSS + DaisyUI for a robust and beautiful user interface.
- **🚀 Enhanced Security:** Rate Limiting & Bot Detection to ensure fair usage and protect against malicious activity.
- **👌 State Management:** Global state management with Zustand for predictable and efficient data handling.
- **🐞 Robust Error Handling:** Comprehensive error handling implemented on both the server and client sides for a smooth user experience.
- **⭐ Free Deployment:** Deploy your own instance of Product Store without breaking the bank!
- **⏳ And much more!** Explore the codebase to discover features like authentication, product filtering, and shopping cart functionality.

## Getting Started 🏁

Follow these steps to get your own instance of Product Store up and running.

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (Neon DB used here)
- npm, bun or yarn

### Setup

1.  **Clone the repository:**

    ```
    git clone https://github.com/aditya-narayan-sahoo/product-store.git
    cd product-store
    ```

2.  **Install dependencies:**

    ```
    npm install
    ```

3.  **Configure Environment Variables:**

    - Create a `.env` file in the root directory based on the `.env.example`
    - Fill in the necessary values:

      ```
      PORT=3000

      PGUSER=your_db_user
      PGPASSWORD=your_db_password
      PGHOST=your_db_host
      PGDATABASE=product_store_db
      ARCJET_KEY=your_arcjet_key
      ARCJET_ENV=development
      ```

      **Note:** Make sure your PostgreSQL server is running and the database exists.

### Running the Application

1.  **Start the API (Backend):**

    ```
    npm run dev
    ```

    This will start the backend server, typically on port 3000 (or the port you specified in your `.env` file).

2.  **Start the Frontend:**

    ```
    cd frontend
    npm install # install frontend dependencies
    npm run dev
    ```

    This will start the React development server for the frontend. The frontend will typically be accessible at `http://localhost:3000` (or a similar address).

3.  **Whole Application:**
    If you want to run the whole app at once then just do the following:
    ```
    npm run build && npm run start
    ```

Refer to the documentation of your chosen platform for specific deployment instructions. Make sure to configure the environment variables correctly in your deployment environment.

## Contributing 🤝

We welcome contributions! If you'd like to contribute to the project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive messages.
4.  Submit a pull request.

## Acknowledgements 🙏

- Thanks to the open-source community for the amazing tools and libraries used in this project.
- You can watch the tutorial here [YouTube Video](https://youtu.be/lx3YJj0nJVk?si=vq6h1V6e4upqX8Ku)
