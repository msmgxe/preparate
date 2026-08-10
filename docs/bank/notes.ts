/**
 * Qué entrena cada capítulo, en un párrafo.
 *
 * Lo lee el alumno en el briefing, antes de empezar la sesión. No es un
 * temario: dice qué habilidad se ejercita y, sobre todo, **qué error concreto**
 * ataca el capítulo. Saber contra qué se practica cambia cómo se practica.
 *
 * Se identifica por el título del capítulo en español, igual que el balotario.
 */
export type ChapterNote = { chapter: string; es: string; en: string; pt: string };

export const NOTES: ChapterNote[] = [
  // ── Razonamiento Matemático ───────────────────────────────────────────────
  {
    chapter: 'Sucesiones y series',
    es: 'Ninguna sucesión de examen es aleatoria. Aquí entrenas a encontrar la regla: restar términos vecinos, y si eso no basta, dividir o separar dos sucesiones entrelazadas. El error clásico es quedarse en la primera fila de diferencias y forzar una respuesta.',
    en: 'No exam sequence is random. Here you train to find the rule: subtract neighbouring terms, and if that is not enough, divide or split two interleaved sequences. The classic mistake is stopping at the first row of differences and forcing an answer.',
    pt: 'Nenhuma sequência de prova é aleatória. Aqui você treina a encontrar a regra: subtrair termos vizinhos e, se não bastar, dividir ou separar duas sequências entrelaçadas. O erro clássico é parar na primeira linha de diferenças e forçar uma resposta.',
  },
  {
    chapter: 'Planteo de ecuaciones',
    es: 'La mitad del trabajo es traducir del castellano al álgebra; la otra mitad, responder lo que preguntan. Entrenas a nombrar la incógnita, escribir la condición y comprobar contra el enunciado. Muchas preguntas piden una diferencia, no un total.',
    en: 'Half the work is translating from words into algebra; the other half is answering what was actually asked. You train to name the unknown, write the condition and check it against the wording. Many questions ask for a difference, not a total.',
    pt: 'Metade do trabalho é traduzir do português para a álgebra; a outra metade é responder o que perguntam. Você treina a nomear a incógnita, escrever a condição e conferir com o enunciado. Muitas questões pedem uma diferença, não um total.',
  },
  {
    chapter: 'Edades',
    es: 'Todo se resuelve con un cuadro de pasado, presente y futuro. La clave es poner la incógnita en el presente y recordar que a todos les pasa el mismo tiempo. Y que la diferencia de edades nunca cambia: ese dato resuelve solo la mitad de las preguntas.',
    en: 'Everything is solved with a past–present–future table. The key is putting the unknown in the present and remembering that the same time passes for everyone. And that the age gap never changes: that fact alone solves half the questions.',
    pt: 'Tudo se resolve com um quadro de passado, presente e futuro. A chave é colocar a incógnita no presente e lembrar que o mesmo tempo passa para todos. E que a diferença de idades nunca muda: esse dado sozinho resolve metade das questões.',
  },
  {
    chapter: 'Fracciones y porcentajes',
    es: 'El capítulo que más aparece en la vida real y en el examen. Entrenas a pensar en lo que queda —un 20 % de descuento deja el 80 %— y a no sumar nunca porcentajes encadenados. Ojo con los enunciados donde el total también cambia.',
    en: 'The chapter that shows up most in real life and on the exam. You train to think in terms of what is left — a 20% discount leaves 80% — and never to add chained percentages. Watch out for wording where the total changes too.',
    pt: 'O capítulo que mais aparece na vida real e na prova. Você treina a pensar no que sobra — 20 % de desconto deixa 80 % — e a nunca somar porcentagens encadeadas. Atenção aos enunciados em que o total também muda.',
  },
  {
    chapter: 'Operadores matemáticos',
    es: 'No hay nada que memorizar: el enunciado te da la regla y tú la aplicas. Entrenas a sustituir con cuidado, a resolver de dentro hacia fuera cuando hay paréntesis y a verificar la condición cuando el operador cambia según los valores.',
    en: 'There is nothing to memorise: the question gives you the rule and you apply it. You train to substitute carefully, to work from the inside out when there are brackets, and to check the condition when the operator changes with the values.',
    pt: 'Não há nada para decorar: o enunciado dá a regra e você a aplica. Você treina a substituir com cuidado, a resolver de dentro para fora quando há parênteses e a verificar a condição quando o operador muda conforme os valores.',
  },
  {
    chapter: 'Conteo de figuras',
    es: 'Contar por tamaños, de menor a mayor, y no olvidar la figura completa. Cuando la cuenta se vuelve larga, casi siempre se convierte en «elegir dos de n». Reconocer esa estructura te ahorra dibujar y contar a mano.',
    en: 'Count by size, smallest first, and never forget the whole figure. When the count gets long, it almost always turns into "choose two out of n". Spotting that structure saves you from drawing and counting by hand.',
    pt: 'Conte por tamanhos, do menor ao maior, e não esqueça a figura inteira. Quando a contagem fica longa, quase sempre vira «escolher dois entre n». Reconhecer essa estrutura poupa desenhar e contar na mão.',
  },
  {
    chapter: 'Certezas y probabilidad',
    es: 'Dos ideas que se confunden. La probabilidad es favorables entre posibles; la certeza pregunta cuántas extracciones garantizan el resultado en el peor caso, aunque todo salga mal. Aquí practicas a distinguirlas antes de calcular.',
    en: 'Two ideas that get mixed up. Probability is favourable over possible; certainty asks how many draws guarantee the outcome in the worst case, even if everything goes wrong. Here you practise telling them apart before calculating.',
    pt: 'Duas ideias que se confundem. Probabilidade é favoráveis sobre possíveis; certeza pergunta quantas retiradas garantem o resultado no pior caso, mesmo que tudo dê errado. Aqui você pratica distingui-las antes de calcular.',
  },
  {
    chapter: 'Cronometría',
    es: 'Dos números resuelven casi todo: cada hora del reloj son 30° y cada minuto, 6°. El error que más se repite es dejar quieta la manecilla horaria: a las 4:20 ya avanzó diez grados desde el 4.',
    en: 'Two numbers solve almost everything: each hour on the dial is 30° and each minute is 6°. The most repeated mistake is leaving the hour hand still: at 4:20 it has already moved ten degrees past the 4.',
    pt: 'Dois números resolvem quase tudo: cada hora do relógio são 30° e cada minuto, 6°. O erro mais repetido é deixar o ponteiro das horas parado: às 4:20 ele já avançou dez graus além do 4.',
  },

  // ── Aptitud Verbal ────────────────────────────────────────────────────────
  {
    chapter: 'Comprensión lectora',
    es: 'Textos con varias preguntas colgando, como en el examen real. Entrenas cuatro cosas distintas: encontrar un dato explícito, deducir sin añadir nada de fuera, entender una palabra por su contexto y reconocer la intención del autor.',
    en: 'Passages with several questions hanging off them, as in the real exam. You train four different things: finding an explicit fact, deducing without adding anything from outside, understanding a word from its context, and recognising the author intention.',
    pt: 'Textos com várias questões penduradas, como na prova real. Você treina quatro coisas distintas: encontrar um dado explícito, deduzir sem acrescentar nada de fora, entender uma palavra pelo contexto e reconhecer a intenção do autor.',
  },
  {
    chapter: 'Analogías',
    es: 'La analogía no se adivina: se redacta. Entrenas a nombrar la relación con una frase completa antes de mirar las alternativas, y a endurecerla con un matiz cuando dos parecen encajar. El orden del par es tan obligatorio como la relación.',
    en: 'You do not guess an analogy: you word it. You train to name the relationship in a full sentence before looking at the options, and to harden it with a nuance when two seem to fit. The order of the pair is as mandatory as the relationship.',
    pt: 'A analogia não se adivinha: se redige. Você treina a nomear a relação com uma frase completa antes de olhar as alternativas e a endurecê-la com uma nuance quando duas parecem encaixar. A ordem do par é tão obrigatória quanto a relação.',
  },
  {
    chapter: 'Sinónimos y antónimos',
    es: 'Aquí no basta con saber qué significa la palabra: hay que medir también su carga. Obstinado y decidido describen la misma conducta y solo uno reprocha. Y en los antónimos, los distractores casi siempre son sinónimos de la palabra base.',
    en: 'Knowing what a word means is not enough here: you also have to weigh its charge. Stubborn and determined describe the same behaviour and only one is a reproach. And in antonyms, the distractors are almost always synonyms of the base word.',
    pt: 'Aqui não basta saber o que a palavra significa: é preciso medir também sua carga. Obstinado e decidido descrevem a mesma conduta e só um é reprovação. E nos antônimos, os distratores quase sempre são sinônimos da palavra base.',
  },
  {
    chapter: 'Término excluido',
    es: 'Se resuelve nombrando el criterio que une a los demás, no señalando la palabra rara. Entrenas a afinar ese criterio hasta que sobre exactamente uno, y a elegir el más esencial cuando dos compiten.',
    en: 'It is solved by naming the criterion that unites the rest, not by pointing at the odd word. You train to sharpen that criterion until exactly one is left over, and to pick the most essential one when two compete.',
    pt: 'Resolve-se nomeando o critério que une os demais, não apontando a palavra estranha. Você treina a afinar esse critério até sobrar exatamente um, e a escolher o mais essencial quando dois competem.',
  },
  {
    chapter: 'Conectores lógicos',
    es: 'El conector dice qué relación hay entre dos ideas: causa, consecuencia u oposición. Entrenas a decidir la relación primero y buscar la palabra después. Con varios espacios, basta que uno falle para descartar la alternativa entera.',
    en: 'A connective states the relationship between two ideas: cause, consequence or opposition. You train to decide the relationship first and look for the word afterwards. With several blanks, one failure is enough to discard the whole option.',
    pt: 'O conectivo diz qual é a relação entre duas ideias: causa, consequência ou oposição. Você treina a decidir a relação primeiro e buscar a palavra depois. Com vários espaços, basta um falhar para descartar a alternativa inteira.',
  },
  {
    chapter: 'Plan de redacción',
    es: 'Ordenar no es intuición. Entrenas a buscar la oración que define, a seguir la línea del tiempo y, sobre todo, a detectar los enlaces obligados: «ese», «por eso», «desde entonces». Cada uno fija una pareja y con dos el orden se cierra solo.',
    en: 'Ordering is not intuition. You train to find the sentence that defines, to follow the timeline and, above all, to spot the forced links: "that", "therefore", "since then". Each one fixes a pair, and with two the order closes by itself.',
    pt: 'Ordenar não é intuição. Você treina a buscar a frase que define, a seguir a linha do tempo e, sobretudo, a detectar os elos obrigatórios: «esse», «por isso», «desde então». Cada um fixa um par e, com dois, a ordem se fecha sozinha.',
  },
  {
    chapter: 'Oraciones incompletas',
    es: 'La respuesta siempre está dentro de la propia oración: hay una pista que orienta el sentido de lo que falta. Con dos espacios, el conector manda. Y si los dos huecos dicen lo mismo, la frase no informa nada: eso descarta la alternativa.',
    en: 'The answer is always inside the sentence itself: there is a clue that steers the sense of what is missing. With two blanks, the connective rules. And if both blanks say the same thing, the sentence informs nothing: that discards the option.',
    pt: 'A resposta está sempre dentro da própria frase: há uma pista que orienta o sentido do que falta. Com dois espaços, quem manda é o conectivo. E se os dois vazios dizem o mesmo, a frase não informa nada: isso descarta a alternativa.',
  },

  // ── Matemática ────────────────────────────────────────────────────────────
  {
    chapter: 'Aritmética comercial',
    es: 'Descuentos, márgenes e impuestos: la matemática del dinero. Entrenas a distinguir un margen sobre el costo de uno sobre la venta, a deshacer un porcentaje dividiendo y a encadenar factores en lugar de sumar porcentajes.',
    en: 'Discounts, margins and taxes: the mathematics of money. You train to tell a margin on cost from one on sale price, to undo a percentage by dividing, and to chain factors instead of adding percentages.',
    pt: 'Descontos, margens e impostos: a matemática do dinheiro. Você treina a distinguir uma margem sobre o custo de uma sobre a venda, a desfazer uma porcentagem dividindo e a encadear fatores em vez de somar porcentagens.',
  },
  {
    chapter: 'Álgebra básica',
    es: 'Ecuaciones, productos notables y factorización. La idea de fondo es simplificar antes de sustituir: la mayoría de las cuentas largas se vuelven sumas si reconoces una diferencia de cuadrados a tiempo.',
    en: 'Equations, notable products and factoring. The underlying idea is to simplify before substituting: most long calculations turn into sums if you spot a difference of squares in time.',
    pt: 'Equações, produtos notáveis e fatoração. A ideia de fundo é simplificar antes de substituir: a maioria das contas longas vira soma se você reconhecer uma diferença de quadrados a tempo.',
  },
  {
    chapter: 'Sistemas de ecuaciones',
    es: 'Dos incógnitas piden dos ecuaciones. Entrenas a escribirlas por separado —una cuenta unidades y otra cuenta dinero—, a elegir entre sustituir y eliminar, y a reconocer cuándo un sistema no tiene ninguna solución.',
    en: 'Two unknowns call for two equations. You train to write them separately — one counts units and the other counts money — to choose between substitution and elimination, and to recognise when a system has no solution at all.',
    pt: 'Duas incógnitas pedem duas equações. Você treina a escrevê-las separadamente — uma conta unidades e a outra conta dinheiro —, a escolher entre substituir e eliminar, e a reconhecer quando um sistema não tem nenhuma solução.',
  },
  {
    chapter: 'Proporcionalidad',
    es: 'Antes de calcular, una pregunta: si aumento esto, ¿lo otro sube o baja? Eso decide si multiplicas o divides. Entrenas la regla de tres simple, la inversa, el reparto proporcional y la compuesta, donde cada magnitud aporta su propia fracción.',
    en: 'Before calculating, one question: if I increase this, does the other go up or down? That decides whether you multiply or divide. You train direct and inverse rule of three, proportional sharing, and the compound case, where each quantity brings its own fraction.',
    pt: 'Antes de calcular, uma pergunta: se eu aumento isto, o outro sobe ou desce? Isso decide se você multiplica ou divide. Você treina regra de três simples, inversa, repartição proporcional e a composta, em que cada grandeza traz sua própria fração.',
  },
  {
    chapter: 'Geometría plana',
    es: 'Áreas, perímetros y Pitágoras. La primera decisión es siempre qué te preguntan: cercar es perímetro y cubrir es área, y la unidad de la respuesta te avisa si elegiste bien. Las áreas sombreadas se resuelven restando figuras completas.',
    en: 'Areas, perimeters and Pythagoras. The first decision is always what is being asked: fencing is perimeter and covering is area, and the unit of your answer tells you whether you chose right. Shaded areas are solved by subtracting whole figures.',
    pt: 'Áreas, perímetros e Pitágoras. A primeira decisão é sempre o que pedem: cercar é perímetro e cobrir é área, e a unidade da resposta avisa se você escolheu certo. As áreas sombreadas se resolvem subtraindo figuras inteiras.',
  },
  {
    chapter: 'Estadística descriptiva',
    es: 'Media, mediana y moda miden cosas distintas. Entrenas a ordenar antes de buscar la mediana, a ponderar cuando los datos no pesan igual y a desconfiar de la media cuando hay un dato disparatado: eso es lo que arrastra el promedio.',
    en: 'Mean, median and mode measure different things. You train to sort before looking for the median, to weight when data do not count equally, and to distrust the mean when there is an extreme value: that is what drags the average.',
    pt: 'Média, mediana e moda medem coisas distintas. Você treina a ordenar antes de buscar a mediana, a ponderar quando os dados não pesam igual e a desconfiar da média quando há um dado disparatado: é isso que puxa a média.',
  },

  // ── Cultura General ───────────────────────────────────────────────────────
  {
    chapter: 'Historia del Perú',
    es: 'De las culturas preincaicas a la República. No se premia memorizar fechas sueltas: entrenas a asociar cada cultura con lo que dejó, a ordenar procesos y a explicar por qué pasó lo que pasó. Tres anclas —1780, 1821, 1824— sostienen casi todo.',
    en: 'From the pre-Inca cultures to the Republic. Memorising loose dates earns nothing: you train to link each culture with what it left behind, to order processes, and to explain why things happened. Three anchors — 1780, 1821, 1824 — hold up almost everything.',
    pt: 'Das culturas pré-incaicas à República. Decorar datas soltas não vale nada: você treina a associar cada cultura ao que ela deixou, a ordenar processos e a explicar por que as coisas aconteceram. Três âncoras — 1780, 1821, 1824 — sustentam quase tudo.',
  },
  {
    chapter: 'Geografía y turismo',
    es: 'Por qué el Perú es como es: los Andes crean tres regiones y una corriente fría explica el desierto costero. Entrenas a relacionar relieve, clima y actividad humana, y a usar eso para decisiones prácticas, como cuándo conviene viajar a la sierra.',
    en: 'Why Peru is the way it is: the Andes create three regions and a cold current explains the coastal desert. You train to relate landform, climate and human activity, and to use that for practical decisions, such as when to travel to the highlands.',
    pt: 'Por que o Peru é como é: os Andes criam três regiões e uma corrente fria explica o deserto costeiro. Você treina a relacionar relevo, clima e atividade humana, e a usar isso em decisões práticas, como quando convém viajar à serra.',
  },
  {
    chapter: 'Economía y actualidad',
    es: 'Los conceptos que aparecen en cualquier noticia: impuestos, inflación, poder adquisitivo, tipo de cambio y exportaciones. Entrenas a seguir el recorrido del dinero y a distinguir un cambio nominal de uno real, que no es lo mismo.',
    en: 'The concepts that turn up in any news story: taxes, inflation, purchasing power, exchange rate and exports. You train to follow where the money goes and to tell a nominal change from a real one, which are not the same thing.',
    pt: 'Os conceitos que aparecem em qualquer notícia: impostos, inflação, poder de compra, câmbio e exportações. Você treina a seguir o caminho do dinheiro e a distinguir uma mudança nominal de uma real, que não são a mesma coisa.',
  },
  {
    chapter: 'Literatura',
    es: 'Autores y obras peruanas, emparejados. El examen suele ofrecer cinco obras auténticas de cinco autores distintos, así que estudiar por parejas rinde más que memorizar listas. También entrenas a distinguir corrientes por su mirada, no por su tema.',
    en: 'Peruvian authors and works, matched up. The exam usually offers five genuine works by five different authors, so studying in pairs pays off more than memorising lists. You also train to tell movements apart by their gaze, not their subject.',
    pt: 'Autores e obras peruanas, emparelhados. A prova costuma oferecer cinco obras autênticas de cinco autores diferentes, então estudar em pares rende mais que decorar listas. Você também treina a distinguir correntes pelo olhar, não pelo tema.',
  },
  {
    chapter: 'Educación cívica',
    es: 'Cómo está organizado el Estado y qué te protege. Entrenas a separar quién hace qué —el JNE juzga, la ONPE organiza, el RENIEC identifica—, a elegir la garantía correcta para cada derecho y a desconfiar de las alternativas que dicen «siempre».',
    en: 'How the State is organised and what protects you. You train to separate who does what — one body judges elections, another runs them, another identifies voters — to pick the right guarantee for each right, and to distrust options that say "always".',
    pt: 'Como o Estado está organizado e o que protege você. Você treina a separar quem faz o quê — um órgão julga as eleições, outro as organiza, outro identifica —, a escolher a garantia certa para cada direito e a desconfiar das alternativas que dizem «sempre».',
  },
  // ── Inglés · el módulo se ofrece solo en español ──────────────────────────
  {
    chapter: 'A1 · Sonidos y supervivencia',
    es: 'El inglés distingue sonidos que el español junta en uno, y por eso «ship» y «sheep» son dos palabras distintas. Aquí entrenas el oído con pares mínimos, repites en voz alta para comprobar si se te entiende, y te llevas las frases de supervivencia que resuelven un aeropuerto.',
    en: '',
    pt: '',
  },
  {
    chapter: 'A1 · El presente que más se usa',
    es: 'La -s de tercera persona y el auxiliar do/does: los dos errores que más delatan a un hispanohablante. También separas el presente simple del continuo, que en español son el mismo tiempo, y desarmas los calcos como «I have 15 years».',
    en: '',
    pt: '',
  },
  {
    chapter: 'A1 · Las 1000 palabras que cubren el 85 %',
    es: 'No se aprende un idioma palabra por palabra, sino por frecuencia. Aquí practicas el vocabulario que de verdad aparece —y en bloques, no suelto—, porque «make a decision» se recuerda mejor que «make» y «decision» por separado.',
    en: '',
    pt: '',
  },
  {
    chapter: 'A1 · Preguntar y responder',
    es: 'Preguntar en inglés exige invertir el orden y meter un auxiliar que en español no existe. Entrenas las preguntas de sí/no, las de wh-, y las respuestas cortas —«Yes, I do»— que suenan naturales en vez de robóticas.',
    en: '',
    pt: '',
  },
  {
    chapter: 'A2 · Contar lo que pasó',
    es: 'El pasado simple y los verbos irregulares, que son los que más se usan. Practicas la trampa de did: cuando aparece, el verbo vuelve a su forma base, así que «did you went» nunca es correcto.',
    en: '',
    pt: '',
  },
  {
    chapter: 'A2 · Hablar del futuro',
    es: 'El inglés tiene tres futuros y elige según la intención: will para lo que se decide al hablar, going to para lo planeado, y el presente continuo para citas ya fijadas. El español usa uno solo, así que aquí se decide conscientemente.',
    en: '',
    pt: '',
  },
  {
    chapter: 'A2 · Comparar',
    es: 'Comparativos y superlativos, con la regla de las sílabas que decide entre -er y more. Y el error más frecuente: «more better» y «the most tallest», que duplican la marca de comparación.',
    en: '',
    pt: '',
  },
  {
    chapter: 'A2 · Describir personas y rutinas',
    es: 'El orden de los adjetivos, que en inglés es fijo y en español libre, y los adverbios de frecuencia, que van en un sitio concreto de la frase. Entrenas a describir sin traducir.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B1 · El tiempo que no existe en español',
    es: 'El present perfect. No es el pretérito perfecto español: marca que algo sigue vigente. Aquí aprendes cuándo se usa for y cuándo since, y por qué «I have 20 years working here» no significa nada en inglés.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B1 · Hipótesis',
    es: 'Los condicionales. Cada tipo habla de una probabilidad distinta, y el segundo lleva un pasado que no se refiere al pasado. Practicas a elegir el tipo antes de armar la frase.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B1 · Cuando el sujeto no importa',
    es: 'La voz pasiva, muchísimo más frecuente en inglés que en español. Entrenas a reconocer cuándo un nativo la usaría y a no traducir con «se» todo lo que en inglés va en pasiva.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B1 · Los verbos que cambian con la partícula',
    es: 'Los phrasal verbs, donde «look up», «look after» y «look for» no tienen nada que ver entre sí. Se aprenden por bloques y en contexto, no en listas alfabéticas.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B1 · Entender a velocidad real',
    es: 'El habla rápida no pronuncia las palabras por separado: las une, las reduce y se come sonidos. Aquí entrenas a reconocer «gonna», «wanna» y «whaddaya», que es lo que realmente se dice.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B2 · Lo que pudo haber sido',
    es: 'El tercer condicional y las modales de pasado —should have, could have, must have—. Es la estructura que permite hablar de arrepentimiento y de deducción, y la que separa una conversación adulta de una básica.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B2 · Contar lo que otro dijo',
    es: 'El estilo indirecto y el desplazamiento de tiempos. Practicas a reportar sin cambiar el sentido, y a manejar los verbos de reporte que ya llevan la actitud dentro: admit, insist, deny.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B2 · Sonar natural, no correcto',
    es: 'Colocaciones. «Hacer una pregunta» es «ask a question», no «make a question»: la frase correcta no siempre es la natural. Aquí entrenas el oído para las combinaciones que un nativo espera.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B2 · Defender una postura por escrito',
    es: 'Estructura de párrafo, conectores de argumentación y registro. Practicas a sostener una idea con evidencia, que es lo que piden los exámenes internacionales y también la universidad.',
    en: '',
    pt: '',
  },
  {
    chapter: 'B2 · Escuchar contenido académico',
    es: 'Conferencias y explicaciones largas, donde no se puede parar a traducir. Entrenas a captar la estructura —tesis, ejemplos, conclusión— y a tomar notas sin perder el hilo.',
    en: '',
    pt: '',
  },
  {
    chapter: 'C1 · Poner el foco donde quieres',
    es: 'Inversión, cleft sentences y estructuras enfáticas. El inglés cambia el orden para destacar; el español sube la voz. Aquí aprendes a mover el foco con la gramática.',
    en: '',
    pt: '',
  },
  {
    chapter: 'C1 · Los matices que separan C1 de B2',
    es: 'Diferencias finas de significado y de registro donde ya no hay reglas, sino sensibilidad. Practicas a elegir entre dos opciones ambas correctas y a justificar por qué una encaja mejor.',
    en: '',
    pt: '',
  },
  {
    chapter: 'C1 · Lenguaje figurado',
    es: 'Modismos, metáforas cotidianas y humor. Es lo último que se aprende porque no se deduce: se reconoce. Entrenas a captar lo que se dice sin decirlo.',
    en: '',
    pt: '',
  },
  {
    chapter: 'C1 · Escritura formal',
    es: 'Informes, correos profesionales y textos académicos. Practicas la nominalización, la precisión léxica y el tono impersonal que exige un contexto formal en inglés.',
    en: '',
    pt: '',
  },
  {
    chapter: 'C1 · Fluidez bajo presión',
    es: 'Hablar sin pausas largas, reformular cuando falta una palabra y sostener un argumento en tiempo real. La fluidez no es velocidad: es no quedarse atascado.',
    en: '',
    pt: '',
  },
  {
    chapter: 'C1 · Simulacro completo',
    es: 'El examen entero, con sus cuatro destrezas y su reloj. Sirve para medir dónde estás de verdad, no para aprender: eso ya lo hiciste en los veintitrés capítulos anteriores.',
    en: '',
    pt: '',
  },
];
