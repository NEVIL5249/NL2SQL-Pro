# NL2SQL-Pro

A powerful full-stack web application that translates natural language queries into optimized SQL statements using the locally run **Llama 3** Large Language Model via **Ollama**. It's designed for privacy-focused data interaction, allowing users to query databases without sending sensitive information to external APIs.

## 🚀 Features

-   **Natural Language to SQL Conversion:** Transform plain English questions into accurate SQL queries.
-   **Local LLM Integration:** Utilizes Ollama to run Llama 3 locally, ensuring data privacy and reducing API costs.
-   **Schema Context Awareness:** Accepts database schema input for more precise and contextually relevant SQL generation.
-   **Multiple SQL Dialects:** Supports PostgreSQL, MySQL, SQLite, and SQL Server.
-   **Clean & Modern UI:** A minimalist and intuitive user interface built with React.
-   **Real-time Feedback:** Provides instant toast notifications for actions and errors.

## 🛠️ Technologies Used

### Frontend (Client)
-   **React.js:** For building the interactive user interface.
-   **HTML/CSS/JavaScript:** Standard web technologies.

### Backend (Server)
-   **Node.js:** JavaScript runtime for the server.
-   **Express.js:** Web framework for building the API.
-   **Ollama:** Framework for running large language models locally.
-   **Llama 3:** The powerful LLM used for natural language processing and SQL generation.

## 📦 Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/NEVIL5249/NL2SQL-Pro.git](https://github.com/NEVIL5249/NL2SQL-Pro.git)
    cd NL2SQL-Pro
    ```

2.  **Install Ollama and pull Llama 3:**
    * Download and install Ollama from [ollama.com](https://ollama.com/).
    * Once installed, open your terminal and pull the Llama 3 model:
        ```bash
        ollama pull llama3
        ```
    * Ensure the Ollama server is running (it usually starts automatically after installation).

3.  **Install client dependencies:**
    Navigate into the `client` directory and install its dependencies.
    ```bash
    cd client
    npm install
    cd .. # Go back to the root directory
    ```

4.  **Install server dependencies:**
    Navigate into the `server` directory and install its dependencies.
    ```bash
    cd server
    npm install
    cd .. # Go back to the root directory
    ```

5.  **Start the server:**
    From the `server` directory, start the backend server.
    ```bash
    cd server
    node index.js
    ```
    The server will typically run on `http://localhost:5000`.

6.  **Start the client:**
    Open a **new terminal window**, navigate to the `client` directory, and start the React development server.
    ```bash
    cd client
    npm start
    ```
    The client will typically open in your browser at `http://localhost:3000`.

## 📁 Project Structure
```
NL2SQL-PRO/
├── .gitignore               # Specifies files and directories to be ignored by Git
├── client/                  # The React frontend application
│   ├── public/              # Static assets for the React app
│   ├── src/                 # The source code for the React app
│   │   ├── App.css
│   │   ├── App.js           # Main React component
│   │   ├── index.css
│   │   └── index.js         # Entry point for the React app
│   │   └── ...
│   ├── package.json         # Dependencies and scripts for the React app
│   └── package-lock.json    # Lock file for client dependencies
│
└── server/                  # The Node.js backend
├── index.js             # The main server file (Express application)
├── package.json         # Dependencies and scripts for the server
└── package-lock.json    # Lock file for server dependencies
```

## 💡 Usage

1.  **Launch the Application:** Follow the installation steps to start both the server and the client.
2.  **Provide Schema (Optional):** In the "Database Schema" textarea, you can paste your database table definitions (e.g., `CREATE TABLE` statements) to give the Llama 3 model more context for generating accurate SQL.
3.  **Enter Natural Language Query:** In the "Natural Language Query" textarea, type your question in plain English (e.g., "Find all users older than 25 from the 'users' table").
4.  **Convert to SQL:** Click the "Convert to SQL" button. The application will send your query to the local server, which will use Llama 3 to generate the corresponding SQL.
5.  **View and Copy SQL:** The generated SQL query will appear in the "Generated SQL" section. You can then easily copy it to your clipboard.
