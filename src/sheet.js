const SHEET = {
  config: {
    name: 'config',
    cell: {
      fitbit: {
        id: 'c2',
        accessToken: 'c3',
        refreshToken: 'c4',
      },
      notion: {
        token: 'c5',
        db: {
          weight: 'c6',
          sleep: 'c7',
          activity: 'c8',
          heartRate: 'c9',
        },
      },
    },
  },
  weight: {
    name: 'weight',
  },
};

function getSheetData(sheetConfig){
  let data = getSheetDataFull(sheetConfig);
  [...Array(sheetConfig.row.data - 1)].forEach(_ => data.shift());
  return data;
}

function getSheetDataFull(sheetConfig){
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);
  return sheet.getDataRange().getValues();
}

function addSheetLastRow(sheetConfig, list, column){

  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);

  sheet.getRange(
    sheet.getLastRow() + 1,
    column !== undefined ? column : 1,
    list.length,
    list[0].length
  ).setValues(list);
}