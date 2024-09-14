# Project Management App (MERN/GraphQL)

This application is designed to manage clients and projects efficiently. It provides functionality for adding clients, assigning projects to clients, tracking deadlines, and managing the lifecycle of projects.

## Features

- **Client Management**: Add clients and store essential contact details.
- **Project Assignment**: Create and assign projects to specific clients.
- **Project Management**: Easily add, remove, and update projects assigned to clients.
- **Project Status Tracking**: Track the current status of a project — whether it's not started, in progress, or completed.
- **Deadline Management**: Set and monitor project deadlines. Alerts are triggered when a project's deadline has passed.
- **GraphQL Integration**: Utilize GraphQL and Apollo Client for efficient data queries and mutations.

## Tech Stack

- **Frontend**: ReactJS, Bootstrap, React-router-dom
- **Backend**: Express, MongoDB, GraphQL, Apollo Server

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/developer-kamran/project-management-app.git

2. Navigate to the project directory:

   ```bash
   cd project-management-app

3. Install the dependencies:

   ```bash
   npm install

4. Create a .env file in the root directory and add the following environment variables:

   ```bash
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mogodb_uri

5. Run the development server:

   ```bash
   npm run dev
   
## Configuration

- **Database**: Set up your MongoDB connection using `MONGO_URI` in the `.env` file.
- **GraphQL Endpoint**: The GraphQL API is served at `/graphql` by default.

## Usage

- **Add Clients**: Navigate to the Clients section and input client details such as name and contact information.
- **Create Projects**: Assign projects to specific clients, define a deadline, and set the initial status (Not Started, In Progress, Completed).
- **Update Projects**: Modify the project details, client assignment, or status as the work progresses.
- **Track Deadlines**: View a list of projects, their assigned clients, and their deadlines. Get notified if a project is overdue.
- **Status Tracking**: Monitor the project status to see whether it's in progress, completed, or yet to start.
- **Complete Projects**: Once a project is finished, mark it as "Completed" in the dashboard.

## Contributing

Feel free to fork the repository and submit pull requests. Please ensure your contributions adhere to the project's coding standards and guidelines.

## Contact

For any inquiries or issues, please reach out to [developer.kamraniqbal@gmail.com](mailto:developer.kamraniqbal@gmail.com).
