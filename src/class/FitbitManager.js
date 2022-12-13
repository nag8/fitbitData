class FitbitManager{
  constructor(){
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET.config.name);
    this.id = sheet.getRange(SHEET.config.cell.fitbit.id).getValue();
    this.accessToken = sheet.getRange(SHEET.config.cell.fitbit.accessToken).getValue();
    this.refreshToken = sheet.getRange(SHEET.config.cell.fitbit.refreshToken).getValue();
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
    Logger.log(json);
    this.accessToken = json.access_token;
    this.refreshToken = json.refresh_token;

    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET.config.name);
    sheet.getRange(SHEET.config.cell.fitbit.accessToken).setValue(this.accessToken);
    sheet.getRange(SHEET.config.cell.fitbit.refreshToken).setValue(this.refreshToken);
  }

  getFetchOption(type){
    return {
      method: type,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    }
  }

  getTodayWeightList(){   
    const res = UrlFetchApp.fetch(`https://api.fitbit.com/1/user/${this.id}/body/log/weight/date/today.json`, this.getFetchOption('get'));
    const json = JSON.parse(res);
    return json.weight.map(json => new Weight(json));
  }

  getSleepList(){
    const res = UrlFetchApp.fetch(`https://api.fitbit.com/1.2/user/${this.id}/sleep/date/today.json`, this.getFetchOption('get'));
    return JSON.parse(res).sleep.map(json => new Sleep(json));
  }

  getActivityList(){
    const res = UrlFetchApp.fetch(`https://api.fitbit.com/1/user/${this.id}/activities/date/today.json`, this.getFetchOption('get'));
    return JSON.parse(res).activities.map(json => new Activity(json));
  }

  getHeartRate(){
    const res = UrlFetchApp.fetch(`https://api.fitbit.com/1/user/${this.id}/activities/heart/date/today/1d.json`, this.getFetchOption('get'));
    return new HeartRate(JSON.parse(res));
  }
}