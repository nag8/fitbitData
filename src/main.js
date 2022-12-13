function main() {
  const fitbitManager = new FitbitManager();
  const notionManager = new NotionManager();
  
  fitbitManager.getSleepList().forEach(sleep => {
    notionManager.createSleepPage(sleep.getNotionPage());
  });

  fitbitManager.getTodayWeightList().forEach(weight => {
    notionManager.createWeightPage(weight.getNotionPage());
  });

  fitbitManager.getActivityList().forEach(activity => {
    notionManager.createActivityPage(activity.getNotionPage());
  });

  const heartRate = fitbitManager.getHeartRate();
  notionManager.createHeartRatePage(heartRate.getNotionPage());
}

function refreshToken(){
  const fitbitManager = new FitbitManager();
  fitbitManager.updateToken();
}
