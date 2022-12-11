class Weight{
  constructor(json){
    this.bmi = json.bmi;
    this.fat = json.fat;
    this.time = dayjs.dayjs(`${json.date} ${json.time}`);
    this.weight = json.weight;
  }

  getOutList(){
    return [
      this.time.format('YYYY/MM/DD HH:mm'),
      this.weight,
      this.fat,
      this.bmi
    ];
  }
}