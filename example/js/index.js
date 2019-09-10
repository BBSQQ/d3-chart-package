window.onload = function () {

  new Handsontable(document.getElementById('data_d1_m1'), {
    data: data_d1_m1,
    licenseKey: 'non-commercial-and-evaluation'
  });
  new Handsontable(document.getElementById('data_d2_m1'), {
    data: data_d2_m1,
    licenseKey: 'non-commercial-and-evaluation'
  });
  new Handsontable(document.getElementById('data_d2_m1_2'), {
    data: data_d2_m1_2,
    licenseKey: 'non-commercial-and-evaluation'
  });
  new Handsontable(document.getElementById('data_m2_format'), {
    data: data_m2_format,
    licenseKey: 'non-commercial-and-evaluation'
  });


  var i = $chart(document.getElementById('bar-vertical'), data_d1_m1)
    .bar({ x: 'field', y: 'value' })
    .render();
  $chart(document.getElementById('bar-horizontal'), data_d1_m1)
    .bar({ x: 'field', y: 'value' })
    .transpose()
    .render();

  $chart(document.getElementById('grouped-bar-vertical'), data_d2_m1)
    .bar({ x: 'field1|field2', y: 'value' })
    .render();

  // $chart(document.getElementById('grouped-bar-vertical'), data_d2_m1)
  //   .bar({ x: 'field1+field2', y: 'value' })
  //   // .transpose()
  //   .render();

  console.log(i)

};