class Activity{
  constructor(json){
    this.json = json;
  }

  getNotionPage(){
    const notionPage = new NotionPage();

    notionPage.setTitle('名前', `${this.json.name}`);
    notionPage.setIcon('🏃');
    notionPage.setPropertiesDate('time', dayjs.dayjs(`${this.json.startDate} ${this.json.startTime}`));
    notionPage.setPropertiesNumber('calories', this.json.calories);
    Object.keys(this.json).forEach(key => notionPage.pushChildrenText(`${key} : ${this.json[key]}`))

    return notionPage;
  }
}