import type { LessonSeed } from './eng-lessons';

/**
 * Las clases de Razonamiento Verbal.
 *
 * Este curso tiene una dificultad que los de números no tienen: el alumno cree
 * que ya sabe, porque el idioma es el suyo. Y falla igual. Por eso todas estas
 * clases atacan lo mismo desde ángulos distintos —que la respuesta no depende
 * de lo que la palabra significa en abstracto sino de lo que hace en esa
 * frase— y todas insisten en el mismo hábito: decidir qué buscas antes de leer
 * las alternativas, porque las alternativas están escritas para convencerte.
 *
 * Se siembran con `npm run db:seed-lessons`, reconocidas por su `slug`.
 */
export const RV_LESSONS: LessonSeed[] = [
  // ── Comprensión lectora ───────────────────────────────────────────────────
  {
    slug: 'rv-lectura',
    chapter: 'Comprensión lectora',
    title: 'Tres preguntas distintas sobre el mismo texto',
    hook: 'La mayoría lee el texto de una manera sola. Pero un examen hace tres tipos de pregunta que se responden mirando sitios diferentes, y saber cuál te tocó ahorra la mitad del tiempo.',
    minutes: 8,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Los tres tipos, y dónde está la respuesta de cada uno',
          p: 'La <strong>literal</strong> pregunta por algo que está escrito: la respuesta se puede subrayar con el dedo. La <strong>inferencial</strong> pregunta por algo que el texto no dice pero obliga a concluir. Y la de <strong>idea principal</strong> —o tema, o título— pregunta por el conjunto, y no se puede contestar mirando una sola línea.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rv-lectura',
          caption: 'Cada tipo de pregunta abarca un tramo distinto. Identificar cuál te toca es el primer paso, y casi nadie lo da.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Tema e idea principal no son lo mismo',
          p: 'El <strong>tema</strong> se dice en dos o tres palabras y no lleva verbo: «la contaminación del río Rímac». La <strong>idea principal</strong> es una oración completa que afirma algo sobre ese tema: «la contaminación del Rímac se debe sobre todo a los vertidos industriales». Si te preguntan la idea principal y eliges una alternativa sin verbo, estás contestando otra pregunta. Y el <strong>título</strong> es el tema, en corto y con gancho.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Cómo están hechas las alternativas trampa',
          p: 'Casi nunca son falsas de plano; sería demasiado fácil. Las tres formas habituales: la <strong>verdadera pero irrelevante</strong>, que dice algo que el texto sí afirma pero no responde lo que preguntan; la <strong>demasiado amplia</strong>, que se pasa de lo que el texto cubre; y la <strong>demasiado estrecha</strong>, que se queda en un detalle de un párrafo. Contra las tres funciona la misma pregunta: <em>¿esto abarca todo el texto, ni más ni menos?</em>',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'ORDEN QUE FUNCIONA\n\n  1. leer el texto entero, sin subrayar todavía\n  2. decir en voz baja de qué trataba, en una frase\n  3. leer la pregunta y clasificarla\n  4. buscar en el texto ANTES de mirar alternativas\n  5. recién entonces, comparar',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Un texto explica que las lenguas originarias del Perú pierden hablantes cada década y detalla tres causas. ¿Cuál sería la idea principal?',
          opts: [
            'Las lenguas originarias del Perú retroceden por causas que se pueden identificar',
            'Las lenguas originarias del Perú',
            'El quechua es la lengua originaria con más hablantes',
            'La pérdida de lenguas es un problema mundial',
          ],
          ans: 0,
          ok: 'Correcto. Es una oración completa, afirma algo y cubre exactamente lo que el texto trata: el retroceso y sus causas.',
          no: 'La segunda opción es el tema, no la idea principal: le falta el verbo, no afirma nada. La tercera es un detalle y la cuarta se sale del texto. La idea principal tiene que afirmar algo y abarcar todo el texto: la primera.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Leer las alternativas antes de buscar en el texto. Están escritas para sonar razonables y contaminan la búsqueda.',
            'Contestar con lo que uno sabe del tema en vez de con lo que dice el texto. En estas preguntas el texto siempre manda.',
            'Confundir tema con idea principal: sin verbo no es idea principal.',
            'Elegir la alternativa más larga o la que usa palabras del texto. Copiar vocabulario es la trampa más barata y la más usada.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Sinónimos y antónimos ─────────────────────────────────────────────────
  {
    slug: 'rv-sinonimos',
    chapter: 'Sinónimos y antónimos',
    title: 'La palabra correcta la decide la frase, no el diccionario',
    hook: 'Dos palabras pueden aparecer juntas en el diccionario y no poder cambiarse una por otra en tu oración. Ese margen —la intensidad, el registro, la compañía— es donde se juegan estas preguntas.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La sinonimia es contextual',
          p: 'En el examen no te preguntan qué significa una palabra: te preguntan cuál la puede <strong>reemplazar en esa oración</strong> sin cambiar el sentido. Por eso el método es literal: tapa la palabra, mete cada alternativa en su lugar y lee la frase completa en voz baja. La que suena igual de bien y dice lo mismo, gana.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rv-sinonimos',
          caption: 'Las cuatro significan «enojado» y ninguna es intercambiable con las otras tres en cualquier frase.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Tres cosas que separan a dos sinónimos',
          p: 'La <strong>intensidad</strong>: molesto y furioso no son el mismo grado. El <strong>registro</strong>: «falleció» y «se murió» dicen lo mismo y no caben en el mismo texto. Y la <strong>compañía</strong>: hay palabras que solo van con ciertas otras —se dice «cometer un error», no «realizar un error»—, aunque el verbo, aislado, signifique lo mismo.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Los antónimos no son todos del mismo tipo',
          p: 'Y saber de qué tipo es cambia la respuesta. Los <strong>complementarios</strong> no admiten término medio: si no estás vivo, estás muerto. Los <strong>graduales</strong> sí lo admiten: entre frío y caliente hay tibio, así que el antónimo de «frío» puede ser «caliente» o «cálido» según la frase. Y los <strong>recíprocos</strong> describen la misma acción desde los dos lados: comprar y vender, dar y recibir. Cuando dudes entre dos alternativas, pregúntate de qué tipo de oposición habla el enunciado.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'En «el testigo se mostró RETICENTE a declarar», ¿cuál es el mejor sinónimo?',
          opts: ['renuente', 'silencioso', 'temeroso', 'incapaz'],
          ans: 0,
          ok: 'Exacto. Reticente es resistirse a hacer algo, y renuente es justo eso. «Silencioso» y «temeroso» describen cómo estaba, no que se resistiera.',
          no: 'Prueba a meter cada una en la frase. «Reticente a declarar» es que se resistía a hacerlo; eso es renuente. Estar silencioso o temeroso puede ser consecuencia, pero no es lo que la palabra significa.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Elegir por parecido de sonido: reticente no viene de «reticencia de hablar» ni de silencio.',
            'Ignorar la intensidad y meter una palabra mucho más fuerte o mucho más suave que la original.',
            'Cambiar el registro: una palabra culta en una frase coloquial se nota aunque el significado cuadre.',
            'No releer la oración completa con la alternativa dentro. Es el paso que resuelve la pregunta y es el que más se salta.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Término excluido ──────────────────────────────────────────────────────
  {
    slug: 'rv-excluido',
    chapter: 'Término excluido',
    title: 'Primero el criterio, después la palabra',
    hook: 'Quien mira las cinco palabras buscando «la rara» se queda dudando entre dos. Quien primero escribe qué comparten cuatro de ellas, termina en diez segundos y sin dudar.',
    minutes: 6,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'El orden correcto está invertido',
          p: 'La pregunta parece pedir que encuentres la palabra que sobra, y por eso casi todos empiezan por ahí. Pero la palabra que sobra solo se puede reconocer <strong>después</strong> de saber qué une a las otras. Así que el primer paso no es buscar: es formular en una frase corta el criterio que agrupa a la mayoría.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rv-excluido',
          caption: 'Con el criterio escrito, la exclusión deja de ser una intuición y pasa a ser una comprobación.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Si dudas entre dos, el criterio está mal',
          p: 'Esa es la señal más útil del capítulo. Un criterio bien formulado deja fuera <strong>exactamente una</strong> palabra; si tu criterio deja fuera dos, es demasiado estrecho, y si no deja fuera ninguna, es demasiado amplio. En lugar de dudar entre las dos candidatas, vuelve atrás y reescribe el criterio. Casi siempre aparece uno mejor y la duda se disuelve sola.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Los criterios que más se repiten',
          p: 'Cuatro cubren casi todo lo que ponen: <strong>campo semántico</strong> —todas son instrumentos musicales menos una—; <strong>parte y todo</strong> —todas son partes de un árbol y la que sobra es el árbol, o es algo ajeno—; <strong>intensidad</strong> —todas son grados de la misma emoción y la que sobra es otra emoción—; y <strong>causa y efecto</strong>. Si en veinte segundos ninguno de los cuatro encaja, pasa a la siguiente pregunta y vuelve al final.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál es el término excluido: pétalo, tallo, raíz, hoja, jardín?',
          opts: ['jardín', 'raíz', 'pétalo', 'tallo'],
          ans: 0,
          ok: 'Correcto. Las cuatro primeras son partes de una planta; el jardín es el lugar donde están las plantas, no una parte de ninguna.',
          no: 'Escribe primero el criterio: pétalo, tallo, raíz y hoja son partes de una planta. Jardín no es una parte: es el sitio donde hay plantas, y por eso queda fuera.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Buscar la palabra rara antes de escribir qué comparten las otras.',
            'Quedarse con el primer criterio que se te ocurra sin comprobar que solo excluye a una.',
            'Excluir por longitud, por rareza o por ser la única que no conoces. Eso no es un criterio.',
            'Confundir «parte de» con «lugar donde está»: es la trampa más repetida del capítulo.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Conectores lógicos ────────────────────────────────────────────────────
  {
    slug: 'rv-conectores',
    chapter: 'Conectores lógicos',
    title: 'Un conector es una señal de tránsito',
    hook: 'No indica contenido: indica dirección. Y si decides la dirección mirando las dos ideas antes de leer las alternativas, la pregunta se cae sola.',
    minutes: 6,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Lo que un conector hace de verdad',
          p: 'Un conector no aporta información nueva: le dice al lector qué relación hay entre lo que acaba de leer y lo que viene. Por eso el método correcto no es probar alternativas, sino <strong>tapar el espacio, leer las dos ideas y decir en voz baja qué relación tienen</strong>. «La segunda contradice a la primera», por ejemplo. Con eso ya sabes qué familia buscar, y solo queda elegir cuál de esa familia suena mejor.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rv-conectores',
          caption: 'Cuatro familias cubren la enorme mayoría de las preguntas. Lo que se elige primero es la flecha, no la palabra.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'ADICIÓN       además · asimismo · también · incluso\nOPOSICIÓN     sin embargo · pero · no obstante · aunque\nCAUSA         porque · puesto que · ya que · debido a que\nCONSECUENCIA  por lo tanto · en consecuencia · así que\n\nY dos que se confunden:\n  ADEMÁS      añade algo del mismo lado\n  EN CAMBIO   pone lo contrario al lado',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Causa y consecuencia son la misma flecha al revés',
          p: 'Fíjate en esto porque explica media docena de errores: «Llegó tarde <strong>porque</strong> había tráfico» y «Había tráfico, <strong>por lo tanto</strong> llegó tarde» describen exactamente lo mismo. Lo único que cambia es cuál de las dos ideas se dijo primero. Así que cuando dudes entre un conector causal y uno consecutivo, no te preguntes qué pasó: pregúntate <em>cuál de las dos frases está antes del espacio</em>.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '«El proyecto tenía financiamiento y un buen equipo; ______, fracasó por falta de permisos.» ¿Qué conector va?',
          opts: ['sin embargo', 'por lo tanto', 'además', 'porque'],
          ans: 0,
          ok: 'Correcto. La segunda idea contradice lo que la primera hacía esperar: es oposición.',
          no: 'Lee las dos ideas sin el conector. Tener financiamiento y equipo hace esperar éxito, y lo que sigue es un fracaso: la relación es de oposición, así que va «sin embargo». «Por lo tanto» diría que el fracaso se sigue de tener buen equipo, que no tiene sentido.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Leer las alternativas antes de decidir la relación. La palabra bonita convence antes de que hayas pensado.',
            'Confundir oposición con consecuencia: «sin embargo» y «por lo tanto» dan sentidos opuestos a la misma frase.',
            'Olvidar la puntuación: muchos conectores piden coma antes, y hay alternativas que se descartan solo por ahí.',
            'En las preguntas de dos espacios, resolver el difícil primero. Empieza por el que tengas claro y descarta con él.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Plan de redacción ─────────────────────────────────────────────────────
  {
    slug: 'rv-plan',
    chapter: 'Plan de redacción',
    title: 'Empieza por la primera y por la última, nunca por el medio',
    hook: 'Ordenar cinco oraciones probando combinaciones son ciento veinte intentos. Decidir cuál puede ir primera son diez segundos, y con eso suelen caerse tres alternativas de golpe.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Cómo se reconoce la primera',
          p: 'La oración inicial es la única que <strong>no depende de ninguna anterior</strong>. Así que descarta todas las que empiecen por «este», «dicha», «además», «por eso», «sus», «también»: esas palabras apuntan hacia atrás, y si van primeras no apuntan a nada. Lo que suele quedar es una definición, una presentación del concepto o el hecho más antiguo de la historia.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rv-plan',
          caption: 'El orden natural de un texto expositivo es un embudo: se abre con lo general y se cierra con lo concreto o con la conclusión.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Las tres lógicas que ordenan el resto',
          p: 'Casi todos los ejercicios siguen una de tres. La <strong>lógica del embudo</strong>: definición, origen, tipos, ejemplo, conclusión. La <strong>cronológica</strong>: los hechos por fecha, del más antiguo al más reciente. Y la <strong>causal</strong>: primero el problema, después las causas, al final las consecuencias o la solución. Identifica cuál de las tres es antes de ordenar nada.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Usa las alternativas como herramienta, no como respuesta',
          p: 'Este es el capítulo donde las alternativas ayudan de verdad, porque casi nunca aparecen las 120 combinaciones posibles: aparecen cinco. En cuanto sepas cuál va primera, tacha todas las que no empiecen por ella —normalmente quedan dos—. Y entre esas dos, mira solo <strong>dónde difieren</strong>: suele ser el orden de dos oraciones concretas, y decidir entre dos es muchísimo más rápido que ordenar cinco.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Tienes estas oraciones sobre el ceviche. ¿Cuál va primera? I. Hoy tiene su propio día de celebración. II. Es un plato de pescado crudo marinado en limón. III. Sus versiones prehispánicas usaban chicha en vez de limón.',
          opts: ['II, porque define qué es', 'III, porque es lo más antiguo', 'I, porque es lo más reciente', 'Cualquiera: no hay un orden fijo'],
          ans: 0,
          ok: 'Correcto. En el orden expositivo, primero se dice qué es la cosa y después su historia. La definición no depende de nada anterior; la historia sí presupone que ya sabes de qué hablamos.',
          no: 'La lógica cronológica ordena los hechos, pero antes de contar la historia de algo hay que decir qué es ese algo. La II define, y por eso abre; III y I vienen después, en ese orden.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Empezar a ordenar de la primera a la quinta en la cabeza en vez de fijar los extremos y descartar alternativas.',
            'Poner de primera una oración que empieza con «este», «dicho», «además» o un posesivo.',
            'Mezclar dos lógicas: si el texto es cronológico, no intercalar la definición en el medio.',
            'Elegir el orden que suena bonito en vez del que sigue una lógica que puedas nombrar.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Oraciones incompletas ─────────────────────────────────────────────────
  {
    slug: 'rv-incompletas',
    chapter: 'Oraciones incompletas',
    title: 'La pista casi siempre está pegada al espacio',
    hook: 'No hace falta entender la oración entera para acertar. Muchas veces basta con la palabra que viene justo después del hueco, que descarta tres alternativas sin pensar.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Dos filtros, en este orden',
          p: 'Primero el <strong>gramatical</strong>: género, número y, sobre todo, la preposición que la palabra exige. «Carece» pide <em>de</em>; «consta» pide <em>de</em>; «incurrir» pide <em>en</em>. Si el hueco va seguido de una preposición, ella sola te dice qué verbos caben. Después el <strong>semántico</strong>: de las que sobrevivieron, cuál tiene sentido en la frase completa. El orden importa porque el primer filtro es mecánico y rápido, y el segundo exige pensar.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rv-incompletas',
          caption: 'La preposición que sigue al hueco no es decoración: es la parte del enunciado que más alternativas elimina.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Cuando hay dos espacios, empieza por el fácil',
          p: 'Es la técnica que más puntos da en este capítulo. No intentes resolver los dos a la vez: elige el que tengas claro —normalmente el segundo, que llega con más contexto—, y <strong>tacha todas las alternativas cuya palabra para ese espacio no funcione</strong>. Con lo que quede, casi nunca hacen falta más de dos comparaciones. Resolver el difícil primero es trabajar el doble para el mismo punto.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Y siempre relee la oración entera',
          p: 'Con la alternativa ya puesta dentro, de principio a fin. Es un gesto de cinco segundos y detecta lo que ningún filtro atrapa: una concordancia rota, un tiempo verbal imposible, o una frase que técnicamente cuadra pero que nadie diría. Si al leerla en voz baja algo raspa, no la marques.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '«El informe ______ de tres capítulos y un anexo.» ¿Qué palabra va?',
          opts: ['consta', 'contiene', 'incluye', 'presenta'],
          ans: 0,
          ok: 'Correcto. La preposición «de» lo decide: se dice «consta de». Los otros tres verbos son transitivos y no la llevan.',
          no: 'Mira la palabra que sigue al hueco: «de». Contiene, incluye y presenta van sin preposición —«contiene tres capítulos»—, así que ninguna cabe. El único que exige «de» es «consta».',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Ignorar la preposición posterior al hueco, que suele ser el dato más barato del enunciado.',
            'Elegir la palabra más culta o más larga. En este capítulo no gana la que suena más difícil, sino la que rige bien.',
            'En los ejercicios de dos espacios, empezar por el que no se tiene claro.',
            'No releer la oración completa con la alternativa dentro antes de marcar.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },
];
