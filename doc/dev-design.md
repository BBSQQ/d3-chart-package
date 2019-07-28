# Dev Design 开发设计

## Overview

（目前只涉及 2d 的图形）

* **调用设计：** 通过类似 [antv/g2](https://antv.alipay.com/zh-cn/g2/3.x/index.html) 链式调用的方法将可视化中的数据合理映射。

* **实现工具：** [d3.js](https://d3js.org/) 拥有强的可扩展性

* **实现方法：** 链式调用完成配置项配置，最后调用 render 方法，绘制出图表

## 配置项

```json
{
  "coord": "", // rect polar map
  "position": [],
}
```

* 2d 图形要将可视化元素合理放置位置，就需要线确定坐标系，所以 config.json 中首先需要先指明坐标轴，并且为了强制思考，改项不设置默认值。

