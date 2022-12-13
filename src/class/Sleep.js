class Sleep{
  constructor(json){
    this.json = json;
    this.startTime = dayjs.dayjs(json.startTime);
    this.endTime = dayjs.dayjs(json.endTime);
  }

  getNotionPage(){
    const notionPage = new NotionPage();

    const getFormat = day => day.format('MM/DD HH:mm');
    notionPage.setTitle('名前', `sleep ${getFormat(this.startTime)} - ${getFormat(this.endTime)}`);
    notionPage.setIcon('💤');
    notionPage.setPropertiesDate('time', this.startTime, this.endTime);
    notionPage.setPropertiesNumber('入眠までの分数', this.json.minutesAsleep);
    notionPage.setPropertiesNumber('起床までの分数', this.json.minutesAfterWakeup);
    
    this.json.levels.data.forEach(level => {
      const text = `level: ${level.level}`
        + ` 分:${level.seconds / 60}`;
      
      notionPage.pushChildrenText(text);
    });

    return notionPage;
  }
}