// request('./../assets/MoveF/velocity.js');
// @import url("./../assets/MoveF/velocity.js");
/*  封装方法库 */

/* 运动 */


//distance:距离 func:回调  from:往哪个方向走

export function bestSale(obj,value) {
    Velocity(obj, {
      left: value
    }, 600, [500, 20]);
}

//获取样式封装
export function getStyle(element, attr) { //IE写法
  if (element.currentStyle) {
    return element.currentStyle[attr]; //标准
  } else {
    return getComputedStyle(element, false)[attr];
  }
}

//导出
//深复制（帮助v-for实时更新）
export function copyArr(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i])
  }
  return res
}
// module.exports =getStyle();
export default {
  bestSale,
  getStyle,
  copyArr
}
