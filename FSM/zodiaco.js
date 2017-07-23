
module.exports = {
  'get_started': {
    messages: [
      'Bienvenido gatuno !!!',
      '¿Conoces tu signo del zodiaco?'
    ],
    options: [
      {text: 'shi 😻', payload: {state: 'capture_zodiac'}},
      {text: 'ño 🙀', payload: {state: 'guess_zodiac'}}
    ]
  },

  'capture_zodiac': {
    messages: [
      'Ingresa tu signo sodiacal ejemplo ✍️: leo'
    ],
    input: 'isZodiac',
    options: []
  },

  'guess_zodiac': {
    messages: [
      'Ingresa tu fecha de nacimiento ejemplo ✍️: dia/mes/año'
    ],
    input: 'isDate',
    options: []
  }
}
