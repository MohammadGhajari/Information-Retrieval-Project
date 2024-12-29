# Frontend for Website Rank Analysis Dashboard

This is the frontend for a website rank analysis tool, where users can monitor and analyze their website rankings based on specific keywords over time. The frontend is built using React with Material-UI for styling, and it integrates various libraries for state management, routing, charts, and notifications.

## Features

- **User Management**: Users can create accounts, log in, update their username, email, password, and profile picture.
- **Website Management**: Add, edit, or delete website domains and names.
- **Keyword Analysis**: Add keywords for websites and track their ranking over time using Selenium in the backend.
- **Dashboard Visualization**:
  - **Bar Chart**: Displays the frequency of keywords searched by the robot.
  - **Line Chart**: Shows keyword rankings for websites over time (x-axis: time, y-axis: rank).
  - **Table**: Presents data with columns for keyword, website, minimum rank, maximum rank, average rank, and check count. Includes sorting and filtering functionality.
- **Interactive Filters**: Filter data in charts and tables.

## Project Structure

```plaintext
information-retrieval-project/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   ├── layout/
│   │   ├── login-signup/
│   │   └── svgs/
│   ├── pages/
│   ├── state-management/
│   ├── styles/
│   └── services/
├── package.json
```

### Key Folders

- **components**: Contains reusable components, including charts, layout elements, login/signup forms, and SVG illustrations.
- **pages**: Includes the main pages for the website.
- **state-management**: Redux store setup and slices for managing application state.
- **styles**: CSS and styling files for the application.
- **services**: API calls and utility functions.

## Libraries and Tools

- **React**: Frontend framework.
- **Material-UI**: For UI components and styling.
- **Redux**: For state management.
- **React Router**: For navigation and routing.
- **Recharts**: For rendering bar and line charts.
- **React Toastify**: For notifications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repository.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd information-retrieval-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Future Enhancements

- Add more visualization options.
- Implement advanced filtering features.
- Optimize performance for large datasets.

Feel free to contribute to this project by submitting issues or pull requests!
