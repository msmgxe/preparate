-- ═══════════════════════════════════════════════════════════════════════════
-- RUMBO · módulo de Inglés — currículo A1→C1 y clases de muestra
-- Generado. Ejecutar después de schema.sql. Reejecutable.
-- ═══════════════════════════════════════════════════════════════════════════

insert into chapters (id,area_id,title,ord) values
  ($rumbo$45f50fa8-6102-51b1-80f8-9f8d23ae4745$rumbo$::uuid,'eng',$rumbo$A1 · Sonidos y supervivencia$rumbo$,1),
  ($rumbo$150c26a6-29e6-5ca2-81de-051ec9873ba0$rumbo$::uuid,'eng',$rumbo$A1 · El presente que más se usa$rumbo$,2),
  ($rumbo$14662e9f-9fd1-5edc-80fc-14785b8d7a72$rumbo$::uuid,'eng',$rumbo$A1 · Las 1000 palabras que cubren el 85 %$rumbo$,3),
  ($rumbo$57f3c7bc-95e3-52ca-887e-b6f1d01af455$rumbo$::uuid,'eng',$rumbo$A1 · Preguntar y responder$rumbo$,4),
  ($rumbo$c427defa-4a01-583b-83dd-28da23c12d80$rumbo$::uuid,'eng',$rumbo$A2 · Contar lo que pasó$rumbo$,5),
  ($rumbo$9f056d89-9517-5342-8b7f-6fd6bf57a27b$rumbo$::uuid,'eng',$rumbo$A2 · Hablar del futuro$rumbo$,6),
  ($rumbo$b9a9fb9d-0094-5188-8638-04a7759915c1$rumbo$::uuid,'eng',$rumbo$A2 · Comparar$rumbo$,7),
  ($rumbo$aac8a8e1-8b19-5171-8f60-4765ee6d49b2$rumbo$::uuid,'eng',$rumbo$A2 · Describir personas y rutinas$rumbo$,8),
  ($rumbo$a6d40301-35dd-5d53-8b64-2c7524789d92$rumbo$::uuid,'eng',$rumbo$B1 · El tiempo que no existe en español$rumbo$,9),
  ($rumbo$adfa473c-1b8a-5d22-87b5-9e4ad96e5ec7$rumbo$::uuid,'eng',$rumbo$B1 · Hipótesis$rumbo$,10),
  ($rumbo$6085a244-6a9f-5c7c-8a73-154d6ea75f13$rumbo$::uuid,'eng',$rumbo$B1 · Cuando el sujeto no importa$rumbo$,11),
  ($rumbo$f1098b70-46a6-52d4-8832-f92f10bc01ca$rumbo$::uuid,'eng',$rumbo$B1 · Los verbos que cambian con la partícula$rumbo$,12),
  ($rumbo$8dbd10ed-1e91-5fd2-8d4c-a8e934bfa3f0$rumbo$::uuid,'eng',$rumbo$B1 · Entender a velocidad real$rumbo$,13),
  ($rumbo$441cc500-d749-5f36-8d5f-831d671772e2$rumbo$::uuid,'eng',$rumbo$B2 · Lo que pudo haber sido$rumbo$,14),
  ($rumbo$bce8902e-34c9-5e41-8e30-2df883a684b9$rumbo$::uuid,'eng',$rumbo$B2 · Contar lo que otro dijo$rumbo$,15),
  ($rumbo$ec2b0a35-91f9-55ab-8054-ffa5f4c3377f$rumbo$::uuid,'eng',$rumbo$B2 · Sonar natural, no correcto$rumbo$,16),
  ($rumbo$99ee3c69-88dd-5906-8209-344541fcd0b2$rumbo$::uuid,'eng',$rumbo$B2 · Defender una postura por escrito$rumbo$,17),
  ($rumbo$944ae400-8768-5ca7-8de5-ca5bbc382e33$rumbo$::uuid,'eng',$rumbo$B2 · Escuchar contenido académico$rumbo$,18),
  ($rumbo$d1c8e716-ca41-5ca7-8728-72fa3ff00295$rumbo$::uuid,'eng',$rumbo$C1 · Poner el foco donde quieres$rumbo$,19),
  ($rumbo$09019c6a-c431-56ba-8e20-efbde7633357$rumbo$::uuid,'eng',$rumbo$C1 · Los matices que separan C1 de B2$rumbo$,20),
  ($rumbo$8a7802ca-9b00-59a1-85cd-9ead82c4698b$rumbo$::uuid,'eng',$rumbo$C1 · Lenguaje figurado$rumbo$,21),
  ($rumbo$11710df9-4e33-5b75-8a48-9e8b7b93f322$rumbo$::uuid,'eng',$rumbo$C1 · Escritura formal$rumbo$,22),
  ($rumbo$51666d8f-012a-5742-8d14-aa818191f4dc$rumbo$::uuid,'eng',$rumbo$C1 · Fluidez bajo presión$rumbo$,23),
  ($rumbo$9fe4e98d-c56a-5135-8be9-717922f0f905$rumbo$::uuid,'eng',$rumbo$C1 · Simulacro completo$rumbo$,24)
on conflict (area_id, title) do update set ord = excluded.ord;

insert into visuals (id,caption,svg,version) values
  ($rumbo$v-eng-sonidos$rumbo$,$rumbo$Tres pares mínimos. Si los dices igual, la frase depende del contexto para salvarse.$rumbo$,$rumbo$<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">
  
  <g class="grow" style="animation-delay:0s">
    <rect x="34" y="34" width="238" height="60" rx="12" fill="rgba(45,212,191,.13)" stroke="#2DD4BF" stroke-width="1.4"/>
    <text x="153" y="60" text-anchor="middle" fill="currentColor" font-size="19">ship</text>
    <text x="153" y="81" text-anchor="middle" fill="#2DD4BF" font-size="13">/ɪ/ · barco</text>

    <text x="320" y="71" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="15">≠</text>

    <rect x="368" y="34" width="238" height="60" rx="12" fill="rgba(239,164,81,.13)" stroke="#EFA451" stroke-width="1.4"/>
    <text x="487" y="60" text-anchor="middle" fill="currentColor" font-size="19">sheep</text>
    <text x="487" y="81" text-anchor="middle" fill="#EFA451" font-size="13">/iː/ · oveja</text>
  </g>
  <g class="grow" style="animation-delay:0.22s">
    <rect x="34" y="122" width="238" height="60" rx="12" fill="rgba(45,212,191,.13)" stroke="#2DD4BF" stroke-width="1.4"/>
    <text x="153" y="148" text-anchor="middle" fill="currentColor" font-size="19">bad</text>
    <text x="153" y="169" text-anchor="middle" fill="#2DD4BF" font-size="13">/æ/ · malo</text>

    <text x="320" y="159" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="15">≠</text>

    <rect x="368" y="122" width="238" height="60" rx="12" fill="rgba(239,164,81,.13)" stroke="#EFA451" stroke-width="1.4"/>
    <text x="487" y="148" text-anchor="middle" fill="currentColor" font-size="19">bed</text>
    <text x="487" y="169" text-anchor="middle" fill="#EFA451" font-size="13">/e/ · cama</text>
  </g>
  <g class="grow" style="animation-delay:0.44s">
    <rect x="34" y="210" width="238" height="60" rx="12" fill="rgba(45,212,191,.13)" stroke="#2DD4BF" stroke-width="1.4"/>
    <text x="153" y="236" text-anchor="middle" fill="currentColor" font-size="19">think</text>
    <text x="153" y="257" text-anchor="middle" fill="#2DD4BF" font-size="13">/θ/ · pensar</text>

    <text x="320" y="247" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="15">≠</text>

    <rect x="368" y="210" width="238" height="60" rx="12" fill="rgba(239,164,81,.13)" stroke="#EFA451" stroke-width="1.4"/>
    <text x="487" y="236" text-anchor="middle" fill="currentColor" font-size="19">sink</text>
    <text x="487" y="257" text-anchor="middle" fill="#EFA451" font-size="13">/s/ · hundirse</text>
  </g>
  <g class="grow" style="animation-delay:.8s">
    <rect x="34" y="286" width="572" height="0" rx="8" fill="none"/>
    <text x="320" y="296" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="12">si los pronuncias igual, quien escucha adivina — y a veces adivina mal</text>
  </g>
</svg>$rumbo$,1),
  ($rumbo$v-eng-perfect$rumbo$,$rumbo$El past simple es un punto cerrado en el pasado. El present perfect es una franja que llega hasta hoy.$rumbo$,$rumbo$<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">
  <line class="grow" style="animation-delay:0s" x1="40" y1="150" x2="600" y2="150" stroke="currentColor" stroke-opacity=".28" stroke-width="1.5"/>
  <text class="grow" style="animation-delay:.05s" x="40" y="175" fill="currentColor" fill-opacity=".64" font-size="11">pasado</text>
  <text class="grow" style="animation-delay:.05s" x="560" y="175" fill="currentColor" fill-opacity=".64" font-size="11">ahora</text>
  <line class="grow" style="animation-delay:.1s" x1="600" y1="126" x2="600" y2="174" stroke="currentColor" stroke-width="2"/>

  <g class="grow" style="animation-delay:.35s">
    <rect x="70" y="52" width="230" height="56" rx="11" fill="rgba(239,164,81,.14)" stroke="#EFA451" stroke-width="1.4"/>
    <text x="185" y="76" text-anchor="middle" fill="currentColor" font-size="15">I lived in Cusco</text>
    <text x="185" y="96" text-anchor="middle" fill="#EFA451" font-size="12">past simple · ya no vivo ahí</text>
    <circle cx="185" cy="150" r="7" fill="#EFA451"/>
    <line x1="185" y1="110" x2="185" y2="141" stroke="#EFA451" stroke-width="1.4" stroke-dasharray="4 3"/>
    <rect x="150" y="140" width="70" height="20" rx="6" fill="rgba(239,164,81,.18)"/>
  </g>

  <g class="grow" style="animation-delay:.7s">
    <rect x="330" y="52" width="270" height="56" rx="11" fill="rgba(45,212,191,.14)" stroke="#2DD4BF" stroke-width="1.4"/>
    <text x="465" y="76" text-anchor="middle" fill="currentColor" font-size="15">I have lived in Cusco</text>
    <text x="465" y="96" text-anchor="middle" fill="#2DD4BF" font-size="12">present perfect · sigo o me marca hoy</text>
    <path d="M 330 150 L 600 150" stroke="#2DD4BF" stroke-width="7" stroke-linecap="round" opacity=".55"/>
    <line x1="465" y1="110" x2="465" y2="141" stroke="#2DD4BF" stroke-width="1.4" stroke-dasharray="4 3"/>
  </g>

  <g class="grow" style="animation-delay:1.05s">
    <rect x="70" y="206" width="530" height="46" rx="10" fill="rgba(255,95,87,.08)" stroke="rgba(255,95,87,.45)" stroke-width="1" stroke-dasharray="5 4"/>
    <text x="335" y="226" text-anchor="middle" fill="#FF5F57" font-size="13">yesterday · in 2019 · last month  →  nunca con present perfect</text>
    <text x="335" y="244" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="12">si dices cuándo, el hecho está cerrado: past simple</text>
  </g>
</svg>$rumbo$,1),
  ($rumbo$v-eng-conditionals$rumbo$,$rumbo$La barra de arriba mide la distancia con lo real. Cuanto más larga, más atrás va el verbo.$rumbo$,$rumbo$<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">
  
  <g class="grow" style="animation-delay:0s">
    <rect x="34" y="30" width="120" height="8" rx="4" fill="#4FD69C" opacity=".5"/>
    <rect x="34" y="48" width="572" height="52" rx="11" fill="rgba(79,214,156,.14)" stroke="#4FD69C" stroke-width="1.3"/>
    <text x="52" y="72" fill="#4FD69C" font-size="13">1st</text>
    <text x="92" y="72" fill="currentColor" font-size="15">If it rains, I will stay.</text>
    <text x="92" y="90" fill="currentColor" fill-opacity=".64" font-size="11.5">posible — pasa a menudo</text>
  </g>
  <g class="grow" style="animation-delay:0.25s">
    <rect x="34" y="118" width="270" height="8" rx="4" fill="#EFA451" opacity=".5"/>
    <rect x="34" y="136" width="572" height="52" rx="11" fill="rgba(239,164,81,.14)" stroke="#EFA451" stroke-width="1.3"/>
    <text x="52" y="160" fill="#EFA451" font-size="13">2nd</text>
    <text x="92" y="160" fill="currentColor" font-size="15">If it rained, I would stay.</text>
    <text x="92" y="178" fill="currentColor" fill-opacity=".64" font-size="11.5">improbable — imagino otra realidad</text>
  </g>
  <g class="grow" style="animation-delay:0.5s">
    <rect x="34" y="206" width="420" height="8" rx="4" fill="#FF5F57" opacity=".5"/>
    <rect x="34" y="224" width="572" height="52" rx="11" fill="rgba(255,95,87,.12)" stroke="#FF5F57" stroke-width="1.3"/>
    <text x="52" y="248" fill="#FF5F57" font-size="13">3rd</text>
    <text x="92" y="248" fill="currentColor" font-size="15">If it had rained, I would have stayed.</text>
    <text x="92" y="266" fill="currentColor" fill-opacity=".64" font-size="11.5">imposible — ya no se puede cambiar</text>
  </g>
  <g class="grow" style="animation-delay:.9s">
    <text x="34" y="290" fill="currentColor" fill-opacity=".64" font-size="12">cuanto más lejos de lo real, un paso más atrás en el tiempo verbal</text>
  </g>
</svg>$rumbo$,1)
on conflict (id) do update set svg = excluded.svg, caption = excluded.caption,
  version = visuals.version + 1, updated_at = now();

insert into lessons (id,chapter_id,slug,title,hook,minutes,status) values
  ($rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,$rumbo$45f50fa8-6102-51b1-80f8-9f8d23ae4745$rumbo$::uuid,$rumbo$eng-sonidos$rumbo$,$rumbo$Los cinco sonidos que te delatan$rumbo$,$rumbo$No es el vocabulario lo que hace que te pidan repetir: son cinco sonidos que el español no tiene y que tu boca nunca aprendió a formar. Se arreglan en una semana si sabes cuáles son.$rumbo$,6,'published'),
  ($rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,$rumbo$a6d40301-35dd-5d53-8b64-2c7524789d92$rumbo$::uuid,$rumbo$eng-perfect$rumbo$,$rumbo$Present perfect: el pasado que todavía te toca$rumbo$,$rumbo$En español dices «viví en Cusco» y «he vivido en Cusco» casi indistintamente. En inglés esa elección cambia el significado, y elegir mal es la marca más clara de un B1 que no termina de despegar.$rumbo$,7,'published'),
  ($rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,$rumbo$441cc500-d749-5f36-8d5f-831d671772e2$rumbo$::uuid,$rumbo$eng-conditionals$rumbo$,$rumbo$Condicionales: cuánto te alejas de lo real$rumbo$,$rumbo$Los condicionales no son tres reglas sueltas que memorizar. Son una sola idea: cuanto más te alejas de lo que puede pasar, un paso más atrás das en el tiempo verbal. Con eso entendido, los tres salen solos.$rumbo$,7,'published')
on conflict (slug) do update set title=excluded.title, hook=excluded.hook,
  minutes=excluded.minutes, status=excluded.status;

insert into lesson_blocks (id,lesson_id,ord,kind,payload) values
  ($rumbo$d1b41d39-79c2-58c4-8ade-e408f56a4741$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,0,'text',$rumbo${"h":"El problema no es tu acento","p":"Tener acento está bien: lo tienen los irlandeses, los indios y los australianos. El problema es otro: cuando dos palabras distintas te salen <strong>idénticas</strong>, quien escucha tiene que adivinar. Y a veces adivina mal."}$rumbo$::jsonb),
  ($rumbo$e36793e5-6194-555d-86e0-ed3aa43b1f04$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,1,'viz',$rumbo${"viz_id":"v-eng-sonidos","caption":"Tres pares mínimos. Si los dices igual, la frase depende del contexto para salvarse."}$rumbo$::jsonb),
  ($rumbo$cc0128e4-301a-517a-82f1-97835991982f$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,2,'text',$rumbo${"h":"La vocal corta que no existe en español","p":"El español tiene cinco vocales. El inglés tiene doce. La más traicionera es <strong>/ɪ/</strong>, la de <em>ship</em>: no es una <em>i</em> corta, es un sonido intermedio entre la <em>i</em> y la <em>e</em>, con la boca más relajada. Si la pronuncias como la <em>i</em> española, dices <em>sheep</em>."}$rumbo$::jsonb),
  ($rumbo$eb4b6970-353c-567f-87aa-860146866bc0$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,3,'callout',$rumbo${"t":"Por qué cuesta tanto","p":"A los seis meses de vida tu oído ya dejó de distinguir los sonidos que no estaban en tu idioma. No es un problema de boca: es que literalmente no oyes la diferencia. Por eso el orden correcto es escuchar primero y pronunciar después, nunca al revés."}$rumbo$::jsonb),
  ($rumbo$8d09beea-6224-5e8f-886a-88e355022cb7$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,4,'text',$rumbo${"h":"El método: pares mínimos, cinco minutos al día","p":"<strong>1.</strong> Escucha dos palabras que solo se diferencian en ese sonido y trata de acertar cuál es.<br><strong>2.</strong> Cuando aciertes ocho de diez, empieza a producirlas tú.<br><strong>3.</strong> Grábate y compara con el original. La diferencia que oigas es la que tienes que corregir."}$rumbo$::jsonb),
  ($rumbo$6666cac7-8bcf-54f3-8cc6-fc4e229b9a76$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,5,'check',$rumbo${"q":"¿Cuál es el orden correcto para arreglar un sonido?","opts":["Pronunciar y luego escuchar","Escuchar hasta distinguir y luego pronunciar","Memorizar la transcripción fonética"],"ans":1,"ok":"Exacto. Si no distingues el sonido al oírlo, no tienes cómo saber si lo estás produciendo bien.","no":"Al revés: primero el oído. Producir un sonido que todavía no distingues solo fija el error."}$rumbo$::jsonb),
  ($rumbo$20b359e7-ea07-5bb3-820b-b31bb00c9294$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,6,'err',$rumbo${"items":["Pronunciar la <em>th</em> de <em>think</em> como <em>s</em> o como <em>t</em>: son tres palabras distintas.","Añadir una <em>e</em> delante de las palabras que empiezan por s + consonante: <em>espanish</em> en vez de <em>Spanish</em>.","Pronunciar todas las vocales largas. <em>Sheep</em> y <em>ship</em> se distinguen tanto por duración como por timbre.","Estudiar la transcripción fonética sin escuchar nunca el audio."]}$rumbo$::jsonb),
  ($rumbo$f4c31c26-82fc-5ade-81e7-4755097975cb$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,7,'video',$rumbo${}$rumbo$::jsonb),
  ($rumbo$38a6f755-f7cc-57bc-80f3-1f972649b8d0$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,0,'text',$rumbo${"h":"No es un tiempo del pasado","p":"Ese es el error de raíz. El <strong>present perfect</strong> se llama <em>present</em> por algo: habla de <strong>ahora</strong>. Lo que pasó antes solo importa por la huella que dejó en el presente."}$rumbo$::jsonb),
  ($rumbo$956750cc-0f3b-5714-8d22-6abe5bf6a47c$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,1,'viz',$rumbo${"viz_id":"v-eng-perfect","caption":"El past simple es un punto cerrado en el pasado. El present perfect es una franja que llega hasta hoy."}$rumbo$::jsonb),
  ($rumbo$c30d9189-8af3-5f2b-850f-cce088abf1ab$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,2,'text',$rumbo${"h":"La prueba que nunca falla","p":"Pregúntate: <strong>¿estoy diciendo cuándo pasó?</strong> Si la respuesta es sí — <em>yesterday</em>, <em>in 2019</em>, <em>last month</em>, <em>when I was a kid</em> — entonces el hecho está cerrado y va en <strong>past simple</strong>. Si no dices cuándo, porque lo que importa es el resultado, va en <strong>present perfect</strong>."}$rumbo$::jsonb),
  ($rumbo$75c49a36-3877-559a-888c-11665b313a61$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,3,'math',$rumbo${"m":"I have lost my keys.        → y sigo sin ellas\nI lost my keys yesterday.   → dije cuándo: cerrado\n\nHave you ever been to Lima? → en toda tu vida hasta hoy\nDid you go to Lima in May?  → aquel viaje concreto"}$rumbo$::jsonb),
  ($rumbo$fdca9fcd-12b8-5e7d-8e6a-e89d1066bb65$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,4,'callout',$rumbo${"t":"Por qué el español confunde","p":"En España «he perdido las llaves» y en América «perdí las llaves» significan lo mismo: el pretérito perfecto compuesto es una variación regional, no un cambio de sentido. En inglés no: la diferencia es de significado, y quien escucha la nota."}$rumbo$::jsonb),
  ($rumbo$1f5671b8-1165-5d97-8772-d002dcfe9b23$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,5,'check',$rumbo${"q":"¿Cuál es correcta?","opts":["I have finished the exam last Friday.","I finished the exam last Friday.","I have finish the exam last Friday."],"ans":1,"ok":"Correcto. «Last Friday» dice cuándo, así que el hecho está cerrado: past simple.","no":"Fíjate en «last Friday»: estás diciendo cuándo. Con un momento concreto del pasado, siempre past simple."}$rumbo$::jsonb),
  ($rumbo$0da1be53-ab08-5b1f-8dac-3c65b1866845$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,6,'err',$rumbo${"items":["Usar present perfect con <em>yesterday</em>, <em>ago</em> o un año concreto. Es el error más penalizado en los exámenes.","Traducir «hace tres años que estudio inglés» como <em>I study English for three years</em>. Es <em>I have been studying</em>.","Confundir <em>been</em> con <em>gone</em>: <em>he has been to Lima</em> (fue y volvió) frente a <em>he has gone to Lima</em> (está allá).","Olvidar que el participio no siempre es el pasado: <em>go / went / gone</em>."]}$rumbo$::jsonb),
  ($rumbo$4f4dc88a-1b70-5b7f-8644-60e40cf773d6$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,7,'video',$rumbo${}$rumbo$::jsonb),
  ($rumbo$31fb9491-6070-58e0-8b2f-b6ebabf915cb$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,0,'text',$rumbo${"h":"Una escala, no una lista","p":"La gramática los numera —primero, segundo, tercero— y eso hace pensar en tres reglas independientes. Son lo mismo visto a tres distancias: <strong>lo que puede pasar</strong>, <strong>lo que me imagino</strong> y <strong>lo que ya no se puede cambiar</strong>."}$rumbo$::jsonb),
  ($rumbo$a4d4c894-0189-5829-8a5c-4dbbe91a6029$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,1,'viz',$rumbo${"viz_id":"v-eng-conditionals","caption":"La barra de arriba mide la distancia con lo real. Cuanto más larga, más atrás va el verbo."}$rumbo$::jsonb),
  ($rumbo$e29b0614-09de-53ef-88b7-e494d4b84422$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,2,'text',$rumbo${"h":"El paso atrás","p":"Para hablar de lo posible usas presente: <em>if it rains</em>. Para alejarte a lo imaginario retrocedes un paso: <em>if it rained</em> — y fíjate que ese pasado <strong>no habla del pasado</strong>, habla de lo improbable. Para lo imposible retrocedes otro: <em>if it had rained</em>."}$rumbo$::jsonb),
  ($rumbo$f1e9de9c-971e-592c-8c35-ffa909ce3995$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,3,'callout',$rumbo${"t":"Por qué funciona","p":"El inglés usa la distancia temporal para marcar distancia con la realidad. Es el mismo mecanismo del subjuntivo español en «si lloviera»: un pasado que no es pasado. Reconocerlo te ahorra memorizar tablas."}$rumbo$::jsonb),
  ($rumbo$ad7cd2fb-5c9d-5ff7-8234-2c831b75f0af$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,4,'math',$rumbo${"m":"posible      if + present     , will + verbo\nimprobable   if + past        , would + verbo\nimposible    if + past perfect, would have + participio"}$rumbo$::jsonb),
  ($rumbo$359093e4-dbf3-5fd7-84f2-908aac1eccb0$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,5,'check',$rumbo${"q":"Ayer no estudiaste y suspendiste. ¿Cómo lo lamentas?","opts":["If I studied, I would pass.","If I had studied, I would have passed.","If I study, I will pass."],"ans":1,"ok":"Exacto. Ya pasó y no se puede cambiar: tercer condicional.","no":"El examen ya pasó y no se puede cambiar. Eso es imposible, no improbable: if + past perfect, would have + participio."}$rumbo$::jsonb),
  ($rumbo$88b5efc4-ddcf-51ac-8c2a-8608da475bdb$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,6,'err',$rumbo${"items":["Poner <em>would</em> dentro del <em>if</em>: se dice <em>if I had known</em>, no <em>if I would have known</em>.","Usar el segundo condicional para algo que ya ocurrió. Si ya pasó, es el tercero.","Traducir literalmente «si tuviera» como <em>if I would have</em>.","Olvidar que <em>were</em> vale para todas las personas: <em>if I were you</em>."]}$rumbo$::jsonb),
  ($rumbo$f1bfab20-0d8b-5296-82a6-dfbad9f5344c$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,7,'video',$rumbo${}$rumbo$::jsonb)
on conflict (lesson_id, ord) do update set kind = excluded.kind, payload = excluded.payload;

insert into lesson_videos (id,lesson_id,title,source,url,ord) values
  ($rumbo$2badd0f0-8e68-5326-8505-9a1ceb94e307$rumbo$::uuid,$rumbo$6b3ab2ae-4a41-5776-8b16-0eb7ca020169$rumbo$::uuid,$rumbo$Pares mínimos en inglés — práctica de escucha$rumbo$,$rumbo$BBC Learning English · pronunciación por sonido$rumbo$,$rumbo$https://www.bbc.co.uk/learningenglish/english/features/pronunciation$rumbo$,0),
  ($rumbo$ffe2b4ac-2f54-515a-8711-cda54b294b26$rumbo$::uuid,$rumbo$1c592e83-d440-521c-823d-1fd2f8642841$rumbo$::uuid,$rumbo$Present perfect vs past simple$rumbo$,$rumbo$Cambridge English · explicación y práctica$rumbo$,$rumbo$https://www.cambridgeenglish.org/learning-english/$rumbo$,0),
  ($rumbo$425f73c6-08fa-5b00-894e-50685c4b1969$rumbo$::uuid,$rumbo$afef2ca7-a285-517a-8d47-9e9f73b87fa9$rumbo$::uuid,$rumbo$Conditionals — explicación completa$rumbo$,$rumbo$British Council · LearnEnglish$rumbo$,$rumbo$https://learnenglish.britishcouncil.org/grammar$rumbo$,0)
on conflict (id) do update set title=excluded.title, source=excluded.source, url=excluded.url;
