import type { LessonSeed } from './eng-lessons';

/**
 * Las clases de Razonamiento Matemático.
 *
 * Es el área que más pesa en casi todos los exámenes de admisión del país, y
 * la que peor se enseña: se resuelve mucho y se explica poco. Estas seis clases
 * completan los capítulos que faltaban, y todas siguen el mismo orden que las
 * dos que ya existían —el gancho, la intuición, el dibujo, la regla, un
 * checkpoint y los errores frecuentes—, porque a esta altura el alumno ya sabe
 * cómo se lee una clase aquí y no conviene sorprenderlo.
 *
 * Los ejemplos son deliberadamente pequeños. Un problema de examen tiene datos
 * feos a propósito; una clase no gana nada imitándolos. Primero se entiende con
 * números redondos y después se practica con los del balotario.
 *
 * Se siembran con `npm run db:seed-lessons`. Igual que las de inglés, se
 * reconocen por `slug` y los bloques se reescriben enteros.
 */
export const RM_LESSONS: LessonSeed[] = [
  // ── Planteo de ecuaciones ─────────────────────────────────────────────────
  {
    slug: 'rm-planteo',
    chapter: 'Planteo de ecuaciones',
    title: 'El problema no es despejar, es traducir',
    hook: 'Casi nadie falla estas preguntas resolviendo la ecuación. Fallan escribiéndola —o respondiendo algo distinto de lo que les preguntaron.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Dónde está la dificultad de verdad',
          p: 'Si ya sabes despejar una <em>x</em>, la parte de álgebra de estos problemas te va a tomar veinte segundos. Todo el tiempo —y todos los errores— están antes: en pasar una frase en castellano a una línea de símbolos. Por eso esta clase no practica despejes. Practica traducción.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'El diccionario completo',
          p: 'Es más corto de lo que parece. <strong>«de»</strong> multiplica: el triple <em>de</em> x es 3x. <strong>«es», «son», «resulta», «equivale»</strong> son el signo igual. <strong>«más que», «excede a», «supera en»</strong> suman —y ojo con la dirección: si A excede a B en 5, entonces A = B + 5, no al revés—. <strong>«consecutivos»</strong> se escribe x, x+1, x+2. Y <strong>«la mitad», «el doble», «el triple»</strong> son exactamente lo que dicen.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rm-planteo',
          caption: 'La técnica entera cabe en esta imagen: cortar la frase en pedazos y traducir cada pedazo por separado, sin adelantarse.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Una coma que cambia la respuesta',
          p: 'Compara estas dos frases: <em>«el triple de un número, aumentado en 5»</em> y <em>«el triple de un número aumentado en 5»</em>. La primera es 3x + 5. La segunda es 3(x + 5). No es lo mismo, y en un examen bien hecho las dos versiones aparecen como alternativas. Lee la coma; está puesta a propósito.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'En un salón hay 8 alumnos más que alumnas.\nEn total son 42.\n\n  alumnas  →  x\n  alumnos  →  x + 8\n\n  x + (x + 8) = 42\n  2x = 34\n  x = 17            ← alumnas\n  x + 8 = 25        ← alumnos',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'El error que más puntos cuesta',
          p: 'Termina el despeje y <strong>vuelve a leer la pregunta</strong>. En el ejemplo de arriba, quien busca «x» contesta 17 y quien lee la pregunta contesta lo que le pidieron. Los exámenes de admisión ponen el valor de <em>x</em> entre las alternativas justamente porque saben que mucha gente se detiene ahí. Un problema no termina cuando encuentras la incógnita: termina cuando respondes la pregunta.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'La suma de dos números es 30 y su diferencia es 8. ¿Cuál es el número mayor?',
          opts: ['19', '11', '22', '8'],
          ans: 0,
          ok: 'Exacto. x + y = 30 y x − y = 8; sumando las dos ecuaciones, 2x = 38 y x = 19. El otro número es 11 —que es la alternativa puesta ahí para quien se olvidó de cuál le pedían.',
          no: 'Suma las dos ecuaciones y los términos con «y» se cancelan solos: 2x = 38, así que x = 19. El menor es 11: correcto como número, pero no es lo que preguntaron.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Invertir «excede a»: si A excede a B en 7, es A = B + 7. Escribirlo al revés cambia el signo de toda la solución.',
            'Poner dos letras cuando basta una. Si sabes que hay 8 más, el segundo grupo es x + 8, no y; una sola incógnita se resuelve en una línea.',
            'Responder el valor de x cuando la pregunta pedía el total, la diferencia o el otro número.',
            'Traducir la frase entera de golpe. Córtala en pedazos, traduce cada uno y recién después junta.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Edades ────────────────────────────────────────────────────────────────
  {
    slug: 'rm-edades',
    chapter: 'Edades',
    title: 'Un cuadro de seis casillas y una constante que nadie usa',
    hook: 'Los problemas de edades tienen fama de enredados. Dejan de estarlo en cuanto dibujas el cuadro y te das cuenta de que hay un número que nunca cambia.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Primero el cuadro, siempre',
          p: 'Antes de escribir una sola ecuación, dibuja una tabla: una fila por persona y una columna por cada momento del que hable el problema —pasado, presente, futuro—. Suena a pérdida de tiempo y es exactamente lo contrario: la mitad de los enredos vienen de intentar sostener cuatro edades en la cabeza al mismo tiempo.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'La regla de las columnas',
          p: 'Pon la incógnita en el <strong>presente</strong>, que es la columna que casi siempre te preguntan. Después: «hace 5 años» resta 5 <strong>a toda la columna</strong>, y «dentro de 8» suma 8 <strong>a toda la columna</strong>. A todos, no solo a la persona de la que habla la frase. Parece obvio escrito así; en un examen contrarreloj es el error número uno.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rm-edades',
          caption: 'Ana y Beto envejecen a la vez. Por eso la resta entre sus edades da 10 en las tres columnas: hace cinco años, hoy y dentro de cinco.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Por qué la diferencia es oro',
          p: 'Dos personas siempre se llevan los mismos años. Si hoy te llevas 10 con tu hermano, hace veinte años también eran 10 y dentro de cuarenta seguirán siendo 10. Eso te da una ecuación <strong>gratis</strong>, que no aparece escrita en el enunciado y que suele ser justo la que faltaba. Cuando un problema de edades parece tener menos datos de los necesarios, casi siempre el dato que falta es este.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Hace 5 años Ana tenía el doble que Beto.\nHoy Ana tiene 25. ¿Cuántos tiene Beto?\n\n            hace 5      hoy\n  Ana          20         25\n  Beto          x        x + 5\n\n  20 = 2x   →   x = 10\n  Beto hoy: 10 + 5 = 15\n\n  comprobación: hace 5, 20 = 2 · 10  ✓',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Un atajo para las sumas',
          p: 'Cuando el problema habla de la <em>suma</em> de las edades de un grupo, no hace falta calcular cada una. Cada año que pasa, la suma sube tantas unidades como personas haya: tres hermanos suman 3 más por año, cinco amigos suman 5. Si hoy suman 36 y te preguntan por dentro de 4 años, son 36 + 3·4 = 48, sin despejar nada.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Hoy Carla tiene 32 y su hija 8. ¿Dentro de cuántos años Carla tendrá exactamente el triple que su hija?',
          opts: ['4', '8', '12', '2'],
          ans: 0,
          ok: 'Bien. Dentro de n años: 32 + n = 3(8 + n) → 32 + n = 24 + 3n → 8 = 2n → n = 4. Comprobado: 36 y 12.',
          no: 'Suma la misma n a las dos: 32 + n = 3(8 + n). Al desarrollar queda 32 + n = 24 + 3n, o sea 2n = 8 y n = 4. Dentro de 4 años tendrán 36 y 12.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Envejecer a una sola persona. Si el problema dice «dentro de 6 años», los 6 años los cumplen todos.',
            'Responder la edad del año equivocado: te pidieron la de hoy y entregaste la del pasado que usaste para plantear.',
            'Olvidar que la diferencia de edades es constante, y quedarse trabado por creer que falta un dato.',
            'No comprobar. Reemplazar el resultado en la frase original toma cinco segundos y detecta casi cualquier error de signo.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Operadores matemáticos ────────────────────────────────────────────────
  {
    slug: 'rm-operadores',
    chapter: 'Operadores matemáticos',
    title: 'El único tema del examen que no exige memorizar nada',
    hook: 'Aparece un símbolo raro —un triángulo, un asterisco, una carita— y medio salón se bloquea. Es el capítulo más regalado del área: la regla te la están dando en el enunciado.',
    minutes: 6,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Un operador es una receta, no una operación nueva',
          p: 'Cuando ves <em>a ∗ b = a + 2b</em>, no están inventando una matemática distinta: están abreviando. El símbolo es una etiqueta para «haz esto con los dos números que te den». Tu único trabajo es reemplazar con cuidado. No hay nada que recordar de una pregunta a otra, porque la definición cambia en cada una.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rm-operadores',
          caption: 'Lo que está a la izquierda del símbolo ocupa el lugar de la a; lo de la derecha, el de la b. Todo el capítulo es eso, hecho con cuidado.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'El orden importa (y ahí está la trampa)',
          p: 'Con la suma y la multiplicación de siempre, 3 + 5 y 5 + 3 dan lo mismo, y uno se acostumbra. Los operadores inventados <strong>casi nunca</strong> son así. Con <em>a ∗ b = a + 2b</em>: 3 ∗ 5 = 3 + 10 = 13, pero 5 ∗ 3 = 5 + 6 = 11. Los exámenes ponen los dos resultados entre las alternativas. Copia el orden tal como aparece, sin acomodarlo.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Si  a ∗ b = a + 2b,  calcula  (2 ∗ 3) ∗ 4\n\n  de adentro hacia afuera, como los paréntesis de siempre:\n\n  2 ∗ 3 = 2 + 2(3) = 8\n  8 ∗ 4 = 8 + 2(4) = 16',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Cuando la definición viene por casos',
          p: 'A veces te dan algo así: <em>a # b = a − b si a &gt; b, y a # b = b − a en otro caso</em>. Aquí el paso que todos se saltan es <strong>revisar la condición antes de calcular</strong>. Mira cuál de los dos números es mayor, elige la línea que corresponde y recién entonces reemplaza. Aplicar la primera fórmula por inercia es el error clásico de este subtipo.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Si a # b = 3a − b, ¿cuánto vale 4 # (2 # 5)?',
          opts: ['11', '7', '17', '1'],
          ans: 0,
          ok: 'Correcto. Primero lo de adentro: 2 # 5 = 6 − 5 = 1. Después 4 # 1 = 12 − 1 = 11.',
          no: 'Empieza por el paréntesis: 2 # 5 = 3(2) − 5 = 1. Ese 1 pasa a ser la b de la operación de afuera: 4 # 1 = 3(4) − 1 = 11.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Suponer que el operador es conmutativo. Salvo que la definición lo sea, a ∗ b y b ∗ a dan distinto.',
            'Resolver de afuera hacia adentro. Los paréntesis mandan igual que siempre.',
            'Reemplazar sin paréntesis: si a ∗ b = a + 2b y b vale −3, hay que escribir 2(−3), no 2 − 3.',
            'Bloquearse por el símbolo. Que sea un triángulo o una estrella no cambia nada; lee la definición y reemplaza.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Conteo de figuras ─────────────────────────────────────────────────────
  {
    slug: 'rm-conteo',
    chapter: 'Conteo de figuras',
    title: 'Contar a ojo falla; contar por tamaños, no',
    hook: 'Todo el mundo cuenta bien las figuras pequeñas y se olvida de las grandes. La solución no es mirar con más atención: es cambiar el orden en que cuentas.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Por qué falla mirar la figura',
          p: 'Si cuentas saltando de una figura a otra según te van llamando la atención, es imposible saber si repetiste alguna o si te quedó alguna fuera. No es un problema de vista: es un problema de método. Con un orden fijo, el conteo se vuelve mecánico y verificable.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'El orden que sí funciona',
          p: 'Cuenta <strong>por tamaños</strong>, de menor a mayor. Primero todas las figuras de una unidad, después las de dos, después las de tres, y así hasta la figura completa —que es la que casi todos olvidan—. Anota el subtotal de cada tamaño en el margen. Al final sumas, y si algo no cuadra sabes exactamente en qué tamaño revisar.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rm-conteo',
          caption: 'Una cuadrícula de 3 × 3 tiene 14 cuadrados, no 9. Los cinco que faltan solo aparecen si cuentas por tamaños.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Cuando contar se vuelve largo, combina',
          p: 'Hay dos fórmulas que ahorran muchísimo tiempo y salen del mismo razonamiento: <strong>elegir dos extremos</strong>. En una recta partida en n pedacitos, el número de segmentos distintos es 1 + 2 + … + n = n(n+1)/2. Y en una cuadrícula de m × n, un rectángulo queda definido al elegir 2 de las m+1 líneas verticales y 2 de las n+1 horizontales. No son fórmulas para memorizar de milagro: son la misma idea de «elegir dos» aplicada dos veces.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Cuadrados en una cuadrícula 3 × 3\n\n  de 1×1 ........ 3 · 3 = 9\n  de 2×2 ........ 2 · 2 = 4\n  de 3×3 ........ 1 · 1 = 1\n                        ────\n                          14\n\nRectángulos en la misma cuadrícula\n\n  C(4,2) · C(4,2) = 6 · 6 = 36',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuántos triángulos hay en total en un triángulo grande dividido por dos rectas paralelas a su base, formando tres franjas?',
          opts: ['6', '3', '4', '9'],
          ans: 0,
          ok: 'Bien contado. Por tamaños: 3 de una franja, 2 de dos franjas y 1 de tres franjas. 3 + 2 + 1 = 6.',
          no: 'Cuenta por tamaños, no por lo que ves de golpe: 3 triángulos de una sola franja, 2 formados por dos franjas y 1 que es el triángulo entero. Total 6.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Olvidar la figura completa. Suele valer un punto y es la más fácil de todas.',
            'Contar la misma figura dos veces por saltar de un tamaño a otro sin terminar.',
            'Confundir cuadrados con rectángulos: todo cuadrado es un rectángulo, así que en la cuadrícula 3 × 3 los 14 cuadrados están dentro de los 36 rectángulos.',
            'Aplicar la fórmula de combinaciones a figuras irregulares. Si la cuadrícula no es completa, hay que contar por tamaños a mano.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Certezas y probabilidad ───────────────────────────────────────────────
  {
    slug: 'rm-certezas',
    chapter: 'Certezas y probabilidad',
    title: 'Dos preguntas que parecen la misma y no lo son',
    hook: '«¿Qué tan probable es sacar una verde?» y «¿cuántas hay que sacar para asegurar una verde?» se resuelven de maneras opuestas. Confundirlas es el error que define este capítulo.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La probabilidad mide, la certeza garantiza',
          p: 'Una pregunta de probabilidad se responde con una fracción entre 0 y 1: cuántos casos me sirven sobre cuántos hay. Una pregunta de certeza se responde con un número entero de intentos, y para calcularla te tienes que poner en el <strong>peor escenario posible</strong>: imaginar que la mala suerte se ensaña contigo y te van saliendo primero todas las que no quieres.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rm-certezas',
          caption: 'A la izquierda se cuenta y se divide. A la derecha se supone lo peor y se suma uno. Son dos formas de pensar distintas, no dos pasos del mismo método.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Una bolsa con 5 rojas, 4 azules y 3 verdes (12 en total)\n\n  P(verde) = 3 / 12 = 1/4\n\n  ¿Cuántas sacar para ASEGURAR una verde?\n  peor caso: salen las 5 rojas y las 4 azules primero\n  5 + 4 + 1 = 10',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La receta de la certeza',
          p: 'Suma <strong>todo lo que no quieres</strong> y súmale uno. Ese «uno» es la clave: después de agotar lo indeseado, la siguiente extracción no tiene de dónde más salir. Y cuando la pregunta pide «dos del mismo color», la cuenta es distinta: con 3 colores puedes tener mala suerte tres veces —una de cada color—, pero la cuarta pieza repite a la fuerza. Ese razonamiento tiene nombre propio, principio del palomar, y en el examen aparece disfrazado de medias en un cajón.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Dos avisos sobre la probabilidad',
          p: 'Primero: el resultado <strong>nunca</strong> puede pasar de 1. Si te sale 7/5, hay un error de conteo en algún lado y conviene detenerse ahí mismo. Segundo: sumar probabilidades solo es válido cuando los casos no se pisan. La probabilidad de sacar «una roja o una figura» no es P(roja) + P(figura), porque las figuras rojas se estarían contando dos veces.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'En un cajón hay 6 medias negras y 8 blancas, sueltas y a oscuras. ¿Cuántas hay que sacar para asegurar un par del mismo color?',
          opts: ['3', '7', '9', '2'],
          ans: 0,
          ok: 'Exacto. Con dos medias puedes tener una de cada color; la tercera repite obligatoriamente uno de los dos colores. La cantidad de medias de cada tipo no interviene.',
          no: 'No hace falta agotar ningún color. Solo hay dos colores: con dos medias lo peor que puede pasar es una negra y una blanca, así que la tercera forma par sí o sí. Son 3.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Responder una fracción cuando preguntaron «cuántas hay que sacar para asegurar», o al revés.',
            'En certezas, olvidar el «+1» y quedarse con la suma de lo que no sirve.',
            'Dar una probabilidad mayor que 1 o negativa: siempre es señal de un error de conteo.',
            'Sumar probabilidades de casos que se superponen, sin restar la parte compartida.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Cronometría ───────────────────────────────────────────────────────────
  {
    slug: 'rm-cronometria',
    chapter: 'Cronometría',
    title: 'La manecilla que se movió cuando nadie la miraba',
    hook: 'Dos números —30 y 6— resuelven casi todos los ángulos de reloj. Y un detalle que la mayoría ignora hace que su respuesta salga mal por poquito, que es la peor forma de salir mal.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'De dónde salen los dos números',
          p: 'La esfera completa son 360°. El minutero da la vuelta entera en 60 minutos, así que avanza <strong>6° por minuto</strong>. La manecilla horaria da la vuelta en 12 horas, así que avanza <strong>30° por hora</strong>. Nada de esto hay que memorizarlo: sale de dividir 360 entre 60 y entre 12, y en el examen se reconstruye en cinco segundos.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'El detalle que arruina la respuesta',
          p: 'La manecilla horaria <strong>no salta de número en número</strong>. Se mueve todo el tiempo, despacito: 30° por hora son <strong>medio grado por minuto</strong>. A las 4:20 no está sobre el 4, está diez grados más allá. Quien la deja quieta obtiene 0° donde la respuesta es 10°, y como el número es pequeño no le suena raro. Ese medio grado por minuto es todo lo que separa este capítulo de ser trivial.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-rm-cronometria',
          caption: 'A las 4:20 el minutero marca 120° y la horaria 130°, porque ya avanzó veinte medios grados desde el 4. La diferencia es 10°.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Ángulo entre las manecillas a las H:M\n\n  ángulo = | 30·H − 5,5·M |\n\n  si el resultado pasa de 180°, resta:  360 − resultado\n\nA las 4:20\n  | 30(4) − 5,5(20) | = | 120 − 110 | = 10°',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'El otro tipo de pregunta: campanadas',
          p: 'Un reloj que da 6 campanadas no ocupa seis intervalos de tiempo, sino <strong>cinco</strong>: el tiempo transcurre <em>entre</em> campanada y campanada, no dentro de ellas. Es el mismo razonamiento de los postes de una vereda o los cortes de un tronco: para n elementos hay n − 1 espacios. Dividir entre el número de campanadas en lugar de entre los intervalos es el error universal de este subtipo.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Un reloj demora 10 segundos en dar 6 campanadas. ¿Cuánto demorará en dar 11?',
          opts: ['20 s', '18 s', '22 s', '11 s'],
          ans: 0,
          ok: 'Bien. Seis campanadas son 5 intervalos, o sea 2 s cada uno. Once campanadas son 10 intervalos: 20 segundos.',
          no: 'Cuenta los espacios, no las campanadas: 6 campanadas dejan 5 intervalos, así que cada uno dura 10/5 = 2 s. Con 11 campanadas hay 10 intervalos, es decir 20 s.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Dejar la horaria clavada en el número de la hora. Avanza 0,5° por cada minuto que pasa.',
            'Entregar un ángulo mayor de 180°. Si sale 250°, la respuesta que buscan es 360 − 250 = 110°.',
            'En campanadas, dividir entre la cantidad de campanadas en vez de entre los intervalos.',
            'Mezclar unidades: pasar los minutos a horas a mitad de camino y arrastrar el error hasta el final.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },
];
