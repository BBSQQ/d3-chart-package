
// Scatter plot
d3.csv('../test/data/scatter-plot.csv').then(function(data) {
  const chart = new _d3(document.getElementById('scatter-plot'));
  chart.coord('rect');
  chart.data(data);
  chart.scale(['排队时间', '满意度'])
  // chart.point({position: ['排队时间', '满意度']});
  chart.render();
})

