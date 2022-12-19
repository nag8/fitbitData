class Activity{
  constructor(json){
    this.json = json;
  }

  createNotionRecord(notionManager, databaseId){
    const notionRecord = Notion.initRecord();
    
    notionRecord.setTitle('名前', `${this.json.name}`);
    notionRecord.setIcon('🏃');
    notionRecord.setPropertiesDatetime('time', dayjs.dayjs(`${this.json.startDate} ${this.json.startTime}`));
    notionRecord.setPropertiesNumber('calories', this.json.calories);
    Object.keys(this.json).forEach(key => notionRecord.pushChildrenText(`${key} : ${this.json[key]}`))

    notionManager.createRecord(databaseId, notionRecord);
  }
}