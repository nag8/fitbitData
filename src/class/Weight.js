class Weight{
  constructor(json){
    this.bmi = json.bmi;
    this.fat = json.fat;
    this.time = dayjs.dayjs(`${json.date} ${json.time}`);
    this.weight = json.weight;
  }

  createNotionRecord(notionManager, databaseId){
    const notionRecord = Notion.initRecord();
    notionRecord.setTitle('名前', `weigth ${this.time.format('MM/DD HH:mm')}`);
    notionRecord.setIcon('🧗');
    notionRecord.setPropertiesDatetime('time', this.time);
    notionRecord.setPropertiesNumber('weight', this.weight);
    notionRecord.setPropertiesNumber('fat', this.fat);
    notionRecord.setPropertiesNumber('bmi', this.bmi);

    notionManager.createRecord(databaseId, notionRecord);
  }
}