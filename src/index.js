import * as d3 from 'd3';

class $chart {
  constructor(dom, data, key) {
    this._dom = dom;
    this._data = data;
    this._width = dom.clientWidth;
    this._height = dom.clientHeight;
    this._key = key;
    this._isHorizontal = false;
  }

  bar({ x, y, xType = 'category', yFormat = 'normal' }) {
    this.shape = 'bar';
    // string.split("&");
    console.log(x.split('|'));
    this._x = { key: x, type: xType };
    this._y = { key: y, type: 'measure', format: yFormat };
    this._key = this._x.key;
    this._data.forEach(d => d._key = d[this._key]);
    return this;
  }

  transpose() {
    this._isHorizontal = true;
    return this;
  }

  _autoBox() {
    const { x, y, width, height } = this.getBBox(); // svg
    return [x, y, width, height];
  }

  _color(key) {
    const palette = ['#22a6a1', '#ffda8a', '#ff9c4d', '#343e73'];
    let colors = this._data.map((d, i) => ({ _key: d[this._key], color: palette[i] }));
    let found = colors.find(c => c._key === key);
    return (found) ? found.color : 'black';
  }

  drawBarChart() {
    const _svg = d3.create('svg')
      .style('max-width', '100%')
      .style('max-height', '100%')
      .style('padding', '25px');

    const xScale = d3.scaleBand()
      .domain(this._data.map(d => d[this._x.key]))
      .range(this._isHorizontal ? [0, this._height] : [0, this._width])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this._data, d => d[this._y.key]) * 1.2])
      .range(this._isHorizontal ? [0, this._width] : [this._height, 0]);

    const _xAxis = g => g
      .attr('transform', this._isHorizontal ? '' : `translate(0,${this._height})`)
      .call(this._isHorizontal ? d3.axisLeft(xScale).tickSizeOuter(0) : d3.axisBottom(xScale).tickSizeOuter(0))
      .call(g => g.selectAll('.tick line').remove());

    const _yAxis = g => g
      .call(this._isHorizontal ? d3.axisTop(yScale).ticks(5) : d3.axisLeft(yScale).ticks(5))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').remove());

    const _ySplitLine = g => g.selectAll('.tick')
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', this._isHorizontal ? 0 : this._width)
      .attr('y2', this._isHorizontal ? this._height : 0)
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '5 5');

    const _bar = g => g.selectAll('rect')
      .data(this._data)
      // .join('g')
      // .selectAll('rect')
      // .data(d => console.log(d))
      .join('rect')
      .attr('x', d => this._isHorizontal ? 1 : xScale(d[this._x.key]))
      .attr('y', d => this._isHorizontal ? xScale(d[this._x.key]) : yScale(d[this._y.key]))
      .attr('height', d => this._isHorizontal ? xScale.bandwidth() : yScale(0) - yScale(d[this._y.key]))
      .attr('width', d => this._isHorizontal ? yScale(d[this._y.key]) : xScale.bandwidth())
      .attr('fill', d => this._color(d[this._x.key]));

    _svg.append('g').call(_xAxis); // x轴

    _svg.append('g')
      .call(_yAxis)
      .call(_ySplitLine);  // y轴

    _svg.append('g').call(_bar); // 柱子

    d3.select(this._dom).append(() => _svg.node());
    _svg.attr('viewBox', this._autoBox);

    return _svg;
  }

  render() {
    // if this.type = bar;
    this._svg = this.drawBarChart();
    return this;
  }
}

export default (...arg) => new $chart(...arg);