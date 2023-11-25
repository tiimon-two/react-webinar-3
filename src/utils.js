const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Считаем кол-во выделений и возвращаем нужное значение
 * @param {*} count Счетчик кол-ва выделений объекта
 * @returns  {String}
 */
export function setRightPlurative(count) {
  let plurantive = 'раз';
 
  // Если кол-во выделений оканчивается на 2,3 ил 4 - возвращаем подходящий плюратив 'раза' 
  if (String(count).at(-1) == 2 || String(count).at(-1) == 3 || String(count).at(-1) == 4) {
    plurantive = 'раза';
  }

  //Числа оканчивающиеся на 12,13,14 исключения - возращаем для них 'раз'
  if (String(count).at(-2) == 1 && (String(count).at(-1) == 2 || String(count).at(-1) == 3 || String(count).at(-1) == 4)) {
    plurantive = 'раз';
  }

  return (plurantive);
}
