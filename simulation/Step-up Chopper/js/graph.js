function plotData() {
  if (
    values["AC1"]["volt"] != 0 &&
    values["AC1"]["freq"] != 0 &&
    values["DC1"]["value"] != 0 &&
    values["R1"]["value"] != 0
  ) {
    var graph = document.getElementById("graph-new");
    graph.innerHTML = "";
    console.log(dataset);
    a = generateGraph();
    var mine = document.createElement("div");
    mine.id = "input-waves";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "input-waves",
      [
        {
          x: xval,
          y: a[1],
          mode: "lines",
          name: "V<sub>SQ</sub>",
          marker: {
            color: "Red",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM2"]["name"] + "</b>",
        xaxis: { range: [0, 0.021], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-0.5, 1.5],
          title: "<b>Amplitude(V)</b>",
          fixedrange: true,
        },
        margin: { t: 35 },
      },
      { displayModeBar: false }
    );

    mine = document.createElement("div");
    mine.id = "iind";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "iind",
      [
        {
          x: xval,
          y: a[2],
          mode: "lines",
          name: "I<sub>IND</sub>  ",
          marker: {
            color: "#2886bb",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["AM1"]["name"] + "</b>",
        xaxis: { range: [0, 0.021], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1*(a[0][1] + 0.1 * a[0][1]), a[0][1] + 0.1 * a[0][1]],
          title: "<b>Current(A)</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );
    mine = document.createElement("div");
    mine.id = "vload";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "vload",
      [
        {
          x: xval,
          y: a[3],
          mode: "lines",
          name: "V<sub>Load</sub>",
          marker: {
            color: "orange",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM1"]["name"] + "</b>",
        xaxis: { range: [0, 0.021], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1*(a[0][0] + 0.1 * a[0][0]), a[0][0] + 0.1 * a[0][0] + 1],
          title: "<b>Voltage(V)</b>",
          fixedrange: true,
        },
        margin: { t: 35 },
      },
      { displayModeBar: false }
    );
    mine = document.createElement("div");
    mine.id = "iload";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "iload",
      [
        {
          x: xval,
          y: a[4],
          mode: "lines",
          name: "I<sub>Load</sub>",
          marker: {
            color: "green",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "I<sub>Diode</sub>",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title:
          "<b>" + values["AM4"]["name"] + "/" + values["AM2"]["name"] + "</b>",
        xaxis: { range: [0, 0.021], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1*(a[0][1] + 0.1 * a[0][1]), a[0][1] + 0.1 * a[0][1]],
          title: "<b>Current(A)</b>",
          fixedrange: true,
        },
        margin: { t: 35 },
      },
      { displayModeBar: false }
    );
  }
}

function Reset() {
  window.location.reload();
}

function showtable() {
  var r = document.getElementById("readings");
  if ((r.style.display = "none")) {
    r.style.display = "block";
  } else {
    r.style.display.toggle();
  }
}
function generateGraph() {
  const freq = parseInt(values["AC1"]["volt"]);
  const alpha = parseFloat(values["AC1"]["freq"]);
  const resistance = parseInt(values["R1"]["value"]);
  const dcvalue = parseInt(values["DC1"]["value"]);
  const data = `f${freq}d${alpha * 100}`;
  const time_p = 1 / freq;
  var timp = time_p,
    half_time = alpha * time_p;
  var load_voltage = [],
    square_wave = [],
    load_current = [],
    inductor_current = [];
  var current = 0,
    max_current = 0,
    max_voltage = 0,
    vrms = 0,
    irms = 0,vavg=0,iavg=0;
  for (let x = 0; x < 2000; x = x + 1) {
    if (xval[x] > timp) {
      timp = timp + time_p;
      half_time = half_time + time_p;
    }
    current = dataset[data][x] * (dcvalue / resistance);
    if (xval[x] <= half_time) {
      load_voltage.push(0);
      load_current.push(0);
      square_wave.push(1);
      inductor_current.push(current);
    } else {
      load_current.push(current);
      load_voltage.push(current * resistance);
      square_wave.push(0);
      inductor_current.push(current);
      irms = irms + current * current;
      vrms = vrms + current * resistance * current * resistance;
      vavg = vavg + current * resistance;
      iavg = iavg + current;
    }
    if (max_current < current) {
      max_current = current;
    }
    if (max_voltage < current * resistance) {
      max_voltage = current * resistance;
    }
  }
  vrms=Math.sqrt(vrms/2000);
  irms=Math.sqrt(irms/2000);
  vavg=vavg/2000;
  iavg=iavg/2000;
  if(vrms<1){
    vrms=parseInt(vrms*1000)/1000;
  }else{
    vrms=parseInt(vrms*100)/100;
  }
  if (irms<1){
    irms=parseInt(irms*1000)/1000;
  }else{
    irms=parseInt(irms*100)/100;
  }
  if(vavg<1){
    vavg=parseInt(vavg*1000)/1000;
  }else{
    vavg=parseInt(vavg*100)/100;
  }
  if(iavg<1){
    iavg=parseInt(iavg*1000)/1000;
  }else{
    iavg=parseInt(iavg*100)/100;
  }
  
  values['vrms']=vrms;
  values['vavg']=vavg;
  values['irms']=irms;
  values['iavg']=iavg;
  return [
    [max_voltage, max_current],
    square_wave,
    inductor_current,
    load_voltage,
    load_current,
  ];
}
function generateData() {
  const ac1aap = parseInt(values["AC1"]["volt"]);
  const ac2app = parseInt(values["AC2"]["volt"]);
  const ac3app = parseInt(values["AC3"]["volt"]);
  const freq = parseInt(values["AC1"]["freq"]);
  const resistance = parseInt(values["R1"]["value"]);
  const g1fire1 = parseInt(combination["G1"]["fire1"]);
  const g2fire1 = parseInt(combination["G2"]["fire1"]);
  const g3fire1 = parseInt(combination["G3"]["fire1"]);
  const g4fire1 = parseInt(combination["G4"]["fire1"]);
  const g5fire1 = parseInt(combination["G5"]["fire1"]);
  const g6fire1 = parseInt(combination["G6"]["fire1"]);
  const time_p = 1 / freq;
  var g1time = (g1fire1 / 360) * time_p;
  var g2time = (g2fire1 / 360) * time_p;
  var g3time = (g3fire1 / 360) * time_p;
  var g4time = (g4fire1 / 360) * time_p;
  var g5time = (g5fire1 / 360) * time_p;
  var g6time = (g6fire1 / 360) * time_p;
  var sine1,
    sine2,
    sine3,
    volt = 0,
    vrms = 0,
    avg = 0,
    max_volt = 0,
    input_sine1 = [],
    input_sine2 = [],
    input_sine3 = [],
    output_voltage = [],
    output_current = [],
    xval = [];
  for (let x = 0; x < 0.06; x += 0.00001) {
    sine1 = ac1aap * Math.sin(2 * Math.PI * freq * x);
    sine2 = ac2app * Math.sin(2 * Math.PI * freq * x - 2 * (Math.PI / 3));
    sine3 = ac3app * Math.sin(2 * Math.PI * freq * x + 2 * (Math.PI / 3));
    input_sine1.push(sine1);
    input_sine2.push(sine2);
    input_sine3.push(sine3);
    if (x > g2time + time_p) {
      g1time = g1time + time_p;
      g2time = g2time + time_p;
      g3time = g3time + time_p;
      g4time = g4time + time_p;
      g5time = g5time + time_p;
      g6time = g6time + time_p;
    }
    if (x >= g2time) {
      if (x <= g3time) {
        volt = sine1 - sine3;
        if (volt < 0) {
          volt = 0;
        }
        output_voltage.push(volt);
        output_current.push(volt / resistance);
        xval.push(x);
      } else if (x <= g4time) {
        volt = sine2 - sine3;
        if (volt < 0) {
          volt = 0;
        }
        output_voltage.push(volt);
        output_current.push(volt / resistance);
        xval.push(x);
      } else if (x <= g5time) {
        volt = sine2 - sine1;
        if (volt < 0) {
          volt = 0;
        }
        output_voltage.push(volt);
        output_current.push(volt / resistance);
        xval.push(x);
      } else if (x <= g6time) {
        volt = sine3 - sine1;
        if (volt < 0) {
          volt = 0;
        }
        output_voltage.push(volt);
        output_current.push(volt / resistance);
        xval.push(x);
      } else if (x <= g1time + time_p) {
        volt = sine3 - sine2;
        if (volt < 0) {
          volt = 0;
        }
        output_voltage.push(volt);
        output_current.push(volt / resistance);
        xval.push(x);
      } else if (x <= g2time + time_p) {
        volt = sine1 - sine2;
        if (volt < 0) {
          volt = 0;
        }
        output_voltage.push(volt);
        output_current.push(volt / resistance);
        xval.push(x);
      }
    } else {
      output_voltage.push(0);
      output_current.push(0);
      xval.push(x);
    }
    vrms = vrms + volt * volt;
    avg = avg + volt;
    if (volt > max_volt) {
      max_volt = volt;
    }
  }
  var max = Math.max(ac1aap, ac2app, ac3app);
  vavg = avg / output_voltage.length;
  var iavg = parseInt((vavg / resistance) * 100);
  var vavg = parseInt(vavg * 100);
  vrms = parseInt(Math.sqrt(vrms / output_voltage.length) * 100);
  var irms = parseInt((vrms / 100 / resistance) * 100);
  values["vrms"] = vrms / 100;
  values["vavg"] = vavg / 100;
  values["iavg"] = iavg / 100;
  values["irms"] = irms / 100;

  return [
    [max, max_volt, max_volt / resistance],
    [input_sine1, xval],
    [input_sine2, xval],
    [input_sine3, xval],
    [output_voltage, xval],
    [output_current, xval],
  ];
}
