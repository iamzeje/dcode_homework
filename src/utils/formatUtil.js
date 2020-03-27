import moment from 'moment';

export const getString = (str = '') => {
  if (typeof str !== 'string') {
    if (typeof str !== 'number') {
      return '';
    }
    str = str.toString();
  }

  return str;
};

export const getNumber = (num = 0) => {
  if (typeof num !== 'number') {
    if (typeof num !== 'string') {
      return;
    }

    num = Number(num);
  }

  return num;
};

export const getLocalDate = (time, format = 'YYYY.MM.DD') => {
  if (!time) {
    return '';
  }

  time = moment(time);
  return time.format(format);
};
