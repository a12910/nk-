function bubbleSort(arr) {　　
  var len = arr.length;　
  console.log(arr)　
  for (var i = 0; i < len; i++) {　　　　
    for (var j = 0; j < len - 1 - i; j++) {　　　　　　
      if (data_sort(arr[j], arr[j + 1])) { //相邻元素两两对比　
        var temp = arr[j + 1]; //元素交换
        arr[j + 1] = arr[j];　　　　　　　　
        arr[j] = temp;　　　　　　
      }　　　　　　
    }
  }　　
  // console.log(arr)      
  return arr;
}

function data_sort(x, y) {
var a = x.time.normal
var b = y.time.normal
  if (a.year != b.year) {
    return a.year < b.year;
  } else if (a.month != b.month) {
    return a.month < b.month;
  } else if (a.day != b.day) {
    return a.day < b.day
  } else if (a.hour != b.hour) {
    return a.hour < b.hour;
  } else if (a.minute != b.minute) {
    return a.minute < b.minute
  } else {
    return true;
  }

}

module.exports.sort = bubbleSort