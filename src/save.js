import * as d3 from 'd3';

class a {
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