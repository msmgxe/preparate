/**
 * Las clases del A1 de Inglés.
 *
 * Cada clase sigue la misma secuencia que el resto del producto —intuición
 * primero, regla al final— pero añade lo que un idioma exige y una materia
 * escrita no: oír y producir. Los bloques de audio no llevan archivos; la voz
 * la pone el navegador.
 *
 * Se siembran con `npm run db:seed-lessons` y son idempotentes: la clase se
 * reconoce por su `slug` y sus bloques se reescriben enteros, así que
 * corregir un texto aquí y volver a correr el script basta.
 */
export type LessonBlockSeed = { kind: string; payload: Record<string, unknown> };

export type LessonSeed = {
  slug: string;
  /** Título del capítulo en español, tal como está en la base. */
  chapter: string;
  title: string;
  hook: string;
  minutes: number;
  blocks: LessonBlockSeed[];
};

export const ENG_LESSONS: LessonSeed[] = [
  // ── A1 · El presente que más se usa ───────────────────────────────────────
  {
    slug: 'eng-presente',
    chapter: 'A1 · El presente que más se usa',
    title: 'La letra que se cae y el auxiliar que no existe',
    hook: 'Dos detalles diminutos separan a alguien que habla inglés de alguien que traduce del español. Los dos están en esta clase.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Buenas noticias primero',
          p: 'El presente inglés casi no se conjuga. Donde el español tiene seis formas distintas —hablo, hablas, habla, hablamos, habláis, hablan—, el inglés tiene <strong>dos</strong>. Una para casi todo, y otra que solo cambia en una letra.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'I     work        we    work\nyou   work        they  work\nhe/she/it  workS',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Y esa única letra es la que se cae',
          p: 'Precisamente porque es el único cambio del sistema, cuando falta se nota muchísimo. <strong>«My sister work in a hospital»</strong> no impide que te entiendan, pero delata al instante que estás traduciendo. La regla completa cabe en una línea: si puedes reemplazar el sujeto por <em>he</em>, <em>she</em> o <em>it</em>, el verbo lleva -s.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escucha la diferencia',
          items: [
            { en: 'I work in a hospital.', es: 'Trabajo en un hospital.' },
            { en: 'My sister works in a hospital.', es: 'Mi hermana trabaja en un hospital.' },
            { en: 'They live in Lima.', es: 'Ellos viven en Lima.' },
            { en: 'He lives in Lima.', es: 'Él vive en Lima.' },
          ],
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'El auxiliar que en español no existe',
          p: 'Para negar y para preguntar, el inglés mete una palabra que no traduce nada: <strong>do</strong> (o <strong>does</strong> con he/she/it). En español basta con poner «no» delante del verbo; en inglés hace falta el auxiliar. Y hay una consecuencia bonita: cuando aparece <em>does</em>, él se queda con la -s y el verbo vuelve a su forma desnuda. Por eso <em>she doesn\'t likes</em> nunca es correcto.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'She likes coffee.        →  afirmativa\nShe doesn\'t like coffee. →  la -s pasó a "does"\nDoes she like coffee?    →  igual al preguntar',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'Estas tres frases contienen todo el capítulo. Pulsa el micrófono y dilas completas: si el navegador las escribe bien, se te entendió.',
          items: [
            { text: 'She works here' },
            { text: "She doesn't like coffee" },
            { text: 'Does she work here' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'El otro presente',
          p: 'El español usa «trabajo» tanto para lo que hago todos los días como para lo que estoy haciendo ahora mismo. El inglés los separa: <strong>I work</strong> es la rutina, <strong>I am working</strong> es este momento. No es un matiz de estilo — usar uno por otro cambia lo que dices.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'The bus comes at 8.     →  todos los días\nLook! The bus is coming. →  ahora mismo',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '«Listen! Someone ______ the door.» ¿Qué forma va?',
          opts: ['knocks', 'is knocking', 'knock', 'does knock'],
          ans: 1,
          ok: 'Exacto. «Listen!» señala este momento, y eso pide el continuo: be + verbo en -ing.',
          no: 'Fíjate en «Listen!»: está pasando ahora mismo. El presente simple sería para una rutina.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Olvidar la -s con he, she o it: «my sister work» en vez de «works».',
            'Dejar la -s en el verbo cuando ya está en el auxiliar: «she doesn\'t likes».',
            'Negar sin auxiliar, calcando el español: «she not like» o «she no like».',
            'Usar el presente simple para lo que ocurre ahora: «Look! The bus comes».',
            'Traducir «tengo 15 años» como «I have 15 years»: la edad va con to be.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── A1 · Las 1000 palabras que cubren el 85 % ─────────────────────────────
  {
    slug: 'eng-chunks',
    chapter: 'A1 · Las 1000 palabras que cubren el 85 %',
    title: 'No aprendas palabras: aprende bloques',
    hook: 'Sabes qué significa «make» y sabes qué significa «question». Y aun así «make a question» está mal. Esta clase explica por qué, y qué hacer al respecto.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La buena noticia sobre el vocabulario',
          p: 'El inglés tiene cientos de miles de palabras, pero no hacen falta. Las <strong>mil más frecuentes</strong> cubren cerca del 85 % de una conversación normal, y las dos mil primeras rozan el 90 %. Todo lo demás es especialización. Mil palabras son alcanzables: tres al día durante un año.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La mala noticia, y cómo se resuelve',
          p: 'Saber una palabra suelta no basta para usarla. <strong>Ask</strong> significa preguntar y <strong>question</strong> significa pregunta, pero «hacer una pregunta» es <em>ask a question</em>, nunca <em>make a question</em>. Ese emparejamiento no se deduce de ninguna regla: se aprende de memoria, y por eso conviene memorizar el bloque entero desde el principio.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Los bloques que más se usan',
          items: [
            { en: 'ask a question', es: 'hacer una pregunta' },
            { en: 'make a mistake', es: 'cometer un error' },
            { en: 'take a photo', es: 'tomar una foto' },
            { en: 'do my homework', es: 'hacer mi tarea' },
            { en: 'have breakfast', es: 'desayunar' },
            { en: 'pay attention', es: 'prestar atención' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Do y make, el par que más confunde',
          p: 'Los dos se traducen «hacer», y ahí acaba el parecido. La aproximación que funciona: <strong>do</strong> para tareas y obligaciones —lo que hay que cumplir—, y <strong>make</strong> para lo que se crea o se produce. No es una regla exacta, pero acierta la mayoría de las veces y basta para el A1.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'DO   →  homework · the dishes · the shopping · exercise\nMAKE →  a mistake · dinner · a decision · noise · money',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Por qué un bloque se recuerda mejor que dos palabras',
          p: 'La memoria guarda mejor lo que llega junto y con sentido. «Make a decision» es una sola unidad de significado y ocupa un solo espacio en la memoria; «make» y «decision» por separado son dos piezas que hay que ensamblar al hablar, y ensamblar toma tiempo. Por eso quien estudia en bloques suena más fluido con el mismo vocabulario.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilos completos',
          note: 'No los digas palabra por palabra: dilos de corrido, como una sola pieza. Así es como se van a guardar y así es como van a salir cuando los necesites.',
          items: [
            { text: 'Can I ask a question' },
            { text: 'I made a mistake' },
            { text: 'I have to do my homework' },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál es la forma natural de decir «cometí un error»?',
          opts: ['I did a mistake', 'I made a mistake', 'I make a mistake', 'I took a mistake'],
          ans: 1,
          ok: 'Correcto. Un error se «hace» en el sentido de producirlo, así que va con make. Y en pasado, made.',
          no: 'Un error no es una tarea que se cumple: es algo que se produce. Eso pide make, y en pasado made.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Decir «make a question» en vez de «ask a question».',
            'Decir «take a decision» cuando lo natural es «make a decision».',
            'Estudiar listas de palabras sueltas y no poder usarlas al hablar.',
            'Traducir «prestar atención» como «lend attention» en vez de «pay attention».',
            'Aprender palabras raras antes de dominar las mil más frecuentes.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── A1 · Preguntar y responder ────────────────────────────────────────────
  {
    slug: 'eng-preguntas',
    chapter: 'A1 · Preguntar y responder',
    title: 'Preguntar en inglés es mover piezas',
    hook: 'En español basta con cambiar la entonación. En inglés hay que reordenar la frase, y casi siempre meter una palabra que no significa nada.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La diferencia de fondo',
          p: 'En español, «tú vives aquí» y «¿tú vives aquí?» son la misma frase con distinta entonación. En inglés eso no funciona: hay que <strong>reorganizar</strong>. Y como el presente simple no tiene ninguna pieza que mover, el idioma inventa una: <strong>do</strong>.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'You live here.        →  afirmación\nDo you live here?     →  el auxiliar abre la pregunta\nWhere do you live?    →  la palabra wh- va delante',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La excepción que casi nadie enseña',
          p: 'Cuando la palabra de pregunta <strong>es el sujeto</strong>, no hace falta auxiliar: la frase ya está en orden. «¿Quién rompió la ventana?» es <em>Who broke the window?</em>, no <em>Who did break…</em>. La prueba es simple: si la respuesta ocupa el lugar del sujeto —«Pedro rompió la ventana»—, no metas do.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escucha las dos formas',
          items: [
            { en: 'Where do you live?', es: '¿Dónde vives?' },
            { en: 'What time does the class start?', es: '¿A qué hora empieza la clase?' },
            { en: 'Who broke the window?', es: '¿Quién rompió la ventana?' },
            { en: 'How much does it cost?', es: '¿Cuánto cuesta?' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Responder también tiene su forma',
          p: 'A «Do you like pizza?» un nativo no responde «Yes» a secas: suena cortante. Responde <strong>«Yes, I do»</strong>, repitiendo el auxiliar. Es la respuesta corta, y no tiene equivalente en español — por eso hay que aprenderla como fórmula, no deducirla.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Do you like pizza?    →  Yes, I do.  /  No, I don\'t.\nDoes she work here?   →  Yes, she does. / No, she doesn\'t.\nAre you tired?        →  Yes, I am.  /  No, I\'m not.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Pregunta tú',
          note: 'Dilas enteras, con el ritmo de una pregunta de verdad. La entonación sube al final en las de sí/no y baja en las de wh-.',
          items: [
            { text: 'Where do you live' },
            { text: 'What time does it start' },
            { text: 'Who broke the window' },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál está bien escrita?',
          opts: [
            'Who did broke the window?',
            'Who broke the window?',
            'Who did the window broke?',
            'Who does broke the window?',
          ],
          ans: 1,
          ok: 'Exacto. «Who» es el sujeto de la frase, así que no hace falta auxiliar y el verbo va en pasado.',
          no: 'Fíjate en quién hace la acción: la respuesta sería «Pedro rompió la ventana». Como «who» ocupa el lugar del sujeto, no lleva auxiliar.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Preguntar sin auxiliar, calcando el español: «Where you live?».',
            'Invertir el verbo principal como si fuera un auxiliar: «Where live you?».',
            'Meter do cuando la palabra wh- es el sujeto: «Who did break the window?».',
            'Dejar la -s en el verbo cuando ya está en does: «Does she works here?».',
            'Responder solo «Yes» o «No», que en inglés suena seco.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },
];
