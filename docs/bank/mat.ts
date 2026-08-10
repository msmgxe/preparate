import type { BankQuestion } from './types';

/** Matemática · la base que sostiene todo lo demás. */
export const MAT: BankQuestion[] = [
  // ── Aritmética comercial ──────────────────────────────────────────────────
  {
    chapter: 'Aritmética comercial',
    stem: 'Una casaca cuesta <b>S/ 480</b> y está rebajada un <b>15 %</b>. ¿Cuánto se paga en caja?',
    options: ['S/ 408', 'S/ 465', 'S/ 432', 'S/ 72', 'S/ 400'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Calcula cuánto es el descuento',
        p: 'El porcentaje siempre se toma sobre el precio de lista, no sobre otra cosa.',
        m: '15 % de 480 = 480 × 0,15 = 72',
      },
      {
        t: 'Réstalo del precio de lista',
        p: 'Lo que se paga es lo que queda después de quitar el descuento.',
        m: '480 − 72 = 408',
      },
      {
        t: 'Comprueba con el atajo',
        p: 'Si se descuenta el 15 %, queda el 85 %. Un solo paso en vez de dos.',
        m: '480 × 0,85 = 408  ✓',
      },
    ],
    concept:
      'Un descuento del i % deja el (100 − i) %. Pensar en lo que queda evita la resta y sirve para encadenar descuentos.',
    trick: 'Multiplica por el complemento: 15 % de descuento es × 0,85. Un paso, sin restar.',
    distractors: {
      '1': 'Restaste 15 en vez del 15 %. El porcentaje no es una cantidad de soles.',
      '2': 'Descontaste el 10 %, no el 15 %.',
      '3': 'Eso es el descuento, no el precio a pagar.',
      '4': 'Redondeaste antes de terminar.',
    },
  },
  {
    chapter: 'Aritmética comercial',
    stem: 'Un comerciante compra un ventilador en <b>S/ 250</b> y quiere que su ganancia sea el <b>20 % del precio de venta</b>. ¿A cuánto debe venderlo?',
    options: ['S/ 300', 'S/ 312,50', 'S/ 320', 'S/ 310', 'S/ 270'],
    answer: 1,
    difficulty: 2,
    steps: [
      {
        t: 'Ponle nombre al precio de venta',
        p: 'Es lo que no conoces, y todo el enunciado habla de él.',
        m: 'PV = precio de venta\nCosto = 250',
      },
      {
        t: 'Traduce la condición',
        p: 'La ganancia es lo que sobra del precio de venta después de pagar el costo, y el enunciado dice que eso vale el 20 % del precio de venta.',
        m: 'PV − 250 = 0,20 · PV',
      },
      {
        t: 'Despeja',
        p: 'Junta los términos con PV a un lado.',
        m: '0,80 · PV = 250\nPV = 250 ÷ 0,80 = 312,50',
      },
      {
        t: 'Comprueba contra el enunciado',
        p: 'La ganancia tiene que ser el 20 % del precio de venta, no del costo.',
        m: '312,50 − 250 = 62,50\n62,50 ÷ 312,50 = 0,20  ✓',
      },
    ],
    concept:
      'Un margen sobre el costo y un margen sobre la venta no son lo mismo. Antes de calcular, identifica sobre cuál de los dos se aplica el porcentaje.',
    trick: 'Si el margen es sobre la venta, divide el costo entre (1 − margen): 250 ÷ 0,80.',
    distractors: {
      '0': 'Aplicaste el 20 % sobre el costo (250 × 1,20). El enunciado lo aplica sobre la venta.',
      '2': 'Redondeaste hacia arriba sin resolver la ecuación.',
      '3': 'Tanteaste sin comprobar: 310 − 250 = 60, que no es el 20 % de 310.',
      '4': 'Sumaste 20 soles en lugar del 20 %.',
    },
  },
  {
    chapter: 'Aritmética comercial',
    stem: 'Después de un descuento del <b>25 %</b>, una laptop cuesta <b>S/ 2 400</b>. ¿Cuál era el precio de lista?',
    options: ['S/ 3 000', 'S/ 3 200', 'S/ 3 100', 'S/ 2 700', 'S/ 3 600'],
    answer: 1,
    difficulty: 2,
    steps: [
      {
        t: 'Escribe la relación en el sentido correcto',
        p: 'El descuento se aplicó al precio de lista para llegar al precio final, no al revés.',
        m: '2 400 = PL × 0,75',
      },
      {
        t: 'Despeja dividiendo',
        p: 'Para deshacer una multiplicación se divide. Sumar el mismo porcentaje no devuelve al punto de partida.',
        m: 'PL = 2 400 ÷ 0,75 = 3 200',
      },
      {
        t: 'Comprueba',
        p: 'Aplica el descuento al resultado y mira si vuelves al precio final.',
        m: '25 % de 3 200 = 800\n3 200 − 800 = 2 400  ✓',
      },
    ],
    concept:
      'Deshacer un porcentaje es dividir entre el factor, no sumar el mismo porcentaje. Es el mismo mecanismo que quitar el IGV de un precio.',
    trick: 'Precio final ÷ 0,75. Con descuentos del 20 % sería ÷ 0,80, y así siempre.',
    distractors: {
      '0': 'Le sumaste el 25 % al precio rebajado. Ese 25 % se calculó sobre un número mayor.',
      '2': 'Tanteaste: el 25 % de 3 100 es 775, y 3 100 − 775 no da 2 400.',
      '3': 'Sumaste 300 sin ninguna razón.',
      '4': 'Dividiste entre 0,666… en lugar de 0,75.',
    },
  },
  {
    chapter: 'Aritmética comercial',
    stem: 'Un comerciante marca sus productos un <b>40 % por encima del costo</b> y luego anuncia <b>20 % de descuento</b> sobre el precio marcado. ¿Qué porcentaje gana realmente sobre el costo?',
    options: ['12 %', '20 %', '32 %', '8 %', '28 %'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Trabaja con un costo de 100',
        p: 'Cuando todo son porcentajes, poner 100 convierte el problema en aritmética simple. El resultado en porcentaje no depende del número que elijas.',
        m: 'Costo = 100',
      },
      {
        t: 'Marca el precio',
        p: 'Un 40 % por encima del costo significa multiplicar por 1,40.',
        m: '100 × 1,40 = 140',
      },
      {
        t: 'Aplica el descuento sobre el precio marcado',
        p: 'El 20 % se descuenta de 140, no de 100. Ahí está la trampa.',
        m: '140 × 0,80 = 112',
      },
      {
        t: 'Compara con el costo',
        p: 'La ganancia es la diferencia con lo que le costó.',
        m: '112 − 100 = 12  →  12 % de ganancia',
      },
    ],
    concept:
      'Los porcentajes encadenados se multiplican, nunca se suman ni se restan entre sí. Cada uno se aplica sobre el resultado del anterior.',
    trick: '1,40 × 0,80 = 1,12. El factor final te da el 12 % de un vistazo.',
    distractors: {
      '1': 'Restaste 40 − 20. Los porcentajes se aplican sobre bases distintas.',
      '2': 'Sumaste 40 − 8, mezclando el descuento sobre el costo con el marcado.',
      '3': 'Calculaste el 20 % de 40 y lo restaste.',
      '4': 'Aplicaste el 20 % al costo y no al precio marcado.',
    },
  },

  // ── Álgebra básica ────────────────────────────────────────────────────────
  {
    chapter: 'Álgebra básica',
    stem: 'Resuelve:<br><br><span class="math">3(x − 4) = 2x + 5</span>',
    options: ['17', '7', '−7', '1', '13'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Abre el paréntesis',
        p: 'El 3 multiplica a todo lo que hay dentro, también al −4.',
        m: '3x − 12 = 2x + 5',
      },
      {
        t: 'Junta las x a un lado',
        p: 'Resta 2x en ambos lados para dejar una sola incógnita.',
        m: 'x − 12 = 5',
      },
      {
        t: 'Despeja',
        p: 'Pasa el −12 sumando al otro lado.',
        m: 'x = 17',
      },
      {
        t: 'Comprueba',
        p: 'Reemplaza en la ecuación original: los dos lados tienen que coincidir.',
        m: '3(17 − 4) = 39\n2(17) + 5 = 39  ✓',
      },
    ],
    concept:
      'Resolver es aislar la incógnita haciendo lo mismo a ambos lados. La igualdad se conserva mientras se opere igual de los dos lados.',
    trick: 'Comprobar cuesta cinco segundos y detecta el 90 % de los errores de signo.',
    distractors: {
      '1': 'Olvidaste multiplicar el −4 por 3: resolviste 3x − 4 = 2x + 5.',
      '2': 'Error de signo al pasar el 12.',
      '3': 'Restaste 3x − 2x mal.',
      '4': 'Sumaste 12 + 5 pero luego restaste una x de más.',
    },
  },
  {
    chapter: 'Álgebra básica',
    stem: 'Si <span class="math">a + b = 7</span> y <span class="math">a · b = 10</span>, ¿cuánto vale <span class="math">a² + b²</span>?',
    options: ['29', '49', '39', '19', '27'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Reconoce el producto notable',
        p: 'No hace falta encontrar a y b por separado: el cuadrado de la suma ya relaciona las tres cantidades.',
        m: '(a + b)² = a² + 2ab + b²',
      },
      {
        t: 'Sustituye lo que conoces',
        p: 'Tienes la suma y el producto, que es justo lo que aparece en la identidad.',
        m: '7² = a² + b² + 2(10)',
      },
      {
        t: 'Despeja',
        p: 'Resta el término que sobra.',
        m: '49 = a² + b² + 20\na² + b² = 29',
      },
    ],
    concept:
      'Con la suma y el producto de dos números se obtiene casi cualquier expresión simétrica, sin resolver ninguna ecuación.',
    trick: 'a² + b² = (a + b)² − 2ab. Memoriza esa forma despejada: aparece en cada examen.',
    distractors: {
      '1': 'Eso es (a + b)². Te faltó restar el 2ab.',
      '2': 'Restaste 10 en vez de 2 × 10.',
      '3': 'Restaste 30.',
      '4': 'Sumaste 7 + 10 + 10.',
    },
  },
  {
    chapter: 'Álgebra básica',
    stem: 'Si <span class="math">x = 103</span>, ¿cuánto vale <span class="math">(x² − 9) ÷ (x − 3)</span>?',
    options: ['106', '100', '103', '109', '112'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'No calcules todavía',
        p: 'Elevar 103 al cuadrado a mano es lento y se presta a errores. Primero simplifica.',
        m: '',
      },
      {
        t: 'Factoriza la diferencia de cuadrados',
        p: 'x² − 9 es x² − 3², que se abre en dos factores.',
        m: 'x² − 9 = (x − 3)(x + 3)',
      },
      {
        t: 'Simplifica',
        p: 'El factor (x − 3) está arriba y abajo, y no es cero porque x = 103.',
        m: '(x − 3)(x + 3) ÷ (x − 3) = x + 3',
      },
      {
        t: 'Recién ahora reemplaza',
        p: 'La cuenta se volvió una suma.',
        m: '103 + 3 = 106',
      },
    ],
    concept:
      'Simplificar antes de sustituir convierte cuentas largas en sumas. Es el hábito que más tiempo ahorra en álgebra.',
    trick: 'Cuando veas «algo² − número cuadrado», piensa en (a − b)(a + b) antes de tocar la calculadora.',
    distractors: {
      '1': 'Restaste 3 en vez de sumarlo.',
      '2': 'Simplificaste de más y te quedaste con x.',
      '3': 'Sumaste 6.',
      '4': 'Sumaste 9.',
    },
  },
  {
    chapter: 'Álgebra básica',
    stem: 'Resuelve:<br><br><span class="math">x/3 + x/4 = 7</span>',
    options: ['12', '84', '7', '4', '21'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Junta las fracciones',
        p: 'El denominador común de 3 y 4 es 12.',
        m: '4x/12 + 3x/12 = 7x/12',
      },
      {
        t: 'Escribe la ecuación sin fracciones',
        p: 'Multiplica todo por 12 para quitar el denominador.',
        m: '7x = 84',
      },
      {
        t: 'Despeja',
        p: 'Divide entre el coeficiente.',
        m: 'x = 12',
      },
      {
        t: 'Comprueba',
        p: 'Los dos sumandos deben dar 7.',
        m: '12/3 + 12/4 = 4 + 3 = 7  ✓',
      },
    ],
    concept:
      'Multiplicar toda la ecuación por el mínimo común múltiplo la deja sin fracciones. Es el primer movimiento siempre que aparecen denominadores.',
    trick: 'x/3 + x/4 es x(1/3 + 1/4) = 7x/12. Sumar los coeficientes evita el paso intermedio.',
    distractors: {
      '1': 'Ese es el valor de 7x, no el de x.',
      '2': 'Igualaste x al resultado sin despejar.',
      '3': 'Dividiste 12 entre 3.',
      '4': 'Sumaste 3 + 4 y luego multiplicaste por 3.',
    },
  },
  {
    chapter: 'Álgebra básica',
    stem: 'Si <span class="math">(x + 2)² − (x − 2)² = 40</span>, ¿cuánto vale <span class="math">x</span>?',
    options: ['5', '10', '4', '8', '2'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Reconoce otra diferencia de cuadrados',
        p: 'Los dos términos están al cuadrado y se están restando: se puede factorizar sin desarrollar nada.',
        m: 'A² − B² = (A + B)(A − B)',
      },
      {
        t: 'Aplica la identidad',
        p: 'Aquí A = x + 2 y B = x − 2.',
        m: '[(x+2) + (x−2)] · [(x+2) − (x−2)]',
      },
      {
        t: 'Simplifica cada corchete',
        p: 'En el primero se cancelan los 2; en el segundo, las x.',
        m: '(2x) · (4) = 8x',
      },
      {
        t: 'Resuelve',
        p: 'Ya es una ecuación de un solo paso.',
        m: '8x = 40\nx = 5',
      },
    ],
    concept:
      'Factorizar antes de desarrollar. Desarrollar los dos cuadrados también lleva a la respuesta, pero con el triple de operaciones y de ocasiones de equivocarse.',
    trick: '(x + a)² − (x − a)² siempre vale 4ax. Con a = 2 son 8x, sin hacer nada.',
    distractors: {
      '1': 'Dividiste 40 entre 4 y luego lo volviste a dividir mal.',
      '2': 'Desarrollaste y perdiste un término al restar.',
      '3': 'Dividiste 40 entre 5.',
      '4': 'Te quedaste con 20x en lugar de 8x.',
    },
  },

  // ── Sistemas de ecuaciones ────────────────────────────────────────────────
  {
    chapter: 'Sistemas de ecuaciones',
    stem: 'Si <span class="math">x + y = 15</span> y <span class="math">x − y = 3</span>, ¿cuánto vale el producto <span class="math">x · y</span>?',
    options: ['54', '45', '36', '18', '60'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Suma las dos ecuaciones',
        p: 'Al sumarlas, la y desaparece sola: en una está sumando y en la otra restando.',
        m: '(x + y) + (x − y) = 15 + 3\n2x = 18  →  x = 9',
      },
      {
        t: 'Vuelve a cualquiera de las dos',
        p: 'Con x conocido, la y sale en un paso.',
        m: '9 + y = 15  →  y = 6',
      },
      {
        t: 'Responde lo que preguntan',
        p: 'El enunciado no pide x ni y, sino su producto. Es donde más gente pierde el punto.',
        m: '9 × 6 = 54',
      },
    ],
    concept:
      'Cuando una incógnita aparece con signos opuestos, sumar las ecuaciones la elimina sin despejar nada.',
    trick: 'Suma para eliminar lo que tiene signos opuestos; resta para eliminar lo que tiene el mismo signo.',
    distractors: {
      '1': 'Multiplicaste 15 × 3.',
      '2': 'Tomaste x = 6 e y = 6.',
      '3': 'Sumaste x + y en vez de multiplicar.',
      '4': 'Usaste x = 10 e y = 6.',
    },
  },
  {
    chapter: 'Sistemas de ecuaciones',
    stem: 'En un cine, la entrada de adulto cuesta <b>S/ 18</b> y la de niño <b>S/ 10</b>. Se vendieron <b>120 entradas</b> y se recaudaron <b>S/ 1 760</b>. ¿Cuántas entradas de niño se vendieron?',
    options: ['50', '70', '40', '60', '45'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Nombra las dos incógnitas',
        p: 'Hay dos cosas que no sabes, así que harán falta dos ecuaciones.',
        m: 'a = entradas de adulto\nn = entradas de niño',
      },
      {
        t: 'Traduce el conteo y el dinero',
        p: 'Una ecuación cuenta entradas; la otra, soles. No las mezcles.',
        m: 'a + n = 120\n18a + 10n = 1 760',
      },
      {
        t: 'Sustituye',
        p: 'Despeja a de la primera y llévala a la segunda.',
        m: 'a = 120 − n\n18(120 − n) + 10n = 1 760',
      },
      {
        t: 'Resuelve',
        p: 'Abre el paréntesis y junta las n.',
        m: '2 160 − 18n + 10n = 1 760\n−8n = −400  →  n = 50',
      },
      {
        t: 'Comprueba',
        p: 'Con 50 niños hay 70 adultos.',
        m: '70(18) + 50(10) = 1 260 + 500 = 1 760  ✓',
      },
    ],
    concept:
      'En los problemas de dos precios siempre hay dos ecuaciones: una cuenta unidades y otra cuenta dinero. Escribirlas por separado evita casi todos los errores.',
    trick:
      'Si todas fueran de adulto: 120 × 18 = 2 160. Sobran 400 soles, y cada niño rebaja 8. 400 ÷ 8 = 50 niños, sin sistema.',
    distractors: {
      '1': 'Ese es el número de adultos, no de niños.',
      '2': 'Tanteaste: 80 adultos y 40 niños dan 1 840 soles.',
      '3': 'Repartiste mitad y mitad sin usar la recaudación.',
      '4': 'Error aritmético al dividir 400 entre 8.',
    },
  },
  {
    chapter: 'Sistemas de ecuaciones',
    stem: 'Resuelve el sistema y halla <span class="math">x + y</span>:<br><br><span class="math">2x + 3y = 16<br>5x − 3y = 19</span>',
    options: ['7', '5', '2', '9', '3'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Mira los coeficientes de y',
        p: 'Son +3 y −3: se cancelan al sumar. No hace falta multiplicar nada.',
        m: '',
      },
      {
        t: 'Suma las ecuaciones',
        p: 'La y desaparece y queda una ecuación de una sola incógnita.',
        m: '7x = 35  →  x = 5',
      },
      {
        t: 'Halla y',
        p: 'Reemplaza x en la primera.',
        m: '2(5) + 3y = 16\n3y = 6  →  y = 2',
      },
      {
        t: 'Responde lo que preguntan',
        p: 'Piden la suma, no cada valor por separado.',
        m: '5 + 2 = 7',
      },
    ],
    concept:
      'El método de eliminación busca que una incógnita se cancele. Antes de multiplicar por nada, revisa si ya se cancela sola.',
    trick: 'Si los coeficientes de una incógnita son opuestos, suma directamente. Es el caso más rápido del examen.',
    distractors: {
      '1': 'Ese es el valor de x.',
      '2': 'Ese es el valor de y.',
      '3': 'Sumaste mal: 7x = 35 da x = 5, no 7.',
      '4': 'Restaste las ecuaciones en vez de sumarlas.',
    },
  },
  {
    chapter: 'Sistemas de ecuaciones',
    stem: 'Un comerciante quiere preparar <b>40 kg</b> de café a <b>S/ 32</b> el kilo mezclando uno de <b>S/ 28</b> con otro de <b>S/ 38</b>. ¿Cuántos kilos del de S/ 38 debe usar?',
    options: ['16', '24', '20', '12', '18'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Nombra los dos tipos de café',
        p: 'Lo que no sabes son los kilos de cada uno.',
        m: 'a = kilos del de S/ 28\nb = kilos del de S/ 38',
      },
      {
        t: 'Traduce el peso y el valor',
        p: 'Una ecuación suma kilos; la otra, soles. El valor de la mezcla es 40 × 32.',
        m: 'a + b = 40\n28a + 38b = 1 280',
      },
      {
        t: 'Sustituye',
        p: 'Despeja a de la primera y reemplaza.',
        m: '28(40 − b) + 38b = 1 280\n1 120 + 10b = 1 280',
      },
      {
        t: 'Resuelve y comprueba',
        p: 'Con 16 kg del caro quedan 24 del barato.',
        m: 'b = 16\n24(28) + 16(38) = 672 + 608 = 1 280  ✓',
      },
    ],
    concept:
      'Una mezcla es un sistema como cualquier otro: una ecuación para la cantidad y otra para el valor total.',
    trick:
      'Regla del aspa: el precio medio 32 dista 4 de 28 y 6 de 38. La proporción se invierte, 6 : 4 = 3 : 2, así que de 40 kg van 24 y 16.',
    distractors: {
      '1': 'Esos son los kilos del café de S/ 28.',
      '2': 'Repartiste la mitad y algo, sin usar el precio medio.',
      '3': 'Invertiste la proporción del aspa.',
      '4': 'Error al dividir 160 entre 10.',
    },
  },
  {
    chapter: 'Sistemas de ecuaciones',
    stem: '¿Cuántas soluciones tiene este sistema?<br><br><span class="math">2x + 3y = 12<br>4x + 6y = 30</span>',
    options: ['Ninguna', 'Exactamente una', 'Infinitas', 'Exactamente dos'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Compara las dos ecuaciones',
        p: 'La segunda parece la primera multiplicada por 2. Compruébalo lado por lado.',
        m: '2 × (2x + 3y) = 4x + 6y  ✓\n2 × 12 = 24',
      },
      {
        t: 'Mira el término independiente',
        p: 'Si el lado izquierdo es el doble, el derecho también tendría que serlo. No lo es.',
        m: '24 ≠ 30',
      },
      {
        t: 'Interpreta',
        p: 'Las dos ecuaciones piden cosas incompatibles del mismo par de números: dicen que 4x + 6y vale 24 y 30 a la vez.',
        m: 'Sistema incompatible → ninguna solución',
      },
      {
        t: 'Míralo como rectas',
        p: 'Misma pendiente y distinta altura son dos rectas paralelas: nunca se cruzan.',
        m: '',
      },
    ],
    concept:
      'Dos ecuaciones proporcionales en las incógnitas pero no en el término independiente describen rectas paralelas: el sistema no tiene solución.',
    trick:
      'Divide coeficiente a coeficiente: 4/2 = 6/3 = 2, pero 30/12 = 2,5. Si el último no coincide, no hay solución; si coincide, hay infinitas.',
    distractors: {
      '1': 'Es lo que ocurre cuando las rectas se cruzan, y estas son paralelas.',
      '2': 'Serían infinitas si el término independiente también fuera el doble, es decir 24.',
      '3': 'Un sistema lineal nunca tiene exactamente dos soluciones.',
    },
  },

  // ── Proporcionalidad ──────────────────────────────────────────────────────
  {
    chapter: 'Proporcionalidad',
    stem: 'Si <b>6 cuadernos</b> cuestan <b>S/ 42</b>, ¿cuánto cuestan <b>11 cuadernos</b> del mismo tipo?',
    options: ['S/ 77', 'S/ 66', 'S/ 84', 'S/ 70', 'S/ 72'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Halla el precio de uno',
        p: 'Reducir a la unidad es el camino más corto y el que menos se presta a errores.',
        m: '42 ÷ 6 = 7 soles cada uno',
      },
      {
        t: 'Multiplica por los que quieres',
        p: 'Más cuadernos, más dinero: la relación es directa.',
        m: '7 × 11 = 77',
      },
    ],
    concept:
      'En una proporción directa, el precio por unidad es constante. Hallarlo convierte cualquier pregunta del tipo en una multiplicación.',
    trick: 'Busca siempre el valor unitario primero. Sirve para el resto de preguntas del mismo enunciado.',
    distractors: {
      '1': 'Multiplicaste 6 × 11.',
      '2': 'Sumaste 42 + 42 y restaste.',
      '3': 'Sumaste 42 + 28, usando 4 cuadernos de más.',
      '4': 'Usaste 6 soles por cuaderno.',
    },
  },
  {
    chapter: 'Proporcionalidad',
    stem: '<b>8 obreros</b> levantan un muro en <b>15 días</b>. Con el mismo rendimiento, ¿en cuántos días lo levantan <b>12 obreros</b>?',
    options: ['10 días', '22,5 días', '12 días', '20 días', '9 días'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Decide si es directa o inversa',
        p: 'Más obreros terminan antes, no después. Cuando una magnitud sube y la otra baja, la proporción es inversa.',
        m: '',
      },
      {
        t: 'Calcula el trabajo total',
        p: 'En proporción inversa lo que se conserva es el producto, aquí los días-obrero que cuesta el muro.',
        m: '8 × 15 = 120 días-obrero',
      },
      {
        t: 'Reparte entre los nuevos obreros',
        p: 'El mismo trabajo dividido entre más gente.',
        m: '120 ÷ 12 = 10 días',
      },
    ],
    concept:
      'En la proporción inversa el producto de las dos magnitudes es constante. En la directa lo constante es el cociente.',
    trick:
      'Pregúntate antes de calcular: «si aumento esto, ¿lo otro sube o baja?». La respuesta te dice si multiplicar o dividir.',
    distractors: {
      '1': 'Trataste el problema como proporción directa: 15 × 12 ÷ 8.',
      '2': 'Copiaste el número de obreros.',
      '3': 'Restaste 15 − 4 sin fundamento.',
      '4': 'Restaste los 4 obreros de más a los 15 días.',
    },
  },
  {
    chapter: 'Proporcionalidad',
    stem: 'Se reparten <b>S/ 3 600</b> entre tres socios en partes proporcionales a <b>2, 3 y 4</b>. ¿Cuánto recibe el segundo?',
    options: ['S/ 1 200', 'S/ 800', 'S/ 1 600', 'S/ 900', 'S/ 1 000'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Suma las partes',
        p: 'El total se divide en tantas partes iguales como indique la suma de los índices.',
        m: '2 + 3 + 4 = 9 partes',
      },
      {
        t: 'Halla cuánto vale una parte',
        p: 'Es el mismo «valor unitario» de siempre.',
        m: '3 600 ÷ 9 = 400 soles por parte',
      },
      {
        t: 'Multiplica por las partes del segundo',
        p: 'Al segundo le corresponden 3 partes.',
        m: '3 × 400 = 1 200',
      },
      {
        t: 'Comprueba que todo cuadre',
        p: 'Los tres montos deben sumar el total repartido.',
        m: '800 + 1 200 + 1 600 = 3 600  ✓',
      },
    ],
    concept:
      'Un reparto proporcional es dividir el total entre la suma de los índices y multiplicar por el índice de cada uno.',
    trick: 'Comprueba siempre que las tres partes sumen el total. Detecta al instante si te equivocaste de índice.',
    distractors: {
      '1': 'Le diste 2 partes: eso le toca al primero.',
      '2': 'Le diste 4 partes: eso le toca al tercero.',
      '3': 'Dividiste 3 600 entre 4.',
      '4': 'Redondeaste sin dividir entre 9.',
    },
  },
  {
    chapter: 'Proporcionalidad',
    stem: '<b>5 máquinas</b> producen <b>2 000 envases</b> en <b>4 horas</b>. ¿Cuántos envases producen <b>8 máquinas</b> en <b>6 horas</b>?',
    options: ['4 800', '3 200', '6 000', '2 400', '3 000'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Separa las dos causas',
        p: 'Cambian dos cosas a la vez —máquinas y horas—, y cada una afecta a la producción por su lado.',
        m: 'Máquinas: 5 → 8\nHoras: 4 → 6',
      },
      {
        t: 'Escribe cada razón en el sentido correcto',
        p: 'Más máquinas producen más, y más horas también: las dos son directas, así que las dos fracciones van con el número mayor arriba.',
        m: '8/5  y  6/4',
      },
      {
        t: 'Multiplica',
        p: 'La producción base se corrige por los dos factores.',
        m: '2 000 × 8/5 × 6/4 = 2 000 × 1,6 × 1,5',
      },
      {
        t: 'Calcula',
        p: 'Conviene hacerlo por partes.',
        m: '2 000 × 1,6 = 3 200\n3 200 × 1,5 = 4 800',
      },
    ],
    concept:
      'En la regla de tres compuesta cada magnitud aporta su propia fracción. Lo único que hay que decidir, una por una, es si es directa o inversa.',
    trick:
      'Comprueba el orden de magnitud antes de responder: hay más máquinas y más horas, así que el resultado tiene que ser bastante mayor que 2 000.',
    distractors: {
      '1': 'Solo corregiste por las máquinas y olvidaste las horas.',
      '2': 'Multiplicaste por 3 sin pasar por las fracciones.',
      '3': 'Aplicaste una de las razones al revés.',
      '4': 'Solo corregiste por las horas.',
    },
  },
  {
    chapter: 'Proporcionalidad',
    stem: 'En un plano a escala <b>1 : 2 500</b>, dos avenidas aparecen separadas por <b>8 cm</b>. ¿Cuál es la distancia real entre ellas?',
    options: ['200 m', '20 m', '2 000 m', '312,5 m', '25 m'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Lee la escala',
        p: '1 : 2 500 significa que un centímetro del plano son 2 500 centímetros reales.',
        m: '1 cm en el plano = 2 500 cm reales',
      },
      {
        t: 'Multiplica',
        p: 'La escala es una proporción directa.',
        m: '8 × 2 500 = 20 000 cm',
      },
      {
        t: 'Convierte a metros',
        p: 'Un metro son 100 cm. Este paso es el que más gente se salta.',
        m: '20 000 ÷ 100 = 200 m',
      },
    ],
    concept:
      'Una escala es una proporción directa entre plano y realidad. La respuesta casi nunca queda en la unidad en que se calculó.',
    trick: 'Escribe la unidad en cada paso. Un resultado en centímetros que se responde como metros es el error más caro de este tema.',
    distractors: {
      '1': 'Dividiste entre 1 000 en lugar de 100.',
      '2': 'Te quedaste en centímetros y los llamaste metros.',
      '3': 'Dividiste 2 500 entre 8.',
      '4': 'Dividiste entre 800.',
    },
  },

  // ── Geometría plana ───────────────────────────────────────────────────────
  {
    chapter: 'Geometría plana',
    stem: 'Un triángulo tiene <b>12 cm</b> de base y <b>7 cm</b> de altura. ¿Cuál es su área?',
    options: ['42 cm²', '84 cm²', '19 cm²', '38 cm²', '21 cm²'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Recuerda de dónde sale la fórmula',
        p: 'Un triángulo es la mitad de un rectángulo de la misma base y la misma altura. Por eso se divide entre dos.',
        m: 'Área = base × altura ÷ 2',
      },
      {
        t: 'Reemplaza',
        p: 'Los dos datos ya vienen en centímetros, así que no hay que convertir nada.',
        m: '12 × 7 = 84\n84 ÷ 2 = 42',
      },
    ],
    concept:
      'El área de un triángulo es la mitad de la del rectángulo que lo contiene. La altura siempre es perpendicular a la base, no un lado cualquiera.',
    trick: 'Si el resultado te sale igual al del rectángulo, es que olvidaste dividir entre dos.',
    distractors: {
      '1': 'Ese es el área del rectángulo: te faltó dividir entre 2.',
      '2': 'Sumaste base y altura.',
      '3': 'Calculaste el perímetro de algo.',
      '4': 'Dividiste entre 4.',
    },
  },
  {
    chapter: 'Geometría plana',
    stem: 'Un jardín circular mide <b>10 m de diámetro</b>. ¿Cuántos metros de reja se necesitan para cercarlo? <span class="math">(π ≈ 3,14)</span>',
    options: ['31,4 m', '78,5 m', '15,7 m', '62,8 m', '314 m'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Identifica qué te piden',
        p: 'Cercar es rodear: se pide la longitud del borde, no la superficie de dentro.',
        m: 'Longitud de la circunferencia',
      },
      {
        t: 'Elige la fórmula correcta',
        p: 'Con el diámetro es directa; con el radio habría que duplicarlo primero.',
        m: 'L = π · d',
      },
      {
        t: 'Calcula',
        p: 'El diámetro ya lo da el enunciado.',
        m: '3,14 × 10 = 31,4 m',
      },
    ],
    concept:
      'Perímetro y área responden a preguntas distintas: uno se mide en metros y el otro en metros cuadrados. La unidad de la respuesta te dice si elegiste bien.',
    trick: 'Cercar, bordear o rodear → perímetro. Sembrar, pintar o cubrir → área.',
    distractors: {
      '1': 'Calculaste el área (π · r²), no el contorno.',
      '2': 'Usaste el radio en la fórmula del diámetro.',
      '3': 'Duplicaste el diámetro tratándolo como radio.',
      '4': 'Multiplicaste por 100.',
    },
  },
  {
    chapter: 'Geometría plana',
    stem: 'Una escalera de <b>13 m</b> se apoya en una pared vertical. Su base está a <b>5 m</b> del muro. ¿A qué altura llega el extremo superior?',
    options: ['12 m', '8 m', '18 m', '14 m', '11 m'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Dibuja el triángulo',
        p: 'La pared, el suelo y la escalera forman un triángulo rectángulo. La escalera es siempre la hipotenusa, porque es el lado más largo y el que está frente al ángulo recto.',
        m: 'Hipotenusa = 13\nUn cateto = 5',
      },
      {
        t: 'Aplica Pitágoras despejando el cateto',
        p: 'Aquí se resta, no se suma: lo desconocido es un cateto, no la hipotenusa.',
        m: 'h² = 13² − 5²',
      },
      {
        t: 'Calcula',
        p: 'Resta primero y saca la raíz después.',
        m: '169 − 25 = 144\n√144 = 12 m',
      },
    ],
    concept:
      'En un triángulo rectángulo, la hipotenusa al cuadrado es la suma de los cuadrados de los catetos. Para hallar un cateto se resta.',
    trick: '5, 12 y 13 es una terna pitagórica clásica, como 3-4-5 y 8-15-17. Reconocerlas ahorra la raíz.',
    distractors: {
      '1': 'Restaste 13 − 5 directamente, sin los cuadrados.',
      '2': 'Sumaste 13 + 5.',
      '3': 'Sumaste los cuadrados y sacaste la raíz: eso daría la hipotenusa de otro triángulo.',
      '4': 'Error al calcular la raíz de 144.',
    },
  },
  {
    chapter: 'Geometría plana',
    stem: 'En un cuadrado de <b>8 cm</b> de lado se inscribe un círculo que toca los cuatro lados. ¿Cuál es el área de la región que queda entre el cuadrado y el círculo? <span class="math">(π ≈ 3,14)</span>',
    options: ['13,76 cm²', '50,24 cm²', '14,24 cm²', '25,12 cm²', '8 cm²'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Entiende «inscrito»',
        p: 'El círculo toca los cuatro lados, así que su diámetro es exactamente el lado del cuadrado.',
        m: 'd = 8 cm  →  r = 4 cm',
      },
      {
        t: 'Calcula las dos áreas por separado',
        p: 'La región que piden es lo que sobra al quitar una de la otra.',
        m: 'Cuadrado: 8 × 8 = 64\nCírculo: 3,14 × 4² = 50,24',
      },
      {
        t: 'Resta',
        p: 'Las cuatro esquinas que quedan fuera del círculo son la respuesta.',
        m: '64 − 50,24 = 13,76 cm²',
      },
      {
        t: 'Comprueba que tenga sentido',
        p: 'El círculo ocupa casi el 79 % del cuadrado, así que lo que sobra debe ser bastante menos de la mitad.',
        m: '13,76 ÷ 64 ≈ 21 %  ✓',
      },
    ],
    concept:
      'Las áreas sombreadas se resuelven restando figuras completas, no midiendo la forma rara. Lo difícil es identificar qué dos figuras.',
    trick:
      'Un círculo inscrito en un cuadrado siempre deja fuera el 21,5 % del área, sea cual sea el lado. Sirve para descartar alternativas de un vistazo.',
    distractors: {
      '1': 'Ese es el área del círculo, no la que sobra.',
      '2': 'Usaste el lado como radio en vez del diámetro.',
      '3': 'Calculaste la longitud de la circunferencia.',
      '4': 'Restaste los lados en lugar de las áreas.',
    },
  },
  {
    chapter: 'Geometría plana',
    stem: '¿Cuánto suman los ángulos interiores de un <b>hexágono</b>?',
    options: ['720°', '540°', '900°', '360°', '1 080°'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Parte el polígono en triángulos',
        p: 'Desde un solo vértice puedes trazar diagonales que dividen el hexágono en cuatro triángulos. La suma de sus ángulos es la del polígono.',
        m: '6 lados → 4 triángulos',
      },
      {
        t: 'Usa que cada triángulo suma 180°',
        p: 'De ahí sale la fórmula, y por eso no hay que memorizarla a ciegas.',
        m: '4 × 180° = 720°',
      },
      {
        t: 'Escríbelo en general',
        p: 'Un polígono de n lados se parte en n − 2 triángulos.',
        m: 'Suma = (n − 2) × 180°',
      },
    ],
    concept:
      'Todo polígono se descompone en triángulos desde un vértice. La suma de sus ángulos interiores es (n − 2) × 180°.',
    trick: 'Cuadrilátero 360°, pentágono 540°, hexágono 720°: van de 180 en 180.',
    distractors: {
      '1': 'Esa es la suma de un pentágono: usaste n = 5.',
      '2': 'Usaste n = 7.',
      '3': 'Esa es la suma de los ángulos exteriores, que vale 360° en cualquier polígono.',
      '4': 'Usaste n = 8.',
    },
  },

  // ── Estadística descriptiva ───────────────────────────────────────────────
  {
    chapter: 'Estadística descriptiva',
    stem: 'Las notas de un alumno fueron <b>12, 15, 18, 11 y 14</b>. ¿Cuál es su promedio?',
    options: ['14', '15', '13', '12', '14,5'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Suma todos los datos',
        p: 'El promedio reparte el total en partes iguales, así que primero hace falta el total.',
        m: '12 + 15 + 18 + 11 + 14 = 70',
      },
      {
        t: 'Divide entre cuántos son',
        p: 'Son cinco notas.',
        m: '70 ÷ 5 = 14',
      },
    ],
    concept:
      'La media es el valor que tendrían todos los datos si el total se repartiera por igual. Por eso siempre cae entre el menor y el mayor.',
    trick: 'Si tu media queda fuera del rango de los datos, hay un error de suma. Aquí tenía que estar entre 11 y 18.',
    distractors: {
      '1': 'Tomaste el dato del medio sin ordenarlos.',
      '2': 'Error de suma.',
      '3': 'Copiaste el primer dato.',
      '4': 'Dividiste entre 4.',
    },
  },
  {
    chapter: 'Estadística descriptiva',
    stem: 'Halla la mediana de: <b>7, 3, 9, 12, 5, 8</b>.',
    options: ['7,5', '8', '7', '9', '8,5'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ordena los datos',
        p: 'Sin ordenar, la mediana no significa nada. Es el paso que más se olvida.',
        m: '3, 5, 7, 8, 9, 12',
      },
      {
        t: 'Cuenta cuántos son',
        p: 'Son seis, un número par: no hay un único dato central, hay dos.',
        m: 'Centrales: 7 y 8',
      },
      {
        t: 'Promedia los dos centrales',
        p: 'La mediana es el punto medio entre ellos, y puede no ser uno de los datos.',
        m: '(7 + 8) ÷ 2 = 7,5',
      },
    ],
    concept:
      'La mediana deja la mitad de los datos a cada lado. Con una cantidad par de datos es el promedio de los dos del centro.',
    trick: 'Ordena siempre antes de tocar nada. Con n par la mediana casi nunca coincide con un dato de la lista.',
    distractors: {
      '1': 'Tomaste solo uno de los dos centrales.',
      '2': 'Tomaste el otro central.',
      '3': 'Contaste desde el final sin ordenar.',
      '4': 'Promediaste 8 y 9.',
    },
  },
  {
    chapter: 'Estadística descriptiva',
    stem: 'Un curso califica con tres notas de distinto peso: <b>14</b> vale el <b>20 %</b>, <b>16</b> vale el <b>30 %</b> y <b>12</b> vale el <b>50 %</b>. ¿Cuál es el promedio final?',
    options: ['13,6', '14', '13', '14,5', '12,8'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'No promedies a secas',
        p: 'Las notas no valen lo mismo, así que el promedio simple (14) daría un resultado falso.',
        m: '(14 + 16 + 12) ÷ 3 = 14  ✗',
      },
      {
        t: 'Multiplica cada nota por su peso',
        p: 'Cada nota aporta en proporción a lo que vale.',
        m: '14 × 0,20 = 2,8\n16 × 0,30 = 4,8\n12 × 0,50 = 6,0',
      },
      {
        t: 'Suma los aportes',
        p: 'Como los pesos suman 100 %, no hay que dividir entre nada.',
        m: '2,8 + 4,8 + 6,0 = 13,6',
      },
      {
        t: 'Comprueba que sea razonable',
        p: 'La nota que más pesa es la más baja, así que el promedio debe quedar por debajo de 14.',
        m: '13,6 < 14  ✓',
      },
    ],
    concept:
      'En una media ponderada cada dato pesa distinto. El promedio simple es el caso particular en que todos pesan igual.',
    trick: 'Si los pesos suman 100 %, basta sumar los productos. Si no suman 100, divide entre la suma de los pesos.',
    distractors: {
      '1': 'Es el promedio simple, que ignora los pesos.',
      '2': 'Redondeaste hacia abajo sin calcular.',
      '3': 'Le diste más peso a la nota alta.',
      '4': 'Usaste 12 con peso 0,60.',
    },
  },
  {
    chapter: 'Estadística descriptiva',
    stem: 'Las notas de ocho alumnos son <b>10, 12, 12, 13, 15, 15, 15 y 18</b>. ¿Cuáles son la moda y la mediana?',
    options: [
      'Moda 15 y mediana 14',
      'Moda 15 y mediana 15',
      'Moda 12 y mediana 13',
      'Moda 15 y mediana 13,5',
      'Moda 13 y mediana 14',
    ],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Busca la moda',
        p: 'Es el valor que más se repite. Basta contar.',
        m: '10 ×1 · 12 ×2 · 13 ×1 · 15 ×3 · 18 ×1\nModa = 15',
      },
      {
        t: 'Localiza el centro',
        p: 'Los datos ya vienen ordenados y son ocho, un número par: los centrales son el cuarto y el quinto.',
        m: 'Cuarto = 13 · quinto = 15',
      },
      {
        t: 'Promedia los dos centrales',
        p: 'La mediana queda entre ambos.',
        m: '(13 + 15) ÷ 2 = 14',
      },
    ],
    concept:
      'Moda y mediana miden cosas distintas: la moda es lo más frecuente y la mediana es lo que parte el grupo por la mitad. Pueden no coincidir.',
    trick: 'Con n par, los centrales están en las posiciones n/2 y n/2 + 1. Aquí, la cuarta y la quinta.',
    distractors: {
      '1': 'Confundiste la mediana con la moda.',
      '2': 'Contaste mal las repeticiones.',
      '3': 'Promediaste el tercer y cuarto dato.',
      '4': 'Tomaste el valor central de los distintos, no de los datos.',
    },
  },
  {
    chapter: 'Estadística descriptiva',
    stem: 'Al registrar cinco notas se escribió <b>68</b> por error, en lugar de <b>16</b>. Las notas quedaron así: <b>12, 13, 14, 13 y 68</b>. Al corregir el error, ¿qué ocurre con la media y con la mediana?',
    options: [
      'La media baja mucho y la mediana no cambia',
      'Las dos bajan por igual',
      'La mediana baja y la media casi no cambia',
      'Ninguna de las dos cambia',
      'La media sube y la mediana baja',
    ],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Calcula la media antes y después',
        p: 'La media suma todos los datos, así que un valor disparatado la arrastra.',
        m: 'Antes: 120 ÷ 5 = 24\nDespués: 68 ÷ 5 = 13,6',
      },
      {
        t: 'Calcula la mediana antes',
        p: 'Ordena y toma el dato central. Son cinco, así que es el tercero.',
        m: '12, 13, 13, 14, 68  →  13',
      },
      {
        t: 'Calcula la mediana después',
        p: 'El 68 se convierte en 16, pero sigue siendo el mayor: el orden de los demás no cambia.',
        m: '12, 13, 13, 14, 16  →  13',
      },
      {
        t: 'Interpreta',
        p: 'La media cayó más de diez puntos; la mediana se quedó igual porque solo le importa la posición, no el valor.',
        m: 'Media: 24 → 13,6\nMediana: 13 → 13',
      },
    ],
    concept:
      'La mediana es resistente a los valores atípicos y la media no. Por eso, cuando hay datos extremos, la mediana describe mejor al grupo.',
    trick:
      'Si un solo dato es muchísimo mayor que el resto, desconfía de la media. Es la razón por la que los sueldos se informan con la mediana.',
    distractors: {
      '1': 'La mediana no se movió: sigue siendo 13.',
      '2': 'Es justo al revés: la sensible a los extremos es la media.',
      '3': 'La media pasó de 24 a 13,6, que es un cambio enorme.',
      '4': 'Cambiar 68 por 16 solo puede bajar la media.',
    },
  },
];
