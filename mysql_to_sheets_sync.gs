
// This function fetches data from MySQL and updates matching Google Sheets
function syncMySQLToSheets() {
  var conn = getDBConnection();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  try {
    // Get all table names from the database
    var tableNames = getTableNames(conn);

    // Iterate through each sheet
    sheets.forEach(function(sheet) {
      var sheetName = sheet.getName();

      // Check if there's a matching table in the database
      if (tableNames.indexOf(sheetName) !== -1) {
        syncTableToSheet(conn, sheetName, sheet);
      } else {
        Logger.log('No matching table found for sheet: ' + sheetName);
      }
    });

    Logger.log('Sync process completed');
  } catch (err) {
    Logger.log('Error in syncMySQLToSheets: ' + err.message);
  } finally {
    conn.close();
  }
}

// Helper function to get all table names from the database
function getTableNames(conn) {
  var stmt = conn.createStatement();
  var results = stmt.executeQuery('SHOW TABLES');
  var tables = [];

  while (results.next()) {
    tables.push(results.getString(1));
  }

  results.close();
  stmt.close();

  return tables;
}

// Helper function to sync a single table to a sheet
function syncTableToSheet(conn, tableName, sheet) {
  var stmt = conn.createStatement();

  try {
    var results = stmt.executeQuery('SELECT * FROM ' + tableName);
    var metaData = results.getMetaData();
    var numCols = metaData.getColumnCount();

    // Clear existing data in the sheet
    sheet.clear();

    // Write headers, excluding the 'id' column
    var headers = [];
    for (var i = 1; i <= numCols; i++) {
      var columnName = metaData.getColumnName(i);
      if (columnName.toLowerCase() !== 'id') {
        headers.push(columnName);
      }
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Write data, excluding the 'id' column
    var data = [];
    while (results.next()) {
      var row = [];
      for (var i = 1; i <= numCols; i++) {
        var columnName = metaData.getColumnName(i);
        if (columnName.toLowerCase() !== 'id') {
          row.push(results.getString(i));
        }
      }
      data.push(row);
    }
    if (data.length > 0) {
      sheet.getRange(2, 1, data.length, headers.length).setValues(data);
    }

    Logger.log('Synced table ' + tableName + ' to sheet successfully');
  } catch (err) {
    Logger.log('Error syncing table ' + tableName + ': ' + err.message);
  } finally {
    results.close();
    stmt.close();
  }
}

// This function sets up a time-based trigger to run the sync periodically
function setupSyncTrigger() {
  // Delete existing triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  // Create a new trigger to run every hour
  ScriptApp.newTrigger('syncMySQLToSheets')
    .timeBased()
    .everyHours(1)
    .create();

  Logger.log('Sync trigger set up successfully');
}
