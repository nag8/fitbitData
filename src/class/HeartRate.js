class HeartRate{
  constructor(json){
    this.heartRateZoneList = json['activities-heart'].shift().value.heartRateZones;
  }

  createNotionRecord(notionManager, databaseId){
    const notionRecord = Notion.initRecord();
    notionRecord.setTitle('名前', `heartRate ${dayjs.dayjs().format('MM/DD')}`);
    notionRecord.setIcon('💖');
    notionRecord.setPropertiesDate('time', dayjs.dayjs());

    this.heartRateZoneList.forEach(heartRateZone => {
      notionRecord.pushChildrenText(JSON.stringify(heartRateZone));
    });

    notionManager.createRecord(databaseId, notionRecord);
  }
}