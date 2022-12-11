function main() {
  const fitbitManager = new FitbitManager();
  fitbitManager.updateToken();
  const weightList = fitbitManager.getTodayWeightList();

  if(!weightList.length) return;

  addSheetLastRow(
    SHEET.weight,
    weightList.map(weight => weight.getOutList())
  );
}
