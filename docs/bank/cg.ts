import type { BankQuestion } from './types';

/**
 * Cultura General · puntos rápidos que casi nadie prepara.
 *
 * El capítulo no premia memorizar listas: casi todas las preguntas piden
 * relacionar un dato con su causa o su consecuencia. Por eso las de nivel 3
 * son de explicación, no de fecha.
 */
export const CG: BankQuestion[] = [
  // ── Historia del Perú ─────────────────────────────────────────────────────
  {
    chapter: 'Historia del Perú',
    stem: '¿Qué cultura preincaica es conocida por los enormes geoglifos trazados en el desierto de Ica?',
    options: ['Nazca', 'Moche', 'Chavín', 'Paracas', 'Wari'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Ubica el dato en el espacio',
        p: 'El desierto de Ica es el sur de la costa, y allí se desarrolló la cultura Nazca.',
        m: '',
      },
      {
        t: 'Asocia cada cultura con su marca reconocible',
        p: 'Cada una dejó algo distinto, y esa asociación es lo que se pregunta.',
        m: 'Nazca → geoglifos\nMoche → cerámica retrato\nChavín → templo de Chavín\nParacas → mantos bordados',
      },
    ],
    concept:
      'Cada cultura preincaica se recuerda mejor por una obra característica que por sus fechas. Esa asociación es la que resuelve casi todas las preguntas del tema.',
    trick: 'Arma una lista de una línea por cultura: dónde estuvo y qué dejó. Con eso se responde el 80 % del capítulo.',
    distractors: {
      '1': 'Los moches destacaron por su cerámica retrato y sus tumbas, como la del Señor de Sipán.',
      '2': 'Chavín es la cultura del formativo andino, con su templo en Áncash.',
      '3': 'Paracas, también de Ica, es célebre por sus mantos bordados y sus trepanaciones.',
      '4': 'Los wari fueron un imperio de la sierra centro-sur, anterior a los incas.',
    },
  },
  {
    chapter: 'Historia del Perú',
    stem: 'El Tahuantinsuyo se dividía en cuatro suyos. ¿Cuál de ellos abarcaba <b>mayor extensión territorial</b>?',
    options: ['Collasuyo', 'Chinchaysuyo', 'Antisuyo', 'Contisuyo'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ubica los cuatro suyos',
        p: 'Se ordenaban por los puntos cardinales desde el Cusco.',
        m: 'Chinchaysuyo: noroeste\nAntisuyo: este (selva)\nCollasuyo: sureste\nContisuyo: suroeste',
      },
      {
        t: 'Separa extensión de población',
        p: 'El Collasuyo llegaba hasta el actual norte de Argentina y Chile: es el más extenso. El Chinchaysuyo era el más poblado, que no es lo mismo.',
        m: 'Más extenso ≠ más poblado',
      },
    ],
    concept:
      'El Tahuantinsuyo se organizaba desde el Cusco hacia los cuatro puntos cardinales. Cada suyo se distingue por su ubicación, su extensión y su población, y las tres cosas no coinciden.',
    trick: '«Tahuantinsuyo» significa las cuatro regiones unidas. El Cusco era el centro, no un suyo.',
    distractors: {
      '1': 'Fue el más poblado y el de mayor desarrollo agrícola, pero no el más extenso.',
      '2': 'Era el más pequeño en territorio efectivamente controlado: la selva frenó la expansión.',
      '3': 'Era el menor de los cuatro, entre el Cusco y la costa sur.',
    },
  },
  {
    chapter: 'Historia del Perú',
    stem: 'Ordena cronológicamente estos tres hechos:<br><br><span class="math">I. Batalla de Ayacucho<br>II. Proclamación de la independencia en Lima<br>III. Rebelión de Túpac Amaru II</span>',
    options: ['III · II · I', 'III · I · II', 'II · I · III', 'I · II · III', 'II · III · I'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ancla la fecha que mejor recuerdes',
        p: 'La proclamación de la independencia es el 28 de julio de 1821. Es el punto de referencia del que cuelgan las otras dos.',
        m: 'II → 1821',
      },
      {
        t: 'Sitúa la rebelión',
        p: 'La de Túpac Amaru II fue una sublevación colonial, cuatro décadas anterior a la independencia.',
        m: 'III → 1780',
      },
      {
        t: 'Sitúa la batalla',
        p: 'Ayacucho selló la independencia militar tres años después de proclamada.',
        m: 'I → 1824',
      },
      { t: 'Ordena', p: 'De lo más antiguo a lo más reciente.', m: '1780 · 1821 · 1824  →  III · II · I' },
    ],
    concept:
      'Proclamar la independencia y consumarla militarmente son dos momentos distintos: en el Perú los separan tres años.',
    trick:
      'Fija tres anclas y cuelga todo de ellas: 1780 Túpac Amaru II, 1821 proclamación, 1824 Junín y Ayacucho.',
    distractors: {
      '1': 'Pone Ayacucho antes de la proclamación, cuando fue tres años después.',
      '2': 'Sitúa la rebelión colonial después de la independencia.',
      '3': 'Invierte por completo la cronología.',
      '4': 'Coloca la rebelión de 1780 en medio del proceso independentista.',
    },
  },
  {
    chapter: 'Historia del Perú',
    stem: '¿Cuál fue la principal causa económica de la <b>Guerra del Pacífico</b> (1879–1883)?',
    options: [
      'El control de los yacimientos de salitre',
      'La exportación de guano de las islas',
      'El dominio de las rutas pesqueras',
      'La explotación del caucho amazónico',
      'La plata del cerro de Potosí',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ubica el conflicto en el tiempo',
        p: 'Para 1879 el auge del guano ya había pasado y el salitre era el recurso en disputa.',
        m: 'Guano: ~1845–1870\nSalitre: en disputa hacia 1879',
      },
      {
        t: 'Identifica dónde estaba el recurso',
        p: 'Los yacimientos estaban en Tarapacá y Antofagasta, justo la zona en litigio entre los tres países.',
        m: 'Tarapacá y Antofagasta',
      },
      {
        t: 'Distingue causa de contexto',
        p: 'Hubo también tratados, impuestos y tensiones diplomáticas, pero el recurso en juego era el salitre.',
        m: '',
      },
    ],
    concept:
      'Las guerras del siglo XIX en la región se explican en buena medida por el control de recursos exportables. Situar el recurso en el tiempo evita confundir el guano con el salitre.',
    trick: 'Antes de 1870 piensa en guano; hacia 1879, en salitre. La fecha decide la respuesta.',
    distractors: {
      '1': 'El auge del guano fue anterior y ya estaba en declive al estallar la guerra.',
      '2': 'La pesca industrial peruana es un fenómeno del siglo XX.',
      '3': 'El caucho fue posterior y se dio en la Amazonía, no en la zona del conflicto.',
      '4': 'Potosí está en Bolivia y su auge fue colonial, tres siglos antes.',
    },
  },
  {
    chapter: 'Historia del Perú',
    stem: 'Entre 1845 y 1870 el guano dio al Perú ingresos enormes, y sin embargo al final de ese período el país estaba fuertemente endeudado. ¿Qué explica mejor esa paradoja?',
    options: [
      'Los ingresos se destinaron sobre todo a gasto corriente y a pagar deuda, sin construir capacidad productiva',
      'El guano se agotó mucho antes de lo previsto y no hubo tiempo de aprovecharlo',
      'El precio internacional del guano nunca llegó a subir',
      'El Perú no consiguió exportar el guano por falta de puertos',
      'Toda la explotación quedó en manos del Estado, que no supo venderla',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Descarta lo que contradice el enunciado',
        p: 'El propio enunciado dice que los ingresos fueron enormes, así que ninguna alternativa que niegue el auge puede ser la respuesta.',
        m: 'c, d ✗ contradicen el enunciado',
      },
      {
        t: 'Pregúntate en qué se gastó',
        p: 'Consolidación de la deuda interna, manumisión de esclavos, expansión de la burocracia y algunos ferrocarriles. Poco de eso deja una economía capaz de generar ingresos por sí sola.',
        m: 'gasto corriente + deuda\n> inversión productiva',
      },
      {
        t: 'Une el auge con el endeudamiento',
        p: 'Con ingresos altos y garantizados fue fácil pedir préstamos contra las ventas futuras. Cuando el recurso se agotó, quedó la deuda sin la renta.',
        m: 'renta transitoria → deuda permanente',
      },
    ],
    concept:
      'Un recurso natural genera desarrollo duradero solo si su renta se convierte en capacidad productiva. Si financia gasto corriente, el auge termina y la deuda queda.',
    trick:
      'En las preguntas que plantean una paradoja, la respuesta casi nunca niega uno de los dos términos: los concilia. Descarta primero las que contradicen el enunciado.',
    distractors: {
      '1': 'El agotamiento llegó, pero después de dos décadas y media de explotación intensa.',
      '2': 'Contradice el enunciado, que habla de ingresos enormes.',
      '3': 'El guano se exportó masivamente, sobre todo a Europa.',
      '4': 'La explotación se manejó en buena parte mediante consignatarios y contratos privados.',
    },
  },

  // ── Geografía y turismo ───────────────────────────────────────────────────
  {
    chapter: 'Geografía y turismo',
    stem: '¿Cuál es el río más caudaloso del mundo, cuyas nacientes están en el Perú?',
    options: ['Amazonas', 'Nilo', 'Ucayali', 'Orinoco', 'Marañón'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Separa caudal de longitud',
        p: 'El Amazonas es el más caudaloso del mundo, y sus nacientes están en Arequipa.',
        m: 'caudal ≠ longitud',
      },
      {
        t: 'Ubica a los demás',
        p: 'El Ucayali y el Marañón son afluentes peruanos que lo forman, no el río mismo.',
        m: 'Ucayali + Marañón → Amazonas',
      },
    ],
    concept:
      'El Amazonas se forma en el Perú por la unión del Marañón y el Ucayali. Sus afluentes son parte de él, no alternativas a él.',
    trick: 'Caudal es cuánta agua lleva; longitud es cuánto mide. El Amazonas gana en caudal por mucha diferencia.',
    distractors: {
      '1': 'Es africano y compite en longitud, no en caudal.',
      '2': 'Es uno de los dos ríos que forman el Amazonas.',
      '3': 'Es venezolano y colombiano.',
      '4': 'Es el otro formador del Amazonas.',
    },
  },
  {
    chapter: 'Geografía y turismo',
    stem: 'La división tradicional del Perú en costa, sierra y selva se explica principalmente por:',
    options: [
      'La cordillera de los Andes, que atraviesa el país de norte a sur',
      'La corriente de Humboldt',
      'La latitud, que va del ecuador al trópico',
      'Los vientos alisios del Atlántico',
      'El curso del río Amazonas',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en la forma de las tres regiones',
        p: 'Son tres franjas paralelas de norte a sur. Lo que las separa tiene que tener esa misma forma.',
        m: 'tres franjas longitudinales',
      },
      {
        t: 'Identifica qué accidente tiene esa orientación',
        p: 'Los Andes recorren el país de norte a sur y actúan de muralla: dejan una franja seca al oeste y otra húmeda al este.',
        m: 'Andes → barrera climática',
      },
      {
        t: 'Distingue causa principal de causa secundaria',
        p: 'La corriente de Humboldt explica que la costa sea desértica, pero no la existencia de las tres regiones.',
        m: '',
      },
    ],
    concept:
      'El relieve manda sobre el clima. Una cordillera alta y continua crea regiones distintas a un lado y otro, aunque estén a la misma latitud.',
    trick: 'Si la pregunta es por qué hay franjas paralelas, busca un accidente con esa misma orientación.',
    distractors: {
      '1': 'Explica la aridez de la costa, pero no la existencia de la sierra ni de la selva.',
      '2': 'El Perú está casi todo en la franja tropical: la latitud sola no crearía tres regiones tan distintas.',
      '3': 'Influyen en las lluvias amazónicas, no en la división del territorio.',
      '4': 'Es consecuencia del relieve, no su causa.',
    },
  },
  {
    chapter: 'Geografía y turismo',
    stem: 'El <b>Parque Nacional del Manu</b> es reconocido internacionalmente sobre todo por:',
    options: [
      'Su biodiversidad, una de las mayores del planeta',
      'Sus restos arqueológicos incas',
      'Sus nevados y glaciares',
      'Sus playas y su fauna marina',
      'Sus geoglifos precolombinos',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ubica el parque',
        p: 'Está entre Cusco y Madre de Dios, y baja desde los Andes hasta la llanura amazónica.',
        m: 'de 300 a 4 000 m s. n. m.',
      },
      {
        t: 'Relaciona ubicación con lo que protege',
        p: 'Ese rango de altitud reúne muchos pisos ecológicos en un solo territorio, y por eso concentra tantas especies.',
        m: 'muchos pisos ecológicos\n→ mucha biodiversidad',
      },
    ],
    concept:
      'Las áreas naturales protegidas del Perú se distinguen por lo que conservan. En el Manu, lo excepcional es la variedad de especies, no un monumento.',
    trick:
      'Si un parque abarca muchas altitudes distintas, casi seguro su valor es la biodiversidad: cada piso trae su propia fauna y flora.',
    distractors: {
      '1': 'Los restos incas destacan en el Santuario Histórico de Machu Picchu.',
      '2': 'El Manu es amazónico y andino, pero no se le conoce por sus glaciares.',
      '3': 'No tiene litoral: está tierra adentro.',
      '4': 'Los geoglifos están en el desierto de Ica, no en la selva.',
    },
  },
  {
    chapter: 'Geografía y turismo',
    stem: '¿Por qué la costa peruana es <b>árida</b> a pesar de estar junto al océano?',
    options: [
      'La corriente fría de Humboldt enfría el aire y frena la formación de lluvias',
      'Porque está demasiado al sur del ecuador',
      'Porque su altitud impide que llueva',
      'Porque los vientos amazónicos se llevan la humedad',
      'Por la deforestación de los últimos siglos',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Recuerda cómo se forma la lluvia',
        p: 'Hace falta que el aire húmedo suba y se enfríe al ascender. Si el aire ya está frío abajo, no sube.',
        m: 'aire caliente sube → lluvia',
      },
      {
        t: 'Aplica la corriente fría',
        p: 'Humboldt trae agua fría desde el sur y enfría el aire costero. Se forma niebla, pero casi nunca lluvia.',
        m: 'mar frío → aire estable → garúa',
      },
      {
        t: 'Comprueba con lo que se observa',
        p: 'La garúa limeña es justamente eso: humedad sin lluvia.',
        m: '',
      },
    ],
    concept:
      'Estar junto al mar no garantiza lluvias: depende de la temperatura del agua. Una corriente fría produce costas desérticas, como la peruana o la del norte de Chile.',
    trick: 'Cuando El Niño calienta el mar, la costa norte sí recibe lluvias intensas. Es la prueba de que la causa es la temperatura del agua.',
    distractors: {
      '1': 'Buena parte de la costa está en zona tropical, donde lo esperable serían lluvias.',
      '2': 'La costa está prácticamente a nivel del mar.',
      '3': 'Los Andes bloquean esos vientos: no llegan a la costa.',
      '4': 'El desierto costero es anterior a cualquier actividad humana.',
    },
  },
  {
    chapter: 'Geografía y turismo',
    stem: 'Un turista quiere recorrer el cañón del Colca con la mejor visibilidad posible y el menor riesgo de que la lluvia le arruine el viaje. ¿Qué meses le convienen más?',
    options: ['De mayo a septiembre', 'De enero a marzo', 'De diciembre a febrero', 'De noviembre a enero', 'Da igual: el clima es estable todo el año'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Ubica la zona',
        p: 'El Colca está en la sierra de Arequipa, por encima de los 3 000 metros.',
        m: 'sierra sur, gran altitud',
      },
      {
        t: 'Recuerda el régimen de lluvias andino',
        p: 'En la sierra peruana llueve en verano austral —de diciembre a marzo— y la temporada seca va de mayo a septiembre. Es al revés que en Europa.',
        m: 'lluvias: dic–mar\nseco: may–sep',
      },
      {
        t: 'Traduce a lo que pide el turista',
        p: 'Menos nubes significa más visibilidad, y menos lluvia, caminos en mejor estado.',
        m: 'mayo a septiembre  ✓',
      },
      {
        t: 'Ten en cuenta el otro lado',
        p: 'En temporada seca las noches son mucho más frías. Menos lluvia no significa mejor temperatura.',
        m: '',
      },
    ],
    concept:
      'En la sierra peruana la estación seca y la lluviosa importan más que el calendario de estaciones. Planificar un viaje andino es planificar alrededor de la lluvia.',
    trick:
      'Regla práctica: en la sierra, de mayo a septiembre hay sol de día y frío de noche; de diciembre a marzo, lluvia. En la costa es casi al revés.',
    distractors: {
      '1': 'Es plena temporada de lluvias en la sierra.',
      '2': 'Coincide con el verano austral, el período más lluvioso en altura.',
      '3': 'Es el inicio de la temporada de lluvias.',
      '4': 'El contraste entre las dos estaciones es muy marcado en la sierra.',
    },
  },

  // ── Economía y actualidad ─────────────────────────────────────────────────
  {
    chapter: 'Economía y actualidad',
    stem: 'El <b>IGV</b> es un impuesto que grava principalmente:',
    options: [
      'El consumo de bienes y servicios',
      'La renta que obtienen las personas',
      'La propiedad de los inmuebles',
      'Las exportaciones',
      'Las herencias y donaciones',
    ],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Lee lo que dicen las siglas',
        p: 'Impuesto General a las Ventas. El nombre ya señala qué grava.',
        m: 'IGV = Impuesto General a las Ventas',
      },
      {
        t: 'Piensa en dónde aparece',
        p: 'Está en cualquier boleta de un restaurante o una tienda: se paga al consumir.',
        m: '',
      },
    ],
    concept:
      'Los impuestos se clasifican por lo que gravan: el consumo (IGV), la renta (Impuesto a la Renta) o la propiedad (predial, vehicular).',
    trick: 'Si el impuesto aparece en la boleta, grava consumo. Si aparece en la declaración anual, grava renta.',
    distractors: {
      '1': 'Ese es el Impuesto a la Renta.',
      '2': 'Ese es el impuesto predial, de competencia municipal.',
      '3': 'Las exportaciones están inafectas: se busca no encarecer lo que se vende afuera.',
      '4': 'En el Perú no existe un impuesto sucesorio general.',
    },
  },
  {
    chapter: 'Economía y actualidad',
    stem: 'La <b>inflación</b> se define como:',
    options: [
      'El aumento sostenido y generalizado del nivel de precios',
      'La subida del precio de un producto en particular',
      'La caída del valor de las exportaciones',
      'El aumento del desempleo',
      'La subida de los sueldos por encima de la productividad',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en las dos palabras clave',
        p: 'Sostenido descarta una subida puntual, y generalizado descarta que sea de un solo producto.',
        m: 'sostenido + generalizado',
      },
      {
        t: 'Aplica la prueba',
        p: 'Si sube el limón por una helada, eso no es inflación: es un precio relativo.',
        m: 'un precio ↑  ≠  inflación',
      },
    ],
    concept:
      'La inflación mide el nivel general de precios, no el de un producto. Por eso se calcula con una canasta de bienes y servicios, no con uno solo.',
    trick:
      'Pregúntate si con el mismo dinero compras menos de casi todo. Si es de casi todo, hay inflación; si es de una sola cosa, es un precio que subió.',
    distractors: {
      '1': 'Es un cambio de precio relativo, no inflación.',
      '2': 'Puede acompañarla, pero es otro fenómeno.',
      '3': 'Se relaciona con el mercado laboral, no con los precios.',
      '4': 'Puede ser una causa de inflación, no su definición.',
    },
  },
  {
    chapter: 'Economía y actualidad',
    stem: 'Si la inflación anual fue del <b>4 %</b> y tu sueldo subió <b>2 %</b> en el mismo período, tu poder adquisitivo:',
    options: ['Disminuyó alrededor de 2 %', 'Aumentó 2 %', 'Se mantuvo igual', 'Aumentó 6 %', 'Disminuyó 6 %'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Separa lo nominal de lo real',
        p: 'El sueldo nominal es la cifra en soles; el poder adquisitivo es cuánto alcanza a comprar.',
        m: 'nominal: +2 %\nprecios: +4 %',
      },
      {
        t: 'Compara los dos crecimientos',
        p: 'Los precios subieron el doble que el sueldo, así que con el sueldo nuevo se compra menos que antes.',
        m: '2 % − 4 % ≈ −2 %',
      },
      {
        t: 'Compruébalo con números',
        p: 'Un ejemplo concreto lo vuelve evidente.',
        m: 'Sueldo: 1 000 → 1 020\nCanasta: 1 000 → 1 040\n1 020 no alcanza para 1 040',
      },
    ],
    concept:
      'El poder adquisitivo depende de la diferencia entre el aumento del sueldo y el de los precios. Un aumento nominal puede ser una pérdida real.',
    trick: 'Resta la inflación al aumento nominal. Si da negativo, ganas menos aunque el número del sueldo sea mayor.',
    distractors: {
      '1': 'Ese es el aumento nominal, sin descontar los precios.',
      '2': 'Solo se mantendría si el sueldo hubiera subido también un 4 %.',
      '3': 'Sumaste los dos porcentajes en lugar de restarlos.',
      '4': 'También sumaste en vez de restar, con el signo cambiado.',
    },
  },
  {
    chapter: 'Economía y actualidad',
    stem: 'Por valor exportado, el principal grupo de productos que vende el Perú al exterior es:',
    options: [
      'Los minerales, encabezados por el cobre',
      'Los productos pesqueros',
      'El gas natural',
      'Los textiles y confecciones',
      'El café y el cacao',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Distingue volumen de valor',
        p: 'La pregunta es por valor exportado en dólares, no por toneladas ni por número de empresas.',
        m: '',
      },
      {
        t: 'Piensa en la estructura de la economía',
        p: 'El Perú es uno de los mayores productores de cobre del mundo, y ese solo producto pesa más que todos los demás grupos juntos.',
        m: 'minería ≈ 60 % de las exportaciones',
      },
      {
        t: 'Saca la consecuencia',
        p: 'Eso explica que la economía peruana sea sensible al precio internacional de los metales.',
        m: '',
      },
    ],
    concept:
      'La estructura exportadora del Perú está concentrada en minerales. Esa concentración es la que hace que un precio internacional mueva toda la economía.',
    trick:
      'Recuerda el orden de magnitud, no la cifra exacta: minería primero y muy por delante; agroexportación y pesca después.',
    distractors: {
      '1': 'La harina de pescado es importante, pero muy por debajo de la minería en valor.',
      '2': 'Se exporta, aunque su peso es menor que el de los minerales.',
      '3': 'Fueron importantes en los años noventa; hoy pesan mucho menos.',
      '4': 'Son productos estrella de la agroexportación, pero no el primer grupo.',
    },
  },
  {
    chapter: 'Economía y actualidad',
    stem: 'El precio internacional del cobre sube con fuerza durante varios meses. ¿Cuál es el efecto más probable sobre la moneda de un país exportador de cobre?',
    options: [
      'Tiende a apreciarse, porque entran más dólares al país',
      'Tiende a depreciarse, porque aumenta la demanda de dólares',
      'No le afecta: el tipo de cambio depende solo de la inflación',
      'Se mantiene fija, porque la fija el banco central por decreto',
      'Desaparece la inflación de inmediato',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Sigue el recorrido del dinero',
        p: 'Si el cobre se vende más caro, los exportadores reciben más dólares por lo mismo.',
        m: 'precio ↑ → más dólares entrando',
      },
      {
        t: 'Pregúntate qué hacen con esos dólares',
        p: 'Los cambian a soles para pagar sueldos, impuestos y proveedores locales.',
        m: 'venden dólares, compran soles',
      },
      {
        t: 'Aplica oferta y demanda a la moneda',
        p: 'Más dólares ofrecidos y más soles demandados abaratan el dólar: el sol se aprecia.',
        m: 'oferta de dólares ↑ → tipo de cambio ↓',
      },
      {
        t: 'Matiza',
        p: 'El banco central puede intervenir para suavizar el movimiento, pero eso modera la tendencia; no la invierte.',
        m: '',
      },
    ],
    concept:
      'El tipo de cambio es un precio, y responde a la oferta y la demanda como cualquier otro. Un auge exportador aumenta la oferta de dólares y abarata la divisa.',
    trick:
      'Pregúntate siempre quién entrega y quién pide dólares. Si entran más de los que salen, el dólar baja.',
    distractors: {
      '1': 'Es al revés: no aumenta la demanda de dólares, aumenta su oferta.',
      '2': 'La inflación influye, pero no es el único factor del tipo de cambio.',
      '3': 'El Perú tiene tipo de cambio flotante; el banco central interviene, no lo fija.',
      '4': 'Un tipo de cambio más bajo abarata las importaciones, pero no elimina la inflación.',
    },
  },

  // ── Literatura ────────────────────────────────────────────────────────────
  {
    chapter: 'Literatura',
    stem: '¿Quién escribió <b>Los ríos profundos</b>?',
    options: ['José María Arguedas', 'Mario Vargas Llosa', 'César Vallejo', 'Ciro Alegría', 'Ricardo Palma'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Asocia la obra con su mundo',
        p: 'La novela transcurre en la sierra y mezcla el castellano con el quechua. Eso apunta al indigenismo.',
        m: '',
      },
      {
        t: 'Recuerda el autor',
        p: 'Arguedas creció entre comunidades quechuas, y esa vivencia atraviesa toda su obra.',
        m: 'Arguedas → Los ríos profundos',
      },
    ],
    concept:
      'A cada autor peruano le corresponde un mundo reconocible. Asociar obra y mundo funciona mejor que memorizar títulos sueltos.',
    trick: 'Arguedas y la sierra quechua; Vargas Llosa y la ciudad; Vallejo y la poesía; Palma y la Lima colonial.',
    distractors: {
      '1': 'Suyas son La ciudad y los perros o Conversación en La Catedral.',
      '2': 'Fue poeta, autor de Los heraldos negros y Trilce.',
      '3': 'Escribió El mundo es ancho y ajeno, también indigenista, pero no esta.',
      '4': 'Autor de las Tradiciones peruanas, del siglo XIX.',
    },
  },
  {
    chapter: 'Literatura',
    stem: 'Las <b>Tradiciones peruanas</b>, de Ricardo Palma, se caracterizan por combinar:',
    options: [
      'El relato histórico con la ficción y el humor costumbrista',
      'La poesía épica con la crónica de viaje',
      'El teatro clásico con la sátira política',
      'El ensayo filosófico con la autobiografía',
      'La novela de caballerías con la leyenda oral',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Fíjate en el nombre del género',
        p: 'Palma inventó la «tradición»: un relato breve que parte de un hecho documentado y lo adorna libremente.',
        m: 'historia + invención',
      },
      {
        t: 'Añade el tono',
        p: 'Lo que las hace reconocibles es la ironía y el habla limeña de la época.',
        m: 'humor costumbrista',
      },
    ],
    concept:
      'La tradición es un género propio de Palma: ni crónica pura ni ficción pura. Esa mezcla es exactamente lo que se pregunta.',
    trick: 'Si la pregunta menciona a Palma, la respuesta casi siempre incluye historia, ficción y humor a la vez.',
    distractors: {
      '1': 'Las tradiciones son prosa breve, no poesía épica.',
      '2': 'Palma no escribió teatro en esta obra.',
      '3': 'No son ensayos ni autobiografía.',
      '4': 'Ese género es medieval y europeo.',
    },
  },
  {
    chapter: 'Literatura',
    stem: '¿Cuál de estas obras es de <b>Mario Vargas Llosa</b>, Premio Nobel de Literatura 2010?',
    options: [
      'La ciudad y los perros',
      'El mundo es ancho y ajeno',
      'Trilce',
      'Los ríos profundos',
      'Comentarios reales de los incas',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ubica el tema de cada título',
        p: 'La ciudad y los perros transcurre en el colegio militar Leoncio Prado, en Lima.',
        m: '',
      },
      {
        t: 'Asigna los demás a sus autores',
        p: 'Casi todas las alternativas son obras célebres de otros peruanos: la pregunta mide si distingues quién escribió qué.',
        m: 'Alegría · Vallejo · Arguedas ·\nInca Garcilaso',
      },
    ],
    concept:
      'Las preguntas de literatura peruana suelen presentar cinco obras auténticas de cinco autores distintos. El trabajo es emparejar, no recordar una sola.',
    trick: 'Estudia por parejas autor–obra, no listas separadas. Es lo que el examen pide.',
    distractors: {
      '1': 'Es de Ciro Alegría.',
      '2': 'Es el poemario vanguardista de César Vallejo.',
      '3': 'Es de José María Arguedas.',
      '4': 'Es del Inca Garcilaso de la Vega, del siglo XVII.',
    },
  },
  {
    chapter: 'Literatura',
    stem: '<b>Trilce</b>, de César Vallejo, se caracteriza sobre todo por:',
    options: [
      'Romper la sintaxis y el lenguaje convencionales',
      'Respetar estrictamente el verso clásico y la rima',
      'Tratar exclusivamente temas religiosos',
      'Narrar la vida rural en prosa costumbrista',
      'Continuar la novela indigenista en verso',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ubica la obra en su corriente',
        p: 'Trilce se publicó en 1922, en plena vanguardia. Esa corriente se define por romper con lo heredado.',
        m: '1922 · vanguardia',
      },
      {
        t: 'Recuerda en qué consiste esa ruptura',
        p: 'Vallejo altera la ortografía, inventa palabras y desarma la sintaxis para forzar nuevos sentidos.',
        m: '',
      },
      {
        t: 'Contrástalo con su obra anterior',
        p: 'Los heraldos negros aún era modernista. Trilce es el salto.',
        m: '',
      },
    ],
    concept:
      'La vanguardia se reconoce por lo que rompe. En Vallejo, lo que se rompe es el idioma mismo, no solo el tema.',
    trick:
      'Si la pregunta menciona una obra de los años veinte y habla de forma, la respuesta suele ser ruptura o experimentación.',
    distractors: {
      '1': 'Es justo lo contrario de lo que hace Trilce.',
      '2': 'Lo religioso aparece, pero no es exclusivo ni definitorio.',
      '3': 'Trilce es poesía, no prosa costumbrista.',
      '4': 'El indigenismo narrativo es otra corriente y otro registro.',
    },
  },
  {
    chapter: 'Literatura',
    stem: 'El <b>indigenismo</b> literario peruano se distingue del <b>indianismo</b> romántico anterior porque:',
    options: [
      'Presenta al indígena desde dentro y con denuncia social, en lugar de idealizarlo como figura exótica',
      'Está escrito en verso y no en prosa',
      'Fue escrito íntegramente en quechua',
      'Es posterior al Boom latinoamericano',
      'Evita deliberadamente el conflicto social',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Recuerda qué hacía el indianismo',
        p: 'El romanticismo del siglo XIX puso al indígena en sus obras, pero como figura lejana y decorativa, vista desde fuera.',
        m: 'indianismo → mirada externa,\nidealizada',
      },
      {
        t: 'Contrástalo con el indigenismo',
        p: 'Arguedas, Alegría o Ciro relatan desde dentro de la comunidad y denuncian el despojo y el abuso.',
        m: 'indigenismo → mirada interna,\ncon denuncia',
      },
      {
        t: 'Descarta las diferencias falsas',
        p: 'Ambos usan sobre todo la prosa, ambos están escritos en castellano y los dos son anteriores al Boom.',
        m: 'b, c, d ✗',
      },
    ],
    concept:
      'Dos corrientes pueden tratar el mismo tema con miradas opuestas. Lo que las separa no es el asunto, sino el punto de vista y la intención.',
    trick:
      'Cuando la pregunta compara dos corrientes, busca la diferencia de mirada antes que la de forma o la de fecha.',
    distractors: {
      '1': 'Ambas corrientes se expresaron sobre todo en prosa narrativa.',
      '2': 'Se escribió en castellano, aunque Arguedas incorporara el quechua.',
      '3': 'El indigenismo es de la primera mitad del siglo XX, anterior al Boom.',
      '4': 'La denuncia social es precisamente su rasgo central.',
    },
  },

  // ── Educación cívica ──────────────────────────────────────────────────────
  {
    chapter: 'Educación cívica',
    stem: '¿Cuántos poderes del Estado reconoce la Constitución peruana?',
    options: ['Tres', 'Dos', 'Cuatro', 'Cinco', 'Uno'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Nómbralos',
        p: 'Ejecutivo, Legislativo y Judicial. Cada uno con funciones separadas.',
        m: 'Ejecutivo · Legislativo · Judicial',
      },
      {
        t: 'Recuerda para qué se separan',
        p: 'La división existe para que ninguno concentre todo el poder y se controlen entre sí.',
        m: '',
      },
    ],
    concept:
      'La separación de poderes es el principio básico de la organización del Estado. Los organismos autónomos —JNE, BCR, Defensoría— no son poderes.',
    trick: 'Poderes son tres; organismos constitucionales autónomos, varios más. No los mezcles.',
    distractors: {
      '1': 'Faltaría uno de los tres clásicos.',
      '2': 'Los organismos autónomos existen, pero no son poderes del Estado.',
      '3': 'Ningún esquema constitucional peruano reconoce cinco.',
      '4': 'Concentrar todo en uno es lo contrario de lo que establece la Constitución.',
    },
  },
  {
    chapter: 'Educación cívica',
    stem: 'La función principal del <b>Jurado Nacional de Elecciones</b> (JNE) es:',
    options: [
      'Administrar justicia electoral y proclamar los resultados',
      'Elaborar y mantener el padrón electoral',
      'Emitir el Documento Nacional de Identidad',
      'Organizar y ejecutar los procesos de votación',
      'Fiscalizar el gasto de todas las entidades públicas',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Separa los tres organismos electorales',
        p: 'El sistema electoral peruano se reparte entre tres entidades distintas, y ahí está toda la pregunta.',
        m: 'JNE · ONPE · RENIEC',
      },
      {
        t: 'Asigna la tarea de cada uno',
        p: 'El JNE juzga y proclama; la ONPE organiza la votación; el RENIEC identifica y hace el padrón.',
        m: 'JNE → justicia electoral\nONPE → organiza\nRENIEC → identifica',
      },
    ],
    concept:
      'El sistema electoral peruano separa quién organiza, quién identifica y quién juzga. Esa separación existe para que ningún organismo controle todo el proceso.',
    trick: 'Jurado juzga, Oficina organiza, Registro registra. Las siglas dicen lo que hace cada uno.',
    distractors: {
      '1': 'Es competencia del RENIEC.',
      '2': 'También corresponde al RENIEC.',
      '3': 'Es la función de la ONPE.',
      '4': 'Es tarea de la Contraloría General de la República.',
    },
  },
  {
    chapter: 'Educación cívica',
    stem: '¿Qué derecho protege la garantía constitucional del <b>hábeas corpus</b>?',
    options: [
      'La libertad personal',
      'El acceso a la información pública',
      'El derecho de propiedad',
      'El derecho al trabajo',
      'La libertad de expresión',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Traduce el nombre',
        p: 'Hábeas corpus significa, literalmente, «que tengas el cuerpo»: exige presentar físicamente al detenido.',
        m: '',
      },
      {
        t: 'Distínguelo de las otras garantías',
        p: 'Cada garantía protege un tipo de derecho, y el examen suele ofrecerlas todas juntas.',
        m: 'hábeas corpus → libertad\nhábeas data → información\namparo → los demás derechos',
      },
    ],
    concept:
      'Cada garantía constitucional está diseñada para un derecho concreto. Elegir la vía correcta es parte del derecho mismo.',
    trick: 'Corpus es cuerpo: libertad física. Data es dato: información. Lo demás, amparo.',
    distractors: {
      '1': 'Ese lo protege el hábeas data.',
      '2': 'Se defiende por la acción de amparo.',
      '3': 'También corresponde al amparo.',
      '4': 'Igualmente por amparo, no por hábeas corpus.',
    },
  },
  {
    chapter: 'Educación cívica',
    stem: 'Una vez que el Congreso aprueba una ley, ¿a quién corresponde <b>promulgarla</b>?',
    options: [
      'Al Presidente de la República',
      'Siempre al Presidente del Congreso',
      'Al Tribunal Constitucional',
      'A la Defensoría del Pueblo',
      'Al Poder Judicial',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Distingue aprobar de promulgar',
        p: 'El Congreso aprueba el texto; promulgar es ordenar su cumplimiento y disponer su publicación.',
        m: 'aprobar ≠ promulgar ≠ publicar',
      },
      {
        t: 'Recuerda quién lo hace',
        p: 'La ley se remite al Presidente de la República, que la promulga dentro de un plazo o la observa.',
        m: 'plazo: 15 días',
      },
      {
        t: 'Ten en cuenta la excepción',
        p: 'Si el Presidente no la promulga ni la observa en ese plazo, lo hace el Presidente del Congreso. Por eso la alternativa que dice «siempre» es incorrecta.',
        m: '',
      },
    ],
    concept:
      'El camino de una ley tiene etapas con responsables distintos: iniciativa, debate, aprobación, promulgación y publicación.',
    trick: 'Desconfía de las alternativas con «siempre» o «nunca»: en derecho casi todo tiene excepción.',
    distractors: {
      '1': 'Solo lo hace cuando el Presidente de la República no promulga ni observa dentro del plazo.',
      '2': 'Controla la constitucionalidad de las leyes; no las promulga.',
      '3': 'Defiende los derechos de las personas ante la administración.',
      '4': 'Aplica las leyes en los casos concretos; no participa en su promulgación.',
    },
  },
  {
    chapter: 'Educación cívica',
    stem: 'El Tribunal Constitucional declara <b>inconstitucional</b> un artículo de una ley. ¿Qué ocurre con ese artículo?',
    options: [
      'Deja de tener efecto para todos, desde el día siguiente a la publicación de la sentencia',
      'Solo deja de aplicarse en el caso concreto que originó la demanda',
      'El Congreso puede seguir aplicándolo si lo ratifica',
      'Queda suspendido seis meses mientras el Congreso lo corrige',
      'Debe someterse a referéndum antes de perder vigencia',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Identifica de qué tipo de control se habla',
        p: 'Cuando el Tribunal Constitucional resuelve una demanda de inconstitucionalidad, su decisión vale para todos, no solo para las partes.',
        m: 'control abstracto → efecto general',
      },
      {
        t: 'Distínguelo del control difuso',
        p: 'Un juez común sí puede inaplicar una norma solo en el caso que juzga. Esa es la alternativa trampa.',
        m: 'juez → caso concreto\nTC → todos',
      },
      {
        t: 'Precisa desde cuándo',
        p: 'El efecto empieza al día siguiente de publicarse la sentencia, y en general no es retroactivo.',
        m: '',
      },
    ],
    concept:
      'Hay dos formas de controlar la constitucionalidad: la del Tribunal Constitucional, que expulsa la norma del ordenamiento, y la de cualquier juez, que solo la inaplica al caso que resuelve.',
    trick:
      'Pregúntate a quién alcanza la decisión. Si viene del Tribunal Constitucional en una demanda de inconstitucionalidad, alcanza a todos.',
    distractors: {
      '1': 'Eso es el control difuso, que ejerce cualquier juez, no el Tribunal Constitucional.',
      '2': 'Una sentencia del Tribunal Constitucional no se ratifica ni se revierte por acuerdo del Congreso.',
      '3': 'La norma no queda suspendida: pierde vigencia.',
      '4': 'El referéndum sirve para otras materias; no valida normas declaradas inconstitucionales.',
    },
  },
];
