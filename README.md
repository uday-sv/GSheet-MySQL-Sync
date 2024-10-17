# Real-Time Synchronization of Google Sheets with MySQL: Automating Bi-Directional Data Sync and CRUD Operations

### Objective
This project enables real-time synchronization between Google Sheets and a MySQL database, ensuring data consistency and automatic updates across both platforms. The solution detects changes in either Google Sheets or the database and synchronizes the data accordingly.

### Features

- **Real-Time Synchronization**: Changes made in Google Sheets are automatically reflected in the MySQL database, and vice versa. The system efficiently handles data synchronization to ensure both platforms stay up-to-date.
  
- **Bi-Directional CRUD Operations**: Create, Read, Update, and Delete operations are supported for both Google Sheets and the MySQL database. The project ensures data integrity and smooth interaction between the two systems.

### Approach

- A MySQL database is hosted on a remote server and serves as the back-end storage system for the project.
- Google Sheets acts as the user-friendly interface for data input and modification.
- Each Google Sheet corresponds to a specific table in the MySQL database.
  
### Code Structure

1. **main.gs**: Handles the creation of a custom menu in Google Sheets for synchronization.
2. **sheet_management.gs**: Manages operations related to Google Sheets, such as retrieving sheet names and updating sheet data.
3. **connection_details.gs**: Stores the connection details for the MySQL database, ensuring secure and seamless access.
4. **database_operations.gs**: Facilitates database connections and performs operations such as creating and updating tables and records in the MySQL database.
5. **mysql_to_sheets_sync.gs**: Synchronizes data from the MySQL database to Google Sheets, ensuring that any changes in the database are reflected in the corresponding Google Sheets.

### Triggers Setup

- **On-Edit Trigger**: Automatically updates the MySQL database whenever changes are made in Google Sheets.
- **Time-Based Trigger**: A scheduled trigger that periodically syncs the data from the MySQL database to Google Sheets, keeping the systems updated in near real-time.

Additionally, a **"Sync MySQL to Sheet"** button in the Google Sheets menu allows for manual synchronization, giving users the flexibility to update data whenever necessary.

### Links

- **MySQL database:** You can set up a sample MySQL database at [freesqldatabase.com](https://www.freesqldatabase.com/).
- **Google Sheet**: [Access the Google Sheet](https://docs.google.com/spreadsheets/d/1x6SNhGklJTKyBbDqd35_hmht2sN5_fYa19hwSLg7v8w/edit?usp=sharing)
  
### Reference 
- **Google Apps Script Reference**: [Reference](https://developers.google.com/apps-script/reference/spreadsheet)
