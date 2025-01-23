# SAMADI: Website Analytics and Query Rank Tracker

## Overview
SAMADI is a website analytics platform that allows users to:
- Create accounts and log in.
- Add, edit, and delete website information (name and domain).
- Modify personal account information (name, email, password, and profile photo).
- Add search queries for specific websites.
- Track the Google rank of these queries using a Selenium-powered robot.
- Visualize query frequencies via bar charts.
- View minimum, maximum, and average query ranks for a website.
- Analyze rank trends over time with line charts.
- Sort and filter results for better insights.

---

## Project Structure
```
SAMADI
├── frontend
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   ├── state management
│   │   ├── styles
│   │   ├── app.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── backend
│   ├── model
│   ├── controller
│   ├── routes
│   ├── dev-data
│   ├── public
│   ├── uploads
│   ├── utils
│   ├── app.js
│   ├── server.js
│   └── package.json
├── selenium
└── README.md
```

---

## Frontend
### Technologies
- **React.js** for building the user interface.
- **Material-UI** for component styling.

### Features
- User authentication.
- Dashboard for managing websites, queries, and personal profile.
- Data visualization using charts.
- State management for efficient app performance.

### Scripts
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

---

## Backend

## API Documentation
You can see api documentation [here](https://documenter.getpostman.com/view/33310678/2sAYQcFqVR)
### Technologies
- **Node.js** with **Express.js** for server-side development.
- **MongoDB** for database management.

### Features
- RESTful APIs for managing users, websites, and queries.
- JWT-based authentication and authorization.
- File handling for profile photos.
- Integration with the Selenium robot for query rank tracking.

### Scripts
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run start:dev
   ```

---

## Selenium Robot
### Technologies
- **Python** with **Selenium** for web automation.

### Features
- Automatically searches Google for user-defined queries.
- Records the rank of the user's website for each query.
- Sends the rank data to the backend for storage and analysis.

---

## How It Works
1. Users log in and add websites and queries.
2. The backend API receives the queries and triggers the Selenium robot.
3. The robot searches Google for each query and notes the rank of the user's website.
4. The backend stores the rank data and processes statistics (min, max, avg ranks).
5. Users can visualize this data through the frontend dashboard.

---

## Future Improvements
- Add support for additional search engines.
- Enhance filtering and sorting options.
- Implement real-time notifications for rank changes.

