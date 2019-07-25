
// bar chart
d3.csv('../test/data/bar-chart.csv').then(function(data) {
  const dom = document.getElementById('bar-chart')
  const barChart = new _d3(dom)
  barChart.data(data)
  barChart.coord('rect', 'category*amount')
})

