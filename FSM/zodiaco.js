
module.exports = {
  'get_started': {
    messages: [
      'Bienvenido gatuno !!!',
      '¿Conoces tu signo del zodiaco?'
    ],
    action: 'saveUser',
    options: [
      {text: 'shi 😻', payload: {state: 'capture_zodiac'}},
      {text: 'ño 🙀', payload: {state: 'guess_zodiac'}}
    ]
  },

  'capture_zodiac': {
    messages: [
      'Ingresa tu signo zodiacal ejemplo: piscis, cancer, etc.'
    ],
    waitInputFunction: 'inputZodiac',
    options: []
  },

  'guess_zodiac': {
    messages: [
      'Ingresa tu fecha de nacimiento ejemplo ✍️: dia/mes/año'
    ],
    waitInputFunction: 'inputDateZodiac',
    options: []
  }
}
