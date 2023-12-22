export default function DateFormat(date) {
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября' , 'Ноября', 'Декабря'];
  const formanDate = new Date(date);
  let minutes;
  if (formanDate.getMinutes() < 10) {
    minutes = '0' + formanDate.getMinutes()
  } else {
    minutes = formanDate.getMinutes();
  }
  return formanDate.getDay() + ' ' + months[formanDate.getMonth()] + ' ' + formanDate.getFullYear() + ' ' + ' в ' + formanDate.getHours() + ':' + minutes;
}