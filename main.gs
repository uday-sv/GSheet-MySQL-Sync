
// This function creates a custom menu in our Google Sheet
function createDatabaseMenu() {
  SpreadsheetApp.getUi()
    .createMenu('Database')
    .addItem('Update Current Sheet', 'updateCurrentSheetInDatabase')
    .addItem('Update All Sheets', 'updateAllSheetsInDatabase')
    .addItem('Sync MySQL to Sheet', 'syncMySQLToSheets')
    .addItem('Setup Sync Trigger', 'setupSyncTrigger')
    .addToUi();
}

// This function runs automatically when the spreadsheet is opened
// It calls createDatabaseMenu to set up our custom menu
function onOpen(e) {
  createDatabaseMenu();
}

// This function updates the currently active sheet in the database
// It shows an alert when it's done or if there's an error
function updateCurrentSheetInDatabase() {
  try {
    var currentSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    updateSheetInDatabase(currentSheet.getName());
    SpreadsheetApp.getUi().alert('Great! Current sheet updated in the database.');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Oops! Something went wrong: ' + e.message);
  }
}

// This function updates all sheets in the spreadsheet
// It shows an alert when it's done or if there's an error
function updateAllSheetsInDatabase() {
  try {
    updateAllSheetsInDatabase();
    SpreadsheetApp.getUi().alert('Awesome! All sheets updated in the database.');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Oops! Something went wrong: ' + e.message);
  }
}

// This function runs automatically when someone edits the spreadsheet
// It updates the database with the changes
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  try {
    updateSheetInDatabase(sheet.getName());
  } catch (e) {
    console.error('Uh-oh! Error updating database after edit: ' + e.message);
  }
}
