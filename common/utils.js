const utils = {
  // 判断 空字符串 undefined null
  isDNE: function (s) {
    if (s === '' || s === undefined || s === null) {
      return true;
    } else {
      return false;
    }
  },
  // 获取地址栏参数
  queryString: () => {
    // 如果没有参数，返回false
    if (window.location.search === '') {
      return false;
    }
    // 获取地址栏参数部分
    var search = window.location.search.substr(1, window.location.search.length);
    var data = {};
    // 以 ‘&’符号分割多个参数
    search.split('&').forEach((itme) => {
      var val = itme.split('=');
      data[val[0]] = val[1];
    });
    return data;
  },
  // 把数字金额变成千分位的格式
  accountFormat: function (account) {
    var operation = ''; // 操作符，为了显示负数
    // 如果参数非法，return 0.00
    if (account === '' || account === undefined || isNaN(account)) {
      return '￥0.00';
    } else {
      // 分割整数和小数部分
      var accountStr = account.toString().split('.');
      // 取出整数部分 保持到变量 ‘intNumber’
      var intNumber = accountStr[0];
      // 如果参数小于0，操作符变成 负 ‘-’
      if (account < 0) {
        operation = '-';
        intNumber = intNumber.substr(1, intNumber.length);
      }
      var arr = []; // 千分位结果数组
      intNumber.split('').reverse().forEach((item, index) => {
        // 如果是第三位数上，就新增一个逗号 ‘,’
        if (index !== 0 && index % 3 === 0) {
          arr.push(',');
        }
        arr.push(item);
      });
    }
    /*
      * 返回结果
      * 先翻转数组，然后拼接小数部分
    */
    return '￥' + operation + arr.reverse().join('') + (accountStr[1] > 0 ? '.' + accountStr[1] : '.00');
  },
  // 数组简单去重
  symbloArr: function (arr) {
    //  利用数组简单去重
    var setMap = new Set();
    arr.forEach((item, index) => {
      setMap.add(item);
    });
    return setMap;
  },
  // 倒计时
  countDown: function (date) {
    if (date === '' || date === undefined) {
      return false;
    }
    // 获取未来时间的毫秒数
    var future = new Date(date).getTime();
    // 获取当前时间的毫秒数
    var now = new Date().getTime();
    // 计算剩余天数
    var countDay = (future - now) / (24 * 60 * 60 * 1000);
    // 截图天数的小数部分
    var countHour = countDay.toString().split('.')[1];
    // 计算剩余小时
    countHour = (('0.' + countHour) * 24);
    // 截图小时的小数部分
    var countMinute = countHour.toString().split('.')[1];
    // 计算剩余分钟
    countMinute = ('0.' + countMinute) * 60;
    // 截图分钟的小数部分
    var countSecond = countMinute.toString().split('.')[1];
    // 计算剩余秒
    countSecond = ('0.' + countSecond) * 60;
    // 返回时间
    return {
      day: parseInt(countDay),
      hour: parseInt(countHour),
      minute: parseInt(countMinute),
      second: parseInt(countSecond),
      text: `${parseInt(countDay)}天${parseInt(countHour)}小时${parseInt(countMinute)}分钟${parseInt(countSecond)}秒`
    };
  },
  // 获取当前时间
  getcurrentDate: function (time, type) {
    var date = '';
    if (time === '' || time === undefined) {
      date = new Date();
    } else {
      // 当前时间
      if (time > 0 || time < 0  || time === 0 ) {
        var t = parseInt(time);
        date = new Date(t);
      } else {
        date = new Date(time);
      }
    }
    // 获取年份
    var year = date.getFullYear();
    // 获取月份
    var month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + '' + (date.getMonth() + 1);
    // 获取今天是几号
    var day = date.getDate() >= 10 ? date.getDate() : '0' + '' + date.getDate();
    // 获取小时
    var hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    // 获取分钟
    var minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    // 获取秒数
    var second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    // 返回格式日期
    if (type === 'date') {
      return year + '-' + month + '-' + day;
    } else {
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
  },
  // 压缩图片
  canvasCompress: function (imgFile, type, cb, ratios) {
    // 如果压缩比例参数不存 就默认0.5
    var ratio = '';
    if (ratios === '' || ratios === null || isNaN(ratios)) {
      ratio = 0.5; // 压缩为原来的多少(百分比)
    } else {
      ratio = ratios; // 压缩为原来的多少(百分比)
    }
    var width = imgFile.width;
    var height = imgFile.height;
    // 创建canvas标签，用于压缩图片
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '100';
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
    var point = canvas.getContext('2d');
    // 在canvas上面绘制图片
    point.drawImage(imgFile, 0, 0);
    try {
      // 压缩图片为blob
      canvas.toBlob(function (blob) {
        cb && cb(blob);
      }, type, ratio);
    } catch (e) {
      // 如果不支持toBlob方法，就采用base64图片压缩
      cb && cb(dataURLtoBlob(canvas.toDataURL(type, ratio)));
    }
    // 把base64 转换为 blob
    function dataURLtoBlob (dataurl) {
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    }
  }
};
const wtDom = {
  // 创建DOM节点
  create: function (node) {
    if (utils.isDNE(node)) {
      node = 'div';
    }
    var dom = document.createElement(node);
    return dom;
  },
  // 删除DOM节点
  del: function (node) {
    if (utils.isDNE(node)) {
      return;
    }
    var dom = document.body.removeChild(node);
    return dom;
  }
};
export {
  utils,
  wtDom
};
