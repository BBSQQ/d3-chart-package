# 基于 d3.js 绘制常规图表的封装

## 项目搭建

基于 parcel

## scripts

### npm run portal  

打开 index.hmtl

### npm run portal ${fileName}  

打开 test 文件夹下相应的文件 fileName.html

## api doc

就 折、柱、点、饼 图来讲 强制需要设置坐标轴（coord）, 映射对应关系（position）

```javascript
let chart = new _d3(dom)
chart.data(data)
chart.coord('rect', 'category*amount') // rect or polar
chart.shape('interval') // interval point line
// chart.legend(true)  // 默认不显示
```

## TODO

- [ ]  不打包工具类包 如 d3
