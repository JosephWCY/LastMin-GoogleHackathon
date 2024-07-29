function sendCampaignNotification() {
  // Get the active spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Campaign');
  
  // Get the data range and values
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  // Find the actual last non-empty row
  var lastRow = data.length;
  for (var i = data.length - 1; i >= 0; i--) {
    var isEmpty = data[i].every(function(cell) {
      return cell === "";
    });
    if (!isEmpty) {
      lastRow = i + 1;
      break;
    }
  }

  Logger.log('Actual last row: ' + lastRow);
  
  // Get the last row data
  var lastRowData = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
  Logger.log('Last row data: ' + lastRowData);

  // Extract campaign data
  var cid = lastRowData[0];
  var name = lastRowData[1];
  var description = lastRowData[2];
  var leadName = lastRowData[3];
  var progress = lastRowData[4];
  var targetStartDate = lastRowData[5];
  var targetEndDate = lastRowData[6];
  var actualStartDate = lastRowData[7];
  var actualEndDate = lastRowData[8];
  var status = lastRowData[9];

  Logger.log('CID: ' + cid);
  Logger.log('Name: ' + name);
  Logger.log('Description: ' + description);
  Logger.log('Lead Name: ' + leadName);
  Logger.log('Progress: ' + progress);
  Logger.log('Target Start Date: ' + targetStartDate);
  Logger.log('Target End Date: ' + targetEndDate);
  Logger.log('Actual Start Date: ' + actualStartDate);
  Logger.log('Actual End Date: ' + actualEndDate);
  Logger.log('Status: ' + status);
  
  // Check if essential data is present before sending an email
  if (name && cid) {
    var email = "gingerchatbot@gmail.com"; 
    
    var subject = 'New Campaign Created: ' + name;
    var body = 'Dear Team,\n\nA new campaign has been created with the following details:\n\n'
             + 'Campaign ID: ' + cid + '\n'
             + 'Name: ' + name + '\n'
             + 'Description: ' + description + '\n'
             + 'Lead Name: ' + leadName + '\n'
             + 'Progress: ' + progress + '\n'
             + 'Target Start Date: ' + targetStartDate + '\n'
             + 'Target End Date: ' + targetEndDate + '\n'
             + 'Actual Start Date: ' + actualStartDate + '\n'
             + 'Actual End Date: ' + actualEndDate + '\n'
             + 'Status: ' + status + '\n\n'
             + 'Best Regards,\n'
             + 'Marketing Team';

    // Send email
    MailApp.sendEmail(email, subject, body);
  } else {
    Logger.log('No valid data found to send email.');
  }
}
