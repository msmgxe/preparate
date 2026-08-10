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

  // ── A2 · Contar lo que pasó ───────────────────────────────────────────────
  {
    chapter: 'A2 · Contar lo que pasó',
    stem: 'Completa: «She <b>______</b> to the market yesterday.»',
    options: ['went', 'goed', 'go', 'gone', 'was go'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Fíjate en la pista temporal',
        p: '«Yesterday» obliga al pasado. No hay otra opción posible.',
        m: 'yesterday → pasado simple',
      },
      {
        t: 'Recuerda que «go» es irregular',
        p: 'No admite -ed: su pasado es una palabra distinta.',
        m: 'go → went → gone',
      },
    ],
    concept:
      'Los verbos más frecuentes del inglés son casi todos irregulares. No se deducen: se aprenden usándolos.',
    trick: 'Estudia los irregulares en tríos —go, went, gone—, porque el tercero hace falta más adelante.',
    distractors: {
      '1': 'Regularizaste un irregular. «Goed» no existe.',
      '2': 'Es el presente, y la frase habla de ayer.',
      '3': 'Es el participio: se usa con have, no solo.',
      '4': 'Mezcla dos estructuras que no van juntas.',
    },
  },
  {
    chapter: 'A2 · Contar lo que pasó',
    stem: 'Completa: «Did you <b>______</b> the game last night?»',
    options: ['see', 'saw', 'seen', 'sees', 'seeing'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Localiza dónde está el pasado',
        p: 'Ya está en «did». Ese es el único sitio donde puede estar.',
        m: 'did = do en pasado',
      },
      {
        t: 'Deja el verbo desnudo',
        p: 'Con el auxiliar presente, el verbo principal vuelve a su forma base. Marcar el pasado dos veces es como decir «fuistes».',
        m: 'Did you see…  ✓\nDid you saw…  ✗',
      },
    ],
    concept:
      'La marca de tiempo aparece una sola vez en la frase. Si hay auxiliar, la lleva el auxiliar y el verbo se queda en su forma base.',
    trick: 'Es la misma regla del presente: «does she like», nunca «does she likes». Cambia el auxiliar, no la regla.',
    distractors: {
      '1': 'Pone el pasado dos veces: ya está en «did».',
      '2': 'Es el participio; aquí haría falta have.',
      '3': 'Es la tercera persona del presente.',
      '4': 'Es el gerundio, que necesita el verbo be.',
    },
  },
  {
    chapter: 'A2 · Contar lo que pasó',
    stem: '¿En cuál de estos verbos la terminación <b>-ed</b> añade una sílaba entera al pronunciarse?',
    options: ['wanted', 'worked', 'played', 'lived', 'called'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira en qué sonido termina el verbo sin la -ed',
        p: 'La -ed solo suena como sílaba aparte cuando el verbo ya acaba en sonido de t o de d. En los demás casos se pega al final.',
        m: 'want → termina en /t/  → wan-ted',
      },
      {
        t: 'Comprueba los otros',
        p: 'Ninguno acaba en t ni en d, así que la -ed no añade sílaba: suena pegada.',
        m: 'worked  → /wɜːrkt/   una sílaba\nplayed  → /pleɪd/    una sílaba',
      },
    ],
    concept:
      'La -ed se escribe siempre igual y se pronuncia de tres maneras. Solo la tercera —/ɪd/— añade una sílaba, y solo tras t o d.',
    trick: 'Prueba a decir «workted». Si suena forzado, es que ahí la -ed no lleva sílaba propia.',
    distractors: {
      '1': 'Termina en /k/: la -ed suena /t/ y no añade sílaba.',
      '2': 'Termina en vocal: la -ed suena /d/ pegada.',
      '3': 'Termina en /v/: también pegada.',
      '4': 'Termina en /l/: igualmente pegada.',
    },
  },
  {
    chapter: 'A2 · Contar lo que pasó',
    stem: 'Traduce: «<b>No lo vi la semana pasada.</b>»',
    options: ["I didn't see him last week.", "I didn't saw him last week.", 'I not saw him last week.', 'I no saw him last week.', "I haven't see him last week."],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'La negación necesita auxiliar',
        p: 'En español basta «no» delante del verbo. En inglés hace falta didn’t, que no traduce nada por sí solo.',
        m: 'No vi  →  I didn’t see',
      },
      {
        t: 'El verbo vuelve a su forma base',
        p: 'El pasado ya está dentro de didn’t.',
        m: "didn't + see  ✓\ndidn't + saw  ✗",
      },
    ],
    concept:
      'Negar y preguntar en pasado funcionan igual: el auxiliar carga el tiempo y el verbo se queda desnudo.',
    trick: 'Si en tu frase aparecen dos marcas de pasado, sobra una. Quítasela al verbo, nunca al auxiliar.',
    distractors: {
      '1': 'Marca el pasado dos veces.',
      '2': 'Le falta el auxiliar.',
      '3': 'Calca la negación española.',
      '4': 'El presente perfecto no admite «last week», que es un momento cerrado.',
    },
  },
  {
    chapter: 'A2 · Contar lo que pasó',
    stem: 'Traduce: «<b>Hace dos años me mudé a Lima.</b>»',
    options: [
      'I moved to Lima two years ago.',
      'I moved to Lima ago two years.',
      'I have moved to Lima two years ago.',
      'It makes two years I moved to Lima.',
      'Two years ago I move to Lima.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Traduce «hace» por «ago», no por un verbo',
        p: 'El «hace» español es el verbo hacer; el inglés no usa ningún verbo aquí, usa una palabra que va detrás del tiempo.',
        m: 'hace dos años → two years ago',
      },
      {
        t: 'Colócalo en su sitio',
        p: '«Ago» va siempre detrás de la expresión de tiempo, nunca delante.',
        m: 'two years ago  ✓\nago two years  ✗',
      },
      {
        t: 'Elige el tiempo verbal',
        p: '«Ago» señala un momento terminado, y eso exige pasado simple. Con presente perfecto es incompatible: no se puede decir cuándo ocurrió algo que sigue abierto.',
        m: 'ago + pasado simple  ✓\nago + present perfect  ✗',
      },
    ],
    concept:
      '«Ago» marca un punto cerrado en el pasado. Por eso convive con el pasado simple y choca con el presente perfecto.',
    trick:
      'Si en la frase aparece «ago», «yesterday» o «last week», el verbo va en pasado simple. Sin excepciones.',
    distractors: {
      '1': '«Ago» va detrás del tiempo, no delante.',
      '2': '«Ago» y el presente perfecto no pueden ir juntos.',
      '3': 'Traduce «hace» como si fuera el verbo hacer.',
      '4': 'La colocación es correcta, pero el verbo está en presente.',
    },
  },

  // ── A2 · Hablar del futuro ────────────────────────────────────────────────
  {
    chapter: 'A2 · Hablar del futuro',
    stem: '¿Cuál está <b>bien formada</b>?',
    options: [
      'She is going to study medicine.',
      'She is going to studies medicine.',
      'She is going study medicine.',
      'She will to study medicine.',
      'She go to study medicine.',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Arma la estructura pieza a pieza',
        p: 'Son tres: el verbo be conjugado, «going to», y el verbo en infinitivo sin nada más.',
        m: 'be + going to + verbo base',
      },
      {
        t: 'Comprueba que no sobre ni falte nada',
        p: 'El verbo final va desnudo: ni -s, ni -ing, ni otro «to».',
        m: 'is going to study  ✓',
      },
    ],
    concept:
      'Los futuros ingleses son fórmulas fijas. Antes de elegir cuál usar hay que saber montarlas, y montarlas mal delata más que elegir mal.',
    trick: 'Detrás de «to» y detrás de «will» siempre va el verbo en su forma base. Nunca conjugado.',
    distractors: {
      '1': 'Detrás de «to» el verbo no se conjuga.',
      '2': 'Falta el «to» de «going to».',
      '3': 'Detrás de «will» no va «to».',
      '4': 'No hay estructura de futuro: falta el verbo be.',
    },
  },
  {
    chapter: 'A2 · Hablar del futuro',
    stem: 'Suena el teléfono y dices que contestas tú. ¿Cuál es la forma natural?',
    options: ["I'll get it.", "I'm going to get it.", 'I get it.', "I'm getting it.", 'I will to get it.'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Pregúntate cuándo lo decidiste',
        p: 'Lo decides en ese instante, al oír el timbre. No estaba planeado.',
        m: 'decisión del momento → will',
      },
      {
        t: 'Comprueba qué diría «going to»',
        p: 'Sonaría a que tenías planeado desde antes contestar ese teléfono, lo cual es absurdo.',
        m: '',
      },
    ],
    concept:
      'Will y going to no se diferencian por el tiempo sino por el momento de la decisión: ahora frente a antes.',
    trick: 'Ofrecimientos y promesas van con will, porque nacen al hablar: «I’ll help you», «I’ll call you».',
    distractors: {
      '1': 'Implicaría que estaba planeado de antemano.',
      '2': 'El presente simple es para rutinas.',
      '3': 'El continuo indicaría una cita ya fijada.',
      '4': 'Detrás de «will» no va «to».',
    },
  },
  {
    chapter: 'A2 · Hablar del futuro',
    stem: 'Ves a alguien tambaleándose con una bandeja llena. ¿Qué le dices?',
    options: [
      "Careful! You're going to drop those glasses.",
      'Careful! You will drop those glasses.',
      'Careful! You drop those glasses.',
      'Careful! You would drop those glasses.',
      'Careful! You are dropping those glasses.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira en qué se apoya tu predicción',
        p: 'No es una opinión: lo estás viendo ocurrir. Hay evidencia delante de los ojos.',
        m: 'evidencia visible → going to',
      },
      {
        t: 'Contrástalo con will',
        p: 'Will serviría para una opinión sobre el futuro: «I think you’ll drop them one day».',
        m: 'opinión → will\nevidencia → going to',
      },
    ],
    concept:
      'Para predecir, el inglés distingue entre lo que uno cree y lo que uno ve. La evidencia presente pide going to.',
    trick: 'Si puedes señalar con el dedo la razón de tu predicción, usa going to.',
    distractors: {
      '1': 'Serviría para una opinión, no para algo que estás viendo.',
      '2': 'El presente simple no predice.',
      '3': 'Would es condicional, no futuro.',
      '4': 'Diría que ya se están cayendo, no que van a caerse.',
    },
  },
  {
    chapter: 'A2 · Hablar del futuro',
    stem: 'Según el horario oficial de la estación, completa: «The train <b>______</b> at 7:30 tomorrow.»',
    options: ['leaves', 'will leave', 'is going to leave', 'leave', 'would leave'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en de qué tipo de futuro se trata',
        p: 'No es un plan de nadie ni una predicción: es un horario fijado por una institución.',
        m: 'horario → presente simple',
      },
      {
        t: 'Compáralo con el español',
        p: 'Decimos «el tren sale a las siete y media», también en presente. La lógica es la misma.',
        m: '',
      },
    ],
    concept:
      'Los horarios de trenes, vuelos, clases y cines van en presente simple aunque hablen del futuro. Es lo fijado, no lo previsto.',
    trick: 'Si lo decide un horario y no una persona, presente simple.',
    distractors: {
      '1': 'Es una predicción, y un horario no se predice.',
      '2': 'Es un plan personal, y aquí el plan es de la estación.',
      '3': 'Falta la -s de tercera persona.',
      '4': 'Es condicional.',
    },
  },
  {
    chapter: 'A2 · Hablar del futuro',
    stem: '¿Qué diferencia hay entre «<b>I’ll call him</b>» y «<b>I’m going to call him</b>»?',
    options: [
      'La primera se decide al hablar; la segunda ya estaba decidida',
      'La primera es más lejana en el tiempo que la segunda',
      'La primera es formal y la segunda coloquial',
      'La primera es una obligación y la segunda una opción',
      'No hay ninguna diferencia: son intercambiables',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Descarta el tiempo',
        p: 'Las dos pueden referirse al mismo momento: dentro de cinco minutos o mañana. La diferencia no está ahí.',
        m: '',
      },
      {
        t: 'Sitúa la decisión',
        p: 'Will nace en el instante de hablar; going to venía decidido de antes.',
        m: 'will      → lo decido ahora\ngoing to  → ya lo tenía pensado',
      },
      {
        t: 'Compruébalo con un contexto',
        p: 'Si alguien dice «nadie le ha avisado», la respuesta natural es «I’ll call him»: lo decides en ese momento.',
        m: '',
      },
    ],
    concept:
      'El futuro inglés codifica algo que el español deja implícito: cuándo se tomó la decisión. Elegir mal no da error, pero cambia lo que el otro entiende.',
    trick:
      'Si puedes añadir «ya lo tenía pensado» sin que suene raro, va going to. Si añadirías «se me acaba de ocurrir», va will.',
    distractors: {
      '1': 'Ninguna de las dos indica distancia temporal.',
      '2': 'Las dos se usan igual en habla formal y coloquial.',
      '3': 'Ninguna expresa obligación.',
      '4': 'Se entienden las dos, pero comunican cosas distintas.',
    },
  },

  // ── A2 · Comparar ─────────────────────────────────────────────────────────
  {
    chapter: 'A2 · Comparar',
    stem: 'Completa con el comparativo de <b>cheap</b>: «This book is <b>______</b> than that one.»',
    options: ['cheaper', 'more cheap', 'cheapest', 'more cheaper', 'the cheaper'],
    answer: 0,
    difficulty: 1,
    steps: [
      { t: 'Cuenta las sílabas', p: '«Cheap» tiene una: es un adjetivo corto.', m: 'cheap → 1 sílaba' },
      {
        t: 'Aplica la regla de los cortos',
        p: 'Los adjetivos cortos forman el comparativo con -er, sin more.',
        m: 'cheap + er = cheaper',
      },
    ],
    concept:
      'El inglés elige entre -er y more según la longitud del adjetivo. Una sílaba, o dos terminadas en -y, van con -er.',
    trick: 'Si el adjetivo cabe cómodo en una sola sílaba, casi seguro lleva -er.',
    distractors: {
      '1': 'More es para los adjetivos largos.',
      '2': 'Es el superlativo, y aquí se comparan dos cosas.',
      '3': 'Marca la comparación dos veces.',
      '4': 'El artículo sobra en el comparativo.',
    },
  },
  {
    chapter: 'A2 · Comparar',
    stem: 'Completa: «Lima is <b>______</b> city in Peru.»',
    options: ['the biggest', 'the most big', 'bigger', 'the bigger', 'biggest'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Decide si comparas o destacas',
        p: 'No se compara con otra ciudad concreta: se la señala como la primera de todas. Eso es superlativo.',
        m: 'una entre todas → superlativo',
      },
      {
        t: 'Fórmalo',
        p: 'Adjetivo corto: -est. Y el superlativo siempre lleva «the» delante.',
        m: 'the + big + est = the biggest',
      },
    ],
    concept:
      'El comparativo enfrenta dos cosas; el superlativo destaca una dentro de un grupo. El artículo «the» es obligatorio en el segundo.',
    trick: 'Si en español dirías «el más», en inglés hay «the». Si dirías solo «más», no lo pongas.',
    distractors: {
      '1': 'Most es para adjetivos largos.',
      '2': 'Es comparativo, y falta con qué se compara.',
      '3': 'Mezcla el artículo del superlativo con la forma del comparativo.',
      '4': 'Le falta el «the».',
    },
  },
  {
    chapter: 'A2 · Comparar',
    stem: '¿Cuál es el comparativo de <b>expensive</b>?',
    options: ['more expensive', 'expensiver', 'most expensive', 'more expensiver', 'expensivest'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Cuenta las sílabas', p: 'Ex-pen-sive: tres. Es un adjetivo largo.', m: 'expensive → 3 sílabas' },
      {
        t: 'Aplica la regla de los largos',
        p: 'Se antepone «more» y el adjetivo no cambia.',
        m: 'more + expensive',
      },
    ],
    concept:
      'Los adjetivos de dos sílabas o más forman el comparativo con more y el superlativo con the most, sin alterar la palabra.',
    trick: 'Si al pegarle -er la palabra te suena imposible de pronunciar, es que necesita more.',
    distractors: {
      '1': 'Los adjetivos largos no admiten -er.',
      '2': 'Es el superlativo, no el comparativo.',
      '3': 'Marca la comparación dos veces.',
      '4': 'Los largos tampoco admiten -est.',
    },
  },
  {
    chapter: 'A2 · Comparar',
    stem: 'Completa: «It was <b>______</b> day of the whole trip.» (good)',
    options: ['the best', 'the goodest', 'the most good', 'better', 'the better'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Reconoce el irregular',
        p: '«Good» no sigue ninguna regla, igual que «bueno» en español no da «más bueno» sino «mejor».',
        m: 'good → better → the best',
      },
      { t: 'Elige la forma que pide la frase', p: 'Es el mejor de todo el viaje: superlativo.', m: 'the best' },
    ],
    concept:
      'Solo tres adjetivos frecuentes son irregulares: good, bad y far. El resto sigue la regla de las sílabas.',
    trick: 'Memoriza los tres tríos completos —good/better/best, bad/worse/worst, far/further/furthest— y ya no hay más excepciones.',
    distractors: {
      '1': '«Good» no admite -est.',
      '2': 'Tampoco admite most.',
      '3': 'Es el comparativo, y aquí se destaca uno entre todos.',
      '4': 'Mezcla el artículo con el comparativo.',
    },
  },
  {
    chapter: 'A2 · Comparar',
    stem: 'Traduce: «<b>Machu Picchu no es tan grande como imaginaba.</b>»',
    options: [
      "Machu Picchu isn't as big as I imagined.",
      "Machu Picchu isn't so big as I imagined.",
      "Machu Picchu isn't bigger as I imagined.",
      "Machu Picchu isn't as bigger as I imagined.",
      "Machu Picchu isn't more big as I imagined.",
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Reconoce la estructura',
        p: 'No se compara diciendo que uno es más que otro: se dice que no llega al mismo nivel. Esa es la estructura de igualdad.',
        m: 'tan … como  →  as … as',
      },
      {
        t: 'Deja el adjetivo sin marcar',
        p: 'Entre los dos «as» el adjetivo va en su forma normal, sin -er ni more: la comparación ya la hacen los «as».',
        m: 'as big as  ✓\nas bigger as  ✗',
      },
      {
        t: 'Descarta el calco',
        p: '«So … as» copia el «tan … como» español y solo aparece en inglés muy antiguo o literario.',
        m: '',
      },
    ],
    concept:
      'La comparación de igualdad usa as … as y nunca lleva el adjetivo marcado. Es la estructura que más se calca del español.',
    trick: 'Recuerda la pareja: siempre dos «as», uno delante y otro detrás del adjetivo desnudo.',
    distractors: {
      '1': 'Calca el «tan … como» español; en inglés moderno se usa «as … as».',
      '2': 'Mezcla el comparativo con la estructura de igualdad.',
      '3': 'Marca el adjetivo dentro de una estructura que ya compara.',
      '4': 'Mezcla dos formas de comparar a la vez.',
    },
  },

  // ── A2 · Describir personas y rutinas ─────────────────────────────────────
  {
    chapter: 'A2 · Describir personas y rutinas',
    stem: 'Coloca <b>usually</b>: «I ______ get up at seven.»',
    options: ['I usually get up at seven.', 'I get up usually at seven.', 'Usually I am get up at seven.', 'I get usually up at seven.', 'I get up at seven usually.'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Recuerda dónde viven estos adverbios',
        p: 'Always, usually, often, sometimes y never van delante del verbo principal.',
        m: 'sujeto + adverbio + verbo',
      },
      { t: 'Aplícalo', p: 'El verbo es «get up», así que el adverbio va justo antes.', m: 'I usually get up…' },
    ],
    concept:
      'Los adverbios de frecuencia tienen una posición fija en la frase inglesa, mientras que en español se mueven con libertad.',
    trick: 'Piensa en el hueco entre el sujeto y el verbo: ahí es donde encajan.',
    distractors: {
      '1': 'Queda detrás del verbo, que es la posición española.',
      '2': 'Añade un verbo be que sobra.',
      '3': 'Parte el verbo «get up» por la mitad.',
      '4': 'Al final suena a añadido, no a rutina.',
    },
  },
  {
    chapter: 'A2 · Describir personas y rutinas',
    stem: 'Coloca <b>always</b>: «She ______ late for class.»',
    options: ['She is always late', 'She always is late', 'Always she is late', 'She is late always', 'She always late'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Identifica el verbo',
        p: 'Aquí el verbo es «is», es decir el verbo be. Y ese cambia la regla.',
        m: 'verbo = be',
      },
      {
        t: 'Aplica la única excepción',
        p: 'Con «be» el adverbio va detrás, no delante. Con cualquier otro verbo, delante.',
        m: 'I always work.      → delante\nShe is always late. → detrás',
      },
    ],
    concept:
      'La regla de los adverbios de frecuencia tiene una sola excepción, y es el verbo be. Aprenderla resuelve todo el capítulo.',
    trick: 'Regla en cinco palabras: antes del verbo, después de be.',
    distractors: {
      '1': 'Es la posición de los demás verbos, no la de be.',
      '2': 'Al inicio suena enfático y forzado en esta frase.',
      '3': 'Al final queda como añadido, no como rutina.',
      '4': 'Le falta el verbo.',
    },
  },
  {
    chapter: 'A2 · Describir personas y rutinas',
    stem: 'Ordena los adjetivos: un coche <b>japonés, rojo y nuevo</b>.',
    options: ['a new red Japanese car', 'a red new Japanese car', 'a Japanese red new car', 'a new Japanese red car', 'a red Japanese new car'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Recuerda el orden fijo',
        p: 'Opinión, tamaño, edad, forma, color, origen, material. Aquí solo intervienen tres de esas casillas.',
        m: 'edad → color → origen',
      },
      { t: 'Colócalos', p: 'Nuevo es edad, rojo es color, japonés es origen. En ese orden.', m: 'new  red  Japanese' },
      {
        t: 'Comprueba con el oído',
        p: 'Cualquier otro orden suena mal a un nativo aunque sea comprensible. Es lo que delata una traducción.',
        m: '',
      },
    ],
    concept:
      'El inglés tiene un orden obligatorio para los adjetivos encadenados; el español los coloca con libertad. Es una regla que nadie enuncia y todos aplican.',
    trick: 'De las siete casillas, en la práctica solo necesitas dos parejas: edad antes que color, y color antes que origen.',
    distractors: {
      '1': 'Pone el color antes que la edad.',
      '2': 'Pone el origen primero, que va siempre al final.',
      '3': 'Coloca el origen antes que el color.',
      '4': 'Invierte las tres casillas.',
    },
  },
  {
    chapter: 'A2 · Describir personas y rutinas',
    stem: 'Completa: «How often <b>______</b> you go to the gym?»',
    options: ['do', 'are', 'does', 'did', 'have'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira el sujeto y el tiempo',
        p: 'El sujeto es «you» y la pregunta es sobre una rutina, es decir presente simple.',
        m: 'you + presente → do',
      },
      {
        t: 'Recuerda que las preguntas de rutina llevan auxiliar',
        p: '«How often» pide frecuencia, y la frecuencia se pregunta en presente simple.',
        m: 'How often do you…?',
      },
    ],
    concept:
      'La palabra de pregunta no sustituye al auxiliar: «how often» abre la pregunta, pero el auxiliar sigue haciendo falta.',
    trick: 'Responde mentalmente antes: «I go three times a week». El verbo de esa respuesta te dice qué auxiliar toca.',
    distractors: {
      '1': 'Se usa con adjetivos o con el continuo, no con «go» en presente simple.',
      '2': 'Corresponde a he, she o it.',
      '3': 'Preguntaría por el pasado.',
      '4': 'Serviría para el presente perfecto, que aquí no toca.',
    },
  },
  {
    chapter: 'A2 · Describir personas y rutinas',
    stem: '«My brother always is late and he get up at nine.» ¿Cuántos errores hay?',
    options: [
      'Dos: «always is» debe ser «is always», y «he get up» debe ser «he gets up»',
      'Uno: solo «always is»',
      'Uno: solo «he get up»',
      'Tres: los dos anteriores y además falta un artículo',
      'Ninguno: la frase es correcta',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Revisa la primera mitad',
        p: 'El verbo es «is», así que el adverbio va detrás.',
        m: 'always is  ✗  →  is always  ✓',
      },
      {
        t: 'Revisa la segunda',
        p: '«He» es tercera persona del singular, y el verbo lleva -s. Aquí no hay auxiliar que se la lleve.',
        m: 'he get up  ✗  →  he gets up  ✓',
      },
      {
        t: 'Comprueba que no haya más',
        p: 'El resto está bien: «at nine» no lleva artículo y «my brother» está completo.',
        m: 'My brother is always late\nand he gets up at nine.',
      },
    ],
    concept:
      'Describir rutinas junta dos reglas a la vez: la posición del adverbio y la -s de tercera persona. Los dos errores suelen aparecer en la misma frase.',
    trick:
      'Al revisar lo que escribes, haz dos pasadas separadas: una buscando adverbios mal colocados y otra buscando -s que falten.',
    distractors: {
      '1': 'También falta la -s de tercera persona en «get up».',
      '2': 'También está mal la posición de «always».',
      '3': 'No falta ningún artículo: «at nine» es correcto así.',
      '4': 'Hay dos errores claros.',
    },
  },
];
