class Weight{
  constructor(json){
    this.bmi = json.bmi;
    this.fat = json.fat;
    this.time = dayjs.dayjs(`${json.date} ${json.time}`);
    this.weight = json.weight;
  }

  getNotionPage(){
    const notionPage = new NotionPage();
    notionPage.setTitle('名前', `weigth ${this.time.format('MM/DD HH:mm')}`);
    notionPage.setIcon('🧗');
    notionPage.setPropertiesDate('time', this.time);
    notionPage.setPropertiesNumber('weight', this.weight);
    notionPage.setPropertiesNumber('fat', this.fat);
    notionPage.setPropertiesNumber('bmi', this.bmi);

    return notionPage;
  }
}