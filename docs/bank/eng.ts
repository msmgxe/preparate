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

  // ── B1 · El tiempo que no existe en español ───────────────────────────────
  {
    chapter: 'B1 · El tiempo que no existe en español',
    stem: 'Completa: «She <b>______</b> just arrived.»',
    options: ['has', 'have', 'is', 'was', 'did'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Reconoce la estructura',
        p: 'El present perfect se forma con have o has más el participio. «Arrived» ya es el participio, así que falta el auxiliar.',
        m: 'have/has + participio',
      },
      {
        t: 'Elige según el sujeto',
        p: 'Con he, she o it el auxiliar es «has». Con el resto, «have».',
        m: 'she → has',
      },
    ],
    concept:
      'El present perfect siempre lleva dos piezas: el auxiliar have o has, que carga la persona, y el participio, que no cambia nunca.',
    trick: 'Es la misma -s de tercera persona de siempre, escondida dentro de «has».',
    distractors: {
      '1': 'Corresponde a I, you, we o they.',
      '2': 'Formaría un continuo, y «arrived» no es gerundio.',
      '3': 'Sería pasiva, y llegar no admite pasiva.',
      '4': 'Con «did» el verbo iría en forma base: «did arrive».',
    },
  },
  {
    chapter: 'B1 · El tiempo que no existe en español',
    stem: 'Completa: «I have lived in Lima <b>______</b> 2019.»',
    options: ['since', 'for', 'from', 'during', 'ago'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira qué tipo de dato viene detrás',
        p: '2019 es un punto en el tiempo, no una duración.',
        m: '2019 → un momento',
      },
      {
        t: 'Aplica la pareja',
        p: '«Since» va con el momento en que empezó; «for», con cuánto ha durado.',
        m: 'since 2019   → desde 2019\nfor six years → durante seis años',
      },
    ],
    concept:
      'For mide la duración y since marca el inicio. Los dos acompañan al present perfect, pero nunca son intercambiables.',
    trick: 'Si puedes responder «¿desde cuándo?», es since. Si respondes «¿cuánto tiempo?», es for.',
    distractors: {
      '1': 'Iría con una duración: for six years.',
      '2': '«From» necesita un «to» que cierre el período.',
      '3': 'Indica a lo largo de un período, no desde cuándo.',
      '4': 'Va con pasado simple y se coloca detrás del tiempo.',
    },
  },
  {
    chapter: 'B1 · El tiempo que no existe en español',
    stem: '«Where is Ana?» — «She <b>______</b> to the bank.» (todavía no ha vuelto)',
    options: ['has gone', 'has been', 'went', 'has go', 'is gone'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Distingue los dos participios',
        p: '«Has gone» significa que fue y sigue allí. «Has been» significa que fue y ya volvió.',
        m: 'has gone → sigue allí\nhas been → ya volvió',
      },
      {
        t: 'Aplícalo a la situación',
        p: 'Preguntan dónde está porque no está: sigue en el banco.',
        m: 'She has gone to the bank.',
      },
    ],
    concept:
      'Been y gone son dos participios del mismo verbo con significados opuestos en la práctica: uno cuenta una visita terminada y el otro una ausencia en curso.',
    trick: '«I have been to Cusco» presume de haber viajado. «I have gone to Cusco» solo lo diría alguien que aún está allí.',
    distractors: {
      '1': 'Diría que ya fue y volvió, y entonces estaría ahí.',
      '2': 'Es correcto gramaticalmente, pero no explica que siga fuera.',
      '3': 'El participio de «go» es «gone», no «go».',
      '4': 'Suena a estado, no a movimiento.',
    },
  },
  {
    chapter: 'B1 · El tiempo que no existe en español',
    stem: 'Completa: «I <b>______</b> him yesterday.»',
    options: ['saw', 'have seen', 'have saw', 'has seen', 'did saw'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en la referencia temporal',
        p: '«Yesterday» es un momento cerrado: terminó y no se puede volver a él.',
        m: 'momento cerrado → pasado simple',
      },
      {
        t: 'Descarta el present perfect',
        p: 'Ese tiempo se usa cuando el período sigue abierto —today, this week, ever— o cuando no se dice cuándo.',
        m: 'I have seen him this week  ✓\nI have seen him yesterday  ✗',
      },
    ],
    concept:
      'El present perfect no admite un momento terminado. Si la frase dice cuándo ocurrió y ese cuándo ya pasó, va pasado simple.',
    trick: 'Yesterday, last week, in 2019 y ago cierran el período. Con cualquiera de ellos, pasado simple.',
    distractors: {
      '1': 'El present perfect choca con «yesterday».',
      '2': 'El participio de «see» es «seen», no «saw».',
      '3': 'El sujeto es «I», que lleva «have».',
      '4': 'Con «did» el verbo va en forma base.',
    },
  },
  {
    chapter: 'B1 · El tiempo que no existe en español',
    stem: 'Traduce: «<b>Llevo tres años trabajando aquí.</b>»',
    options: [
      'I have been working here for three years.',
      'I have three years working here.',
      'I am working here since three years.',
      'I have been working here since three years.',
      'I work here from three years.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Reconoce el calco',
        p: 'El español dice «llevo tres años», con el verbo llevar. El inglés no tiene ese uso: <em>I have three years working here</em> no significa nada.',
        m: 'llevar + tiempo → have been + -ing',
      },
      {
        t: 'Elige el tiempo verbal',
        p: 'Algo que empezó en el pasado y sigue ocurriendo es present perfect continuo: have been más gerundio.',
        m: 'I have been working…',
      },
      {
        t: 'Elige entre for y since',
        p: 'Tres años es una duración, no un punto de inicio. Por tanto, for.',
        m: 'for three years  ✓\nsince three years  ✗',
      },
    ],
    concept:
      'La estructura española «llevo + tiempo + gerundio» se traduce con present perfect continuo y «for». Es de las que más se calcan y de las que peor suenan.',
    trick:
      'Otra salida igual de correcta y más fácil de decir: «I started working here three years ago». Si no te sale la primera, usa esa.',
    distractors: {
      '1': 'Calco literal de «llevo tres años». En inglés no se entiende.',
      '2': 'Con «since» hace falta un momento, y además el tiempo verbal no es el adecuado.',
      '3': 'La estructura es correcta, pero «since» exige un punto de inicio, no una duración.',
      '4': '«From» no funciona sin un «to» que cierre el período.',
    },
  },

  // ── B1 · Hipótesis ────────────────────────────────────────────────────────
  {
    chapter: 'B1 · Hipótesis',
    stem: 'Completa: «If it <b>______</b> tomorrow, we will stay home.»',
    options: ['rains', 'will rain', 'rained', 'would rain', 'is raining'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Recuerda la regla de oro',
        p: 'En la parte del «if» nunca va «will», aunque se hable del futuro. El futuro se queda en la otra mitad.',
        m: 'If + presente , will + verbo',
      },
      {
        t: 'Compruébalo con el español',
        p: 'Decimos «si llueve mañana», también en presente. La lógica es la misma.',
        m: '',
      },
    ],
    concept:
      'El primer condicional habla de algo probable: condición en presente simple y resultado con will. La probabilidad la marca la estructura, no las palabras.',
    trick: 'Si ves «will» detrás de «if», casi seguro está mal. Es el error más fácil de detectar al revisar.',
    distractors: {
      '1': 'El «will» no entra en la parte del if.',
      '2': 'El pasado convertiría la frase en improbable.',
      '3': 'Would tampoco entra en la parte del if.',
      '4': 'El continuo hablaría de algo que ocurre ahora.',
    },
  },
  {
    chapter: 'B1 · Hipótesis',
    stem: 'Completa: «If I <b>______</b> more time, I would learn Japanese.»',
    options: ['had', 'have', 'would have', 'will have', 'am having'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira la otra mitad',
        p: 'El resultado lleva «would», así que la frase habla de algo improbable o imaginario: es el segundo condicional.',
        m: 'would → segundo condicional',
      },
      {
        t: 'Pon el pasado en la condición',
        p: 'El segundo condicional usa pasado simple en la parte del if, aunque no hable del pasado. Ese pasado significa «esto no es real».',
        m: 'If + pasado , would + verbo',
      },
    ],
    concept:
      'En el segundo condicional el pasado no marca tiempo sino distancia de la realidad. Es un uso que el español resuelve con el subjuntivo: «si tuviera».',
    trick: 'Traduce mentalmente por «si tuviera», no por «si tengo». Si encaja el subjuntivo español, va pasado en inglés.',
    distractors: {
      '1': 'Sería primer condicional, y no encaja con «would».',
      '2': 'Would nunca aparece dentro del if.',
      '3': 'Will tampoco.',
      '4': 'El continuo no expresa hipótesis.',
    },
  },
  {
    chapter: 'B1 · Hipótesis',
    stem: '¿Cuál está <b>correcta</b>?',
    options: [
      'If I had time, I would call you.',
      'If I would have time, I would call you.',
      'If I will have time, I would call you.',
      'If I would had time, I called you.',
      'If I have time, I would called you.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Localiza dónde puede ir «would»',
        p: 'Solo en la mitad del resultado. Nunca detrás de «if».',
        m: 'If + pasado , would + base',
      },
      {
        t: 'Entiende de dónde sale el error',
        p: 'En español decimos coloquialmente «si tendría tiempo». Esa forma se calca al inglés y produce «if I would have».',
        m: 'si tuviera  ✓\nsi tendría  ✗',
      },
    ],
    concept:
      'La estructura del condicional reparte las piezas: el pasado va en la condición y el would en la consecuencia. Meterlos juntos rompe la frase.',
    trick: 'Revisa siempre lo que hay justo después de «if». Si es will o would, corrige sin pensarlo más.',
    distractors: {
      '1': 'Es el calco de «si tendría»: would no entra en el if.',
      '2': 'Will tampoco entra en el if.',
      '3': 'Tiene el would mal colocado y el resultado sin would.',
      '4': 'Mezcla presente en el if con un pasado en el resultado.',
    },
  },
  {
    chapter: 'B1 · Hipótesis',
    stem: 'Para enunciar una verdad general, completa: «If you heat water to 100 °C, it <b>______</b>.»',
    options: ['boils', 'will boil', 'would boil', 'boiled', 'is boiling'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en que no hay hipótesis',
        p: 'No se imagina nada: siempre que se cumple la condición, ocurre el resultado. Eso no es un condicional, es una ley.',
        m: 'siempre que… → siempre ocurre',
      },
      {
        t: 'Usa presente en las dos mitades',
        p: 'Es el llamado condicional cero: presente simple a los dos lados.',
        m: 'If + presente , presente',
      },
    ],
    concept:
      'El condicional cero describe lo que ocurre siempre: leyes físicas, normas e instrucciones. Se reconoce porque «if» se puede sustituir por «when» sin cambiar el sentido.',
    trick: 'Prueba a cambiar «if» por «when». Si la frase sigue significando lo mismo, van los dos verbos en presente.',
    distractors: {
      '1': 'Convertiría una ley física en una predicción concreta.',
      '2': 'Would la volvería imaginaria.',
      '3': 'El pasado no describe una ley general.',
      '4': 'El continuo hablaría de este momento.',
    },
  },
  {
    chapter: 'B1 · Hipótesis',
    stem: 'Traduce: «<b>Si hubiera estudiado, habría aprobado.</b>»',
    options: [
      'If I had studied, I would have passed.',
      'If I would have studied, I would have passed.',
      'If I studied, I would pass.',
      'If I had studied, I would passed.',
      'If I have studied, I would have passed.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Sitúa la hipótesis en el tiempo',
        p: 'El examen ya pasó y ya no se puede cambiar. Eso es el tercer condicional: imposible, no improbable.',
        m: 'pasado imposible → tercer condicional',
      },
      {
        t: 'Monta las dos mitades',
        p: 'La condición va en pasado perfecto y el resultado con «would have» más participio.',
        m: 'If + had + participio ,\nwould have + participio',
      },
      {
        t: 'Comprueba que el would siga fuera del if',
        p: 'La regla no cambia con el tercer condicional: en la parte del if nunca hay would.',
        m: 'If I had studied  ✓\nIf I would have studied  ✗',
      },
    ],
    concept:
      'El tercer condicional habla de lo que no ocurrió y ya no puede ocurrir. Es la estructura del arrepentimiento y de la explicación a posteriori.',
    trick:
      'Cuenta los «have»: hay uno en cada mitad, pero solo el segundo va con would. Si te salen dos «would have», sobra uno.',
    distractors: {
      '1': 'Es el mismo calco de «si hubiera» por «si habría».',
      '2': 'Es segundo condicional: hablaría del presente, no del pasado.',
      '3': 'Al resultado le falta el «have».',
      '4': 'El present perfect no forma condicionales.',
    },
  },

  // ── B1 · Cuando el sujeto no importa ──────────────────────────────────────
  {
    chapter: 'B1 · Cuando el sujeto no importa',
    stem: 'Completa: «The bridge <b>______</b> in 1950.» (build)',
    options: ['was built', 'was build', 'is built', 'built', 'has built'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Reconoce que es pasiva',
        p: 'El puente no construyó nada: lo construyeron. El sujeto recibe la acción.',
        m: 'sujeto recibe → pasiva',
      },
      {
        t: 'Aplica la receta',
        p: 'Be conjugado más participio. El tiempo lo lleva be, y 1950 pide pasado.',
        m: 'was + built',
      },
    ],
    concept:
      'La pasiva es siempre be más participio. Lo único que cambia entre tiempos es la forma del verbo be.',
    trick: 'El participio nunca se conjuga. Si te sale un verbo con -ed detrás de was y no es el participio, revísalo.',
    distractors: {
      '1': '«Build» es la forma base; el participio es «built».',
      '2': 'Está en presente y la frase habla de 1950.',
      '3': 'Sin «was» la frase diría que el puente construyó algo.',
      '4': 'Diría que el puente ha construido algo.',
    },
  },
  {
    chapter: 'B1 · Cuando el sujeto no importa',
    stem: 'Completa: «One Hundred Years of Solitude <b>______</b> by García Márquez.»',
    options: ['was written', 'was wrote', 'wrote', 'has wrote', 'is writing'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Identifica quién hace y quién recibe',
        p: 'El libro no escribió: fue escrito. Y quien lo hizo aparece detrás, con «by».',
        m: 'objeto + be + participio + by + agente',
      },
      {
        t: 'Usa el participio correcto',
        p: 'Write es irregular: write, wrote, written. El participio es el tercero.',
        m: 'write → wrote → written',
      },
    ],
    concept:
      'Cuando el agente sí importa, la pasiva lo recupera al final con «by». Se usa para poner el foco en la obra y no en quien la hizo.',
    trick: 'En la pasiva siempre va el tercer verbo de la lista de irregulares, nunca el segundo.',
    distractors: {
      '1': 'Usa el pasado en vez del participio.',
      '2': 'Diría que el libro escribió a García Márquez.',
      '3': 'Además de participio incorrecto, el tiempo no encaja.',
      '4': 'Diría que el libro está escribiendo.',
    },
  },
  {
    chapter: 'B1 · Cuando el sujeto no importa',
    stem: 'Escribe en <b>voz pasiva</b>: «Aquí se habla inglés.»',
    options: ['English is spoken here.', 'English is speak here.', 'English speaks here.', 'Here is spoken English.', 'It is spoken English here.'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Entiende qué hace el «se» español',
        p: 'Oculta a quien realiza la acción. El inglés no tiene esa partícula, así que recurre a la pasiva.',
        m: 'se habla → is spoken',
      },
      {
        t: 'Móntala',
        p: 'Lo que recibe la acción va delante, después be, después el participio.',
        m: 'English + is + spoken',
      },
    ],
    concept:
      'La pasiva inglesa cubre buena parte de lo que el español resuelve con «se». Por eso aparece mucho más a menudo de lo que un hispanohablante espera.',
    trick: 'Cada vez que en español te salga un «se» impersonal, comprueba si en inglés toca pasiva.',
    distractors: {
      '1': 'Falta el participio: es «spoken», no «speak».',
      '2': 'Diría que el inglés habla.',
      '3': 'El orden deja la frase sin sujeto delante.',
      '4': 'Duplica el sujeto sin necesidad.',
    },
  },
  {
    chapter: 'B1 · Cuando el sujeto no importa',
    stem: 'Completa: «The room <b>______</b> cleaned yet.»',
    options: ["hasn't been", "isn't", "didn't", "hasn't", "wasn't been"],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en «yet»',
        p: 'Señala algo que se esperaba y todavía no ha ocurrido. Eso pide present perfect.',
        m: 'yet → present perfect',
      },
      {
        t: 'Súmale la pasiva',
        p: 'La habitación no limpia: la limpian. Hay que combinar los dos: have + been + participio.',
        m: "hasn't + been + cleaned",
      },
    ],
    concept:
      'La pasiva se puede combinar con cualquier tiempo. Lo único que hace falta es conjugar «be» en ese tiempo y dejar el participio quieto.',
    trick: 'Monta primero el tiempo con «be» como si fuera el verbo, y después pega el participio detrás.',
    distractors: {
      '1': 'Le falta el present perfect que exige «yet».',
      '2': 'Con «didn\'t» el verbo iría en forma base y sin pasiva.',
      '3': 'Le falta el «been» de la pasiva.',
      '4': 'Mezcla pasado y participio de forma imposible.',
    },
  },
  {
    chapter: 'B1 · Cuando el sujeto no importa',
    stem: 'Pasa a voz pasiva: «Someone stole my bike last night.»',
    options: [
      'My bike was stolen last night.',
      'My bike was stole last night.',
      'My bike is stolen last night.',
      'My bike stole last night.',
      'My bike has stolen last night.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Mueve el objeto al frente',
        p: 'Lo que recibía la acción pasa a ser el sujeto de la frase nueva.',
        m: 'my bike → sujeto',
      },
      {
        t: 'Conjuga be en el mismo tiempo',
        p: 'La activa estaba en pasado simple, así que be va en pasado: was.',
        m: 'stole → was + participio',
      },
      {
        t: 'Pon el participio y descarta el agente',
        p: 'Steal es irregular: steal, stole, stolen. Y «someone» no aporta nada, así que no se añade con «by».',
        m: 'My bike was stolen last night.',
      },
    ],
    concept:
      'Transformar a pasiva son tres movimientos: el objeto al frente, be en el tiempo original, y el participio. El agente solo se conserva si aporta información.',
    trick:
      'Cuando el sujeto de la activa es «someone», «people» o «they» genérico, la pasiva casi siempre suena mejor y por eso el inglés la prefiere.',
    distractors: {
      '1': 'Usa el pasado «stole» donde va el participio «stolen».',
      '2': 'El presente choca con «last night».',
      '3': 'Diría que la bici robó algo.',
      '4': 'Le falta el «been» y además cambia el sentido.',
    },
  },

  // ── B1 · Los verbos que cambian con la partícula ──────────────────────────
  {
    chapter: 'B1 · Los verbos que cambian con la partícula',
    stem: 'Completa: «Can you <b>______</b> my dog this weekend?» (cuidar)',
    options: ['look after', 'look for', 'look up', 'look at', 'look out'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'No traduzcas la partícula',
        p: '«After» no significa «después» aquí. La combinación entera tiene su propio significado.',
        m: 'look after = cuidar',
      },
      {
        t: 'Compárala con sus vecinas',
        p: 'La familia de «look» es la que más se confunde, y cada miembro significa algo distinto.',
        m: 'look for   → buscar\nlook up    → consultar\nlook at    → mirar',
      },
    ],
    concept:
      'Un phrasal verb no se deduce sumando el verbo y la partícula: es una unidad con significado propio, y hay que aprenderla entera.',
    trick: 'Agrúpalos por verbo, no en listas alfabéticas. Los cinco de «look» se aprenden juntos en una tarde.',
    distractors: {
      '1': 'Significa buscar.',
      '2': 'Significa consultar en un diccionario o en internet.',
      '3': 'Significa simplemente mirar.',
      '4': 'Es una advertencia: ¡cuidado!',
    },
  },
  {
    chapter: 'B1 · Los verbos que cambian con la partícula',
    stem: 'Completa: «I can\'t find my keys. I\'ve been <b>______</b> them all morning.»',
    options: ['looking for', 'looking after', 'looking up', 'looking out', 'looking into'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Lee la pista de la frase anterior',
        p: 'Dice que no encuentra las llaves, así que las está buscando.',
        m: '',
      },
      {
        t: 'Elige el miembro correcto de la familia',
        p: 'Buscar algo perdido es «look for». Es el que más se confunde con «look after».',
        m: 'look for = buscar',
      },
    ],
    concept:
      'Dentro de una misma familia, la partícula cambia el significado por completo. El contexto de la frase es lo que permite elegir.',
    trick: 'Recuerda la pareja por el sentido: buscar es «for» —lo que quieres— y cuidar es «after» —ir detrás de alguien—.',
    distractors: {
      '1': 'Significa cuidar, y las llaves no se cuidan.',
      '2': 'Se usa para consultar un dato, no para buscar un objeto perdido.',
      '3': 'Es una advertencia.',
      '4': 'Significa investigar un asunto.',
    },
  },
  {
    chapter: 'B1 · Los verbos que cambian con la partícula',
    stem: 'La luz está encendida y quieres pedir que la apaguen refiriéndote a ella con un pronombre. ¿Cuál está bien?',
    options: ['Turn it off.', 'Turn off it.', 'It turn off.', 'Turn off it, please.', 'Off turn it.'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Comprueba si el phrasal verb se puede partir',
        p: '«Turn off» admite el objeto en medio o al final cuando es un sustantivo: turn off the light, turn the light off.',
        m: 'los dos órdenes valen con sustantivo',
      },
      {
        t: 'Aplica la regla del pronombre',
        p: 'Cuando el objeto es un pronombre —it, them, him—, la partición deja de ser opcional: va obligatoriamente en medio.',
        m: 'Turn it off  ✓\nTurn off it  ✗',
      },
    ],
    concept:
      'Con los phrasal verbs separables, un pronombre siempre va entre el verbo y la partícula. Es una de las pocas reglas fijas del tema.',
    trick: 'Si el objeto es una sola palabra corta como it o them, mételo en medio sin dudar.',
    distractors: {
      '1': 'Con pronombre, la partícula no puede ir antes.',
      '2': 'El orden deja la frase sin sentido.',
      '3': 'El «please» no arregla el orden.',
      '4': 'La partícula no va al principio.',
    },
  },
  {
    chapter: 'B1 · Los verbos que cambian con la partícula',
    stem: 'Completa: «He <b>______</b> smoking last year.» (dejó de fumar)',
    options: ['gave up', 'gave in', 'gave away', 'gave back', 'gave out'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ubica la familia',
        p: 'Todas son de «give», y cada partícula la lleva a un sitio distinto.',
        m: '',
      },
      {
        t: 'Elige por el significado',
        p: 'Abandonar un hábito o rendirse es «give up».',
        m: 'give up = dejar, rendirse',
      },
    ],
    concept:
      'La partícula es la que carga el significado. Aprender el verbo suelto no sirve de nada si no se aprende con cuál va.',
    trick: 'Muchos phrasal verbs con «up» implican terminar o completar: give up, finish up, use up, eat up.',
    distractors: {
      '1': 'Significa ceder ante una presión.',
      '2': 'Significa regalar.',
      '3': 'Significa devolver.',
      '4': 'Significa repartir.',
    },
  },
  {
    chapter: 'B1 · Los verbos que cambian con la partícula',
    stem: '¿Qué significa <b>run into</b> en «I ran into an old friend yesterday»?',
    options: [
      'Encontrarse con alguien por casualidad',
      'Chocar contra algo con un vehículo',
      'Entrar corriendo a un sitio',
      'Huir de alguien',
      'Quedarse sin algo',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Desconfía del sentido literal',
        p: 'Literalmente sería «correr hacia dentro de», que con una persona no tiene sentido en esta frase.',
        m: '',
      },
      {
        t: 'Usa el contexto',
        p: 'Se habla de un viejo amigo y de ayer. Encaja un encuentro inesperado.',
        m: 'run into someone = topárselo',
      },
      {
        t: 'Ten en cuenta que también tiene sentido literal',
        p: 'Con un objeto sí significa chocar: «the car ran into a wall». El complemento decide cuál de los dos es.',
        m: 'con persona → encontrarse\ncon objeto  → chocar',
      },
    ],
    concept:
      'Muchos phrasal verbs tienen un sentido literal y otro figurado. Lo que va detrás —una persona o una cosa— suele decidir cuál toca.',
    trick:
      'Cuando un phrasal verb no encaje literalmente, no lo descartes: busca el sentido figurado antes de darlo por incomprensible.',
    distractors: {
      '1': 'Es el sentido literal, y aplica a objetos, no a un amigo.',
      '2': 'Sería «run in», y tampoco es lo habitual.',
      '3': 'Huir sería «run away from».',
      '4': 'Quedarse sin algo es «run out of».',
    },
  },

  // ── B1 · Entender a velocidad real ────────────────────────────────────────
  {
    chapter: 'B1 · Entender a velocidad real',
    stem: '<b>«Gonna»</b> es la forma hablada de:',
    options: ['going to', 'gone to', 'got to', 'go to', 'want to'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Reconoce la reducción',
        p: 'En habla normal «going to» se comprime hasta sonar como una sola palabra.',
        m: 'going to → /ˈɡʌnə/ → gonna',
      },
      {
        t: 'No es jerga',
        p: 'La usan todos los registros hablados, también en una entrevista o una conferencia. Solo se evita al escribir.',
        m: '',
      },
    ],
    concept:
      'Las reducciones no son inglés descuidado: son la pronunciación normal. Reconocerlas es la diferencia entre entender una conversación y no entenderla.',
    trick: 'Las tres que más aparecen: gonna, wanna y gotta. Con esas tres ya cambia mucho lo que entiendes.',
    distractors: {
      '1': '«Gone to» no se reduce así.',
      '2': 'Esa es «gotta».',
      '3': '«Go to» no se contrae.',
      '4': 'Esa es «wanna».',
    },
  },
  {
    chapter: 'B1 · Entender a velocidad real',
    stem: 'Oyes algo que suena a <span class="math">/ˈwɒdʒə ˈwɒnə duː/</span>. ¿Qué frase es?',
    options: ['What do you want to do?', 'What did you want to do?', 'Where do you want to go?', 'What are you doing?', 'Why do you want to do it?'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Separa los bloques',
        p: '«What do you» se funde en «whaddaya» y «want to» en «wanna».',
        m: 'whaddaya + wanna + do',
      },
      {
        t: 'Reconstruye',
        p: 'Cada bloque se desanda hasta su forma escrita.',
        m: 'What do you want to do?',
      },
    ],
    concept:
      'El habla rápida funde grupos enteros de palabras. Reconocer el bloque completo funciona mejor que intentar oír cada palabra.',
    trick: 'Cuando algo suene a una sola palabra larga, prueba a ver si empieza por un auxiliar y un pronombre pegados.',
    distractors: {
      '1': 'El pasado sonaría «whadja», con otra consonante.',
      '2': 'Empezaría por «where», con otra vocal.',
      '3': 'No contiene «want to».',
      '4': 'Empezaría por «why».',
    },
  },
  {
    chapter: 'B1 · Entender a velocidad real',
    stem: '¿Por qué <b>«an apple»</b> suena como una sola palabra?',
    options: [
      'Porque la consonante final se une a la vocal siguiente',
      'Porque el artículo pierde su vocal',
      'Porque «apple» empieza por una letra muda',
      'Porque se acentúa solo la segunda palabra',
      'Porque es una excepción del artículo «an»',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en la frontera entre las dos palabras',
        p: '«An» acaba en consonante y «apple» empieza en vocal. Ahí es donde se pegan.',
        m: 'an + apple → a-napple',
      },
      {
        t: 'Comprueba que ocurre siempre',
        p: 'Es un fenómeno general, no una excepción de esta pareja.',
        m: 'pick it up → pi-ki-tup\nturn it off → tur-ni-toff',
      },
    ],
    concept:
      'En inglés las palabras no tienen fronteras sonoras: una consonante final busca la vocal siguiente. Por eso una frase corta puede sonar como una palabra larga.',
    trick: 'Al hablar, pega tú también. Separar cada palabra no te hace más claro: te hace más lento y más difícil de seguir.',
    distractors: {
      '1': 'La vocal del artículo se mantiene.',
      '2': 'La «a» de apple suena con normalidad.',
      '3': 'El acento no explica la fusión.',
      '4': 'Le pasa a cualquier pareja consonante-vocal.',
    },
  },
  {
    chapter: 'B1 · Entender a velocidad real',
    stem: 'En un audio, la palabra clave se te escapa. ¿Qué conviene hacer?',
    options: [
      'Seguir escuchando y deducirla por el contexto',
      'Detener el audio y buscarla en el diccionario',
      'Volver atrás inmediatamente a esa palabra',
      'Traducir mentalmente la frase anterior para situarte',
      'Abandonar el audio y buscar otro más fácil',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Piensa en qué te cuesta pararte',
        p: 'Mientras buscas o traduces, el audio sigue. Recuperas una palabra y pierdes tres frases.',
        m: '',
      },
      {
        t: 'Apuesta por el contexto',
        p: 'Casi siempre la frase siguiente aclara lo que faltaba. Entender el 80 % sin parar rinde más que el 100 % a trozos.',
        m: '',
      },
    ],
    concept:
      'Escuchar es una carrera de fondo: se avanza tolerando huecos. Rellenarlos todos en el momento es lo que hace imposible seguir un discurso largo.',
    trick: 'Escucha el mismo audio tres veces antes de pasar a otro. La segunda pasada rinde más que un audio nuevo.',
    distractors: {
      '1': 'Te saca del audio justo cuando más falta hace seguir.',
      '2': 'Rompe el hilo por una sola palabra.',
      '3': 'Traducir es precisamente lo que hay que dejar de hacer.',
      '4': 'Un audio algo por encima de tu nivel es el que más te enseña.',
    },
  },
  {
    chapter: 'B1 · Entender a velocidad real',
    stem: 'Muchos nativos escriben <b>«would of»</b> en vez de «would have». ¿Por qué?',
    options: [
      'Porque «have» se reduce a /əv/ y suena idéntico a «of»',
      'Porque «of» y «have» son intercambiables en ese contexto',
      'Porque es una forma antigua que sigue siendo válida',
      'Porque «would» exige «of» en registro informal',
      'Porque el corrector automático lo cambia',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Escucha la reducción',
        p: 'En «would have told you», el «have» no lleva acento y se comprime hasta casi desaparecer.',
        m: 'would have → /wʊdəv/',
      },
      {
        t: 'Compara con «of»',
        p: 'La preposición «of» átona suena exactamente igual: /əv/.',
        m: 'have átono = of átono = /əv/',
      },
      {
        t: 'Saca la conclusión útil',
        p: 'El error demuestra hasta qué punto se reduce. Si un nativo lo confunde al escribir, no esperes oír «have» completo al escuchar.',
        m: '',
      },
    ],
    concept:
      'Las palabras gramaticales se reducen tanto que llegan a confundirse entre sí. Escuchar buscando la forma completa es buscar algo que no está.',
    trick:
      'Cuando oigas /əv/ detrás de would, could o should, es «have». Y al escribir, siempre «have»: «would of» es incorrecto.',
    distractors: {
      '1': 'Significan cosas distintas: una es verbo y otra preposición.',
      '2': 'Nunca ha sido correcto; es un error ortográfico moderno.',
      '3': 'No existe tal exigencia.',
      '4': 'El error es anterior a los correctores.',
    },
  },

  // ── B2 · Lo que pudo haber sido ───────────────────────────────────────────
  {
    chapter: 'B2 · Lo que pudo haber sido',
    stem: 'Te enteras tarde de algo importante. Completa: «You <b>______</b> told me!»',
    options: ['should have', 'should', 'must have', 'could', 'would have'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Identifica qué estás haciendo',
        p: 'No deduces ni imaginas: reprochas. Lo correcto habría sido avisarte y no ocurrió.',
        m: 'reproche → should have',
      },
      {
        t: 'Monta la fórmula',
        p: 'Modal, have y participio. El participio de «tell» es «told».',
        m: 'should + have + told',
      },
    ],
    concept:
      'Should have expresa que lo correcto era otra cosa. Es la estructura del reproche y del arrepentimiento.',
    trick: 'En español dirías «deberías habérmelo dicho». Ese «haber» es el «have» inglés.',
    distractors: {
      '1': 'Sin «have» hablaría del presente o del futuro.',
      '2': 'Sería una deducción, no un reproche.',
      '3': 'Le falta el «have» y cambia el sentido.',
      '4': 'Expresaría una consecuencia hipotética, no un reproche.',
    },
  },
  {
    chapter: 'B2 · Lo que pudo haber sido',
    stem: 'Llegas y la casa está a oscuras y vacía. Completa: «They <b>______</b> left.»',
    options: ['must have', 'should have', 'could have to', 'can have', 'must'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en de dónde sacas la conclusión',
        p: 'No lo viste: lo deduces de lo que tienes delante. Y estás bastante seguro.',
        m: 'deducción con seguridad → must have',
      },
      {
        t: 'Compáralo con el reproche',
        p: '«They should have left» significaría que se tendrían que haber ido y no lo hicieron. Es otra cosa.',
        m: '',
      },
    ],
    concept:
      'Must have expresa una deducción firme sobre el pasado a partir de evidencia presente. Es el equivalente del «se habrán ido» español.',
    trick: 'Si en español te sale un futuro con valor de suposición —«habrán llegado», «estará dormido»—, en inglés casi siempre toca must.',
    distractors: {
      '1': 'Sería un reproche.',
      '2': 'Detrás del modal no va «to».',
      '3': 'Can no se usa para deducciones afirmativas.',
      '4': 'Sin «have» hablaría del presente.',
    },
  },
  {
    chapter: 'B2 · Lo que pudo haber sido',
    stem: 'Completa: «I <b>______</b> helped you, but you never asked.»',
    options: ['could have', 'should have', 'must have', 'can have', 'would'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira la segunda mitad',
        p: 'Dice que no lo pediste, así que la ayuda era posible pero no ocurrió. No hay reproche a uno mismo.',
        m: 'era posible y no pasó → could have',
      },
      {
        t: 'Distínguelo de should have',
        p: '«I should have helped you» sería reprocharse a sí mismo no haber ayudado. Aquí la culpa es del otro.',
        m: '',
      },
    ],
    concept:
      'Could have señala una posibilidad que existió y no se realizó, sin juzgarla. Should have sí juzga.',
    trick: 'Pregúntate si hay reproche. Si lo hay, should; si solo describes una posibilidad perdida, could.',
    distractors: {
      '1': 'Añadiría un reproche que la frase no tiene.',
      '2': 'Sería una deducción, que aquí no encaja.',
      '3': 'No se usa así en afirmativa.',
      '4': 'Le falta el «have» para referirse al pasado.',
    },
  },
  {
    chapter: 'B2 · Lo que pudo haber sido',
    stem: 'Completa: «He <b>______</b> seen it — he was asleep the whole time.»',
    options: ["can't have", "mustn't have", "shouldn't have", "couldn't to have", "didn't have"],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en que es una deducción negativa',
        p: 'Estás seguro de que NO ocurrió, y lo deduces de que estaba dormido.',
        m: 'seguro de que no → can’t have',
      },
      {
        t: 'Aprende la asimetría',
        p: 'La afirmativa es «must have» pero la negativa no es «mustn’t have»: es «can’t have». Es el único par del idioma que cambia de modal al negar.',
        m: 'must have  ↔  can’t have',
      },
    ],
    concept:
      'Para deducir, el inglés usa must en afirmativa y can’t en negativa. «Mustn’t» existe, pero significa prohibición, no deducción.',
    trick: 'Recuerda la pareja como una unidad: must have / can’t have. Nunca las mezcles con should.',
    distractors: {
      '1': 'Significaría prohibición, no deducción.',
      '2': 'Sería un reproche.',
      '3': 'Detrás del modal no va «to».',
      '4': 'Hablaría de posesión, no de deducción.',
    },
  },
  {
    chapter: 'B2 · Lo que pudo haber sido',
    stem: 'Tu amigo no llegó a la cita y no avisó. Después descubres que se quedó sin batería. ¿Cuál describe mejor tu reacción <b>antes</b> de saberlo?',
    options: [
      'He might have forgotten — I am not sure.',
      'He must have forgotten, so it is his fault.',
      'He should have forgotten.',
      "He can't have forgotten.",
      'He would have forgotten.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Mide cuánta certeza tienes',
        p: 'Antes de saber lo de la batería no tenías ninguna evidencia: solo barajabas posibilidades.',
        m: 'duda → might have',
      },
      {
        t: 'Recorre la escala',
        p: 'Los modales de pasado forman una escala de certeza, y elegir mal comunica una seguridad que no tienes.',
        m: 'must have   → casi seguro que sí\nmight have  → quizá\ncan’t have  → casi seguro que no',
      },
      {
        t: 'Descarta el reproche',
        p: 'Should have valoraría lo que debió hacer, no lo que crees que pasó.',
        m: '',
      },
    ],
    concept:
      'Los modales de pasado no solo cuentan hechos: dicen cuánta confianza tienes en lo que afirmas. Elegir el modal es elegir cuánto te comprometes.',
    trick:
      'Colócalos en una recta antes de elegir: can’t have — might have — must have. La evidencia que tengas decide dónde caes.',
    distractors: {
      '1': 'Afirma una certeza que en ese momento no tenías.',
      '2': 'No tiene sentido: nadie «debería haber olvidado».',
      '3': 'Descartaría el olvido, y era justo lo que sospechabas.',
      '4': 'Sería parte de un condicional, no una suposición.',
    },
  },

  // ── B2 · Contar lo que otro dijo ──────────────────────────────────────────
  {
    chapter: 'B2 · Contar lo que otro dijo',
    stem: '«I\'m tired», she said. Reporta: «She said she <b>______</b> tired.»',
    options: ['was', 'is', 'were', 'has been', 'be'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Retrocede un paso el tiempo',
        p: 'El presente del original pasa a pasado al reportarse.',
        m: 'am → was',
      },
      {
        t: 'Ajusta el pronombre',
        p: 'El «I» del original es ella, así que pasa a «she».',
        m: "I'm tired → she was tired",
      },
    ],
    concept:
      'Reportar mueve dos cosas a la vez: el tiempo verbal retrocede y los pronombres se recolocan desde el punto de vista de quien cuenta.',
    trick: 'Haz los dos cambios por separado: primero el pronombre, después el tiempo. Juntos se olvida uno.',
    distractors: {
      '1': 'No retrocede el tiempo.',
      '2': 'Correspondería a un sujeto plural.',
      '3': 'Cambia el sentido a algo que viene ocurriendo.',
      '4': 'Es la forma base, sin conjugar.',
    },
  },
  {
    chapter: 'B2 · Contar lo que otro dijo',
    stem: '«I\'ll call you tomorrow», he said. Reporta la frase completa.',
    options: [
      'He said he would call me the next day.',
      'He said he will call me tomorrow.',
      'He said he would call me tomorrow.',
      'He said that he call me the next day.',
      'He told he would call me the next day.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Retrocede el modal',
        p: 'Will pasa a would al reportarse.',
        m: 'will → would',
      },
      {
        t: 'Ajusta también el tiempo del calendario',
        p: 'Si lo cuentas otro día, «tomorrow» ya no es mañana: es el día siguiente a cuando lo dijo.',
        m: 'tomorrow → the next day',
      },
      {
        t: 'Comprueba el verbo de reporte',
        p: '«Say» no lleva complemento de persona directamente: sería «told me», no «told».',
        m: 'he said (that)…  ✓\nhe told me (that)…  ✓\nhe told (that)…  ✗',
      },
    ],
    concept:
      'Al reportar se mueven tres cosas: el tiempo verbal, los pronombres y las referencias de tiempo y lugar. Olvidar la tercera es lo más frecuente.',
    trick: 'Repasa la frase buscando palabras de calendario —today, tomorrow, here, this—: casi todas necesitan ajuste.',
    distractors: {
      '1': 'No retrocede el modal.',
      '2': 'Retrocede el modal pero deja «tomorrow» sin ajustar.',
      '3': 'El verbo se queda sin conjugar.',
      '4': '«Told» necesita complemento de persona.',
    },
  },
  {
    chapter: 'B2 · Contar lo que otro dijo',
    stem: '«Where do you work?», he asked. Reporta: «He asked <b>______</b>.»',
    options: ['where I worked', 'where did I work', 'where do I work', 'where I did work', 'where worked I'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Recuerda que deja de ser pregunta',
        p: 'Al reportarse se convierte en una frase normal dentro de otra. Pierde la inversión y el auxiliar.',
        m: 'sin do/does/did',
      },
      {
        t: 'Retrocede el tiempo',
        p: 'El presente del original pasa a pasado.',
        m: 'work → worked',
      },
    ],
    concept:
      'Una pregunta reportada tiene el orden de una afirmación. Es la misma regla de la pregunta indirecta, aplicada en pasado.',
    trick: 'Si en tu versión reportada aparece did, do o does, sobra. Quítalo y pon el tiempo en el verbo.',
    distractors: {
      '1': 'Mantiene el auxiliar, que en el reporte desaparece.',
      '2': 'Ni retrocede el tiempo ni quita el auxiliar.',
      '3': 'El «did» sobra por completo.',
      '4': 'Invierte el orden como si siguiera siendo pregunta.',
    },
  },
  {
    chapter: 'B2 · Contar lo que otro dijo',
    stem: '«I didn\'t do it!», he insisted. ¿Cuál reporta la escena con más precisión y menos palabras?',
    options: ['He denied doing it.', 'He said that he did not do it.', 'He told he had not done it.', 'He refused to do it.', 'He explained he did not do it.'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira qué actitud hay en el original',
        p: 'No solo informa: niega una acusación con énfasis.',
        m: 'negar una acusación → deny',
      },
      {
        t: 'Elige el verbo que ya la contiene',
        p: 'Deny reporta y valora a la vez, y va seguido de gerundio.',
        m: 'deny + -ing',
      },
    ],
    concept:
      'Los verbos de reporte llevan la actitud dentro. Admit, deny, insist, warn o complain ahorran media frase y dicen más que «said».',
    trick: 'Antes de escribir «he said that», pregúntate qué estaba haciendo al decirlo. Suele existir un verbo exacto.',
    distractors: {
      '1': 'Es correcto pero neutro: pierde el énfasis de la negación.',
      '2': '«Told» necesita complemento de persona.',
      '3': 'Significaría que se negó a hacerlo, no que negó haberlo hecho.',
      '4': 'Explicar no es negar una acusación.',
    },
  },
  {
    chapter: 'B2 · Contar lo que otro dijo',
    stem: 'Ana te dijo hace un rato «I live in Lima», y sigue viviendo allí. ¿Cuál es preferible?',
    options: [
      'She said she lives in Lima.',
      'She said she had lived in Lima.',
      'She said she would live in Lima.',
      'She said she was living in Lima at that moment.',
      'She told she lives in Lima.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Comprueba si sigue siendo verdad',
        p: 'Vive en Lima ahora, no solo cuando lo dijo.',
        m: 'sigue vigente',
      },
      {
        t: 'Aplica la excepción',
        p: 'Cuando lo dicho sigue siendo cierto, el tiempo puede quedarse en presente. Retroceder daría a entender que quizá ya no vive allí.',
        m: 'she lives  ✓  (sigue)\nshe lived  →  suena a que ya no',
      },
      {
        t: 'Ten en cuenta el matiz',
        p: 'Retroceder no es un error gramatical, pero cambia lo que el otro entiende. Y comunicar bien es elegir lo que no confunde.',
        m: '',
      },
    ],
    concept:
      'El retroceso de tiempos no es automático. Si lo reportado sigue vigente, mantener el presente es más preciso y más natural.',
    trick: 'Pregúntate si sigue siendo verdad. Si lo es, puedes dejar el tiempo quieto; si ya no, retrocédelo.',
    distractors: {
      '1': 'Sugiere que vivió allí y ya no.',
      '2': 'Convierte un hecho actual en un plan.',
      '3': 'Limita el hecho a aquel momento.',
      '4': '«Told» necesita complemento de persona.',
    },
  },

  // ── B2 · Sonar natural, no correcto ───────────────────────────────────────
  {
    chapter: 'B2 · Sonar natural, no correcto',
    stem: '¿Cómo se dice <b>«llovió muy fuerte»</b> de forma natural?',
    options: ['It rained heavily.', 'It rained strongly.', 'It rained hardly.', 'It rained powerfully.', 'It rained big.'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'No traduzcas el adjetivo',
        p: 'La lluvia intensa en inglés es «heavy», que literalmente sería pesada. No hay razón lógica: es la combinación que se usa.',
        m: 'heavy rain / it rained heavily',
      },
      {
        t: 'Cuidado con una trampa',
        p: '«Hardly» no significa «con fuerza» sino «apenas». Es un falso amigo peligroso.',
        m: 'hardly = apenas  ✗',
      },
    ],
    concept:
      'Las colocaciones no siguen ninguna lógica: son acuerdos del idioma. Traducir el adjetivo produce frases correctas que nadie dice.',
    trick: 'Con lluvia, tráfico y acento, el adjetivo es «heavy». Con café y viento, «strong».',
    distractors: {
      '1': 'Gramaticalmente posible, pero no se usa con la lluvia.',
      '2': '«Hardly» significa apenas: diría lo contrario.',
      '3': 'No se combina con la lluvia.',
      '4': 'No es una combinación real.',
    },
  },
  {
    chapter: 'B2 · Sonar natural, no correcto',
    stem: 'Completa con la palabra natural: «I need a <b>______</b> coffee to wake up.»',
    options: ['strong', 'hard', 'heavy', 'powerful', 'thick'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Recuerda que cada sustantivo tiene su adjetivo',
        p: 'El café cargado es «strong», aunque la lluvia intensa sea «heavy». No hay coherencia entre ellos.',
        m: 'strong coffee  ✓\nheavy coffee   ✗',
      },
      {
        t: 'Amplía la familia',
        p: '«Strong» acompaña también a acento, opinión y viento.',
        m: 'strong accent · strong opinion · strong wind',
      },
    ],
    concept:
      'La misma idea de intensidad se expresa con adjetivos distintos según el sustantivo. Hay que aprender la pareja, no el adjetivo.',
    trick: 'Cuando aprendas un sustantivo nuevo, apunta con qué adjetivo de intensidad va. Es un dato tan útil como el significado.',
    distractors: {
      '1': 'Se usa con trabajo o con agua, no con café.',
      '2': 'Va con lluvia o tráfico.',
      '3': 'Se usa para máquinas o argumentos.',
      '4': 'Describiría la textura, no la intensidad.',
    },
  },
  {
    chapter: 'B2 · Sonar natural, no correcto',
    stem: '¿Cuál es la combinación correcta para «<b>cometer un delito</b>»?',
    options: ['commit a crime', 'do a crime', 'make a crime', 'take a crime', 'perform a crime'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Descarta los verbos genéricos',
        p: 'Do y make cubren mucho, pero no esto. El delito tiene su propio verbo.',
        m: 'commit a crime',
      },
      {
        t: 'Aprende la familia de commit',
        p: 'Acompaña a lo grave y a lo que compromete.',
        m: 'commit a crime · a mistake ·\nsuicide · to a plan',
      },
    ],
    concept:
      'Algunos sustantivos exigen un verbo específico que no es ni do ni make. Se aprenden de uno en uno y aparecen constantemente en prensa.',
    trick: 'Si el sustantivo pertenece al mundo legal o formal, desconfía de do y make: casi seguro tiene verbo propio.',
    distractors: {
      '1': 'No se usa con crime.',
      '2': 'Tampoco.',
      '3': 'No existe esa combinación.',
      '4': 'Se usa para tareas o funciones, no para delitos.',
    },
  },
  {
    chapter: 'B2 · Sonar natural, no correcto',
    stem: '¿Cuál diría un nativo?',
    options: [
      'She takes a big interest in politics.',
      'She takes a keen interest in politics.',
      'She makes a keen interest in politics.',
      'She does a keen interest in politics.',
      'She puts a keen interest in politics.',
    ],
    answer: 1,
    difficulty: 2,
    steps: [
      {
        t: 'Fija primero el verbo',
        p: 'El interés se «toma»: take an interest. Ese es el bloque.',
        m: 'take an interest in…',
      },
      {
        t: 'Ahora el adjetivo',
        p: 'Un interés intenso es «keen», no «big». «Big» funciona con otros sustantivos, no con este.',
        m: 'a keen interest  ✓\na big interest   ✗',
      },
    ],
    concept:
      'Una colocación puede fallar por el verbo o por el adjetivo. Hay que acertar los dos, y por eso conviene guardar la frase entera.',
    trick: 'Si dudas entre dos adjetivos, busca la combinación exacta en un buscador entre comillas. La que aparezca miles de veces es la real.',
    distractors: {
      '0': 'El verbo es correcto pero «big» no acompaña a «interest».',
      '2': 'El interés no se «hace».',
      '3': 'Tampoco se «do».',
      '4': 'No es una combinación usada.',
    },
  },
  {
    chapter: 'B2 · Sonar natural, no correcto',
    stem: '¿Por qué importa una colocación si la frase se entiende igual?',
    options: [
      'Porque la combinación esperada se procesa más rápido y no distrae al que escucha',
      'Porque las combinaciones inusuales son gramaticalmente incorrectas',
      'Porque los exámenes penalizan cualquier sinónimo',
      'Porque el inglés no admite sinónimos',
      'Porque cambian por completo el significado de la frase',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Descarta lo que no es cierto',
        p: '«Strong rain» no es incorrecto ni cambia el significado. Se entiende perfectamente.',
        m: '',
      },
      {
        t: 'Piensa en quien escucha',
        p: 'El oído nativo predice la palabra que viene. Cuando llega la esperada, no gasta atención; cuando llega otra, se detiene un instante a comprobar.',
        m: 'esperada → fluye\ninusual  → interrumpe',
      },
      {
        t: 'Saca la consecuencia',
        p: 'Una frase con la colocación correcta no se nota, y eso es exactamente el objetivo del B2: dejar de notarse.',
        m: '',
      },
    ],
    concept:
      'Las colocaciones no van de corrección sino de fluidez ajena: la combinación esperada libera atención en quien escucha para lo que de verdad quieres decir.',
    trick:
      'Mide tu nivel por cuántas veces interrumpes a quien te escucha, no por cuántos errores cometes. En el B2 esa es la métrica.',
    distractors: {
      '1': 'Son gramaticalmente correctas: ese no es el problema.',
      '2': 'Los exámenes valoran la naturalidad, no penalizan todo sinónimo.',
      '3': 'El inglés está lleno de sinónimos; lo que no admite es cualquier combinación.',
      '4': 'El significado se mantiene: por eso el problema es sutil.',
    },
  },

  // ── B2 · Defender una postura por escrito ─────────────────────────────────
  {
    chapter: 'B2 · Defender una postura por escrito',
    stem: '¿Cuál es la mejor <b>frase de apertura</b> de un párrafo académico?',
    options: [
      'Social media has changed how teenagers build friendships.',
      'In this paragraph I am going to talk about social media.',
      'Social media is a very interesting topic with many aspects.',
      'Let us look at social media and see what happens.',
      'There are many things to say about social media.',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Recuerda para qué sirve la primera frase',
        p: 'Debe decir qué va a demostrar el párrafo, no de qué va a hablar.',
        m: 'afirmación defendible',
      },
      {
        t: 'Comprueba que se pueda discutir',
        p: 'Una buena apertura admite que alguien esté en desacuerdo. Anunciar el tema no admite desacuerdo porque no afirma nada.',
        m: '',
      },
    ],
    concept:
      'La topic sentence es una afirmación discutible, no un anuncio del tema. Es lo primero que se corrige en un texto de examen.',
    trick: 'Prueba a responder «¿y qué?» a tu primera frase. Si no tiene respuesta, todavía no es una topic sentence.',
    distractors: {
      '1': 'Anuncia el tema sin afirmar nada.',
      '2': 'Es vago y no se puede defender.',
      '3': 'Es conversacional y tampoco afirma.',
      '4': 'No compromete a ninguna postura.',
    },
  },
  {
    chapter: 'B2 · Defender una postura por escrito',
    stem: 'En un texto formal, ¿cuál es la versión adecuada?',
    options: [
      'The government decided to postpone the reform.',
      "The government didn't want to put off the reform.",
      'The government put off the reform, which is a shame.',
      "The kids didn't like it, so they put it off.",
      "They found out it wasn't gonna work.",
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Revisa las contracciones',
        p: 'En registro formal se escriben completas: does not, did not.',
        m: "didn't → did not",
      },
      {
        t: 'Sustituye los phrasal verbs por su equivalente culto',
        p: 'Cuando existe el verbo de origen latino, el texto formal lo prefiere.',
        m: 'put off → postpone\nfind out → discover',
      },
      {
        t: 'Elimina las valoraciones personales',
        p: '«Which is a shame» opina; en un texto académico la valoración se argumenta, no se suelta.',
        m: '',
      },
    ],
    concept:
      'El registro formal es una convención, no una cuestión de elegancia. Quien corrige espera contracciones expandidas y vocabulario culto.',
    trick: 'Al revisar, busca apóstrofos y phrasal verbs. Son los dos rastros más fáciles de detectar y corregir.',
    distractors: {
      '1': 'Contracción y phrasal verb coloquial.',
      '2': 'Añade una valoración sin argumentar.',
      '3': '«Kids» es coloquial y hay contracción.',
      '4': '«Gonna» no se escribe nunca en registro formal.',
    },
  },
  {
    chapter: 'B2 · Defender una postura por escrito',
    stem: 'Los datos muestran una relación, pero no una causa. ¿Cómo conviene escribirlo?',
    options: [
      'This suggests that screen time may contribute to poor sleep.',
      'This proves that screen time causes poor sleep.',
      'This obviously shows that screen time destroys sleep.',
      'Everybody knows that screen time causes poor sleep.',
      'It is clear that screen time is the cause of poor sleep.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mide qué permite afirmar la evidencia',
        p: 'Una relación no es una causa. Escribir «proves» afirma más de lo que los datos sostienen.',
        m: 'relación ≠ causa',
      },
      {
        t: 'Usa el verbo con la fuerza justa',
        p: 'Suggest, indicate y tend to dejan la afirmación en su sitio.',
        m: 'suggests + may contribute',
      },
    ],
    concept:
      'Medir la fuerza de lo que se afirma —el hedging— es señal de madurez académica. Exagerar la certeza es el error más común al pasar de B1 a B2.',
    trick: 'Desconfía de «proves», «obviously» y «everybody knows». Casi siempre son señales de que te estás pasando.',
    distractors: {
      '1': 'Afirma causalidad donde solo hay correlación.',
      '2': '«Obviously» y «destroys» exageran.',
      '3': 'Apelar al sentido común no es argumentar.',
      '4': 'Sigue afirmando causa directa.',
    },
  },
  {
    chapter: 'B2 · Defender una postura por escrito',
    stem: 'Quieres reconocer una objeción y aun así sostener tu postura. ¿Qué conector usas?',
    options: [
      'Although the evidence is limited, the trend is consistent.',
      'Because the evidence is limited, the trend is consistent.',
      'The evidence is limited, so the trend is consistent.',
      'Moreover, the evidence is limited and the trend is consistent.',
      'The evidence is limited, and the trend is consistent.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Identifica la relación que necesitas',
        p: 'Quieres admitir algo en contra y mantener tu conclusión. Eso es una concesión.',
        m: 'concesión → although, while, despite',
      },
      {
        t: 'Comprueba que las otras no sirven',
        p: 'Because y so afirmarían que la evidencia limitada causa la consistencia, que es absurdo.',
        m: '',
      },
    ],
    concept:
      'Reconocer la objeción antes de rebatirla es lo que separa un argumento de una opinión. El conector concesivo es la herramienta que lo hace.',
    trick: 'Un párrafo argumentativo sólido casi siempre contiene un «although» o un «however». Si no lo tiene, revisa si estás ignorando lo que te contradice.',
    distractors: {
      '1': 'Convierte la limitación en causa, que no tiene sentido.',
      '2': 'Igual problema con «so».',
      '3': '«Moreover» suma en vez de conceder.',
      '4': 'La simple «and» no marca ninguna relación.',
    },
  },
  {
    chapter: 'B2 · Defender una postura por escrito',
    stem: 'Un párrafo tuyo tiene: una afirmación sobre el transporte público, un dato sobre contaminación y una conclusión sobre educación. ¿Cuál es el problema?',
    options: [
      'Contiene más de una idea: el párrafo debe defender una sola',
      'Es demasiado corto para un texto académico',
      'Le falta una cita de una fuente',
      'El orden de las frases está invertido',
      'No usa suficientes conectores',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Comprueba la unidad del párrafo',
        p: 'Transporte, contaminación y educación son tres asuntos. Un párrafo defiende uno.',
        m: 'un párrafo = una idea',
      },
      {
        t: 'Mira si la prueba apoya la afirmación',
        p: 'El dato de contaminación puede apoyar la afirmación sobre transporte. Lo que no encaja es la conclusión sobre educación.',
        m: '',
      },
      {
        t: 'Decide la corrección',
        p: 'La conclusión ajena se saca y se lleva a su propio párrafo, o se elimina.',
        m: '',
      },
    ],
    concept:
      'La unidad del párrafo es la regla estructural más importante del inglés académico: una idea, su desarrollo, su prueba y su enlace.',
    trick:
      'Al revisar, resume cada párrafo en una frase. Si no puedes sin usar un «y además», es que contiene más de una idea.',
    distractors: {
      '1': 'La longitud no es el problema principal.',
      '2': 'Una cita ayudaría, pero no es el fallo estructural.',
      '3': 'El orden no explica que sobre una idea.',
      '4': 'Más conectores no arreglarían la falta de unidad.',
    },
  },

  // ── B2 · Escuchar contenido académico ─────────────────────────────────────
  {
    chapter: 'B2 · Escuchar contenido académico',
    stem: 'En una conferencia oyes «<b>To sum up</b>». ¿Qué anuncia?',
    options: ['La conclusión: viene lo más importante', 'Un ejemplo que ilustra lo anterior', 'Una objeción a lo dicho', 'Un cambio de tema', 'Una repetición literal'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Reconoce la señal',
        p: 'No aporta contenido: avisa de qué papel juega lo que viene.',
        m: 'to sum up → conclusión',
      },
      {
        t: 'Aprovéchala',
        p: 'Es el momento de más atención de toda la exposición: ahí se condensa lo que hay que retener.',
        m: '',
      },
    ],
    concept:
      'Las expresiones de señalización son el mapa de una exposición. Reconocerlas permite seguir el hilo aunque falten palabras.',
    trick: 'Cuando oigas «to sum up», «in conclusion» o «the key point is», deja de escribir y escucha.',
    distractors: {
      '1': 'Sería «for instance» o «for example».',
      '2': 'Sería «however» o «on the other hand».',
      '3': 'Sería «moving on» o «turning to».',
      '4': 'Sería «in other words».',
    },
  },
  {
    chapter: 'B2 · Escuchar contenido académico',
    stem: '«<b>In other words</b>, the policy failed.» ¿Qué está haciendo quien habla?',
    options: ['Repitiendo la misma idea de forma más clara', 'Introduciendo una idea nueva', 'Citando a otro autor', 'Poniendo un ejemplo', 'Contradiciendo lo anterior'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Traduce la señal',
        p: '«En otras palabras» anuncia una reformulación, no información nueva.',
        m: 'reformulación',
      },
      {
        t: 'Úsalo a tu favor',
        p: 'Si perdiste la idea anterior, esta es tu segunda oportunidad: la va a decir más simple.',
        m: '',
      },
    ],
    concept:
      'Las reformulaciones son la red de seguridad de una conferencia: quien habla repite lo esencial con otras palabras porque sabe que no todos lo captaron.',
    trick: 'Si te perdiste, no retrocedas: espera. «In other words» o «that is to say» suelen llegar en menos de un minuto.',
    distractors: {
      '1': 'Es justo lo contrario: repite la anterior.',
      '2': 'Una cita se anuncia con «according to».',
      '3': 'Un ejemplo se anuncia con «for instance».',
      '4': 'Contradecir sería «however».',
    },
  },
  {
    chapter: 'B2 · Escuchar contenido académico',
    stem: 'El profesor dice: «<b>For instance</b>, in 2018 the figure dropped by half». ¿Qué conviene anotar?',
    options: [
      'Que hay un ejemplo con cifra: 2018, cayó a la mitad',
      'La frase completa, palabra por palabra',
      'Nada: los ejemplos no se anotan',
      'Solo la expresión «for instance»',
      'Una traducción al español de toda la frase',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Reconoce el tipo de información',
        p: '«For instance» avisa de que no es una idea nueva, sino una ilustración.',
        m: 'ejemplo, no tesis',
      },
      {
        t: 'Pero fíjate en la cifra',
        p: 'Los datos numéricos sí se apuntan: son lo que no se puede reconstruir después.',
        m: '2018 · −50 %',
      },
    ],
    concept:
      'Tomar notas es decidir qué no se puede reconstruir luego. Las ideas se recuerdan; las cifras y los nombres propios, no.',
    trick: 'Usa símbolos y abreviaturas: flechas, porcentajes, iniciales. Escribir frases completas te saca del audio.',
    distractors: {
      '1': 'Escribir todo te hace perder lo siguiente.',
      '2': 'La cifra sí merece anotarse.',
      '3': 'La señal sola no informa de nada.',
      '4': 'Traducir es justo lo que hay que dejar de hacer.',
    },
  },
  {
    chapter: 'B2 · Escuchar contenido académico',
    stem: '¿Cuál es el error más costoso al escuchar una exposición larga?',
    options: [
      'Traducir mentalmente mientras el que habla avanza',
      'No conocer todo el vocabulario técnico',
      'No tomar notas suficientes',
      'Escuchar sin haber leído antes sobre el tema',
      'No sentarse cerca del que habla',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mide el coste de cada opción',
        p: 'Desconocer una palabra cuesta una idea. Traducir cuesta todas las que vengan mientras traduces.',
        m: '',
      },
      {
        t: 'Entiende por qué no se puede',
        p: 'Traducir es una tarea consciente y lenta; escuchar en tiempo real exige dejarla ir.',
        m: 'traducir ≠ entender',
      },
    ],
    concept:
      'La comprensión oral avanzada exige procesar en inglés, no en español. Traducir es la muleta que hay que soltar para llegar al B2.',
    trick: 'Entrena con contenido que ya te interese en español: el conocimiento previo sustituye a la traducción.',
    distractors: {
      '1': 'Se resuelve por contexto y cuesta mucho menos.',
      '2': 'Notas de más es peor que notas de menos.',
      '3': 'Ayuda mucho, pero no es el error más caro.',
      '4': 'Es logística, no comprensión.',
    },
  },
  {
    chapter: 'B2 · Escuchar contenido académico',
    stem: 'Oyes: «Firstly, the economic impact. <b>More importantly, however</b>, the social cost was higher.» ¿Qué acaba de ocurrir?',
    options: [
      'Anuncia una objeción y además señala que eso pesa más que lo anterior',
      'Anuncia el segundo punto de una lista, con el mismo peso',
      'Concluye la exposición',
      'Repite lo anterior con otras palabras',
      'Introduce un ejemplo del impacto económico',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Separa las dos señales',
        p: 'Hay dos juntas, y cada una hace algo distinto.',
        m: 'however → objeción\nmore importantly → jerarquía',
      },
      {
        t: 'Combínalas',
        p: 'No solo cambia de punto: avisa de que este vale más que el anterior. Eso es información sobre la estructura del argumento.',
        m: '',
      },
      {
        t: 'Decide qué anotar',
        p: 'Lo que viene detrás merece más espacio en tus notas que lo primero.',
        m: 'coste social > impacto económico',
      },
    ],
    concept:
      'Las señales no solo ordenan: jerarquizan. Quien habla te está diciendo qué pesa más, y eso es exactamente lo que hay que retener.',
    trick:
      'Marca en tus notas lo que venga detrás de «more importantly», «crucially» o «the key point is». Suele ser lo que luego se pregunta.',
    distractors: {
      '1': 'El «more importantly» rompe la igualdad de la lista.',
      '2': 'Concluir sería «to sum up».',
      '3': 'Repetir sería «in other words».',
      '4': 'Un ejemplo se anuncia con «for instance».',
    },
  },

  // ── C1 · Poner el foco donde quieres ──────────────────────────────────────
  {
    chapter: 'C1 · Poner el foco donde quieres',
    stem: 'Completa: «Never <b>______</b> such a thing.»',
    options: ['have I seen', 'I have seen', 'I saw', 'did I saw', 'saw I'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Fíjate en cómo empieza la frase',
        p: 'Abre con un adverbio negativo, y eso obliga a invertir.',
        m: 'never al inicio → inversión',
      },
      {
        t: 'Invierte solo el auxiliar',
        p: 'El auxiliar pasa delante del sujeto, como en una pregunta. El verbo principal se queda donde estaba.',
        m: 'have + I + seen',
      },
    ],
    concept:
      'Cuando una expresión negativa o restrictiva abre la frase, el inglés invierte sujeto y auxiliar. No es opcional.',
    trick: 'Móntala primero como pregunta —«have I seen…?»— y después ponle el «never» delante.',
    distractors: {
      '1': 'Le falta la inversión que exige el «never» inicial.',
      '2': 'Ni invierte ni usa auxiliar.',
      '3': 'Con «did» el verbo va en forma base.',
      '4': 'Invierte el verbo principal en vez del auxiliar.',
    },
  },
  {
    chapter: 'C1 · Poner el foco donde quieres',
    stem: 'Completa: «Not only <b>______</b> late, but he also forgot the tickets.»',
    options: ['did he arrive', 'he arrived', 'he did arrive', 'arrived he', 'did he arrived'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Reconoce la expresión restrictiva',
        p: '«Not only» al principio funciona igual que «never»: exige inversión.',
        m: 'not only → inversión',
      },
      {
        t: 'Añade el auxiliar que no había',
        p: 'La frase original no tenía auxiliar, así que hay que introducir «did», como en las preguntas del presente simple.',
        m: 'he arrived → did he arrive',
      },
    ],
    concept:
      'Si la frase no tiene auxiliar propio, la inversión lo pide prestado: do, does o did según el tiempo.',
    trick: 'Después de «did» el verbo va siempre en forma base. Es la misma regla del A2, aplicada aquí.',
    distractors: {
      '1': 'Falta la inversión.',
      '2': 'El orden no está invertido.',
      '3': 'Invierte el verbo principal.',
      '4': 'Con «did» el verbo no lleva pasado.',
    },
  },
  {
    chapter: 'C1 · Poner el foco donde quieres',
    stem: 'Quieres destacar que fue <b>Ana</b> y no otra persona quien llamó. ¿Cuál es la forma adecuada?',
    options: [
      'It was Ana who called yesterday.',
      'Ana was who called yesterday.',
      'It was Ana that she called yesterday.',
      'Was Ana who called yesterday.',
      'It is Ana who called yesterday.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Reconoce la estructura hendida',
        p: 'Para destacar un elemento, el inglés parte la frase: «it + be + elemento + who/that».',
        m: 'It was Ana who…',
      },
      {
        t: 'Ajusta el tiempo del verbo be',
        p: 'La llamada fue ayer, así que va en pasado.',
        m: 'was, no is',
      },
    ],
    concept:
      'Las frases hendidas ponen bajo el foco un elemento concreto. Con personas se usa «who»; con cosas, «that».',
    trick: 'El foco es lo que va justo después de «it was». Si cambias ese hueco, cambias lo que subrayas.',
    distractors: {
      '1': 'Le falta el «it» inicial.',
      '2': 'Duplica el sujeto con «she».',
      '3': 'Sin «it» la frase queda como pregunta incompleta.',
      '4': 'El presente choca con «yesterday».',
    },
  },
  {
    chapter: 'C1 · Poner el foco donde quieres',
    stem: '¿Qué consigue la estructura «<b>What I need is more time</b>» frente a «I need more time»?',
    options: [
      'Pone el foco en la necesidad y la presenta como el punto central',
      'Convierte la frase en una pregunta indirecta',
      'La hace más formal sin cambiar el énfasis',
      'Indica que la necesidad es pasada',
      'Suaviza la petición para sonar más cortés',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Compara las dos frases',
        p: 'Dicen lo mismo, pero la segunda anuncia primero que va a decir qué necesita y lo revela al final.',
        m: 'What I need is…  → suspense y foco',
      },
      {
        t: 'Identifica el efecto',
        p: 'Retrasar el elemento clave lo destaca. Es la misma lógica del «lo que necesito es» español.',
        m: '',
      },
    ],
    concept:
      'La hendida con «what» destaca la idea completa, no un elemento suelto. Se usa para marcar el punto central de un argumento.',
    trick: 'Si estás escribiendo y quieres que una idea no pase desapercibida, prueba a reescribirla con «What… is…».',
    distractors: {
      '1': 'No es una pregunta, aunque empiece por «what».',
      '2': 'Sí cambia el énfasis: ese es todo su sentido.',
      '3': 'El tiempo no cambia.',
      '4': 'Destaca, no suaviza.',
    },
  },
  {
    chapter: 'C1 · Poner el foco donde quieres',
    stem: 'Quieres subrayar que la llamada fue <b>ayer</b> y no otro día. ¿Cuál eliges?',
    options: [
      'It was yesterday that Ana called.',
      'It was Ana who called yesterday.',
      'What Ana did was call yesterday.',
      'Yesterday Ana called.',
      'Ana called yesterday, indeed.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Decide qué va bajo el foco',
        p: 'En una hendida, lo destacado es lo que ocupa el hueco después de «it was». Aquí quieres el día.',
        m: 'It was + [foco] + that…',
      },
      {
        t: 'Comprueba el conector',
        p: 'Con un tiempo o un lugar se usa «that», no «who». «Who» solo con personas.',
        m: 'It was yesterday that…',
      },
      {
        t: 'Descarta las que destacan otra cosa',
        p: 'Todas son correctas y todas subrayan algo distinto. Eso es lo que se evalúa en el C1.',
        m: 'Ana → quién\nyesterday → cuándo',
      },
    ],
    concept:
      'Varias estructuras pueden ser correctas a la vez y destacar cosas distintas. Elegir la adecuada es elegir qué quieres que el lector retenga.',
    trick:
      'Antes de escribir la hendida, pregúntate qué palabra respondería a la objeción del lector. Esa es la que va bajo el foco.',
    distractors: {
      '1': 'Destaca a Ana, no el día.',
      '2': 'Destaca la acción de llamar.',
      '3': 'Adelanta el día pero sin construir foco.',
      '4': 'Refuerza la frase entera, sin señalar el día.',
    },
  },

  // ── C1 · Los matices que separan C1 de B2 ─────────────────────────────────
  {
    chapter: 'C1 · Los matices que separan C1 de B2',
    stem: 'En una noticia, «The company <b>claimed</b> the data was secure» sugiere que quien escribe:',
    options: [
      'No respalda la afirmación y marca distancia',
      'Confirma que los datos estaban seguros',
      'Cita textualmente un documento oficial',
      'Considera el asunto poco relevante',
      'Está de acuerdo con la empresa',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Fíjate en el verbo de reporte',
        p: '«Claim» reporta lo dicho y a la vez señala que quien escribe no lo hace suyo.',
        m: 'claim → lo dice él, no yo',
      },
      {
        t: 'Compáralo con el neutro',
        p: '«Said» habría sido neutro. Elegir «claimed» es una decisión editorial, no una cuestión de estilo.',
        m: '',
      },
    ],
    concept:
      'Los verbos de reporte llevan una valoración implícita. En periodismo, elegir uno u otro puede equivaler a una acusación encubierta.',
    trick: 'Si no quieres opinar, usa «said» o «stated». Todo lo demás añade algo.',
    distractors: {
      '1': 'Es justo lo contrario.',
      '2': 'Una cita textual iría entre comillas.',
      '3': 'La relevancia no la marca este verbo.',
      '4': '«Claim» marca distancia, no acuerdo.',
    },
  },
  {
    chapter: 'C1 · Los matices que separan C1 de B2',
    stem: 'En un correo profesional quieres señalar algo que va mal sin que suene a reproche. ¿Qué palabra eliges?',
    options: ['concern', 'problem', 'disaster', 'fault', 'complaint'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ordena las palabras por dureza',
        p: 'Todas nombran algo que no va bien, pero no con la misma carga.',
        m: 'concern < issue < problem < fault',
      },
      {
        t: 'Elige la que no atribuye culpa',
        p: '«Concern» presenta el asunto como algo que preocupa, sin señalar a nadie. Es la que deja la puerta abierta.',
        m: 'I have a concern about…',
      },
    ],
    concept:
      'El registro profesional en inglés atenúa deliberadamente. Elegir la palabra dura donde tocaba la suave se lee como una acusación.',
    trick: 'En un correo de trabajo, empieza siempre por la palabra más suave. Siempre puedes endurecer después; retroceder es más caro.',
    distractors: {
      '1': 'Es correcto pero más directo: puede leerse como reproche.',
      '2': 'Exagera y suena alarmista.',
      '3': 'Atribuye culpa explícitamente.',
      '4': 'Convierte el aviso en una queja formal.',
    },
  },
  {
    chapter: 'C1 · Los matices que separan C1 de B2',
    stem: 'En un informe formal, ¿cuál es la mejor forma de decir que hubo <b>muchos</b> errores?',
    options: [
      'A considerable number of errors were identified.',
      'There were a lot of errors.',
      'There were tons of errors.',
      'We found loads of mistakes.',
      'There were many many errors.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Descarta lo coloquial',
        p: '«A lot of», «tons of» y «loads of» pertenecen a la conversación.',
        m: '',
      },
      {
        t: 'Elige el cuantificador preciso y el registro impersonal',
        p: '«A considerable number» cuantifica sin exagerar, y la pasiva quita al autor de en medio.',
        m: 'considerable + pasiva',
      },
    ],
    concept:
      'Las palabras comodín son la marca del B2. Sustituirlas por cuantificadores precisos es lo primero que sube un texto de nivel.',
    trick: 'Haz una lista de tus comodines —a lot of, things, get, very— y búscalos al revisar. Cada uno tiene un equivalente exacto.',
    distractors: {
      '1': 'Correcto pero coloquial.',
      '2': 'Muy informal.',
      '3': 'Informal y además personal.',
      '4': 'Repetir el intensificador no lo hace más formal.',
    },
  },
  {
    chapter: 'C1 · Los matices que separan C1 de B2',
    stem: '¿Qué verbo de reporte usarías para алгo que alguien reconoció a regañadientes?',
    options: ['admitted', 'stated', 'claimed', 'announced', 'suggested'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Busca el que lleva la resistencia dentro',
        p: '«Admit» implica que decirlo iba en contra del propio interés.',
        m: 'admit → costó reconocerlo',
      },
      {
        t: 'Comprueba los demás',
        p: 'Cada uno aporta otra cosa: neutralidad formal, distancia, publicidad o tentativa.',
        m: 'state → formal neutro\nclaim → distancia\nannounce → público\nsuggest → tentativo',
      },
    ],
    concept:
      'Un solo verbo puede sustituir a media frase de explicación. Elegirlo bien es lo que hace un texto denso sin ser largo.',
    trick: 'Cuando vayas a escribir «he said that, although he did not want to», busca el verbo que ya diga eso.',
    distractors: {
      '1': 'Es neutro y formal, sin resistencia.',
      '2': 'Marca distancia, no reconocimiento.',
      '3': 'Implica comunicación pública y voluntaria.',
      '4': 'Es tentativo, no un reconocimiento.',
    },
  },
  {
    chapter: 'C1 · Los matices que separan C1 de B2',
    stem: 'Ambas frases son correctas. ¿Cuál es preferible en el resumen de un artículo científico?',
    options: [
      'The results indicate a possible association between the two variables.',
      'The results clearly prove that one variable causes the other.',
      'We really think the two things are connected somehow.',
      'It is obvious that the variables are related.',
      'The results definitely show a strong link between both.',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Mide qué permite afirmar el dato',
        p: 'Una asociación entre variables no demuestra causalidad. Afirmarla es un error de fondo, no de estilo.',
        m: 'asociación ≠ causa',
      },
      {
        t: 'Revisa los intensificadores',
        p: '«Clearly», «obvious» y «definitely» aportan seguridad y no evidencia. En un resumen científico restan credibilidad.',
        m: '',
      },
      {
        t: 'Comprueba el registro',
        p: '«We really think» y «somehow» pertenecen a la conversación.',
        m: '',
      },
    ],
    concept:
      'En el C1 la elección correcta depende de tres capas a la vez: precisión conceptual, fuerza de la afirmación y registro. Fallar en cualquiera baja el nivel del texto.',
    trick:
      'Al revisar, comprueba las tres por separado: ¿dice exactamente lo que el dato permite? ¿No exagera? ¿Suena al registro que toca?',
    distractors: {
      '1': 'Afirma causalidad donde solo hay asociación.',
      '2': 'Registro coloquial y vago.',
      '3': 'Apela a la obviedad en lugar de a la evidencia.',
      '4': 'Exagera la certeza con «definitely» y «strong».',
    },
  },

  // ── C1 · Lenguaje figurado ────────────────────────────────────────────────
  {
    chapter: 'C1 · Lenguaje figurado',
    stem: '¿Qué significa «<b>the elephant in the room</b>»?',
    options: [
      'El problema evidente que nadie se atreve a mencionar',
      'Una persona que ocupa demasiado espacio',
      'Un detalle sin importancia que distrae',
      'Un invitado inesperado',
      'Una exageración de alguien',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'No lo traduzcas',
        p: 'La imagen es la clave: un elefante en la sala es imposible de ignorar y aun así todos fingen que no está.',
        m: '',
      },
      {
        t: 'Fíjate en cuándo se usa',
        p: 'Aparece justo antes de sacar un tema incómodo: «let’s address the elephant in the room».',
        m: '',
      },
    ],
    concept:
      'Un modismo no significa la suma de sus palabras. La única vía es reconocerlo, y para eso hay que haberlo encontrado en contexto.',
    trick: 'Cuando encuentres uno, apunta la frase entera y dónde apareció. Sin contexto vuelve a ser opaco en dos semanas.',
    distractors: {
      '1': 'Es la lectura literal, y no es lo que significa.',
      '2': 'Justo al revés: es lo importante que se ignora.',
      '3': 'No tiene que ver con visitas.',
      '4': 'Eso sería «to blow something out of proportion».',
    },
  },
  {
    chapter: 'C1 · Lenguaje figurado',
    stem: '«We had to <b>bite the bullet</b> and cancel the project.» ¿Qué significa?',
    options: [
      'Afrontar algo desagradable que no se podía evitar',
      'Actuar con demasiada prisa',
      'Discutir con dureza antes de decidir',
      'Reducir gastos al mínimo',
      'Arriesgarse sin información',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Usa el contexto',
        p: 'Cancelar un proyecto es una decisión dolorosa, y «had to» dice que no había alternativa.',
        m: '',
      },
      {
        t: 'Conecta con la imagen',
        p: 'Viene de morder una bala para soportar el dolor. La imagen es aguantar algo duro sin quejarse.',
        m: '',
      },
    ],
    concept:
      'Cuando un modismo se te resiste, el contexto suele bastar. Las palabras que lo rodean acotan el significado casi siempre.',
    trick: 'No busques el modismo antes de leer la frase entera: el contexto te da la mitad y así se te queda mejor.',
    distractors: {
      '1': 'La prisa sería «to jump the gun».',
      '2': 'Discutir sería «to lock horns».',
      '3': 'Recortar sería «to tighten one’s belt».',
      '4': 'Arriesgarse a ciegas sería «to take a shot in the dark».',
    },
  },
  {
    chapter: 'C1 · Lenguaje figurado',
    stem: 'Un colega británico ve tu trabajo y dice: «<b>That’s not bad at all.</b>» ¿Qué significa probablemente?',
    options: [
      'Que le parece muy bueno',
      'Que le parece mediocre pero aceptable',
      'Que tiene errores que no quiere señalar',
      'Que no lo ha mirado con atención',
      'Que prefiere no opinar',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Reconoce el understatement',
        p: 'El inglés británico dice menos de lo que quiere decir, sobre todo al elogiar.',
        m: 'not bad at all → muy bueno',
      },
      {
        t: 'Compara con el español',
        p: 'Nosotros exageramos el elogio; ellos lo contienen. Traducir literalmente invierte el mensaje.',
        m: '',
      },
    ],
    concept:
      'El understatement es una convención cultural, no una figura literaria. Tomarlo al pie de la letra es el malentendido más común entre hispanohablantes y británicos.',
    trick: 'La escala británica del elogio va de «not bad» a «quite good» a «rather impressive». Suma un escalón a lo que oigas.',
    distractors: {
      '1': 'Sería la lectura literal, que aquí engaña.',
      '2': 'Los reparos se señalan con «I have one small concern».',
      '3': 'El comentario implica que sí lo miró.',
      '4': 'Está opinando, y a favor.',
    },
  },
  {
    chapter: 'C1 · Lenguaje figurado',
    stem: 'En una reunión, alguien dice: «<b>I have one small concern about the plan.</b>» ¿Qué conviene asumir?',
    options: [
      'Que puede tener una objeción de fondo, expresada con suavidad',
      'Que se trata de un detalle menor sin importancia',
      'Que está de acuerdo con el plan',
      'Que necesita más información antes de opinar',
      'Que quiere cambiar de tema',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Aplica la escala del understatement',
        p: 'Igual que el elogio se contiene, la crítica también. «One small concern» rara vez es pequeña.',
        m: 'small concern → posible desacuerdo serio',
      },
      {
        t: 'Decide qué hacer con eso',
        p: 'La respuesta útil es preguntar, no dar por zanjado: «Could you tell me more about that?».',
        m: '',
      },
    ],
    concept:
      'La atenuación funciona en las dos direcciones: suaviza el elogio y suaviza la crítica. Ignorarla hace perder información importante.',
    trick: 'Cuando oigas un adjetivo atenuador —small, slight, minor— delante de una objeción, pregunta antes de seguir.',
    distractors: {
      '1': 'Es la lectura literal, y suele quedarse corta.',
      '2': 'Está señalando un reparo, no acuerdo.',
      '3': 'Ya tiene una opinión formada.',
      '4': 'Está entrando en el tema, no evitándolo.',
    },
  },
  {
    chapter: 'C1 · Lenguaje figurado',
    stem: '¿Cuál es la mejor manera de incorporar modismos a tu propio inglés?',
    options: [
      'Anotar los que encuentres en contexto, con la frase entera',
      'Memorizar listas de doscientos ordenadas alfabéticamente',
      'Traducir los modismos españoles que más usas',
      'Usar el mayor número posible en cada conversación',
      'Aprenderlos solo para reconocerlos, sin usarlos nunca',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Descarta lo que no funciona',
        p: 'La lista alfabética junta modismos sin relación y se olvida. Traducir los españoles produce frases que nadie dice.',
        m: '',
      },
      {
        t: 'Piensa en cómo se recuerda un significado opaco',
        p: 'Si el significado no se deduce, lo único que lo fija es la situación en que apareció.',
        m: 'contexto = mitad del significado',
      },
      {
        t: 'Y modera el uso',
        p: 'Meter demasiados seguidos suena a alguien recitando. Uno bien colocado vale por cinco.',
        m: '',
      },
    ],
    concept:
      'Los modismos se adquieren por exposición y se fijan por contexto. La memorización masiva es el método que más se intenta y menos funciona.',
    trick:
      'Ponte un límite: un modismo nuevo por semana, usado tres veces en conversación real. Es más lento y es lo único que se queda.',
    distractors: {
      '1': 'Se olvidan porque no hay nada que los relacione entre sí.',
      '2': 'Los modismos no se traducen entre idiomas.',
      '3': 'Suena artificial y delata que se están recitando.',
      '4': 'Reconocerlos está bien, pero usarlos es parte del C1.',
    },
  },

  // ── C1 · Escritura formal ─────────────────────────────────────────────────
  {
    chapter: 'C1 · Escritura formal',
    stem: '¿Cuál es la versión más adecuada para un informe académico?',
    options: [
      'The findings indicate that the plan was largely ineffective.',
      'I think this shows the plan did not work very well.',
      'This obviously proves the plan was a total failure.',
      "The plan didn't really work out, which is a shame.",
      'We found out the plan was pretty bad.',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Borra al autor',
        p: 'En un informe se da por hecho que lo escribes tú: «I think» sobra y resta autoridad.',
        m: 'I think → the findings indicate',
      },
      {
        t: 'Mide la fuerza',
        p: '«Largely ineffective» dice lo que los datos permiten; «total failure» exagera.',
        m: '',
      },
      {
        t: 'Revisa el registro',
        p: 'Nada de contracciones, phrasal verbs coloquiales ni valoraciones sueltas.',
        m: '',
      },
    ],
    concept:
      'El registro académico combina tres cosas: estructura impersonal, precisión léxica y certeza medida. Las tres se revisan por separado.',
    trick: 'Busca en tu texto las palabras «I», «obviously» y los apóstrofos. Son los tres rastros más fáciles de detectar.',
    distractors: {
      '1': 'Personal y con palabras comodín.',
      '2': 'Exagera la certeza.',
      '3': 'Contracción, phrasal verb y valoración personal.',
      '4': 'Coloquial de principio a fin.',
    },
  },
  {
    chapter: 'C1 · Escritura formal',
    stem: 'Convierte en una sola frase con nominalización: «They decided quickly, and this surprised everyone.»',
    options: [
      'Their rapid decision surprised everyone.',
      'They decided quickly and surprised everyone.',
      'The decision they took quickly was a surprise for everyone.',
      'Deciding quickly, everyone was surprised.',
      'It was quick, their decision, and surprising.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Convierte la acción en sustantivo',
        p: '«They decided quickly» se comprime en «their rapid decision».',
        m: 'decided → decision\nquickly → rapid',
      },
      {
        t: 'Encájalo como sujeto',
        p: 'Una vez convertido en sustantivo, funciona como cualquier objeto dentro de otra frase.',
        m: 'Their rapid decision + surprised everyone',
      },
    ],
    concept:
      'La nominalización comprime una oración en un sustantivo, y eso permite meterla dentro de otra. Es el mecanismo que hace denso al inglés académico.',
    trick: 'Si dos frases cortas se repiten el sujeto, convierte la primera en sustantivo y hazla sujeto de la segunda.',
    distractors: {
      '1': 'No nominaliza: sigue con dos verbos coordinados.',
      '2': 'Es correcto pero más largo y menos comprimido.',
      '3': 'El gerundio inicial deja un sujeto que no corresponde.',
      '4': 'Es una construcción forzada y coloquial.',
    },
  },
  {
    chapter: 'C1 · Escritura formal',
    stem: 'Los datos muestran una relación pero no una causa. ¿Cómo se escribe?',
    options: [
      'The data suggest that screen time may contribute to poor sleep.',
      'The data prove that screen time causes poor sleep.',
      'It is clear that screen time destroys sleep quality.',
      'Everyone knows screen time is bad for sleep.',
      'Screen time definitely leads to poor sleep.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Comprueba qué permite el dato',
        p: 'Una relación no autoriza a hablar de causa.',
        m: 'relación ≠ causa',
      },
      {
        t: 'Elige verbo y modal con la fuerza justa',
        p: '«Suggest» y «may contribute» dejan la afirmación en su sitio.',
        m: '',
      },
    ],
    concept:
      'Medir la fuerza de lo que se afirma es señal de rigor, no de inseguridad. Exagerar la certeza es lo que descalifica un texto ante quien lo evalúa.',
    trick: 'Cada vez que escribas «proves», comprueba si el dato lo sostiene. Casi nunca lo hace.',
    distractors: {
      '1': 'Afirma causalidad sin base.',
      '2': 'Apela a la obviedad y exagera.',
      '3': 'Apelar al saber común no es argumentar.',
      '4': '«Definitely» y «leads to» afirman causa directa.',
    },
  },
  {
    chapter: 'C1 · Escritura formal',
    stem: 'Sustituye por el equivalente formal: «We <b>found out</b> that the numbers were wrong.»',
    options: ['discovered', 'looked into', 'checked out', 'came across', 'figured out'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Reconoce el phrasal verb',
        p: '«Find out» es de registro conversacional.',
        m: '',
      },
      {
        t: 'Busca el verbo culto equivalente',
        p: 'Casi todos los phrasal verbs tienen un verbo de origen latino que el texto formal prefiere.',
        m: 'find out → discover\nput off → postpone\nlook into → investigate',
      },
    ],
    concept:
      'El registro formal prefiere el verbo de una sola pieza. No es esnobismo: es la convención que espera quien evalúa.',
    trick: 'Cuando dudes, el verbo largo de raíz latina suele ser el formal, y el corto con partícula, el conversacional.',
    distractors: {
      '1': 'También es phrasal y significa investigar.',
      '2': 'Es aún más coloquial.',
      '3': 'Significa encontrarse algo por casualidad.',
      '4': 'Es coloquial y significa deducir.',
    },
  },
  {
    chapter: 'C1 · Escritura formal',
    stem: 'Un párrafo tuyo nominaliza tanto que cuesta leerlo. ¿Qué conviene hacer?',
    options: [
      'Devolver algunas acciones a forma verbal para recuperar claridad',
      'Nominalizar el resto para que quede uniforme',
      'Partirlo en frases más cortas manteniendo los sustantivos',
      'Añadir conectores entre las nominalizaciones',
      'Dejarlo así: cuanto más denso, más académico',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Recuerda para qué sirve nominalizar',
        p: 'Para comprimir y encadenar ideas, no para oscurecerlas.',
        m: '',
      },
      {
        t: 'Detecta el exceso',
        p: 'Cuando la frase pierde el verbo principal reconocible, el lector deja de saber quién hace qué.',
        m: 'la compresión tiene un límite',
      },
      {
        t: 'Corrige a la baja',
        p: 'Devolver una o dos acciones a verbo suele bastar para que el párrafo vuelva a leerse.',
        m: '',
      },
    ],
    concept:
      'La densidad académica es un medio, no un fin. Un texto que hay que releer para entender quién hizo qué está peor escrito, no mejor.',
    trick:
      'Léelo en voz alta. Si te quedas sin aire antes del verbo principal, has nominalizado de más.',
    distractors: {
      '1': 'Agravaría el problema.',
      '2': 'Frases cortas de sustantivos siguen siendo ilegibles.',
      '3': 'Los conectores no arreglan la falta de verbos.',
      '4': 'Densidad no es calidad.',
    },
  },

  // ── C1 · Fluidez bajo presión ─────────────────────────────────────────────
  {
    chapter: 'C1 · Fluidez bajo presión',
    stem: 'En un examen oral no te sale una palabra. ¿Qué conviene hacer?',
    options: [
      'Describirla con otras palabras y seguir hablando',
      'Detenerse hasta recordarla',
      'Cambiar de tema para evitarla',
      'Decirla en español y continuar',
      'Pedir disculpas y empezar la frase de nuevo',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Recuerda qué se puntúa',
        p: 'Se evalúa que el discurso avance, no que cada palabra sea la exacta.',
        m: 'fluidez = no detenerse',
      },
      {
        t: 'Usa una fórmula de rodeo',
        p: '«It’s the thing you use to…» resuelve casi cualquier hueco y además demuestra recursos.',
        m: '',
      },
    ],
    concept:
      'Rodear una palabra que falta no es una derrota: es una estrategia que los evaluadores puntúan como recurso comunicativo.',
    trick: 'Ten tres fórmulas automatizadas: «It’s a kind of…», «It’s the thing you use to…», «I can’t remember the word, but…».',
    distractors: {
      '1': 'El silencio penaliza más que la imprecisión.',
      '2': 'Evitar temas limita lo que puedes demostrar.',
      '3': 'Rompe el discurso en la lengua evaluada.',
      '4': 'Reiniciar constantemente suena a inseguridad.',
    },
  },
  {
    chapter: 'C1 · Fluidez bajo presión',
    stem: 'Te equivocas a mitad de frase. ¿Cuál es la mejor reparación?',
    options: [
      '…or rather, what I mean is that the cost was higher.',
      'Sorry. Sorry. Let me start again from the beginning.',
      'No, no, forget it, it does not matter.',
      'Ehm… ehm… ehm…',
      'How do you say… ay, no sé.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Repara en marcha',
        p: 'Enlazar la corrección con la frase mantiene el discurso vivo.',
        m: 'or rather / what I mean is',
      },
      {
        t: 'Evita reiniciar',
        p: 'Volver al principio pierde lo dicho y transmite inseguridad.',
        m: '',
      },
    ],
    concept:
      'Autocorregirse sin romper el discurso es señal de dominio. Los hablantes nativos lo hacen constantemente y nadie lo percibe como error.',
    trick: 'Aprende dos conectores de reparación y úsalos siempre los mismos: «or rather» y «what I mean is».',
    distractors: {
      '1': 'Reiniciar pierde el hilo y penaliza.',
      '2': 'Abandonar la idea deja la respuesta incompleta.',
      '3': 'El silencio relleno no repara nada.',
      '4': 'Cambiar de idioma rompe la evaluación.',
    },
  },
  {
    chapter: 'C1 · Fluidez bajo presión',
    stem: 'Necesitas un segundo para pensar la respuesta. ¿Qué dices?',
    options: [
      "That's a good question. Let me think about that for a moment.",
      'Wait, wait, I am thinking, wait.',
      'Ehhh…',
      'Repeat the question, please.',
      'I do not know what to say.',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Gana tiempo sin dejar de hablar',
        p: 'Una fórmula corta ocupa el silencio y te da los segundos que necesitas.',
        m: '',
      },
      {
        t: 'Comprueba que suene natural',
        p: 'Debe estar tan automatizada que salga sin pensarla. Si tienes que construirla, ya no sirve.',
        m: '',
      },
    ],
    concept:
      'Las fórmulas para ganar tiempo son parte del repertorio de un hablante avanzado. No son relleno vacío: son gestión del discurso.',
    trick: 'Ensáyalas hasta que salgan solas. Una fórmula que hay que pensar no cumple su función.',
    distractors: {
      '1': 'Suena ansioso y no da información.',
      '2': 'El silencio relleno no aporta nada.',
      '3': 'Puede leerse como que no entendiste.',
      '4': 'Cierra la respuesta en vez de abrirla.',
    },
  },
  {
    chapter: 'C1 · Fluidez bajo presión',
    stem: '¿Cuál de estas afirmaciones sobre la fluidez es correcta?',
    options: [
      'Hablar despacio sin bloqueos puntúa más que hablar rápido atascándose',
      'La fluidez se mide sobre todo por la velocidad',
      'Un acento marcado impide alcanzar el C1',
      'Cometer errores gramaticales impide ser fluido',
      'Memorizar respuestas completas es la mejor preparación',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Separa fluidez de velocidad',
        p: 'Fluidez es continuidad del discurso, no palabras por minuto.',
        m: '',
      },
      {
        t: 'Descarta los mitos',
        p: 'El acento no se penaliza mientras se entienda, y los errores menores tampoco rompen la fluidez.',
        m: '',
      },
    ],
    concept:
      'La fluidez evalúa si el discurso avanza y se sostiene. Un ritmo pausado y constante puntúa más alto que uno rápido e interrumpido.',
    trick: 'Practica hablando un minuto seguido sobre cualquier tema sin parar. Lo que se entrena es no detenerse, no ir deprisa.',
    distractors: {
      '1': 'La velocidad no es el criterio.',
      '2': 'El acento no impide el C1 si se entiende.',
      '3': 'Los errores menores no rompen la fluidez.',
      '4': 'Memorizar se nota al primer desvío del guion.',
    },
  },
  {
    chapter: 'C1 · Fluidez bajo presión',
    stem: 'Te preguntan algo sobre lo que no tienes opinión formada. ¿Cuál es la mejor estrategia?',
    options: [
      'Reconocerlo y construir en voz alta: «I have not thought about it much, but I suppose…»',
      'Inventar una opinión firme y defenderla como si la tuvieras',
      'Decir que no sabes y esperar la siguiente pregunta',
      'Repetir la pregunta con otras palabras para llenar el tiempo',
      'Cambiar a un tema que domines mejor',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Recuerda qué se evalúa',
        p: 'No se juzga el contenido de tu opinión sino cómo la construyes en inglés.',
        m: '',
      },
      {
        t: 'Convierte la duda en discurso',
        p: 'Pensar en voz alta —«on the one hand… on the other…»— genera lenguaje evaluable y suena natural.',
        m: '',
      },
      {
        t: 'Descarta las salidas falsas',
        p: 'Inventar una postura firme te obliga a defender lo que no piensas; callar deja la respuesta vacía.',
        m: '',
      },
    ],
    concept:
      'En un examen oral, dudar en voz alta produce más lenguaje que una opinión firme mal sostenida. La duda articulada es una respuesta válida.',
    trick:
      'Ten preparada una estructura de duda: «I have not thought about it much, but I suppose it depends on…». Sirve para cualquier tema.',
    distractors: {
      '1': 'Te obliga a sostener argumentos que no tienes.',
      '2': 'Deja la respuesta sin lenguaje que evaluar.',
      '3': 'Se nota como relleno y no aporta.',
      '4': 'Evitar el tema limita lo que demuestras.',
    },
  },

  // ── C1 · Simulacro completo ───────────────────────────────────────────────
  {
    chapter: 'C1 · Simulacro completo',
    stem: '¿Para qué sirve principalmente rendir un simulacro completo?',
    options: [
      'Para medir el nivel real y familiarizarse con el formato',
      'Para aprender la gramática que aún falta',
      'Para ampliar vocabulario',
      'Para practicar la pronunciación',
      'Para descansar entre capítulos',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Separa medir de aprender',
        p: 'Un simulacro no enseña contenido: revela dónde estás y dónde fallas.',
        m: '',
      },
      {
        t: 'Añade el segundo efecto',
        p: 'Quitar sorpresas de formato vale puntos por sí solo: quien ya lo conoce no pierde minutos entendiendo las instrucciones.',
        m: '',
      },
    ],
    concept:
      'Medir y aprender son fases distintas. Rendir simulacros sin estudiar entre ellos no mejora el resultado.',
    trick: 'Uno cada dos semanas basta. Más seguido no deja tiempo para corregir lo que el anterior reveló.',
    distractors: {
      '1': 'Eso se hace en los capítulos, no en el examen.',
      '2': 'El simulacro usa el vocabulario que ya tienes.',
      '3': 'La pronunciación se entrena en las clases.',
      '4': 'Es lo contrario de un descanso.',
    },
  },
  {
    chapter: 'C1 · Simulacro completo',
    stem: 'Vas por la mitad del tiempo y te quedan tres de las cinco lecturas. ¿Qué haces?',
    options: [
      'Pasar a las siguientes y volver al final si queda tiempo',
      'Terminar bien la actual aunque sacrifiques las demás',
      'Responder al azar las que faltan y revisar la actual',
      'Leer todas por encima sin responder ninguna',
      'Empezar por la más larga, que vale más',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Comprueba cuánto vale cada parte',
        p: 'Todas las lecturas puntúan igual. Perfeccionar una a costa de dos es un mal cambio.',
        m: '',
      },
      {
        t: 'Reparte el tiempo antes de empezar',
        p: 'Fijar minutos por sección y respetarlos evita justamente esta situación.',
        m: 'tiempo total ÷ secciones',
      },
    ],
    concept:
      'La gestión del tiempo decide más resultados que el nivel. La mayoría de quienes suspenden no lo hacen por saber menos, sino por no llegar.',
    trick: 'Escribe en el margen la hora a la que debes abandonar cada sección. Y abandónala aunque duela.',
    distractors: {
      '1': 'Sacrifica puntos que valían lo mismo.',
      '2': 'Responder al azar tiene sentido al final, no antes de intentarlo.',
      '3': 'Leer sin responder gasta el tiempo dos veces.',
      '4': 'La longitud no cambia el valor.',
    },
  },
  {
    chapter: 'C1 · Simulacro completo',
    stem: 'En la parte escrita, ¿cuál es el error más caro?',
    options: [
      'Responder a algo distinto de lo que pide la consigna',
      'Cometer algunos errores gramaticales menores',
      'Escribir con letra poco clara',
      'Usar vocabulario demasiado sencillo',
      'Tardar en empezar el primer párrafo',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Piensa en qué se penaliza más',
        p: 'Un texto impecable que no responde a la tarea pierde la mitad de los puntos de contenido.',
        m: '',
      },
      {
        t: 'Previene el error',
        p: 'Subrayar el verbo de la consigna —compare, discuss, evaluate— antes de escribir cuesta diez segundos.',
        m: '',
      },
    ],
    concept:
      'La adecuación a la tarea se puntúa aparte de la lengua. Es el criterio donde más puntos se pierden de golpe.',
    trick: 'Antes de escribir, formula en una frase qué te están pidiendo. Si no puedes, todavía no has entendido la consigna.',
    distractors: {
      '1': 'Restan, pero mucho menos que fallar la tarea.',
      '2': 'Influye poco y hoy muchos exámenes son digitales.',
      '3': 'Baja la nota de léxico, no invalida el texto.',
      '4': 'Es cuestión de minutos, no de puntos.',
    },
  },
  {
    chapter: 'C1 · Simulacro completo',
    stem: 'En la parte oral, ¿qué se evalúa además del vocabulario y la gramática?',
    options: [
      'La capacidad de sostener e interactuar en el discurso',
      'La rapidez al responder',
      'La ausencia total de acento extranjero',
      'La cantidad de modismos utilizados',
      'La longitud de cada respuesta',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Recuerda los criterios',
        p: 'Se puntúa léxico, gramática, pronunciación, fluidez e interacción. Los dos últimos son los que se olvidan al preparar.',
        m: '',
      },
      {
        t: 'Entiende qué es interactuar',
        p: 'Escuchar al otro candidato, responder a lo que dijo y ceder el turno también puntúa.',
        m: '',
      },
    ],
    concept:
      'La prueba oral evalúa comunicación, no exhibición. Un candidato que monologa sin escuchar puntúa por debajo de uno que dialoga.',
    trick: 'En las partes de pareja, reacciona a lo que dijo el otro antes de aportar lo tuyo: «That is a good point, although…».',
    distractors: {
      '1': 'La velocidad no es criterio.',
      '2': 'El acento no penaliza si se entiende.',
      '3': 'Meter modismos a la fuerza resta naturalidad.',
      '4': 'Respuestas largas sin contenido no suman.',
    },
  },
  {
    chapter: 'C1 · Simulacro completo',
    stem: 'Terminas el simulacro con una nota más baja de la esperada. ¿Qué conviene hacer primero?',
    options: [
      'Revisar en qué sección se perdieron los puntos y volver a esos capítulos',
      'Rendir otro simulacro inmediatamente para confirmar',
      'Repasar toda la gramática desde el principio',
      'Bajar de nivel objetivo y presentarse al B2',
      'Repetir el mismo simulacro hasta memorizar las respuestas',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Trata el simulacro como un diagnóstico',
        p: 'Su valor está en lo que revela, no en la nota. Sin analizarlo, solo has perdido dos horas.',
        m: '',
      },
      {
        t: 'Vuelve a lo concreto',
        p: 'Si fallaste en escucha, el problema no es la gramática. Cada sección apunta a capítulos distintos.',
        m: '',
      },
      {
        t: 'Descarta las reacciones inútiles',
        p: 'Repetirlo enseguida mide lo mismo; repasarlo todo diluye el esfuerzo; memorizarlo no transfiere a otro examen.',
        m: '',
      },
    ],
    concept:
      'Un simulacro sin análisis posterior no sirve de nada. El trabajo empieza cuando termina la prueba, y consiste en convertir cada fallo en un capítulo concreto que repasar.',
    trick:
      'Anota cada error en una de cuatro columnas: no lo sabía, lo sabía y no lo vi, se me acabó el tiempo, no entendí la consigna. Cada columna se corrige de forma distinta.',
    distractors: {
      '1': 'Mediría lo mismo sin haber corregido nada.',
      '2': 'Diluye el esfuerzo en lo que ya dominas.',
      '3': 'Una nota baja no significa que el objetivo sea inalcanzable.',
      '4': 'Memorizar un examen concreto no transfiere a otro.',
    },
  },
];
