import type { LessonSeed } from './eng-lessons';

/**
 * Las clases de Cultura General.
 *
 * El riesgo de este curso es convertirlo en un almanaque. Un alumno no puede
 * retener trescientos datos sueltos, y tampoco le hace falta: los exámenes de
 * admisión peruanos preguntan casi siempre por lo mismo —ubicar algo en su
 * bloque, distinguir dos cosas que se parecen, unir un nombre con su obra o
 * con su función—. Así que cada clase da primero el esqueleto donde colgar los
 * datos, y luego solo los datos que se repiten año tras año.
 *
 * Se siembran con `npm run db:seed-lessons`, reconocidas por su `slug`.
 */
export const CG_LESSONS: LessonSeed[] = [
  // ── Historia del Perú ─────────────────────────────────────────────────────
  {
    slug: 'cg-historia',
    chapter: 'Historia del Perú',
    title: 'Cinco bloques valen más que doscientas fechas',
    hook: 'Nadie recuerda doscientas fechas sueltas. Pero casi todas las preguntas se contestan sabiendo en qué bloque cae la cosa, y eso son cinco cajas.',
    minutes: 8,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'El esqueleto primero',
          p: 'Antes de estudiar ningún dato, quédate con los cinco bloques en orden: <strong>prehispánico</strong>, <strong>conquista</strong>, <strong>virreinato</strong>, <strong>emancipación</strong> y <strong>república</strong>. Cuando te preguntan por algo que no recuerdas, lo primero no es intentar recordarlo: es ubicarlo en un bloque. Con eso, tres de las cuatro alternativas suelen caerse solas porque pertenecen a otra época.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-cg-historia',
          caption: 'Cinco anclas. Todo lo demás se cuelga de ellas por delante o por detrás, sin necesidad de saber el año exacto.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'PREHISPÁNICO\n  Caral        ~3000 a.C.   la civilización más antigua de América\n  Chavín       ~1200 a.C.   primer horizonte cultural\n  Moche · Nazca             desarrollos regionales\n  Wari · Tiwanaku           segundo horizonte\n  Chimú · Chincha           reinos tardíos\n  Tahuantinsuyo  s. XV      hasta 1532\n\nCONQUISTA Y VIRREINATO\n  1532  captura de Atahualpa en Cajamarca\n  1542  se crea el Virreinato del Perú\n  1780  rebelión de Túpac Amaru II\n\nINDEPENDENCIA Y REPÚBLICA\n  1821  San Martín proclama la independencia\n  1824  Junín y Ayacucho: se sella con las armas\n  1879  Guerra del Pacífico (hasta 1883)',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La distinción que más cae: 1821 y 1824',
          p: 'En 1821 San Martín <strong>proclama</strong> la independencia en Lima; el país todavía tenía ejércitos realistas en la sierra y buena parte del territorio seguía bajo control español. Lo que ocurre en 1824, con las batallas de <strong>Junín</strong> y <strong>Ayacucho</strong>, es que esa independencia se consolida militarmente. Por eso las preguntas separan «proclamación» de «consolidación»: son dos hechos distintos con tres años entre medio, y confundirlos es el error más repetido del capítulo.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Culturas: no confundir las que suenan parecido',
          p: '<strong>Caral</strong> es la más antigua y está en Supe, Lima. <strong>Chavín</strong> es muy posterior y está en Áncash. <strong>Chan Chan</strong>, la ciudad de barro más grande de América, es de los <strong>chimú</strong> y está en La Libertad —no tiene nada que ver con Chavín pese al parecido del nombre—. Y <strong>Nazca</strong> es Ica, mientras que <strong>Moche</strong> es La Libertad. Si te aprendes solo estos cinco pares nombre–lugar, cubres la mayoría de lo que preguntan.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Ordena de más antigua a más reciente: Chavín, Caral, Tahuantinsuyo.',
          opts: ['Caral, Chavín, Tahuantinsuyo', 'Chavín, Caral, Tahuantinsuyo', 'Caral, Tahuantinsuyo, Chavín', 'Chavín, Tahuantinsuyo, Caral'],
          ans: 0,
          ok: 'Correcto. Caral ronda el 3000 a.C., Chavín el 1200 a.C. y el Tahuantinsuyo es del siglo XV de nuestra era: casi cuatro mil quinientos años separan la primera de la última.',
          no: 'Caral es la más antigua de las tres —y de América—, hacia el 3000 a.C. Chavín viene mucho después, hacia el 1200 a.C., y el Tahuantinsuyo es el más reciente, del siglo XV.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Confundir la proclamación de 1821 con la consolidación de 1824.',
            'Mezclar Chavín (Áncash) con Chan Chan (La Libertad, chimú) por el parecido del nombre.',
            'Creer que Caral es posterior a Chavín. Es al revés, y por casi dos mil años.',
            'Estudiar fechas sin bloque. Si no sabes en qué época cae algo, la fecha exacta no te sirve de nada.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Geografía y turismo ───────────────────────────────────────────────────
  {
    slug: 'cg-geografia',
    chapter: 'Geografía y turismo',
    title: 'El país entero cabe en un corte transversal',
    hook: 'Costa, sierra y selva no son tres zonas dibujadas en un mapa: son tres alturas. En cuanto lo ves de perfil, las ocho regiones naturales dejan de ser una lista que memorizar.',
    minutes: 8,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'De perfil, no de planta',
          p: 'Casi todo el mundo estudia el Perú mirando el mapa desde arriba, y así costa, sierra y selva parecen tres franjas de color. Míralo <strong>de canto</strong>, como un corte del terreno de oeste a este: sube desde el nivel del mar hasta casi siete mil metros y vuelve a bajar hasta la llanura amazónica. Toda la geografía del país —el clima, los cultivos, los ríos, hasta dónde vive la gente— sale de esa subida y esa bajada.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-cg-geografia',
          caption: 'Las ocho regiones naturales de Javier Pulgar Vidal no sustituyen a las tres de siempre: las cortan en pisos según la altura.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'LAS OCHO REGIONES DE PULGAR VIDAL      altura aproximada\n\n  Chala (costa)          0 – 500 m\n  Yunga                500 – 2300 m\n  Quechua             2300 – 3500 m\n  Suni                3500 – 4000 m\n  Puna                4000 – 4800 m\n  Janca (cordillera)  4800 – 6768 m\n  Rupa Rupa (selva alta)   400 – 1000 m\n  Omagua (selva baja)       80 – 400 m',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Los datos que más se repiten',
          p: 'El punto más alto es el <strong>Huascarán</strong> (6768 m, Áncash). El <strong>Amazonas</strong> nace en el nevado Mismi, en Arequipa. El lago <strong>Titicaca</strong> —el navegable más alto del mundo— está en Puno y se comparte con Bolivia. El país tiene <strong>24 departamentos</strong> más la Provincia Constitucional del <strong>Callao</strong>, que no es departamento y por eso se nombra aparte. Y los ríos se agrupan en tres vertientes: la del Pacífico, la del Atlántico —la más grande, por el Amazonas— y la del Titicaca.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Turismo: cada sitio con su región',
          p: 'La pregunta típica no es qué es el sitio, sino <strong>dónde está</strong>. Machu Picchu, en <strong>Cusco</strong>. Las líneas de Nazca, en <strong>Ica</strong>. Chan Chan, en <strong>La Libertad</strong>. La fortaleza de Kuélap, en <strong>Amazonas</strong>. El cañón del Colca, en <strong>Arequipa</strong>. El Titicaca, en <strong>Puno</strong>. Las líneas de Nazca y Kuélap son las dos que más se fallan, porque suenan a sitios donde no están.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿En qué departamento se encuentra la fortaleza de Kuélap?',
          opts: ['Amazonas', 'Cusco', 'Áncash', 'San Martín'],
          ans: 0,
          ok: 'Correcto. Kuélap está en el departamento de Amazonas, y es la gran ciudadela de la cultura Chachapoyas.',
          no: 'Kuélap está en el departamento de Amazonas, no en Cusco. Es la ciudadela de piedra de los Chachapoyas, y suele confundirse con sitios cusqueños precisamente por su tamaño.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Creer que las ocho regiones reemplazan a costa, sierra y selva. Conviven: unas son por altura, las otras por franja.',
            'Situar las líneas de Nazca en Nazca pero en otro departamento: son de Ica.',
            'Contar el Callao como departamento. Son 24 departamentos más la Provincia Constitucional.',
            'Olvidar que el Amazonas nace en el Perú, en el nevado Mismi de Arequipa.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Economía y actualidad ─────────────────────────────────────────────────
  {
    slug: 'cg-economia',
    chapter: 'Economía y actualidad',
    title: 'Tres indicadores que miden tres cosas distintas',
    hook: 'PBI, inflación y tipo de cambio se nombran juntos en los noticieros y no significan nada parecido. Casi todas las preguntas de este capítulo se caen si tienes clara la diferencia.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Qué mide cada uno',
          p: 'El <strong>PBI</strong> es el valor de todo lo que un país produce en un año: mide tamaño, no reparto. La <strong>inflación</strong> mide cuánto suben los precios, es decir cuánto se encoge lo que puedes comprar con el mismo sol. Y el <strong>tipo de cambio</strong> dice cuántos soles cuesta un dólar. Son independientes: un país puede crecer con inflación alta, y el dólar puede subir en una semana tranquila de precios.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-cg-economia',
          caption: 'Tres preguntas distintas: cuánto se produce, cuánto valen las cosas y cuánto vale la moneda de al lado.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Quién hace qué',
          p: 'El <strong>BCRP</strong> —el Banco Central de Reserva— es autónomo y su encargo constitucional es preservar la estabilidad monetaria: su meta de inflación está entre 1 % y 3 % anual. No fija el precio del dólar, que se forma en el mercado, aunque interviene comprando o vendiendo para suavizar los saltos bruscos. La <strong>SUNAT</strong> recauda los tributos, el <strong>INEI</strong> produce las estadísticas oficiales —incluida la inflación— e <strong>Indecopi</strong> defiende la competencia y al consumidor. Confundir estas cuatro es la pregunta fácil que se falla.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'De qué vive el Perú',
          p: 'La <strong>minería</strong> es, con diferencia, el principal generador de divisas: cobre y oro por delante de todo, con zinc y plata detrás. Después vienen la <strong>agroexportación</strong> —arándanos, uvas, paltas, espárragos—, que ha crecido mucho en las últimas dos décadas, y la <strong>pesca</strong>, sobre todo harina de pescado de anchoveta. Una consecuencia que sí preguntan: al depender tanto de materias primas, cuando bajan sus precios internacionales, la economía peruana lo siente rápido.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Qué institución tiene por mandato constitucional preservar la estabilidad monetaria en el Perú?',
          opts: ['El Banco Central de Reserva', 'La SUNAT', 'El INEI', 'El Ministerio de Economía'],
          ans: 0,
          ok: 'Correcto. El BCRP es autónomo y su función es esa; la meta de inflación que persigue está entre 1 % y 3 % anual.',
          no: 'Es el Banco Central de Reserva, que además es autónomo. La SUNAT recauda impuestos, el INEI hace estadísticas y el Ministerio de Economía maneja el presupuesto: ninguno de los tres decide la política monetaria.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Confundir inflación con devaluación. Una es que suban los precios internos; la otra, que la moneda pierda valor frente a otra.',
            'Creer que el BCRP fija el precio del dólar. Lo suaviza, no lo fija.',
            'Atribuir la recaudación al BCRP o la política monetaria a la SUNAT.',
            'Suponer que si el PBI crece, todo el mundo está mejor. El PBI mide el tamaño de la torta, no cómo se reparte.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Literatura ────────────────────────────────────────────────────────────
  {
    slug: 'cg-literatura',
    chapter: 'Literatura',
    title: 'Cinco nombres, y por qué cada uno está ahí',
    hook: 'El examen casi nunca pide una fecha: pide unir un autor con su obra. Y eso se recuerda muchísimo mejor si sabes qué hizo cada uno que nadie había hecho antes.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La cadena mínima',
          p: 'Con cinco autores se cubre la enorme mayoría de las preguntas, y no por casualidad: cada uno marca un momento en que la literatura peruana cambió de sitio. <strong>Inca Garcilaso</strong> escribe desde las dos culturas a la vez. <strong>Ricardo Palma</strong> se inventa un género. <strong>César Vallejo</strong> rompe el idioma. <strong>José María Arguedas</strong> cuenta el mundo andino desde dentro. <strong>Mario Vargas Llosa</strong> lleva la novela peruana al mundo.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-cg-literatura',
          caption: 'Cada nodo es un cambio, no una fecha. Recordar el cambio hace que la obra y el autor se peguen solos.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Inca Garcilaso de la Vega   Comentarios Reales de los Incas (1609)\nRicardo Palma              Tradiciones peruanas\nCésar Vallejo              Los heraldos negros (1918)\n                           Trilce (1922)\nCiro Alegría               El mundo es ancho y ajeno (1941)\nJosé María Arguedas        Los ríos profundos (1958)\nMario Vargas Llosa         La ciudad y los perros (1963)\n                           Nobel de Literatura, 2010',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Arguedas y Alegría no son el mismo autor',
          p: 'Es la confusión número uno del capítulo, y se entiende: los dos son indigenistas, los dos escriben a mediados del siglo XX sobre el mundo andino. La diferencia que conviene fijar es de <strong>mirada</strong>: Ciro Alegría narra el conflicto de la comunidad campesina contra el poder desde fuera, casi como una épica; Arguedas, que creció hablando quechua, escribe desde dentro y hasta fuerza el castellano para que suene a quechua. <em>El mundo es ancho y ajeno</em> es de Alegría; <em>Los ríos profundos</em>, de Arguedas.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Quién escribió Los ríos profundos?',
          opts: ['José María Arguedas', 'Ciro Alegría', 'César Vallejo', 'Ricardo Palma'],
          ans: 0,
          ok: 'Correcto. Es la novela más conocida de Arguedas, de 1958. La de Ciro Alegría que se le confunde es El mundo es ancho y ajeno.',
          no: 'Es de José María Arguedas, de 1958. Ciro Alegría —el otro gran indigenista— escribió El mundo es ancho y ajeno, que es con la que suele confundirse.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Cruzar Arguedas con Ciro Alegría, que es la confusión más frecuente.',
            'Atribuir Trilce o Los heraldos negros a alguien que no sea Vallejo.',
            'Pensar que los Comentarios Reales son una novela: son una crónica, y su valor es justamente ese.',
            'Estudiar solo los títulos. Si recuerdas qué hizo cada autor de nuevo, el título viene solo.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Educación cívica ──────────────────────────────────────────────────────
  {
    slug: 'cg-civica',
    chapter: 'Educación cívica',
    title: 'Quién hace qué, y por qué tres siglas parecidas no son lo mismo',
    hook: 'RENIEC, ONPE y JNE aparecen en casi todos los exámenes, y casi todos los postulantes las mezclan. Cada una hace un trabajo distinto en la misma elección.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Los tres poderes, en una línea cada uno',
          p: 'El <strong>Ejecutivo</strong> gobierna y administra: lo encabeza el Presidente de la República, elegido por cinco años. El <strong>Legislativo</strong> hace las leyes y fiscaliza al gobierno. El <strong>Judicial</strong> aplica la ley a los casos concretos. La Constitución vigente es la de <strong>1993</strong>, y en su artículo 2 están los derechos fundamentales, que es de donde salen muchas preguntas.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-cg-civica',
          caption: 'A la izquierda, la jerarquía de las normas. A la derecha, quién hace qué. Casi todas las preguntas del capítulo están en uno de los dos lados.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Las tres siglas electorales, de una vez',
          p: 'Piénsalas como tres momentos de la misma elección. El <strong>RENIEC</strong> es el registro civil: identifica a las personas y elabora el <strong>padrón</strong>, o sea la lista de quién puede votar. La <strong>ONPE</strong> <strong>organiza</strong> el proceso: las mesas, las cédulas, el conteo. Y el <strong>JNE</strong> es la instancia jurisdiccional: fiscaliza la legalidad, resuelve las impugnaciones y <strong>proclama</strong> a los electos. Registro, organización, justicia. En ese orden se usan y en ese orden conviene recordarlas.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Los organismos autónomos que más caen',
          p: 'Además de los tres poderes hay órganos con autonomía propia, y el examen los distingue precisamente porque no dependen de nadie. La <strong>Defensoría del Pueblo</strong> protege los derechos de las personas frente a la administración: recomienda y supervisa, pero no sanciona ni juzga. La <strong>Contraloría</strong> controla el uso del dinero público. El <strong>Ministerio Público</strong> —la Fiscalía— investiga los delitos y acusa. El <strong>Tribunal Constitucional</strong> tiene la última palabra sobre si una norma respeta la Constitución. Y el <strong>BCRP</strong>, la política monetaria.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Qué organismo elabora el padrón electoral, es decir, la lista de quiénes pueden votar?',
          opts: ['RENIEC', 'ONPE', 'JNE', 'La Defensoría del Pueblo'],
          ans: 0,
          ok: 'Correcto. El RENIEC identifica a las personas y de ahí sale el padrón. La ONPE organiza el proceso y el JNE proclama los resultados.',
          no: 'Es el RENIEC, que es el registro de identificación: de sus datos sale el padrón. La ONPE organiza la votación el día de la elección, y el JNE fiscaliza y proclama a los ganadores.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Cambiar los papeles de ONPE y JNE: una organiza, la otra juzga y proclama.',
            'Creer que la Defensoría del Pueblo sanciona o multa. Supervisa y recomienda.',
            'Confundir la Contraloría con el Ministerio Público: una controla el gasto público, el otro investiga delitos.',
            'Citar la Constitución de 1979. La vigente es la de 1993.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },
];
