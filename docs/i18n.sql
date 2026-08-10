-- ════════════════════════════════════════════════════════════════════════════
-- RUMBO · traducciones del contenido (inglés y portugués de Brasil)
-- ════════════════════════════════════════════════════════════════════════════
--
-- El español vive en las columnas normales y hace de respaldo. Aquí solo van
-- las otras dos lenguas, dentro de la columna `i18n` de cada tabla.
--
-- Se aplica con `npm run db:i18n` y es idempotente: vuelve a escribir el mismo
-- objeto cada vez. Los `update` buscan por título, no por id, porque los ids
-- son UUID derivados y se leen peor en una revisión.
--
-- El módulo de Inglés (`eng`) no se traduce: se vende solo a hispanohablantes,
-- y sus explicaciones están escritas para alguien que piensa en español.

-- ── 1 · áreas ───────────────────────────────────────────────────────────────

update areas set i18n = '{
  "en": {
    "name": "Mathematical Reasoning",
    "short": "MR",
    "tagline": "The area that weighs most and trains best",
    "blurb": "Sequences, setting up equations, ages, percentages, operators, figure counting, probability and time problems."
  },
  "pt": {
    "name": "Raciocínio Matemático",
    "short": "RM",
    "tagline": "A área que mais pesa e mais se treina",
    "blurb": "Sequências, montagem de equações, idades, porcentagens, operadores, contagem de figuras, probabilidade e cronometria."
  }
}'::jsonb where id = 'rm';

update areas set i18n = '{
  "en": {
    "name": "Verbal Aptitude",
    "short": "VA",
    "tagline": "Where half the score is decided",
    "blurb": "Reading comprehension, analogies, synonyms and antonyms, odd one out, connectives, text planning and sentence completion."
  },
  "pt": {
    "name": "Aptidão Verbal",
    "short": "AV",
    "tagline": "Onde se decide metade da nota",
    "blurb": "Compreensão de leitura, analogias, sinônimos e antônimos, termo excluído, conectivos, plano de redação e frases incompletas."
  }
}'::jsonb where id = 'rv';

update areas set i18n = '{
  "en": {
    "name": "Mathematics",
    "short": "MATH",
    "tagline": "The base that holds up everything else",
    "blurb": "Commercial arithmetic, algebra, systems of equations, proportionality, plane geometry and statistics."
  },
  "pt": {
    "name": "Matemática",
    "short": "MAT",
    "tagline": "A base que sustenta todo o resto",
    "blurb": "Aritmética comercial, álgebra, sistemas de equações, proporcionalidade, geometria plana e estatística."
  }
}'::jsonb where id = 'mat';

update areas set i18n = '{
  "en": {
    "name": "General Knowledge",
    "short": "GK",
    "tagline": "Quick points almost nobody prepares",
    "blurb": "History of Peru, geography and tourism, economics and current affairs, literature and civics."
  },
  "pt": {
    "name": "Cultura Geral",
    "short": "CG",
    "tagline": "Pontos rápidos que quase ninguém prepara",
    "blurb": "História do Peru, geografia e turismo, economia e atualidades, literatura e educação cívica."
  }
}'::jsonb where id = 'cg';

-- ── 2 · capítulos ───────────────────────────────────────────────────────────

update chapters set i18n = '{"en":{"title":"History of Peru"},"pt":{"title":"História do Peru"}}'::jsonb
  where area_id = 'cg' and title = 'Historia del Perú';
update chapters set i18n = '{"en":{"title":"Geography and tourism"},"pt":{"title":"Geografia e turismo"}}'::jsonb
  where area_id = 'cg' and title = 'Geografía y turismo';
update chapters set i18n = '{"en":{"title":"Economics and current affairs"},"pt":{"title":"Economia e atualidades"}}'::jsonb
  where area_id = 'cg' and title = 'Economía y actualidad';
update chapters set i18n = '{"en":{"title":"Literature"},"pt":{"title":"Literatura"}}'::jsonb
  where area_id = 'cg' and title = 'Literatura';
update chapters set i18n = '{"en":{"title":"Civics"},"pt":{"title":"Educação cívica"}}'::jsonb
  where area_id = 'cg' and title = 'Educación cívica';

update chapters set i18n = '{"en":{"title":"Commercial arithmetic"},"pt":{"title":"Aritmética comercial"}}'::jsonb
  where area_id = 'mat' and title = 'Aritmética comercial';
update chapters set i18n = '{"en":{"title":"Basic algebra"},"pt":{"title":"Álgebra básica"}}'::jsonb
  where area_id = 'mat' and title = 'Álgebra básica';
update chapters set i18n = '{"en":{"title":"Systems of equations"},"pt":{"title":"Sistemas de equações"}}'::jsonb
  where area_id = 'mat' and title = 'Sistemas de ecuaciones';
update chapters set i18n = '{"en":{"title":"Proportionality"},"pt":{"title":"Proporcionalidade"}}'::jsonb
  where area_id = 'mat' and title = 'Proporcionalidad';
update chapters set i18n = '{"en":{"title":"Plane geometry"},"pt":{"title":"Geometria plana"}}'::jsonb
  where area_id = 'mat' and title = 'Geometría plana';
update chapters set i18n = '{"en":{"title":"Descriptive statistics"},"pt":{"title":"Estatística descritiva"}}'::jsonb
  where area_id = 'mat' and title = 'Estadística descriptiva';

update chapters set i18n = '{"en":{"title":"Sequences and series"},"pt":{"title":"Sequências e séries"}}'::jsonb
  where area_id = 'rm' and title = 'Sucesiones y series';
update chapters set i18n = '{"en":{"title":"Setting up equations"},"pt":{"title":"Montagem de equações"}}'::jsonb
  where area_id = 'rm' and title = 'Planteo de ecuaciones';
update chapters set i18n = '{"en":{"title":"Age problems"},"pt":{"title":"Problemas de idade"}}'::jsonb
  where area_id = 'rm' and title = 'Edades';
update chapters set i18n = '{"en":{"title":"Fractions and percentages"},"pt":{"title":"Frações e porcentagens"}}'::jsonb
  where area_id = 'rm' and title = 'Fracciones y porcentajes';
update chapters set i18n = '{"en":{"title":"Mathematical operators"},"pt":{"title":"Operadores matemáticos"}}'::jsonb
  where area_id = 'rm' and title = 'Operadores matemáticos';
update chapters set i18n = '{"en":{"title":"Counting figures"},"pt":{"title":"Contagem de figuras"}}'::jsonb
  where area_id = 'rm' and title = 'Conteo de figuras';
update chapters set i18n = '{"en":{"title":"Certainties and probability"},"pt":{"title":"Certezas e probabilidade"}}'::jsonb
  where area_id = 'rm' and title = 'Certezas y probabilidad';
update chapters set i18n = '{"en":{"title":"Clocks and calendars"},"pt":{"title":"Cronometria"}}'::jsonb
  where area_id = 'rm' and title = 'Cronometría';

update chapters set i18n = '{"en":{"title":"Reading comprehension"},"pt":{"title":"Compreensão de leitura"}}'::jsonb
  where area_id = 'rv' and title = 'Comprensión lectora';
update chapters set i18n = '{"en":{"title":"Analogies"},"pt":{"title":"Analogias"}}'::jsonb
  where area_id = 'rv' and title = 'Analogías';
update chapters set i18n = '{"en":{"title":"Synonyms and antonyms"},"pt":{"title":"Sinônimos e antônimos"}}'::jsonb
  where area_id = 'rv' and title = 'Sinónimos y antónimos';
update chapters set i18n = '{"en":{"title":"Odd one out"},"pt":{"title":"Termo excluído"}}'::jsonb
  where area_id = 'rv' and title = 'Término excluido';
update chapters set i18n = '{"en":{"title":"Logical connectives"},"pt":{"title":"Conectivos lógicos"}}'::jsonb
  where area_id = 'rv' and title = 'Conectores lógicos';
update chapters set i18n = '{"en":{"title":"Text planning"},"pt":{"title":"Plano de redação"}}'::jsonb
  where area_id = 'rv' and title = 'Plan de redacción';
update chapters set i18n = '{"en":{"title":"Sentence completion"},"pt":{"title":"Frases incompletas"}}'::jsonb
  where area_id = 'rv' and title = 'Oraciones incompletas';

-- ── 3 · planes ──────────────────────────────────────────────────────────────

update plans set i18n = '{
  "en": {
    "name": "Monthly",
    "tagline": "To try the full platform before the exam.",
    "audience": "Best if the exam is soon and you want to size things up.",
    "cta": "Start this month",
    "features": [
      "All 4 admission modules open",
      "Unlimited timed mock exams",
      "Visual lessons and step-by-step solutions",
      "Error log with spaced repetition",
      "Cancel whenever you want"
    ]
  },
  "pt": {
    "name": "Mensal",
    "tagline": "Para testar a plataforma completa antes da prova.",
    "audience": "Ideal se a prova é logo e você quer medir o terreno.",
    "cta": "Começar este mês",
    "features": [
      "Os 4 módulos de admissão abertos",
      "Simulados cronometrados ilimitados",
      "Aulas visuais e resolução passo a passo",
      "Registro de erros com repetição espaçada",
      "Cancele quando quiser"
    ]
  }
}'::jsonb where id = 'mensual';

update plans set i18n = '{
  "en": {
    "name": "Admission Pass",
    "tagline": "The whole year at half the price. What 8 out of 10 choose.",
    "audience": "Covers both the January and July intakes.",
    "cta": "Secure my place",
    "features": [
      "Everything in the Monthly plan",
      "You save S/ 478 compared with paying month by month",
      "Early access to the English C1 module",
      "Mock exams by institution: ISIL, USIL, UPC",
      "Study plan based on your initial diagnostic",
      "Price frozen for as long as you renew"
    ]
  },
  "pt": {
    "name": "Passe de Admissão",
    "tagline": "O ano todo pela metade do preço. O plano que 8 em cada 10 escolhem.",
    "audience": "Cobre as convocatórias de janeiro e julho.",
    "cta": "Garantir minha vaga",
    "features": [
      "Tudo do plano Mensal",
      "Você economiza S/ 478 em relação a pagar mês a mês",
      "Acesso antecipado ao módulo de Inglês C1",
      "Simulados por instituição: ISIL, USIL, UPC",
      "Plano de estudo conforme seu diagnóstico inicial",
      "Preço congelado enquanto você renovar"
    ]
  }
}'::jsonb where id = 'anual';

update plans set i18n = '{
  "en": {
    "name": "Family",
    "tagline": "For parents who want to be present without nagging.",
    "audience": "Includes a weekly report and personal guidance.",
    "cta": "Talk to an advisor",
    "features": [
      "Everything in the Admission Pass",
      "Weekly progress report to the parents email",
      "Alert if your child stops practising for 4 days",
      "2 question-and-answer sessions a month with a teacher",
      "Up to 2 students on the same subscription",
      "Guarantee: if they do not get in, you renew the year free"
    ]
  },
  "pt": {
    "name": "Familiar",
    "tagline": "Para pais que querem acompanhar sem cobrar.",
    "audience": "Inclui relatório semanal e orientação pessoal.",
    "cta": "Falar com um consultor",
    "features": [
      "Tudo do Passe de Admissão",
      "Relatório semanal de progresso no e-mail dos pais",
      "Alerta se seu filho parar de praticar por 4 dias",
      "2 sessões de dúvidas por mês com um professor",
      "Até 2 alunos na mesma assinatura",
      "Garantia: se não passar, você renova o ano sem custo"
    ]
  }
}'::jsonb where id = 'familiar';
