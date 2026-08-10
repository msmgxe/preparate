import type { BankQuestion } from './types';

/**
 * Inglés · el balotario del A1.
 *
 * Un curso de idioma no se examina como uno de matemática. Aquí casi ninguna
 * pregunta pide una regla: piden reconocer **el error que comete un
 * hispanohablante**, que es distinto del que comete un francés o un chino.
 *
 * Los cuatro grandes, y el capítulo donde se atacan:
 *
 *  · Traducir estructuras que en inglés no existen — «I have 15 years»,
 *    «the people is», «I have 20 years working here».
 *  · La tercera persona del singular: la -s que se cae siempre.
 *  · El auxiliar do/does, que en español no tiene equivalente y por eso se
 *    olvida al preguntar y al negar.
 *  · Los sonidos que el español no distingue, y que cambian el significado.
 */
export const ENG: BankQuestion[] = [
  // ── A1 · Sonidos y supervivencia ──────────────────────────────────────────
  {
    chapter: 'A1 · Sonidos y supervivencia',
    stem: 'Un amigo te dice: «I need to buy a new <b>ship</b>». ¿De qué está hablando?',
    options: ['De un barco', 'De una oveja', 'De una hoja de papel', 'De un chip', 'De una tienda'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Escucha la vocal, no la escritura',
        p: 'El inglés distingue dos íes que en español son una sola. «Ship» lleva la corta y tensa.',
        m: 'ship  /ʃɪp/  → barco\nsheep /ʃiːp/ → oveja',
      },
      {
        t: 'Fíjate en que el significado cambia por completo',
        p: 'No es un matiz de acento: son dos palabras distintas, y el contexto no siempre salva la frase.',
        m: '',
      },
    ],
    concept:
      'El inglés tiene vocales que el español no distingue. Confundirlas no suena «con acento»: cambia la palabra.',
    trick:
      'La i corta (/ɪ/) es más relajada y breve que la española; la larga (/iː/) estira y sonríe. Practica el par ship–sheep hasta que te salgan distintas.',
    distractors: {
      '1': 'Esa es «sheep», con la i larga.',
      '2': 'Esa es «sheet».',
      '3': 'Esa es «chip», con otra consonante inicial.',
      '4': 'Esa es «shop», con otra vocal.',
    },
  },
  {
    chapter: 'A1 · Sonidos y supervivencia',
    stem: '¿Cuál de estos pares suena <b>igual</b> en inglés?',
    options: ['sun / son', 'bad / bed', 'think / sink', 'live / leave', 'work / walk'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Sepáralo del resto',
        p: 'Casi todos los pares son «pares mínimos»: se parecen pero no son iguales. Solo uno son homófonos de verdad.',
        m: '',
      },
      {
        t: 'Comprueba las vocales',
        p: 'Sun y son se pronuncian los dos /sʌn/. Los demás cambian de vocal o de consonante.',
        m: 'sun = son = /sʌn/\nbad /æ/ ≠ bed /e/\nthink /θ/ ≠ sink /s/',
      },
    ],
    concept:
      'Homófonos suenan igual y se escriben distinto; los pares mínimos suenan casi igual y hay que diferenciarlos. Confundir las dos cosas es lo que hace ininteligible una frase.',
    trick: 'Cuando dudes, pregúntate si cambia algún sonido. Si no cambia ninguno, son homófonos y no hay nada que practicar.',
    distractors: {
      '1': 'Cambian de vocal: /æ/ frente a /e/.',
      '2': 'Cambian de consonante: la th de think no existe en español.',
      '3': 'Cambian de vocal: /ɪ/ corta frente a /iː/ larga.',
      '4': 'Cambian de vocal por completo.',
    },
  },
  {
    chapter: 'A1 · Sonidos y supervivencia',
    stem: 'Estás en un aeropuerto y no entiendes lo que te dicen. ¿Cuál es la frase más útil para pedir que lo repitan?',
    options: [
      'Sorry, could you repeat that, please?',
      'Repeat, please.',
      'I no understand.',
      'What?',
      'Say again me, please.',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Piensa en qué hace cortés una petición en inglés',
        p: 'El inglés pide con preguntas, no con imperativos. «Could you…?» abre la puerta; el imperativo suena a orden.',
        m: '',
      },
      {
        t: 'Descarta las traducciones literales',
        p: '«I no understand» copia la negación española. En inglés se niega con don\'t: «I don\'t understand».',
        m: 'No + verbo  ✗\ndon\'t + verbo  ✓',
      },
    ],
    concept:
      'En inglés la cortesía está en la estructura, no solo en el «please». Preguntar en vez de ordenar es la diferencia entre sonar amable y sonar brusco.',
    trick: 'Aprende tres fórmulas de supervivencia enteras, sin analizarlas: «Could you repeat that?», «How do you say…?», «I don\'t understand».',
    distractors: {
      '1': 'Se entiende, pero suena a orden. Añadir «please» no lo arregla del todo.',
      '2': 'La negación es incorrecta: sería «I don\'t understand».',
      '3': 'Se usa entre amigos; en un aeropuerto suena cortante.',
      '4': 'El orden de las palabras está calcado del español.',
    },
  },
  {
    chapter: 'A1 · Sonidos y supervivencia',
    stem: 'La palabra <b>comfortable</b> tiene, en el habla real, ¿cuántas sílabas?',
    options: ['Tres', 'Cuatro', 'Cinco', 'Dos', 'Seis'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'No cuentes por las letras',
        p: 'El inglés escrito y el hablado no coinciden. Escrita parece de cuatro sílabas; hablada, se come una.',
        m: 'com·fort·a·ble  →  COMF·ta·ble',
      },
      {
        t: 'Reconoce el fenómeno',
        p: 'Las sílabas sin acento se reducen o desaparecen. Es lo que hace que el inglés hablado suene más rápido de lo que se lee.',
        m: '/ˈkʌmftəbl/  → 3 sílabas',
      },
    ],
    concept:
      'El inglés reduce las sílabas átonas. Pronunciar todas las letras es lo que delata al hispanohablante y, de paso, lo que impide reconocer la palabra al oírla.',
    trick:
      'Otras que se comen sílabas: chocolate (CHOC-late), vegetable (VEJ-table), every (EV-ry), interesting (IN-tresting).',
    distractors: {
      '1': 'Son las sílabas que se ven escritas, no las que se oyen.',
      '2': 'Ni siquiera escrita tiene cinco.',
      '3': 'Se come una sílaba, no dos.',
      '4': 'Muy lejos del habla real.',
    },
  },
  {
    chapter: 'A1 · Sonidos y supervivencia',
    stem: 'Oyes: «I <b>can\'t</b> come tomorrow». Un compañero entendió «I can come tomorrow». ¿Qué pista permite distinguirlas al oído?',
    options: [
      'La vocal cambia y «can\'t» suena más largo y marcado',
      'La t final siempre se oye con claridad',
      'El tono sube al final en la negativa',
      'No se pueden distinguir: hay que preguntar',
      'La negativa se pronuncia más rápido',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Entiende por qué es difícil',
        p: 'La t final de «can\'t» casi no se oye en habla rápida. Si esperas oírla, te quedas sin pista.',
        m: 'can\'t → la /t/ se pierde',
      },
      {
        t: 'Escucha la vocal y el peso',
        p: 'El «can» afirmativo se reduce a /kən/, casi sin vocal. El «can\'t» conserva vocal plena y va acentuado.',
        m: 'can  → /kən/  átono, rápido\ncan\'t → /kænt/ tónico, largo',
      },
      {
        t: 'Aplícalo a la frase',
        p: 'Si la palabra suena fuerte y clara, es la negativa. Si pasa desapercibida, es la afirmativa.',
        m: '',
      },
      {
        t: 'Y si aun así dudas',
        p: 'Los propios nativos preguntan. «Sorry, can or can\'t?» es una frase real y perfectamente normal.',
        m: '',
      },
    ],
    concept:
      'En inglés las palabras gramaticales se reducen cuando no llevan el foco. Escuchar el ritmo —qué suena fuerte y qué pasa rápido— informa más que escuchar cada letra.',
    trick:
      'Regla práctica: lo que suena claro y largo lleva significado; lo que suena borroso y corto es gramática. Sirve para can/can\'t y para casi todo el idioma.',
    distractors: {
      '1': 'Es justo lo contrario: la t final suele desaparecer.',
      '2': 'La entonación no marca esa diferencia.',
      '3': 'Sí se pueden distinguir, por la vocal y el acento.',
      '4': 'La negativa suele ser más lenta y marcada, no más rápida.',
    },
  },

  // ── A1 · El presente que más se usa ───────────────────────────────────────
  {
    chapter: 'A1 · El presente que más se usa',
    stem: 'Completa: «My sister <b>______</b> in a hospital.»',
    options: ['works', 'work', 'is work', 'working', 'does work'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Identifica el sujeto',
        p: '«My sister» es tercera persona del singular: equivale a «she».',
        m: 'my sister = she',
      },
      {
        t: 'Aplica la única terminación del presente simple',
        p: 'En inglés el verbo casi no cambia. La excepción es la tercera persona del singular, que lleva -s.',
        m: 'I/you/we/they work\nhe/she/it works',
      },
    ],
    concept:
      'El presente simple inglés solo tiene dos formas. Por eso la -s de tercera persona es tan visible cuando falta: es el único cambio que existe.',
    trick:
      'Regla mnemotécnica: «he, she, it — la s va con it». Si puedes reemplazar el sujeto por he, she o it, el verbo lleva -s.',
    distractors: {
      '1': 'Falta la -s de tercera persona: es el error más frecuente del hispanohablante.',
      '2': 'Mezcla dos estructuras que no van juntas.',
      '3': 'Sin auxiliar, «working» no puede ser el verbo principal.',
      '4': 'Es correcto solo para dar énfasis, no en una frase neutra.',
    },
  },
  {
    chapter: 'A1 · El presente que más se usa',
    stem: '¿Cuál de estas frases es <b>correcta</b>?',
    options: [
      'She doesn\'t like coffee.',
      'She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She not like coffee.',
      'She no like coffee.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Recuerda que la negación necesita auxiliar',
        p: 'En español basta con poner «no» delante del verbo. En inglés hace falta do/does, que no tiene traducción.',
        m: 'No le gusta  →  She doesn\'t like',
      },
      {
        t: 'Fíjate en dónde va la -s',
        p: 'Cuando aparece el auxiliar, la marca de tercera persona la lleva él: does. El verbo principal se queda desnudo.',
        m: 'does + like  ✓\ndoes + likes  ✗',
      },
    ],
    concept:
      'La -s de tercera persona aparece una sola vez en la frase. Si hay auxiliar, la lleva el auxiliar; si no lo hay, la lleva el verbo.',
    trick:
      'Piensa que does «se roba» la -s. Por eso nunca verás doesn\'t likes ni does she likes.',
    distractors: {
      '1': 'Con she el auxiliar es does, no do.',
      '2': 'La -s ya está en does: el verbo va en su forma base.',
      '3': 'Falta el auxiliar por completo.',
      '4': 'Calca la negación española.',
    },
  },
  {
    chapter: 'A1 · El presente que más se usa',
    stem: 'Traduce: «<b>Tengo 15 años</b>.»',
    options: ['I am 15 years old.', 'I have 15 years.', 'I have 15 years old.', 'I am 15 years.', 'It has 15 years.'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Reconoce el calco',
        p: 'El español usa «tener» para la edad; el inglés usa «ser». Traducir palabra por palabra produce una frase que un nativo no dice.',
        m: 'tener años → to BE … years old',
      },
      {
        t: 'Memoriza la fórmula entera',
        p: 'No se construye: se aprende de memoria y se reutiliza.',
        m: 'I am 15 (years old).',
      },
    ],
    concept:
      'Hay expresiones que no se traducen palabra por palabra: la edad, el calor, el hambre, la razón. En inglés casi todas van con «to be».',
    trick:
      'La lista corta que resuelve el 90 %: I am hungry, I am cold, I am 15, I am right, I am afraid. En español las cinco son «tener».',
    distractors: {
      '1': 'Es la traducción literal del español, y es el error más reconocible de un hispanohablante.',
      '2': 'Mezcla las dos estructuras.',
      '3': 'Falta «old» y la frase queda incompleta.',
      '4': 'Se usaría para una cosa, no para una persona, y además el verbo está mal.',
    },
  },
  {
    chapter: 'A1 · El presente que más se usa',
    stem: 'Completa: «Look! The bus <b>______</b>.» (está llegando ahora mismo)',
    options: ['is coming', 'comes', 'come', 'is come', 'coming'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en la pista temporal',
        p: '«Look!» señala algo que ocurre en este momento. Eso descarta el presente simple.',
        m: 'ahora mismo → presente continuo',
      },
      {
        t: 'Arma el continuo',
        p: 'Se forma con el verbo be conjugado más el verbo principal en -ing. Las dos piezas son obligatorias.',
        m: 'be + verbo-ing\nis + coming',
      },
      {
        t: 'Contrástalo con el simple',
        p: '«The bus comes at 8» habla de una rutina, no de este momento.',
        m: 'comes → todos los días\nis coming → ahora',
      },
    ],
    concept:
      'El presente simple describe rutinas y verdades; el continuo, lo que ocurre ahora. El español usa el presente para ambos, y por eso hay que decidir conscientemente.',
    trick:
      'Palabras que piden continuo: now, right now, at the moment, Look!, Listen!. Palabras que piden simple: always, usually, every day, never.',
    distractors: {
      '1': 'Es correcto para un horario habitual, no para lo que pasa ahora.',
      '2': 'Además falta la -s de tercera persona.',
      '3': 'El continuo lleva -ing, no el participio.',
      '4': 'Sin el verbo be, la frase no tiene verbo conjugado.',
    },
  },
  {
    chapter: 'A1 · El presente que más se usa',
    stem: 'Un compañero escribe: «<b>The people is very friendly here.</b>» ¿Cuál es el error?',
    options: [
      '«People» es plural en inglés: debe ser «People are»',
      'Falta un artículo antes de «friendly»',
      '«Friendly» debería ir en plural',
      'Debería decir «peoples»',
      'No hay ningún error',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Comprueba el número de la palabra',
        p: '«People» ya es el plural de «person». No lleva -s y exige verbo en plural.',
        m: 'person → people\n(no «peoples»)',
      },
      {
        t: 'Corrige el verbo',
        p: 'Al ser plural, el verbo es «are», no «is».',
        m: 'People are friendly.',
      },
      {
        t: 'Quita el artículo sobrante',
        p: 'En inglés no se usa artículo para hablar en general. «The people» se referiría a un grupo concreto ya mencionado.',
        m: 'La gente es amable →\nPeople are friendly.',
      },
    ],
    concept:
      'Hay sustantivos cuyo número no coincide entre los dos idiomas. «People» es plural en inglés aunque «la gente» sea singular en español, y el artículo desaparece al hablar en general.',
    trick:
      'Otros que suelen fallar: news es singular («the news is good»), advice e information no tienen plural, y police es plural («the police are here»).',
    distractors: {
      '1': 'Los adjetivos no llevan artículo delante en esa posición.',
      '2': 'Los adjetivos ingleses nunca cambian de número.',
      '3': '«Peoples» existe, pero significa «pueblos», no «personas».',
      '4': 'Hay dos errores: el verbo y el artículo.',
    },
  },
];
