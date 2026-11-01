/** HP Gas हिसाब मैनेजर — Google Sheets backup endpoint.
 * इसे उसी Google Sheet के Extensions > Apps Script में पेस्ट करें.
 * सुरक्षा के लिए APP_TOKEN को निजी रखें और ऐप की सेटिंग में वही कोड डालें.
 */
const APP_TOKEN = "YAHAN_APNA_PRIVATE_TOKEN_LIKHEN";

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (payload.action !== "save" || !payload.data) throw new Error("Invalid payload");
    if (payload.token !== APP_TOKEN) throw new Error("Unauthorized: security code mismatch");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const d = payload.data;
    ["stock", "market", "staff"].forEach(function(k) { if (!Array.isArray(d[k])) throw new Error("Invalid data: " + k); });
    writeRows_(ss, "Stock", [["Date","Cylinder Type","Opening Filled","Plant Filled In","Filled Issued","Closing Filled","Opening Empty","Empty Returned","Empty Sent","Closing Empty","Note"]].concat(d.stock.map(function(x){return [x.date,x.type,x.openFilled,x.plantFilled,x.filledIssued,x.closingFilled,x.openEmpty,x.emptyReturned,x.emptySent,x.closingEmpty,x.note||""];})));
    writeRows_(ss, "Market", [["Date","Party","Phone","Cylinder Type","Opening Empty Due","Filled Given","Empty Returned","Filled Returned","Closing Empty Due","Money Due (INR)"]].concat(d.market.map(function(x){return [x.date,x.name,x.phone,x.type,x.opening,x.given,x.emptyBack,x.filledBack,x.closingDue,x.moneyDue];})));
    writeRows_(ss, "Staff", [["Date","Delivery Person","Cylinder Type","Opening Due","Given","Returned","Closing Due","Cash Deposited (INR)"]].concat(d.staff.map(function(x){return [x.date,x.name,x.type,x.opening,x.given,x.returned,x.closingDue,x.cash];})));
    const cashbook = Array.isArray(d.cashbook) ? d.cashbook : [];
    writeRows_(ss, "Cashbook", [["Date","Type","Description","Amount (INR)","Note"]].concat(cashbook.map(function(x){return [x.date,x.kind,x.title,x.amount,x.note||""];})));
    const meta = ss.getSheetByName("Backup Info") || ss.insertSheet("Backup Info");
    meta.clearContents();
    meta.getRange(1,1,5,2).setValues([["Last backup received",new Date()],["Stock rows",d.stock.length],["Market rows",d.market.length],["Staff rows",d.staff.length],["Backup source","HP Gas Hisab Manager Android PWA"]]);
    return ContentService.createTextOutput(JSON.stringify({ok:true,backupAt:new Date().toISOString()})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    try { lock.releaseLock(); } catch(ignore) {}
  }
}

function writeRows_(ss, name, rows) {
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clearContents();
  sh.getRange(1,1,rows.length,rows[0].length).setValues(rows);
  sh.setFrozenRows(1);
  sh.getRange(1,1,1,rows[0].length).setFontWeight("bold").setBackground("#d9eaf7");
  sh.autoResizeColumns(1,rows[0].length);
}
