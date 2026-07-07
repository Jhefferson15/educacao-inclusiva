/* ===== SCENERY CANVAS GENERATOR ===== */

function buildArt(s) {
  const g = '<div class="ground"></div>';
  switch (s.art) {
    case "wonder":
      return `<div class="scene">${g}
        <div class="parallax-layer" data-depth="-0.15" style="position:absolute;left:50%;top:10%;transform:translateX(-50%);z-index:1;">
          <span class="dreamstar" id="wstar">★</span>
        </div>
        <div class="parallax-layer" data-depth="-0.08" style="position:absolute;left:9%;top:12%;z-index:1;">
          <div class="sun"></div>
        </div>
        <div class="parallax-layer" data-depth="-0.12" style="position:absolute;right:12%;top:16%;z-index:1;">
          <div class="planet"></div>
        </div>
        <div class="parallax-layer" data-depth="-0.05" style="position:absolute;left:22%;top:30%;z-index:1;">
          <span class="imag" style="color:var(--teal);font-size:1.4rem;animation-delay:.4s">✦</span>
        </div>
        <div class="parallax-layer" data-depth="-0.06" style="position:absolute;right:26%;top:42%;z-index:1;">
          <span class="imag" style="color:var(--lilac);font-size:1.6rem;animation-delay:1.3s">♪</span>
        </div>
        <div class="parallax-layer" data-depth="-0.04" style="position:absolute;left:36%;top:62%;z-index:1;">
          <span class="imag" style="color:var(--vermilion);font-size:1.2rem;animation-delay:.9s">✦</span>
        </div>
        <div class="parallax-layer" data-depth="-0.03" style="position:absolute;left:16%;top:54%;z-index:1;">
          <span class="floaty" style="width:18px;height:18px;background:var(--pink);animation-delay:.6s"></span>
        </div>
        <div class="parallax-layer" data-depth="-0.04" style="position:absolute;right:18%;top:60%;z-index:1;">
          <span class="floaty" style="width:14px;height:14px;background:var(--marigold);animation-delay:1.6s"></span>
        </div>
        <div class="parallax-layer" data-depth="-0.05" style="position:absolute;right:34%;top:24%;z-index:1;">
          <span class="floaty" style="width:12px;height:12px;background:var(--teal);animation-delay:2s"></span>
        </div>
        
        <svg class="constellation" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;">
          <line x1="22" y1="30" x2="50" y2="15" stroke="rgba(39, 163, 155, 0.45)" stroke-width="0.5" stroke-dasharray="100" stroke-dashoffset="100" class="c-line-1" />
          <line x1="50" y1="15" x2="74" y2="42" stroke="rgba(155, 139, 214, 0.45)" stroke-width="0.5" stroke-dasharray="100" stroke-dashoffset="100" class="c-line-2" />
          <line x1="50" y1="15" x2="36" y2="62" stroke="rgba(226, 83, 59, 0.45)" stroke-width="0.5" stroke-dasharray="100" stroke-dashoffset="100" class="c-line-3" />
          <line x1="36" y1="62" x2="22" y2="30" stroke="rgba(244, 182, 62, 0.45)" stroke-width="0.5" stroke-dasharray="100" stroke-dashoffset="100" class="c-line-4" />
        </svg>
        
        <div class="parallax-layer" data-depth="0.08" style="position:relative;z-index:2;display:flex;justify-content:center;width:100%;">
          <div class="act-reach" id="hero">${ishaan("happy", 1)}</div>
          <div class="halo" style="position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:200px;height:200px;background:radial-gradient(circle, rgba(253, 233, 167, 0.35) 0%, transparent 70%);opacity:0;transition:opacity 0.6s ease;z-index:0;pointer-events:none;"></div>
        </div>
      </div>`;
    case "streets":
      return `<div class="scene" id="streetsScene" style="overflow:hidden;">${g}
        <div class="sun" style="left:8%;top:10%"></div>
        
        <!-- Parallax Far Skyline -->
        <div class="parallax-layer" data-depth="-0.2" style="position:absolute;left:0;right:0;bottom:22%;height:32%;z-index:0;opacity:0.3;pointer-events:none;">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" style="width:100%;height:100%;fill:#3a5040;">
            <path d="M0 30 L0 10 L5 8 L10 12 L15 15 L20 8 L25 12 L30 18 L35 10 L40 12 L45 8 L50 14 L55 9 L60 16 L65 10 L70 12 L75 18 L80 12 L85 9 L90 14 L95 10 L100 15 L100 30 Z" />
          </svg>
        </div>
        
        <!-- Parallax Mid Street Lamp -->
        <div class="parallax-layer" data-depth="-0.08" style="position:absolute;left:78%;bottom:18%;height:46%;z-index:1;opacity:0.65;pointer-events:none;">
          <svg viewBox="0 0 20 80" style="height:100%;fill:#435c44;">
            <rect x="9" y="10" width="2" height="70" />
            <path d="M6 10 Q10 0 14 10 Z" fill="var(--marigold)" />
            <circle cx="10" cy="12" r="3" fill="#fff" />
          </svg>
        </div>
        
        <!-- Interactive Water Puddle -->
        <div class="parallax-layer" data-depth="0.05" id="street-puddle" style="position:absolute;left:26%;bottom:4%;z-index:2;cursor:pointer;" title="Clique na poça!">
          <svg width="170" height="42" viewBox="0 0 200 50">
            <path d="M10 25 C10 12, 190 12, 190 25 C190 38, 10 38, 10 25 Z" fill="rgba(63, 142, 179, 0.45)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1.8" />
            <ellipse class="ripple-ring ripple-1" cx="100" cy="25" rx="5" ry="1.5" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" />
            <ellipse class="ripple-ring ripple-2" cx="100" cy="25" rx="5" ry="1.5" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1" />
            <ellipse class="ripple-ring ripple-3" cx="100" cy="25" rx="5" ry="1.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
            <g class="puddle-reflection" id="hero-reflection" style="transform: scaleY(-0.7) scaleX(0.85) translate(80px, -70px);">
              <circle cx="26" cy="26" r="16" fill="#e8b68c" opacity="0.75" />
              <path d="M10 24 Q6 10 20 8 Q24 2 30 6 Q34 2 38 8 Q44 6 46 12 Q54 14 52 26 Z" fill="#241a22" />
              <ellipse cx="20" cy="22" rx="3" ry="4.5" fill="#fff" />
              <ellipse cx="32" cy="22" rx="3" ry="4.5" fill="#fff" />
              <circle cx="20" cy="22" r="1.5" fill="#3a2b3a" />
              <circle cx="32" cy="22" r="1.5" fill="#3a2b3a" />
            </g>
          </svg>
        </div>
        
        <!-- Interactive Dog -->
        <div class="parallax-layer" data-depth="0.04" id="street-dog" style="position:absolute;right:12%;bottom:10%;z-index:2;cursor:pointer;" title="Clique no cachorrinho!">
          <span class="dog-bark-text" id="dog-bark-bubble">Au Au!</span>
          <svg width="62" height="62" viewBox="0 0 60 60">
            <path class="dog-tail" d="M42 38 Q50 30 46 22 Q42 26 42 38 Z" fill="#9e7047" stroke="#3a2f3a" stroke-width="2" />
            <ellipse cx="32" cy="38" rx="14" ry="10" fill="#c49a6c" stroke="#3a2f3a" stroke-width="2" />
            <rect x="23" y="44" width="4" height="12" rx="2" fill="#c49a6c" stroke="#3a2f3a" stroke-width="2" />
            <rect x="37" y="44" width="4" height="12" rx="2" fill="#c49a6c" stroke="#3a2f3a" stroke-width="2" />
            <g class="dog-head">
              <circle cx="22" cy="24" r="9" fill="#c49a6c" stroke="#3a2f3a" stroke-width="2" />
              <path d="M15 24 Q11 24 13 28 Q17 29 17 24 Z" fill="#9e7047" stroke="#3a2f3a" stroke-width="1.5" />
              <circle cx="13" cy="25" r="1.5" fill="#2b2330" />
              <path d="M24 16 Q28 8 28 20 Z" fill="#9e7047" stroke="#3a2f3a" stroke-width="1.5" />
              <circle cx="19" cy="22" r="1.2" fill="#2b2330" />
              <path class="dog-mouth" d="M15 27 L18 27" stroke="#3a2f3a" stroke-width="1.5" />
            </g>
          </svg>
        </div>
        
        <!-- Interactive Butterflies -->
        <div class="butterfly bf-1" id="street-bf-1" title="Pegue a borboleta!">
          <svg viewBox="0 0 26 26" width="100%" height="100%">
            <path class="wing-l" d="M13 13 Q6 6 8 13 Q10 20 13 13 Z" fill="var(--vermilion)" stroke="#3a2f3a" stroke-width="1" />
            <path class="wing-r" d="M13 13 Q20 6 18 13 Q16 20 13 13 Z" fill="var(--vermilion)" stroke="#3a2f3a" stroke-width="1" />
            <line x1="13" y1="8" x2="13" y2="18" stroke="#3a2f3a" stroke-width="1.5" />
          </svg>
        </div>
        <div class="butterfly bf-2" id="street-bf-2" title="Pegue a borboleta!">
          <svg viewBox="0 0 26 26" width="100%" height="100%">
            <path class="wing-l" d="M13 13 Q6 6 8 13 Q10 20 13 13 Z" fill="var(--teal)" stroke="#3a2f3a" stroke-width="1" />
            <path class="wing-r" d="M13 13 Q20 6 18 13 Q16 20 13 13 Z" fill="var(--teal)" stroke="#3a2f3a" stroke-width="1" />
            <line x1="13" y1="8" x2="13" y2="18" stroke="#3a2f3a" stroke-width="1.5" />
          </svg>
        </div>
        
        <!-- Main Character -->
        <div class="parallax-layer hero-street" id="hero" style="position:absolute;left:-15%;bottom:6%;z-index:3;transition:left 11s linear, bottom 1.2s ease-out;">
          ${ishaan("happy", 1)}
        </div>
      </div>`;
    case "classroom":
      return `<div class="scene scene-classroom"><div class="board"></div>${g}
        <div class="classrow">
          <div class="seat student-seat" id="student0">
            <div class="laugh classmate-char">${mateA("neutral", 0.7)}</div>
            <div class="desk"></div>
          </div>
          <div class="seat student-seat" id="student1">
            <div class="laugh classmate-char">${mateB("neutral", 0.7)}</div>
            <div class="desk"></div>
          </div>
          <div class="seat student-seat" id="mate">
            <div class="laugh classmate-char">${mateA("neutral", 0.7)}</div>
            <div class="desk"></div>
          </div>
          <div class="seat student-seat" id="student3">
            <div class="laugh classmate-char">${mateB("neutral", 0.7)}</div>
            <div class="desk"></div>
          </div>
        </div>
        
        <div class="ishaan-desk-group sitting" style="position:absolute;left:20%;bottom:6%;z-index:4;">
          <div class="act-sway" id="hero">${ishaan("neutral", 1.0)}</div>
          <div class="desk" style="width: 72px; margin-top:-10px;">
            <div class="small-book" id="ishaan-book">
              <div class="page-l"></div>
              <div class="page-r"></div>
            </div>
          </div>
        </div>
        
        <div id="bro" class="teacher-strict-group" style="position:absolute;right:16%;bottom:6%;z-index:4;">
          ${strictTeacher("neutral", 1.15)}
        </div>
        
        <span class="haha" style="left:12%;top:25%;">ha ha!</span>
        <span class="haha" style="left:52%;top:30%;">kkk</span>
        <span class="haha" style="left:28%;top:35%;">haha</span>
        <span class="haha" style="left:68%;top:20%;">Ahahaha!</span>
        
        <div class="letter-storm" id="letterStorm"></div></div>`;
    case "complaint":
      return `<div class="scene scene-complaint">${g}
        <div class="board complaint-board"></div>
        <div class="principal-desk">
          <div class="dismissal-letter" id="complaint-letter" title="Queixa da Escola (Clique para ver)">
            <div class="letter-stamp">✗</div>
            <div class="letter-line" style="width: 70%"></div>
            <div class="letter-line" style="width: 85%"></div>
            <div class="letter-line" style="width: 60%"></div>
          </div>
        </div>
        <div id="teach" style="position:relative;z-index:3;margin-right:15px;cursor:pointer;" title="Diretor (Clique para ver reação)">${principal("neutral", 1.15)}</div>
        <div id="bro" style="position:relative;z-index:3;margin-right:15px;cursor:pointer;" title="Pai (Clique para ver reação)">${father("sad", 1.12)}</div>
        <div class="recede ishaan-complaint-group" id="hero" style="position:relative;z-index:2;cursor:pointer;" title="Ishaan (Clique para ver reação)">
          ${ishaan("sad", .85)}
          <div class="tears-container" id="ishaan-tears"></div>
        </div>
        <div class="gloom-cloud" id="gloomCloud"></div>
        <div class="complaint-floating-words" id="complaintWords"></div></div>`;
    case "compare":
      return `<div class="scene scene-compare">${g}
        <!-- Spotlights -->
        <div class="spotlight spotlight-golden" id="spot-yohan"></div>
        <div class="spotlight spotlight-gloom" id="spot-ishaan"></div>

        <!-- Assembly line / Factory environment -->
        <div class="factory-background">
          <div class="assembly-pipe"></div>
          <div class="conveyor-belt">
            <div class="belt-line"></div>
            <div class="belt-rollers">
              <span class="roller"></span>
              <span class="roller"></span>
              <span class="roller"></span>
              <span class="roller"></span>
              <span class="roller"></span>
              <span class="roller"></span>
            </div>
          </div>
        </div>

        <!-- Brother (Yohan) on Pedestal -->
        <div class="pedestal-group" id="yohan-group">
          <div class="pedestal">
            <span class="pedestal-star">★</span>
            <div class="pedestal-base">1º</div>
          </div>
          <div id="bro" class="yohan-char-box" style="position:relative;z-index:2;cursor:pointer;" title="Yohan (Clique para ver reação)">
            ${brother("excited", 1.0)}
            <div class="gold-stars-container" id="yohan-stars"></div>
          </div>
        </div>

        <!-- Spacer -->
        <div style="width: 8vw;"></div>

        <!-- Ishaan on Conveyor Belt -->
        <div class="conveyor-group" id="ishaan-group">
          <!-- Industrial Stamping Machine -->
          <div class="stamp-machine" id="stamp-machine">
            <div class="stamp-piston"></div>
            <div class="stamp-head">
              <span class="stamp-label">PADRÃO</span>
            </div>
          </div>

          <div class="ishaan-compare-box" id="hero" style="position:relative;z-index:2;cursor:pointer;" title="Ishaan (Clique para ver reação)">
            ${ishaan("sad", .82)}
            <div class="tears-container" id="ishaan-tears"></div>
          </div>

          <!-- Stamped Paper/Label -->
          <div class="stamp-mark" id="stamp-mark">
            <div class="stamp-text">DEFEITO</div>
            <div class="stamp-sub">REPROVADO</div>
          </div>
        </div>

        <!-- Floating interactive items -->
        <div class="compare-floating-items" id="compareFloating"></div>
      </div>`;
    case "father_anger":
      return `<div class="scene scene-father-anger">${g}
        <div class="shadow-gloom"></div>
        <div class="wall-picture" id="sc6-picture-frame" title="Clique no porta-retratos"></div>
        
        <div class="study-desk">
          <div class="report-card" id="sc6-report-card" title="Clique no boletim"></div>
        </div>
        
        <div class="gloom-cloud6" id="gloomCloud6"></div>
        <div class="complaint-floating-words" id="angerWords"></div>
        
        <div class="father-anger-group" id="bro">
          ${father("sad", 1.15)}
        </div>
        
        <div class="ishaan-anger-group" id="hero">
          ${ishaan("cry", .82)}
          <div class="tears-container" id="ishaan-tears"></div>
        </div>
      </div>`;
    case "farewell":
      return `<div class="scene" id="rainScene" style="overflow:hidden;">${g}
        <div id="farewell-gate" class="farewell-gate farewell-gate-open">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
        <div id="farewell-taxi" class="taxi-car" style="position:absolute;right:8%;bottom:12%;z-index:1;cursor:pointer;" title="Táxi (Clique para buzinar)">
          <svg width="120" height="60" viewBox="0 0 120 60">
            <circle cx="28" cy="48" r="10" fill="#222" stroke="#444" stroke-width="2"/>
            <circle cx="28" cy="48" r="4" fill="#ccc"/>
            <circle cx="92" cy="48" r="10" fill="#222" stroke="#444" stroke-width="2"/>
            <circle cx="92" cy="48" r="4" fill="#ccc"/>
            <path d="M5 36 L15 20 Q25 12 45 12 L75 12 Q90 12 98 22 L112 36 Z" fill="#F4B63E" stroke="#333" stroke-width="2"/>
            <rect x="5" y="32" width="110" height="12" fill="#F4B63E" stroke="#333" stroke-width="2"/>
            <rect x="25" y="34" width="6" height="4" fill="#000"/>
            <rect x="37" y="34" width="6" height="4" fill="#000"/>
            <rect x="49" y="34" width="6" height="4" fill="#000"/>
            <rect x="61" y="34" width="6" height="4" fill="#000"/>
            <rect x="73" y="34" width="6" height="4" fill="#000"/>
            <rect x="85" y="34" width="6" height="4" fill="#000"/>
            <path d="M22 22 L38 22 L38 16 L28 16 Z" fill="#b3e5fc" stroke="#333" stroke-width="1.5"/>
            <path d="M44 22 L72 22 L72 16 L44 16 Z" fill="#b3e5fc" stroke="#333" stroke-width="1.5"/>
            <path d="M78 22 L90 22 L84 16 L78 16 Z" fill="#b3e5fc" stroke="#333" stroke-width="1.5"/>
            <ellipse cx="111" cy="38" rx="4" ry="3" fill="#fff" class="taxi-headlight"/>
            <ellipse cx="5" cy="38" rx="2" ry="3" fill="#e2533b"/>
          </svg>
        </div>
        <div id="hero" class="ishaan-farewell-style" style="position:absolute;left:25%;bottom:6%;z-index:4;cursor:pointer;" title="Ishaan (Clique para ver reação)">
          ${ishaan("sad", .82)}
          <div class="tears-container" id="ishaan-tears"></div>
        </div>
        <div id="mate" class="mother-farewell-style" style="position:absolute;left:56%;bottom:6%;z-index:3;cursor:pointer;" title="Mãe (Clique para ver reação)">
          ${mateB("sad", .95)}
          <div class="tears-container" id="mother-tears"></div>
        </div>
        <div id="bro" class="father-farewell-style" style="position:absolute;left:70%;bottom:6%;z-index:3;cursor:pointer;" title="Pai (Clique para ver reação)">
          ${father("neutral", 1.1)}
        </div>
      </div>`;
    case "gate":
      return `<div class="scene" id="rainScene">${g}
        <div class="gate enter d1"><i></i><i></i><i></i></div>
        <div class="cagebox enter d2" style="filter:grayscale(.55)"><div class="act-sway" id="hero">${ishaan("sad", .84)}</div></div>
        <div class="gate enter d1"><i></i><i></i><i></i></div></div>`;
    case "strict_school":
      return `<div class="scene scene-strict-classroom">${g}
        <!-- Fria janela de tempestade ao fundo -->
        <div class="strict-window">
          <div class="window-pane">
            <span class="rain-drip drip1"></span>
            <span class="rain-drip drip2"></span>
            <span class="rain-drip drip3"></span>
          </div>
        </div>
        <div class="strict-light-beam"></div>
        
        <!-- Quadro com fórmulas e letras tortas -->
        <div class="board strict-board">
          <div class="board-title">SILENCE</div>
          <div class="board-math">2 + 2 = 5</div>
          <div class="board-scary-letter letter-a">A</div>
          <div class="board-scary-letter letter-b">B</div>
          <div class="board-scary-letter letter-c">C</div>
        </div>
        
        <!-- Colegas de classe idênticos e cinzentos -->
        <div class="strict-classmates">
          <div class="strict-seat" id="strict-stud0">
            <div class="strict-classmate-char">${mateA("neutral", 0.72)}</div>
            <div class="desk" style="width: 52px; margin-top:-6px;"></div>
          </div>
          <div class="strict-seat" id="strict-stud1">
            <div class="strict-classmate-char">${mateB("neutral", 0.72)}</div>
            <div class="desk" style="width: 52px; margin-top:-6px;"></div>
          </div>
          <div class="strict-seat" id="strict-stud2">
            <div class="strict-classmate-char">${mateA("neutral", 0.72)}</div>
            <div class="desk" style="width: 52px; margin-top:-6px;"></div>
          </div>
        </div>
        
        <!-- Mesa e Ishaan -->
        <div class="strict-ishaan-desk-group sitting">
          <div id="hero" class="ishaan-strict-style" title="Ishaan (Clique para ver reação)">
            ${ishaan("sad", 0.82)}
            <div class="tears-container" id="ishaan-tears"></div>
          </div>
          <div class="desk" id="strict-desk" style="width: 72px; margin-top:-10px;" title="Caderno (Clique para ver letras)">
            <div class="small-book" id="strict-book">
              <div class="page-l"></div>
              <div class="page-r"></div>
            </div>
          </div>
        </div>
        
        <!-- Professor Rígido -->
        <div id="bro" class="teacher-strict-classroom-style" title="Professor (Clique para ver reação)">
          ${strictTeacher("neutral", 1.15)}
        </div>
        
        <!-- Containers Dinâmicos -->
        <div id="nightmareLetterStorm" class="nightmare-letter-storm"></div>
        <div id="strictWords" class="strict-words-container"></div>
        
        <!-- Botão de Replay discreto -->
        <button id="strict-replay-btn" class="strict-replay-btn" onclick="runStrictSchoolTimeline()" title="Reiniciar animação da cena">
          <span class="material-symbols-rounded">replay</span>
        </button>
      </div>`;
    case "rajan":
      return `<div class="scene scene-rajan" style="overflow:hidden;">${g}
        <!-- Árvore interativa -->
        <div class="sc10-tree" id="sc10-tree" title="Clique na árvore para folhas caindo!">
          <div class="tree-trunk"></div>
          <div class="tree-foliage-1"></div>
          <div class="tree-foliage-2"></div>
          <div class="tree-foliage-3"></div>
          <div class="leaves-container" id="sc10-leaves"></div>
        </div>

        <!-- Banco de madeira -->
        <div class="sc10-bench" id="sc10-bench" title="Clique no banco!">
          <div class="bench-back"></div>
          <div class="bench-seat"></div>
          <div class="bench-leg-l"></div>
          <div class="bench-leg-r"></div>
          <!-- Passarinho interativo no banco -->
          <div class="sc10-bird" id="sc10-bird">🐤</div>
        </div>

        <!-- Borboleta interativa -->
        <div class="sc10-butterfly" id="sc10-butterfly" title="Clique na borboleta!">🦋</div>

        <!-- Personagens em posição absoluta para a linha do tempo -->
        <div id="hero" class="ishaan-rajan-style" style="position:absolute;left:56%;bottom:12%;z-index:4;cursor:pointer;" title="Ishaan (Clique para interagir)">
          ${ishaan("sad", .85)}
        </div>
        <div id="mate" class="rajan-style" style="position:absolute;left:-20%;bottom:12%;z-index:4;cursor:pointer;" title="Rajan (Clique para interagir)">
          ${rajan("neutral", .9)}
        </div>
      </div>`;
    case "depression":
      return `<div class="scene" style="filter:grayscale(.75)">${g}
        <div class="gate enter d1" style="height:70%"><i></i><i></i><i></i></div>
        <div class="cagebox" style="background:rgba(0,0,0,.08);border-color:#555"><div class="act-sway" id="hero">${ishaan("sad", .8)}</div></div></div>`;
    case "teacher":
      return `<div class="scene" id="burstScene">${g}
        <div class="burst" id="burstFx" style="background:radial-gradient(circle,var(--marigold),var(--vermilion))"></div>
        <span class="splat" style="left:12%;top:18%;width:34px;height:34px;background:var(--teal);animation-delay:.2s"></span>
        <span class="splat" style="right:14%;top:12%;width:26px;height:26px;background:var(--pink);animation-delay:.5s"></span>
        <div class="breathe" id="hero">${ishaan("sad", .82)}</div>
        <div class="act-walkR" id="teach">${nikumbh("happy", 1.16)}</div>
        <div class="breathe" id="mate">${mateB("happy", .82)}</div></div>`;
    case "bum_bum_bole":
      return `<div class="scene" id="burstScene">${g}
        <div class="burst" id="burstFx" style="background:radial-gradient(circle,var(--pink),var(--lilac))"></div>
        <span class="imag" style="left:15%;top:20%;color:var(--vermilion);font-size:2rem">🎈</span>
        <span class="imag" style="right:18%;top:15%;color:var(--marigold);font-size:1.8rem">♪</span>
        <span class="imag" style="left:38%;top:45%;color:var(--teal);font-size:2.2rem">♫</span>
        <div class="act-walkR" id="teach">${nikumbh("excited", 1.16)}</div>
        <div class="breathe" id="hero">${ishaan("sad", .8)}</div></div>`;
    case "empty_notebook":
      return `<div class="scene">${g}
        <div class="act-walkL" id="teach">${nikumbh("sad", 1.14)}</div>
        <div class="book" style="background:#fff;opacity:.6;box-shadow:none;transform:rotate(5deg);margin:0 15px"></div>
        <div class="breathe" id="hero">${ishaan("sad", .8)}</div></div>`;
    case "parents_house":
      return `<div class="scene">${g}
        <div class="easel" style="transform:rotate(-4deg);width:80px;height:80px;right:10%;bottom:30%;position:absolute;z-index:1">
          <span class="splash" style="width:50%;height:50%;background:var(--teal);left:10%;top:10%"></span>
        </div>
        <div id="teach" style="position:relative;z-index:2;margin-right:15px">${nikumbh("happy", 1.12)}</div>
        <div id="bro" style="position:relative;z-index:2;margin-right:15px">${father("sad", 1.1)}</div>
        <div class="breathe" id="hero" style="position:relative;z-index:2">${ishaan("sad", .8)}</div></div>`;
    case "father_meeting":
      return `<div class="scene">${g}
        <div id="teach" style="position:relative;z-index:2;margin-right:15px">${nikumbh("excited", 1.14)}</div>
        <div class="book" style="background:#fcfcfc;width:100px;height:70px;margin:0 10px;text-align:center;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:bold;color:var(--vermilion);position:relative;z-index:2">日本語</div>
        <div id="bro" style="position:relative;z-index:2;margin-left:15px">${father("surprised", 1.12)}</div></div>`;
    case "principal_office":
      return `<div class="scene">${g}
        <div id="teach" style="position:relative;z-index:2;margin-right:20px">${nikumbh("happy", 1.14)}</div>
        <div id="bro" style="position:relative;z-index:2">${principal("happy", 1.16)}</div>
        <div class="breathe" id="hero" style="position:relative;z-index:1;margin-left:15px">${ishaan("happy", .8)}</div></div>`;
    case "tutoring":
      return `<div class="scene">${g}
        <span class="spark" style="left:30%;top:12%;animation-delay:.2s">✦</span>
        <span class="spark" style="right:34%;top:20%;animation-delay:1s">✦</span>
        <span class="spark" style="left:46%;top:8%;animation-delay:1.6s">✦</span>
        <div class="act-walkL" id="teach">${nikumbh("happy", 1.12)}</div>
        <div style="display:flex;gap:.05em;align-items:flex-end;margin:0 10px">
          <span class="playL" style="color:var(--vermilion)">a</span>
          <span class="playL" style="color:var(--teal);animation-delay:.2s">b</span>
          <span class="playL" style="color:var(--marigold);animation-delay:.4s">c</span>
          <span class="playL" style="color:var(--lilac);animation-delay:.6s">!</span></div>
        <div class="breathe" id="hero">${ishaan("surprised", .9)}</div></div>`;
    case "sand_writing":
      return `<div class="scene">${g}
        <div class="act-walkL" id="teach">${nikumbh("happy", 1.12)}</div>
        <div class="cagebox" style="background:#e8d1a7;border-color:#c8b187;width:140px;height:40px;margin:0 15px;box-shadow:none;display:flex;align-items:center;justify-content:center;color:#8a6a42;font-family:Caveat;font-size:1.6rem;font-weight:bold;position:relative;z-index:2">A B C</div>
        <div class="breathe" id="hero">${ishaan("happy", .9)}</div></div>`;
    case "cards":
      return `<div class="scene">${g}
        <div class="cards">
          ${famous(PORTRAIT.einstein, "Einstein", ART.einstein, "E = mc²")}
          ${famous(PORTRAIT.picasso, "Picasso", ART.picasso, "Cubismo")}
          ${famous(PORTRAIT.davinci, "Da Vinci", ART.davinci, "Mona Lisa")}
          ${famous(PORTRAIT.christie, "A. Christie", ART.christie, "Romances")}
        </div></div>`;
    case "easel":
      return `<div class="scene" id="winScene">${g}<div class="spot"></div>
        <div class="enter d1 easel">
          <span class="splash" style="width:46%;height:46%;background:var(--vermilion);left:8%;top:10%;animation-delay:.5s"></span>
          <span class="splash" style="width:40%;height:40%;background:var(--teal);right:6%;top:26%;animation-delay:1s"></span>
          <span class="splash" style="width:34%;height:34%;background:var(--marigold);left:28%;bottom:8%;animation-delay:1.5s"></span>
          <span class="splash" style="width:24%;height:24%;background:var(--lilac);right:26%;bottom:14%;animation-delay:2s"></span></div>
        <div class="breathe" id="hero">${ishaan("happy", .95)}</div></div>`;
    case "paintings_reveal":
      return `<div class="scene" id="winScene">${g}
        <div class="spot"></div>
        <div class="enter d1 easel" style="background:linear-gradient(135deg,var(--lilac),var(--pink));margin:0 15px">
          <div class="dance" style="margin-top:20%"><span style="color:#fff;font-size:2rem">★</span></div>
        </div>
        <div class="act-walkL" id="teach" style="position:relative;z-index:2">${nikumbh("happy", 1.14)}</div>
        <div class="breathe" id="hero" style="position:relative;z-index:2;margin-left:15px">${ishaan("excited", .95)}</div></div>`;
    case "final_hug":
      return `<div class="scene" id="winScene">${g}
        <div class="spot"></div>
        <div class="act-hop" id="hero" style="animation-delay:.5s;position:relative;z-index:2">${ishaan("excited", 1)}</div>
        <div id="teach" style="position:relative;z-index:2;margin:0 15px">${nikumbh("excited", 1.16)}</div>
        <div id="bro" style="position:relative;z-index:1">${father("happy", 1.1)}</div></div>`;
    default:
      return "";
  }
}
