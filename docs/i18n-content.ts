/**
 * Traducciones de clases, bloques y preguntas.
 *
 * Va en TypeScript y no en SQL porque son objetos anidados llenos de comillas y
 * saltos de línea: escaparlos a mano dentro de literales `jsonb` es la clase de
 * cosa que se rompe en silencio. Aquí el compilador ayuda.
 *
 * Las clases se identifican por su título en español, y los bloques por el
 * orden dentro de la clase. Las preguntas, por el inicio de su enunciado.
 *
 * El módulo de Inglés no aparece: se vende solo a hispanohablantes.
 */

type Tr = Record<string, unknown>;

export type LessonTranslation = {
  /** Título en español, que es como se busca la fila. */
  es: string;
  en: Tr;
  pt: Tr;
  /** Traducción del `payload` de cada bloque, por orden. */
  blocks: Record<number, { en: Tr; pt: Tr }>;
};

export const LESSONS: LessonTranslation[] = [
  {
    es: 'Cuando los números esconden un patrón',
    en: {
      title: 'When numbers hide a pattern',
      hook: 'No exam sequence is random. There is always a rule, and almost always it shows up when you subtract.',
    },
    pt: {
      title: 'Quando os números escondem um padrão',
      hook: 'Nenhuma sequência de prova é aleatória. Sempre há uma regra, e quase sempre ela aparece quando você subtrai.',
    },
    blocks: {
      0: {
        en: {
          h: 'Intuition first',
          p: 'Look at <strong>2, 6, 12, 20, 30</strong>. The numbers grow, but not evenly: first they jump by 4, then by 6, then by 8. The jump is growing too. <strong>That pattern inside the pattern is the whole answer.</strong>',
        },
        pt: {
          h: 'A intuição primeiro',
          p: 'Olhe para <strong>2, 6, 12, 20, 30</strong>. Os números crescem, mas não de forma uniforme: primeiro saltam 4, depois 6, depois 8. O salto também está crescendo. <strong>Esse padrão dentro do padrão é toda a resposta.</strong>',
        },
      },
      1: {
        en: {
          viz_id: 'v-suc',
          caption: 'First row: the sequence. Second: how much each step jumps. Third: how much the jump grows. When the last row is constant, you have already won.',
        },
        pt: {
          viz_id: 'v-suc',
          caption: 'Primeira linha: a sequência. Segunda: quanto cada passo salta. Terceira: quanto o salto cresce. Quando a última linha é constante, você já ganhou.',
        },
      },
      2: {
        en: {
          h: 'The method, in three moves',
          p: '<strong>1.</strong> Subtract neighbouring terms and write the differences underneath.<br><strong>2.</strong> If those differences are constant, the sequence is linear and you are done. If not, subtract again.<br><strong>3.</strong> Once you reach a constant row, climb back up: rebuild upwards until you get to the term you were asked for.',
        },
        pt: {
          h: 'O método, em três movimentos',
          p: '<strong>1.</strong> Subtraia termos vizinhos e escreva as diferenças abaixo.<br><strong>2.</strong> Se essas diferenças forem constantes, a sequência é linear e você terminou. Se não, subtraia de novo.<br><strong>3.</strong> Quando chegar a uma linha constante, suba: reconstrua para cima até o termo que pedem.',
        },
      },
      3: {
        en: {
          t: 'Why it works',
          p: 'Every time you subtract, you drop one degree. If the row of second differences is constant, the general term is a degree-2 polynomial. It is the discrete version of differentiating a parabola twice.',
        },
        pt: {
          t: 'Por que funciona',
          p: 'Cada vez que você subtrai, desce um grau. Se a linha de segundas diferenças for constante, o termo geral é um polinômio de grau 2. É a versão discreta de derivar duas vezes uma parábola.',
        },
      },
      4: {
        en: {
          h: 'The second look: the geometric shape',
          p: 'There is another route, prettier and faster. Those same numbers — 2, 6, 12, 20, 30 — are the area of rectangles that grow: 1×2, 2×3, 3×4, 4×5. Term n is <strong>n(n+1)</strong>. They are called pronic numbers and they turn up constantly in Peruvian exams.',
        },
        pt: {
          h: 'O segundo olhar: a forma geométrica',
          p: 'Há outro caminho, mais bonito e mais rápido. Esses mesmos números — 2, 6, 12, 20, 30 — são a área de retângulos que crescem: 1×2, 2×3, 3×4, 4×5. O termo n é <strong>n(n+1)</strong>. Chamam-se números pronics e aparecem o tempo todo em provas peruanas.',
        },
      },
      5: {
        en: {
          viz_id: 'v-pronic',
          caption: 'Each rectangle has one more side unit than the previous one. The area is the sequence. If you recognise the shape, you do not need to subtract anything.',
        },
        pt: {
          viz_id: 'v-pronic',
          caption: 'Cada retângulo tem um lado a mais que o anterior. A área é a sequência. Se você reconhece a forma, não precisa subtrair nada.',
        },
      },
      6: {
        en: {
          q: 'Using the formula n(n+1), what is term number 8?',
          opts: ['64', '72', '80', '90'],
          ans: 1,
          ok: 'Exactly: 8 × 9 = 72. Checking it with the formula takes you three seconds; with differences, thirty.',
          no: 'Careful: n(n+1) means 8 × 9, not 8 × 8 or 8 × 10. The result is 72.',
        },
        pt: {
          q: 'Com a fórmula n(n+1), qual é o termo número 8?',
          opts: ['64', '72', '80', '90'],
          ans: 1,
          ok: 'Exato: 8 × 9 = 72. Verificar com a fórmula leva três segundos; com diferenças, trinta.',
          no: 'Cuidado: n(n+1) significa 8 × 9, não 8 × 8 nem 8 × 10. O resultado é 72.',
        },
      },
      7: {
        en: {
          items: [
            'Subtracting in the wrong direction (previous term minus next) and getting negative differences by mistake.',
            'Stopping at the first row of differences when it is not constant, and forcing an answer.',
            'Confusing an arithmetic sequence (constant difference) with a geometric one (constant ratio). If the numbers are being multiplied, do not subtract: divide.',
            'Miscounting the position: in 2, 6, 12… the 2 is n=1, not n=0.',
          ],
        },
        pt: {
          items: [
            'Subtrair no sentido errado (termo anterior menos o seguinte) e obter diferenças negativas por engano.',
            'Parar na primeira linha de diferenças quando ela não é constante, e forçar uma resposta.',
            'Confundir sequência aritmética (diferença constante) com geométrica (razão constante). Se os números se multiplicam, não subtraia: divida.',
            'Contar mal a posição: em 2, 6, 12… o 2 é n=1, não n=0.',
          ],
        },
      },
    },
  },
  {
    es: 'Por qué 20 % + 10 % nunca es 30 %',
    en: {
      title: 'Why 20% + 10% is never 30%',
      hook: 'This is the mistake that costs the most money in real life and the most points on the exam.',
    },
    pt: {
      title: 'Por que 20 % + 10 % nunca é 30 %',
      hook: 'Este é o erro que mais custa dinheiro na vida real e mais pontos na prova.',
    },
    blocks: {
      0: {
        en: {
          h: 'Watch it shrink',
          p: 'Picture the price as a bar. The first discount cuts a piece off. The second discount cuts a piece <strong>off what is left</strong>, which is already smaller. That is why the total never reaches 30%.',
        },
        pt: {
          h: 'Veja encolher',
          p: 'Imagine o preço como uma barra. O primeiro desconto corta um pedaço. O segundo desconto corta um pedaço <strong>do que sobrou</strong>, que já é menor. Por isso o total nunca chega a 30 %.',
        },
      },
      1: {
        en: {
          viz_id: 'v-desc',
          caption: 'From S/ 100, S/ 80 is left. 10% of 80 is 8, not 10. S/ 72 is left. The real discount was 28%.',
        },
        pt: {
          viz_id: 'v-desc',
          caption: 'De S/ 100 sobram S/ 80. Os 10 % de 80 são 8, não 10. Sobram S/ 72. O desconto real foi de 28 %.',
        },
      },
      2: {
        en: {
          h: 'Think about what is left, not what goes away',
          p: 'This is the mental switch that solves the entire chapter. A 20% discount leaves <strong>80%</strong>. A 10% one leaves <strong>90%</strong>. And the factors <em>do</em> multiply:',
        },
        pt: {
          h: 'Pense no que fica, não no que sai',
          p: 'Esta é a virada mental que resolve o capítulo inteiro. Um desconto de 20 % deixa <strong>80 %</strong>. Um de 10 % deixa <strong>90 %</strong>. E os fatores <em>sim</em> se multiplicam:',
        },
      },
      3: {
        en: { m: '0.80  ×  0.90  =  0.72       →  72% is left\n100%  −  72%  =  28%      →  28% was taken off' },
        pt: { m: '0,80  ×  0,90  =  0,72       →  fica 72 %\n100 %  −  72 %  =  28 %      →  descontou-se 28 %' },
      },
      4: {
        en: {
          t: 'The same rule in reverse',
          p: 'For successive increases, multiply the factors greater than 1: a 20% rise followed by a 10% one is 1.20 × 1.10 = 1.32, that is a 32% increase. And if something goes up 20% and then down 20%, the result is 0.96: you lose 4%. You never get back to where you started.',
        },
        pt: {
          t: 'A mesma regra ao contrário',
          p: 'Para aumentos sucessivos, multiplique os fatores maiores que 1: uma alta de 20 % seguida de outra de 10 % é 1,20 × 1,10 = 1,32, ou seja 32 % de aumento. E se sobe 20 % e depois cai 20 %, o resultado é 0,96: você perde 4 %. Nunca volta ao ponto de partida.',
        },
      },
      5: {
        en: {
          q: 'A hotel raises its rate 25% in high season and then drops it 20% in a promotion. Where does it end up compared with the original price?',
          opts: ['Up 5%', 'Exactly the same', 'Down 5%', 'Up 45%'],
          ans: 1,
          ok: 'Correct: 1.25 × 0.80 = 1.00 exactly. It is the only pair that cancels out, and that is why exams love it.',
          no: 'Multiply the factors: 1.25 × 0.80 = 1.00. It ends up exactly the same. It is a numerical coincidence that shows up a lot on exams.',
        },
        pt: {
          q: 'Um hotel aumenta a diária em 25 % na alta temporada e depois baixa 20 % numa promoção. Como fica em relação ao preço original?',
          opts: ['Sobe 5 %', 'Fica igual', 'Cai 5 %', 'Sobe 45 %'],
          ans: 1,
          ok: 'Correto: 1,25 × 0,80 = 1,00 exato. É o único par que se cancela, e por isso as provas adoram.',
          no: 'Multiplique os fatores: 1,25 × 0,80 = 1,00. Fica exatamente igual. É uma coincidência numérica que aparece muito em prova.',
        },
      },
      6: {
        en: {
          items: [
            'Adding the percentages. 20 + 10 = 30 is always the trap option.',
            'Subtracting the percentage from the final price when the tax is already included (there you divide, you do not subtract).',
            'Applying the second discount to the original price instead of the reduced one.',
            'Forgetting that an increase and a decrease of the same percentage do not cancel out.',
          ],
        },
        pt: {
          items: [
            'Somar as porcentagens. 20 + 10 = 30 é sempre a alternativa-armadilha.',
            'Subtrair a porcentagem do preço final quando o imposto já está incluído (aí se divide, não se subtrai).',
            'Aplicar o segundo desconto ao preço original em vez do já reduzido.',
            'Esquecer que um aumento e uma queda da mesma porcentagem não se cancelam.',
          ],
        },
      },
    },
  },
  {
    es: 'La analogía no se adivina: se redacta',
    en: {
      title: 'You do not guess an analogy: you word it',
      hook: 'Most people get analogies wrong because they look for the option that "sounds similar" instead of naming the relationship.',
    },
    pt: {
      title: 'A analogia não se adivinha: se redige',
      hook: 'A maioria erra analogias porque procura a alternativa que "soa parecida" em vez de nomear a relação.',
    },
    blocks: {
      0: {
        en: {
          h: 'Build the bridge',
          p: 'Every pair of words is joined by a bridge: a precise relationship. <strong>Your only job is to name that bridge in a full sentence</strong> before you look at the options. If you read the options first, your brain gets contaminated by the topic and picks by closeness, not by logic.',
        },
        pt: {
          h: 'Construa a ponte',
          p: 'Cada par de palavras está unido por uma ponte: uma relação precisa. <strong>Seu único trabalho é nomear essa ponte com uma frase completa</strong> antes de olhar as alternativas. Se olhar as opções primeiro, seu cérebro se contamina com o tema e escolhe por proximidade, não por lógica.',
        },
      },
      1: {
        en: {
          viz_id: 'v-anal',
          caption: 'The bridge sentence is the tool. Only the option that supports exactly the same sentence is the right one.',
        },
        pt: {
          viz_id: 'v-anal',
          caption: 'A frase da ponte é a ferramenta. Só a alternativa que sustenta exatamente a mesma frase é a correta.',
        },
      },
      2: {
        en: {
          h: 'Harden the sentence until only one survives',
          p: 'If two options fit, your sentence was too loose. Add nuance to it: <em>temporarily</em>, <em>in exchange for payment</em>, <em>voluntarily</em>. Each nuance removes candidates. Keep hardening until one is left.',
        },
        pt: {
          h: 'Endureça a frase até sobrar uma',
          p: 'Se duas alternativas encaixam, sua frase estava frouxa demais. Acrescente nuances: <em>temporariamente</em>, <em>em troca de pagamento</em>, <em>de forma voluntária</em>. Cada nuance elimina candidatos. Siga endurecendo até restar uma.',
        },
      },
      3: {
        en: {
          t: 'The order is mandatory',
          p: 'PLANE : PASSENGER goes from place to user. The answer has to run in the same direction. "Pilot : cockpit" has the right relationship but reversed, and that is why it is wrong. Exams always include at least one reversed pair.',
        },
        pt: {
          t: 'A ordem é obrigatória',
          p: 'AVIÃO : PASSAGEIRO vai de lugar para usuário. A resposta deve ir no mesmo sentido. "Piloto : cabine" tem a relação certa, mas invertida, e por isso está errada. As provas sempre põem ao menos um par invertido.',
        },
      },
      4: {
        en: {
          q: 'CHEF : KITCHEN :: which one keeps the relationship "professional : space where they practise"?',
          opts: ['Doctor : scalpel', 'Pilot : cockpit', 'Classroom : teacher', 'Hotel : receptionist'],
          ans: 1,
          ok: 'Correct. Doctor : scalpel is professional : tool. Classroom : teacher and Hotel : receptionist are reversed.',
          no: 'Watch the direction: you need the professional first, the space second. Pilot : cockpit is the only one that does that.',
        },
        pt: {
          q: 'CHEF : COZINHA :: qual mantém a relação "profissional : espaço onde atua"?',
          opts: ['Médico : bisturi', 'Piloto : cabine', 'Sala de aula : professor', 'Hotel : recepcionista'],
          ans: 1,
          ok: 'Correto. Médico : bisturi é profissional : ferramenta. Sala de aula : professor e Hotel : recepcionista estão invertidos.',
          no: 'Repare no sentido: você precisa do profissional primeiro, do espaço depois. Piloto : cabine é o único que cumpre isso.',
        },
      },
      5: {
        en: {
          items: [
            'Choosing by semantic field: if the base pair is about travel, ticking any option that mentions travel.',
            'Ignoring the order and accepting the reversed relationship.',
            'Wording the sentence with vague verbs like "has to do with" or "is related to".',
            'Giving up when two options look valid instead of hardening the sentence.',
          ],
        },
        pt: {
          items: [
            'Escolher pelo campo semântico: se o par base fala de viagens, marcar qualquer alternativa que mencione viagens.',
            'Ignorar a ordem e aceitar a relação invertida.',
            'Formular a frase com verbos vagos como "tem a ver com" ou "se relaciona com".',
            'Desistir diante de duas alternativas válidas em vez de endurecer a frase.',
          ],
        },
      },
    },
  },
];

export type QuestionTranslation = {
  /** Los primeros caracteres del enunciado en español. */
  starts: string;
  en: Tr;
  pt: Tr;
};

export const QUESTIONS: QuestionTranslation[] = [
  {
    starts: 'Halle el término que continúa',
    en: {
      stem: 'Find the next term:<br><br><span class="math">2 ; 6 ; 12 ; 20 ; 30 ; ...</span>',
      options: ['36', '40', '42', '44', '48'],
      steps: [
        {
          t: 'Work out the differences between consecutive terms',
          p: 'When a sequence is not obvious, the first move is always to subtract neighbouring terms.',
          m: '6 − 2 = 4\n12 − 6 = 6\n20 − 12 = 8\n30 − 20 = 10',
        },
        {
          t: 'Look at the pattern in the differences',
          p: 'They are 4, 6, 8, 10 → they grow by 2 each time. A second-order sequence.',
          m: 'Next difference = 10 + 2 = 12',
        },
        {
          t: 'Add the difference to the last term',
          p: 'With the difference in hand, all that is left is to complete it.',
          m: '30 + 12 = 42',
        },
        {
          t: 'Check with the general formula',
          p: 'Every term follows n(n+1).',
          m: 'n=6 → 6·7 = 42  ✓',
        },
      ],
      concept: 'Second-order sequence: if the second differences are constant, the general term is a degree-2 polynomial.',
      trick: 'Recognise 2, 6, 12, 20, 30 as the pronic numbers n(n+1). It saves you 40 seconds.',
    },
    pt: {
      stem: 'Encontre o termo que continua:<br><br><span class="math">2 ; 6 ; 12 ; 20 ; 30 ; ...</span>',
      options: ['36', '40', '42', '44', '48'],
      steps: [
        {
          t: 'Calcule as diferenças entre termos consecutivos',
          p: 'Quando uma sequência não é óbvia, o primeiro movimento é sempre subtrair termos vizinhos.',
          m: '6 − 2 = 4\n12 − 6 = 6\n20 − 12 = 8\n30 − 20 = 10',
        },
        {
          t: 'Observe o padrão das diferenças',
          p: 'São 4, 6, 8, 10 → aumentam de 2 em 2. Sequência de segunda ordem.',
          m: 'Próxima diferença = 10 + 2 = 12',
        },
        {
          t: 'Some a diferença ao último termo',
          p: 'Com a diferença encontrada, só falta completar.',
          m: '30 + 12 = 42',
        },
        {
          t: 'Verifique com a fórmula geral',
          p: 'Cada termo responde a n(n+1).',
          m: 'n=6 → 6·7 = 42  ✓',
        },
      ],
      concept: 'Sequência de segunda ordem: se as segundas diferenças são constantes, o termo geral é um polinômio de grau 2.',
      trick: 'Reconheça 2, 6, 12, 20, 30 como os números pronics n(n+1). Economiza 40 segundos.',
    },
  },
  {
    starts: 'Hace 5 años, la edad de Ana',
    en: {
      stem: 'Five years ago, Ana was twice as old as Beto. In five years, their ages will add up to 50. How old is Ana now?',
      options: ['20 years old', '22 years old', '25 years old', '28 years old', '30 years old'],
      steps: [
        {
          t: 'Define the variables in the present',
          p: 'Always name TODAY as the ages.',
          m: 'A = Ana age today\nB = Beto age today',
        },
        {
          t: 'Translate the condition about the past',
          p: '"Five years ago" takes 5 off each age.',
          m: 'A − 5 = 2(B − 5)\nA = 2B − 5    ...(I)',
        },
        {
          t: 'Translate the condition about the future',
          p: 'With 2 people, the sum grows by 10 in 5 years.',
          m: '(A+5) + (B+5) = 50\nA + B = 40    ...(II)',
        },
        {
          t: 'Solve the system',
          p: 'Substitute (I) into (II).',
          m: '3B = 45 → B = 15\nA = 25',
        },
        {
          t: 'Check it',
          p: 'Against the original wording.',
          m: '5 years ago: 20 = 2(10) ✓\nIn 5 years: 30 + 20 = 50 ✓',
        },
      ],
      concept: 'The sum of the ages changes by "n years" as many times as there are people.',
      trick: 'Draw a Past–Present–Future table per person. It turns the problem into arithmetic.',
    },
    pt: {
      stem: 'Há 5 anos, a idade de Ana era o dobro da de Beto. Daqui a 5 anos, a soma das idades será 50. Que idade Ana tem hoje?',
      options: ['20 anos', '22 anos', '25 anos', '28 anos', '30 anos'],
      steps: [
        {
          t: 'Defina as variáveis no presente',
          p: 'Nomeie sempre as idades de HOJE.',
          m: 'A = idade de Ana hoje\nB = idade de Beto hoje',
        },
        {
          t: 'Traduza a condição do passado',
          p: '"Há 5 anos" tira 5 de cada idade.',
          m: 'A − 5 = 2(B − 5)\nA = 2B − 5    ...(I)',
        },
        {
          t: 'Traduza a condição do futuro',
          p: 'Com 2 pessoas, a soma cresce 10 em 5 anos.',
          m: '(A+5) + (B+5) = 50\nA + B = 40    ...(II)',
        },
        {
          t: 'Resolva o sistema',
          p: 'Substitua (I) em (II).',
          m: '3B = 45 → B = 15\nA = 25',
        },
        {
          t: 'Comprove',
          p: 'Contra o enunciado original.',
          m: 'Há 5: 20 = 2(10) ✓\nEm 5: 30 + 20 = 50 ✓',
        },
      ],
      concept: 'A soma das idades muda tantas vezes "n anos" quantas pessoas houver.',
      trick: 'Desenhe um quadro Passado–Presente–Futuro por pessoa. Transforma o problema em aritmética.',
    },
  },
  {
    starts: 'Un hotel aplica 20 % de descuento',
    en: {
      stem: 'A hotel gives a 20% discount for booking early and, on top of the already reduced price, a further 10% for paying by card. What single discount is that equivalent to?',
      options: ['26%', '28%', '29%', '30%', '32%'],
      steps: [
        {
          t: 'Do not add the discounts',
          p: '30% is the classic trap.',
          m: '20% + 10% ≠ 30%   ✗',
        },
        {
          t: 'Work with what is LEFT',
          p: 'Taking off 20% leaves 80%; taking off 10% leaves 90%.',
          m: '0.80 × 0.90 = 0.72',
        },
        {
          t: 'Turn the factor into a discount',
          p: 'If 72% is left, the rest was discounted.',
          m: '100% − 72% = 28%',
        },
        {
          t: 'Check with S/ 100',
          p: 'A concrete price makes it obvious.',
          m: '100 − 20% = 80\n80 − 10% = 72\nDiscount = 28%',
        },
      ],
      concept: 'Successive discounts: multiply the factors of what is left, never add the percentages.',
      trick: 'Express formula: D = a + b − (a·b)/100 → 20 + 10 − 2 = 28.',
    },
    pt: {
      stem: 'Um hotel aplica 20 % de desconto por reserva antecipada e, sobre o preço já reduzido, mais 10 % por pagamento com cartão. A que desconto único isso equivale?',
      options: ['26 %', '28 %', '29 %', '30 %', '32 %'],
      steps: [
        {
          t: 'Não some os descontos',
          p: '30 % é a armadilha clássica.',
          m: '20% + 10% ≠ 30%   ✗',
        },
        {
          t: 'Trabalhe com o que SOBRA',
          p: 'Descontar 20 % deixa 80 %; descontar 10 % deixa 90 %.',
          m: '0,80 × 0,90 = 0,72',
        },
        {
          t: 'Converta o fator em desconto',
          p: 'Se sobra 72 %, descontou-se o resto.',
          m: '100% − 72% = 28%',
        },
        {
          t: 'Verifique com S/ 100',
          p: 'Um preço concreto deixa tudo evidente.',
          m: '100 − 20% = 80\n80 − 10% = 72\nDesconto = 28%',
        },
      ],
      concept: 'Descontos sucessivos: multiplique os fatores do que sobra, nunca some as porcentagens.',
      trick: 'Fórmula expressa: D = a + b − (a·b)/100 → 20 + 10 − 2 = 28.',
    },
  },
  {
    starts: '<b>AVIÓN : PASAJERO',
    en: {
      stem: '<b>PLANE : PASSENGER ::</b>',
      options: ['pilot : cockpit', 'hotel : guest', 'suitcase : trip', 'airport : flight', 'tourist : map'],
      steps: [
        {
          t: 'Define the relationship in a sentence',
          p: 'Never look for an answer before you have the sentence.',
          m: '"The PLANE is the service space that\ntemporarily houses the PASSENGER."',
        },
        {
          t: 'Pin down the type of relationship',
          p: 'Service establishment and temporary user.',
          m: 'place of service → temporary user',
        },
        {
          t: 'Apply the sentence to each option',
          p: 'Discard anything that does not fit exactly.',
          m: 'a) reversed ✗\nb) hotel : guest ✓\nc) object → event ✗\nd) place → event ✗\ne) user → tool ✗',
        },
        {
          t: 'Confirm the order',
          p: 'The place comes first.',
          m: 'HOTEL : GUEST ✓',
        },
      ],
      concept: 'Analogies are solved by wording the relationship, not by looking for topical resemblance.',
      trick: 'If two options fit, harden the sentence with one nuance until only one survives.',
    },
    pt: {
      stem: '<b>AVIÃO : PASSAGEIRO ::</b>',
      options: ['piloto : cabine', 'hotel : hóspede', 'mala : viagem', 'aeroporto : voo', 'turista : mapa'],
      steps: [
        {
          t: 'Defina a relação com uma frase',
          p: 'Nunca procure a resposta antes de ter a frase.',
          m: '"O AVIÃO é o espaço de serviço que abriga\ntemporariamente o PASSAGEIRO."',
        },
        {
          t: 'Precise o tipo de relação',
          p: 'Estabelecimento de serviço e usuário temporário.',
          m: 'lugar de serviço → usuário temporário',
        },
        {
          t: 'Aplique a frase a cada alternativa',
          p: 'Descarte tudo o que não encaixe exatamente.',
          m: 'a) invertido ✗\nb) hotel : hóspede ✓\nc) objeto → evento ✗\nd) lugar → evento ✗\ne) usuário → ferramenta ✗',
        },
        {
          t: 'Confirme a ordem',
          p: 'O lugar vem primeiro.',
          m: 'HOTEL : HÓSPEDE ✓',
        },
      ],
      concept: 'As analogias se resolvem redigindo a relação, não procurando semelhança temática.',
      trick: 'Se duas alternativas encaixam, endureça a frase com uma nuance até sobrar uma.',
    },
  },
  {
    starts: 'El texto sostiene principalmente',
    en: {
      stem: 'The text argues mainly that community tourism:',
      passage:
        'Community tourism has grown in Peru as an alternative to the mass circuit. In communities around the Colca and Titicaca, families host visitors in their homes and manage the income directly. Its defenders point out that the money stays in the locality. Critics, however, warn that without minimum service standards the experience is uneven and damages the reputation of the destination. The discussion, then, is not whether the model should exist, but under what conditions it can be sustained.',
      options: [
        'is economically superior to mass tourism',
        'should be banned until standards exist',
        'is viable and its continuity depends on certain conditions',
        'has failed in the Colca and Titicaca',
        'benefits Lima-based operators above all',
      ],
      steps: [
        {
          t: 'Find the closing sentence',
          p: 'In short texts the thesis usually comes after a concluding connective.',
          m: '"...is not whether it should exist, but under\nwhat conditions it can be sustained."',
        },
        {
          t: 'Recognise the structure',
          p: 'Position, counter-position, synthesis. The synthesis is the thesis.',
          m: 'Defenders → Critics → Author',
        },
        {
          t: 'Discard by excess or shortfall',
          p: 'The distractors exaggerate or promote a detail to a central idea.',
          m: 'a) does not compare ✗\nb) too strong ✗\nd) contradicts ✗\ne) that is what it avoids ✗',
        },
        {
          t: 'Check that it covers everything',
          p: 'The main idea has to span the whole text.',
          m: 'c) existence + conditionality ✓',
        },
      ],
      concept: 'Main idea: the most general claim the text supports, not the most striking piece of data.',
      trick: '"However" opens the objection; "then" opens the conclusion. The answer lives after the concluding connective.',
    },
    pt: {
      stem: 'O texto sustenta principalmente que o turismo comunitário:',
      passage:
        'O turismo comunitário cresceu no Peru como alternativa ao circuito de massa. Em comunidades do Colca e do Titicaca, as famílias recebem visitantes em suas casas e administram diretamente a renda. Seus defensores destacam que o dinheiro fica na localidade. Os críticos, porém, alertam que, sem padrões mínimos de serviço, a experiência fica desigual e prejudica a reputação do destino. A discussão, então, não é se o modelo deve existir, mas sob que condições ele pode se sustentar.',
      options: [
        'é economicamente superior ao turismo de massa',
        'deve ser proibido até que existam padrões',
        'é viável e sua continuidade depende de certas condições',
        'fracassou no Colca e no Titicaca',
        'beneficia sobretudo operadores de Lima',
      ],
      steps: [
        {
          t: 'Localize a frase de fechamento',
          p: 'Em textos curtos a tese costuma vir depois de um conectivo conclusivo.',
          m: '"...não é se deve existir, mas sob que\ncondições pode se sustentar."',
        },
        {
          t: 'Reconheça a estrutura',
          p: 'Posição, contraposição, síntese. A síntese é a tese.',
          m: 'Defensores → Críticos → Autor',
        },
        {
          t: 'Descarte por excesso ou falta',
          p: 'Os distratores exageram ou elevam um detalhe a ideia central.',
          m: 'a) não compara ✗\nb) exagero ✗\nd) contradiz ✗\ne) é o que evita ✗',
        },
        {
          t: 'Verifique a cobertura total',
          p: 'A ideia principal abrange todo o texto.',
          m: 'c) existência + condicionalidade ✓',
        },
      ],
      concept: 'Ideia principal: a afirmação mais geral que o texto sustenta, não o dado mais chamativo.',
      trick: '"Porém" abre a objeção; "então" abre a conclusão. A resposta mora depois do conectivo conclusivo.',
    },
  },
  {
    starts: 'El precio de una habitación',
    en: {
      stem: 'A room costs S/ 295 including 18% VAT. What is the sale value before VAT?',
      options: ['S/ 242', 'S/ 250', 'S/ 258', 'S/ 265', 'S/ 272'],
      steps: [
        {
          t: 'Spot the trap',
          p: 'Taking 18% off the final price is wrong: the VAT was worked out on the sale value.',
          m: '295 − 18% = 241.90  ✗ (option a)',
        },
        {
          t: 'Set out the right relationship',
          p: 'The final price is the sale value plus its 18%.',
          m: 'Price = SV × 1.18',
        },
        {
          t: 'Isolate it by dividing',
          p: 'Divide, do not subtract.',
          m: 'SV = 295 ÷ 1.18',
        },
        {
          t: 'Work it out and check',
          p: 'The VAT has to be 18% of the sale value.',
          m: '29,500 ÷ 118 = 250\n250 × 0.18 = 45 → 295 ✓',
        },
      ],
      concept: 'To strip out an included percentage you divide by (1 + i); to add it you multiply.',
      trick: 'Peruvian VAT shortcut: SV ≈ price × 0.847. Here 295 × 0.847 ≈ 250.',
    },
    pt: {
      stem: 'O preço de um quarto é S/ 295 e inclui 18 % de imposto. Qual é o valor de venda sem o imposto?',
      options: ['S/ 242', 'S/ 250', 'S/ 258', 'S/ 265', 'S/ 272'],
      steps: [
        {
          t: 'Identifique a armadilha',
          p: 'Tirar 18 % do preço final está errado: o imposto foi calculado sobre o valor de venda.',
          m: '295 − 18% = 241,90  ✗ (alternativa a)',
        },
        {
          t: 'Monte a relação correta',
          p: 'O preço final é o valor de venda mais os seus 18 %.',
          m: 'Preço = VV × 1,18',
        },
        {
          t: 'Isole dividindo',
          p: 'Divida, não subtraia.',
          m: 'VV = 295 ÷ 1,18',
        },
        {
          t: 'Calcule e comprove',
          p: 'O imposto deve ser 18 % do valor de venda.',
          m: '29 500 ÷ 118 = 250\n250 × 0,18 = 45 → 295 ✓',
        },
      ],
      concept: 'Para tirar uma porcentagem já incluída divide-se por (1 + i); para acrescentá-la, multiplica-se.',
      trick: 'Atalho do imposto peruano: VV ≈ preço × 0,847. Aqui 295 × 0,847 ≈ 250.',
    },
  },
];
