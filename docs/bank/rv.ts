import type { BankQuestion } from './types';

/** El texto del primer juego de lectura. Lo comparten tres preguntas. */
const TURISMO =
  'El turismo comunitario ha crecido en el Perú como alternativa al circuito masivo. En comunidades del Colca y del Titicaca, las familias reciben visitantes en sus viviendas y administran directamente los ingresos. Sus defensores destacan que el dinero se queda en la localidad. Los críticos, sin embargo, advierten que sin estándares mínimos de servicio la experiencia resulta desigual y daña la reputación del destino. La discusión, entonces, no es si el modelo debe existir, sino bajo qué condiciones puede sostenerse.';

/** El segundo juego de lectura. */
const QUINUA =
  'Entre 2008 y 2014 el precio internacional de la quinua se multiplicó por cinco. Para los productores de Puno, que durante décadas la habían cultivado casi solo para su propio consumo, el auge significó ingresos que ninguna otra cosecha les había dado. Pero el mismo precio que los benefició encareció el grano en los mercados locales, y algunas familias empezaron a reemplazarlo por fideos. Los estudios posteriores matizaron la alarma: el consumo cayó menos de lo que se temía y el ingreso adicional mejoró la dieta por otras vías. Lo que el episodio dejó claro no es que exportar sea malo, sino que el efecto de un precio alto depende de quién vende y quién compra.';

/**
 * Aptitud Verbal · donde se decide la mitad del puntaje.
 *
 * Comprensión lectora va en juegos: un texto con varias preguntas colgando,
 * como en el examen real. Los demás capítulos, con preguntas sueltas.
 */
export const RV: BankQuestion[] = [
  // ── Comprensión lectora · juego 1 (con la que ya existía) ─────────────────
  {
    chapter: 'Comprensión lectora',
    passage: TURISMO,
    stem: 'Se deduce del texto que, para el autor, los estándares mínimos de servicio son:',
    options: [
      'una condición para que el modelo se sostenga',
      'un obstáculo que encarece el turismo comunitario',
      'una exigencia de los operadores de Lima',
      'un requisito que las comunidades ya cumplen',
      'la causa del crecimiento del modelo',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Localiza dónde aparecen los estándares',
        p: 'Están en la objeción de los críticos, no en la postura de los defensores.',
        m: '«...sin estándares mínimos de servicio\nla experiencia resulta desigual...»',
      },
      {
        t: 'Mira cómo cierra el autor',
        p: 'El autor no toma partido por ninguno de los dos bandos: recoge la objeción y la convierte en condición.',
        m: '«...bajo qué condiciones puede sostenerse.»',
      },
      {
        t: 'Une las dos piezas',
        p: 'Deducir es unir dos afirmaciones del texto, no añadir información de fuera.',
        m: 'Falta de estándares → daño\nCierre → «condiciones para sostenerse»',
      },
      {
        t: 'Descarta lo que el texto no dice',
        p: 'Ninguna alternativa que aporte datos nuevos puede ser una deducción.',
        m: 'b, c, d, e ✗',
      },
    ],
    concept:
      'Una deducción se sostiene solo con lo que está escrito. Si hace falta un dato que el texto no da, no es deducción sino suposición.',
    trick: 'Pregúntate por cada alternativa: «¿en qué línea exacta se apoya?». Si no puedes señalarla, descártala.',
    distractors: {
      '1': 'El texto nunca habla de costos ni dice que los estándares encarezcan nada.',
      '2': 'No se menciona a ningún operador de Lima.',
      '3': 'Al contrario: los críticos advierten que faltan.',
      '4': 'El crecimiento se atribuye a ser alternativa al circuito masivo, no a los estándares.',
    },
  },
  {
    chapter: 'Comprensión lectora',
    passage: TURISMO,
    stem: 'En el texto, la palabra <b>SOSTENERSE</b> puede reemplazarse por:',
    options: ['mantenerse en el tiempo', 'apoyarse en algo firme', 'financiarse por sí solo', 'defenderse de las críticas', 'expandirse a otras regiones'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'No busques el significado del diccionario',
        p: 'Casi todas las alternativas son acepciones reales de la palabra. La pregunta es cuál funciona en esta oración.',
        m: '',
      },
      {
        t: 'Lee la oración completa',
        p: 'La discusión es sobre las condiciones que el modelo necesita para seguir existiendo.',
        m: '«...bajo qué condiciones puede sostenerse.»',
      },
      {
        t: 'Prueba reemplazando',
        p: 'Mete cada alternativa en la oración y quédate con la que no cambia el sentido.',
        m: '«bajo qué condiciones puede\nmantenerse en el tiempo»  ✓',
      },
    ],
    concept:
      'En vocabulario contextual manda la oración, no el diccionario. Una palabra con varias acepciones solo tiene una que encaja.',
    trick: 'Tapa las alternativas, decide tú con qué palabra la reemplazarías, y recién entonces busca la más parecida.',
    distractors: {
      '1': 'Es el sentido físico de la palabra, y aquí no se habla de apoyos materiales.',
      '2': 'El texto no discute el financiamiento del modelo.',
      '3': 'Las críticas aparecen, pero «sostenerse» no se refiere a responderlas.',
      '4': 'La expansión no se menciona en ningún momento.',
    },
  },

  // ── Comprensión lectora · juego 2 ─────────────────────────────────────────
  {
    chapter: 'Comprensión lectora',
    passage: QUINUA,
    stem: 'Según el texto, entre 2008 y 2014 el precio internacional de la quinua:',
    options: ['se multiplicó por cinco', 'se duplicó', 'cayó a la mitad', 'se mantuvo estable', 'subió un cincuenta por ciento'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Busca el dato, no lo recuerdes',
        p: 'Las preguntas de dato explícito se responden señalando la línea. No hay que razonar nada.',
        m: '',
      },
      {
        t: 'Localiza los años en el texto',
        p: 'Aparecen en la primera oración, que es justo la que contiene la respuesta.',
        m: '«Entre 2008 y 2014 el precio internacional\nde la quinua se multiplicó por cinco.»',
      },
    ],
    concept:
      'Hay preguntas que solo piden encontrar un dato. Reconocerlas rápido libera tiempo para las que sí exigen razonar.',
    trick: 'Si la pregunta contiene una cifra o una fecha, búscala en el texto con la vista antes de leer las alternativas.',
    distractors: {
      '1': 'Multiplicarse por cinco no es duplicarse.',
      '2': 'El texto describe un alza, no una caída.',
      '3': 'Es lo contrario de lo que dice la primera oración.',
      '4': 'Multiplicarse por cinco es un alza del 400 %, no del 50 %.',
    },
  },
  {
    chapter: 'Comprensión lectora',
    passage: QUINUA,
    stem: '¿Con qué intención menciona el autor los <b>estudios posteriores</b>?',
    options: [
      'Matizar una alarma inicial sin negar que hubo un problema',
      'Demostrar que el auge exportador no tuvo ningún efecto negativo',
      'Desacreditar a quienes investigaron el tema',
      'Sostener que el Perú debería dejar de exportar quinua',
      'Explicar el método con que se mide el consumo de alimentos',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Fíjate en el verbo que usa el autor',
        p: '«Matizaron» no es «desmintieron». La elección de esa palabra ya marca la intención.',
        m: '«Los estudios posteriores matizaron\nla alarma...»',
      },
      {
        t: 'Mira qué viene después de los dos puntos',
        p: 'Reconoce que el consumo cayó, solo que menos de lo temido. El problema no se niega: se dimensiona.',
        m: '«...el consumo cayó menos de lo que\nse temía...»',
      },
      {
        t: 'Contrasta con la oración final',
        p: 'El cierre confirma la postura: ni condena ni celebra la exportación, señala que depende del caso.',
        m: '«...no es que exportar sea malo, sino\nque el efecto depende de quién vende\ny quién compra.»',
      },
      {
        t: 'Descarta los extremos',
        p: 'Las alternativas que afirman «ningún efecto» o «dejar de exportar» son más tajantes que el texto.',
        m: 'b y d ✗ por exceso',
      },
    ],
    concept:
      'La intención del autor se lee en los verbos con que presenta cada dato. «Matizar», «advertir» o «demostrar» señalan posturas distintas ante la misma información.',
    trick:
      'Cuando el texto es equilibrado, la respuesta también lo es. Las alternativas absolutas —«ningún», «siempre», «debería dejar de»— suelen ser trampa.',
    distractors: {
      '1': 'Exagera: el texto admite que el consumo sí cayó, aunque menos de lo temido.',
      '2': 'El autor se apoya en esos estudios; no los cuestiona.',
      '3': 'La oración final dice expresamente que el problema no es exportar.',
      '4': 'El texto no explica ninguna metodología.',
    },
  },

  // ── Analogías ─────────────────────────────────────────────────────────────
  {
    chapter: 'Analogías',
    stem: '<b>LIBRO : BIBLIOTECA ::</b>',
    options: ['cuadro : museo', 'lector : libro', 'papel : árbol', 'estante : sala', 'escritor : novela'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Redacta el puente antes de mirar',
        p: 'La frase tiene que ser completa y precisa. «Tienen que ver con leer» no sirve para nada.',
        m: '«El LIBRO se guarda y se conserva\nen la BIBLIOTECA.»',
      },
      {
        t: 'Prueba la frase en cada alternativa',
        p: 'Solo una la soporta palabra por palabra.',
        m: 'El cuadro se guarda y se conserva\nen el museo  ✓',
      },
      {
        t: 'Comprueba el orden',
        p: 'Objeto primero, lugar después. El orden es tan obligatorio como la relación.',
        m: 'objeto → lugar de conservación',
      },
    ],
    concept:
      'Una analogía se resuelve nombrando la relación con una frase, no buscando palabras del mismo tema.',
    trick: 'Si tu frase encaja en dos alternativas, endurécela con un matiz hasta que sobreviva una sola.',
    distractors: {
      '1': 'Es usuario : objeto, no objeto : lugar.',
      '2': 'Es producto : materia prima.',
      '3': 'Es parte : todo, y además ambos son mobiliario.',
      '4': 'Es autor : obra, con el orden invertido respecto del par base.',
    },
  },
  {
    chapter: 'Analogías',
    stem: '<b>MÉDICO : ESTETOSCOPIO ::</b>',
    options: ['carpintero : serrucho', 'hospital : enfermera', 'bisturí : cirujano', 'músico : orquesta', 'paciente : receta'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Nombra el puente con precisión',
        p: 'Es profesional e instrumento, y además un instrumento propio de su oficio.',
        m: '«El MÉDICO usa el ESTETOSCOPIO\ncomo herramienta de su oficio.»',
      },
      { t: 'Aplica la frase', p: 'El carpintero usa el serrucho como herramienta de su oficio.', m: 'a) ✓' },
      {
        t: 'Descarta por orden y por tipo',
        p: 'Los exámenes ponen siempre al menos un par invertido.',
        m: 'b) lugar → persona ✗\nc) invertido ✗\nd) persona → grupo ✗\ne) usuario → documento ✗',
      },
    ],
    concept:
      'Profesional e instrumento es una de las relaciones más frecuentes del examen. Suele venir acompañada de su versión invertida como distractor.',
    trick: 'Antes de elegir, lee la alternativa en voz baja con tu frase. Si suena al revés, está invertida.',
    distractors: {
      '1': 'Relaciona un lugar con quien trabaja en él.',
      '2': 'Es la relación correcta pero invertida: instrumento primero, profesional después.',
      '3': 'Es persona y grupo al que pertenece, no herramienta.',
      '4': 'El paciente no ejerce un oficio con la receta.',
    },
  },
  {
    chapter: 'Analogías',
    stem: '<b>HAMBRE : COMER ::</b>',
    options: ['sed : beber', 'sueño : cansancio', 'frío : invierno', 'comida : plato', 'dolor : herida'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Formula la relación',
        p: 'No es «cosas del cuerpo»: es una necesidad y la acción concreta que la elimina.',
        m: '«El HAMBRE se satisface COMIENDO.»',
      },
      { t: 'Busca el par que la soporte', p: 'La sed se satisface bebiendo.', m: 'a) ✓' },
      {
        t: 'Descarta lo que solo comparte el tema',
        p: 'Varias alternativas hablan de sensaciones, pero ninguna otra aporta la acción que las resuelve.',
        m: 'b) sensación → causa ✗\nc) sensación → estación ✗\nd) objeto → recipiente ✗\ne) sensación → causa ✗',
      },
    ],
    concept:
      'Necesidad y acción que la satisface es una relación funcional. El campo semántico compartido no basta: hace falta la misma función.',
    trick: 'Si la relación es «X se resuelve haciendo Y», el segundo término tiene que ser un verbo o una acción.',
    distractors: {
      '1': 'El cansancio causa el sueño; no lo satisface.',
      '2': 'El invierno es cuándo ocurre, no cómo se resuelve.',
      '3': 'Es contenido y recipiente.',
      '4': 'La herida causa el dolor; no lo alivia.',
    },
  },
  {
    chapter: 'Analogías',
    stem: '<b>CENTÍMETRO : METRO ::</b>',
    options: ['céntimo : sol', 'minuto : hora', 'gramo : peso', 'kilómetro : distancia', 'litro : volumen'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Empieza por lo evidente',
        p: 'Las dos son unidades de la misma magnitud, y la primera es menor que la segunda.',
        m: 'unidad menor → unidad mayor',
      },
      {
        t: 'Endurece la frase con la proporción',
        p: 'Con la frase floja encajan dos alternativas. El matiz que las separa es cuántas veces cabe una en otra.',
        m: '«Cien CENTÍMETROS hacen un METRO.»',
      },
      {
        t: 'Vuelve a probar',
        p: 'Cien céntimos hacen un sol; en cambio, sesenta minutos hacen una hora.',
        m: 'a) 100 a 1  ✓\nb) 60 a 1  ✗',
      },
      {
        t: 'Descarta las que confunden unidad con magnitud',
        p: 'El peso, la distancia y el volumen no son unidades: son lo que se mide.',
        m: 'c, d, e ✗',
      },
    ],
    concept:
      'Cuando dos alternativas comparten la relación general, la respuesta la decide el matiz. En las unidades, ese matiz suele ser la proporción exacta.',
    trick:
      'Si dos alternativas encajan, no elijas al azar: busca qué dato del par base todavía no usaste. Aquí era el «cien».',
    distractors: {
      '1': 'La relación es la correcta, pero la proporción no: son sesenta a uno, no cien a uno.',
      '2': 'El peso es la magnitud, no una unidad.',
      '3': 'La distancia es la magnitud, y además el orden va de mayor a menor.',
      '4': 'El volumen es la magnitud, no una unidad.',
    },
  },

  // ── Sinónimos y antónimos ─────────────────────────────────────────────────
  {
    chapter: 'Sinónimos y antónimos',
    stem: 'Señala el <b>sinónimo</b> de <b>EFÍMERO</b>.',
    options: ['pasajero', 'eterno', 'frágil', 'veloz', 'oculto'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Define la palabra con tus propias palabras',
        p: 'Antes de mirar las alternativas, di qué significa. Efímero es lo que dura muy poco.',
        m: 'efímero = de poca duración',
      },
      { t: 'Busca la que diga lo mismo', p: 'Pasajero es exactamente eso: que pasa pronto.', m: 'pasajero  ✓' },
    ],
    concept:
      'Un sinónimo comparte el significado, no solo el tono. Definir la palabra antes de leer las alternativas evita elegir por parecido sonoro.',
    trick: 'Si la palabra aparece en una frase que conoces —«un éxito efímero»—, úsala para comprobar el reemplazo.',
    distractors: {
      '1': 'Es justo lo contrario.',
      '2': 'Frágil es que se rompe fácil, no que dure poco.',
      '3': 'Veloz habla de rapidez de movimiento, no de duración.',
      '4': 'No tiene relación con el significado.',
    },
  },
  {
    chapter: 'Sinónimos y antónimos',
    stem: 'Señala el <b>antónimo</b> de <b>PRÓDIGO</b>.',
    options: ['tacaño', 'generoso', 'abundante', 'derrochador', 'escaso'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Define primero',
        p: 'Pródigo es quien gasta o da con largueza, incluso en exceso.',
        m: 'pródigo = generoso, desprendido',
      },
      {
        t: 'Busca lo contrario, no lo parecido',
        p: 'Aquí está la trampa del capítulo: entre las alternativas hay sinónimos, y el enunciado pide un antónimo.',
        m: 'contrario de «da con largueza»\n= quien no da',
      },
      { t: 'Elige', p: 'Tacaño es quien retiene lo que tiene.', m: 'tacaño  ✓' },
    ],
    concept:
      'La mitad de los errores del capítulo no son de vocabulario, sino de no leer si piden sinónimo o antónimo.',
    trick: 'Subraya la palabra «antónimo» en el enunciado antes de mirar las alternativas.',
    distractors: {
      '1': 'Es un sinónimo, no un antónimo.',
      '2': 'Se refiere a cantidad, no a la actitud de quien da.',
      '3': 'También es sinónimo, con matiz negativo.',
      '4': 'Escaso describe una cantidad, no una persona.',
    },
  },
  {
    chapter: 'Sinónimos y antónimos',
    stem: 'En la oración «El testigo dio una versión <b>ESCUETA</b> de los hechos», la palabra destacada significa:',
    options: ['breve', 'confusa', 'falsa', 'detallada', 'sincera'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Lee la oración entera',
        p: 'El contexto es el que decide. Una palabra suelta admite más de un sentido.',
        m: '',
      },
      {
        t: 'Define escueto',
        p: 'Es lo dicho sin adornos ni rodeos, con las palabras justas.',
        m: 'escueto = conciso, sin adornos',
      },
      {
        t: 'Comprueba reemplazando',
        p: 'La oración tiene que seguir significando lo mismo.',
        m: '«una versión breve de los hechos»  ✓',
      },
    ],
    concept:
      'Escueto habla de extensión, no de calidad ni de veracidad. Confundir esos planos es el error frecuente aquí.',
    trick: 'Reemplaza y lee la oración completa en voz baja. Si suena rara o cambia el sentido, no es esa.',
    distractors: {
      '1': 'Ser breve no implica ser confuso; se puede decir poco y claro.',
      '2': 'Nada en la oración sugiere que mienta.',
      '3': 'Es lo contrario de escueto.',
      '4': 'Habla de la intención, no de la extensión.',
    },
  },
  {
    chapter: 'Sinónimos y antónimos',
    stem: 'Señala el <b>antónimo</b> de <b>MENGUAR</b>.',
    options: ['crecer', 'disminuir', 'apagar', 'reducir', 'faltar'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Define', p: 'Menguar es ir a menos, perder tamaño o intensidad.', m: 'menguar = disminuir' },
      { t: 'Descarta los sinónimos', p: 'Dos alternativas dicen lo mismo que menguar, no lo contrario.', m: 'disminuir ✗\nreducir ✗' },
      { t: 'Elige el opuesto', p: 'Ir a más es crecer.', m: 'crecer  ✓' },
    ],
    concept:
      'En los antónimos, los distractores casi siempre incluyen sinónimos de la palabra base. Descartarlos primero deja el campo despejado.',
    trick: 'Tacha los sinónimos antes de elegir. Si te quedan dos opuestos, gana el que se opone en el mismo plano.',
    distractors: {
      '1': 'Es sinónimo de menguar.',
      '2': 'Se aplica a la luz o al fuego, y no es el opuesto exacto.',
      '3': 'También es sinónimo.',
      '4': 'Faltar es no estar, no ir a menos.',
    },
  },
  {
    chapter: 'Sinónimos y antónimos',
    stem: 'Señala el <b>sinónimo</b> de <b>OBSTINADO</b>.',
    options: ['pertinaz', 'decidido', 'valiente', 'molesto', 'lento'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Define con precisión',
        p: 'Obstinado es quien mantiene su posición aunque haya razones para cambiarla. Lleva una carga negativa.',
        m: 'obstinado = terco, porfiado',
      },
      {
        t: 'Mide la connotación de cada alternativa',
        p: 'Aquí se decide la pregunta: hay una alternativa parecida pero de signo positivo.',
        m: 'decidido → positivo\nobstinado → negativo',
      },
      {
        t: 'Elige la que coincide en significado y en carga',
        p: 'Pertinaz es persistir de forma tenaz, con el mismo matiz de exceso.',
        m: 'pertinaz  ✓',
      },
    ],
    concept:
      'Dos palabras pueden describir la misma conducta con valoraciones opuestas. Un sinónimo tiene que coincidir también en la carga.',
    trick:
      'Pregúntate si la palabra es un elogio o un reproche. Obstinado reprocha; decidido elogia. Eso solo ya descarta la trampa.',
    distractors: {
      '1': 'Describe una conducta parecida, pero con valoración positiva: es la trampa de la pregunta.',
      '2': 'Se refiere al valor ante el peligro, no a la insistencia.',
      '3': 'Es una consecuencia posible, no el significado.',
      '4': 'No guarda relación con el significado.',
    },
  },

  // ── Término excluido ──────────────────────────────────────────────────────
  {
    chapter: 'Término excluido',
    stem: 'Señala el término <b>excluido</b>:<br><br><span class="math">MARTILLO · DESTORNILLADOR · ALICATE · CLAVO · SERRUCHO</span>',
    options: ['CLAVO', 'MARTILLO', 'ALICATE', 'SERRUCHO', 'DESTORNILLADOR'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Busca qué comparten la mayoría',
        p: 'El criterio se descubre mirando el grupo, no la palabra sospechosa.',
        m: 'Martillo, destornillador, alicate y\nserrucho son herramientas.',
      },
      {
        t: 'Comprueba el que no encaja',
        p: 'El clavo es material sobre el que se trabaja, no un instrumento para trabajar.',
        m: 'CLAVO → material  ✗',
      },
    ],
    concept:
      'El término excluido se halla nombrando el criterio que une a los demás. Si no puedes nombrarlo, todavía no tienes la respuesta.',
    trick: 'Formula el criterio en voz baja: «todos son…». La palabra que no cabe en esa frase es la respuesta.',
    distractors: {
      '1': 'Es una herramienta, como la mayoría.',
      '2': 'Es una herramienta.',
      '3': 'Es una herramienta.',
      '4': 'Es una herramienta.',
    },
  },
  {
    chapter: 'Término excluido',
    stem: 'Señala el término <b>excluido</b>:<br><br><span class="math">TRUCHA · ANCHOVETA · DELFÍN · ATÚN · BONITO</span>',
    options: ['DELFÍN', 'TRUCHA', 'ANCHOVETA', 'ATÚN', 'BONITO'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Nombra el criterio aparente',
        p: 'Todos son animales acuáticos. Pero ese criterio no excluye a ninguno, así que hay que afinarlo.',
        m: 'Criterio flojo: viven en el agua',
      },
      {
        t: 'Afina hasta que uno quede fuera',
        p: 'Cuatro son peces; el delfín es un mamífero que respira aire y amamanta a sus crías.',
        m: 'Criterio útil: son peces',
      },
      {
        t: 'Desconfía del criterio geográfico',
        p: 'La trucha es de río y los demás de mar, pero eso dejaría fuera a la trucha por una razón más débil que la biológica.',
        m: 'Prevalece la clasificación biológica',
      },
    ],
    concept:
      'Cuando dos criterios compiten, gana el más esencial. La clase a la que pertenece un ser vivo pesa más que dónde vive.',
    trick: 'Si tu criterio no excluye a nadie, es demasiado amplio. Afínalo hasta que sobre exactamente uno.',
    distractors: {
      '1': 'Es un pez, aunque de agua dulce. El hábitat es un criterio más débil que la clase.',
      '2': 'Es un pez.',
      '3': 'Es un pez.',
      '4': 'Es un pez.',
    },
  },
  {
    chapter: 'Término excluido',
    stem: 'Señala el término <b>excluido</b>:<br><br><span class="math">ALEGRÍA · TRISTEZA · MIEDO · IRA · LLANTO</span>',
    options: ['LLANTO', 'ALEGRÍA', 'TRISTEZA', 'MIEDO', 'IRA'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Nombra el criterio',
        p: 'Alegría, tristeza, miedo e ira son estados internos.',
        m: 'Criterio: son emociones',
      },
      {
        t: 'Identifica de qué naturaleza es el sobrante',
        p: 'El llanto no se siente: se ve. Es la manifestación física de una emoción, no la emoción misma.',
        m: 'LLANTO → manifestación  ✗',
      },
      {
        t: 'Comprueba que no haya otro criterio mejor',
        p: 'Podría pensarse en «positivas y negativas», pero eso dejaría fuera a la alegría por un criterio menos esencial.',
        m: 'Prevalece emoción vs. manifestación',
      },
    ],
    concept:
      'Confundir una cosa con su manifestación —la emoción con el llanto, la enfermedad con el síntoma— es una de las exclusiones más pedidas.',
    trick: 'Pregúntate si la palabra nombra algo que se siente o algo que se observa. Ahí suele estar el corte.',
    distractors: {
      '1': 'Es una emoción, aunque sea la única positiva. Ese criterio es más débil.',
      '2': 'Es una emoción.',
      '3': 'Es una emoción.',
      '4': 'Es una emoción.',
    },
  },
  {
    chapter: 'Término excluido',
    stem: 'Señala el término <b>excluido</b>:<br><br><span class="math">LUNES · MARTES · SEMANA · JUEVES · VIERNES</span>',
    options: ['SEMANA', 'LUNES', 'MARTES', 'JUEVES', 'VIERNES'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Nombra el criterio', p: 'Cuatro de los cinco son días.', m: 'Criterio: son días de la semana' },
      {
        t: 'Mira la relación del sobrante con los demás',
        p: 'La semana no es un día más: es el conjunto que los contiene a todos.',
        m: 'SEMANA ⊃ lunes, martes, jueves…',
      },
    ],
    concept:
      'Cuando un término contiene a los demás, queda excluido por ser de otro nivel: es el todo frente a las partes.',
    trick: 'Si una palabra puede describirse como «el conjunto de las otras», es la respuesta.',
    distractors: {
      '1': 'Es un día de la semana.',
      '2': 'Es un día de la semana.',
      '3': 'Es un día de la semana.',
      '4': 'Es un día de la semana.',
    },
  },
  {
    chapter: 'Término excluido',
    stem: 'Señala el término <b>excluido</b>:<br><br><span class="math">AMAZONAS · TITICACA · UCAYALI · MARAÑÓN · RÍMAC</span>',
    options: ['TITICACA', 'AMAZONAS', 'UCAYALI', 'MARAÑÓN', 'RÍMAC'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Descarta el criterio más obvio',
        p: 'Todos son accidentes geográficos del Perú y todos contienen agua dulce. Ninguno de esos criterios excluye a nadie.',
        m: 'Criterios inútiles: son peruanos,\nson masas de agua',
      },
      {
        t: 'Busca la diferencia de forma',
        p: 'Amazonas, Ucayali, Marañón y Rímac son ríos: corren. El Titicaca es un lago: no corre.',
        m: 'Criterio útil: son ríos',
      },
      {
        t: 'Resiste los criterios laterales',
        p: 'El Rímac es costeño y los otros tres amazónicos, pero la vertiente es un criterio más débil que la forma del accidente.',
        m: 'Prevalece río vs. lago',
      },
    ],
    concept:
      'Un buen distractor comparte varios criterios débiles con el grupo. La exclusión correcta se apoya siempre en el más esencial.',
    trick:
      'Si dos candidatos parecen posibles, elige el que se distingue por lo que la cosa ES, no por dónde está o de qué tamaño es.',
    distractors: {
      '1': 'Es un río, el más caudaloso del mundo.',
      '2': 'Es un río amazónico.',
      '3': 'Es un río amazónico.',
      '4': 'Es un río, aunque de la vertiente del Pacífico. La vertiente es un criterio más débil.',
    },
  },

  // ── Conectores lógicos ────────────────────────────────────────────────────
  {
    chapter: 'Conectores lógicos',
    stem: 'Estudió durante todo el verano; <b>______</b>, aprobó el examen sin dificultad.',
    options: ['por lo tanto', 'sin embargo', 'aunque', 'en cambio', 'a menos que'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Lee las dos partes y decide la relación',
        p: 'Estudiar mucho y aprobar van en el mismo sentido: lo segundo es resultado de lo primero.',
        m: 'causa → consecuencia',
      },
      { t: 'Elige un conector de consecuencia', p: 'Por lo tanto introduce lo que se sigue de lo anterior.', m: 'por lo tanto  ✓' },
      {
        t: 'Comprueba leyendo la oración completa',
        p: 'Si al leerla suena contradictoria, el conector está mal elegido.',
        m: '',
      },
    ],
    concept:
      'El conector no adorna: dice qué relación hay entre las dos ideas. Decide primero la relación y después busca la palabra.',
    trick:
      'Tres familias resuelven casi todo: consecuencia (por lo tanto), oposición (sin embargo) y causa (porque).',
    distractors: {
      '1': 'Anuncia oposición, y aquí las dos ideas van en el mismo sentido.',
      '2': 'Introduce una concesión que la oración no tiene.',
      '3': 'Sirve para contrastar dos cosas distintas.',
      '4': 'Introduce una condición, y aquí no hay ninguna.',
    },
  },
  {
    chapter: 'Conectores lógicos',
    stem: 'No llegó a tiempo a la entrevista <b>______</b> el bus se malogró en la Panamericana.',
    options: ['porque', 'aunque', 'por lo tanto', 'sin embargo', 'para que'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Identifica cuál idea explica a cuál',
        p: 'El bus malogrado no es consecuencia de llegar tarde: es su causa.',
        m: 'llegar tarde ← bus malogrado',
      },
      {
        t: 'Fíjate en el orden',
        p: 'Aquí la consecuencia va primero y la causa después. Eso pide un conector causal, no uno consecutivo.',
        m: 'consecuencia + porque + causa',
      },
      { t: 'Comprueba', p: 'Léelo completo y verifica que la explicación quede detrás.', m: 'porque  ✓' },
    ],
    concept:
      '«Porque» introduce la causa y «por lo tanto» la consecuencia. Cuál va antes depende del orden de la oración, no del conector.',
    trick: 'Si puedes reemplazarlo por «ya que» sin cambiar el sentido, es causal.',
    distractors: {
      '1': 'Anuncia una objeción que no existe en la oración.',
      '2': 'Invertiría la relación: haría del bus la consecuencia.',
      '3': 'Es adversativo, y aquí no hay contraste.',
      '4': 'Indica finalidad, no causa.',
    },
  },
  {
    chapter: 'Conectores lógicos',
    stem: 'Es un jugador con mucho talento; <b>______</b>, le falta disciplina para llegar lejos.',
    options: ['no obstante', 'además', 'por eso', 'es decir', 'en consecuencia'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Compara el signo de las dos ideas',
        p: 'La primera es un elogio y la segunda un reparo. Van en sentidos opuestos.',
        m: 'talento (+) ↔ falta de disciplina (−)',
      },
      { t: 'Elige un conector adversativo', p: 'No obstante marca justamente esa oposición.', m: 'no obstante  ✓' },
    ],
    concept:
      'Los adversativos —sin embargo, no obstante, pero— anuncian que lo que viene contradice o limita lo anterior.',
    trick: 'Mira si las dos ideas suman o restan. Si una resta a la otra, el conector es adversativo.',
    distractors: {
      '1': 'Suma otra idea del mismo signo, y aquí hay contraste.',
      '2': 'Convertiría la falta de disciplina en consecuencia del talento.',
      '3': 'Anuncia una aclaración de lo dicho, no una objeción.',
      '4': 'Es consecutivo, como «por eso».',
    },
  },
  {
    chapter: 'Conectores lógicos',
    stem: '<b>______</b> el clima mejoró, la carretera siguió bloqueada; <b>______</b>, el viaje tuvo que postergarse.',
    options: ['Aunque … por lo tanto', 'Como … sin embargo', 'Si bien … además', 'Puesto que … pero', 'Cuando … aunque'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Resuelve un espacio a la vez',
        p: 'Con dos espacios, la estrategia es fijar el que tengas más claro y descartar con él.',
        m: '',
      },
      {
        t: 'Primer espacio: concesión',
        p: 'El clima mejoró pero la carretera siguió bloqueada: lo esperable no ocurrió.',
        m: 'Aunque / Si bien',
      },
      {
        t: 'Segundo espacio: consecuencia',
        p: 'Postergar el viaje se sigue del bloqueo.',
        m: 'por lo tanto',
      },
      {
        t: 'Comprueba que la pareja funcione junta',
        p: 'Si bien encaja en el primero, pero «además» no es consecutivo, así que esa alternativa cae.',
        m: 'Aunque … por lo tanto  ✓',
      },
    ],
    concept:
      'En los ejercicios de doble espacio, cada conector se valida por separado y la alternativa debe cumplir los dos. Basta que falle uno para descartarla entera.',
    trick: 'Empieza por el espacio del que estés más seguro: suele eliminar tres alternativas de golpe.',
    distractors: {
      '1': '«Como» es causal, y el clima mejorado no causa el bloqueo.',
      '2': '«Si bien» sirve, pero «además» suma en vez de concluir.',
      '3': '«Puesto que» es causal y no encaja con la oposición.',
      '4': '«Cuando» es temporal y pierde la concesión.',
    },
  },
  {
    chapter: 'Conectores lógicos',
    stem: '<b>______</b> la evidencia parecía clara, el jurado dudó; <b>______</b>, pidió una nueva pericia y, <b>______</b>, absolvió al acusado.',
    options: [
      'Aunque … por eso … finalmente',
      'Porque … sin embargo … además',
      'Si … aunque … pero',
      'Como … y … sin embargo',
      'Cuando … porque … entonces',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Marca las tres relaciones antes de mirar',
        p: 'Con tres espacios conviene decidir el tipo de cada uno y recién entonces leer las alternativas.',
        m: '1) concesión\n2) consecuencia\n3) cierre temporal',
      },
      {
        t: 'Primer espacio',
        p: 'La evidencia clara debería haber evitado la duda, y sin embargo el jurado dudó.',
        m: 'Aunque  ✓',
      },
      { t: 'Segundo', p: 'La pericia se pide a raíz de la duda.', m: 'por eso  ✓' },
      {
        t: 'Tercero',
        p: 'La absolución cierra la secuencia de hechos.',
        m: 'finalmente  ✓',
      },
      {
        t: 'Verifica la alternativa entera',
        p: 'Una sola pieza mal colocada invalida toda la opción, aunque las otras dos encajen.',
        m: 'Aunque … por eso … finalmente',
      },
    ],
    concept:
      'Un texto encadena relaciones distintas: se concede, se concluye y se cierra. Los conectores son el mapa de ese recorrido.',
    trick:
      'Si una alternativa falla en un solo espacio, descártala completa sin comprobar los demás. Ahorra la mitad del tiempo.',
    distractors: {
      '1': '«Porque» haría de la evidencia clara la causa de la duda.',
      '2': '«Si» introduce una condición que la oración no plantea.',
      '3': '«Como» es causal y pierde la concesión del inicio.',
      '4': '«Cuando» reduce la concesión a una simple referencia temporal.',
    },
  },

  // ── Plan de redacción ─────────────────────────────────────────────────────
  {
    chapter: 'Plan de redacción',
    stem: 'Ordena las oraciones para formar un texto coherente:<br><br><span class="math">I. Hoy es considerado el plato bandera del Perú.<br>II. El ceviche es pescado crudo marinado en jugo de cítrico.<br>III. Su preparación se documenta desde épocas prehispánicas, con otros ácidos.<br>IV. El limón llegó con los españoles y transformó la receta.</span>',
    options: ['II · III · IV · I', 'I · II · III · IV', 'II · IV · III · I', 'III · II · IV · I', 'I · III · IV · II'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Busca la oración que define',
        p: 'Un texto expositivo empieza casi siempre diciendo de qué habla.',
        m: 'II define qué es el ceviche',
      },
      {
        t: 'Ordena lo demás en el tiempo',
        p: 'Después de la definición, lo natural es el recorrido histórico: primero lo antiguo, luego el cambio.',
        m: 'III (prehispánico) → IV (colonial)',
      },
      { t: 'Cierra con el presente', p: 'La oración que habla de «hoy» va al final.', m: 'I' },
    ],
    concept:
      'El orden habitual de un texto expositivo es definición, desarrollo y cierre. El desarrollo suele seguir el tiempo.',
    trick:
      'Busca las marcas temporales —«hoy», «desde», «llegó»— y ordénalas antes de decidir nada más.',
    distractors: {
      '1': 'Empieza por el presente, dejando la definición para después.',
      '2': 'Pone el limón antes de la etapa en que aún no existía en el Perú.',
      '3': 'Empieza por la historia sin haber dicho de qué se habla.',
      '4': 'Deja la definición al final, cuando ya no aporta nada.',
    },
  },
  {
    chapter: 'Plan de redacción',
    stem: 'Ordena las oraciones:<br><br><span class="math">I. Existen más de tres mil variedades nativas registradas.<br>II. Fue domesticada en los Andes hace unos ocho mil años.<br>III. Desde el siglo XVI se difundió por Europa y cambió su alimentación.<br>IV. Hoy es el cuarto cultivo alimentario más importante del mundo.<br>V. La papa es un tubérculo originario de América del Sur.</span>',
    options: ['V · II · I · III · IV', 'II · V · I · III · IV', 'V · I · II · III · IV', 'II · I · V · IV · III', 'V · II · III · I · IV'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Localiza la definición', p: 'V dice qué es la papa y de dónde viene: es la entrada natural.', m: 'V primero' },
      {
        t: 'Sigue el hilo del tiempo',
        p: 'La domesticación es lo más antiguo; la difusión europea, posterior; el presente, al final.',
        m: 'II (−8 000) → III (s. XVI) → IV (hoy)',
      },
      {
        t: 'Coloca el dato que amplía',
        p: 'Las variedades nativas pertenecen al mundo andino, así que van junto a la domesticación y antes de salir de América.',
        m: 'V · II · I · III · IV',
      },
    ],
    concept:
      'Cuando hay una línea temporal clara, el orden la sigue. Los datos que amplían un punto se colocan junto a él, no al final.',
    trick: 'Numera las fechas al margen. El plan casi se ordena solo.',
    distractors: {
      '1': 'Empieza por la domesticación sin decir qué es la papa.',
      '2': 'Pone las variedades antes de contar que fue domesticada.',
      '3': 'Rompe la línea temporal al final.',
      '4': 'Saca a Europa antes de mencionar las variedades andinas, que son anteriores.',
    },
  },
  {
    chapter: 'Plan de redacción',
    stem: 'Ordena las oraciones:<br><br><span class="math">I. En la selva sur la temperatura puede caer de 25 °C a menos de 10 °C en pocas horas.<br>II. El friaje es la irrupción de masas de aire frío procedentes del sur del continente.<br>III. Los más afectados son los niños pequeños y los adultos mayores.<br>IV. Cada año el Estado declara emergencia y distribuye abrigo y alimentos.</span>',
    options: ['II · I · III · IV', 'I · II · III · IV', 'II · III · I · IV', 'IV · II · I · III', 'I · III · II · IV'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Empieza por la definición', p: 'II explica qué es el friaje. Sin eso, lo demás no se entiende.', m: 'II primero' },
      {
        t: 'Sigue con cómo se manifiesta',
        p: 'I concreta el fenómeno con cifras: es el desarrollo de la definición.',
        m: 'II → I',
      },
      {
        t: 'Después, a quién afecta y qué se hace',
        p: 'Primero la consecuencia sobre las personas, después la respuesta del Estado. La acción responde al daño, así que va detrás.',
        m: 'III → IV',
      },
    ],
    concept:
      'Un texto sobre un fenómeno sigue una cadena: qué es, cómo se manifiesta, a quién afecta y qué se hace al respecto.',
    trick: 'La oración que describe una respuesta o una solución casi siempre va al final.',
    distractors: {
      '1': 'Da el dato antes de decir de qué fenómeno se habla.',
      '2': 'Nombra a los afectados antes de describir el fenómeno.',
      '3': 'Empieza por la respuesta estatal, sin contexto.',
      '4': 'Deja la definición en tercer lugar, cuando ya se habló de daños.',
    },
  },
  {
    chapter: 'Plan de redacción',
    stem: 'Ordena las oraciones:<br><br><span class="math">I. Fue inaugurado en 2010, tras cuatro años de obras.<br>II. El Metropolitano es un sistema de buses rápidos que cruza Lima de norte a sur.<br>III. Desde entonces, su corredor exclusivo le permite sostener la velocidad aun en hora punta.<br>IV. Hoy transporta más de setecientos mil pasajeros al día.</span>',
    options: ['II · I · III · IV', 'I · II · III · IV', 'II · III · I · IV', 'III · II · I · IV', 'I · III · II · IV'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Empieza por la definición', p: 'II dice qué es el Metropolitano.', m: 'II primero' },
      {
        t: 'Aprovecha las marcas de enlace',
        p: '«Desde entonces» en III se refiere a un momento que tiene que haberse mencionado antes: la inauguración de I.',
        m: 'I obligatoriamente antes que III',
      },
      { t: 'Cierra con el presente', p: 'IV habla de «hoy».', m: 'II · I · III · IV' },
    ],
    concept:
      'Las expresiones de enlace —«desde entonces», «por eso», «este»— obligan a un orden: se refieren a algo ya dicho.',
    trick:
      'Subraya los enlaces antes de ordenar. Cada uno es una regla que reduce las alternativas posibles.',
    distractors: {
      '1': 'Empieza por la fecha sin haber dicho qué se inauguró.',
      '2': 'Coloca «desde entonces» antes de decir desde cuándo.',
      '3': 'Abre con un enlace que no remite a nada.',
      '4': 'Rompe la definición y el enlace a la vez.',
    },
  },
  {
    chapter: 'Plan de redacción',
    stem: 'Ordena las oraciones:<br><br><span class="math">I. Ese déficit explica que, en el Perú, cerca de cuatro de cada diez niños menores de tres años la padezcan.<br>II. La anemia es la disminución de la hemoglobina por debajo de los valores normales.<br>III. Sus efectos sobre el desarrollo cognitivo son en buena medida irreversibles.<br>IV. Por eso las políticas públicas se concentran en los primeros mil días de vida.<br>V. En los niños pequeños, su causa más frecuente es la falta de hierro en la dieta.</span>',
    options: ['II · V · I · III · IV', 'I · II · V · III · IV', 'II · I · V · III · IV', 'V · II · I · IV · III', 'II · V · III · I · IV'],
    answer: 0,
    difficulty: 3,
    steps: [
      { t: 'Definición primero', p: 'II dice qué es la anemia, en general.', m: 'II' },
      {
        t: 'Sigue el enlace obligado',
        p: 'I empieza con «ese déficit», que solo puede referirse a la falta de hierro de V. Por tanto V va antes que I.',
        m: 'V → I',
      },
      {
        t: 'Después la consecuencia',
        p: 'Presentado el problema y su magnitud, viene su gravedad.',
        m: 'III',
      },
      {
        t: 'Y el otro enlace obligado',
        p: 'IV empieza con «por eso»: es la respuesta a la irreversibilidad que acaba de mencionarse en III.',
        m: 'III → IV',
      },
      {
        t: 'Arma la cadena completa',
        p: 'Los dos enlaces fijan casi todo el orden por sí solos.',
        m: 'II · V · I · III · IV',
      },
    ],
    concept:
      'De lo general a lo particular, y siempre respetando los enlaces. Cuando hay dos referencias explícitas, el orden queda prácticamente determinado.',
    trick:
      'Localiza primero los enlaces («ese», «por eso», «desde entonces»). Cada uno te da una pareja fija, y con dos parejas el plan se cierra solo.',
    distractors: {
      '1': 'Abre con «ese déficit» sin haber mencionado ningún déficit.',
      '2': 'Pone la cifra antes de la causa a la que remite «ese déficit».',
      '3': 'Invierte la consecuencia y la respuesta: «por eso» quedaría sin antecedente.',
      '4': 'Separa «ese déficit» de la oración a la que se refiere.',
    },
  },

  // ── Oraciones incompletas ─────────────────────────────────────────────────
  {
    chapter: 'Oraciones incompletas',
    stem: 'El testigo se mostró <b>______</b> y respondió todas las preguntas sin vacilar.',
    options: ['seguro', 'evasivo', 'temeroso', 'confundido', 'incómodo'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Busca la pista dentro de la oración',
        p: 'La segunda parte describe la conducta: respondió todo, sin dudar.',
        m: '«...sin vacilar.»',
      },
      {
        t: 'Deduce qué palabra encaja',
        p: 'La palabra que falta tiene que ir en el mismo sentido que la pista, porque las une una «y».',
        m: 'no vacilar → seguridad',
      },
      { t: 'Comprueba leyendo completo', p: 'La oración tiene que sonar natural y coherente.', m: 'seguro  ✓' },
    ],
    concept:
      'La respuesta siempre está en la propia oración. Hay una pista que orienta el sentido de lo que falta.',
    trick: 'Tapa las alternativas y completa tú el espacio. Después busca la más parecida a tu palabra.',
    distractors: {
      '1': 'Contradice el «respondió todas las preguntas».',
      '2': 'No encaja con responder sin vacilar.',
      '3': 'Contradice la seguridad que describe la oración.',
      '4': 'La oración no sugiere incomodidad.',
    },
  },
  {
    chapter: 'Oraciones incompletas',
    stem: 'La empresa <b>______</b> el error en su comunicado, pero se <b>______</b> a indemnizar a los afectados.',
    options: ['admitió … negó', 'ocultó … comprometió', 'reconoció … dispuso', 'negó … opuso', 'aceptó … obligó'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en el «pero»',
        p: 'Un adversativo anuncia que las dos partes van en sentidos opuestos.',
        m: 'primera (+) ↔ segunda (−)',
      },
      {
        t: 'Prueba la pareja completa',
        p: 'Admitir el error es un gesto favorable; negarse a indemnizar lo contradice. La oposición funciona.',
        m: 'admitió … negó  ✓',
      },
      {
        t: 'Descarta las que no se oponen',
        p: 'Reconocer y disponer van en el mismo sentido: el «pero» quedaría sin sentido.',
        m: 'c ✗ por redundancia',
      },
      {
        t: 'Revisa que el verbo rija bien',
        p: '«Se negó a» es correcto; «se opuso a indemnizar» también, pero «negó el error» ya rompe el sentido en el primer espacio.',
        m: '',
      },
    ],
    concept:
      'En las oraciones con dos espacios, el conector dicta la relación entre ambos. Con «pero», los dos deben oponerse.',
    trick: 'Si los dos espacios de una alternativa van en el mismo sentido y hay un «pero», descártala sin leer más.',
    distractors: {
      '1': 'Ocultar y comprometerse no se oponen del modo que pide el «pero».',
      '2': 'Reconocer y disponer van en el mismo sentido: el contraste desaparece.',
      '3': 'Si negó el error, no hay contraste con negarse a indemnizar.',
      '4': '«Se obligó a indemnizar» contradice el sentido adversativo.',
    },
  },
  {
    chapter: 'Oraciones incompletas',
    stem: 'Pese a lo <b>______</b> del presupuesto, la obra terminó antes de lo previsto.',
    options: ['exiguo', 'holgado', 'elevado', 'preciso', 'variable'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Lee el conector inicial',
        p: '«Pese a» anuncia una dificultad que, aun así, no impidió el resultado.',
        m: 'obstáculo → resultado favorable',
      },
      {
        t: 'Deduce qué tipo de palabra falta',
        p: 'Tiene que describir un presupuesto que dificulte la obra: uno escaso.',
        m: 'presupuesto escaso',
      },
      { t: 'Elige', p: 'Exiguo es insuficiente, muy escaso.', m: 'exiguo  ✓' },
    ],
    concept:
      'Los conectores concesivos —«pese a», «a pesar de», «aunque»— exigen que lo que sigue sea un obstáculo, no una ayuda.',
    trick: 'Con «pese a», pregúntate: «¿qué haría difícil esto?». La respuesta es la palabra que falta.',
    distractors: {
      '1': 'Un presupuesto holgado facilitaría la obra, y entonces el «pese a» sobra.',
      '2': 'Igual que el anterior: no sería un obstáculo.',
      '3': 'Un presupuesto preciso no es un impedimento.',
      '4': 'La variabilidad no explica el contraste que plantea la oración.',
    },
  },
  {
    chapter: 'Oraciones incompletas',
    stem: 'Su explicación fue tan <b>______</b> que nadie quedó con dudas.',
    options: ['clara', 'extensa', 'técnica', 'breve', 'amable'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Localiza la consecuencia',
        p: '«Tan… que» introduce el efecto de la cualidad que falta. El efecto es que nadie quedó con dudas.',
        m: 'cualidad → nadie dudó',
      },
      {
        t: 'Pregúntate qué cualidad produce ese efecto',
        p: 'Una explicación puede ser larga, corta o técnica y aun así dejar dudas. Solo una las elimina con seguridad.',
        m: 'claridad → ausencia de dudas',
      },
      { t: 'Comprueba', p: 'Reemplaza y lee la oración completa.', m: 'clara  ✓' },
    ],
    concept:
      'La estructura «tan… que» une una cualidad con su consecuencia. La palabra que falta debe ser la causa suficiente de esa consecuencia.',
    trick: 'Léelo al revés: «nadie quedó con dudas porque la explicación fue…». Así se ve cuál encaja.',
    distractors: {
      '1': 'Una explicación larga puede dejar más dudas, no menos.',
      '2': 'Lo técnico suele generar dudas en quien no es del oficio.',
      '3': 'La brevedad no garantiza que se entienda.',
      '4': 'La amabilidad no dice nada sobre la comprensión.',
    },
  },
  {
    chapter: 'Oraciones incompletas',
    stem: 'El informe no <b>______</b> la hipótesis, pero tampoco aporta datos que la <b>______</b>.',
    options: ['refuta … respalden', 'confirma … sostengan', 'descarta … contradigan', 'prueba … apoyen', 'apoya … confirmen'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Analiza la estructura',
        p: '«No… pero tampoco…» encadena dos negaciones. Para que la oración diga algo, las dos partes tienen que apuntar a lados opuestos.',
        m: 'ni una cosa ni la contraria',
      },
      {
        t: 'Descarta las parejas redundantes',
        p: 'Si los dos verbos van en el mismo sentido, la segunda parte repite la primera y el «tampoco» no aporta nada.',
        m: 'confirma/sostengan → mismo sentido ✗\ndescarta/contradigan → mismo sentido ✗\nprueba/apoyen → mismo sentido ✗',
      },
      {
        t: 'Comprueba la que queda',
        p: 'Refutar y respaldar son opuestos: el informe ni tumba la hipótesis ni la sostiene.',
        m: '«no refuta… pero tampoco datos\nque la respalden»  ✓',
      },
    ],
    concept:
      'Cuando una oración niega dos cosas seguidas, esas dos cosas deben ser contrarias. Si son sinónimas, la frase no informa nada.',
    trick:
      'Lee la alternativa completa y pregúntate qué queda sabiendo. Si la segunda mitad no añade información nueva, es redundante y está mal.',
    distractors: {
      '1': 'No confirmar y no sostener son lo mismo: la oración se repite a sí misma.',
      '2': 'Descartar y contradecir van en el mismo sentido.',
      '3': 'Probar y apoyar son sinónimos en este contexto.',
      '4': 'Apoyar y confirmar tampoco se oponen.',
    },
  },
];
