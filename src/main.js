function main() {

  const config = getNotionConfig();
  
  const fitbitManager = new FitbitManager();
  const notionManager = Notion.initManager(config.token);
  
  fitbitManager.getSleepList().forEach(sleep => {
    sleep.createNotionRecord(notionManager, config.db.sleep);
  });

  fitbitManager.getTodayWeightList().forEach(weight => {
    weight.createNotionRecord(notionManager, config.db.weight);
  });

  fitbitManager.getActivityList().forEach(activity => {
    activity.createNotionRecord(notionManager, config.db.activity);
  });

  const heartRate = fitbitManager.getHeartRate();
  heartRate.createNotionRecord(notionManager, config.db.heartRate);
}

function refreshToken(){
  const fitbitManager = new FitbitManager();
  fitbitManager.updateToken();
}
