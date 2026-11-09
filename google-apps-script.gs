/**
 * Google Apps Script: saves RSVPs and wishes from the anniversary site into a Google Sheet.
 *
 * Setup (about 5 minutes):
 * 1. Create a new Google Sheet.
 * 2. Extensions → Apps Script. Delete the sample code and paste this whole file.
 * 3. Click Deploy → New deployment → type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Authorise it, then copy the Web app URL.
 * 5. Paste that URL into config.js → rsvpEndpoint.
 *
 * Two tabs, "RSVP" and "Wishes", are created automatically on the first submission.
 */

const HEADERS = {
  RSVP: ["Submitted at", "Name", "Department", "Attending", "Message"],
  Wishes: ["Submitted at", "Name", "Wish"]
};

function doPost(e) {
  const p = (e && e.parameter) || {};
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (p.type === "wish") {
      sheet_("Wishes").appendRow([p.submittedAt || new Date(), p.name, p.text]);
    } else {
      sheet_("RSVP").appendRow([p.submittedAt || new Date(), p.name, p.department, p.attending, p.message]);
    }
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS[name]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS[name].length).setFontWeight("bold");
  }
  return sh;
}
