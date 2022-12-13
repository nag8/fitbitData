class HeartRate{
  constructor(json){
    this.heartRateZoneList = json['activities-heart'].shift().value.heartRateZones;
  }

  getNotionPage(){
    const notionPage = new NotionPage();
    notionPage.setTitle('名前', `heartRate ${dayjs.dayjs().format('MM/DD')}`);
    notionPage.setIcon('💖');
    notionPage.setPropertiesDate('time', dayjs.dayjs());

    this.heartRateZoneList.forEach(heartRateZone => {
      notionPage.pushChildrenText(JSON.stringify(heartRateZone));
    });

    return notionPage;
  }
}