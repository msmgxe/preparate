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
  // ── A1 · Las 1000 palabras que cubren el 85 % ─────────────────────────────
  {
    chapter: 'A1 · Las 1000 palabras que cubren el 85 %',
    stem: '¿Cómo se dice <b>«hacer una pregunta»</b> en inglés?',
    options: ['ask a question', 'make a question', 'do a question', 'say a question', 'take a question'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'No traduzcas el verbo',
        p: 'En español el verbo es «hacer», pero cada idioma empareja sus propios verbos con sus propios sustantivos. Ese emparejamiento no se deduce.',
        m: 'hacer una pregunta → ask a question',
      },
      {
        t: 'Apréndelo como una sola pieza',
        p: 'Guarda «ask a question» entero, no «ask» por un lado y «question» por otro. Sale más rápido al hablar.',
        m: '',
      },
    ],
    concept:
      'Las colocaciones —qué verbo va con qué sustantivo— no siguen reglas y cambian de un idioma a otro. Se memorizan en bloque.',
    trick: 'Cuando aprendas un sustantivo nuevo, apunta con qué verbo viene. Cuesta lo mismo y ahorra el error.',
    distractors: {
      '1': 'Es la traducción literal, y el error más frecuente del hispanohablante.',
      '2': '«Do» va con tareas: do homework, do the dishes.',
      '3': '«Say» es decir algo, no formular una pregunta.',
      '4': 'Existe en el sentido de «aceptar una pregunta», no de hacerla.',
    },
  },
  {
    chapter: 'A1 · Las 1000 palabras que cubren el 85 %',
    stem: '¿Qué verbo acompaña a <b>homework</b>, <b>the dishes</b> y <b>the shopping</b>?',
    options: ['do', 'make', 'take', 'have', 'get'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Busca qué tienen en común',
        p: 'La tarea, los platos y las compras son obligaciones: cosas que hay que cumplir, no cosas que se crean.',
        m: '',
      },
      {
        t: 'Aplica la aproximación que funciona',
        p: '«Do» para tareas y obligaciones; «make» para lo que se produce o se crea.',
        m: 'DO   → homework · the dishes\nMAKE → dinner · a mistake',
      },
    ],
    concept:
      'Do y make se traducen igual y no significan lo mismo. Tareas frente a creaciones acierta la mayoría de las veces.',
    trick: 'Si al terminar queda algo nuevo —una cena, un error, una decisión—, es make. Si solo queda cumplida una obligación, es do.',
    distractors: {
      '1': 'Va con lo que se produce: make dinner, make a mistake.',
      '2': 'Va con fotos, transporte y tiempo: take a photo, take the bus.',
      '3': 'Va con comidas y experiencias: have breakfast, have fun.',
      '4': 'Significa conseguir u obtener, no realizar.',
    },
  },
  {
    chapter: 'A1 · Las 1000 palabras que cubren el 85 %',
    stem: '¿Cómo se dice <b>«estoy de acuerdo»</b>?',
    options: ['I agree.', 'I am agree.', 'I am agreed.', "I'm according.", 'I have agree.'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en qué es «agree»',
        p: 'En español «estar de acuerdo» es un estado y usa el verbo estar. En inglés «agree» ya es un verbo completo: no necesita otro delante.',
        m: 'agree = estar de acuerdo',
      },
      {
        t: 'Conjúgalo solo',
        p: 'Se usa como cualquier otro verbo del presente simple.',
        m: 'I agree. / She agrees.\nI don\'t agree.',
      },
    ],
    concept:
      'Algunos verbos ingleses ya contienen lo que en español son dos palabras. Añadirles «to be» delante los rompe.',
    trick: 'Otros iguales: I need, I want, I miss you, I remember. Ninguno lleva am, is o are.',
    distractors: {
      '1': 'Es el error más frecuente: «agree» ya es el verbo, no un adjetivo.',
      '2': 'La forma pasiva no aplica aquí.',
      '3': '«According» existe, pero en «according to», que significa «según».',
      '4': 'Mezcla el presente perfecto sin razón.',
    },
  },
  {
    chapter: 'A1 · Las 1000 palabras que cubren el 85 %',
    stem: 'Completa con el verbo natural: «Can you <b>______</b> a photo of us?»',
    options: ['take', 'make', 'do', 'have', 'put'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Recuerda el bloque, no el verbo',
        p: 'La foto viene siempre con «take». Es una colocación fija.',
        m: 'take a photo / take a picture',
      },
      {
        t: 'Ubícalo en la familia de take',
        p: '«Take» acompaña a transporte, tiempo y capturas.',
        m: 'take the bus · take time · take a photo',
      },
    ],
    concept: 'Cada verbo frecuente arrastra su propia familia de sustantivos. Aprender la familia entera rinde más que el verbo suelto.',
    trick: 'Take: photo, bus, shower, time, care. Cinco bloques que cubren casi todo el A1.',
    distractors: {
      '1': 'Se usa para producir algo, no para capturarlo.',
      '2': 'Va con tareas.',
      '3': 'No es la colocación natural.',
      '4': 'Significa colocar.',
    },
  },
  {
    chapter: 'A1 · Las 1000 palabras que cubren el 85 %',
    stem: 'Si tienes veinte minutos al día para vocabulario, ¿qué rinde más?',
    options: [
      'Aprender bloques completos de las palabras más frecuentes',
      'Memorizar listas alfabéticas de palabras sueltas',
      'Estudiar vocabulario especializado de tu carrera',
      'Aprender los sinónimos de cada palabra que ya conoces',
      'Traducir textos largos con diccionario',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Empieza por la cobertura',
        p: 'Las mil palabras más frecuentes cubren cerca del 85 % de una conversación normal. Las raras aportan muy poco por el esfuerzo que cuestan.',
        m: '1 000 palabras ≈ 85 %',
      },
      {
        t: 'Ahora el formato',
        p: 'Una palabra suelta hay que ensamblarla al hablar, y ensamblar toma tiempo. Un bloque sale entero y ya correcto.',
        m: 'make + decision → dos piezas\n«make a decision» → una',
      },
      {
        t: 'Junta las dos ideas',
        p: 'Frecuencia decide qué estudiar; el bloque decide cómo. Las dos cosas a la vez es lo que rinde.',
        m: '',
      },
    ],
    concept:
      'El vocabulario no se mide en palabras conocidas sino en palabras disponibles al hablar. La frecuencia y el bloque son lo que convierte una en la otra.',
    trick:
      'Cuando anotes una palabra nueva, anótala dentro de una frase corta que puedas usar mañana. Sin frase, no la vas a usar.',
    distractors: {
      '1': 'El orden alfabético junta palabras que no tienen nada que ver y separa las que se usan juntas.',
      '2': 'Es útil más adelante, pero sin las mil básicas no se sostiene una conversación.',
      '3': 'Multiplica el esfuerzo sin ampliar lo que puedes decir.',
      '4': 'Entrena a entender con ayuda, no a producir sin ella.',
    },
  },

  // ── A1 · Preguntar y responder ────────────────────────────────────────────
  {
    chapter: 'A1 · Preguntar y responder',
    stem: '¿Cuál es la pregunta <b>correcta</b>?',
    options: ['Where do you live?', 'Where you live?', 'Where live you?', 'Where you do live?', 'Where does you live?'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Recuerda que hace falta un auxiliar',
        p: 'En español basta la entonación. En inglés el presente simple necesita do para poder preguntar.',
        m: 'You live here. → Do you live here?',
      },
      {
        t: 'Coloca la palabra de pregunta delante',
        p: 'La palabra wh- va primero, y después el auxiliar y el sujeto.',
        m: 'Where + do + you + live?',
      },
    ],
    concept:
      'El orden de una pregunta inglesa es fijo: palabra wh-, auxiliar, sujeto, verbo. Ese orden es lo que hace que se entienda como pregunta.',
    trick: 'Arma primero la afirmación y después mete el auxiliar delante del sujeto. Nunca muevas el verbo principal.',
    distractors: {
      '1': 'Falta el auxiliar: calca la estructura española.',
      '2': 'Mueve el verbo principal, que en inglés no se invierte.',
      '3': 'El auxiliar va antes del sujeto, no después.',
      '4': 'Con «you» el auxiliar es do, no does.',
    },
  },
  {
    chapter: 'A1 · Preguntar y responder',
    stem: '¿Cuál es la <b>respuesta corta</b> correcta a «Does she work here?»',
    options: ['Yes, she does.', 'Yes, she do.', 'Yes, she is.', 'Yes, does she.', 'Yes, she works here.'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira con qué auxiliar se preguntó',
        p: 'La respuesta corta repite el mismo auxiliar de la pregunta. Aquí fue «does».',
        m: 'Does she…? → Yes, she does.',
      },
      {
        t: 'Comprueba el orden',
        p: 'Sujeto y después auxiliar, no al revés: eso ya sería otra pregunta.',
        m: 'she does  ✓\ndoes she  ✗',
      },
    ],
    concept:
      'La respuesta corta existe porque «Yes» a secas suena cortante. Repetir el auxiliar es lo que la vuelve natural, y no tiene equivalente en español.',
    trick: 'Sea cual sea el auxiliar de la pregunta —do, does, is, can, did—, la respuesta corta lo repite.',
    distractors: {
      '1': 'Con «she» el auxiliar es does.',
      '2': '«Is» solo responde a preguntas hechas con el verbo be.',
      '3': 'Ese orden vuelve a ser una pregunta.',
      '4': 'Es correcto pero no es una respuesta corta: repite toda la frase.',
    },
  },
  {
    chapter: 'A1 · Preguntar y responder',
    stem: 'Completa: «<b>______</b> do you usually have for breakfast?»',
    options: ['What', 'How', 'Who', 'When', 'Where'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira qué tipo de respuesta pide la frase',
        p: 'La respuesta sería una cosa: pan, fruta, café. Eso lo pregunta «what».',
        m: 'una cosa → what',
      },
      {
        t: 'Descarta por el tipo de respuesta',
        p: 'Cada palabra wh- pide una clase distinta de información.',
        m: 'who → persona\nwhen → momento\nwhere → lugar\nhow → manera',
      },
    ],
    concept:
      'Elegir la palabra de pregunta es elegir qué tipo de respuesta quieres. Si sabes qué esperas oír, la palabra sale sola.',
    trick: 'Piensa la respuesta antes que la pregunta. Si la respuesta es una cosa, what; si es una persona, who; si es un momento, when.',
    distractors: {
      '1': 'Preguntaría por la manera, no por la cosa.',
      '2': 'Preguntaría por una persona.',
      '3': 'Preguntaría por el momento.',
      '4': 'Preguntaría por el lugar.',
    },
  },
  {
    chapter: 'A1 · Preguntar y responder',
    stem: 'Traduce: «<b>¿Quién rompió la ventana?</b>»',
    options: ['Who broke the window?', 'Who did break the window?', 'Who did broke the window?', 'Who breaks the window?', 'Who does broke the window?'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Comprueba qué papel tiene «who»',
        p: 'La respuesta sería «Pedro rompió la ventana». «Pedro» es el sujeto, así que «who» ocupa el lugar del sujeto.',
        m: 'Who = sujeto',
      },
      {
        t: 'Aplica la excepción',
        p: 'Cuando la palabra wh- es el sujeto, la frase ya está en orden y no hace falta auxiliar.',
        m: 'Who + verbo en pasado\nWho broke…',
      },
      {
        t: 'Compáralo con el otro caso',
        p: 'Si «who» fuera el objeto sí haría falta: «Who did you see?» — allí el sujeto es «you».',
        m: 'Who broke it?  (sujeto)\nWho did you see? (objeto)',
      },
    ],
    concept:
      'El auxiliar aparece para permitir la inversión. Si la palabra de pregunta ya es el sujeto, no hay nada que invertir y el auxiliar sobra.',
    trick: 'Prueba a responder. Si la respuesta empieza la frase —«Pedro rompió…»—, no metas did.',
    distractors: {
      '1': 'Solo es correcto con énfasis fuerte, no en una pregunta neutra.',
      '2': 'Con did, el verbo vuelve a su forma base: nunca «did broke».',
      '3': 'Está en presente y la pregunta es sobre el pasado.',
      '4': 'Mezcla dos errores: auxiliar innecesario y verbo en pasado tras does.',
    },
  },
  {
    chapter: 'A1 · Preguntar y responder',
    stem: 'Convierte en pregunta cortés: «Where is the station?»',
    options: [
      'Could you tell me where the station is?',
      'Could you tell me where is the station?',
      'Could you tell me where does the station is?',
      'Could you tell me where the station?',
      'Could you tell me where is it the station?',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Fíjate en que ya hay una pregunta',
        p: '«Could you tell me…?» es la pregunta. Lo que viene detrás deja de serlo: se convierte en una frase normal dentro de ella.',
        m: '',
      },
      {
        t: 'Deshaz la inversión',
        p: 'Como ya no es pregunta, el verbo vuelve detrás del sujeto. Es exactamente al revés de lo que uno espera.',
        m: 'Where is the station?  → directa\n…where the station is → indirecta',
      },
      {
        t: 'Comprueba con otro ejemplo',
        p: 'La misma regla con el auxiliar: «Where do you live?» pasa a «Could you tell me where you live?».',
        m: 'sin do, sin inversión',
      },
    ],
    concept:
      'En una pregunta indirecta, la parte de después vuelve al orden de una afirmación. La cortesía cambia la estructura, no solo el tono.',
    trick:
      'Si ya empezaste con «Could you tell me…» o «Do you know…», lo que sigue se escribe como si fuera una frase normal.',
    distractors: {
      '1': 'Mantiene la inversión, que en la indirecta desaparece.',
      '2': 'Añade un auxiliar que además no concuerda.',
      '3': 'Le falta el verbo.',
      '4': 'Duplica el sujeto.',
    },
  },
];
