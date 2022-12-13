const NOTION = {
  apiVersion: '2022-02-22',
  
};

class NotionManager {
  constructor() {
    this.apiVersion = '2022-02-22';


    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET.config.name);
    this.token = sheet.getRange(SHEET.config.cell.notion.token).getValue();
    this.db = {
      weight: sheet.getRange(SHEET.config.cell.notion.db.weight).getValue(),
      sleep: sheet.getRange(SHEET.config.cell.notion.db.sleep).getValue(),
      activity: sheet.getRange(SHEET.config.cell.notion.db.activity).getValue(),
      heartRate: sheet.getRange(SHEET.config.cell.notion.db.heartRate).getValue(),
    };
  }

  send(content) {
    const endPoint = `https://api.notion.com/v1/pages`;
  
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        'Notion-Version': this.apiVersion,
      },
      payload: JSON.stringify(content),
    }
    const res = UrlFetchApp.fetch(endPoint, options);
    return JSON.parse(res.getContentText());
  }
  
  createSleepPage(notionPage) {
    notionPage.setParentId(this.db.sleep);
    this.send(notionPage.getJson());
  }

  createWeightPage(notionPage) {
    notionPage.setParentId(this.db.weight);
    this.send(notionPage.getJson());
  }

  createActivityPage(notionPage) {
    notionPage.setParentId(this.db.activity);
    this.send(notionPage.getJson());
  }

  createHeartRatePage(notionPage) {
    notionPage.setParentId(this.db.heartRate);
    this.send(notionPage.getJson());
  }
}