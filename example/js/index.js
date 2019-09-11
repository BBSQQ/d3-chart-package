window.onload = function () {

  new Handsontable(document.getElementById('data_d1_m1'), {
    data: data_d1_m1,
    licenseKey: 'non-commercial-and-evaluation'
  });
  new Handsontable(document.getElementById('data_d2_m1'), {
    data: data_d2_m1,
    licenseKey: 'non-commercial-and-evaluation'
  });
  new Handsontable(document.getElementById('data_d3_m1'), {
    data: data_d3_m1,
    licenseKey: 'non-commercial-and-evaluation'
  });
  new Handsontable(document.getElementById('data_m2_format'), {
    data: data_m2_format,
    licenseKey: 'non-commercial-and-evaluation'
  });


  var i = $chart(document.getElementById('bar-vertical'), data_d1_m1)
    .bar({ x: 'field', y: 'value' })
    .color('field', ['#22a6a1', '#ffda8a', '#ff9c4d', '#343e73'])
    .render();

  $chart(document.getElementById('bar-horizontal'), data_d1_m1)
    .bar({ x: 'field', y: 'value' })
    .color('field', ['#22a6a1', '#ffda8a', '#ff9c4d', '#343e73'])
    .transpose()
    .render();

  $chart(document.getElementById('grouped-bar-vertical'), data_d2_m1)
    .bar({ x: 'field', y: 'value1|value2' })
    .color(['value1', 'value2'], ['#343e73', '#d0215a'])
    .render();

  $chart(document.getElementById('grouped-bar-horizontal'), data_d2_m1)
    .bar({ x: 'field', y: 'value1|value2' })
    .color(['value1', 'value2'], ['#343e73', '#d0215a'])
    .transpose()
    .render();

  $chart(document.getElementById('grouped-bar-vertical-2'), data_d3_m1)
    .bar({ x: 'field', y: 'value1|value2|value3' })
    .color(['value1', 'value2', 'value3'], ['#343e73', '#d0215a', '#ff9c4d'])
    .render();

  $chart(document.getElementById('grouped-bar-horizontal-2'), data_d3_m1)
    .bar({ x: 'field', y: 'value1|value2|value3' })
    .color(['value1', 'value2', 'value3'], ['#343e73', '#d0215a', '#ff9c4d'])
    .transpose()
    .render();

  console.log(i)

};