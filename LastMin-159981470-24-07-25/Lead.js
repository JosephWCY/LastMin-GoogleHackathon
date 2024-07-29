function checkOrCreateSheet() {
  var folderId = '1BIvaar9xggXcqM1R_PPJSqWeF_2HLK6B'; 
  var fileName = 'LeadExample'; 
  var sheetNames = ['CampaignData', 'LeadData', 'TaskData', 'ContentData']; // Array of sheet names

    // Get the folder by ID
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFilesByName(fileName);

  if (files.hasNext()) {
    var file = files.next();
    var spreadsheet = SpreadsheetApp.open(file);
    
    // Check and create sheets if they don't exist
    sheetNames.forEach(function(sheetName) {
      var sheet = spreadsheet.getSheetByName(sheetName);
      if (sheet) {
        Logger.log('The sheet "' + sheetName + '" already exists in the Google Sheet file "' + fileName + '".');
      } else {
        Logger.log('The sheet "' + sheetName + '" does not exist. Creating new sheet in the Google Sheet file "' + fileName + '".');
        var newSheet = spreadsheet.insertSheet(sheetName);
        addExampleData(newSheet, sheetName);
      }
    });

  } else {
    Logger.log('The Google Sheet file "' + fileName + '" does not exist. Creating new file and sheets.');

    // Create a new Google Sheet file
    var newSpreadsheet = SpreadsheetApp.create(fileName);
    var newFile = DriveApp.getFileById(newSpreadsheet.getId());


    var sheet = newSpreadsheet.getActiveSheet();

    // Move the new sheet file to the desired folder
    folder.addFile(newFile);
    DriveApp.getRootFolder().removeFile(newFile);
  }
}

// Adds example data based on the sheet name
function addExampleData(sheet, sheetName) {
  switch (sheetName) {
    case 'CampaignData':
      addCampaignExampleData(sheet);
      break;
    case 'LeadData':
      addLeadExampleData(sheet);
      break;
    case 'TaskData':
      addTaskExampleData(sheet);
      break;
    case 'ContentData':
      addContentExampleData(sheet);
      break;
    default:
      Logger.log('No example data available for sheet: ' + sheetName);
  }
}

function addCampaignExampleData(sheet) {
  sheet.appendRow(['CID', 'Name', 'Description', 'Lead Name', 'Progress', 'Target Start Dates',	'Target End Date',	'Actual Start Date',	'Actual End Date',	'Status']);
  sheet.appendRow(['C-1',	'TestSample2',	'HelloDescription',	'John Doe',	'20%',	'07/10/2022',	'1/9/23',	'13/04/2023',	'8/6/23',	'Scheduled']);
  sheet.appendRow(['C-2',	'Sample2',	'Desp2',	'Jane Smith',	'30%',	'05/07/2024',	'09/07/2024',	'05/07/2024',	'30/07/2024',	'Planned']);
  sheet.appendRow(['C-3',	'Sample3',	'Desp3',	'Mark Brown',	'50%',	'8/31/23',	'12/30/23',	'2/24/24',	'6/10/24',	'Active']);
}

function addLeadExampleData(sheet) {
  sheet.appendRow(['Lead Name', 'Email', 'Phone', 'Company', 'Job Title', 'Status',	'Assigned To',	'Date Added',	'Last Contacted',	'Notes',	'Lead Score']);
  sheet.appendRow(['John Doe', 'john@example.com', '123-456-7890',	'Example Corp',	'Marketing Manager',	'New',	'Marketing Team',	'2024-07-01',	'2024-07-15',	'Interested in product demo',	85]);
  sheet.appendRow(['Jane Smith',	'jane@example.com',	'234-567-8901',	'Tech Innovations',	'CTO',	'Contacted',	'Design Team',	'2024-07-02',	'2024-07-20',	'Requested pricing information',	70]);
  sheet.appendRow(['Mark Brown',	'mark@example.com',	'345-678-9012',	'Innovative Inc',	'CEO',	'Qualified',	'Sales Team',	'2024-07-03',	'2024-07-18',	'Discussed partnership potential',	90]);
}

function addTaskExampleData(sheet) {
  sheet.appendRow(['Task Name', 'Description', 'Progress', 'Assigned by', 'CID']);
  sheet.appendRow(['Campaign Setup', 'Set up initial campaign settings', 'In Progress',	'John Doe', 'C-1']);
  sheet.appendRow(['Design Ad',	'Create visuals for the ad campaign',	'Not Started',	'Jane Smith',	'C-1']);
  sheet.appendRow(['Contact Leads',	'Reach out to new leads for the campaign',	'In Progress',	'Mark Brown',	'C-2']);
  sheet.appendRow(['Review Budget',	'Review and adjust the campaign budget',	'Completed',	'John Doe',	'C-1']);
}

function addContentExampleData(sheet) {
  sheet.appendRow(['Content ID', 'Title', 'Type', 'Category', 'Tags', 'Description', 'Campaign Name']);
  sheet.appendRow(['CO-1', 'Summer Sale Ad', 'Image',	'Promotion', 'Summer, Sale', 'Ad for Summer Sale',	'Sample3']);
  sheet.appendRow(['CO-2',	'Back to School Blog',	'Blog Post',	'Education',	'Back to School', 'Blog about school season',	'Joseph']);
}
								
// Handles HTTP GET requests
function doGet(e) {
  return handleDownloadRequest(e);
}

// Main function to handle download requests
function handleDownloadRequest(e) {
  var sheetId = '1u4hkh71QlWJPI9WWi80e7Ury_EpFu8_uVIyqmCSTnvU'; 
  var exportFormat = 'xlsx'; 

  var downloadUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=${exportFormat}`;

  return HtmlService.createHtmlOutput(
    `<html>
       <head>
         <script>
           // Trigger the download
           window.onload = function() {
             window.location.href = "${downloadUrl}";
             // Close the tab after a delay to ensure the download has started
             setTimeout(function() {
               window.close();
             }, 1); 
           };
         </script>
       </head>
       <body>
         <p>Your download will start shortly. If it doesn't, please <a href="${downloadUrl}" target="_blank">click here</a>.</p>
       </body>
     </html>`
  );
}
