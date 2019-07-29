
<style>img{width: 120px;}</style>

# Graph List 图表实现列表

从常用图表来看，可以分成几个大类（分类标准并不代表可视化理念，有的按坐标系分开，有的按数据关系分开，取决于涉及到的常用图表数量）。

目前做的顺序也是按从上到下的分类来做，具体实现会参考可视化理念。

## 1. 直角坐标系

### point

![Bubble chart](./imgs/气泡图.png)
![Scatter plot](./imgs/散点图.png)

### interval

以下的每一个都可以通过 coord.transpose 转置成条形图

![Bar Chart](./imgs/柱状图.png)
[![Multi-set Bar Chart](./imgs/分组柱状图.png)](https://observablehq.com/@d3/grouped-bar-chart)
![Stacked Bar Chart](./imgs/堆叠柱状图.png)
![100% Stacked Bar Chart](./imgs/100per堆叠柱状图.png)
![Histogram](./imgs/直方图.png)
![Heatmap](./imgs/热力图.png)
![Waterfall Plot](./imgs/瀑布图.png)
![Gantt Chart](./imgs/甘特图.png)
![Range Column Chart](./imgs/跨度图.png)

### area

![Area Chart](./imgs/面积图.png)
![Density Plot](./imgs/密度图.png)
![Stacked Area Graph](./imgs/堆叠面积图.png)
![100% Stacked Area Graph](./imgs/100per堆叠面积图.png)
![Sorted Stream Graph](./imgs/排序流图.png)
![Stream Graph](./imgs/流图.png)

### line

![Line Chart](./imgs/折线图.png)
![Parallel Coordinates](./imgs/平行坐标系.png)

### others

![Box plot](./imgs/箱形图.png)
![Candlestick chart](./imgs/K线图.png)
[![Violin Plot](./imgs/小提琴图.png)](https://www.d3-graph-gallery.com/graph/violin_basicHist.html)
![Bullet Graph](./imgs/子弹图.png)
![Pairs Plots](./imgs/散点矩阵图.png)
![Lollipop chart](./imgs/棒棒糖图.png)

## 2. 极坐标系

## 3. 层次结构数据

## 4. 地理坐标系
