const keys = [
  ['`', 'ё', 'Backquote', 'Backquote'],
  ['1', '1', 'Digit1', 'Digit1'],
  ['2', '2', 'Digit2', 'Digit2'],
  ['3', '3', 'Digit3', 'Digit3'],
  ['4', '4', 'Digit4', 'Digit4'],
  ['5', '5', 'Digit5', 'Digit5'],
  ['6', '6', 'Digit6', 'Digit6'],
  ['7', '7', 'Digit7', 'Digit7'],
  ['8', '8', 'Digit8', 'Digit8'],
  ['9', '9', 'Digit9', 'Digit9'],
  ['0', '0', 'Digit0', 'Digit0'],
  ['-', '-', 'Minus', 'Minus'],
  ['=', '=', 'Equal', 'Equal'],
  ['Backspace', 'Backspace', 'Backspace', 'Backspace'],
  ['Tab', 'Tab', 'Tab', 'Tab'],
  ['q', 'й', 'KeyQ', 'KeyQ'],
  ['w', 'ц', 'KeyW', 'KeyW'],
  ['e', 'у', 'KeyE', 'KeyE'],
  ['r', 'к', 'KeyR', 'KeyR'],
  ['t', 'е', 'KeyT', 'KeyT'],
  ['y', 'н', 'KeyY', 'KeyY'],
  ['u', 'г', 'KeyU', 'KeyU'],
  ['i', 'ш', 'KeyI', 'KeyI'],
  ['o', 'щ', 'KeyO', 'KeyO'],
  ['p', 'з', 'KeyP', 'KeyP'],
  ['[', 'х', 'BracketLeft', 'BracketLeft'],
  [']', 'ъ', 'BracketRight', 'BracketRight'],
  ['\\', '\\', 'Backslash', 'Backslash'],
  ['Del', 'Del', 'Delete', 'Delete'],
  ['Caps Lock', 'Caps Lock', 'CapsLock', 'CapsLock'],
  ['a', 'ф', 'KeyA', 'KeyA'],
  ['s', 'ы', 'KeyS', 'KeyS'],
  ['d', 'в', 'KeyD', 'KeyD'],
  ['f', 'а', 'KeyF', 'KeyF'],
  ['g', 'п', 'KeyG', 'KeyG'],
  ['h', 'р', 'KeyH', 'KeyH'],
  ['j', 'о', 'KeyJ', 'KeyJ'],
  ['k', 'л', 'KeyK', 'KeyK'],
  ['l', 'д', 'KeyL', 'KeyL'],
  [';', 'ж', 'Semicolon', 'Semicolon'],
  ["'", 'э', 'Quote', 'Quote'],
  ['Enter', 'Enter', 'Enter', 'Enter'],
  ['Shift', 'Shift', 'ShiftLeft', 'ShiftLeft'],
  ['z', 'я', 'KeyZ', 'KeyZ'],
  ['x', 'ч', 'KeyX', 'KeyX'],
  ['c', 'с', 'KeyC', 'KeyC'],
  ['v', 'м', 'KeyV', 'KeyV'],
  ['b', 'и', 'KeyB', 'KeyB'],
  ['n', 'т', 'KeyN', 'KeyN'],
  ['m', 'ь', 'KeyM', 'KeyM'],
  [',', 'б', 'Comma', ','],
  ['.', 'ю', 'Period', 'Period'],
  ['/', '.', 'Slash', 'Slash'],
  ['▲', '▲', 'ArrowUp', 'ArrowUp'],
  ['Shift', 'Shift', 'ShiftLeft', 'ShiftLeft'],
  ['Ctrl', 'Ctrl', 'ControlLeft', 'ControlLeft'],
  ['Alt', 'Alt', 'AltLeft', 'AltLeft'],
  [' ', ' ', 'Space', 'Space'],
  ['◄', '◄', 'ArrowLeft', 'ArrowLeft'],
  ['▼', '▼', 'ArrowDown', 'ArrowDown'],
  ['►', '►', 'ArrowRight', 'ArrowRight'],
  ['Ctrl', 'Ctrl', 'ControlLeft', 'ControlLeft'],
  ];

document.addEventListener('DOMContentLoaded', () => {
  const title = document.createElement('h1');
  title.innerText = 'This keyboard was created on Windows. \n To switch the language, press left shift + alt';
  document.body.append(title);
  const input = document.createElement('textarea');
  input.type = 'text';
  input.id = 'text';
  document.body.appendChild(input);
  input.focus();
  input.addEventListener('blur', function() {
    setTimeout(() => input.focus(), 0);
  });
  
  input.addEventListener('keydown', function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      const start = this.selectionStart;
      this.value = this.value.slice(0, start) + '\n' + this.value.slice(this.selectionEnd);
      this.selectionEnd = start + 1;
    }
  });
  
  const keyboard = document.createElement('div');
  keyboard.id = 'keyboard';
  document.body.appendChild(keyboard);
  
  let shiftPressed = false;
  let altPressed = false;
  let capsPressed = false;
  let capsLockOn = false;
  let lang = 0;
  
  keys.forEach((key) => {
    const keyElement = document.createElement('button');
    keyElement.innerHTML = key[lang];
    keyElement.classList.add('key');
    keyElement.dataset.key = key[lang];
    keyElement.addEventListener('mousedown', (event) => {
    const key = event.target.dataset.key;
    event.preventDefault();
    if (key === 'Backspace') {
      input.value = input.value.slice(0, -1);
    } else if (key === 'Enter') {
      const start = input.selectionStart;
      input.value = input.value.slice(0, start) + '\n' + input.value.slice(input.selectionEnd);
      input.selectionEnd = start + 1;
    } else if (key === 'Shift') {
      shiftPressed = true;
    } else if (key === 'Alt') {
      altPressed = true;
      if (shiftPressed) {
        lang = 1 - lang;
        keys.forEach((key, i) => {
          const keyElement = document.querySelectorAll('.key')[i];
          keyElement.innerHTML = key[lang];
          keyElement.dataset.key = key[lang];
        });
      }
    } else if (key === 'Caps Lock') {
      capsLockOn = !capsLockOn;
      const langIndex = lang;
      const upperCase = capsLockOn;
      if (capsLockOn) keyElement.classList.add('active');
      if (!capsLockOn) keyElement.classList.remove('active');
      keys.forEach((key, i) => {
        const keyElement = document.querySelectorAll('.key')[i];
        keyElement.innerHTML = upperCase ? key[langIndex].toUpperCase() : key[langIndex].toLowerCase();
        keyElement.dataset.key = key[langIndex];
      });
    } else if (key === 'Tab') {
      event.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;
      input.value = input.value.slice(0, start) + '  ' + input.value.slice(end);
      input.selectionStart = input.selectionEnd = start + 2;
    } else if (key === 'Ctrl') {
      ctrlPressed = true;
    } else if (key === 'Del') {
      deleteSelectionOrCharacter();
    } else {
      const letter = (capsLockOn || shiftPressed) ? key.toUpperCase() : key.toLowerCase();
      input.value += letter;
    } 
  });

  function deleteSelectionOrCharacter() {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === end) {
      input.value = input.value.slice(0, start) + input.value.slice(start + 1);
      input.selectionStart = input.selectionEnd = start;
    } else {
      input.value = input.value.slice(0, start) + input.value.slice(end);
      input.selectionStart = input.selectionEnd = start;
    }
  }

  keyElement.addEventListener('mouseup', (event) => {
    const key = event.target.dataset.key;
    if (key === 'Shift') {
      shiftPressed = false;
    } else if (key === 'Alt') {
      altPressed = false;
    }
  });

  keyboard.appendChild(keyElement);
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    if (input.selectionStart > 0) {
      input.selectionStart -= 1;
      input.selectionEnd = input.selectionStart;
    }
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    if (input.selectionEnd < input.value.length) {
      input.selectionEnd += 1;
      input.selectionStart = input.selectionEnd;
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    const prevLineIndex = input.value.lastIndexOf('\n', input.selectionStart - 1);
    if (prevLineIndex !== -1) {
      input.selectionEnd = prevLineIndex;
      const currLineOffset = input.selectionStart - prevLineIndex;
      input.selectionStart = prevLineIndex + Math.min(currLineOffset, input.value.length - prevLineIndex - 1);
    } else {
      input.selectionEnd = 0;
      input.selectionStart = 0;
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    const nextLineIndex = input.value.indexOf('\n', input.selectionEnd);
    if (nextLineIndex !== -1) {
      input.selectionStart = nextLineIndex + 1;
      const currLineOffset = input.selectionEnd - (input.value.lastIndexOf('\n', input.selectionEnd - 1) + 1);
      input.selectionEnd = input.selectionStart + Math.min(currLineOffset, input.value.length - input.selectionStart);
    } else {
      input.selectionEnd = input.value.length;
      input.selectionStart = input.selectionEnd;
    }
  }
});
document.addEventListener('keydown', (event) => {
  if (event.code === 'ShiftLeft') {
    shiftPressed = true;
    updateKeys();
  } else if (event.code === 'AltLeft') {
    altPressed = true;
    if (shiftPressed) {
      lang = 1 - lang;
      updateKeys();
    }
  } else if (event.key === 'Tab') {
    event.preventDefault();
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const spaces = ' '.repeat(2);
    input.value = input.value.substring(0, start) + spaces + input.value.substring(end);
    input.selectionStart = input.selectionEnd = start + spaces.length;
  } if (event.key === 'CapsLock') {
    const keyValue = event.key;
    capsPressed = !capsPressed;
    updateKeys();
    if (keyValue === 'CapsLock') {
      capsLockOn = !capsLockOn;
      const langIndex = lang;
      const upperCase = (capsLockOn && !shiftPressed) || (!capsLockOn && shiftPressed);
      keys.forEach((key, i) => {
        const keyElement = document.querySelectorAll('.key')[i];
        keyElement.innerHTML = upperCase ? key[langIndex].toUpperCase() : key[langIndex].toLowerCase();
        keyElement.dataset.key = key[langIndex];
      });
    } else {
      const letter = (capsLockOn || shiftPressed) ? keyValue.toUpperCase() : keyValue.toLowerCase();
      input.value += letter;
    }
  }     
   else {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    let value = input.value;
    const key = event.key;
     if (key === 'Tab') {
      event.preventDefault();
      const spaces = '  ';
      input.value = value.substring(0, start) + spaces + value.substring(end);
      input.selectionStart = input.selectionEnd = start + spaces.length;
    }
  }
});
document.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftLeft') {
    shiftPressed = false;
    updateKeys();
  } else if (event.code === 'AltLeft') {
    altPressed = false;
    updateKeys();
  }
});

function updateKeys() {
  const keyElements = document.querySelectorAll('.key');
  keyElements.forEach((keyElement, i) => {
    const key = keys[i][lang];
    if (capsPressed) {
      keyElement.innerHTML = shiftPressed ? key.toLowerCase() : key.toUpperCase();
    } else {
      keyElement.innerHTML = shiftPressed ? key.toUpperCase() : key.toLowerCase();
    }
    keyElement.dataset.key = key;
  });
}

let isCapsLockOn = false;

document.addEventListener('keydown', (event) => {
const key = event.key;
if (key === 'CapsLock') {
  isCapsLockOn = !isCapsLockOn;
} 
});

document.addEventListener('keyup', (event) => {
const key = event.key;
const keyElement = document.querySelector(`.key[data-key='Caps Lock']`);
if (key === 'CapsLock' && isCapsLockOn) {
  keyElement.classList.add('active');
} else if (key === 'CapsLock' && !isCapsLockOn) {
  keyElement.classList.remove('active');
}
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'Shift' || key === 'Alt' || key === 'Enter') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='${key}']`);
    keyElement.classList.add('active');
  }
  
  if (key === 'Delete') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='Del']`);
    keyElement.classList.add('active');
  }

  if (key === 'Backspace' || key === 'Tab') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='${key}']`);
    keyElement.classList.add('active');
  } else if (key === 'Control') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='Ctrl']`);
    keyElement.classList.add('active');
  } else if (key === 'ArrowLeft') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='◄']`);
    keyElement.classList.add('active');
  } else if (key === 'ArrowRight') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='►']`);
    keyElement.classList.add('active');
  } else if (key === 'ArrowUp') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='▲']`);
    keyElement.classList.add('active');
  } else if (key === 'ArrowDown') {
    event.preventDefault();
    const keyElement = document.querySelector(`.key[data-key='▼']`);
    keyElement.classList.add('active');
  }
});
});