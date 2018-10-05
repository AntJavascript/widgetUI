import {wtDom} from '../common/utils';
/*
 * @params options {Object} 必须
*/
function Alert (params) {
  var defaults = {
    title: '',
    content: '',
    btns: [],
    zIndex: 100
  };
  var options = Object.assign(defaults, params);
  var Alert = wtDom.create('div');
  Alert.id = 'nvx-Alert';
  // Alert.className = 'animated fadeInUp';
  // 如果title不为空
  if (options.title !== '') {
    var title = wtDom.create();
    title.className = 'title';
    title.innerText = options.title;
    Alert.appendChild(title);
  }
  // 显示内容
  var content = wtDom.create();
  content.className = 'content';
  content.innerText = options.content;
  Alert.appendChild(content);
  // 显示btn
  var btns = wtDom.create();
  btns.className = 'nvx-Alert-btns';
  options.btns.forEach((item, index) => {
    var btn = wtDom.create();
    btn.className = 'nvx-Alert-btn';
    btn.innerText = item.text;
    btn.addEventListener('click', function () {
      // Alert.className = 'animated fadeOut';
      // mask.className = 'animated fadeOut';
      wtDom.del(mask);
      wtDom.del(Alert);
      item.handle(index);
    });
    btns.appendChild(btn);
  });
  Alert.appendChild(btns);
  Alert.style.zIndex = options.zIndex + 1;
  // 添加Alert
  document.body.appendChild(Alert);
  // 遮罩层
  var mask = wtDom.create();
  // mask.className = 'nvx-alert-mask animated fadeInUp';
  mask.className = 'nvx-alert-mask';
  mask.style.zIndex = options.zIndex;
  mask.addEventListener('click', function () {
    if (options.btns.length === 0 ) {
      wtDom.del(mask);
      wtDom.del(Alert);
    }
  });
  // 添加遮罩层
  document.body.appendChild(mask);
}
export default Alert;
