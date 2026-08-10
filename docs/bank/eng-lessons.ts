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

  // ── A2 · Contar lo que pasó ───────────────────────────────────────────────
  {
    slug: 'eng-pasado',
    chapter: 'A2 · Contar lo que pasó',
    title: 'El pasado y la trampa de did',
    hook: 'El pasado inglés es más fácil que el español: una sola forma para todas las personas. Lo difícil está en otro sitio, y casi nadie lo enseña bien.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Otra vez la buena noticia',
          p: 'El pasado inglés no se conjuga. <strong>I worked, you worked, she worked, they worked</strong>: una sola forma para todo el mundo. Donde el español tiene seis terminaciones distintas, el inglés tiene una.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'El precio: los irregulares',
          p: 'A cambio, unos doscientos verbos no siguen la regla. Suena mucho, pero los que de verdad se usan son unos cincuenta, y son <strong>justo los más frecuentes</strong>: go, have, do, say, get, make, come, see, take, know. Se aprenden usándolos, no en tablas.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'work  →  worked        go    →  went\nlive  →  lived         have  →  had\nplay  →  played        see   →  saw',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La trampa de did',
          p: 'Para preguntar y negar en pasado aparece <strong>did</strong>. Y en cuanto aparece, se lleva él la marca de pasado: el verbo principal vuelve a su forma base. Por eso <em>did you went</em> nunca es correcto — el pasado ya está en <em>did</em>, y ponerlo dos veces es como decir «fuistes».',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'You went home.       →  afirmativa\nDid you go home?     →  did se lleva el pasado\nI didn’t go home.    →  igual al negar',
        },
      },
      {
        kind: 'pair',
        payload: {
          h: 'La -ed no siempre suena igual',
          note: 'Se escribe igual y se pronuncia de tres formas. Solo es una sílaba aparte cuando el verbo ya termina en sonido de t o de d: wanted, needed, decided. En el resto se pega al final sin añadir sílaba.',
          items: [
            { a: 'worked', ipaA: '/t/', esA: 'una sílaba', b: 'wanted', ipaB: '/ɪd/', esB: 'dos sílabas' },
            { a: 'played', ipaA: '/d/', esA: 'una sílaba', b: 'needed', ipaB: '/ɪd/', esB: 'dos sílabas' },
          ],
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escúchalo en frases',
          items: [
            { en: 'I worked late yesterday.', es: 'Ayer trabajé hasta tarde.' },
            { en: 'She wanted to come.', es: 'Ella quería venir.' },
            { en: 'Did you see the game?', es: '¿Viste el partido?' },
            { en: "I didn't go to the party.", es: 'No fui a la fiesta.' },
          ],
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'Las tres frases del capítulo. Fíjate en no meter el pasado dos veces cuando aparece did.',
          items: [{ text: 'I went home early' }, { text: 'Did you go home' }, { text: "I didn't go home" }],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál está bien?',
          opts: [
            'Did you saw the game?',
            'Did you see the game?',
            'Did you seen the game?',
            'You did saw the game?',
          ],
          ans: 1,
          ok: 'Exacto. Con did, el verbo vuelve a su forma base: see, no saw.',
          no: 'El pasado ya está en «did». Si lo pones también en el verbo, lo estás diciendo dos veces.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Repetir el pasado con did: «did you went», «I didn’t saw».',
            'Regularizar los irregulares: «goed», «buyed», «teached».',
            'Usar el participio en vez del pasado: «I have went» o «I seen it».',
            'Pronunciar todas las -ed como sílaba aparte: «worked» tiene una sola.',
            'Negar sin auxiliar: «I not went» en vez de «I didn’t go».',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── A2 · Hablar del futuro ────────────────────────────────────────────────
  {
    slug: 'eng-futuro',
    chapter: 'A2 · Hablar del futuro',
    title: 'Tres futuros y una decisión',
    hook: 'El español tiene un futuro y el inglés tres. No se eligen al azar: cada uno dice algo distinto sobre cuándo lo decidiste.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La pregunta que decide',
          p: 'No preguntes «¿cuál de los tres?». Pregunta <strong>¿cuándo lo decidí?</strong>. Si lo decido en este momento, mientras hablo, es <em>will</em>. Si ya estaba decidido antes de abrir la boca, es <em>going to</em>. Y si además ya está en la agenda, con hora y sitio, es el presente continuo.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'lo decido AHORA       →  I’ll help you.\nya estaba DECIDIDO    →  I’m going to study medicine.\nya está en la AGENDA  →  I’m seeing the doctor at 4.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La prueba del teléfono',
          p: 'Suena el teléfono y dices «yo contesto». En inglés es <strong>«I’ll get it»</strong>, nunca <em>I’m going to get it</em> — porque lo acabas de decidir, al oír el timbre. Si dijeras «going to» sonaría como si tuvieras planeado desde el desayuno contestar ese teléfono.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Y una cuarta cosa, que no es futuro',
          p: 'Los horarios van en <strong>presente simple</strong>, aunque hablen de mañana: <em>The train leaves at 7:30</em>. Es la misma lógica del español —«el tren sale a las siete»— y por eso casi nunca da problemas.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Los cuatro, seguidos',
          items: [
            { en: "The phone is ringing. I'll get it.", es: 'Suena el teléfono. Yo contesto.' },
            { en: "I'm going to study medicine.", es: 'Voy a estudiar medicina.' },
            { en: "I'm meeting Ana at six.", es: 'Quedé con Ana a las seis.' },
            { en: 'The train leaves at seven thirty.', es: 'El tren sale a las siete y media.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Predecir también se reparte',
          p: 'Si predices porque <strong>lo estás viendo</strong>, va <em>going to</em>: «Look at those clouds — it’s going to rain». Si predices por opinión o por lo que crees, va <em>will</em>: «I think it will rain tomorrow». La evidencia delante de los ojos manda going to.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'Tres frases, tres futuros distintos. Piensa cuándo se decidió cada una antes de decirla.',
          items: [
            { text: "I'll get it" },
            { text: "I'm going to study medicine" },
            { text: "It's going to rain" },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Se te cae un vaso de las manos y alguien lo ve venir. ¿Qué diría?',
          opts: [
            'Careful! You will drop it.',
            'Careful! You are going to drop it.',
            'Careful! You drop it.',
            'Careful! You would drop it.',
          ],
          ans: 1,
          ok: 'Exacto. Lo está viendo pasar: hay evidencia delante, y eso pide going to.',
          no: 'Piensa en la evidencia: lo está viendo ocurrir en este momento. Eso pide going to, no una opinión con will.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Usar will para lo que ya estaba planeado: «I will study medicine» cuando lo decidiste hace meses.',
            'Usar going to para lo que decides al hablar: «I’m going to get it» al oír el teléfono.',
            'Poner el infinitivo con to detrás de will: «I will to help you».',
            'Evitar «I’m going to go» por sonar raro: es correcto y se usa a diario.',
            'Usar futuro con los horarios: «The train will leave at 7:30» en vez de «leaves».',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── A2 · Comparar ─────────────────────────────────────────────────────────
  {
    slug: 'eng-comparar',
    chapter: 'A2 · Comparar',
    title: 'Contar sílabas antes de comparar',
    hook: 'El inglés compara de dos maneras distintas y elige según lo larga que sea la palabra. Suena arbitrario. Lo es. Pero la regla es corta.',
    minutes: 6,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La regla cabe en dos líneas',
          p: 'Adjetivo <strong>corto</strong> —una sílaba, o dos terminadas en -y—: se le pega <em>-er</em> y <em>the -est</em>. Adjetivo <strong>largo</strong> —dos sílabas o más—: se le antepone <em>more</em> y <em>the most</em>. Eso es todo.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'cheap      →  cheaper         →  the cheapest\nhappy      →  happier         →  the happiest\nexpensive  →  more expensive  →  the most expensive',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La marca va una sola vez',
          p: 'El error más frecuente es marcarlo dos veces: <em>more cheaper</em>, <em>the most biggest</em>. En español decimos «más barato», con el «más» suelto, así que la mano pide ponerlo también aquí. Pero <strong>-er ya significa «más»</strong>: repetirlo es como decir «más mejor».',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Los tres que se saltan la regla',
          p: 'Como en español, los más usados son irregulares: <strong>good → better → the best</strong>, <strong>bad → worse → the worst</strong>, <strong>far → further → the furthest</strong>. Son tres. Se memorizan y se acabó.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Y cuando son iguales',
          p: 'Para decir que dos cosas se parecen se usa <strong>as … as</strong>: <em>Lima is as big as Bogotá</em>. Y para negarlo, <em>not as … as</em>: <em>It isn’t as big as I imagined</em>. Nunca <em>so big as</em> ni <em>bigger as</em>.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escúchalas',
          items: [
            { en: 'This one is cheaper than that one.', es: 'Este es más barato que aquel.' },
            { en: 'It was the best day of the trip.', es: 'Fue el mejor día del viaje.' },
            { en: "Machu Picchu isn't as big as I imagined.", es: 'Machu Picchu no es tan grande como imaginaba.' },
            { en: 'Traffic is worse than last year.', es: 'El tráfico está peor que el año pasado.' },
          ],
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'Cuidado con no marcar dos veces: se dice «cheaper», no «more cheaper».',
          items: [
            { text: 'This is cheaper than that' },
            { text: 'It was the best day' },
            { text: "It isn't as big as I imagined" },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál está bien?',
          opts: [
            'This hotel is more cheaper.',
            'This hotel is cheaper.',
            'This hotel is more cheap.',
            'This hotel is the cheaper.',
          ],
          ans: 1,
          ok: 'Exacto. «Cheap» es corto, así que lleva -er. Y con -er ya no hace falta more.',
          no: 'Cuenta las sílabas: «cheap» tiene una, así que va con -er. Y el -er ya significa «más»: no lo repitas con more.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Marcar dos veces: «more cheaper», «the most biggest».',
            'Usar more con adjetivos cortos: «more cheap», «more big».',
            'Usar -er con adjetivos largos: «expensiver», «interestinger».',
            'Olvidar el «the» del superlativo: «it was best day».',
            'Decir «so big as» o «bigger as» en vez de «as big as».',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── A2 · Describir personas y rutinas ─────────────────────────────────────
  {
    slug: 'eng-describir',
    chapter: 'A2 · Describir personas y rutinas',
    title: 'El orden que en español es libre',
    hook: 'En español puedes decir «un coche rojo japonés nuevo» o «un coche nuevo japonés rojo». En inglés hay un solo orden posible, y el oído nativo lo nota al instante.',
    minutes: 6,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Los adjetivos van en fila india',
          p: 'Cuando se juntan varios delante del sustantivo, el inglés los ordena siempre igual: <strong>opinión, tamaño, edad, forma, color, origen, material</strong>. Nadie aprende la lista de memoria; se interioriza oyéndola.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'a  nice     small   new    round  red    Japanese  box\n   opinión  tamaño  edad   forma  color  origen',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'En la práctica casi nunca son más de dos',
          p: 'La lista completa asusta, pero en el habla real rara vez se encadenan más de dos o tres adjetivos. Lo único que hay que retener es la pareja que más se usa: <strong>edad antes que color</strong> y <strong>color antes que origen</strong>. Con eso resuelves casi todo: <em>a new red Japanese car</em>.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Los adverbios de frecuencia también tienen sitio',
          p: 'Always, usually, often, sometimes, never. Van <strong>delante del verbo</strong> —<em>I always get up at seven</em>— salvo con el verbo <em>be</em>, donde van <strong>detrás</strong>: <em>She is always late</em>. Es la única excepción y cubre todos los casos.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'I   always  get up  at seven.  →  delante del verbo\nShe  is  always  late.           →  detrás de be',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Rutinas de verdad',
          items: [
            { en: 'I usually get up at seven.', es: 'Normalmente me levanto a las siete.' },
            { en: 'She is always late for class.', es: 'Ella siempre llega tarde a clase.' },
            { en: 'We never eat out on Mondays.', es: 'Nunca comemos fuera los lunes.' },
            { en: 'He has a new red Japanese car.', es: 'Tiene un coche japonés rojo nuevo.' },
          ],
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'Fíjate en dónde cae el adverbio: delante del verbo normal, detrás de «is».',
          items: [
            { text: 'I usually get up at seven' },
            { text: 'She is always late' },
            { text: 'A new red Japanese car' },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál está bien?',
          opts: ['She always is late.', 'She is always late.', 'Always she is late.', 'She is late always.'],
          ans: 1,
          ok: 'Exacto. Con el verbo be, el adverbio de frecuencia va detrás.',
          no: 'Recuerda la única excepción: con «be» el adverbio va detrás del verbo, no delante.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Poner el adverbio detrás del verbo normal: «I get up always at seven».',
            'Ponerlo delante de «be»: «she always is late».',
            'Ordenar los adjetivos como en español: «a red new car».',
            'Poner el adjetivo detrás del sustantivo: «a car red».',
            'Olvidar la -s de tercera persona al describir rutinas: «he get up at seven».',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B1 · Cuando el sujeto no importa ──────────────────────────────────────
  {
    slug: 'eng-pasiva',
    chapter: 'B1 · Cuando el sujeto no importa',
    title: 'La voz que el español resuelve con «se»',
    hook: 'El inglés usa la pasiva muchísimo más que el español. No porque le guste enredar, sino porque no tiene el «se» que a nosotros nos saca del apuro.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'El problema que resuelve',
          p: 'A veces quien hace la acción no importa, no se sabe, o es obvio. El español lo despacha con «se»: <em>se habla inglés</em>, <em>se construyó en 1950</em>, <em>me robaron la bici</em>. El inglés no tiene esa salida, así que le da la vuelta a la frase y pone lo importante delante.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Activa:  Someone stole my bike.\nPasiva:  My bike was stolen.\n\nActiva:  They speak English here.\nPasiva:  English is spoken here.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La receta, y no hay más',
          p: 'Se forma con <strong>be + participio</strong>. El verbo be lleva el tiempo —was, is, has been, will be— y el participio no cambia nunca. Si quieres decir quién lo hizo, se añade al final con <em>by</em>; pero en la mayoría de las pasivas no se dice, y por eso se usó la pasiva.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'presente        →  is  built\npasado          →  was built\npresente perf.  →  has been built\nfuturo          →  will be built',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escúchalas en contexto',
          items: [
            { en: 'English is spoken here.', es: 'Aquí se habla inglés.' },
            { en: 'My bike was stolen last night.', es: 'Me robaron la bici anoche.' },
            { en: 'The bridge was built in 1950.', es: 'El puente se construyó en 1950.' },
            { en: "The room hasn't been cleaned yet.", es: 'La habitación todavía no se ha limpiado.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Por qué te conviene reconocerla',
          p: 'La pasiva es la voz del inglés escrito: aparece en instrucciones, noticias, informes y exámenes. Aunque al hablar la uses poco, <strong>necesitas entenderla a la primera</strong>, porque en un texto académico está en casi cada párrafo.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'Fíjate en que el participio no cambia: lo que se conjuga es el verbo be.',
          items: [
            { text: 'English is spoken here' },
            { text: 'My bike was stolen' },
            { text: 'The bridge was built in 1950' },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Traduce: «El puente se construyó en 1950.»',
          opts: [
            'The bridge was build in 1950.',
            'The bridge was built in 1950.',
            'The bridge built in 1950.',
            'The bridge is built in 1950.',
          ],
          ans: 1,
          ok: 'Exacto. Be en pasado más el participio de build, que es built.',
          no: 'La pasiva es be + participio. El participio de «build» es «built», no «build».',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Usar la forma base en vez del participio: «was build», «was steal».',
            'Olvidar el verbo be: «The bridge built in 1950» significa otra cosa.',
            'Traducir toda pasiva inglesa con «se» sin pensar si suena natural en español.',
            'Poner el agente cuando no aporta nada: «My bike was stolen by someone».',
            'Confundir «was born» con un pasado activo: en inglés nacer es siempre pasivo.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B1 · Los verbos que cambian con la partícula ──────────────────────────
  {
    slug: 'eng-phrasal',
    chapter: 'B1 · Los verbos que cambian con la partícula',
    title: 'Una palabra detrás lo cambia todo',
    hook: 'Sabes qué es «look». Y aun así look after, look for y look up no tienen nada que ver entre sí. Esta clase explica cómo abordarlos sin volverse loco.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'No son verbos raros: son los normales',
          p: 'Un phrasal verb es un verbo corriente más una partícula que le cambia el significado. Son <strong>la forma normal de hablar</strong> en inglés cotidiano: donde el registro formal usa un verbo largo de origen latino, la conversación usa uno corto con partícula.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'formal        cotidiano\ntolerate   →  put up with\ninvestigate → look into\npostpone   →  put off\ndiscover   →  find out',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Cómo NO estudiarlos',
          p: 'La lista alfabética de doscientos phrasal verbs no funciona: se olvidan al día siguiente porque no significan nada juntos. Lo que sí funciona es <strong>agruparlos por verbo</strong> —todos los de «look», todos los de «take»— y aprender cada uno dentro de una frase que puedas usar mañana.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'look for    →  buscar\nlook after  →  cuidar\nlook up     →  consultar (en un diccionario)\nlook into   →  investigar\nlook out    →  ¡cuidado!',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'La familia de «look», en frases',
          items: [
            { en: "I'm looking for my keys.", es: 'Estoy buscando mis llaves.' },
            { en: 'Can you look after my dog?', es: '¿Puedes cuidar a mi perro?' },
            { en: "Look it up in the dictionary.", es: 'Búscalo en el diccionario.' },
            { en: 'Look out! There’s a car coming.', es: '¡Cuidado! Viene un coche.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'La regla del pronombre',
          p: 'Algunos phrasal verbs se pueden partir y otros no. Y hay una regla que resuelve el caso más frecuente: <strong>cuando el objeto es un pronombre —it, them, him—, va en medio</strong>. Se dice <em>turn it off</em>, nunca <em>turn off it</em>.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Turn off the light.  ✓\nTurn the light off.  ✓\nTurn it off.         ✓\nTurn off it.         ✗',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'Dilos de corrido, como una sola palabra. Si los partes al pronunciarlos, pierden el sentido.',
          items: [
            { text: "I'm looking for my keys" },
            { text: 'Can you look after my dog' },
            { text: 'Turn it off' },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál está bien?',
          opts: ['Turn off it.', 'Turn it off.', 'Turn off it please.', 'It turn off.'],
          ans: 1,
          ok: 'Exacto. Cuando el objeto es un pronombre, se mete entre el verbo y la partícula.',
          no: 'Con un pronombre como «it», el phrasal verb se parte: va en medio, no al final.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Dejar el pronombre al final: «turn off it», «pick up them».',
            'Traducir la partícula por separado y buscarle sentido literal.',
            'Estudiar listas alfabéticas en vez de agrupar por verbo.',
            'Usar el verbo formal en una conversación: «tolerate» donde un nativo diría «put up with».',
            'Confundir «look for» (buscar) con «look after» (cuidar) por lo parecidas que suenan.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B1 · Entender a velocidad real ────────────────────────────────────────
  {
    slug: 'eng-velocidad',
    chapter: 'B1 · Entender a velocidad real',
    title: 'Nadie habla como escribe',
    hook: 'Entiendes cada palabra por separado y no entiendes la frase. No es tu oído: es que el inglés hablado no pronuncia las palabras una a una.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'El problema no es la velocidad',
          p: 'Lo que llamamos «hablan muy rápido» casi nunca es velocidad. Es que las palabras <strong>se pegan, se reducen y pierden sonidos</strong>. Un nativo no dice «what do you want»: dice algo que suena a una sola palabra larga. Y hasta que no reconoces esa forma, no hay oído que valga.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'escrito              hablado\ngoing to        →   gonna\nwant to         →   wanna\ngot to          →   gotta\nwhat do you     →   whaddaya\nkind of         →   kinda',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Lo importante suena; lo gramatical se borra',
          p: 'El inglés reparte el peso: las palabras que llevan significado —sustantivos, verbos principales, adjetivos— suenan claras y largas. Las gramaticales —artículos, preposiciones, auxiliares— se comprimen hasta casi desaparecer. <strong>Si escuchas buscando cada palabra, te pierdes; si escuchas las que suenan fuerte, entiendes.</strong>',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escúchalo dos veces: normal y despacio',
          items: [
            { en: "What do you want to do tonight?", es: '¿Qué quieres hacer esta noche?' },
            { en: "I'm going to call her later.", es: 'La voy a llamar más tarde.' },
            { en: "It's kind of expensive, isn't it?", es: 'Es un poco caro, ¿no?' },
            { en: 'I would have told you if I had known.', es: 'Te lo habría dicho si lo hubiera sabido.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Las palabras se enganchan',
          p: 'Cuando una palabra acaba en consonante y la siguiente empieza por vocal, se unen. <em>An apple</em> suena «anapple», <em>pick it up</em> suena «pickitup». Por eso una frase corta puede sonar como una sola palabra: no falta nada, está todo pegado.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo pegado, no separado',
          note: 'Si las dices palabra por palabra sonarás más lento que un nativo, no más claro. Pégalas.',
          items: [{ text: 'What do you want to do' }, { text: 'Pick it up' }, { text: 'I would have told you' }],
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Muchos nativos escriben «would of» en vez de «would have». ¿Por qué?',
          opts: [
            'Porque «of» y «have» significan lo mismo en ese contexto',
            'Porque «have» se reduce a /əv/ y suena exactamente igual que «of»',
            'Porque es una forma antigua que sigue aceptándose',
            'Porque «would» exige «of» en inglés informal',
          ],
          ans: 1,
          ok: 'Exacto. En habla rápida «have» se comprime hasta sonar /əv/, idéntico a «of». Escriben lo que oyen. Es un error, pero explica cómo suena de verdad.',
          no: 'Piensa en el sonido, no en el significado: «have» reducido suena /əv/, que es exactamente «of». Escriben lo que oyen.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Escuchar buscando cada palabra en vez de las que suenan fuerte.',
            'Creer que «gonna» o «wanna» son incorrectos: son la pronunciación normal, no jerga.',
            'Escribir «would of», «could of», «should of»: se oyen así, pero se escriben con have.',
            'Pronunciar cada palabra separada al hablar, lo que hace más difícil que te sigan.',
            'Rendirse con un audio en vez de escucharlo tres veces: la tercera se entiende el doble.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B2 · Lo que pudo haber sido ───────────────────────────────────────────
  {
    slug: 'eng-modales-pasado',
    chapter: 'B2 · Lo que pudo haber sido',
    title: 'Reproche, posibilidad y deducción',
    hook: 'Should have, could have, must have. Tres estructuras casi idénticas que dicen cosas completamente distintas, y las tres aparecen en cualquier conversación adulta.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Una fórmula, tres significados',
          p: 'Todas se montan igual: <strong>modal + have + participio</strong>. Lo que cambia es el modal, y con él cambia por completo lo que dices sobre el pasado.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'should have + participio  →  reproche: lo correcto era otra cosa\ncould have  + participio  →  posibilidad: era posible y no pasó\nmust have   + participio  →  deducción: estoy casi seguro de que pasó\nmight have  + participio  →  duda: quizá pasó',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La deducción es la que más se usa y menos se enseña',
          p: 'Ves las luces apagadas y dices «se han ido»: en inglés es <strong>They must have left</strong>. No lo sabes, lo deduces de lo que ves. Y su negativa no es «mustn\'t have» sino <strong>can\'t have</strong>: <em>He can\'t have seen it — he was asleep</em>. Es la única pareja del idioma donde la negación cambia de modal.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Las cuatro, en situación',
          items: [
            { en: 'You should have told me.', es: 'Deberías habérmelo dicho. (reproche)' },
            { en: "I could have helped you, but you didn't ask.", es: 'Podría haberte ayudado, pero no me lo pediste.' },
            { en: 'The lights are off. They must have left.', es: 'Las luces están apagadas. Se habrán ido.' },
            { en: "He can't have seen it — he was asleep.", es: 'No puede haberlo visto: estaba dormido.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Por qué importan en el B2',
          p: 'Son la frontera entre hablar de hechos y hablar <strong>sobre</strong> los hechos: valorarlos, lamentarlos, deducirlos. Sin ellas una conversación se queda en contar lo que pasó; con ellas se puede discutir por qué pasó y qué habría sido mejor.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          note: 'En habla real, «should have» suena /ʃʊdəv/ y «must have» /mʌstəv/. Dilas pegadas: separarlas suena a libro.',
          items: [{ text: 'You should have told me' }, { text: 'They must have left' }, { text: "He can't have seen it" }],
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Llegas y la puerta está abierta y todo revuelto. ¿Qué dices?',
          opts: [
            'Someone should have broken in.',
            'Someone must have broken in.',
            'Someone could have to break in.',
            'Someone can have broken in.',
          ],
          ans: 1,
          ok: 'Exacto. No lo viste, lo deduces de lo que tienes delante: eso es «must have».',
          no: 'No estás reprochando ni imaginando: estás deduciendo a partir de lo que ves. Eso pide «must have».',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Usar «mustn\'t have» para negar una deducción: se dice «can\'t have».',
            'Meter «to» detrás del modal: «could have to», «must have to».',
            'Confundir reproche con deducción: «should have left» no significa «se habrán ido».',
            'Usar el pasado en vez del participio: «must have went».',
            'Traducir «debería haber» literalmente cada vez: a veces el español usa «habrá» y el inglés «must have».',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B2 · Contar lo que otro dijo ──────────────────────────────────────────
  {
    slug: 'eng-reported',
    chapter: 'B2 · Contar lo que otro dijo',
    title: 'Reportar sin cambiar el sentido',
    hook: 'Repetir lo que alguien dijo obliga a mover los tiempos, los pronombres y las referencias de tiempo. Y a veces a no moverlos, que es lo que casi nadie enseña.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Todo retrocede un paso',
          p: 'Al reportar, cada tiempo verbal da un paso hacia el pasado. Es lo mismo que hace el español —«estoy cansada» pasa a «dijo que estaba cansada»—, así que la lógica ya la tienes; lo que hay que aprender es la tabla.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'presente     →  pasado          am    →  was\npasado       →  pasado perfecto went  →  had gone\nwill         →  would\ncan          →  could\ntomorrow     →  the next day\nhere         →  there',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Las preguntas pierden la inversión',
          p: 'Al reportar una pregunta deja de ser pregunta, así que vuelve al orden de una afirmación y pierde el auxiliar: <em>«Where do you live?»</em> pasa a <strong>He asked where I lived</strong>, no <em>where did I live</em>. Es la misma regla de la pregunta indirecta del A1, ahora en pasado.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escucha el antes y el después',
          items: [
            { en: "She said she was tired.", es: 'Dijo que estaba cansada.' },
            { en: 'He said he would call me the next day.', es: 'Dijo que me llamaría al día siguiente.' },
            { en: 'He asked where I lived.', es: 'Me preguntó dónde vivía.' },
            { en: 'She admitted she had made a mistake.', es: 'Admitió que se había equivocado.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'El verbo de reporte ya opina',
          p: 'No todo es «said». <strong>Admit, deny, insist, warn, suggest, complain</strong> reportan y valoran a la vez. Elegir bien el verbo ahorra media frase: <em>He denied doing it</em> dice en tres palabras lo que «he said that he hadn\'t done it» dice en siete.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Cuándo NO se retrocede',
          p: 'Si lo que se dijo <strong>sigue siendo verdad</strong>, el tiempo puede quedarse como está: <em>She said she lives in Lima</em> es perfectamente correcto si sigue viviendo allí. Retroceder siempre, mecánicamente, es lo que hace que un reporte suene a ejercicio de libro.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilo tú',
          items: [
            { text: 'She said she was tired' },
            { text: 'He asked where I lived' },
            { text: 'He denied doing it' },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '«Where do you work?», he asked. ¿Cómo se reporta?',
          opts: [
            'He asked where did I work.',
            'He asked where I worked.',
            'He asked where do I work.',
            'He asked where I did work.',
          ],
          ans: 1,
          ok: 'Exacto. Al reportar deja de ser pregunta: se va el auxiliar y vuelve el orden normal.',
          no: 'Ya no es una pregunta, así que no lleva inversión ni auxiliar: «where I worked».',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Mantener la inversión: «he asked where did I live».',
            'Olvidar mover los pronombres: «she said I was tired» cuando la cansada era ella.',
            'Dejar «tomorrow» o «here» sin ajustar al nuevo momento y lugar.',
            'Retroceder mecánicamente lo que sigue siendo verdad.',
            'Usar «say» con complemento de persona: es «tell me», no «say me».',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B2 · Sonar natural, no correcto ───────────────────────────────────────
  {
    slug: 'eng-colocaciones',
    chapter: 'B2 · Sonar natural, no correcto',
    title: 'La frase correcta que ningún nativo diría',
    hook: '«Strong rain» es gramaticalmente impecable y nadie lo dice. En el B2 el problema deja de ser la corrección y pasa a ser otra cosa.',
    minutes: 6,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Dónde está ahora el listón',
          p: 'A estas alturas ya no cometes errores de gramática que impidan entenderte. Lo que te delata es otra cosa: <strong>combinaciones que existen pero que nadie usa</strong>. Es el mismo problema de los bloques del A1, pero ahora con palabras que ya conoces.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'se dice              no se dice\nheavy rain      ✓    strong rain      ✗\nstrong coffee   ✓    hard coffee      ✗\nmake a decision ✓    take a decision  ~\ncommit a crime  ✓    do a crime       ✗\npay attention   ✓    give attention   ✗',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Por qué no hay regla',
          p: 'La lluvia es «pesada» y el café «fuerte» sin ninguna razón lógica: podría ser al revés y el idioma funcionaría igual. Las colocaciones son <strong>acuerdos históricos</strong>, no reglas. Por eso no se deducen ni se traducen: se reconocen por exposición.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escucha las combinaciones tal como suenan',
          items: [
            { en: 'We had heavy rain all night.', es: 'Llovió con fuerza toda la noche.' },
            { en: 'I need a strong coffee.', es: 'Necesito un café cargado.' },
            { en: 'She made a difficult decision.', es: 'Tomó una decisión difícil.' },
            { en: 'Please pay close attention to this part.', es: 'Presta mucha atención a esta parte.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Cómo se aprenden de verdad',
          p: 'No con listas. Se aprenden <strong>leyendo y escuchando mucho del mismo tipo de contenido</strong>, y anotando la combinación entera cada vez que una te sorprenda. Si un día lees «heavy traffic» y te suena raro, apúntalo: acabas de encontrar una que no tenías.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Dilas enteras',
          note: 'Como en el A1: la unidad es la combinación, no la palabra. Dilas de corrido.',
          items: [{ text: 'We had heavy rain' }, { text: 'I need a strong coffee' }, { text: 'Pay close attention' }],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál diría un nativo?',
          opts: ['There was strong rain last night.', 'There was heavy rain last night.', 'There was hard rain last night.', 'There was big rain last night.'],
          ans: 1,
          ok: 'Exacto. La lluvia en inglés es «heavy», sin ninguna razón lógica. Es un acuerdo, no una regla.',
          no: 'Las cuatro son gramaticalmente posibles; solo una se usa. La lluvia intensa es «heavy rain».',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Traducir el adjetivo español y suponer que la combinación funciona igual.',
            'Usar un sinónimo del diccionario sin comprobar si acompaña a esa palabra.',
            'Estudiar colocaciones en listas sueltas en vez de dentro de frases reales.',
            'Confundir corrección con naturalidad: lo primero ya lo tienes, lo segundo es el trabajo del B2.',
            'Repetir «very» para todo cuando el inglés tiene un adjetivo exacto: «heavy», «deep», «bitter».',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B2 · Defender una postura por escrito ─────────────────────────────────
  {
    slug: 'eng-escribir',
    chapter: 'B2 · Defender una postura por escrito',
    title: 'Un párrafo, una idea, una prueba',
    hook: 'Escribir bien en inglés no es escribir bonito: es que quien lee sepa en la primera línea de cada párrafo qué le vas a demostrar.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La estructura manda sobre el estilo',
          p: 'El inglés académico premia la <strong>previsibilidad</strong>: el lector quiere saber a dónde va antes de llegar. Por eso cada párrafo abre anunciando su idea —la <em>topic sentence</em>—, la desarrolla, la apoya con una prueba y cierra enlazando con la siguiente.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: '1  Idea       →  la afirmación del párrafo, en una frase\n2  Desarrollo →  qué significa, qué implica\n3  Prueba     →  dato, ejemplo, cita\n4  Enlace     →  puente al párrafo siguiente',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'El registro también se escribe',
          p: 'En un texto formal no van contracciones —<em>doesn\'t</em> pasa a <em>does not</em>—, ni phrasal verbs cuando existe el verbo culto, ni preguntas retóricas. No es esnobismo: es la convención que espera quien corrige, y saltársela cuesta puntos aunque el argumento sea bueno.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'conversación        texto formal\nfind out       →    discover\nput off        →    postpone\nlook into      →    investigate\ndoesn\'t        →    does not\nkids           →    children',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Afirma con la fuerza justa',
          p: 'Un texto académico rara vez dice «esto demuestra». Dice <strong>suggests, indicates, tends to</strong>. Medir la fuerza de lo que afirmas —lo que en inglés llaman <em>hedging</em>— es señal de madurez, no de duda: exagerar la certeza es el error más frecuente de un B1 escribiendo como B2.',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escucha la diferencia de tono',
          items: [
            { en: 'This proves that social media causes anxiety.', es: 'Demasiado tajante para lo que se puede demostrar.' },
            { en: 'This suggests that social media may contribute to anxiety.', es: 'Mide la fuerza: es lo que se espera en un texto académico.' },
            { en: 'Although the evidence is limited, the trend is consistent.', es: 'Reconoce la objeción y aun así sostiene la postura.' },
          ],
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál es la mejor frase para abrir un párrafo académico?',
          opts: [
            'In this paragraph I am going to talk about social media.',
            'Social media has changed how teenagers form friendships.',
            'Social media is very interesting and has many aspects.',
            "Let's look at social media and see what happens.",
          ],
          ans: 1,
          ok: 'Exacto. Anuncia una afirmación concreta que se puede defender: eso es una topic sentence.',
          no: 'Una buena apertura no anuncia el tema: afirma algo discutible que el párrafo va a demostrar.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Abrir el párrafo anunciando el tema en vez de afirmar algo: «I am going to talk about…».',
            'Meter dos ideas distintas en un mismo párrafo.',
            'Afirmar más de lo que la evidencia permite: «this proves» donde toca «this suggests».',
            'Usar contracciones y phrasal verbs coloquiales en un texto formal.',
            'Terminar sin enlazar: cada párrafo debe dejar preparado el siguiente.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── B2 · Escuchar contenido académico ─────────────────────────────────────
  {
    slug: 'eng-escuchar',
    chapter: 'B2 · Escuchar contenido académico',
    title: 'Seguir el hilo sin traducir',
    hook: 'En una clase de cuarenta minutos no puedes parar a traducir. Lo que salva no es entender cada palabra: es reconocer la estructura.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Deja de traducir',
          p: 'Traducir mentalmente funciona con frases sueltas y se derrumba con un discurso largo: mientras traduces la primera idea, el que habla ya va por la tercera. La salida no es ir más rápido, es <strong>escuchar la arquitectura</strong> en vez de las palabras.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Quien habla te va diciendo dónde estás',
          p: 'Toda exposición académica lleva señales explícitas. <strong>Firstly, more importantly, however, on the other hand, to sum up.</strong> No aportan contenido: dicen qué papel juega lo que viene. Aprenderlas es aprender a no perderse aunque falten palabras.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'la señal              lo que anuncia\nFirstly / To begin  →  empieza la lista\nMore importantly    →  esto pesa más que lo anterior\nHowever             →  viene la objeción\nIn other words      →  lo va a repetir más claro\nFor instance        →  ejemplo, no idea nueva\nTo sum up           →  la conclusión, atención',
        },
      },
      {
        kind: 'listen',
        payload: {
          h: 'Escucha las señales, no el contenido',
          items: [
            { en: 'Firstly, let us consider the economic impact.', es: 'Empieza la primera parte de la lista.' },
            { en: 'More importantly, however, the social cost was higher.', es: 'Objeción y, además, lo que más pesa.' },
            { en: 'In other words, the policy failed.', es: 'Va a repetir la misma idea más claro.' },
            { en: 'To sum up, three factors explain the decline.', es: 'Llega la conclusión: aquí hay que atender.' },
          ],
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Qué apuntar y qué no',
          p: 'Escribir frases completas te saca del audio. Apunta <strong>solo la estructura</strong>: la tesis, los apartados y los datos con cifra. Los ejemplos casi nunca hay que anotarlos — están para ilustrar, y si entendiste la idea, el ejemplo sobra.',
        },
      },
      {
        kind: 'say',
        payload: {
          h: 'Reconócelas al decirlas',
          note: 'Decir las señales en voz alta ayuda a reconocerlas al oírlas: el oído reconoce mejor lo que la boca ya ha producido.',
          items: [{ text: 'More importantly however' }, { text: 'In other words' }, { text: 'To sum up' }],
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'El profesor dice «For instance, in 2018 the figure dropped by half». ¿Qué anotas?',
          opts: [
            'La frase completa, palabra por palabra',
            'Que hay un ejemplo con una cifra: 2018, cayó a la mitad',
            'Nada: los ejemplos no importan',
            'Solo la palabra «for instance»',
          ],
          ans: 1,
          ok: 'Exacto. «For instance» avisa de que es un ejemplo, pero trae una cifra concreta, y las cifras sí se apuntan.',
          no: 'Es un ejemplo, así que no hace falta la frase entera. Pero lleva una cifra, y las cifras se anotan siempre.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Traducir mentalmente y perder el hilo mientras el que habla avanza.',
            'Parar en la primera palabra que no entiendes en vez de seguir.',
            'Apuntar frases completas y dejar de escuchar.',
            'Confundir un ejemplo con la idea principal.',
            'Escuchar solo una vez: la segunda pasada de un mismo audio rinde más que un audio nuevo.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },
];
