/*
 * @params msg {String} 必须  // 显示的内容
 * @params time {Number} 可选  // 显示的时间
*/
function toast (msg, time) {
  // 如果存在一个toast，不能再添加toast
  // if (document.querySelector('#nvx-toast') !== null) {
  //   return;
  // }
  if (msg === '' || msg === undefined || msg === null) {
    return;
  }
  // time参数是否为数字
  if (isNaN(time)) {
    time = 2000;
  } else {
    time = parseInt(time);
  }
  var div = document.createElement('div');
  div.innerText = msg;
  div.id = 'nvx-toast';
  document.body.appendChild(div);
  // 关闭 toast层
  setTimeout(() => {
    document.body.removeChild(div);
  }, time);
}
export default toast;
