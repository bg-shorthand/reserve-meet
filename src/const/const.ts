const START_TIME = 10;
const END_TIME = 17;

const FLOORS = [9, 10, 11, 12, 15];

const FONT_SIZE = 14;
const TABLE_CELL_PADDING = 25;
const TABLE_CELL_HEIGHT = FONT_SIZE + TABLE_CELL_PADDING * 2 + 1;

const TIME_TABLE = (() => {
  const temp: string[] = [];
  for (let i = START_TIME; i <= END_TIME - 1; i++) {
    temp.push(i + ':00');
    temp.push(i + ':30');
  }
  return temp;
})();

const TABLE_HEIGHT = TABLE_CELL_HEIGHT * TIME_TABLE.length;

const COLORS = {
  BLACK: '#212529',
  GRAY_LEVEL_1: '#f8f9fa',
  GRAY_LEVEL_2: '#e9ecef',
  GRAY_LEVEL_3: '#dee2e6',
  GRAY_LEVEL_4: '#ced4da',
  GRAY_LEVEL_5: '#adb5bd',

  TEAL_LEVEL_1: '#E3FDFD',
  TEAL_LEVEL_2: '#CBF1F5',
  TEAL_LEVEL_3: '#A6E3E9',
  TEAL_LEVEL_4: '#71C9CE',

  HEADER_BLACK: 'rgb(42, 47, 55)',
  HEADER_WHITE: 'rgb(255, 255, 255)',

  MENU_BACKGROUND: 'rgb(53, 60, 73)',

  MAIN_BACKGROUND: '#f9fafa',
  MAIN_FONT: 'rgb(0, 0, 0)',
  MAIN_GRAY: 'rgb(230, 235, 239)',

  TABLE_BORDER: 'rgb(224, 224, 224)',
  TABLE_BACKGROUND: 'rgb(255, 255, 255)',
  TH_BORDER: 'rgb(188, 209, 230)',
  TH_BACKGROUND: 'rgb(216, 234, 253)',

  BUTTON_BLUE_1: '#6c97c4',
  BUTTON_BLUE_2: '#007bff',

  GREEN_1: '#57d07b',
  GREEN_2: '#218838',
};

export {
  START_TIME,
  END_TIME,
  FLOORS,
  FONT_SIZE,
  TABLE_CELL_PADDING,
  TABLE_CELL_HEIGHT,
  TIME_TABLE,
  TABLE_HEIGHT,
  COLORS,
};
