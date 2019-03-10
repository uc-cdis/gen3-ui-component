"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var percentageFormatter = function percentageFormatter(showPercentage) {
  return function (v) {
    return showPercentage ? "".concat(v, "%") : v;
  };
};

var addPercentage = function addPercentage(v) {
  return percentageFormatter(true)(v);
};

var calculateChartData = function calculateChartData(data, showPercentage, percentageFixedPoint) {
  if (showPercentage) {
    var sum = data.reduce(function (a, entry) {
      return a + entry.value;
    }, 0);
    var percentRemaining = 100;
    return data.map(function (entry, index, array) {
      var percentage;

      if (index < array.length - 1) {
        percentage = entry.value * 100 / sum;
      } else {
        percentage = percentRemaining;
      }

      percentage = Number(Number(percentage).toFixed(percentageFixedPoint));
      percentRemaining -= percentage;
      return Object.assign({
        percentage: percentage
      }, entry);
    });
  }

  return data;
};

var getPercentageData = function getPercentageData(chartData, percentageFixedPoint) {
  var result = {};
  var sum = chartData.reduce(function (a, entry) {
    return a + entry.value;
  }, 0);
  var percentRemaining = 100;
  chartData.forEach(function (entry, index, array) {
    var percentage;

    if (index < array.length - 1) {
      percentage = entry.value * 100 / sum;
    } else {
      percentage = percentRemaining;
    }

    percentage = Number(Number.parseFloat(percentage).toFixed(percentageFixedPoint));
    percentRemaining -= percentage;
    result[entry.name] = percentage;
  });
  return [result];
};

var categoricalColors = ['#3283c8', '#7ec500', '#ad91ff', '#f4b940', '#e74c3c', '#05b8ee', '#ff7abc', '#ef8523', '#26d9b1'];

var getCategoryColor = function getCategoryColor(index) {
  return categoricalColors[index % categoricalColors.length];
};

var getCategoryColorFrom2Colors = function getCategoryColorFrom2Colors(index) {
  var colors = ['#3283c8', '#e7e7e7'];
  return colors[index % colors.length];
};

var getDataKey = function getDataKey(showPercentage) {
  return showPercentage ? 'percentage' : 'value';
};

var prettifyValueName = function prettifyValueName(name) {
  if (name === '__missing__') {
    return 'No Data';
  }

  return name;
};

var transformArrangerDataToChart = function transformArrangerDataToChart(field, sqonValues) {
  var chartData = [];
  field.buckets.filter(function (bucket) {
    return sqonValues === null || sqonValues.includes(bucket.key);
  }).forEach(function (bucket) {
    return chartData.push({
      name: prettifyValueName(bucket.key),
      value: bucket.doc_count
    });
  });
  return chartData;
};

var transformArrangerDataToSummary = function transformArrangerDataToSummary(field, chartType, title, sqonValues) {
  return {
    type: chartType,
    title: title,
    data: transformArrangerDataToChart(field, sqonValues)
  };
};

var transformDataToCount = function transformDataToCount(field, label, sqonValues) {
  return {
    label: label,
    value: sqonValues ? Math.min(field.buckets.length, sqonValues.length) : field.buckets.length
  };
};
/**
 * Return an array of selected values in a given field
 * If no value selected, return null
 */


var getSQONValues = function getSQONValues(sqon, field) {
  if (!sqon || !sqon.content) return null;
  var sqonItems = sqon.content.filter(function (item) {
    return item.content.field === field;
  });
  if (!sqonItems || sqonItems.length !== 1) return null;
  var sqonValues = sqonItems[0].content.value;
  return sqonValues;
};

var getCharts = function getCharts(data, dataExplorerConfig, sqon) {
  var countItems = [];
  var summaries = [];
  var stackedBarCharts = [];
  var arrangerConfig = dataExplorerConfig.arrangerConfig;

  if (data && data[arrangerConfig.graphqlField].aggregations) {
    var fields = data[arrangerConfig.graphqlField].aggregations;
    Object.keys(fields).forEach(function (field) {
      var fieldConfig = dataExplorerConfig.charts[field];
      var sqonValues = getSQONValues(sqon, field);

      if (fieldConfig) {
        switch (fieldConfig.chartType) {
          case 'count':
            countItems.push(transformDataToCount(fields[field], fieldConfig.title, sqonValues));
            break;

          case 'pie':
          case 'bar':
            summaries.push(transformArrangerDataToSummary(fields[field], fieldConfig.chartType, fieldConfig.title, sqonValues));
            break;

          case 'stackedBar':
            stackedBarCharts.push(transformArrangerDataToSummary(fields[field], fieldConfig.chartType, fieldConfig.title, sqonValues));
            break;

          default:
            break;
        }
      }
    });
  }

  return {
    summaries: summaries,
    countItems: countItems,
    stackedBarCharts: stackedBarCharts
  };
};

var parseParamWidth = function parseParamWidth(width) {
  return typeof width === 'number' ? "".concat(width, "px") : width;
};

var helper = {
  percentageFormatter: percentageFormatter,
  addPercentage: addPercentage,
  calculateChartData: calculateChartData,
  getPercentageData: getPercentageData,
  getCategoryColor: getCategoryColor,
  getCategoryColorFrom2Colors: getCategoryColorFrom2Colors,
  getDataKey: getDataKey,
  transformDataToCount: transformDataToCount,
  transformArrangerDataToChart: transformArrangerDataToChart,
  transformArrangerDataToSummary: transformArrangerDataToSummary,
  getCharts: getCharts,
  getSQONValues: getSQONValues,
  parseParamWidth: parseParamWidth,
  categoricalColors: categoricalColors
};
var _default = helper;
exports.default = _default;