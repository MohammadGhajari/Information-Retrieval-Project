# Google Rank Checker Robot

## Overview

This Python script utilizes Selenium to automate the process of checking the ranking of specified domains for given search queries on Google. It retrieves a list of queries from a specified API endpoint, performs searches on Google, and records the rank of each domain for its corresponding query. The results are then sent back to the API for storage.

## Features

- Automates Google search queries using Selenium.
- Retrieves search queries from a REST API.
- Checks the rank of specified domains in the search results.
- Collects recommended queries from Google.
- Updates the database with the rank and suggested queries.

## Requirements

- Python 3.x
- Selenium
- Requests
- Chrome WebDriver
- pytz

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install the required packages:**

   ```bash
   pip install selenium requests pytz
   ```

3. **Download Chrome WebDriver:**

   Ensure you have the Chrome WebDriver that matches your installed version of Chrome. Place the `chromedriver.exe` in the same directory as your script or specify the path in the script.

## Usage

1. **Set up the API endpoint:**

   Modify the `url` variable in the script to point to your API endpoint that provides the list of queries.

   ```python
   url = "http://127.0.0.11:8000/api/queries"
   ```

2. **Run the script:**

   Execute the script using Python:

   ```bash
   python rank_checker.py
   ```

   Replace `rank_checker.py` with the name of your script file.

## Code Explanation

- **Imports:**

  - The script imports necessary libraries for web automation, HTTP requests, and date/time handling.

- **get_link_rank function:**

  - This function takes a search query and a domain, performs a Google search, and returns the rank of the domain along with recommended queries.

- **Main Execution:**
  - The script fetches a list of queries from the specified API, checks the rank for each domain, and updates the API with the results.

## Notes

- Ensure that you comply with Google's terms of service when using automated scripts to scrape search results.
- The script includes a delay (`time.sleep(2)`) to avoid overwhelming the Google servers. Adjust this as necessary.
- If the rank is `0`, the script will skip updating the database for that query.

## Troubleshooting

- If you encounter issues with the WebDriver, ensure that it is compatible with your version of Chrome.
- Check the API endpoint for any connectivity issues or errors in the response.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
