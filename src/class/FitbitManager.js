class FitbitManager{
  constructor(){
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET.config.name);
    this.id = sheet.getRange(SHEET.config.cell.id).getValue();
    this.accessToken = sheet.getRange(SHEET.config.cell.accessToken).getValue();
    this.refreshToken = sheet.getRange(SHEET.config.cell.refreshToken).getValue();
  }

  getTodayWeightList(){
    const option = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
    
    const res = UrlFetchApp.fetch(`https://api.fitbit.com/1/user/${this.id}/body/log/weight/date/today.json`, option);
    const json = JSON.parse(res);
    return json.weight.map(json => new Weight(json));
  }

  updateToken(){
    const option = {
      method: 'post',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
    
    const res = UrlFetchApp.fetch(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&expires_in=90000&refresh_token=${this.refreshToken}`, option);
    const json = JSON.parse(res);
    this.accessToken = json.access_token;
    this.refreshToken = json.refresh_token;

    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET.config.name);
    sheet.getRange(SHEET.config.cell.accessToken).setValue(this.accessToken);
    sheet.getRange(SHEET.config.cell.refreshToken).setValue(this.refreshToken);
  }
}