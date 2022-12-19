class Sleep{
  constructor(json){
    this.json = json;
    this.startTime = dayjs.dayjs(json.startTime);
    this.endTime = dayjs.dayjs(json.endTime);
  }

  createNotionRecord(notionManager, databaseId){
    const notionRecord = Notion.initRecord();
    const getFormat = day => day.format('MM/DD HH:mm');
    notionRecord.setTitle('名前', `sleep ${getFormat(this.startTime)} - ${getFormat(this.endTime)}`);
    notionRecord.setIcon('💤');
    notionRecord.setPropertiesDatetime('time', this.startTime, this.endTime);
    notionRecord.setPropertiesNumber('入眠までの分数', this.json.minutesAsleep);
    notionRecord.setPropertiesNumber('起床までの分数', this.json.minutesAfterWakeup);
    this.json.levels.data.forEach(level => {
      const text = `level: ${level.level}`
        + ` 分:${level.seconds / 60}`;
      
      notionRecord.pushChildrenText(text);
    });

    notionManager.createRecord(databaseId, notionRecord);
  }
}