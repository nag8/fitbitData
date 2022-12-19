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

function getNotionConfig(){
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET.config.name);
  return {
    token: sheet.getRange(SHEET.config.cell.notion.token).getValue(),
    db: {
      weight: sheet.getRange(SHEET.config.cell.notion.db.weight).getValue(),
      sleep: sheet.getRange(SHEET.config.cell.notion.db.sleep).getValue(),
      activity: sheet.getRange(SHEET.config.cell.notion.db.activity).getValue(),
      heartRate: sheet.getRange(SHEET.config.cell.notion.db.heartRate).getValue(),
    },
  };
}