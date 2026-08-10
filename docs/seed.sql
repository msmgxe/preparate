-- ═══════════════════════════════════════════════════════════════════════════
-- RUMBO v0.2 — semilla de contenido (generada desde rumbo-v2.html)
-- Ejecutar DESPUÉS de schema.sql. Es reejecutable: usa ids deterministas.
-- ═══════════════════════════════════════════════════════════════════════════

insert into areas (id,name,short,symbol,accent,glow,ord) values
  ($rumbo$rm$rumbo$,$rumbo$Razonamiento Matemático$rumbo$,$rumbo$RM$rumbo$,$rumbo$∑$rumbo$,$rumbo$#EFA451$rumbo$,$rumbo$rgba(239,164,81,.14)$rumbo$,1),
  ($rumbo$rv$rumbo$,$rumbo$Aptitud Verbal$rumbo$,$rumbo$RV$rumbo$,$rumbo$A$rumbo$,$rumbo$#66BFE8$rumbo$,$rumbo$rgba(102,191,232,.14)$rumbo$,2),
  ($rumbo$mat$rumbo$,$rumbo$Matemática$rumbo$,$rumbo$MAT$rumbo$,$rumbo$π$rumbo$,$rumbo$#4FD69C$rumbo$,$rumbo$rgba(79,214,156,.13)$rumbo$,3),
  ($rumbo$cg$rumbo$,$rumbo$Cultura General$rumbo$,$rumbo$CG$rumbo$,$rumbo$◈$rumbo$,$rumbo$#B08BE8$rumbo$,$rumbo$rgba(176,139,232,.13)$rumbo$,4)
on conflict (id) do update set name=excluded.name, short=excluded.short,
  symbol=excluded.symbol, accent=excluded.accent, glow=excluded.glow, ord=excluded.ord;

insert into chapters (id,area_id,title,ord) values
  ($rumbo$87ba7403-5815-5f1f-8f31-1e53bb3eb86c$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Sucesiones y series$rumbo$,1),
  ($rumbo$ed4a5d27-361a-535d-84aa-d321ac2e6931$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Planteo de ecuaciones$rumbo$,2),
  ($rumbo$34229bea-91d6-539a-8437-33b1f83cb934$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Edades$rumbo$,3),
  ($rumbo$dc759723-eee4-5410-8e56-e3791a5be271$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Fracciones y porcentajes$rumbo$,4),
  ($rumbo$67904821-6db0-58d7-8dfb-5185e35bf314$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Operadores matemáticos$rumbo$,5),
  ($rumbo$358a43db-a4ec-5222-8a51-80ac08208bd7$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Conteo de figuras$rumbo$,6),
  ($rumbo$be9f2226-2a64-5c59-8303-3b74f0b221cc$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Certezas y probabilidad$rumbo$,7),
  ($rumbo$ea851ebf-c249-5fe6-8451-50def5617d31$rumbo$::uuid,$rumbo$rm$rumbo$,$rumbo$Cronometría$rumbo$,8),
  ($rumbo$4d6ea08c-3866-5660-8fc0-fdb459241144$rumbo$::uuid,$rumbo$rv$rumbo$,$rumbo$Comprensión lectora$rumbo$,1),
  ($rumbo$b3e0cc0b-497d-5cf5-8c77-5ca76792bbea$rumbo$::uuid,$rumbo$rv$rumbo$,$rumbo$Analogías$rumbo$,2),
  ($rumbo$daeac153-b6b2-56f4-8a7b-8f6416409207$rumbo$::uuid,$rumbo$rv$rumbo$,$rumbo$Sinónimos y antónimos$rumbo$,3),
  ($rumbo$31dd7912-b912-569b-8abe-10760b6d7b97$rumbo$::uuid,$rumbo$rv$rumbo$,$rumbo$Término excluido$rumbo$,4),
  ($rumbo$d626f189-ca3b-5fbb-8cb5-b9498a54b013$rumbo$::uuid,$rumbo$rv$rumbo$,$rumbo$Conectores lógicos$rumbo$,5),
  ($rumbo$d9c245c8-4629-5886-8e84-9074f674ae1f$rumbo$::uuid,$rumbo$rv$rumbo$,$rumbo$Plan de redacción$rumbo$,6),
  ($rumbo$21f38d36-7be0-5241-8d8e-b5523872e54c$rumbo$::uuid,$rumbo$rv$rumbo$,$rumbo$Oraciones incompletas$rumbo$,7),
  ($rumbo$20c065d3-edac-55f4-8752-b68bcd20c2c5$rumbo$::uuid,$rumbo$mat$rumbo$,$rumbo$Aritmética comercial$rumbo$,1),
  ($rumbo$3512cb1f-39dc-5287-899d-a7446703e2f0$rumbo$::uuid,$rumbo$mat$rumbo$,$rumbo$Álgebra básica$rumbo$,2),
  ($rumbo$e75705b4-d94c-513f-84a8-28311f4a860f$rumbo$::uuid,$rumbo$mat$rumbo$,$rumbo$Sistemas de ecuaciones$rumbo$,3),
  ($rumbo$f1b45409-a689-5594-815d-9e53edb074ac$rumbo$::uuid,$rumbo$mat$rumbo$,$rumbo$Proporcionalidad$rumbo$,4),
  ($rumbo$7aa51644-28e7-5591-8702-63779eaa1694$rumbo$::uuid,$rumbo$mat$rumbo$,$rumbo$Geometría plana$rumbo$,5),
  ($rumbo$2fd0506a-f15c-5d0c-84ab-4a87603f7d2a$rumbo$::uuid,$rumbo$mat$rumbo$,$rumbo$Estadística descriptiva$rumbo$,6),
  ($rumbo$e36d308e-1943-5526-8793-95e13aa51f7a$rumbo$::uuid,$rumbo$cg$rumbo$,$rumbo$Historia del Perú$rumbo$,1),
  ($rumbo$59d1a342-b929-5475-8fab-4e151de5c6ac$rumbo$::uuid,$rumbo$cg$rumbo$,$rumbo$Geografía y turismo$rumbo$,2),
  ($rumbo$3810d85f-8513-51e8-8f9e-a024590347c3$rumbo$::uuid,$rumbo$cg$rumbo$,$rumbo$Economía y actualidad$rumbo$,3),
  ($rumbo$16534123-796d-5b2d-8d8e-35abeec86425$rumbo$::uuid,$rumbo$cg$rumbo$,$rumbo$Literatura$rumbo$,4),
  ($rumbo$01df9161-b092-5b8d-861f-fbd67c30287b$rumbo$::uuid,$rumbo$cg$rumbo$,$rumbo$Educación cívica$rumbo$,5)
on conflict (area_id, title) do update set ord = excluded.ord;

insert into exam_profiles (id,name,description,n_questions,seconds,mix,ord) values
  ('isil','ISIL — Evaluación de Potencial','20 preguntas cronometradas con la mezcla real: 50 % Aptitud Verbal, 50 % Razonamiento Matemático. Sin pistas hasta el final.',20,600,$rumbo${"rm":50,"rv":50}$rumbo$::jsonb,1),
  ('usil','USIL — Examen de admisión','Mezcla ampliada con Matemática.',25,1500,$rumbo${"rm":40,"rv":40,"mat":20}$rumbo$::jsonb,2),
  ('upc','UPC — Prueba de admisión','Énfasis en comprensión lectora y matemática.',25,1500,$rumbo${"rv":40,"rm":30,"mat":30}$rumbo$::jsonb,3)
on conflict (id) do nothing;

insert into visuals (id,caption,svg,version) values
  ($rumbo$v-suc$rumbo$,$rumbo$Primera fila: la sucesión. Segunda: cuánto salta cada paso. Tercera: cuánto crece el salto. Cuando la última fila es constante, ya ganaste.$rumbo$,$rumbo$<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">
  
    <g class="an" style="animation-delay:0s">
      <circle cx="58" cy="42" r="27" fill="rgba(239,164,81,.14)" stroke="#EFA451" stroke-width="1.6"/>
      <text x="58" y="49" text-anchor="middle" fill="currentColor" font-size="19">2</text>
    </g>
    <g class="an" style="animation-delay:0.13s">
      <circle cx="176" cy="42" r="27" fill="rgba(239,164,81,.14)" stroke="#EFA451" stroke-width="1.6"/>
      <text x="176" y="49" text-anchor="middle" fill="currentColor" font-size="19">6</text>
    </g>
    <g class="an" style="animation-delay:0.26s">
      <circle cx="294" cy="42" r="27" fill="rgba(239,164,81,.14)" stroke="#EFA451" stroke-width="1.6"/>
      <text x="294" y="49" text-anchor="middle" fill="currentColor" font-size="19">12</text>
    </g>
    <g class="an" style="animation-delay:0.39s">
      <circle cx="412" cy="42" r="27" fill="rgba(239,164,81,.14)" stroke="#EFA451" stroke-width="1.6"/>
      <text x="412" y="49" text-anchor="middle" fill="currentColor" font-size="19">20</text>
    </g>
    <g class="an" style="animation-delay:0.52s">
      <circle cx="530" cy="42" r="27" fill="rgba(239,164,81,.14)" stroke="#EFA451" stroke-width="1.6"/>
      <text x="530" y="49" text-anchor="middle" fill="currentColor" font-size="19">30</text>
    </g>
  <g class="an" style="animation-delay:.72s">
    <circle cx="648" cy="42" r="27" fill="rgba(79,214,156,.16)" stroke="#4FD69C" stroke-width="1.8" stroke-dasharray="5 4"/>
    <text x="648" y="50" text-anchor="middle" fill="#4FD69C" font-size="20">?</text>
  </g>
  
    <g class="grow" style="animation-delay:0.85s">
      <path d="M 76 62 Q 117 108 158 62" fill="none" stroke="#66BFE8" stroke-width="1.5" opacity=".65"/>
      <rect x="98" y="98" width="38" height="24" rx="7" fill="rgba(102,191,232,.16)" stroke="#66BFE8" stroke-width="1"/>
      <text x="117" y="115" text-anchor="middle" fill="#66BFE8" font-size="13">+4</text>
    </g>
    <g class="grow" style="animation-delay:0.98s">
      <path d="M 194 62 Q 235 108 276 62" fill="none" stroke="#66BFE8" stroke-width="1.5" opacity=".65"/>
      <rect x="216" y="98" width="38" height="24" rx="7" fill="rgba(102,191,232,.16)" stroke="#66BFE8" stroke-width="1"/>
      <text x="235" y="115" text-anchor="middle" fill="#66BFE8" font-size="13">+6</text>
    </g>
    <g class="grow" style="animation-delay:1.1099999999999999s">
      <path d="M 312 62 Q 353 108 394 62" fill="none" stroke="#66BFE8" stroke-width="1.5" opacity=".65"/>
      <rect x="334" y="98" width="38" height="24" rx="7" fill="rgba(102,191,232,.16)" stroke="#66BFE8" stroke-width="1"/>
      <text x="353" y="115" text-anchor="middle" fill="#66BFE8" font-size="13">+8</text>
    </g>
    <g class="grow" style="animation-delay:1.24s">
      <path d="M 430 62 Q 471 108 512 62" fill="none" stroke="#66BFE8" stroke-width="1.5" opacity=".65"/>
      <rect x="452" y="98" width="38" height="24" rx="7" fill="rgba(102,191,232,.16)" stroke="#66BFE8" stroke-width="1"/>
      <text x="471" y="115" text-anchor="middle" fill="#66BFE8" font-size="13">+10</text>
    </g>
  <g class="grow" style="animation-delay:1.42s">
    <path d="M 548 62 Q 589 108 630 62" fill="none" stroke="#4FD69C" stroke-width="1.5" stroke-dasharray="4 3"/>
    <rect x="570" y="98" width="38" height="24" rx="7" fill="rgba(79,214,156,.18)" stroke="#4FD69C" stroke-width="1.2"/>
    <text x="589" y="115" text-anchor="middle" fill="#4FD69C" font-size="13">+12</text>
  </g>
  
    <g class="grow" style="animation-delay:1.6s">
      <path d="M 136 130 Q 176 166 216 130" fill="none" stroke="#B08BE8" stroke-width="1.3" opacity=".6"/>
      <rect x="158" y="158" width="36" height="22" rx="6" fill="rgba(176,139,232,.15)" stroke="#B08BE8" stroke-width="1"/>
      <text x="176" y="174" text-anchor="middle" fill="#B08BE8" font-size="12">+2</text>
    </g>
    <g class="grow" style="animation-delay:1.7400000000000002s">
      <path d="M 254 130 Q 294 166 334 130" fill="none" stroke="#B08BE8" stroke-width="1.3" opacity=".6"/>
      <rect x="276" y="158" width="36" height="22" rx="6" fill="rgba(176,139,232,.15)" stroke="#B08BE8" stroke-width="1"/>
      <text x="294" y="174" text-anchor="middle" fill="#B08BE8" font-size="12">+2</text>
    </g>
    <g class="grow" style="animation-delay:1.8800000000000001s">
      <path d="M 372 130 Q 412 166 452 130" fill="none" stroke="#B08BE8" stroke-width="1.3" opacity=".6"/>
      <rect x="394" y="158" width="36" height="22" rx="6" fill="rgba(176,139,232,.15)" stroke="#B08BE8" stroke-width="1"/>
      <text x="412" y="174" text-anchor="middle" fill="#B08BE8" font-size="12">+2</text>
    </g>
  <g class="grow" style="animation-delay:2.1s">
    <rect x="60" y="208" width="520" height="36" rx="10" fill="rgba(79,214,156,.09)" stroke="#4FD69C" stroke-width="1" stroke-dasharray="5 4"/>
    <text x="320" y="231" text-anchor="middle" fill="#4FD69C" font-size="13">tercera fila constante  →  30 + 12  =  42</text>
  </g>
  <text x="8" y="47" fill="currentColor" fill-opacity=".64" font-size="10" letter-spacing="1.5">n</text>
  <text x="8" y="115" fill="currentColor" fill-opacity=".64" font-size="10" letter-spacing="1.5">Δ¹</text>
  <text x="8" y="174" fill="currentColor" fill-opacity=".64" font-size="10" letter-spacing="1.5">Δ²</text>
</svg>$rumbo$,1),
  ($rumbo$v-pronic$rumbo$,$rumbo$Cada rectángulo tiene un lado más que el anterior. El área es la sucesión. Si reconoces la forma, no necesitas restar nada.$rumbo$,$rumbo$<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">
  <g><rect class="an" style="animation-delay:0s" x="40" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.2)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.028s" x="40" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.2)" stroke="#EFA451" stroke-width=".8"/>
      <text class="grow" style="animation-delay:0.4s" x="47" y="132" text-anchor="middle" fill="currentColor" font-size="13">1×2</text>
      <text class="grow" style="animation-delay:0.5s" x="47" y="152" text-anchor="middle" fill="#EFA451" font-size="16">2</text>
      <text class="grow" style="animation-delay:0.55s" x="47" y="172" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="10">n=1</text>
    </g><g><rect class="an" style="animation-delay:0.28s" x="192" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.33)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.30800000000000005s" x="208" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.33)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.336s" x="192" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.33)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.36400000000000005s" x="208" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.33)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.392s" x="192" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.33)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.42000000000000004s" x="208" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.33)" stroke="#EFA451" stroke-width=".8"/>
      <text class="grow" style="animation-delay:0.68s" x="207" y="132" text-anchor="middle" fill="currentColor" font-size="13">2×3</text>
      <text class="grow" style="animation-delay:0.78s" x="207" y="152" text-anchor="middle" fill="#EFA451" font-size="16">6</text>
      <text class="grow" style="animation-delay:0.8300000000000001s" x="207" y="172" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="10">n=2</text>
    </g><g><rect class="an" style="animation-delay:0.56s" x="344" y="46" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.5880000000000001s" x="360" y="46" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.6160000000000001s" x="376" y="46" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.644s" x="344" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.672s" x="360" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.7000000000000001s" x="376" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.7280000000000001s" x="344" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.756s" x="360" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.784s" x="376" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.812s" x="344" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.8400000000000001s" x="360" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.8680000000000001s" x="376" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.46)" stroke="#EFA451" stroke-width=".8"/>
      <text class="grow" style="animation-delay:0.9600000000000001s" x="367" y="132" text-anchor="middle" fill="currentColor" font-size="13">3×4</text>
      <text class="grow" style="animation-delay:1.06s" x="367" y="152" text-anchor="middle" fill="#EFA451" font-size="16">12</text>
      <text class="grow" style="animation-delay:1.11s" x="367" y="172" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="10">n=3</text>
    </g><g><rect class="an" style="animation-delay:0.8400000000000001s" x="496" y="30" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.8680000000000001s" x="512" y="30" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.8960000000000001s" x="528" y="30" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.924s" x="544" y="30" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.9520000000000001s" x="496" y="46" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:0.9800000000000001s" x="512" y="46" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.008s" x="528" y="46" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.036s" x="544" y="46" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.064s" x="496" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.092s" x="512" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.12s" x="528" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.1480000000000001s" x="544" y="62" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.1760000000000002s" x="496" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.2040000000000002s" x="512" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.2320000000000002s" x="528" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.26s" x="544" y="78" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.288s" x="496" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.316s" x="512" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.344s" x="528" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/><rect class="an" style="animation-delay:1.372s" x="544" y="94" width="13.5" height="13.5" rx="3" fill="rgba(239,164,81,0.5900000000000001)" stroke="#EFA451" stroke-width=".8"/>
      <text class="grow" style="animation-delay:1.2400000000000002s" x="527" y="132" text-anchor="middle" fill="currentColor" font-size="13">4×5</text>
      <text class="grow" style="animation-delay:1.34s" x="527" y="152" text-anchor="middle" fill="#EFA451" font-size="16">20</text>
      <text class="grow" style="animation-delay:1.3900000000000001s" x="527" y="172" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="10">n=4</text>
    </g>
  <g class="grow" style="animation-delay:1.5s">
    <rect x="480" y="52" width="140" height="52" rx="11" fill="rgba(79,214,156,.1)" stroke="#4FD69C" stroke-width="1.2"/>
    <text x="550" y="76" text-anchor="middle" fill="#4FD69C" font-size="15">tₙ = n(n+1)</text>
    <text x="550" y="93" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="10">números pronic</text>
  </g>
</svg>$rumbo$,1),
  ($rumbo$v-desc$rumbo$,$rumbo$De S/ 100 quedan S/ 80. El 10 % de 80 son 8, no 10. Quedan S/ 72. El descuento real fue de 28 %.$rumbo$,$rumbo$<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">
  <g class="grow" style="animation-delay:0s">
    <rect x="40" y="24" width="520" height="44" rx="9" fill="rgba(102,191,232,.2)" stroke="#66BFE8" stroke-width="1.3"/>
    <text x="300" y="52" text-anchor="middle" fill="currentColor" font-size="15">Precio original — S/ 100</text>
    <text x="578" y="52" fill="#66BFE8" font-size="12">100 %</text>
  </g>
  <g class="grow" style="animation-delay:.5s">
    <rect x="40" y="88" width="416" height="44" rx="9" fill="rgba(239,164,81,.22)" stroke="#EFA451" stroke-width="1.3"/>
    <rect x="456" y="88" width="104" height="44" rx="9" fill="rgba(255,95,87,.13)" stroke="#FF5F57" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="248" y="116" text-anchor="middle" fill="currentColor" font-size="15">Queda S/ 80</text>
    <text x="508" y="116" text-anchor="middle" fill="#FF5F57" font-size="12">−20</text>
    <text x="578" y="116" fill="#EFA451" font-size="12">80 %</text>
  </g>
  <g class="grow" style="animation-delay:1.05s">
    <rect x="40" y="152" width="374" height="44" rx="9" fill="rgba(79,214,156,.22)" stroke="#4FD69C" stroke-width="1.4"/>
    <rect x="414" y="152" width="42" height="44" rx="9" fill="rgba(255,95,87,.18)" stroke="#FF5F57" stroke-width="1" stroke-dasharray="4 3"/>
    <rect x="456" y="152" width="104" height="44" rx="9" fill="rgba(255,95,87,.07)" stroke="rgba(255,95,87,.35)" stroke-width="1" stroke-dasharray="3 4"/>
    <text x="227" y="180" text-anchor="middle" fill="currentColor" font-size="15">Queda S/ 72</text>
    <text x="435" y="180" text-anchor="middle" fill="#FF5F57" font-size="11">−8</text>
    <text x="578" y="180" fill="#4FD69C" font-size="12">72 %</text>
  </g>
  <g class="grow" style="animation-delay:1.6s">
    <path d="M 414 206 L 414 222 L 560 222 L 560 206" fill="none" stroke="#FF5F57" stroke-width="1.2"/>
    <rect x="418" y="212" width="138" height="24" rx="7" fill="#08151E"/>
    <text x="487" y="229" text-anchor="middle" fill="#FF5F57" font-size="13">descuento real 28 %</text>
  </g>
  <g class="grow" style="animation-delay:2s">
    <text x="40" y="230" fill="currentColor" fill-opacity=".64" font-size="12">el segundo corte es más pequeño porque la barra ya encogió</text>
  </g>
</svg>$rumbo$,1),
  ($rumbo$v-anal$rumbo$,$rumbo$La frase del puente es la herramienta. Solo la alternativa que soporta exactamente la misma frase es la correcta.$rumbo$,$rumbo$<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="DM Mono, monospace">
  <g class="grow" style="animation-delay:0s">
    <rect x="40" y="20" width="170" height="50" rx="11" fill="rgba(239,164,81,.16)" stroke="#EFA451" stroke-width="1.4"/>
    <text x="125" y="51" text-anchor="middle" fill="currentColor" font-size="16">AVIÓN</text>
    <rect x="410" y="20" width="190" height="50" rx="11" fill="rgba(239,164,81,.16)" stroke="#EFA451" stroke-width="1.4"/>
    <text x="505" y="51" text-anchor="middle" fill="currentColor" font-size="16">PASAJERO</text>
  </g>
  <g class="grow" style="animation-delay:.45s">
    <path d="M 210 45 L 400 45" stroke="#EFA451" stroke-width="1.6" marker-end="url(#ah)"/>
    <rect x="222" y="30" width="176" height="30" rx="8" fill="#08151E" stroke="#EFA451" stroke-width="1"/>
    <text x="310" y="50" text-anchor="middle" fill="#EFA451" font-size="10.5">aloja temporalmente a</text>
  </g>
  <defs><marker id="ah" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
    <path d="M0,0 L9,4.5 L0,9 z" fill="#EFA451"/></marker>
    <marker id="ag" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
    <path d="M0,0 L9,4.5 L0,9 z" fill="#4FD69C"/></marker>
    <marker id="ar" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
    <path d="M0,0 L9,4.5 L0,9 z" fill="#FF5F57"/></marker>
  </defs>
  <line class="grow" style="animation-delay:.8s" x1="40" y1="88" x2="600" y2="88" stroke="currentColor" stroke-opacity=".18" stroke-width="1" stroke-dasharray="6 5"/>
  <text class="grow" style="animation-delay:.85s" x="40" y="112" fill="currentColor" fill-opacity=".64" font-size="10.5" letter-spacing="1.4">¿QUÉ ALTERNATIVA SOPORTA LA MISMA FRASE?</text>

  <g class="grow" style="animation-delay:1.05s">
    <rect x="40" y="128" width="150" height="38" rx="9" fill="rgba(79,214,156,.15)" stroke="#4FD69C" stroke-width="1.3"/>
    <text x="115" y="152" text-anchor="middle" fill="currentColor" font-size="14">HOTEL</text>
    <path d="M 190 147 L 400 147" stroke="#4FD69C" stroke-width="1.5" marker-end="url(#ag)"/>
    <text x="295" y="141" text-anchor="middle" fill="#4FD69C" font-size="10">aloja temporalmente a</text>
    <rect x="410" y="128" width="150" height="38" rx="9" fill="rgba(79,214,156,.15)" stroke="#4FD69C" stroke-width="1.3"/>
    <text x="485" y="152" text-anchor="middle" fill="currentColor" font-size="14">HUÉSPED</text>
    <text x="578" y="152" fill="#4FD69C" font-size="16">✓</text>
  </g>

  <g class="grow" style="animation-delay:1.35s" opacity=".62">
    <rect x="40" y="182" width="150" height="36" rx="9" fill="rgba(255,95,87,.08)" stroke="rgba(255,95,87,.5)" stroke-width="1"/>
    <text x="115" y="205" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="13">PILOTO</text>
    <path d="M 400 200 L 195 200" stroke="#FF5F57" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#ar)"/>
    <text x="297" y="194" text-anchor="middle" fill="#FF5F57" font-size="10">sentido invertido</text>
    <rect x="410" y="182" width="150" height="36" rx="9" fill="rgba(255,95,87,.08)" stroke="rgba(255,95,87,.5)" stroke-width="1"/>
    <text x="485" y="205" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="13">CABINA</text>
    <text x="578" y="205" fill="#FF5F57" font-size="15">✕</text>
  </g>

  <g class="grow" style="animation-delay:1.6s" opacity=".62">
    <rect x="40" y="234" width="150" height="36" rx="9" fill="rgba(255,95,87,.08)" stroke="rgba(255,95,87,.5)" stroke-width="1"/>
    <text x="115" y="257" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="13">MALETA</text>
    <path d="M 195 252 L 400 252" stroke="#FF5F57" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#ar)"/>
    <text x="297" y="246" text-anchor="middle" fill="#FF5F57" font-size="10">objeto → evento</text>
    <rect x="410" y="234" width="150" height="36" rx="9" fill="rgba(255,95,87,.08)" stroke="rgba(255,95,87,.5)" stroke-width="1"/>
    <text x="485" y="257" text-anchor="middle" fill="currentColor" fill-opacity=".64" font-size="13">VIAJE</text>
    <text x="578" y="257" fill="#FF5F57" font-size="15">✕</text>
  </g>
</svg>$rumbo$,1)
on conflict (id) do update set svg = excluded.svg, caption = excluded.caption,
  version = visuals.version + 1, updated_at = now();

insert into lessons (id,chapter_id,slug,title,hook,minutes,status) values
  ($rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,$rumbo$87ba7403-5815-5f1f-8f31-1e53bb3eb86c$rumbo$::uuid,$rumbo$sucesiones$rumbo$,$rumbo$Cuando los números esconden un patrón$rumbo$,$rumbo$Ninguna sucesión de examen es aleatoria. Siempre hay una regla, y casi siempre se revela restando términos vecinos. Este capítulo te enseña a encontrarla en menos de veinte segundos.$rumbo$,6,'published'),
  ($rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,$rumbo$dc759723-eee4-5410-8e56-e3791a5be271$rumbo$::uuid,$rumbo$descuentos$rumbo$,$rumbo$Por qué 20 % + 10 % nunca es 30 %$rumbo$,$rumbo$Este es el error que más plata cuesta en la vida real y más puntos en un examen. Dos descuentos seguidos no se suman, porque el segundo se aplica sobre un precio que ya encogió.$rumbo$,5,'published'),
  ($rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,$rumbo$b3e0cc0b-497d-5cf5-8c77-5ca76792bbea$rumbo$::uuid,$rumbo$analogias$rumbo$,$rumbo$La analogía no se adivina: se redacta$rumbo$,$rumbo$La mayoría falla analogías porque busca la alternativa que "suena parecida". El método correcto es al revés: primero escribes la relación en una frase, después buscas cuál la cumple.$rumbo$,5,'published')
on conflict (slug) do update set title=excluded.title, hook=excluded.hook,
  minutes=excluded.minutes, status=excluded.status;

insert into lesson_blocks (id,lesson_id,ord,kind,payload) values
  ($rumbo$2c17801c-2eea-5ff7-8dae-56dc85bda428$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,0,'text',$rumbo${"h":"La intuición primero","p":"Mira <strong>2, 6, 12, 20, 30</strong>. Los números crecen, pero no de forma pareja: primero saltan 4, luego 6, luego 8. El salto también está creciendo. <strong>Ese patrón dentro del patrón es toda la respuesta.</strong>"}$rumbo$::jsonb),
  ($rumbo$e46a8d6a-2235-5731-8f15-57f4c94811a8$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,1,'viz',$rumbo${"viz_id":"v-suc","caption":"Primera fila: la sucesión. Segunda: cuánto salta cada paso. Tercera: cuánto crece el salto. Cuando la última fila es constante, ya ganaste."}$rumbo$::jsonb),
  ($rumbo$3cbae3b4-d6d4-59e4-80b9-abe0a6d79c30$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,2,'text',$rumbo${"h":"El método, en tres movimientos","p":"<strong>1.</strong> Resta términos vecinos y escribe las diferencias debajo.<br><strong>2.</strong> Si esas diferencias son constantes, la sucesión es lineal y ya terminaste. Si no, vuelve a restar.<br><strong>3.</strong> Cuando llegues a una fila constante, súbela: reconstruye hacia arriba hasta el término que te piden."}$rumbo$::jsonb),
  ($rumbo$6b1b7092-c644-57c5-882f-e453c9682160$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,3,'callout',$rumbo${"t":"Por qué funciona","p":"Cada vez que restas, bajas un grado. Si la fila de segundas diferencias es constante, el término general es un polinomio de grado 2. Es la versión discreta de derivar dos veces una parábola."}$rumbo$::jsonb),
  ($rumbo$f08d3216-e3f1-5d43-8abb-b82109cc0b34$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,4,'text',$rumbo${"h":"La segunda mirada: la forma geométrica","p":"Hay otro camino, más bonito y más rápido. Esos mismos números —2, 6, 12, 20, 30— son el área de rectángulos que crecen: 1×2, 2×3, 3×4, 4×5. El término n es <strong>n(n+1)</strong>. Se llaman números pronic y aparecen constantemente en exámenes peruanos."}$rumbo$::jsonb),
  ($rumbo$2ede8ee0-1705-57dc-809a-f2e5d10cec3d$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,5,'viz',$rumbo${"viz_id":"v-pronic","caption":"Cada rectángulo tiene un lado más que el anterior. El área es la sucesión. Si reconoces la forma, no necesitas restar nada."}$rumbo$::jsonb),
  ($rumbo$a8c30bdb-8fdc-5a6b-8f63-7e15dfc0fd8d$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,6,'check',$rumbo${"q":"Con la fórmula n(n+1), ¿cuál es el término número 8?","opts":["64","72","80","90"],"ans":1,"ok":"Exacto: 8 × 9 = 72. Verificarlo con la fórmula te toma tres segundos; con diferencias, treinta.","no":"Cuidado: n(n+1) significa 8 × 9, no 8 × 8 ni 8 × 10. El resultado es 72."}$rumbo$::jsonb),
  ($rumbo$b1cdad65-9fc0-58d6-88ba-7cf8fb94594a$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,7,'err',$rumbo${"items":["Restar en el sentido equivocado (término anterior menos siguiente) y obtener diferencias negativas por error.","Quedarse en la primera fila de diferencias cuando no es constante, y forzar una respuesta.","Confundir sucesión aritmética (diferencia constante) con geométrica (razón constante). Si los números se multiplican, no restes: divide.","Contar mal la posición: en 2, 6, 12… el 2 es n=1, no n=0."]}$rumbo$::jsonb),
  ($rumbo$ba2bb54e-e391-5309-8aac-a5a36efa883a$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,8,'video',$rumbo${}$rumbo$::jsonb),
  ($rumbo$a13d92b0-67ad-547c-8163-e7ad9668f546$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,0,'text',$rumbo${"h":"Míralo encoger","p":"Imagina el precio como una barra. El primer descuento le corta un pedazo. El segundo descuento corta un pedazo <strong>de lo que quedó</strong>, que ya es más chico. Por eso el total nunca llega a 30 %."}$rumbo$::jsonb),
  ($rumbo$1558598d-8328-51e2-86a2-0a7dd229327d$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,1,'viz',$rumbo${"viz_id":"v-desc","caption":"De S/ 100 quedan S/ 80. El 10 % de 80 son 8, no 10. Quedan S/ 72. El descuento real fue de 28 %."}$rumbo$::jsonb),
  ($rumbo$034ce043-e597-554e-87e2-9cd02281bcbd$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,2,'text',$rumbo${"h":"Piensa en lo que queda, no en lo que se va","p":"Este es el cambio mental que resuelve el capítulo entero. Un descuento del 20 % deja el <strong>80 %</strong>. Uno del 10 % deja el <strong>90 %</strong>. Y los factores <em>sí</em> se multiplican:"}$rumbo$::jsonb),
  ($rumbo$7d649939-adb4-53cc-86c8-de0eaba249b6$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,3,'math',$rumbo${"m":"0,80  ×  0,90  =  0,72       →  queda el 72 %\n100 %  −  72 %  =  28 %      →  se descontó el 28 %"}$rumbo$::jsonb),
  ($rumbo$b9170b66-07dc-5f74-8840-bff99965adca$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,4,'callout',$rumbo${"t":"La misma regla al revés","p":"Para aumentos sucesivos, multiplica los factores mayores que 1: un alza del 20 % seguida de otra del 10 % es 1,20 × 1,10 = 1,32, o sea 32 % de aumento. Y si suben 20 % y luego bajan 20 %, el resultado es 0,96: pierdes 4 %. Nunca vuelves al punto de partida."}$rumbo$::jsonb),
  ($rumbo$cc7e7a37-d906-525e-87bf-81b25cd43a49$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,5,'check',$rumbo${"q":"Un hotel sube su tarifa 25 % en temporada alta y luego la baja 20 % en promoción. ¿Cómo queda respecto al precio original?","opts":["Sube 5 %","Queda igual","Baja 5 %","Sube 45 %"],"ans":1,"ok":"Correcto: 1,25 × 0,80 = 1,00 exacto. Es el único par que se cancela, y por eso los exámenes lo aman.","no":"Multiplica los factores: 1,25 × 0,80 = 1,00. Queda exactamente igual. Es una coincidencia numérica que aparece mucho en examen."}$rumbo$::jsonb),
  ($rumbo$e20f949f-f6db-5b4d-8921-a3c2e7fd801b$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,6,'err',$rumbo${"items":["Sumar los porcentajes. 20 + 10 = 30 es siempre la alternativa trampa.","Restar el porcentaje al precio final cuando el impuesto ya está incluido (ahí se divide, no se resta).","Aplicar el segundo descuento al precio original en lugar del rebajado.","Olvidar que un aumento y una baja del mismo porcentaje no se cancelan."]}$rumbo$::jsonb),
  ($rumbo$4452b30d-4761-557b-8530-ffafc6bcc903$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,7,'video',$rumbo${}$rumbo$::jsonb),
  ($rumbo$7e8129f8-bf11-5686-8f6d-681d205d1987$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,0,'text',$rumbo${"h":"Construye el puente","p":"Cada par de palabras está unido por un puente: una relación precisa. <strong>Tu único trabajo es nombrar ese puente con una frase completa</strong> antes de mirar las alternativas. Si miras las opciones primero, tu cerebro se contamina con el tema y elige por cercanía, no por lógica."}$rumbo$::jsonb),
  ($rumbo$f41e58d7-bb45-58f8-8610-af9aac921898$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,1,'viz',$rumbo${"viz_id":"v-anal","caption":"La frase del puente es la herramienta. Solo la alternativa que soporta exactamente la misma frase es la correcta."}$rumbo$::jsonb),
  ($rumbo$b6bb726c-b90e-5ddf-877c-d78277960da8$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,2,'text',$rumbo${"h":"Endurece la frase hasta que sobreviva una","p":"Si dos alternativas encajan, tu frase era demasiado floja. Agrégale matices: <em>temporalmente</em>, <em>a cambio de un pago</em>, <em>de forma voluntaria</em>. Cada matiz elimina candidatos. Sigue endureciendo hasta quedarte con una."}$rumbo$::jsonb),
  ($rumbo$3a47bdab-e18b-56b3-8d5c-fcbb29ddcc08$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,3,'callout',$rumbo${"t":"El orden es obligatorio","p":"AVIÓN : PASAJERO va de lugar a usuario. La respuesta debe ir en el mismo sentido. \"Piloto : cabina\" tiene la relación correcta pero invertida, y por eso está mal. Los exámenes ponen siempre al menos un par invertido."}$rumbo$::jsonb),
  ($rumbo$fc2d57b4-09f7-52b9-8d03-0d1a93313771$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,4,'check',$rumbo${"q":"CHEF : COCINA :: ¿cuál mantiene la relación \"profesional : espacio donde ejerce\"?","opts":["Médico : bisturí","Piloto : cabina","Aula : profesor","Hotel : recepcionista"],"ans":1,"ok":"Correcto. Médico : bisturí es profesional : herramienta. Aula : profesor y Hotel : recepcionista están invertidos.","no":"Fíjate en el sentido: necesitas profesional primero, espacio después. Piloto : cabina es el único que lo cumple."}$rumbo$::jsonb),
  ($rumbo$a141d2f0-f223-5c1d-8bb7-e2af6cd1cb11$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,5,'err',$rumbo${"items":["Elegir por campo semántico: si el par base habla de viajes, marcar cualquier alternativa que mencione viajes.","Ignorar el orden y aceptar la relación invertida.","Formular la frase con verbos vagos como \"tiene que ver con\" o \"se relaciona con\".","Rendirse ante dos alternativas válidas en vez de endurecer la frase."]}$rumbo$::jsonb),
  ($rumbo$27692b1b-79d4-565e-8a19-f781d9d030ca$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,6,'video',$rumbo${}$rumbo$::jsonb)
on conflict (lesson_id, ord) do update set kind = excluded.kind, payload = excluded.payload;

insert into lesson_videos (id,lesson_id,title,source,url,ord) values
  ($rumbo$9d1cafdd-1410-5e8b-8fc0-bccb2173c050$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,$rumbo$Sucesiones y series — curso completo$rumbo$,$rumbo$Matemóvil · teoría + ejercicios de admisión en 3 niveles$rumbo$,$rumbo$https://matemovil.com/category/razonamiento-matematico/$rumbo$,0),
  ($rumbo$5890d61d-beb5-5df9-8d4d-861fb4bd0ed1$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,$rumbo$Canal Matemóvil$rumbo$,$rumbo$YouTube · el mejor canal peruano de RM para admisión$rumbo$,$rumbo$https://www.youtube.com/channel/UCvTyXJuQyAqG2UxzI8jtc2g$rumbo$,1),
  ($rumbo$a3f60361-4276-5247-8e8d-18a419db5224$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,$rumbo$Tanto por ciento — teoría y ejercicios resueltos$rumbo$,$rumbo$Matemóvil · incluye el reto de porcentajes$rumbo$,$rumbo$https://matemovil.com/category/razonamiento-matematico/$rumbo$,0),
  ($rumbo$1bd013f1-2dde-5e29-8b3b-033582cfdd17$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,$rumbo$Analogías verbales — método y práctica$rumbo$,$rumbo$Busca "analogías verbales examen de admisión" · agregar URL exacta desde el panel de admin$rumbo$,$rumbo$https://www.youtube.com/results?search_query=analog%C3%ADas+verbales+examen+de+admisi%C3%B3n$rumbo$,0)
on conflict (id) do update set title=excluded.title, source=excluded.source, url=excluded.url;

insert into questions (id,chapter_id,lesson_id,kind,passage,stem,options,answer_index,difficulty,time_target_s,steps,concept,trick,source,status) values
  ($rumbo$1c4c7eb7-0266-53ba-81a2-3bfdce3d0795$rumbo$::uuid,$rumbo$87ba7403-5815-5f1f-8f31-1e53bb3eb86c$rumbo$::uuid,$rumbo$1dfc6dff-f3a8-5da2-8169-52de2b8efac0$rumbo$::uuid,'single_choice',
   null,$rumbo$Halle el término que continúa:<br><br><span class="math">2 ; 6 ; 12 ; 20 ; 30 ; ...</span>$rumbo$,$rumbo$["36","40","42","44","48"]$rumbo$::jsonb,2,2,90,
   $rumbo$[{"t":"Calcula las diferencias entre términos consecutivos","p":"Cuando una sucesión no es obvia, el primer movimiento siempre es restar términos vecinos.","m":"6 − 2 = 4\n12 − 6 = 6\n20 − 12 = 8\n30 − 20 = 10"},{"t":"Observa el patrón de las diferencias","p":"Son 4, 6, 8, 10 → aumentan de 2 en 2. Sucesión de segundo orden.","m":"Siguiente diferencia = 10 + 2 = 12"},{"t":"Suma la diferencia al último término","p":"Con la diferencia hallada solo queda completar.","m":"30 + 12 = 42"},{"t":"Verifica con la fórmula general","p":"Cada término responde a n(n+1).","m":"n=6 → 6·7 = 42  ✓"}]$rumbo$::jsonb,$rumbo$Sucesión de segundo orden: si las segundas diferencias son constantes, el término general es un polinomio de grado 2.$rumbo$,$rumbo$Reconoce 2, 6, 12, 20, 30 como los números pronic n(n+1). Te ahorra 40 segundos.$rumbo$,'prototipo v0.2','published'),
  ($rumbo$e80469ee-cc9a-5e1a-8db5-a8e9d9fc88bd$rumbo$::uuid,$rumbo$34229bea-91d6-539a-8437-33b1f83cb934$rumbo$::uuid,null,'single_choice',
   null,$rumbo$Hace 5 años, la edad de Ana era el doble de la de Beto. Dentro de 5 años, la suma de sus edades será 50. ¿Qué edad tiene Ana actualmente?$rumbo$,$rumbo$["20 años","22 años","25 años","28 años","30 años"]$rumbo$::jsonb,2,3,150,
   $rumbo$[{"t":"Define variables en el presente","p":"Nombra siempre las edades de HOY.","m":"A = edad de Ana hoy\nB = edad de Beto hoy"},{"t":"Traduce la condición del pasado","p":"\"Hace 5 años\" resta 5 a cada edad.","m":"A − 5 = 2(B − 5)\nA = 2B − 5    ...(I)"},{"t":"Traduce la condición del futuro","p":"Con 2 personas, la suma crece 10 en 5 años.","m":"(A+5) + (B+5) = 50\nA + B = 40    ...(II)"},{"t":"Resuelve el sistema","p":"Reemplaza (I) en (II).","m":"3B = 45 → B = 15\nA = 25"},{"t":"Comprueba","p":"Contra el enunciado original.","m":"Hace 5: 20 = 2(10) ✓\nEn 5: 30 + 20 = 50 ✓"}]$rumbo$::jsonb,$rumbo$La suma de edades cambia tantas veces "n años" como personas haya.$rumbo$,$rumbo$Dibuja un cuadro Pasado–Presente–Futuro por persona. Convierte el problema en aritmética.$rumbo$,'prototipo v0.2','published'),
  ($rumbo$5b6f90f0-13d3-5637-889d-661c15af88ad$rumbo$::uuid,$rumbo$dc759723-eee4-5410-8e56-e3791a5be271$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,'single_choice',
   null,$rumbo$Un hotel aplica 20 % de descuento por reserva anticipada y, sobre el precio ya rebajado, un 10 % adicional por pago con tarjeta. ¿A qué descuento único equivale?$rumbo$,$rumbo$["26 %","28 %","29 %","30 %","32 %"]$rumbo$::jsonb,1,2,90,
   $rumbo$[{"t":"No sumes los descuentos","p":"30 % es la trampa clásica.","m":"20% + 10% ≠ 30%   ✗"},{"t":"Trabaja con lo que QUEDA","p":"Descontar 20 % deja el 80 %; descontar 10 % deja el 90 %.","m":"0,80 × 0,90 = 0,72"},{"t":"Convierte el factor en descuento","p":"Si queda el 72 %, se descontó el resto.","m":"100% − 72% = 28%"},{"t":"Verifica con S/ 100","p":"Un precio concreto lo vuelve evidente.","m":"100 − 20% = 80\n80 − 10% = 72\nDescuento = 28%"}]$rumbo$::jsonb,$rumbo$Descuentos sucesivos: multiplica los factores de lo que queda, nunca sumes los porcentajes.$rumbo$,$rumbo$Fórmula exprés: Du = a + b − (a·b)/100 → 20 + 10 − 2 = 28.$rumbo$,'prototipo v0.2','published'),
  ($rumbo$2113a517-3c36-564c-8ef9-af51a1b3fddd$rumbo$::uuid,$rumbo$b3e0cc0b-497d-5cf5-8c77-5ca76792bbea$rumbo$::uuid,$rumbo$8bfa47dd-a71a-5ef5-8cb1-ffefbf827804$rumbo$::uuid,'single_choice',
   null,$rumbo$<b>AVIÓN : PASAJERO ::</b>$rumbo$,$rumbo$["piloto : cabina","hotel : huésped","maleta : viaje","aeropuerto : vuelo","turista : mapa"]$rumbo$::jsonb,1,1,60,
   $rumbo$[{"t":"Define la relación con una frase","p":"Nunca busques respuesta antes de tener la frase.","m":"\"El AVIÓN es el espacio de servicio que aloja\ntemporalmente al PASAJERO.\""},{"t":"Precisa el tipo de relación","p":"Establecimiento de servicio y usuario temporal.","m":"lugar de servicio → usuario temporal"},{"t":"Aplica la frase a cada alternativa","p":"Descarta todo lo que no encaje exactamente.","m":"a) invertido ✗\nb) hotel : huésped ✓\nc) objeto → evento ✗\nd) lugar → evento ✗\ne) usuario → herramienta ✗"},{"t":"Confirma el orden","p":"El lugar va primero.","m":"HOTEL : HUÉSPED ✓"}]$rumbo$::jsonb,$rumbo$Las analogías se resuelven redactando la relación, no buscando parecido temático.$rumbo$,$rumbo$Si dos alternativas encajan, endurece la frase con un matiz hasta que sobreviva una.$rumbo$,'prototipo v0.2','published'),
  ($rumbo$78986c75-9263-583d-889e-ef917d865305$rumbo$::uuid,$rumbo$4d6ea08c-3866-5660-8fc0-fdb459241144$rumbo$::uuid,null,'reading_set',
   $rumbo$El turismo comunitario ha crecido en el Perú como alternativa al circuito masivo. En comunidades del Colca y del Titicaca, las familias reciben visitantes en sus viviendas y administran directamente los ingresos. Sus defensores destacan que el dinero se queda en la localidad. Los críticos, sin embargo, advierten que sin estándares mínimos de servicio la experiencia resulta desigual y daña la reputación del destino. La discusión, entonces, no es si el modelo debe existir, sino bajo qué condiciones puede sostenerse.$rumbo$,$rumbo$El texto sostiene principalmente que el turismo comunitario:$rumbo$,$rumbo$["es económicamente superior al turismo masivo","debe prohibirse hasta que existan estándares","es viable y su continuidad depende de ciertas condiciones","ha fracasado en el Colca y el Titicaca","beneficia sobre todo a operadores de Lima"]$rumbo$::jsonb,2,3,150,
   $rumbo$[{"t":"Ubica la oración de cierre","p":"En textos breves la tesis suele ir tras un conector conclusivo.","m":"\"...no es si debe existir, sino bajo qué\ncondiciones puede sostenerse.\""},{"t":"Reconoce la estructura","p":"Postura, contraposición, síntesis. La síntesis es la tesis.","m":"Defensores → Críticos → Autor"},{"t":"Descarta por exceso o defecto","p":"Los distractores exageran o elevan un detalle a idea central.","m":"a) no compara ✗\nb) exceso ✗\nd) contradice ✗\ne) es lo que evita ✗"},{"t":"Verifica cobertura total","p":"La idea principal abarca todo el texto.","m":"c) existencia + condicionalidad ✓"}]$rumbo$::jsonb,$rumbo$Idea principal: la afirmación más general que sostiene el texto, no el dato más llamativo.$rumbo$,$rumbo$"Sin embargo" abre la objeción; "entonces" abre la conclusión. La respuesta vive después del conector conclusivo.$rumbo$,'prototipo v0.2','published'),
  ($rumbo$c3741fe0-d5c0-56ee-8d12-a5733a3ffcde$rumbo$::uuid,$rumbo$20c065d3-edac-55f4-8752-b68bcd20c2c5$rumbo$::uuid,$rumbo$c5d06f44-fd1e-5c92-8a74-3f8a1cfa7b63$rumbo$::uuid,'single_choice',
   null,$rumbo$El precio de una habitación es S/ 295 e incluye IGV del 18 %. ¿Cuál es el valor de venta sin IGV?$rumbo$,$rumbo$["S/ 242","S/ 250","S/ 258","S/ 265","S/ 272"]$rumbo$::jsonb,1,2,90,
   $rumbo$[{"t":"Identifica la trampa","p":"Restar 18 % al precio final está mal: el IGV se calculó sobre el valor de venta.","m":"295 − 18% = 241,90  ✗ (alternativa a)"},{"t":"Plantea la relación correcta","p":"El precio final es el valor de venta más su 18 %.","m":"Precio = VV × 1,18"},{"t":"Despeja dividiendo","p":"Divide, no restes.","m":"VV = 295 ÷ 1,18"},{"t":"Calcula y comprueba","p":"El IGV debe ser el 18 % del valor de venta.","m":"29 500 ÷ 118 = 250\n250 × 0,18 = 45 → 295 ✓"}]$rumbo$::jsonb,$rumbo$Para quitar un porcentaje incluido se divide entre (1 + i); para agregarlo se multiplica.$rumbo$,$rumbo$Atajo IGV peruano: VV ≈ precio × 0,847. Aquí 295 × 0,847 ≈ 250.$rumbo$,'prototipo v0.2','published')
on conflict (id) do update set stem=excluded.stem, passage=excluded.passage, kind=excluded.kind,
  options=excluded.options, answer_index=excluded.answer_index, steps=excluded.steps,
  concept=excluded.concept, trick=excluded.trick, status=excluded.status,
  lesson_id=excluded.lesson_id, updated_at=now();
