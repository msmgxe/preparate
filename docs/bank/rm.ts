import type { BankQuestion } from './types';

/**
 * Razonamiento Matemático · el área que más pesa y más se entrena.
 *
 * Mezcla por capítulo, la acordada: una de calentamiento, tres de nivel de
 * examen —dos con situación peruana y una corta, de velocidad— y una exigente
 * que obliga a combinar dos ideas.
 */
export const RM: BankQuestion[] = [
  // ── Sucesiones y series ───────────────────────────────────────────────────
  {
    chapter: 'Sucesiones y series',
    stem: '¿Qué término continúa?<br><br><span class="math">3 ; 7 ; 11 ; 15 ; ...</span>',
    options: ['19', '18', '20', '21', '17'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Resta términos vecinos',
        p: 'Es el primer movimiento siempre, aunque el patrón parezca obvio.',
        m: '7 − 3 = 4\n11 − 7 = 4\n15 − 11 = 4',
      },
      {
        t: 'La diferencia es constante',
        p: 'Cuando la primera fila de diferencias ya es constante, la sucesión es aritmética y no hay que restar más.',
        m: 'Razón = 4',
      },
      { t: 'Suma la razón al último término', p: 'Con la razón conocida, solo queda completar.', m: '15 + 4 = 19' },
    ],
    concept:
      'En una sucesión aritmética la diferencia entre términos vecinos es constante. Comprobarlo cuesta tres restas.',
    trick: 'Si las diferencias son constantes a la primera, es lineal. Si no, vuelve a restar.',
    distractors: {
      '1': 'Sumaste 3, la razón de otra sucesión.',
      '2': 'Sumaste 5.',
      '3': 'Sumaste 6.',
      '4': 'Sumaste 2.',
    },
  },
  {
    chapter: 'Sucesiones y series',
    stem: 'Un puesto del mercado de Surquillo vendió <b>12</b> canastas el lunes, <b>15</b> el martes, <b>19</b> el miércoles y <b>24</b> el jueves. Si el patrón se mantiene, ¿cuántas venderá el viernes?',
    options: ['30', '29', '28', '31', '32'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ordena los datos y resta',
        p: 'Los días son la posición; las canastas, el término.',
        m: '15 − 12 = 3\n19 − 15 = 4\n24 − 19 = 5',
      },
      {
        t: 'Mira el patrón de las diferencias',
        p: 'No son constantes, pero crecen de uno en uno: es una sucesión de segundo orden.',
        m: '3, 4, 5 → sigue 6',
      },
      { t: 'Reconstruye hacia arriba', p: 'Suma la nueva diferencia al último término conocido.', m: '24 + 6 = 30' },
    ],
    concept:
      'Cuando las primeras diferencias no son constantes pero siguen su propio patrón, se resuelve bajando un nivel y volviendo a subir.',
    trick: 'Escribe las diferencias en una fila debajo. Ver las dos filas juntas hace obvio el patrón.',
    distractors: {
      '1': 'Sumaste 5, la diferencia anterior, en lugar de la siguiente.',
      '2': 'Sumaste 4.',
      '3': 'Sumaste 7.',
      '4': 'Duplicaste la diferencia.',
    },
  },
  {
    chapter: 'Sucesiones y series',
    stem: '¿Qué término continúa?<br><br><span class="math">2 ; 6 ; 18 ; 54 ; ...</span>',
    options: ['162', '108', '216', '72', '148'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Prueba restando',
        p: 'Las diferencias son 4, 12, 36: no son constantes ni crecen de forma regular.',
        m: '6 − 2 = 4\n18 − 6 = 12\n54 − 18 = 36',
      },
      {
        t: 'Prueba dividiendo',
        p: 'Cuando restar no aclara nada, el siguiente intento es dividir. Aquí el cociente sí es constante.',
        m: '6 ÷ 2 = 3\n18 ÷ 6 = 3\n54 ÷ 18 = 3',
      },
      { t: 'Multiplica por la razón', p: 'Es una sucesión geométrica de razón 3.', m: '54 × 3 = 162' },
    ],
    concept:
      'Aritmética se reconoce restando; geométrica, dividiendo. Si los números crecen rápido, empieza por dividir.',
    trick: 'Duplicarse o triplicarse es señal de geométrica. Restar solo hace perder tiempo ahí.',
    distractors: {
      '1': 'Duplicaste en vez de triplicar.',
      '2': 'Sumaste 162 mal, o cuadruplicaste.',
      '3': 'Sumaste 18.',
      '4': 'Sumaste las diferencias anteriores.',
    },
  },
  {
    chapter: 'Sucesiones y series',
    stem: '¿Qué término continúa?<br><br><span class="math">3 ; 8 ; 6 ; 16 ; 12 ; 32 ; ...</span>',
    options: ['24', '64', '48', '36', '28'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Sospecha cuando los números suben y bajan',
        p: 'Del 8 se pasa al 6: una sucesión con un solo patrón no retrocede. Casi siempre hay dos sucesiones intercaladas.',
        m: '',
      },
      {
        t: 'Sepáralas por posición',
        p: 'Una en las posiciones impares y otra en las pares.',
        m: 'Impares: 3, 6, 12\nPares:   8, 16, 32',
      },
      {
        t: 'Halla el patrón de cada una',
        p: 'Las dos se duplican, pero arrancan en números distintos.',
        m: 'Impares: ×2\nPares:   ×2',
      },
      {
        t: 'Averigua a cuál le toca',
        p: 'Ya hay seis términos, así que el siguiente ocupa la posición 7: impar. Le toca a la primera sucesión.',
        m: '12 × 2 = 24',
      },
    ],
    concept:
      'Una sucesión alternada son dos sucesiones entrelazadas. Separarlas por posición las vuelve dos problemas fáciles.',
    trick:
      'Si la sucesión sube y baja, cuenta las posiciones antes que nada. Y no olvides comprobar a cuál de las dos le toca el término pedido.',
    distractors: {
      '1': 'Le tocaba a la sucesión impar, no a la par: 64 sería el siguiente de 32.',
      '2': 'Sumaste las dos sucesiones.',
      '3': 'Sumaste 4 al último término.',
      '4': 'Buscaste un patrón único donde hay dos.',
    },
  },

  // ── Planteo de ecuaciones ─────────────────────────────────────────────────
  {
    chapter: 'Planteo de ecuaciones',
    stem: 'El <b>triple</b> de un número, aumentado en <b>5</b>, da <b>26</b>. ¿Cuál es el número?',
    options: ['7', '9', '21', '31', '6'],
    answer: 0,
    difficulty: 1,
    steps: [
      { t: 'Ponle nombre al número', p: 'Todo planteo empieza igual: bautizar lo que no se sabe.', m: 'x = el número' },
      {
        t: 'Traduce frase por frase',
        p: '«El triple» es ×3 y «aumentado en 5» es +5, en ese orden.',
        m: '3x + 5 = 26',
      },
      { t: 'Despeja', p: 'Primero el término suelto, después el coeficiente.', m: '3x = 21\nx = 7' },
      { t: 'Comprueba con el enunciado', p: 'El triple de 7 es 21, y 21 más 5 son 26.', m: '3(7) + 5 = 26  ✓' },
    ],
    concept:
      'Traducir del castellano al álgebra es la mitad del trabajo. El orden de las palabras marca el orden de las operaciones.',
    trick: 'Lee el enunciado por trozos y escribe cada trozo debajo del anterior. La ecuación se arma sola.',
    distractors: {
      '1': 'Restaste 5 pero dividiste entre 2,33.',
      '2': 'Ese es el triple del número, no el número.',
      '3': 'Sumaste 5 en vez de restarlo.',
      '4': 'Redondeaste hacia abajo.',
    },
  },
  {
    chapter: 'Planteo de ecuaciones',
    stem: 'Un padre reparte <b>S/ 1 200</b> entre sus dos hijos de modo que el mayor reciba <b>S/ 200 más</b> que el menor. ¿Cuánto recibe el menor?',
    options: ['S/ 500', 'S/ 700', 'S/ 600', 'S/ 400', 'S/ 1 000'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Nombra la parte más pequeña',
        p: 'Conviene llamar x a lo menor: así la otra parte se escribe sumando, sin signos negativos.',
        m: 'x = lo del menor\nx + 200 = lo del mayor',
      },
      { t: 'Escribe que las dos partes suman el total', p: 'Es la única condición que falta usar.', m: 'x + (x + 200) = 1 200' },
      { t: 'Resuelve', p: 'Junta las x y despeja.', m: '2x + 200 = 1 200\n2x = 1 000  →  x = 500' },
      {
        t: 'Comprueba que cuadre',
        p: 'Las dos partes deben sumar el total y diferenciarse en 200.',
        m: '500 + 700 = 1 200  ✓\n700 − 500 = 200  ✓',
      },
    ],
    concept:
      'En un reparto con diferencia, se nombra la parte menor y la mayor se escribe a partir de ella. Una sola incógnita basta.',
    trick:
      'Atajo: quita la diferencia del total (1 200 − 200 = 1 000), reparte entre dos (500) y esa es la parte menor.',
    distractors: {
      '1': 'Ese es lo que recibe el mayor.',
      '2': 'Repartiste en partes iguales e ignoraste la diferencia.',
      '3': 'Restaste 200 al menor en vez de sumárselos al mayor.',
      '4': 'Restaste 200 del total y no dividiste.',
    },
  },
  {
    chapter: 'Planteo de ecuaciones',
    stem: 'La suma de <b>tres números consecutivos</b> es <b>84</b>. ¿Cuál es el mayor?',
    options: ['29', '27', '28', '30', '26'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Escribe los tres a partir de uno solo',
        p: 'Consecutivos significa que cada uno es el anterior más uno.',
        m: 'x, x + 1, x + 2',
      },
      { t: 'Suma e iguala', p: 'La condición del enunciado es esa suma.', m: 'x + (x+1) + (x+2) = 84\n3x + 3 = 84' },
      { t: 'Despeja', p: 'El menor sale primero.', m: '3x = 81  →  x = 27' },
      {
        t: 'Responde lo que preguntan',
        p: 'Piden el mayor, que es x + 2. Es donde más gente pierde el punto.',
        m: '27 + 2 = 29',
      },
    ],
    concept:
      'Con números consecutivos, nombrar solo el menor deja una única incógnita. Lo demás se escribe a partir de él.',
    trick: 'La suma de tres consecutivos es siempre el triple del de en medio: 84 ÷ 3 = 28, y el mayor es 29.',
    distractors: {
      '1': 'Ese es el menor.',
      '2': 'Ese es el del medio.',
      '3': 'Te pasaste un lugar.',
      '4': 'Restaste en vez de sumar.',
    },
  },
  {
    chapter: 'Planteo de ecuaciones',
    stem: 'Un taxi en Lima cobra <b>S/ 3,50</b> de bajada de bandera y <b>S/ 1,50</b> por kilómetro recorrido. Si una carrera costó <b>S/ 26</b>, ¿cuántos kilómetros recorrió?',
    options: ['15 km', '17 km', '14 km', '16 km', '20 km'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Separa lo fijo de lo variable',
        p: 'La bajada de bandera se paga una sola vez, sin importar la distancia. Lo demás depende de los kilómetros.',
        m: 'Fijo: 3,50\nVariable: 1,50 por km',
      },
      { t: 'Escribe el costo total', p: 'Es lo fijo más lo variable.', m: '3,50 + 1,50k = 26' },
      { t: 'Despeja', p: 'Quita primero lo fijo y después divide.', m: '1,50k = 22,50\nk = 15' },
      { t: 'Comprueba', p: 'Quince kilómetros a S/ 1,50 más la bajada.', m: '15 × 1,50 = 22,50\n22,50 + 3,50 = 26  ✓' },
    ],
    concept:
      'Los cobros con una parte fija y otra por unidad se modelan igual siempre: total = fijo + tarifa × cantidad. Es el mismo esquema del recibo de luz o del plan de celular.',
    trick: 'Quita lo fijo antes de dividir. Dividir 26 entre 1,50 sin restar la bajada es el error típico.',
    distractors: {
      '1': 'Dividiste 26 entre 1,50 sin quitar la bajada de bandera.',
      '2': 'Restaste 3,50 dos veces.',
      '3': 'Redondeaste 22,50 ÷ 1,50 hacia arriba.',
      '4': 'Usaste una tarifa de S/ 1,12.',
    },
  },
  {
    chapter: 'Planteo de ecuaciones',
    stem: 'Un vendedor gana <b>S/ 900 fijos</b> más el <b>8 % de sus ventas</b>. En marzo ganó <b>S/ 2 100</b>. Si en abril quiere ganar <b>S/ 2 500</b>, ¿cuánto más que en marzo tiene que vender?',
    options: ['S/ 5 000', 'S/ 400', 'S/ 20 000', 'S/ 15 000', 'S/ 3 200'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Escribe el sueldo como fórmula',
        p: 'Es el mismo esquema de siempre: una parte fija y otra proporcional.',
        m: 'Sueldo = 900 + 0,08 · V',
      },
      { t: 'Halla las ventas de marzo', p: 'Reemplaza el sueldo conocido y despeja.', m: '900 + 0,08V = 2 100\n0,08V = 1 200\nV = 15 000' },
      { t: 'Halla las ventas que necesita en abril', p: 'La misma fórmula con el sueldo que quiere.', m: '900 + 0,08V = 2 500\n0,08V = 1 600\nV = 20 000' },
      {
        t: 'Responde la diferencia, no el total',
        p: 'La pregunta es cuánto MÁS tiene que vender.',
        m: '20 000 − 15 000 = 5 000',
      },
    ],
    concept:
      'Cuando un problema pide una variación, hay que resolver dos veces la misma ecuación y restar. Responder uno de los dos totales es el error más frecuente.',
    trick:
      'Atajo: los S/ 400 extra de sueldo son el 8 % de la venta adicional. 400 ÷ 0,08 = 5 000, sin calcular ninguna de las dos ventas.',
    distractors: {
      '1': 'Esa es la diferencia de sueldo, no de ventas.',
      '2': 'Esas son las ventas de abril, no el aumento.',
      '3': 'Esas son las ventas de marzo.',
      '4': 'Calculaste el 8 % de otra cosa.',
    },
  },

  // ── Edades ────────────────────────────────────────────────────────────────
  {
    chapter: 'Edades',
    stem: 'La suma de las edades de dos hermanos es <b>34 años</b>. Si el mayor tiene <b>6 años más</b> que el menor, ¿qué edad tiene el menor?',
    options: ['14 años', '20 años', '17 años', '16 años', '12 años'],
    answer: 0,
    difficulty: 1,
    steps: [
      { t: 'Nombra al menor', p: 'Así la otra edad se escribe sumando.', m: 'x = menor\nx + 6 = mayor' },
      { t: 'Escribe la suma', p: 'Es la condición del enunciado.', m: 'x + (x + 6) = 34' },
      { t: 'Despeja', p: 'Junta las x.', m: '2x = 28  →  x = 14' },
      { t: 'Comprueba', p: 'Las dos edades deben sumar 34 y diferenciarse en 6.', m: '14 + 20 = 34  ✓' },
    ],
    concept:
      'Suma y diferencia conocidas: nombrar la cantidad menor deja una sola incógnita y evita los signos negativos.',
    trick: 'Quita la diferencia del total y reparte: (34 − 6) ÷ 2 = 14.',
    distractors: {
      '1': 'Esa es la edad del mayor.',
      '2': 'Repartiste en partes iguales.',
      '3': 'Restaste 2 en vez de 6.',
      '4': 'Restaste 6 dos veces.',
    },
  },
  {
    chapter: 'Edades',
    stem: 'Un padre tiene <b>39 años</b> y su hijo, <b>9</b>. ¿Dentro de cuántos años la edad del padre será el <b>triple</b> de la del hijo?',
    options: ['6 años', '5 años', '10 años', '3 años', '15 años'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Nombra el tiempo que pasa',
        p: 'Lo que no sabes no es una edad, sino cuántos años faltan. A los dos les pasa el mismo tiempo.',
        m: 't = años que faltan\nPadre: 39 + t\nHijo: 9 + t',
      },
      { t: 'Traduce «el triple»', p: 'El triple multiplica a la edad del hijo, no a la del padre.', m: '39 + t = 3(9 + t)' },
      { t: 'Resuelve', p: 'Abre el paréntesis y junta las t.', m: '39 + t = 27 + 3t\n12 = 2t  →  t = 6' },
      { t: 'Comprueba', p: 'Dentro de 6 años tendrán 45 y 15.', m: '45 = 3 × 15  ✓' },
    ],
    concept:
      'En los problemas de edades, el tiempo transcurre igual para todos. Sumar t a cada edad y plantear la condición basta casi siempre.',
    trick:
      'La diferencia de edades nunca cambia: aquí siempre son 30 años. Si el padre es el triple, esos 30 son el doble del hijo, así que el hijo tendrá 15 y faltan 6 años.',
    distractors: {
      '1': 'Tanteaste: a los 44 y 14, 44 no es el triple de 14.',
      '2': 'Sumaste 10 a los dos sin comprobar la condición.',
      '3': 'A los 42 y 12, 42 no es el triple de 12.',
      '4': 'Usaste el cuádruple.',
    },
  },
  {
    chapter: 'Edades',
    stem: 'La edad que Julia tenía <b>hace 4 años</b> es la mitad de la que tendrá <b>dentro de 8</b>. ¿Cuántos años tiene hoy?',
    options: ['16 años', '20 años', '12 años', '24 años', '8 años'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Nombra la edad de HOY', p: 'Siempre conviene que la incógnita sea el presente: el pasado y el futuro se escriben a partir de él.', m: 'x = edad hoy' },
      {
        t: 'Escribe el pasado y el futuro',
        p: 'Hace 4 años se resta; dentro de 8 se suma.',
        m: 'Hace 4: x − 4\nDentro de 8: x + 8',
      },
      { t: 'Traduce «la mitad»', p: 'El pasado es la mitad del futuro, no al revés.', m: 'x − 4 = (x + 8) ÷ 2' },
      { t: 'Resuelve y comprueba', p: 'Multiplica por 2 para quitar la fracción.', m: '2x − 8 = x + 8\nx = 16\n12 = 24 ÷ 2  ✓' },
    ],
    concept:
      'Poner la incógnita en el presente evita signos confusos: el pasado resta y el futuro suma, siempre.',
    trick: 'Un cuadro Pasado–Presente–Futuro con una fila por persona convierte el problema en aritmética.',
    distractors: {
      '1': 'Invertiste la relación: pusiste el futuro como mitad del pasado.',
      '2': 'Resolviste con la mitad del presente.',
      '3': 'Duplicaste la respuesta.',
      '4': 'Confundiste la edad de hace 4 años con la de hoy.',
    },
  },
  {
    chapter: 'Edades',
    stem: 'Las edades de dos primos están en la razón <b>3 : 5</b>. Dentro de <b>6 años</b> la razón será <b>5 : 7</b>. ¿Qué edad tiene hoy el menor?',
    options: ['9 años', '15 años', '12 años', '6 años', '18 años'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Convierte la razón en edades',
        p: 'Que estén en razón 3 : 5 no significa que tengan 3 y 5 años, sino que son múltiplos de esos números por un mismo factor.',
        m: 'Menor = 3k\nMayor = 5k',
      },
      { t: 'Escribe las edades futuras', p: 'A los dos les pasan los mismos 6 años.', m: 'Menor: 3k + 6\nMayor: 5k + 6' },
      {
        t: 'Plantea la nueva razón',
        p: 'Una razón es una fracción: iguálala y multiplica en cruz.',
        m: '(3k + 6) / (5k + 6) = 5/7\n7(3k + 6) = 5(5k + 6)',
      },
      { t: 'Resuelve', p: 'Abre los paréntesis y junta las k.', m: '21k + 42 = 25k + 30\n12 = 4k  →  k = 3' },
      {
        t: 'Vuelve a la pregunta',
        p: 'k no es la edad: es el factor. El menor es 3k.',
        m: '3 × 3 = 9 años\nComprobación: 15/21 = 5/7  ✓',
      },
    ],
    concept:
      'Una razón se traduce introduciendo un factor común k. Al final hay que acordarse de que k no es la respuesta.',
    trick:
      'Multiplicar en cruz convierte cualquier igualdad de razones en una ecuación lineal. Es el único paso que hace falta memorizar.',
    distractors: {
      '1': 'Esa es la edad del mayor.',
      '2': 'Usaste k = 4.',
      '3': 'Respondiste con el valor de k, no con la edad.',
      '4': 'Usaste k = 6.',
    },
  },

  // ── Fracciones y porcentajes ──────────────────────────────────────────────
  {
    chapter: 'Fracciones y porcentajes',
    stem: '¿Cuánto es <span class="math">3/5</span> de <b>250</b>?',
    options: ['150', '125', '100', '200', '50'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Divide entre el denominador',
        p: 'Tomar tres quintos es partir en cinco y quedarse con tres. Primero hay que saber cuánto vale un quinto.',
        m: '250 ÷ 5 = 50',
      },
      { t: 'Multiplica por el numerador', p: 'Tres de esas cinco partes.', m: '50 × 3 = 150' },
    ],
    concept: '«De» significa multiplicar. Una fracción de una cantidad es dividir entre el denominador y multiplicar por el numerador.',
    trick: 'Divide siempre primero: los números salen más pequeños y se opera mentalmente.',
    distractors: {
      '1': 'Calculaste la mitad.',
      '2': 'Calculaste 2/5.',
      '3': 'Calculaste 4/5.',
      '4': 'Ese es un quinto: te faltó multiplicar por 3.',
    },
  },
  {
    chapter: 'Fracciones y porcentajes',
    stem: 'En un salón de <b>25 alumnos</b>, el <b>40 %</b> son mujeres. Si ingresan <b>5 mujeres más</b>, ¿qué porcentaje del salón serán mujeres?',
    options: ['50 %', '45 %', '60 %', '48 %', '55 %'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Convierte el porcentaje en personas', p: 'Trabajar con personas evita confundirse con las bases.', m: '40 % de 25 = 10 mujeres' },
      {
        t: 'Actualiza los DOS números',
        p: 'Aquí está la trampa: al entrar 5 mujeres cambia el número de mujeres y también el total del salón.',
        m: 'Mujeres: 10 + 5 = 15\nTotal: 25 + 5 = 30',
      },
      { t: 'Calcula el nuevo porcentaje', p: 'Divide la parte entre el nuevo total.', m: '15 ÷ 30 = 0,50  →  50 %' },
    ],
    concept:
      'Un porcentaje siempre se refiere a un total concreto. Si el total cambia, el porcentaje no se puede comparar con el anterior sin recalcularlo.',
    trick: 'Pásalo a cantidades, opera con cantidades y vuelve al porcentaje al final.',
    distractors: {
      '1': 'Sumaste 5 puntos porcentuales al 40 %.',
      '2': 'Dividiste 15 entre 25, olvidando que el total también creció.',
      '3': 'Usaste un total de 31.',
      '4': 'Promediaste sin calcular.',
    },
  },
  {
    chapter: 'Fracciones y porcentajes',
    stem: '<b>84</b> es el <b>70 %</b> de un número. ¿Cuál es ese número?',
    options: ['120', '140', '117,6', '100', '110'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Escribe la relación',
        p: 'El número desconocido es el total, y 84 es una parte de él.',
        m: '0,70 · N = 84',
      },
      { t: 'Despeja dividiendo', p: 'Para deshacer una multiplicación se divide.', m: 'N = 84 ÷ 0,70 = 120' },
      { t: 'Comprueba', p: 'El 70 % del resultado debe dar 84.', m: '120 × 0,70 = 84  ✓' },
    ],
    concept:
      'Si te dan la parte y el porcentaje, el total sale dividiendo. Si te dan el total, la parte sale multiplicando.',
    trick: 'El total siempre es mayor que la parte. Si tu respuesta es menor que 84, está mal sin necesidad de revisar la cuenta.',
    distractors: {
      '1': 'Dividiste entre 0,60.',
      '2': 'Le sumaste el 40 % a 84 en vez de dividir.',
      '3': 'Redondeaste sin operar.',
      '4': 'Sumaste 26.',
    },
  },
  {
    chapter: 'Fracciones y porcentajes',
    stem: 'El precio de un menú subió <b>20 %</b> en enero y bajó <b>15 %</b> en marzo. Si ahora cuesta <b>S/ 20,40</b>, ¿cuánto costaba antes de enero?',
    options: ['S/ 20', 'S/ 21', 'S/ 19,50', 'S/ 20,40', 'S/ 18'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Escribe los dos cambios como factores',
        p: 'Subir 20 % es ×1,20; bajar 15 % es ×0,85. Cada uno actúa sobre el resultado del anterior.',
        m: 'P × 1,20 × 0,85 = 20,40',
      },
      {
        t: 'Junta los factores',
        p: 'Los dos cambios equivalen a uno solo, y aquí sale un número muy limpio.',
        m: '1,20 × 0,85 = 1,02',
      },
      { t: 'Despeja', p: 'Divide entre el factor conjunto.', m: 'P = 20,40 ÷ 1,02 = 20' },
      {
        t: 'Comprueba de punta a punta',
        p: 'Recorre los dos cambios desde el precio hallado.',
        m: '20 × 1,20 = 24\n24 × 0,85 = 20,40  ✓',
      },
    ],
    concept:
      'Subir y bajar el mismo tipo de porcentaje no devuelve al precio original: subir 20 % y bajar 15 % deja un 2 % más caro.',
    trick:
      'Multiplica los factores primero y divide una sola vez. Deshacer los cambios de uno en uno duplica las ocasiones de equivocarse.',
    distractors: {
      '1': 'Deshiciste solo uno de los dos cambios.',
      '2': 'Restaste 5 % al precio actual.',
      '3': 'Supusiste que los dos cambios se cancelan.',
      '4': 'Dividiste entre 1,13.',
    },
  },

  // ── Operadores matemáticos ────────────────────────────────────────────────
  {
    chapter: 'Operadores matemáticos',
    stem: 'Se define <span class="math">a ∗ b = a + 2b</span>. Halla <span class="math">3 ∗ 5</span>.',
    options: ['13', '11', '8', '16', '10'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Identifica quién es quién',
        p: 'El primer número ocupa el lugar de a y el segundo el de b. El orden importa.',
        m: 'a = 3\nb = 5',
      },
      { t: 'Reemplaza en la definición', p: 'La regla es la que da el enunciado; no hay que recordar ninguna otra.', m: '3 + 2(5)' },
      { t: 'Opera', p: 'Multiplicación antes que suma.', m: '3 + 10 = 13' },
    ],
    concept:
      'Un operador nuevo es solo una receta. No hay nada que memorizar: se sustituye y se opera con las reglas de siempre.',
    trick: 'Escribe la definición otra vez debajo, con los números en lugar de las letras. Evita invertir a y b.',
    distractors: {
      '1': 'Calculaste 5 + 2(3): invertiste a y b.',
      '2': 'Sumaste 3 + 5.',
      '3': 'Calculaste 2(3 + 5).',
      '4': 'Multiplicaste 2 × 5 y olvidaste el 3.',
    },
  },
  {
    chapter: 'Operadores matemáticos',
    stem: 'Se define <span class="math">m # n = m² − n</span>. Halla <span class="math">4 # (2 # 3)</span>.',
    options: ['15', '13', '12', '16', '14'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Empieza por el paréntesis',
        p: 'Con operadores anidados se resuelve de dentro hacia fuera, igual que con las operaciones normales.',
        m: '2 # 3 = 2² − 3 = 4 − 3 = 1',
      },
      { t: 'Sustituye el resultado', p: 'El paréntesis ya vale 1.', m: '4 # 1' },
      { t: 'Aplica la regla otra vez', p: 'Ahora m = 4 y n = 1.', m: '4² − 1 = 16 − 1 = 15' },
    ],
    concept:
      'Los operadores anidados se resuelven de adentro hacia afuera. Cada paso deja un número que entra en el siguiente.',
    trick: 'Escribe el resultado del paréntesis encima de él antes de seguir. Así no se arrastra el error.',
    distractors: {
      '1': 'Calculaste 4² − 3, saltándote el paréntesis.',
      '2': 'Restaste 4.',
      '3': 'Olvidaste restar.',
      '4': 'Restaste 2.',
    },
  },
  {
    chapter: 'Operadores matemáticos',
    stem: 'Se define <span class="math">x△ = 3x − 1</span>. Halla <span class="math">(2△)△</span>.',
    options: ['14', '11', '15', '17', '8'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Resuelve el operador de dentro', p: 'Aquí el símbolo va detrás y actúa sobre un solo número.', m: '2△ = 3(2) − 1 = 5' },
      { t: 'Aplícalo al resultado', p: 'El 5 entra ahora como x.', m: '5△ = 3(5) − 1 = 14' },
    ],
    concept:
      'Un operador de un solo argumento se aplica tantas veces como símbolos haya, siempre de dentro hacia fuera.',
    trick: 'Cuenta los símbolos antes de empezar: te dice cuántas veces vas a aplicar la regla.',
    distractors: {
      '1': 'Aplicaste el operador una sola vez y sumaste 6.',
      '2': 'Olvidaste restar 1 en el segundo paso.',
      '3': 'Usaste 3x + 1.',
      '4': 'Aplicaste el operador solo una vez y sumaste 3.',
    },
  },
  {
    chapter: 'Operadores matemáticos',
    stem: 'Se define <span class="math">a ✻ b = (a + b)/2</span> si <span class="math">a &gt; b</span>, y <span class="math">a ✻ b = a · b</span> si <span class="math">a ≤ b</span>. Halla <span class="math">(6 ✻ 2) + (3 ✻ 5)</span>.',
    options: ['19', '23', '12', '16', '20'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Comprueba la condición en cada caso',
        p: 'La regla cambia según cuál de los dos números sea mayor. Este paso es obligatorio antes de calcular.',
        m: '6 > 2 → primera regla\n3 ≤ 5 → segunda regla',
      },
      { t: 'Resuelve el primer paréntesis', p: 'Como 6 es mayor que 2, se promedia.', m: '(6 + 2) ÷ 2 = 4' },
      { t: 'Resuelve el segundo', p: 'Como 3 no es mayor que 5, se multiplica.', m: '3 × 5 = 15' },
      { t: 'Suma', p: 'Ya son dos números normales.', m: '4 + 15 = 19' },
    ],
    concept:
      'Un operador definido por casos exige verificar la condición antes de operar. Aplicar la regla equivocada es el error que buscan estas preguntas.',
    trick: 'Anota al lado de cada paréntesis qué regla le toca, y recién entonces calcula.',
    distractors: {
      '1': 'Aplicaste la primera regla a los dos paréntesis.',
      '2': 'Aplicaste la segunda regla a los dos.',
      '3': 'Promediaste los dos resultados.',
      '4': 'Sumaste 5 en vez de 4 en el primero.',
    },
  },
  {
    chapter: 'Operadores matemáticos',
    stem: 'Se define <span class="math">a☆ = 2a + 3</span>. Halla <span class="math">((1☆)☆)☆</span>.',
    options: ['29', '13', '25', '17', '33'],
    answer: 0,
    difficulty: 3,
    steps: [
      { t: 'Cuenta cuántas veces se aplica', p: 'Hay tres símbolos, así que la regla se usa tres veces.', m: '' },
      { t: 'Primera aplicación', p: 'Empieza por el paréntesis más interno.', m: '1☆ = 2(1) + 3 = 5' },
      { t: 'Segunda', p: 'El 5 entra como a.', m: '5☆ = 2(5) + 3 = 13' },
      { t: 'Tercera', p: 'Y ahora el 13.', m: '13☆ = 2(13) + 3 = 29' },
    ],
    concept:
      'Aplicar un operador varias veces es iterar: la salida de un paso es la entrada del siguiente. No hay atajo, pero tampoco dificultad si se lleva el orden.',
    trick:
      'Escribe los resultados en columna, uno debajo de otro. Intentarlo de memoria es donde se pierde el punto, no en la cuenta.',
    distractors: {
      '1': 'Te detuviste en la segunda aplicación.',
      '2': 'Usaste 2a + 1 en el último paso.',
      '3': 'Aplicaste el operador dos veces y sumaste 4.',
      '4': 'Usaste 2a + 5.',
    },
  },

  // ── Conteo de figuras ─────────────────────────────────────────────────────
  {
    chapter: 'Conteo de figuras',
    stem: 'En un triángulo grande se traza <b>una sola línea</b> desde un vértice hasta el lado opuesto, partiéndolo en dos. ¿Cuántos triángulos hay en total en la figura?',
    options: ['3', '2', '4', '1', '5'],
    answer: 0,
    difficulty: 1,
    steps: [
      { t: 'Cuenta los triángulos simples', p: 'La línea deja dos triángulos pequeños, uno a cada lado.', m: '2 triángulos simples' },
      {
        t: 'No olvides el que los contiene',
        p: 'El triángulo grande original sigue siendo un triángulo. Es el que casi todo el mundo se salta.',
        m: '+ 1 triángulo grande',
      },
      { t: 'Suma', p: 'Simples más compuestos.', m: '2 + 1 = 3' },
    ],
    concept:
      'Contar figuras es contar las simples y después las que se forman al juntarlas. La figura completa siempre cuenta.',
    trick: 'Cuenta por tamaños: primero las de una pieza, luego las de dos, luego las de tres. Así no se repite ni se olvida ninguna.',
    distractors: {
      '1': 'Contaste solo los pequeños y olvidaste el grande.',
      '2': 'Contaste un triángulo de más.',
      '3': 'Contaste solo la figura completa.',
      '4': 'Contaste también regiones que no son triángulos.',
    },
  },
  {
    chapter: 'Conteo de figuras',
    stem: 'Un cuadrado se divide en <b>4 cuadraditos iguales</b> (dos filas y dos columnas). ¿Cuántos cuadrados se pueden contar en total?',
    options: ['5', '4', '6', '8', '9'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Cuenta los de una pieza', p: 'Son los cuadraditos en que quedó dividido.', m: '4 cuadrados de 1×1' },
      {
        t: 'Busca los que se forman al juntar',
        p: 'Con dos filas y dos columnas solo cabe uno de 2×2: el cuadrado original.',
        m: '1 cuadrado de 2×2',
      },
      { t: 'Suma', p: 'No hay más tamaños posibles.', m: '4 + 1 = 5' },
    ],
    concept:
      'En una cuadrícula hay cuadrados de todos los tamaños que quepan, no solo los más pequeños.',
    trick: 'Recorre los tamaños de menor a mayor y para cuando el siguiente ya no quepa.',
    distractors: {
      '1': 'Contaste solo los de 1×1.',
      '2': 'Contaste rectángulos que no son cuadrados.',
      '3': 'Contaste todos los rectángulos.',
      '4': 'Confundiste con una cuadrícula de 3×3.',
    },
  },
  {
    chapter: 'Conteo de figuras',
    stem: 'La reja de una fachada está formada por una cuadrícula de <b>3 × 3</b> cuadraditos. ¿Cuántos cuadrados se pueden contar en total?',
    options: ['14', '9', '10', '13', '15'],
    answer: 0,
    difficulty: 2,
    steps: [
      { t: 'Cuenta por tamaños, de menor a mayor', p: 'Es el método que garantiza no repetir ni olvidar.', m: '' },
      { t: 'Los de 1×1', p: 'Son los cuadraditos de la cuadrícula.', m: '3 × 3 = 9' },
      {
        t: 'Los de 2×2',
        p: 'Un cuadrado de 2×2 puede apoyar su esquina en 2 posiciones a lo ancho y 2 a lo alto.',
        m: '2 × 2 = 4',
      },
      { t: 'Los de 3×3', p: 'Solo cabe uno: la reja entera.', m: '1' },
      { t: 'Suma', p: 'Los tres tamaños posibles.', m: '9 + 4 + 1 = 14' },
    ],
    concept:
      'En una cuadrícula de n×n, los cuadrados de lado k son (n − k + 1)². El total es la suma de los cuadrados de 1 hasta n.',
    trick:
      'Para 3×3 son 9 + 4 + 1 = 14; para 4×4, 16 + 9 + 4 + 1 = 30. Es siempre la suma de cuadrados hacia abajo.',
    distractors: {
      '1': 'Contaste solo los de 1×1.',
      '2': 'Olvidaste tres de los de 2×2.',
      '3': 'Olvidaste el cuadrado grande.',
      '4': 'Contaste un cuadrado de más.',
    },
  },
  {
    chapter: 'Conteo de figuras',
    stem: 'Sobre una recta se marcan <b>6 puntos</b>. ¿Cuántos segmentos distintos quedan determinados?',
    options: ['15', '6', '5', '21', '30'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Entiende qué define un segmento',
        p: 'Cada segmento queda fijado por sus dos extremos. Elegir dos puntos es elegir un segmento.',
        m: '',
      },
      {
        t: 'Cuenta las parejas posibles',
        p: 'El primer punto se puede emparejar con 5, el segundo con 4 que aún no se usaron, y así.',
        m: '5 + 4 + 3 + 2 + 1 = 15',
      },
      {
        t: 'Compruébalo con la fórmula',
        p: 'Es el número de parejas de 6 elementos.',
        m: '6 × 5 ÷ 2 = 15',
      },
    ],
    concept:
      'Contar segmentos entre puntos alineados es contar parejas. Con n puntos son n(n − 1)/2.',
    trick: 'Divide entre 2 al final: el segmento AB y el BA son el mismo, y sin dividir se cuenta doble.',
    distractors: {
      '1': 'Contaste los puntos, no los segmentos.',
      '2': 'Contaste solo los segmentos entre puntos vecinos.',
      '3': 'Olvidaste dividir entre 2.',
      '4': 'Multiplicaste 6 × 5.',
    },
  },
  {
    chapter: 'Conteo de figuras',
    stem: 'Desde un vértice de un triángulo se trazan <b>3 líneas</b> hasta el lado opuesto, dividiéndolo en cuatro partes. ¿Cuántos triángulos hay en la figura?',
    options: ['10', '6', '8', '12', '4'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Mira qué define cada triángulo',
        p: 'Todos comparten el mismo vértice de arriba. Lo único que cambia es dónde empieza y dónde termina en la base.',
        m: '',
      },
      {
        t: 'Cuenta los puntos de la base',
        p: 'Las 3 líneas parten la base en 4 tramos, así que sobre ella hay 5 puntos: los 2 extremos y los 3 de corte.',
        m: '5 puntos sobre la base',
      },
      {
        t: 'Elegir 2 de esos puntos es elegir un triángulo',
        p: 'Cada pareja de puntos, junto con el vértice de arriba, forma exactamente un triángulo.',
        m: '5 × 4 ÷ 2 = 10',
      },
      {
        t: 'Comprueba contando por tamaños',
        p: 'Da lo mismo por el camino largo.',
        m: '4 + 3 + 2 + 1 = 10  ✓',
      },
    ],
    concept:
      'Muchos conteos se convierten en «elegir dos de n». Reconocer esa estructura evita dibujar y contar a mano.',
    trick:
      'Con k cevianas desde un mismo vértice hay (k+2)(k+1)/2 triángulos. Con 3 cevianas, 5 × 4 ÷ 2 = 10.',
    distractors: {
      '1': 'Contaste solo los de uno y dos tramos.',
      '2': 'Olvidaste los de tres tramos.',
      '3': 'Contaste algunas figuras dos veces.',
      '4': 'Contaste solo los triángulos simples.',
    },
  },

  // ── Certezas y probabilidad ───────────────────────────────────────────────
  {
    chapter: 'Certezas y probabilidad',
    stem: 'En una urna hay <b>5 bolas rojas</b> y <b>3 azules</b>. Se saca una al azar. ¿Cuál es la probabilidad de que sea roja?',
    options: ['5/8', '3/8', '5/3', '1/2', '3/5'],
    answer: 0,
    difficulty: 1,
    steps: [
      { t: 'Cuenta los casos favorables', p: 'Son las bolas que cumplen lo que se pide.', m: '5 rojas' },
      {
        t: 'Cuenta todos los casos posibles',
        p: 'El denominador es el total de bolas, no solo las del otro color.',
        m: '5 + 3 = 8 bolas',
      },
      { t: 'Divide', p: 'Favorables entre posibles.', m: '5/8' },
    ],
    concept:
      'Probabilidad es favorables entre posibles. El denominador es siempre el total, y por eso el resultado nunca pasa de 1.',
    trick: 'Si tu fracción es mayor que 1, pusiste mal el denominador. Una probabilidad siempre está entre 0 y 1.',
    distractors: {
      '1': 'Esa es la probabilidad de sacar azul.',
      '2': 'Dividiste rojas entre azules: eso es una razón, no una probabilidad.',
      '3': 'Supusiste que había la misma cantidad de cada color.',
      '4': 'Invertiste la fracción.',
    },
  },
  {
    chapter: 'Certezas y probabilidad',
    stem: 'En un cajón hay <b>6 pares de medias negras</b> y <b>4 pares de medias blancas</b>, todas sueltas y mezcladas. A oscuras, ¿cuántas medias hay que sacar para tener la <b>certeza</b> de formar un par del mismo color?',
    options: ['3', '2', '11', '13', '5'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Certeza no es suerte',
        p: 'La pregunta no es cuántas bastan con buena suerte, sino cuántas garantizan el resultado incluso en el peor caso posible.',
        m: '',
      },
      {
        t: 'Imagina el peor caso',
        p: 'Lo más desafortunado es sacar una de cada color: dos medias y ningún par.',
        m: '1 negra + 1 blanca = 2, sin par',
      },
      {
        t: 'Saca una más',
        p: 'Solo hay dos colores, así que la tercera repite forzosamente uno de los dos.',
        m: '2 + 1 = 3 medias',
      },
    ],
    concept:
      'En los problemas de certeza se razona sobre el peor caso: cuántas extracciones garantizan el resultado aunque todo salga mal.',
    trick:
      'Con k colores, para asegurar un par hacen falta k + 1. El número total de medias no interviene, solo la cantidad de colores.',
    distractors: {
      '1': 'Con dos podrías sacar una de cada color y quedarte sin par.',
      '2': 'Contaste todas las negras más una.',
      '3': 'Contaste casi todo el cajón.',
      '4': 'Usaste cuatro colores.',
    },
  },
  {
    chapter: 'Certezas y probabilidad',
    stem: 'En la tómbola del colegio hay <b>40 boletos</b>, de los cuales <b>6</b> están premiados. Compras <b>uno</b>. ¿Cuál es la probabilidad de <b>no</b> ganar?',
    options: ['17/20', '3/20', '1/20', '7/20', '6/34'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Cuenta los boletos sin premio',
        p: 'Lo que se pide es no ganar, así que los favorables son los que no tienen premio.',
        m: '40 − 6 = 34 boletos',
      },
      { t: 'Divide entre el total', p: 'El denominador sigue siendo el total de boletos.', m: '34/40' },
      { t: 'Simplifica', p: 'Ambos son divisibles entre 2.', m: '34/40 = 17/20' },
    ],
    concept:
      'La probabilidad de que algo no ocurra es 1 menos la probabilidad de que ocurra. Las dos siempre suman 1.',
    trick: 'Atajo: ganar es 6/40 = 3/20, así que no ganar es 1 − 3/20 = 17/20.',
    distractors: {
      '1': 'Esa es la probabilidad de ganar.',
      '2': 'Usaste un solo boleto premiado.',
      '3': 'Usaste 14 boletos premiados.',
      '4': 'Pusiste los premiados sobre los no premiados.',
    },
  },
  {
    chapter: 'Certezas y probabilidad',
    stem: 'En una caja hay <b>8 fichas rojas</b>, <b>5 azules</b> y <b>3 verdes</b>. ¿Cuántas fichas hay que extraer al azar para tener la <b>certeza</b> de obtener al menos una verde?',
    options: ['14', '3', '13', '16', '4'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Piensa en el peor caso',
        p: 'La mala suerte máxima es sacar todas las fichas que no sirven antes de tocar una verde.',
        m: '',
      },
      {
        t: 'Cuenta las que no sirven',
        p: 'Son todas las rojas y todas las azules.',
        m: '8 + 5 = 13 fichas sin ser verdes',
      },
      {
        t: 'Una más lo garantiza',
        p: 'Agotadas las otras, la siguiente solo puede ser verde.',
        m: '13 + 1 = 14 fichas',
      },
    ],
    concept:
      'Para asegurar un color concreto hay que contar con agotar primero todos los demás. Cuántas haya de ese color no cambia la respuesta.',
    trick: 'Suma todo lo que NO quieres y añade uno. Que haya 3 verdes o 30 no altera el resultado.',
    distractors: {
      '1': 'Esa es la cantidad de verdes que hay, no las extracciones necesarias.',
      '2': 'Con 13 podrías haber sacado justo todas las rojas y azules, y ninguna verde.',
      '3': 'Contaste todas las fichas de la caja.',
      '4': 'Sumaste uno a la cantidad de verdes.',
    },
  },
  {
    chapter: 'Certezas y probabilidad',
    stem: 'Se lanzan <b>dos dados</b> comunes. ¿Cuál es la probabilidad de que la suma de sus caras sea <b>8</b>?',
    options: ['5/36', '1/6', '1/9', '6/36', '2/12'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Cuenta todos los resultados posibles',
        p: 'Los dados son distinguibles: cada uno tiene 6 caras y actúan de forma independiente.',
        m: '6 × 6 = 36 resultados',
      },
      {
        t: 'Enumera los que suman 8',
        p: 'Conviene listarlos en orden para no saltarse ninguno ni repetir. (2,6) y (6,2) son resultados distintos.',
        m: '(2,6) (3,5) (4,4) (5,3) (6,2)\n= 5 casos',
      },
      { t: 'Divide', p: 'Favorables entre posibles.', m: '5/36' },
    ],
    concept:
      'Con dos dados hay 36 resultados, no 21: el orden importa aunque los dados parezcan iguales. Es la fuente de error más común del tema.',
    trick:
      'Recorre el primer dado de 1 a 6 y mira si el segundo puede completar la suma. Con el 1 no se llega a 8, así que empiezas en el 2.',
    distractors: {
      '1': 'Contaste 6 casos favorables.',
      '2': 'Usaste 21 resultados posibles, tratando (2,6) y (6,2) como el mismo.',
      '3': 'Contaste un caso de más.',
      '4': 'Usaste 12 resultados posibles, sumando las caras en vez de combinarlas.',
    },
  },

  // ── Cronometría ───────────────────────────────────────────────────────────
  {
    chapter: 'Cronometría',
    stem: '¿Qué ángulo forman las manecillas de un reloj a las <b>3:00</b> en punto?',
    options: ['90°', '60°', '120°', '45°', '30°'],
    answer: 0,
    difficulty: 1,
    steps: [
      {
        t: 'Reparte la esfera',
        p: 'La circunferencia completa son 360° repartidos en 12 horas.',
        m: '360° ÷ 12 = 30° por hora',
      },
      {
        t: 'Cuenta las divisiones entre las manecillas',
        p: 'A las 3:00 el minutero está en el 12 y la horaria en el 3: tres divisiones de por medio.',
        m: '3 × 30° = 90°',
      },
    ],
    concept: 'Cada hora del reloj abarca 30° y cada minuto 6°. Con esos dos números se resuelve todo el capítulo.',
    trick: 'Las 3:00 y las 9:00 forman ángulo recto; las 6:00, uno llano. Sirven de referencia para descartar.',
    distractors: {
      '1': 'Contaste dos divisiones.',
      '2': 'Contaste cuatro divisiones.',
      '3': 'Usaste 15° por hora.',
      '4': 'Contaste una sola división.',
    },
  },
  {
    chapter: 'Cronometría',
    stem: '¿Qué ángulo forman las manecillas de un reloj a las <b>4:20</b>?',
    options: ['10°', '20°', '0°', '30°', '15°'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Ubica el minutero',
        p: 'Cada minuto son 6°, contados desde el 12.',
        m: '20 × 6° = 120°',
      },
      {
        t: 'Ubica la horaria, y no la dejes quieta',
        p: 'A las 4:20 la horaria ya pasó del 4: avanza 0,5° por minuto. Este es el paso que casi todos se saltan.',
        m: '4 × 30° = 120°\n20 × 0,5° = 10°\nTotal: 130°',
      },
      { t: 'Resta las dos posiciones', p: 'El ángulo entre ellas es la diferencia.', m: '130° − 120° = 10°' },
    ],
    concept:
      'La manecilla horaria se mueve continuamente, no salta de hora en hora. Olvidarlo es el error clásico de cronometría.',
    trick:
      'Fórmula directa: |30·H − 5,5·M|. Aquí |120 − 110| = 10°. Ahorra los dos primeros pasos.',
    distractors: {
      '1': 'Dejaste la horaria quieta en el 4.',
      '2': 'Supusiste que coinciden.',
      '3': 'Contaste una división entera.',
      '4': 'Usaste 0,25° por minuto.',
    },
  },
  {
    chapter: 'Cronometría',
    stem: 'Un reloj de pared se <b>adelanta 3 minutos cada hora</b>. Si se puso en hora a las <b>6:00 a. m.</b>, ¿qué hora marcará cuando la hora real sea la <b>2:00 p. m.</b>?',
    options: ['2:24 p. m.', '1:36 p. m.', '2:18 p. m.', '2:30 p. m.', '3:00 p. m.'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Cuenta las horas reales transcurridas',
        p: 'De 6 a. m. a 2 p. m. hay ocho horas.',
        m: '6 a. m. → 2 p. m. = 8 horas',
      },
      { t: 'Calcula el adelanto acumulado', p: 'Gana 3 minutos por cada hora que pasa.', m: '8 × 3 = 24 minutos' },
      {
        t: 'Súmalo a la hora real',
        p: 'Se adelanta, así que marca de más.',
        m: '2:00 p. m. + 24 min = 2:24 p. m.',
      },
    ],
    concept:
      'Un reloj descompuesto acumula su error de forma proporcional al tiempo que pasa. Adelantarse suma; atrasarse resta.',
    trick: 'Comprueba el sentido antes de responder: un reloj adelantado marca una hora mayor que la real, nunca menor.',
    distractors: {
      '1': 'Restaste el error en vez de sumarlo: eso haría un reloj atrasado.',
      '2': 'Usaste 6 horas en lugar de 8.',
      '3': 'Redondeaste a la media hora.',
      '4': 'Sumaste una hora entera.',
    },
  },
  {
    chapter: 'Cronometría',
    stem: '¿Cuántas veces se <b>superponen</b> las manecillas de un reloj en <b>12 horas</b>?',
    options: ['11', '12', '24', '10', '22'],
    answer: 0,
    difficulty: 2,
    steps: [
      {
        t: 'Cuenta las vueltas de cada manecilla',
        p: 'En doce horas el minutero da doce vueltas completas y la horaria solo una.',
        m: 'Minutero: 12 vueltas\nHoraria: 1 vuelta',
      },
      {
        t: 'Cuenta cuántas veces la alcanza',
        p: 'El minutero le saca once vueltas de ventaja, y cada vez que le saca una vuelta la ha alcanzado una vez.',
        m: '12 − 1 = 11 encuentros',
      },
      {
        t: 'Comprueba con un caso conocido',
        p: 'Entre las 11 y las 12 no hay superposición: se juntan justo a las 12:00, que ya se contó.',
        m: '11 veces en 12 horas',
      },
    ],
    concept:
      'Cuando dos móviles giran en el mismo sentido, los encuentros dependen de la diferencia de vueltas, no de la suma.',
    trick: 'En 12 horas se superponen 11 veces y forman ángulo recto 22. En un día completo, el doble.',
    distractors: {
      '1': 'Supusiste una superposición por hora, pero entre las 11 y las 12 no hay ninguna.',
      '2': 'Ese es el número de veces en 24 horas... y tampoco: son 22.',
      '3': 'Descontaste una de más.',
      '4': 'Ese es el número de veces que forman ángulo recto.',
    },
  },
  {
    chapter: 'Cronometría',
    stem: '¿A qué hora, entre las <b>3</b> y las <b>4</b>, se superponen exactamente las manecillas del reloj?',
    options: ['3:16 4/11', '3:15', '3:16', '3:20', '3:18'],
    answer: 0,
    difficulty: 3,
    steps: [
      {
        t: 'Escribe dónde está cada manecilla',
        p: 'Ambas se miden en grados desde el 12, en función de los minutos transcurridos.',
        m: 'Minutero: 6M grados\nHoraria: 90 + 0,5M grados',
      },
      {
        t: 'Superponerse es estar en el mismo sitio',
        p: 'Igualar las dos posiciones es toda la condición.',
        m: '6M = 90 + 0,5M',
      },
      { t: 'Despeja los minutos', p: 'Junta los términos con M.', m: '5,5M = 90\nM = 90 ÷ 5,5 = 180/11' },
      {
        t: 'Convierte a minutos y fracción',
        p: 'No cae en un minuto exacto, y por eso 3:15 es la alternativa trampa: a esa hora la horaria ya se movió.',
        m: '180/11 = 16 + 4/11 minutos\n→ 3:16 4/11',
      },
    ],
    concept:
      'El minutero gana 5,5° por minuto a la horaria. Con ese dato se resuelven todas las preguntas de superposición y de ángulos.',
    trick:
      'Los encuentros se dan cada 720/11 ≈ 65 min 27 s, no cada 60. Por eso casi nunca caen en un minuto redondo.',
    distractors: {
      '1': 'A las 3:15 la horaria ya avanzó 7,5°: el minutero todavía no la alcanza.',
      '2': 'Redondeaste y perdiste la fracción, que es justo lo que se pregunta.',
      '3': 'Tanteaste sin plantear la ecuación.',
      '4': 'Usaste 5° de ganancia por minuto en vez de 5,5°.',
    },
  },
];
