import * as d3 from 'd3';

class $chart {
  constructor(dom, data) {
    this._dom = dom;
    this._data = data;
    this._width = dom.clientWidth;
    this._height = dom.clientHeight;
    this._margin = { top: 0, right: 0, bottom: 0, left: 0 };
    this._x = d3.scaleBand()
      .domain(this._data.map(d => d.key))
      .range([this._margin.left, this._width - this._margin.right])
      .padding(0.3);
    this._y = d3.scaleLinear()
      .domain([0, d3.max(this._data, d => d.value) * 1.2])
      .range([this._height - this._margin.bottom, this._margin.top]);
    this._svg = d3.create('svg')
      .style('max-width', '100%')
      .style('max-height', '100%')
      .style('padding', '5px');
  }

  _autoBox() {
    const { x, y, width, height } = this.getBBox(); // svg
    return [x, y, width, height];
  }

  _color(key) {
    const palette = ['#22a6a1', '#ffda8a', '#ff9c4d', '#343e73'];
    let colors = this._data.map((d, i) => ({ key: d.key, color: palette[i] }));
    let found = colors.find(c => c.key === key);
    return (found) ? found.color : 'black';
  }

  _xAxis = g => g
    .attr('transform', `translate(0,${this._height - this._margin.bottom})`)
    .call(d3.axisBottom(this._x).tickSizeOuter(0))
    .call(g => g.selectAll('.tick line').remove());

  _yAxis = g => g
    .attr('transform', `translate(${this._margin.left},0)`)
    .call(d3.axisLeft(this._y).ticks(5))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').remove());

  _ySplitLine = g => g.selectAll('.tick')
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', this._width)
    .attr('y2', 0)
    .attr('stroke', 'black')
    .attr('stroke-dasharray', '5 5');

  _bar = g => g.selectAll('rect')
    .data(this._data)
    .join('rect')
    .attr('x', d => this._x(d.key))
    .attr('y', d => this._y(d.value))
    .attr('height', d => this._y(0) - this._y(d.value))
    .attr('width', this._x.bandwidth())
    .attr('fill', d => this._color(d.key))

  bar() {
    const _svg = d3.create('svg')
      .style('max-width', '100%')
      .style('max-height', '100%')
      .style('padding', '25px');

    _svg.append('g').call(this._xAxis); // x轴

    _svg.append('g')
      .call(this._yAxis)
      .call(this._ySplitLine);  // y轴

    _svg.append('g').call(this._bar); // 柱子

    d3.select(this._dom).append(() => _svg.node());
    _svg.attr('viewBox', this._autoBox);
  }

  render() {
    d3.select(this._dom).append(() => this._svg.node());
    this._svg.attr('viewBox', this._autoBox);
  }

  _line = g => {
    const line = d3.line()
      .x(d => this._x(d.key))
      .y(d => this._y(d.value));

    return g.append('path')
      .datum(this._data)
      .attr('fill', 'none')
      .attr('stroke', '#ff9c4d')
      .attr('stroke-width', 2)
      .attr('d', line);
  }

  line() {
    const _svg = d3.create('svg')
      .style('max-width', '100%')
      .style('max-height', '100%')
      .style('padding', '25px');

    _svg.append('g').call(this._xAxis); // x轴

    _svg.append('g')
      .call(this._yAxis)
      .call(this._ySplitLine);  // y轴

    _svg.append('g').call(this._line); // 柱子

    d3.select(this._dom).append(() => _svg.node());
    _svg.attr('viewBox', this._autoBox);
  }

  _arcs() {
    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);
    return pie(this._data);
  }

  _pie = g => {
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(100);

    return g.attr('stroke', 'white')
      .selectAll('path')
      .data(this._arcs())
      .join('path')
      .attr('fill', d => this._color(d.data.key))
      .attr('d', arc);
  };

  _pieLabel = g => {
    const arcLabel = d3.arc().innerRadius(30).outerRadius(100);
    return g.attr('stroke', 'transparent')
      .attr('fill', '#fff')
      .selectAll('text')
      .data(this._arcs())
      .join('text')
      .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
      .text(d => d.data.key);
  }

  pie() {
    const _svg = d3.create('svg')
      .style('max-width', '100%')
      .style('max-height', '100%')
      .style('padding', '25px');

    _svg.append('g').call(this._pie);
    _svg.append('g').call(this._pieLabel);

    d3.select(this._dom).append(() => _svg.node());
    _svg.attr('viewBox', this._autoBox);
  }
}

export default (...arg) => new $chart(...arg);
