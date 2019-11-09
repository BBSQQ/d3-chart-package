import * as d3 from 'd3';
import * as type from './type';
import * as defaultPalette from './palette';

class $chart {
  constructor(dom, data) {
    this._dom = dom;
    this._data = data;
    this._width = dom.clientWidth;
    this._height = dom.clientHeight;
    this._isHorizontal = false;
    this._x = {};
    this._y = {};
    this._shape = '';
    this._colorScale = undefined;
  }

  bar({ x, y, xType = 'category', yFormat = 'normal' }) {

    this._x = { key: x, type: xType };
    this._y = { key: y, type: 'measure', format: yFormat };

    const isGroup = y.split('|').length > 1;
    const isStack = y.split('+').length > 1;
    if (isGroup) {
      this._shape = type.GROUPED_BAR;
      this._y.key = y.split('|');
    } else if (isStack) {
      this._shape = type.STACKED_BAR;
      this._y.key = y.split('+');
    } else {
      this._shape = type.BAR;
    }
    // key 之后再添加
    // this._key = this._x.key;
    // this._data.forEach(d => d._key = d[this._key]);
    return this;
  }

  transpose() {
    this._isHorizontal = true;
    return this;
  }

  color(key, palette) {
    // 之后可以区分对待color 是映射到离散数据还是连续数据的
    if (Array.isArray(key) && Array.isArray(palette) && (key.length === palette.length)) {
      this._colorScale = d3.scaleOrdinal().domain(key).range(palette);
    } else {
      this._colorScale = d3.scaleOrdinal().domain(this._data.map(d => d[key])).range(palette);
    }
    return this;
  }

  _autoBox() {
    const { x, y, width, height } = this.getBBox(); // svg
    return [x, y, width, height];
  }

  _drawBarChart() {
    const _svg = d3.create('svg')
      .style('max-width', '100%')
      .style('max-height', '100%')
      .style('padding', '25px');

    const xScale = d3.scaleBand()
      .domain(this._data.map(d => d[this._x.key]))
      .range(this._isHorizontal ? [0, this._height] : [0, this._width])
      .padding(0.3);


    const getYValus = () => {
      if (this._shape === type.GROUPED_BAR) {
        const valueArray = this._data.reduce((prev, curr) => {
          const arr = [];
          this._y.key.forEach(k => arr.push(curr[k]));
          return prev.concat(arr);
        }, []);

        return valueArray;
      }

      if (this._shape === type.STACKED_BAR) {
        const series = d3.stack().keys(this._y.key)(this._data);
        return series.map(d => d3.max(d, d => d[1]));
      }

      if (this._shape === type.BAR) {
        return this._data.map(d => d[this._y.key]);
      }
    };

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(getYValus()) * 1.1])
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

    const _bar = g => {

      if (this._shape === type.BAR) {
        return g.selectAll('rect')
          .data(this._data)
          .join('rect')
          .attr('x', d => this._isHorizontal ? 1 : xScale(d[this._x.key]))
          .attr('y', d => this._isHorizontal ? xScale(d[this._x.key]) : yScale(d[this._y.key]))
          .attr('height', d => this._isHorizontal ? xScale.bandwidth() : yScale(0) - yScale(d[this._y.key]))
          .attr('width', d => this._isHorizontal ? yScale(d[this._y.key]) : xScale.bandwidth())
          // 柱形图的时候只有x轴可以区分对待
          .attr('fill', d => this._colorScale ? this._colorScale(d[this._x.key]) : defaultPalette.default_color);
      } else if (this._shape === type.GROUPED_BAR) {

        const xGroupedScale = d3.scaleBand()
          .domain(this._y.key)
          .rangeRound([0, xScale.bandwidth()])
          .padding(0.05);

        return g.selectAll('g')
          .data(this._data)
          .join('g')
          .attr('transform', d => this._isHorizontal ? `translate(0, ${xScale(d[this._x.key])})` : `translate(${xScale(d[this._x.key])},0)`)
          .selectAll('rect')
          .data(d => this._y.key.map(key => ({ key, value: d[key] })))
          .join('rect')
          .attr('x', d => this._isHorizontal ? 1 : xGroupedScale(d.key))
          .attr('y', d => this._isHorizontal ? xGroupedScale(d.key) : yScale(d.value))
          .attr('height', d => this._isHorizontal ? xGroupedScale.bandwidth() : yScale(0) - yScale(d.value))
          .attr('width', d => this._isHorizontal ? yScale(d.value) : xGroupedScale.bandwidth())
          .attr('fill', d => this._colorScale ? this._colorScale(d.key) : defaultPalette.default_color);
      } else if (this._shape === type.STACKED_BAR) {
        const series = d3.stack().keys(this._y.key)(this._data);
        return g.selectAll('g')
          .data(series)
          .join('g')
          .attr('fill', d => this._colorScale(d.key))
          .selectAll('rect')
          .data(d => d)
          .join('rect')
          .attr('x', d => this._isHorizontal ? yScale(d[0]) : xScale(d.data[this._x.key]))
          .attr('y', d => this._isHorizontal ? xScale(d.data[this._x.key]) : yScale(d[1]))
          .attr('height', d => this._isHorizontal ? xScale.bandwidth() : (yScale(d[0]) - yScale(d[1])))
          .attr('width', d => this._isHorizontal ? (yScale(d[1]) - yScale(d[0])) : xScale.bandwidth());
      }

    };

    _svg.append('g').call(_xAxis); // x轴

    _svg.append('g')
      .call(_yAxis)
      .call(_ySplitLine);  // y轴

    _svg.append('g').call(_bar); // 柱子

    d3.select(this._dom).append(() => _svg.node());
    _svg.attr('viewBox', this._autoBox);

    return _svg;
  }

  _drawGroupedBarChart() {
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
      .join('rect')
      .attr('x', d => this._isHorizontal ? 1 : xScale(d[this._x.key]))
      .attr('y', d => this._isHorizontal ? xScale(d[this._x.key]) : yScale(d[this._y.key]))
      .attr('height', d => this._isHorizontal ? xScale.bandwidth() : yScale(0) - yScale(d[this._y.key]))
      .attr('width', d => this._isHorizontal ? yScale(d[this._y.key]) : xScale.bandwidth())
      // 柱形图的时候只有x轴可以区分对待
      .attr('fill', d => this._colorScale ? this._colorScale(d[this._x.key]) : defaultPalette.default_color);

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
    // if (this._shape === type.BAR) {
    //   this._svg = this._drawBarChart();
    // } else if (this._shape === type.GROUPED_BAR) {
    //   this._svg = this._drawGroupedBarChart();
    // }

    if (!this._colorScale) {
      this._colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);
    }
    this._svg = this._drawBarChart();
    return this;
  }
}

export default (...arg) => new $chart(...arg);
// export default $chart;