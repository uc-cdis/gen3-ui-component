const percentageFormatter = showPercentage => v => (showPercentage ? `${v}%` : v);

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const addPercentage = v => (percentageFormatter(true)(v));

const calculateChartData = (data, percentageFixedPoint) => {
  const sum = data.reduce((a, entry) => a + entry.value, 0);
  const max = data.reduce((a, entry) => Math.max(a, entry.value), -Infinity);
  return data.map((entry) => {
    let percentage;
    percentage = (entry.value * 100) / sum;
    percentage = Number(Number(percentage).toFixed(percentageFixedPoint));
    const widthPercentage = entry.value * 100 / max;
    return Object.assign({ percentage, widthPercentage }, entry);
  });
};

const getPercentageData = (chartData, percentageFixedPoint) => {
  const result = {};
  const sum = chartData.reduce((a, entry) => a + entry.value, 0);
  let percentRemaining = 100;
  chartData.forEach((entry, index, array) => {
    let percentage;
    if (index < array.length - 1) {
      percentage = (entry.value * 100) / sum;
    } else {
      percentage = percentRemaining;
    }
    percentage = Number(Number.parseFloat(percentage).toFixed(percentageFixedPoint));
    percentRemaining -= percentage;
    result[entry.name] = percentage;
  });
  return [result];
};

const categoricalColors = [
  '#3283c8',
  '#7ec500',
  '#ad91ff',
  '#f4b940',
  '#e74c3c',
  '#05b8ee',
  '#ff7abc',
  '#ef8523',
  '#26d9b1',
];
const getCategoryColor = index => (categoricalColors[index % categoricalColors.length]);

const getCategoryColorFrom2Colors = (index) => {
  const colors = [
    '#3283c8',
    '#e7e7e7',
  ];
  return colors[index % colors.length];
};

const getDataKey = showPercentage => (showPercentage ? 'percentage' : 'value');

const parseParamWidth = width => ((typeof width === 'number') ? `${width}px` : width);

const shouldHideChart = (data, lockValue) => data.find(item => item.value === lockValue);

const helper = {
  percentageFormatter,
  numberWithCommas,
  addPercentage,
  calculateChartData,
  getPercentageData,
  getCategoryColor,
  getCategoryColorFrom2Colors,
  getDataKey,
  parseParamWidth,
  categoricalColors,
  shouldHideChart,
};

export default helper;
