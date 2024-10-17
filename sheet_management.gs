// This function gets the names of all sheets in our spreadsheet
function getAllSheetNames() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();
  return sheets.map(sheet => sheet.getName());
}

// This function updates a single sheet in the database
// It does a lot of checks to make sure everything is okay before updating
function updateSheetInDatabase(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Oops! Can\'t find the spreadsheet.');
  }

  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Hmm, can\'t find a sheet named "' + sheetName + '" in this spreadsheet.');
  }

  var dataRange = sheet.getDataRange();
  if (!dataRange) {
    throw new Error('Strange, can\'t get any data from the "' + sheetName + '" sheet.');
  }

  var data = dataRange.getValues();
  
  if (data.length < 2) {
    throw new Error('The "' + sheetName + '" sheet needs at least a header row and one data row.');
  }
  
  console.log('Updating database with data from: ' + sheetName);
  console.log('Found ' + data.length + ' rows of data');
  console.log('Found ' + data[0].length + ' columns of data');

  updateDatabase(sheetName, data);
}

// This function updates all sheets in the database
// If there are any errors, it collects them and reports them all at once
function updateAllSheetsInDatabase() {
  var sheetNames = getAllSheetNames();
  var errors = [];
  
  sheetNames.forEach(function(sheetName) {
    try {
      updateSheetInDatabase(sheetName);
    } catch (e) {
      errors.push(sheetName + ': ' + e.message);
      console.error('Oops! Problem updating "' + sheetName + '": ' + e.message);
    }
  });
  
  if (errors.length > 0) {
    throw new Error('We ran into some issues:\n' + errors.join('\n'));
  }
}
