export function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num);
}

export function formatNumber(value) {
  const val = (value / 1).toFixed().replace(',', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // if (type) {
  //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // } else {
  //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // }
}
export function formatNumber2(value) {
  const val = (value / 1).toFixed().replace('.', '.');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // if (type) {
  //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // } else {
  //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // }
}

export function convertDateString(inputFormat, from = 'dd/mm/yyyy', to = 'yyyy-mm-dd') {
  if (from === 'dd/mm/yyyy' && to === 'yyyy-mm-dd') {
    const d = inputFormat.split('/');
    const dateString = `${d[2]}-${d[1]}-${d[0]}`;
    return dateString;
  }
}

export function convertMilliSecondsToDateFormat(milli, format = 'DD/MM/YYYY') {
  const date = new Date(milli); // Date 2011-05-09T06:08:45.178Z
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`;
  } else if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  }
}

export function convertDBDateTime(input) {
  const dt = input.split(' ');
  let dateTime = dt[0].substr(0, 10).split('-');
  dateTime = dateTime[2] + '-' + dateTime[1] + '-' + dateTime[0];
  const result = dt[1] + ' ' + dateTime;
  return result;
}
export function formatPhone(input) {
  const text = input.replace(/(\d\d\d\d)(\d\d)(\d\d)(\d\d)/, '$1 $2 $3 $4');
  return text;
}
export function formatPhone2(input) {
  const text = input.replace(/(\d\d\d\d)(\d\d\d)(\d\d\d)/, '$1 $2 $3');
  return text;
}

export function setTradCode(namePacake = 'vbee', number = '0988123456', userName) {
  const radomNumber = Math.floor(Math.random() * 999);
  var day = new Date().getDate().toString();
  var month = (new Date().getMonth() + 1).toString();
  var year = new Date().getFullYear().toString().slice(2);
  var hour = new Date().getHours().toString();
  var min = new Date().getMinutes().toString();
  const stringDate = day + month + year + hour + min;
  const string = `${namePacake}${stringDate}_${radomNumber}`;
  if (namePacake !== undefined) {
    return string.toUpperCase();
  }
  return userName;
}

export function setTypeClass(active) {
  switch (active) {
    case 0:
      return 'info';
    case 1:
      return 'success';
    case 2:
      return 'success';
    default:
      return 'warning';
  }
}

export function setStringActive(active) {
  switch (active) {
    case 0:
      return 'Chưa thanh toán';
    case 1:
      return 'Thành công';
    case 2:
      return 'Thành công';
    default:
      return 'Không thành công';
  }
}
export function setStringPackage(name) {
  if (name === '') {
    return name;
  } else {
    switch (name) {
      case 'Gói TTS1':
        return 'TTS1';
      case 'Gói TTS7':
        return 'TTS7';
      case 'Gói TTS30':
        return 'TTS30';
      case 'Gói TTSVIP30':
        return 'TTSVIP30';
      case 'Gói TTSVIP45':
        return 'TTSVIP45';
      case 'Gói TTSVIP60':
        return 'TTSVIP60';
      case 'Gói miễn phí':
        return 'miễn phí';
    }
  }
}

export function changeToSlug(title = 'vbee', replace = '_') {
  var slug = '';
  var titleLower = title.toLowerCase();
  slug = titleLower.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  slug = slug.replace(/ /gi, replace);
  slug = slug.replace(/\-\-\-\-\-/gi, replace);
  slug = slug.replace(/\-\-\-\-/gi, replace);
  slug = slug.replace(/\-\-\-/gi, replace);
  slug = slug.replace(/\-\-/gi, replace);
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}

export function convertDate(inputFormat, format = 'DD/MM/YYYY') {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  };
  var d = new Date(inputFormat);
  if (format === 'DD/MM/YYYY') {
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  } else if (format === 'YYYY-MM-DD') {
    return [pad(d.getFullYear()), pad(d.getMonth() + 1), d.getDate()].join('-');
  }
}

export function getMoneyByTotalChar(totalChar) {
  totalChar = Number(totalChar);
  var totalMoney = 0;
  if (totalChar <= 1000000) {
    totalMoney = (totalChar / 10) * 3;
  } else if (totalChar > 1000000 && totalChar <= 10000000) {
    totalMoney = (totalChar / 10) * 2.9;
  } else if (totalChar > 10000000 && totalChar <= 20000000) {
    totalMoney = (totalChar / 10) * 2.8;
  } else if (totalChar > 20000000 && totalChar <= 50000000) {
    totalMoney = (totalChar / 10) * 2.7;
  } else if (totalChar > 50000000 && totalChar <= 100000000) {
    totalMoney = (totalChar / 10) * 2.5;
  } else if (totalChar > 100000000 && totalChar <= 200000000) {
    totalMoney = (totalChar / 10) * 2.3;
  } else if (totalChar > 200000000 && totalChar <= 500000000) {
    totalMoney = (totalChar / 10) * 2;
  } else if (totalChar > 500000000) {
    totalMoney = (totalChar / 10) * 1.7;
  }
  return totalMoney;
}

export function setInputFilter(textBox, inputFilter) {
  ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function(event) {
    textBox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}
