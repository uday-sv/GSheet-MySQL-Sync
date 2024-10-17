
// This function sets up a connection to our database
function getDBConnection() {
  var details = getConnectionDetails();
  var connectionString = 'jdbc:mysql://' + details.host + ':' + details.port + '/' + details.database + '?useSSL=false';
  
  return Jdbc.getConnection(connectionString, details.username, details.password);
}

// This function creates a new table or updates an existing one in our database
// It matches the table structure to our sheet's columns
function createOrUpdateTable(sheetName, headers) {
  var conn = getDBConnection();
  var stmt = conn.createStatement();
  
  // First, we remove the old table if it exists
  stmt.executeUpdate("DROP TABLE IF EXISTS `" + sheetName + "`");
  
  // Then we create a new table with columns matching our sheet
  var createTableQuery = "CREATE TABLE `" + sheetName + "` (id INT AUTO_INCREMENT PRIMARY KEY, " + 
    headers.map(header => "`" + header + "` VARCHAR(255)").join(", ") + 
    ")";
  
  stmt.executeUpdate(createTableQuery);
  
  stmt.close();
  conn.close();
}

// This function updates the database with data from our sheet
function updateDatabase(sheetName, data) {
  var headers = data[0];
  var conn = getDBConnection();
  
  // First, we make sure our table matches our sheet
  createOrUpdateTable(sheetName, headers);
  
  // Then we insert all our data into the table
  var insertQuery = "INSERT INTO `" + sheetName + "` (" + headers.map(h => "`" + h + "`").join(", ") + ") VALUES (" + 
    headers.map(() => "?").join(", ") + ")";
  var prepStmt = conn.prepareStatement(insertQuery);
  
  for (var i = 1; i < data.length; i++) { // We skip the header row
    for (var j = 0; j < headers.length; j++) {
      prepStmt.setString(j + 1, data[i][j]);
    }
    prepStmt.addBatch();
  }
  
  prepStmt.executeBatch();
  
  prepStmt.close();
  conn.close();
}
