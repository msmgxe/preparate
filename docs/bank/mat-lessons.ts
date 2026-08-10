import type { LessonSeed } from './eng-lessons';

/**
 * Las clases de Matemática.
 *
 * A diferencia de Razonamiento Matemático, aquí el examen sí pide contenido:
 * fórmulas, propiedades, teoremas. Aun así la clase no es un formulario. Cada
 * una elige la idea que hace innecesario memorizar el resto —el área que
 * explica el producto notable, el punto de corte que explica el sistema— y
 * deja la fórmula para el final, cuando ya se entiende de dónde sale.
 *
 * Se siembran con `npm run db:seed-lessons`, reconocidas por su `slug`.
 */
export const MAT_LESSONS: LessonSeed[] = [
  // ── Aritmética comercial ──────────────────────────────────────────────────
  {
    slug: 'mat-comercial',
    chapter: 'Aritmética comercial',
    title: 'Cuatro palabras que hay que aprender a separar',
    hook: 'Costo, precio de lista, precio de venta y ganancia. Casi todos los errores de este capítulo son aplicar el porcentaje correcto sobre la base equivocada.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Las cuatro palabras',
          p: 'El <strong>costo</strong> es lo que le costó al vendedor. El <strong>precio de lista</strong> es lo que dice la etiqueta. El <strong>precio de venta</strong> es lo que pagó el cliente de verdad. Y la <strong>ganancia</strong> es la diferencia entre lo que cobró y lo que le costó. Cuatro cosas distintas que en el enunciado aparecen mezcladas a propósito.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-mat-comercial',
          caption: 'La barra de arriba y la de abajo son el mismo dinero partido de dos maneras. Fíjate en dónde empieza cada porcentaje.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La regla que resuelve el capítulo entero',
          p: 'Un porcentaje siempre necesita saber <strong>sobre qué</strong> se calcula, y en este tema las bases son dos distintas: <strong>el descuento se aplica sobre el precio de lista</strong> y <strong>la ganancia se calcula sobre el costo</strong>. Si te dicen «gana el 25 %», es el 25 % de lo que le costó, no de lo que cobra. Confundir las dos bases da un número parecido al correcto —por eso está entre las alternativas— pero mal.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'Pv = C + G          venta = costo + ganancia\nPv = PL − D         venta = lista − descuento\n\nCuesta 80 y quiere ganar 25 %\n  G = 25 % de 80 = 20\n  Pv = 80 + 20 = 100\n\nY además quiere poder rebajar un 20 %\n  100 = PL − 20 % de PL = 0,8 · PL\n  PL = 125     ← se marca 125 para vender a 100',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Dos descuentos no son uno grande',
          p: 'Un 20 % y luego un 10 % no hacen un 30 %. El segundo descuento se aplica sobre lo que quedó, no sobre el precio original: 100 → 80 → 72, o sea un 28 % en total. Es el mismo mecanismo que ya viste en Fracciones y porcentajes, y aquí vuelve disfrazado de oferta de tienda.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Un artículo le cuesta S/ 200 al comerciante y lo vende ganando 30 %. Después, por liquidación, lo rebaja 10 % sobre ese precio de venta. ¿Cuánto paga el cliente?',
          opts: ['S/ 234', 'S/ 240', 'S/ 260', 'S/ 236'],
          ans: 0,
          ok: 'Correcto. La ganancia va sobre el costo: 200 · 1,3 = 260. Y el descuento va sobre ese precio: 260 · 0,9 = 234.',
          no: 'Dos pasos, cada uno sobre su base. Primero la ganancia sobre el costo: 200 + 30 % de 200 = 260. Después el descuento sobre el precio de venta: 260 − 10 % de 260 = 234.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Calcular la ganancia sobre el precio de venta en vez de sobre el costo.',
            'Aplicar el descuento sobre el costo, que es la única cifra que el cliente nunca ve.',
            'Sumar descuentos sucesivos: 20 % y 10 % dan 28 %, no 30 %.',
            'Confundir «ganancia del 30 %» con «margen del 30 %». En el examen peruano casi siempre es sobre el costo; si el enunciado dice «sobre la venta», lee dos veces.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Álgebra básica ────────────────────────────────────────────────────────
  {
    slug: 'mat-algebra',
    chapter: 'Álgebra básica',
    title: 'Los productos notables son áreas, no fórmulas',
    hook: 'Si tienes que memorizar (a+b)², es que nadie te enseñó de dónde sale. Sale de un cuadrado partido en cuatro pedazos, y ese dibujo también te dice por qué el término del medio se olvida tanto.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Un cuadrado partido en cuatro',
          p: 'Dibuja un cuadrado de lado a + b. Córtalo con una línea horizontal y otra vertical a la altura de <em>a</em>. Te quedan cuatro pedazos: un cuadrado grande de área a², dos rectángulos iguales de área ab cada uno, y un cuadrado pequeño de área b². Sumarlos <strong>es</strong> la fórmula.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-mat-algebra',
          caption: 'Los dos rectángulos naranjas son el 2ab. Quien escribe a² + b² se está dejando fuera media figura, y de golpe se ve cuánta.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: '(a + b)² = a² + 2ab + b²\n(a − b)² = a² − 2ab + b²      solo cambia un signo\n\na² − b² = (a + b)(a − b)      diferencia de cuadrados',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'La diferencia de cuadrados es una calculadora',
          p: 'La tercera fórmula no es solo para factorizar: sirve para hacer cuentas de cabeza que parecen imposibles. <strong>43 × 37</strong> son (40 + 3)(40 − 3) = 1600 − 9 = <strong>1591</strong>. Y <strong>51² − 49²</strong> no hace falta calcularlo: es (51 + 49)(51 − 49) = 100 × 2 = 200. En un examen con reloj eso son treinta segundos ganados por pregunta.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Factorizar es leer al revés',
          p: 'Las mismas tres líneas, leídas de derecha a izquierda, son todo lo que se pide en factorización básica. Si ves <em>x² + 6x + 9</em>, pregúntate qué cuadrado tiene ese aspecto: a = x, y 2ab = 6x obliga a b = 3, que además cuadra con b² = 9. Entonces es (x + 3)². No hay tanteo: el término del medio te da la respuesta.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuánto vale 51² − 49² sin usar calculadora?',
          opts: ['200', '100', '400', '2'],
          ans: 0,
          ok: 'Exacto. Es una diferencia de cuadrados: (51 + 49)(51 − 49) = 100 × 2 = 200.',
          no: 'No calcules los cuadrados. Es a² − b² con a = 51 y b = 49, así que vale (51 + 49)(51 − 49) = 100 × 2 = 200.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Escribir (a + b)² = a² + b². Es el error más frecuente de toda la secundaria; el dibujo existe para que no vuelva.',
            'Perder el signo en (a − b)²: el término del medio es negativo, pero el b² sigue siendo positivo.',
            'Buscar a² + b² como factorizable. La suma de cuadrados no se factoriza con números reales; solo la resta.',
            'Al factorizar, elegir los números por tanteo cuando el término del medio ya te dice cuáles son.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Sistemas de ecuaciones ────────────────────────────────────────────────
  {
    slug: 'mat-sistemas',
    chapter: 'Sistemas de ecuaciones',
    title: 'Dos rectas y un punto',
    hook: 'Resolver un sistema de dos ecuaciones es contestar una pregunta geométrica: ¿dónde se cruzan estas dos rectas? Verlo así explica de una vez por qué a veces no hay solución y por qué a veces hay infinitas.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Qué estás buscando en realidad',
          p: 'Cada ecuación con dos incógnitas describe una recta: todos los pares (x, y) que la cumplen. Resolver el sistema es buscar el par que cumple <strong>las dos a la vez</strong>, es decir, el punto donde las dos rectas se tocan. Todo lo demás —sustitución, reducción— son maneras de encontrar ese punto con lápiz en vez de con regla.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-mat-sistemas',
          caption: 'Si se cruzan, hay una solución. Si son paralelas, no hay ninguna. Y si resultan ser la misma recta dibujada dos veces, hay infinitas.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Elige el método por pereza, no por costumbre',
          p: 'Hay dos caminos y el bueno es siempre el que da menos cuentas. Usa <strong>reducción</strong> cuando los coeficientes de una incógnita ya son iguales u opuestos: sumas o restas las ecuaciones y esa incógnita desaparece sola. Usa <strong>sustitución</strong> cuando una de las incógnitas ya está despejada o le cuesta un paso estarlo. Empeñarse en un solo método por costumbre es lo que convierte un ejercicio de dos líneas en uno de ocho.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: '2x + y = 11\n x − y =  1\n──────────────   los «y» son opuestos: se suman\n3x     = 12\n x     =  4\n\ny se halla reemplazando en la más simple:\n  4 − y = 1   →   y = 3\n\ncomprobación en la OTRA:  2(4) + 3 = 11  ✓',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Comprueba en la ecuación que no usaste',
          p: 'Cuando halles la segunda incógnita reemplazando, hazlo en una ecuación y <strong>comprueba en la otra</strong>. Si compruebas en la misma que usaste para despejar, siempre te va a dar bien —aunque la primera incógnita estuviera mal—, así que esa comprobación no comprueba nada. Es un detalle de diez segundos que caza casi cualquier error aritmético.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Si x + y = 10 y x − y = 4, ¿cuánto vale el producto x · y?',
          opts: ['21', '24', '10', '40'],
          ans: 0,
          ok: 'Bien. Sumando las dos: 2x = 14, x = 7; entonces y = 3 y el producto es 21.',
          no: 'Suma las dos ecuaciones para que desaparezca la y: 2x = 14, así que x = 7 e y = 3. Te piden el producto, no las incógnitas: 7 × 3 = 21.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Sumar las ecuaciones sin que ninguna incógnita se cancele. Antes hay que multiplicar una de ellas para igualar coeficientes.',
            'Hallar x y entregar la respuesta sin calcular y, cuando la pregunta pedía la suma, el producto o la diferencia.',
            'Restar mal los signos: al restar dos ecuaciones, el signo cambia en TODOS los términos de la segunda.',
            'Comprobar en la misma ecuación que se usó para despejar, que siempre sale bien y no detecta nada.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Proporcionalidad ──────────────────────────────────────────────────────
  {
    slug: 'mat-proporcion',
    chapter: 'Proporcionalidad',
    title: 'Antes de la regla de tres, decide el sentido',
    hook: 'La regla de tres es mecánica; lo difícil es saber si va derecha o al revés. Hay una pregunta de tres segundos que lo decide siempre.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'La pregunta que decide',
          p: 'Antes de escribir nada, pregúntate: <strong>si duplico esta magnitud, ¿la otra se duplica o se parte por la mitad?</strong> Si se duplica, es proporción <strong>directa</strong>. Si se parte por la mitad, es <strong>inversa</strong>. Más obreros, menos días: inversa. Más kilos, más precio: directa. Es todo el criterio, y sirve para cualquier enunciado que te pongan.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-mat-proporcion',
          caption: 'Cada tipo tiene su constante. En la directa lo que no cambia es el cociente; en la inversa, el producto.',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Por qué el producto es constante en la inversa',
          p: 'Piénsalo con la obra: si 6 obreros tardan 10 días, el trabajo total son 60 «obrero-días», y esa cantidad es la que no cambia por más gente que pongas. Con 8 obreros, 8 × d = 60 y d = 7,5. No hace falta acordarse de qué se multiplica y qué se divide: si sabes que el <strong>producto</strong> es lo constante, la operación sale sola.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'DIRECTA        a / b = c / d        (se cruza y se multiplica)\nINVERSA        a · b = c · d        (se multiplica en línea)\n\n6 obreros → 10 días.  ¿8 obreros?\n  6 · 10 = 8 · d\n  d = 60 / 8 = 7,5 días',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Cuando hay tres magnitudes',
          p: 'En la regla de tres compuesta —obreros, días y horas diarias, por ejemplo— el error es tratarlas todas igual. Ve <strong>de una en una</strong>: fija todo lo demás y decide el sentido de esa sola magnitud respecto de la que te preguntan. Después multiplica los factores: los directos como fracción normal y los inversos dados la vuelta. Separadas, cada decisión es la misma pregunta fácil del principio.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Si 4 caños llenan un tanque en 6 horas, ¿cuánto tardan 3 caños en llenar el mismo tanque?',
          opts: ['8 horas', '4,5 horas', '12 horas', '6 horas'],
          ans: 0,
          ok: 'Correcto. Menos caños, más tiempo: es inversa. 4 × 6 = 3 × t, así que t = 8 horas.',
          no: 'Menos caños tienen que tardar más, así que es proporción inversa: lo constante es el producto. 4 × 6 = 24, y 24 ÷ 3 = 8 horas.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Aplicar la directa por inercia en un problema de obreros, máquinas o caños, que casi siempre son inversos.',
            'No comprobar el sentido del resultado: si pusiste más gente y te salieron más días, hay algo al revés.',
            'Mezclar unidades —horas con minutos, docenas con unidades— antes de plantear.',
            'En la compuesta, decidir el sentido de todas las magnitudes de una vez en lugar de una por una.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Geometría plana ───────────────────────────────────────────────────────
  {
    slug: 'mat-geometria',
    chapter: 'Geometría plana',
    title: 'La altura no es un lado',
    hook: 'La fórmula del área del triángulo la sabe todo el mundo. Lo que casi nadie tiene claro es cuál de las rayas del dibujo es la altura, y ahí es donde se pierden los puntos.',
    minutes: 7,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Qué es exactamente una altura',
          p: 'La altura respecto de una base es la distancia <strong>perpendicular</strong> desde el vértice opuesto hasta esa base. Perpendicular, no «el lado que se ve más vertical». En un triángulo rectángulo los dos catetos hacen de base y altura el uno del otro, y por eso ahí nadie se equivoca; en cualquier otro triángulo el lado inclinado es más largo que la altura, y usarlo infla el área.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-mat-geometria',
          caption: 'En un triángulo obtusángulo la altura cae fuera de la base, sobre su prolongación. Sigue siendo la altura y la fórmula sigue funcionando.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'rectángulo    b · h\ntriángulo     b · h / 2\ncírculo       π r²          y perímetro 2 π r\ntrapecio      (B + b) · h / 2\nrombo         D · d / 2      (las diagonales)\n\nPitágoras     a² + b² = c²   SOLO en el rectángulo,\n                             y c es la hipotenusa',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'El truco de descomponer',
          p: 'La mayoría de las figuras «raras» de examen no piden una fórmula nueva: piden <strong>partirlas</strong> en las que ya conoces, o restar. Una figura con un semicírculo mordido es un rectángulo menos medio círculo. Un pentágono irregular es un rectángulo más un triángulo. Antes de buscar una fórmula que no recuerdas, prueba a trazar dos líneas y sumar áreas conocidas: casi siempre es más rápido y no hay nada que memorizar.',
        },
      },
      {
        kind: 'text',
        payload: {
          h: 'Y cuidado con las unidades',
          p: 'Las longitudes van en centímetros y las áreas en centímetros <em>cuadrados</em>. Si el enunciado te da unos datos en metros y otros en centímetros, conviértelos <strong>antes</strong> de operar, no al final: al elevar al cuadrado, un factor de 100 se convierte en 10 000 y el error deja de ser pequeño.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: 'Un rombo tiene diagonales de 8 cm y 6 cm. ¿Cuál es su área?',
          opts: ['24 cm²', '48 cm²', '14 cm²', '12 cm²'],
          ans: 0,
          ok: 'Correcto: D · d / 2 = 8 × 6 / 2 = 24 cm². También sale viéndolo como cuatro triangulitos rectángulos iguales.',
          no: 'En el rombo el área es el producto de las diagonales dividido entre dos: 8 × 6 / 2 = 24 cm². Multiplicar sin dividir da 48, que es el rectángulo que lo contiene.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Tomar un lado inclinado como altura. Solo vale la perpendicular, aunque haya que prolongar la base para dibujarla.',
            'Aplicar Pitágoras a un triángulo que no es rectángulo.',
            'Olvidar el «entre 2» del triángulo, del trapecio o del rombo.',
            'Mezclar metros y centímetros, o dar el área en unidades lineales.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },

  // ── Estadística descriptiva ───────────────────────────────────────────────
  {
    slug: 'mat-estadistica',
    chapter: 'Estadística descriptiva',
    title: 'Un solo dato extremo mueve la media y no toca la mediana',
    hook: 'Cuando alguien dice «el sueldo promedio de la empresa es 5000», puede ser verdad y engañarte al mismo tiempo. Esta clase es sobre por qué, y sobre cuándo cada medida sirve.',
    minutes: 6,
    blocks: [
      {
        kind: 'text',
        payload: {
          h: 'Tres medidas que responden a tres preguntas',
          p: 'La <strong>media</strong> reparte el total en partes iguales: cuánto tocaría a cada uno. La <strong>mediana</strong> parte al grupo en dos mitades: cuánto gana el que está justo en el medio. La <strong>moda</strong> es el valor que más se repite. No compiten entre sí; contestan cosas distintas, y el examen suele preguntar cuál conviene en una situación concreta.',
        },
      },
      {
        kind: 'viz',
        payload: {
          viz_id: 'v-mat-estadistica',
          caption: 'Cinco sueldos: cuatro parecidos y uno enorme. La mediana se queda con el grupo; la media se va hacia el extremo y deja de describir a nadie.',
        },
      },
      {
        kind: 'math',
        payload: {
          m: 'sueldos:  1000  1100  1200  1300  20000\n\n  media   = 24600 / 5 = 4920\n  mediana = 1200         ← el del medio, ya ordenados\n\ncuatro de los cinco ganan menos que la media',
        },
      },
      {
        kind: 'callout',
        payload: {
          t: 'Ordenar no es un paso opcional',
          p: 'La mediana es «el del medio» <strong>de la lista ordenada</strong>. Si los datos vienen desordenados —y en el examen vienen desordenados a propósito— y tomas el que está físicamente en el centro del enunciado, la respuesta es otra. Y con una cantidad par de datos no hay uno en el medio, sino dos: la mediana es el promedio de esos dos.',
        },
      },
      {
        kind: 'check',
        payload: {
          q: '¿Cuál es la mediana de 7, 3, 9 y 5?',
          opts: ['6', '5', '7', '8'],
          ans: 0,
          ok: 'Correcto. Ordenados son 3, 5, 7, 9; al ser cuatro datos, la mediana es el promedio de los dos centrales: (5 + 7) / 2 = 6.',
          no: 'Primero ordénalos: 3, 5, 7, 9. Como son cuatro —cantidad par— no hay uno en el medio: se promedian los dos centrales, (5 + 7) / 2 = 6. Fíjate en que 6 no es ninguno de los datos, y está bien que no lo sea.',
        },
      },
      {
        kind: 'err',
        payload: {
          items: [
            'Calcular la mediana sin ordenar los datos.',
            'Con una cantidad par de datos, elegir uno de los dos centrales en lugar de promediarlos.',
            'Confundir la moda con el valor más grande: la moda es el que más se repite, aunque sea el más pequeño.',
            'Dar la media cuando el enunciado pide la medida que mejor representa al grupo y hay un dato extremo. Ahí la respuesta es la mediana.',
          ],
        },
      },
      { kind: 'video', payload: {} },
    ],
  },
];
