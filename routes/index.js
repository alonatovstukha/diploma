const express = require('express')
const mongoose = require('mongoose')
const SerialPort = require('serialport')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const DataDevice1 = require('../models/Data_Device1')
const DataDevice2 = require('../models/Data_Device2')
const DataDevice3 = require('../models/Data_Device3')
const DataDevice4 = require('../models/Data_Device4')

let date = new Date();
let currentHour = date.getHours();
let currentDate = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let monthDataDevice1;
let monthDataDevice2;
let monthDataDevice3;
let monthDataDevice4;

let dayDataDevice1;
let dayDataDevice2;
let dayDataDevice3;
let dayDataDevice4;

let hourDataDevice1;
let hourDataDevice2;
let hourDataDevice3;
let hourDataDevice4;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



// SerialPort.list().then(
//   ports => ports.forEach(console.log),
//   err => console.error(err)
// )

const port = new SerialPort('COM1', function (err) {
  if (err) {
    return console.log('Error with opening: ', err.message)
  }
})

port.write('Hello from Server', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})

//????????????????
port.on('data', function (data) {
  console.log('Data:', data)
})


function aggregateHour(metrics) {
  const result = {};
  const aggregation = {};

  metrics.forEach((metric) => {
    if (!aggregation[metric.minutes]) {
      aggregation[metric.minutes] = [];
    }

    aggregation[metric.minutes].push(parseInt(metric.data));
  });

  Object.keys(aggregation).forEach((minute) => {
    const sum = aggregation[minute].reduce((a, b) => a + b, 0);
    const avg = sum / aggregation[minute].length;
    result[minute] = avg;
  });

  return result;
}

function aggregateDay(metrics) {
  const result = {};
  const aggregation = {};

  metrics.forEach((metric) => {
    if (!aggregation[metric.hours]) {
      aggregation[metric.hours] = [];
    }

    aggregation[metric.hours].push(parseInt(metric.data));
  });

  Object.keys(aggregation).forEach((hours) => {
    const sum = aggregation[hours].reduce((a, b) => a + b, 0);
    const avg = sum / aggregation[hours].length;
    result[hours] = avg;
  });

  return result;
}

function aggregateMonth(metrics) {
  const result = {};
  const aggregation = {};

  metrics.forEach((metric) => {
    if (!aggregation[metric.date]) {
      aggregation[metric.date] = [];
    }

    aggregation[metric.date].push(parseInt(metric.data));
  });

  Object.keys(aggregation).forEach((date) => {
    const sum = aggregation[date].reduce((a, b) => a + b, 0);
    const avg = sum / aggregation[date].length;
    result[date] = avg;
  });

  return result;
}

// ПЕРВАЯ ВЫБОРКА
// ***********Выборка на час
DataDevice1.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
  if (err) console.log('hour error')
  data.sort(function (a, b) {
    return a.minutes - b.minutes;
  })
  // console.log(data);
  hourDataDevice1 = aggregateHour(data);
  // console.log(hourData);  
})

DataDevice2.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
  if (err) console.log('hour error')
  data.sort(function (a, b) {
    return a.minutes - b.minutes;
  })
  // console.log(data);
  hourDataDevice2 = aggregateHour(data);
  // console.log(hourData);  
})

DataDevice3.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
  if (err) console.log('hour error')
  data.sort(function (a, b) {
    return a.minutes - b.minutes;
  })
  // console.log(data);
  hourDataDevice3 = aggregateHour(data);
  // console.log(hourData);  
})

DataDevice4.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
  if (err) console.log('hour error')
  data.sort(function (a, b) {
    return a.minutes - b.minutes;
  })
  // console.log(data);
  hourDataDevice4 = aggregateHour(data);
  // console.log(hourData);  
})

// **********Выборка на день
DataDevice1.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.hours - b.hours;
  })
  dayDataDevice1 = aggregateDay(data);
  // console.log(dayData)
})

DataDevice2.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.hours - b.hours;
  })
  dayDataDevice2 = aggregateDay(data);
  // console.log(dayData)
})

DataDevice3.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.hours - b.hours;
  })
  dayDataDevice3 = aggregateDay(data);
  // console.log(dayData)
})

DataDevice4.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.hours - b.hours;
  })
  dayDataDevice4 = aggregateDay(data);
  // console.log(dayData)
})

// ***********Выборка на месяц
DataDevice1.find({ 'month': currentMonth, 'year': currentYear }, 'hours date data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.date - b.date;
  })

  monthDataDevice1 = aggregateMonth(data);
  // console.log(monthData);
})

DataDevice2.find({ 'month': currentMonth, 'year': currentYear }, 'hours date data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.date - b.date;
  })

  monthDataDevice2 = aggregateMonth(data);
  // console.log(monthData);
})

DataDevice3.find({ 'month': currentMonth, 'year': currentYear }, 'hours date data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.date - b.date;
  })

  monthDataDevice3 = aggregateMonth(data);
  // console.log(monthData);
})

DataDevice4.find({ 'month': currentMonth, 'year': currentYear }, 'hours date data', function (err, data) {
  if (err) console.log('month error')
  data.sort(function (a, b) {
    return a.date - b.date;
  })

  monthDataDevice4 = aggregateMonth(data);
  // console.log(monthData);
})

// *******************************************************************************************
// ВЫБОРКА ЧЕРЕЗ ИНТЕРВАЛ

//Выборка за час поминутно, каждые 60 сек
setInterval(function () {
  DataDevice1.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
    if (err) console.log('hour error')
    data.sort(function (a, b) {
      return a.minutes - b.minutes;
    })
    // console.log(data);
    hourDataDevice1 = aggregateHour(data);
    // console.log(hourData);  

    DataDevice2.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
      if (err) console.log('hour error')
      data.sort(function (a, b) {
        return a.minutes - b.minutes;
      })
      // console.log(data);
      hourDataDevice2 = aggregateHour(data);
      // console.log(hourData);  
    })

    DataDevice3.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
      if (err) console.log('hour error')
      data.sort(function (a, b) {
        return a.minutes - b.minutes;
      })
      // console.log(data);
      hourDataDevice3 = aggregateHour(data);
      // console.log(hourData);  
    })

    DataDevice4.find({ 'hours': currentHour, 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'seconds minutes data', function (err, data) {
      if (err) console.log('hour error')
      data.sort(function (a, b) {
        return a.minutes - b.minutes;
      })
      // console.log(data);
      hourDataDevice4 = aggregateHour(data);
      // console.log(hourData);  
    })
  })
}, 60000)


// Выборка за день, каждый час
setInterval(function () {
  DataDevice1.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
    if (err) console.log('month error')
    data.sort(function (a, b) {
      return a.hours - b.hours;
    })
    dayDataDevice1 = aggregateDay(data);
    // console.log(dayData)
  })

  DataDevice2.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
    if (err) console.log('month error')
    data.sort(function (a, b) {
      return a.hours - b.hours;
    })
    dayDataDevice2 = aggregateDay(data);
    // console.log(dayData)
  })

  DataDevice3.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
    if (err) console.log('month error')
    data.sort(function (a, b) {
      return a.hours - b.hours;
    })
    dayDataDevice3 = aggregateDay(data);
    // console.log(dayData)
  })

  DataDevice4.find({ 'date': currentDate, 'month': currentMonth, 'year': currentYear }, 'hours data', function (err, data) {
    if (err) console.log('month error')
    data.sort(function (a, b) {
      return a.hours - b.hours;
    })
    dayDataDevice4 = aggregateDay(data);
    // console.log(dayData)
  })
}, 3600000)


// ***************************************************ROUTING
// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard')
})

router.get('/statistics', (req, res) => {
  res.render('statistics',
    {
      hourDataDevice1_0min: hourDataDevice1[0],
      hourDataDevice1_1min: hourDataDevice1[1],
      hourDataDevice1_2min: hourDataDevice1[2],
      hourDataDevice1_3min: hourDataDevice1[3],
      hourDataDevice1_4min: hourDataDevice1[4],
      hourDataDevice1_5min: hourDataDevice1[5],
      hourDataDevice1_6min: hourDataDevice1[6],
      hourDataDevice1_7min: hourDataDevice1[7],
      hourDataDevice1_8min: hourDataDevice1[8],
      hourDataDevice1_9min: hourDataDevice1[9],
      hourDataDevice1_10min: hourDataDevice1[10],
      hourDataDevice1_11min: hourDataDevice1[11],
      hourDataDevice1_12min: hourDataDevice1[12],
      hourDataDevice1_13min: hourDataDevice1[13],
      hourDataDevice1_14min: hourDataDevice1[14],
      hourDataDevice1_15min: hourDataDevice1[15],
      hourDataDevice1_16min: hourDataDevice1[16],
      hourDataDevice1_17min: hourDataDevice1[17],
      hourDataDevice1_18min: hourDataDevice1[18],
      hourDataDevice1_19min: hourDataDevice1[19],
      hourDataDevice1_20min: hourDataDevice1[20],
      hourDataDevice1_21min: hourDataDevice1[21],
      hourDataDevice1_22min: hourDataDevice1[22],
      hourDataDevice1_23min: hourDataDevice1[23],
      hourDataDevice1_24min: hourDataDevice1[24],
      hourDataDevice1_25min: hourDataDevice1[25],
      hourDataDevice1_26min: hourDataDevice1[26],
      hourDataDevice1_27min: hourDataDevice1[27],
      hourDataDevice1_28min: hourDataDevice1[28],
      hourDataDevice1_29min: hourDataDevice1[29],
      hourDataDevice1_30min: hourDataDevice1[30],
      hourDataDevice1_31min: hourDataDevice1[31],
      hourDataDevice1_32min: hourDataDevice1[32],
      hourDataDevice1_33min: hourDataDevice1[33],
      hourDataDevice1_34min: hourDataDevice1[34],
      hourDataDevice1_35min: hourDataDevice1[35],
      hourDataDevice1_36min: hourDataDevice1[36],
      hourDataDevice1_37min: hourDataDevice1[37],
      hourDataDevice1_38min: hourDataDevice1[38],
      hourDataDevice1_39min: hourDataDevice1[39],
      hourDataDevice1_40min: hourDataDevice1[40],
      hourDataDevice1_41min: hourDataDevice1[41],
      hourDataDevice1_42min: hourDataDevice1[42],
      hourDataDevice1_43min: hourDataDevice1[43],
      hourDataDevice1_44min: hourDataDevice1[44],
      hourDataDevice1_45min: hourDataDevice1[45],
      hourDataDevice1_46min: hourDataDevice1[46],
      hourDataDevice1_47min: hourDataDevice1[47],
      hourDataDevice1_48min: hourDataDevice1[48],
      hourDataDevice1_49min: hourDataDevice1[49],
      hourDataDevice1_50min: hourDataDevice1[50],
      hourDataDevice1_51min: hourDataDevice1[51],
      hourDataDevice1_52min: hourDataDevice1[52],
      hourDataDevice1_53min: hourDataDevice1[53],
      hourDataDevice1_54min: hourDataDevice1[54],
      hourDataDevice1_55min: hourDataDevice1[55],
      hourDataDevice1_56min: hourDataDevice1[56],
      hourDataDevice1_57min: hourDataDevice1[57],
      hourDataDevice1_58min: hourDataDevice1[58],
      hourDataDevice1_59min: hourDataDevice1[59],

      hourDataDevice2_0min: hourDataDevice2[0],
      hourDataDevice2_1min: hourDataDevice2[1],
      hourDataDevice2_2min: hourDataDevice2[2],
      hourDataDevice2_3min: hourDataDevice2[3],
      hourDataDevice2_4min: hourDataDevice2[4],
      hourDataDevice2_5min: hourDataDevice2[5],
      hourDataDevice2_6min: hourDataDevice2[6],
      hourDataDevice2_7min: hourDataDevice2[7],
      hourDataDevice2_8min: hourDataDevice2[8],
      hourDataDevice2_9min: hourDataDevice2[9],
      hourDataDevice2_10min: hourDataDevice2[10],
      hourDataDevice2_11min: hourDataDevice2[11],
      hourDataDevice2_12min: hourDataDevice2[12],
      hourDataDevice2_13min: hourDataDevice2[13],
      hourDataDevice2_14min: hourDataDevice2[14],
      hourDataDevice2_15min: hourDataDevice2[15],
      hourDataDevice2_16min: hourDataDevice2[16],
      hourDataDevice2_17min: hourDataDevice2[17],
      hourDataDevice2_18min: hourDataDevice2[18],
      hourDataDevice2_19min: hourDataDevice2[19],
      hourDataDevice2_20min: hourDataDevice2[20],
      hourDataDevice2_21min: hourDataDevice2[21],
      hourDataDevice2_22min: hourDataDevice2[22],
      hourDataDevice2_23min: hourDataDevice2[23],
      hourDataDevice2_24min: hourDataDevice2[24],
      hourDataDevice2_25min: hourDataDevice2[25],
      hourDataDevice2_26min: hourDataDevice2[26],
      hourDataDevice2_27min: hourDataDevice2[27],
      hourDataDevice2_28min: hourDataDevice2[28],
      hourDataDevice2_29min: hourDataDevice2[29],
      hourDataDevice2_30min: hourDataDevice2[30],
      hourDataDevice2_31min: hourDataDevice2[31],
      hourDataDevice2_32min: hourDataDevice2[32],
      hourDataDevice2_33min: hourDataDevice2[33],
      hourDataDevice2_34min: hourDataDevice2[34],
      hourDataDevice2_35min: hourDataDevice2[35],
      hourDataDevice2_36min: hourDataDevice2[36],
      hourDataDevice2_37min: hourDataDevice2[37],
      hourDataDevice2_38min: hourDataDevice2[38],
      hourDataDevice2_39min: hourDataDevice2[39],
      hourDataDevice2_40min: hourDataDevice2[40],
      hourDataDevice2_41min: hourDataDevice2[41],
      hourDataDevice2_42min: hourDataDevice2[42],
      hourDataDevice2_43min: hourDataDevice2[43],
      hourDataDevice2_44min: hourDataDevice2[44],
      hourDataDevice2_45min: hourDataDevice2[45],
      hourDataDevice2_46min: hourDataDevice2[46],
      hourDataDevice2_47min: hourDataDevice2[47],
      hourDataDevice2_48min: hourDataDevice2[48],
      hourDataDevice2_49min: hourDataDevice2[49],
      hourDataDevice2_50min: hourDataDevice2[50],
      hourDataDevice2_51min: hourDataDevice2[51],
      hourDataDevice2_52min: hourDataDevice2[52],
      hourDataDevice2_53min: hourDataDevice2[53],
      hourDataDevice2_54min: hourDataDevice2[54],
      hourDataDevice2_55min: hourDataDevice2[55],
      hourDataDevice2_56min: hourDataDevice2[56],
      hourDataDevice2_57min: hourDataDevice2[57],
      hourDataDevice2_58min: hourDataDevice2[58],
      hourDataDevice2_59min: hourDataDevice2[59],

      hourDataDevice3_0min: hourDataDevice3[0],
      hourDataDevice3_1min: hourDataDevice3[1],
      hourDataDevice3_2min: hourDataDevice3[2],
      hourDataDevice3_3min: hourDataDevice3[3],
      hourDataDevice3_4min: hourDataDevice3[4],
      hourDataDevice3_5min: hourDataDevice3[5],
      hourDataDevice3_6min: hourDataDevice3[6],
      hourDataDevice3_7min: hourDataDevice3[7],
      hourDataDevice3_8min: hourDataDevice3[8],
      hourDataDevice3_9min: hourDataDevice3[9],
      hourDataDevice3_10min: hourDataDevice3[10],
      hourDataDevice3_11min: hourDataDevice3[11],
      hourDataDevice3_12min: hourDataDevice3[12],
      hourDataDevice3_13min: hourDataDevice3[13],
      hourDataDevice3_14min: hourDataDevice3[14],
      hourDataDevice3_15min: hourDataDevice3[15],
      hourDataDevice3_16min: hourDataDevice3[16],
      hourDataDevice3_17min: hourDataDevice3[17],
      hourDataDevice3_18min: hourDataDevice3[18],
      hourDataDevice3_19min: hourDataDevice3[19],
      hourDataDevice3_20min: hourDataDevice3[20],
      hourDataDevice3_21min: hourDataDevice3[21],
      hourDataDevice3_22min: hourDataDevice3[22],
      hourDataDevice3_23min: hourDataDevice3[23],
      hourDataDevice3_24min: hourDataDevice3[24],
      hourDataDevice3_25min: hourDataDevice3[25],
      hourDataDevice3_26min: hourDataDevice3[26],
      hourDataDevice3_27min: hourDataDevice3[27],
      hourDataDevice3_28min: hourDataDevice3[28],
      hourDataDevice3_29min: hourDataDevice3[29],
      hourDataDevice3_30min: hourDataDevice3[30],
      hourDataDevice3_31min: hourDataDevice3[31],
      hourDataDevice3_32min: hourDataDevice3[32],
      hourDataDevice3_33min: hourDataDevice3[33],
      hourDataDevice3_34min: hourDataDevice3[34],
      hourDataDevice3_35min: hourDataDevice3[35],
      hourDataDevice3_36min: hourDataDevice3[36],
      hourDataDevice3_37min: hourDataDevice3[37],
      hourDataDevice3_38min: hourDataDevice3[38],
      hourDataDevice3_39min: hourDataDevice3[39],
      hourDataDevice3_40min: hourDataDevice3[40],
      hourDataDevice3_41min: hourDataDevice3[41],
      hourDataDevice3_42min: hourDataDevice3[42],
      hourDataDevice3_43min: hourDataDevice3[43],
      hourDataDevice3_44min: hourDataDevice3[44],
      hourDataDevice3_45min: hourDataDevice3[45],
      hourDataDevice3_46min: hourDataDevice3[46],
      hourDataDevice3_47min: hourDataDevice3[47],
      hourDataDevice3_48min: hourDataDevice3[48],
      hourDataDevice3_49min: hourDataDevice3[49],
      hourDataDevice3_50min: hourDataDevice3[50],
      hourDataDevice3_51min: hourDataDevice3[51],
      hourDataDevice3_52min: hourDataDevice3[52],
      hourDataDevice3_53min: hourDataDevice3[53],
      hourDataDevice3_54min: hourDataDevice3[54],
      hourDataDevice3_55min: hourDataDevice3[55],
      hourDataDevice3_56min: hourDataDevice3[56],
      hourDataDevice3_57min: hourDataDevice3[57],
      hourDataDevice3_58min: hourDataDevice3[58],
      hourDataDevice3_59min: hourDataDevice3[59],

      hourDataDevice4_0min: hourDataDevice4[0],
      hourDataDevice4_1min: hourDataDevice4[1],
      hourDataDevice4_2min: hourDataDevice4[2],
      hourDataDevice4_3min: hourDataDevice4[3],
      hourDataDevice4_4min: hourDataDevice4[4],
      hourDataDevice4_5min: hourDataDevice4[5],
      hourDataDevice4_6min: hourDataDevice4[6],
      hourDataDevice4_7min: hourDataDevice4[7],
      hourDataDevice4_8min: hourDataDevice4[8],
      hourDataDevice4_9min: hourDataDevice4[9],
      hourDataDevice4_10min: hourDataDevice4[10],
      hourDataDevice4_11min: hourDataDevice4[11],
      hourDataDevice4_12min: hourDataDevice4[12],
      hourDataDevice4_13min: hourDataDevice4[13],
      hourDataDevice4_14min: hourDataDevice4[14],
      hourDataDevice4_15min: hourDataDevice4[15],
      hourDataDevice4_16min: hourDataDevice4[16],
      hourDataDevice4_17min: hourDataDevice4[17],
      hourDataDevice4_18min: hourDataDevice4[18],
      hourDataDevice4_19min: hourDataDevice4[19],
      hourDataDevice4_20min: hourDataDevice4[20],
      hourDataDevice4_21min: hourDataDevice4[21],
      hourDataDevice4_22min: hourDataDevice4[22],
      hourDataDevice4_23min: hourDataDevice4[23],
      hourDataDevice4_24min: hourDataDevice4[24],
      hourDataDevice4_25min: hourDataDevice4[25],
      hourDataDevice4_26min: hourDataDevice4[26],
      hourDataDevice4_27min: hourDataDevice4[27],
      hourDataDevice4_28min: hourDataDevice4[28],
      hourDataDevice4_29min: hourDataDevice4[29],
      hourDataDevice4_30min: hourDataDevice4[30],
      hourDataDevice4_31min: hourDataDevice4[31],
      hourDataDevice4_32min: hourDataDevice4[32],
      hourDataDevice4_33min: hourDataDevice4[33],
      hourDataDevice4_34min: hourDataDevice4[34],
      hourDataDevice4_35min: hourDataDevice4[35],
      hourDataDevice4_36min: hourDataDevice4[36],
      hourDataDevice4_37min: hourDataDevice4[37],
      hourDataDevice4_38min: hourDataDevice4[38],
      hourDataDevice4_39min: hourDataDevice4[39],
      hourDataDevice4_40min: hourDataDevice4[40],
      hourDataDevice4_41min: hourDataDevice4[41],
      hourDataDevice4_42min: hourDataDevice4[42],
      hourDataDevice4_43min: hourDataDevice4[43],
      hourDataDevice4_44min: hourDataDevice4[44],
      hourDataDevice4_45min: hourDataDevice4[45],
      hourDataDevice4_46min: hourDataDevice4[46],
      hourDataDevice4_47min: hourDataDevice4[47],
      hourDataDevice4_48min: hourDataDevice4[48],
      hourDataDevice4_49min: hourDataDevice4[49],
      hourDataDevice4_50min: hourDataDevice4[50],
      hourDataDevice4_51min: hourDataDevice4[51],
      hourDataDevice4_52min: hourDataDevice4[52],
      hourDataDevice4_53min: hourDataDevice4[53],
      hourDataDevice4_54min: hourDataDevice4[54],
      hourDataDevice4_55min: hourDataDevice4[55],
      hourDataDevice4_56min: hourDataDevice4[56],
      hourDataDevice4_57min: hourDataDevice4[57],
      hourDataDevice4_58min: hourDataDevice4[58],
      hourDataDevice4_59min: hourDataDevice4[59],

      dayDataDevice1_12am: dayDataDevice1[0],
      dayDataDevice1_1am: dayDataDevice1[1],
      dayDataDevice1_2am: dayDataDevice1[2],
      dayDataDevice1_3am: dayDataDevice1[3],
      dayDataDevice1_4am: dayDataDevice1[4],
      dayDataDevice1_5am: dayDataDevice1[5],
      dayDataDevice1_6am: dayDataDevice1[6],
      dayDataDevice1_7am: dayDataDevice1[7],
      dayDataDevice1_8am: dayDataDevice1[8],
      dayDataDevice1_9am: dayDataDevice1[9],
      dayDataDevice1_10am: dayDataDevice1[10],
      dayDataDevice1_11am: dayDataDevice1[11],
      dayDataDevice1_12pm: dayDataDevice1[12],
      dayDataDevice1_1pm: dayDataDevice1[13],
      dayDataDevice1_2pm: dayDataDevice1[14],
      dayDataDevice1_3pm: dayDataDevice1[15],
      dayDataDevice1_4pm: dayDataDevice1[16],
      dayDataDevice1_5pm: dayDataDevice1[17],
      dayDataDevice1_6pm: dayDataDevice1[18],
      dayDataDevice1_7pm: dayDataDevice1[19],
      dayDataDevice1_8pm: dayDataDevice1[20],
      dayDataDevice1_9pm: dayDataDevice1[21],
      dayDataDevice1_10pm: dayDataDevice1[22],
      dayDataDevice1_11pm: dayDataDevice1[23],

      dayDataDevice2_12am: dayDataDevice2[0],
      dayDataDevice2_1am: dayDataDevice2[1],
      dayDataDevice2_2am: dayDataDevice2[2],
      dayDataDevice2_3am: dayDataDevice2[3],
      dayDataDevice2_4am: dayDataDevice2[4],
      dayDataDevice2_5am: dayDataDevice2[5],
      dayDataDevice2_6am: dayDataDevice2[6],
      dayDataDevice2_7am: dayDataDevice2[7],
      dayDataDevice2_8am: dayDataDevice2[8],
      dayDataDevice2_9am: dayDataDevice2[9],
      dayDataDevice2_10am: dayDataDevice2[10],
      dayDataDevice2_11am: dayDataDevice2[11],
      dayDataDevice2_12pm: dayDataDevice2[12],
      dayDataDevice2_1pm: dayDataDevice2[13],
      dayDataDevice2_2pm: dayDataDevice2[14],
      dayDataDevice2_3pm: dayDataDevice2[15],
      dayDataDevice2_4pm: dayDataDevice2[16],
      dayDataDevice2_5pm: dayDataDevice2[17],
      dayDataDevice2_6pm: dayDataDevice2[18],
      dayDataDevice2_7pm: dayDataDevice2[19],
      dayDataDevice2_8pm: dayDataDevice2[20],
      dayDataDevice2_9pm: dayDataDevice2[21],
      dayDataDevice2_10pm: dayDataDevice2[22],
      dayDataDevice2_11pm: dayDataDevice2[23],

      dayDataDevice3_12am: dayDataDevice3[0],
      dayDataDevice3_1am: dayDataDevice3[1],
      dayDataDevice3_2am: dayDataDevice3[2],
      dayDataDevice3_3am: dayDataDevice3[3],
      dayDataDevice3_4am: dayDataDevice3[4],
      dayDataDevice3_5am: dayDataDevice3[5],
      dayDataDevice3_6am: dayDataDevice3[6],
      dayDataDevice3_7am: dayDataDevice3[7],
      dayDataDevice3_8am: dayDataDevice3[8],
      dayDataDevice3_9am: dayDataDevice3[9],
      dayDataDevice3_10am: dayDataDevice3[10],
      dayDataDevice3_11am: dayDataDevice3[11],
      dayDataDevice3_12pm: dayDataDevice3[12],
      dayDataDevice3_1pm: dayDataDevice3[13],
      dayDataDevice3_2pm: dayDataDevice3[14],
      dayDataDevice3_3pm: dayDataDevice3[15],
      dayDataDevice3_4pm: dayDataDevice3[16],
      dayDataDevice3_5pm: dayDataDevice3[17],
      dayDataDevice3_6pm: dayDataDevice3[18],
      dayDataDevice3_7pm: dayDataDevice3[19],
      dayDataDevice3_8pm: dayDataDevice3[20],
      dayDataDevice3_9pm: dayDataDevice3[21],
      dayDataDevice3_10pm: dayDataDevice3[22],
      dayDataDevice3_11pm: dayDataDevice3[23],

      dayDataDevice4_12am: dayDataDevice4[0],
      dayDataDevice4_1am: dayDataDevice4[1],
      dayDataDevice4_2am: dayDataDevice4[2],
      dayDataDevice4_3am: dayDataDevice4[3],
      dayDataDevice4_4am: dayDataDevice4[4],
      dayDataDevice4_5am: dayDataDevice4[5],
      dayDataDevice4_6am: dayDataDevice4[6],
      dayDataDevice4_7am: dayDataDevice4[7],
      dayDataDevice4_8am: dayDataDevice4[8],
      dayDataDevice4_9am: dayDataDevice4[9],
      dayDataDevice4_10am: dayDataDevice4[10],
      dayDataDevice4_11am: dayDataDevice4[11],
      dayDataDevice4_12pm: dayDataDevice4[12],
      dayDataDevice4_1pm: dayDataDevice4[13],
      dayDataDevice4_2pm: dayDataDevice4[14],
      dayDataDevice4_3pm: dayDataDevice4[15],
      dayDataDevice4_4pm: dayDataDevice4[16],
      dayDataDevice4_5pm: dayDataDevice4[17],
      dayDataDevice4_6pm: dayDataDevice4[18],
      dayDataDevice4_7pm: dayDataDevice4[19],
      dayDataDevice4_8pm: dayDataDevice4[20],
      dayDataDevice4_9pm: dayDataDevice4[21],
      dayDataDevice4_10pm: dayDataDevice4[22],
      dayDataDevice4_11pm: dayDataDevice4[23],

      monthDataDevice1_1: monthDataDevice1[1],
      monthDataDevice1_2: monthDataDevice1[2],
      monthDataDevice1_3: monthDataDevice1[3],
      monthDataDevice1_4: monthDataDevice1[4],
      monthDataDevice1_5: monthDataDevice1[5],
      monthDataDevice1_6: monthDataDevice1[6],
      monthDataDevice1_7: monthDataDevice1[7],
      monthDataDevice1_8: monthDataDevice1[8],
      monthDataDevice1_9: monthDataDevice1[9],
      monthDataDevice1_10: monthDataDevice1[10],
      monthDataDevice1_11: monthDataDevice1[11],
      monthDataDevice1_12: monthDataDevice1[12],
      monthDataDevice1_13: monthDataDevice1[13],
      monthDataDevice1_14: monthDataDevice1[14],
      monthDataDevice1_15: monthDataDevice1[15],
      monthDataDevice1_16: monthDataDevice1[16],
      monthDataDevice1_17: monthDataDevice1[17],
      monthDataDevice1_18: monthDataDevice1[18],
      monthDataDevice1_19: monthDataDevice1[19],
      monthDataDevice1_20: monthDataDevice1[20],
      monthDataDevice1_21: monthDataDevice1[21],
      monthDataDevice1_22: monthDataDevice1[22],
      monthDataDevice1_23: monthDataDevice1[23],
      monthDataDevice1_24: monthDataDevice1[24],
      monthDataDevice1_25: monthDataDevice1[25],
      monthDataDevice1_26: monthDataDevice1[26],
      monthDataDevice1_27: monthDataDevice1[27],
      monthDataDevice1_28: monthDataDevice1[28],
      monthDataDevice1_29: monthDataDevice1[29],
      monthDataDevice1_30: monthDataDevice1[30],
      monthDataDevice1_31: monthDataDevice1[31],

      monthDataDevice2_1: monthDataDevice2[1],
      monthDataDevice2_2: monthDataDevice2[2],
      monthDataDevice2_3: monthDataDevice2[3],
      monthDataDevice2_4: monthDataDevice2[4],
      monthDataDevice2_5: monthDataDevice2[5],
      monthDataDevice2_6: monthDataDevice2[6],
      monthDataDevice2_7: monthDataDevice2[7],
      monthDataDevice2_8: monthDataDevice2[8],
      monthDataDevice2_9: monthDataDevice2[9],
      monthDataDevice2_10: monthDataDevice2[10],
      monthDataDevice2_11: monthDataDevice2[11],
      monthDataDevice2_12: monthDataDevice2[12],
      monthDataDevice2_13: monthDataDevice2[13],
      monthDataDevice2_14: monthDataDevice2[14],
      monthDataDevice2_15: monthDataDevice2[15],
      monthDataDevice2_16: monthDataDevice2[16],
      monthDataDevice2_17: monthDataDevice2[17],
      monthDataDevice2_18: monthDataDevice2[18],
      monthDataDevice2_19: monthDataDevice2[19],
      monthDataDevice2_20: monthDataDevice2[20],
      monthDataDevice2_21: monthDataDevice2[21],
      monthDataDevice2_22: monthDataDevice2[22],
      monthDataDevice2_23: monthDataDevice2[23],
      monthDataDevice2_24: monthDataDevice2[24],
      monthDataDevice2_25: monthDataDevice2[25],
      monthDataDevice2_26: monthDataDevice2[26],
      monthDataDevice2_27: monthDataDevice2[27],
      monthDataDevice2_28: monthDataDevice2[28],
      monthDataDevice2_29: monthDataDevice2[29],
      monthDataDevice2_30: monthDataDevice2[30],
      monthDataDevice2_31: monthDataDevice2[31],

      monthDataDevice3_1: monthDataDevice3[1],
      monthDataDevice3_2: monthDataDevice3[2],
      monthDataDevice3_3: monthDataDevice3[3],
      monthDataDevice3_4: monthDataDevice3[4],
      monthDataDevice3_5: monthDataDevice3[5],
      monthDataDevice3_6: monthDataDevice3[6],
      monthDataDevice3_7: monthDataDevice3[7],
      monthDataDevice3_8: monthDataDevice3[8],
      monthDataDevice3_9: monthDataDevice3[9],
      monthDataDevice3_10: monthDataDevice3[10],
      monthDataDevice3_11: monthDataDevice3[11],
      monthDataDevice3_12: monthDataDevice3[12],
      monthDataDevice3_13: monthDataDevice3[13],
      monthDataDevice3_14: monthDataDevice3[14],
      monthDataDevice3_15: monthDataDevice3[15],
      monthDataDevice3_16: monthDataDevice3[16],
      monthDataDevice3_17: monthDataDevice3[17],
      monthDataDevice3_18: monthDataDevice3[18],
      monthDataDevice3_19: monthDataDevice3[19],
      monthDataDevice3_20: monthDataDevice3[20],
      monthDataDevice3_21: monthDataDevice3[21],
      monthDataDevice3_22: monthDataDevice3[22],
      monthDataDevice3_23: monthDataDevice3[23],
      monthDataDevice3_24: monthDataDevice3[24],
      monthDataDevice3_25: monthDataDevice3[25],
      monthDataDevice3_26: monthDataDevice3[26],
      monthDataDevice3_27: monthDataDevice3[27],
      monthDataDevice3_28: monthDataDevice3[28],
      monthDataDevice3_29: monthDataDevice3[29],
      monthDataDevice3_30: monthDataDevice3[30],
      monthDataDevice3_31: monthDataDevice3[31],

      monthDataDevice4_1: monthDataDevice4[1],
      monthDataDevice4_2: monthDataDevice4[2],
      monthDataDevice4_3: monthDataDevice4[3],
      monthDataDevice4_4: monthDataDevice4[4],
      monthDataDevice4_5: monthDataDevice4[5],
      monthDataDevice4_6: monthDataDevice4[6],
      monthDataDevice4_7: monthDataDevice4[7],
      monthDataDevice4_8: monthDataDevice4[8],
      monthDataDevice4_9: monthDataDevice4[9],
      monthDataDevice4_10: monthDataDevice4[10],
      monthDataDevice4_11: monthDataDevice4[11],
      monthDataDevice4_12: monthDataDevice4[12],
      monthDataDevice4_13: monthDataDevice4[13],
      monthDataDevice4_14: monthDataDevice4[14],
      monthDataDevice4_15: monthDataDevice4[15],
      monthDataDevice4_16: monthDataDevice4[16],
      monthDataDevice4_17: monthDataDevice4[17],
      monthDataDevice4_18: monthDataDevice4[18],
      monthDataDevice4_19: monthDataDevice4[19],
      monthDataDevice4_20: monthDataDevice4[20],
      monthDataDevice4_21: monthDataDevice4[21],
      monthDataDevice4_22: monthDataDevice4[22],
      monthDataDevice4_23: monthDataDevice4[23],
      monthDataDevice4_24: monthDataDevice4[24],
      monthDataDevice4_25: monthDataDevice4[25],
      monthDataDevice4_26: monthDataDevice4[26],
      monthDataDevice4_27: monthDataDevice4[27],
      monthDataDevice4_28: monthDataDevice4[28],
      monthDataDevice4_29: monthDataDevice4[29],
      monthDataDevice4_30: monthDataDevice4[30],
      monthDataDevice4_31: monthDataDevice4[31],

    }
  )
})

router.get('/contacts', (req, res) => {
  res.render('contacts')
})

module.exports = router
