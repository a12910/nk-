function get_time() {
  var x = new Date()
  var p = {
    year: x.getFullYear(),
    month: x.getMonth(),
    day: x.getDate(),
    hour: x.getHours(),
    minute: x.getMinutes()
  }

  // var q = {
  //   year: p.year,
  //   day: get_day(p),
  //   time: x.getHours() * 60 + x.getMinutes()
  // }

  return p
}

function get_timecount(time) {
  var x = get_time()
  // console.log(time)
  // console.log(x)
  var d = 0
  // if (x.year != time.year) {
  d = (x.year - time.year) * 365 + (x.month - time.month) * 30 + x.day - time.day
  // }
  // if (time.day != x.day) {
  // var d = x.day - time.day
  d = d < 0 ? 1 : d
  if (d > 365) {
    // return parseInt(d / 365) + '年前';
    return time.year + "年" + time.month + "月"
  } else if (d > 30) {
    return time.year + "年" + time.month + "月"
  } else if (d > 0) {
    return d + '天前';
  } else {
    d = (x.hour - time.hour) * 60 + x.minute - time.minute
    // d = d < 0 ? 1 : d
    if (d > 60) {
      return parseInt(d / 60) + '个小时前';
    } else {
      return '刚刚';
    }
  }

}

function get_timecount2(time) {
  return {
    normal: time,
    exa: get_timecount(time),
    normal2: time.year + "年" + time.month + "月" + time.day + "日"
  }
}
// }

function get_day(num) {
  var y, m, d;
  var total = 0;
  var x = new Date()
  var arr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  y = num.year
  m = num.month
  d = num.day
  for (var i = 0; i < m - 1; i++) {
    total = total + arr[i];
  }




  return total
}

module.exports.get_time = get_time
module.exports.get_timecount = get_timecount
module.exports.get_timecount2 = get_timecount2