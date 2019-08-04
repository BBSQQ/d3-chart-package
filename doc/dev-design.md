# Dev Design 开发设计

## 现阶段边界设定

* 只涉及2d
* 暂不做 `rerender` 的动作，也就不涉及 transition，不涉及data key 指定

## 概览

* **调用设计：** 通过类似 [antv/g2](https://antv.alipay.com/zh-cn/g2/3.x/index.html) 链式调用的方法将可视化中的数据合理映射。
* **实现工具：** [d3.js](https://d3js.org/) 拥有强的可扩展性
* **实现方法：** 链式调用完成配置项配置，最后调用 render 方法，绘制出图表

## 配置项

```json
{
  "coord": "",
  "position": [],
  "geom": "",
  "color": ["field", "colors"],
  "size": ""
}
```

映射元素：position => shape => size => color => line width => line type 由强到弱

* **coord:** `'rect' 'polar'` 2d 图形要将可视化元素合理放置位置，就需要线确定坐标系，所以 config.json 中首先需要先指明坐标轴，并且为了强制思考，该项不设置默认值。
* **position:** `['name', 'age']` 堆叠：`['city', ['<10', '10-20', '>20']]` 分组：`['city', ['man', 'woman']]` ，该纬度和 coord 直接相关，表示怎么放置位置。
* **geom:** `'interval' 'point' 'line' 'area' 'heatmap'` 映射图形的形状
* **color:** 颜色一般来讲有三种用途：[区分类别；数值区间；强调某些点](https://serialmentor.com/dataviz/color-basics.html)
  - [ ] 从数据是连续还是分类来区分对待 color
  - [ ] 数据是否有中间点处理
  - [ ] 数据是否需要强调
* **size:** 目前只有点图的点涉及大小因素。
