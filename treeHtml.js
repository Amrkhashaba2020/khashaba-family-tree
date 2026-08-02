export const TREE_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>شجرة نسب عائلة خشبه بسمالوط</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --parchment:#f4ecd4;
    --parchment-deep:#eadfc0;
    --panel:#fbf6e8;
    --ink:#2b2118;
    --ink-soft:#5b4c39;
    --green:#1f4a3d;
    --green-soft:#2f6650;
    --gold:#b8892b;
    --gold-soft:#e3c987;
    --burgundy:#7a2e2e;
    --line: #b8892b;
  }
  *{box-sizing:border-box; -webkit-tap-highlight-color:transparent;}
  html,body{margin:0;padding:0;}
  body{
    background:
      radial-gradient(1200px 600px at 10% -10%, rgba(31,74,61,0.06), transparent 60%),
      radial-gradient(1000px 500px at 100% 0%, rgba(122,46,46,0.05), transparent 55%),
      var(--parchment);
    color:var(--ink);
    font-family:'Noto Naskh Arabic', serif;
    line-height:1.9;
    padding:18px 12px 60px;
  }
  .wrap{max-width:860px;margin:0 auto;}

  .frame{
    position:relative;
    border:3px solid var(--ink);
    border-radius:0 34px 0 0;
    padding:22px 18px;
    background:var(--panel);
    box-shadow:0 8px 30px rgba(43,33,24,0.15);
  }
  .frame::before{
    content:"";
    position:absolute; inset:6px;
    border:1px solid var(--gold);
    border-radius:0 28px 0 0;
    pointer-events:none;
  }

  header.hero{
    text-align:center;
    padding:8px 6px 20px;
    border-bottom:2px double var(--gold);
    margin-bottom:18px;
  }
  header.hero .eyebrow{color:var(--burgundy); letter-spacing:1px; font-size:.85rem; margin-bottom:6px;}
  header.hero h1{font-family:'Aref Ruqaa', serif; font-weight:700; font-size:2.05rem; color:var(--green); margin:0 0 8px;}
  header.hero p.sub{color:var(--ink-soft); font-size:.92rem; margin:0;}

  section.card{
    background:var(--parchment-deep);
    border:1px solid var(--gold-soft);
    border-radius:12px;
    padding:16px 16px;
    margin:16px 0;
  }
  section.card h2{
    font-family:'Aref Ruqaa', serif; color:var(--green); font-size:1.3rem; margin:0 0 10px;
    display:flex; align-items:center; gap:8px;
  }
  section.card h2::before{content:""; width:10px;height:10px;border-radius:50%; background:var(--gold); display:inline-block;}
  .chain{display:flex; flex-wrap:wrap; gap:6px 10px; align-items:center; font-size:.95rem;}
  .chain .name{background:var(--panel); border:1px solid var(--gold-soft); border-radius:8px; padding:4px 10px; white-space:nowrap;}
  .chain .arrow{color:var(--gold); font-weight:700;}
  .note{color:var(--ink-soft); font-size:.88rem; margin-top:10px; border-right:3px solid var(--burgundy); padding-right:10px;}

  /* ---------- interactive tree canvas ---------- */
  .tree-toolbar{
    display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:10px;
  }
  .tree-toolbar button{
    font-family:'Noto Naskh Arabic'; background:var(--green); color:var(--parchment);
    border:none; padding:8px 14px; border-radius:20px; cursor:pointer; font-size:.85rem;
  }
  .tree-toolbar button.secondary{background:transparent; color:var(--green); border:1.5px solid var(--green);}
  .tree-toolbar button.icon{padding:8px 12px; font-weight:700;}
  .tree-toolbar button:active{transform:scale(0.95);}

  .legend{display:flex; flex-wrap:wrap; gap:6px; margin:0 0 10px; font-size:.72rem; justify-content:center;}
  .legend span{display:inline-flex; align-items:center; gap:4px; background:var(--panel); border:1px solid var(--gold-soft); border-radius:20px; padding:2px 8px;}
  .legend i{width:8px;height:8px;border-radius:50%;display:inline-block;}

  .viewport{
    position:relative;
    width:100%;
    height:62vh;
    min-height:420px;
    overflow:hidden;
    background:
      repeating-linear-gradient(0deg, rgba(184,137,43,0.06) 0px, rgba(184,137,43,0.06) 1px, transparent 1px, transparent 28px),
      repeating-linear-gradient(90deg, rgba(184,137,43,0.06) 0px, rgba(184,137,43,0.06) 1px, transparent 1px, transparent 28px),
      var(--panel);
    border:2px solid var(--gold-soft);
    border-radius:14px;
    touch-action:none;
    cursor:grab;
  }
  .viewport.dragging{cursor:grabbing;}
  .canvas{
    position:absolute;
    top:0; left:0;
    transform-origin:0 0;
    will-change:transform;
  }
  svg.lines{position:absolute; top:0; left:0; overflow:visible; pointer-events:none;}
  .node{
    position:absolute;
    width:158px;
    min-height:52px;
    background:var(--panel);
    border:1.6px solid var(--gold-soft);
    border-radius:10px;
    padding:7px 9px 6px;
    box-shadow:0 2px 6px rgba(43,33,24,0.12);
    direction:rtl;
    cursor:pointer;
    user-select:none;
    transition:box-shadow .15s ease;
  }
  .node:active{box-shadow:0 1px 3px rgba(43,33,24,0.12);}
  .node .nm{font-weight:700; font-size:.86rem; color:var(--ink); line-height:1.35;}
  .node .tg{font-size:.68rem; color:var(--ink-soft); margin-top:2px; line-height:1.3;}
  .node .badge{
    position:absolute; top:-9px; right:8px;
    font-size:.62rem; color:#fff; padding:1px 7px; border-radius:20px;
  }
  .node .toggle{
    position:absolute; bottom:-9px; left:50%; transform:translateX(50%);
    width:20px; height:20px; border-radius:50%;
    background:var(--burgundy); color:#fff;
    display:flex; align-items:center; justify-content:center;
    font-size:.85rem; font-weight:900; border:2px solid var(--panel);
  }
  .node.leaf{cursor:default;}
  .node.root{border-color:var(--green); border-width:2px;}

  .g1 .badge{background:var(--green);} .g1{border-color:var(--green);}
  .g2 .badge{background:var(--green-soft);}
  .g3 .badge{background:#4a7a52;}
  .g4 .badge{background:#8a9a3f;}
  .g5 .badge{background:var(--gold);}
  .g6 .badge{background:#c07a3a;}
  .g7 .badge{background:var(--burgundy);}

  .hint{text-align:center; font-size:.78rem; color:var(--ink-soft); margin-top:8px;}

  ul.summary{margin:0;padding-inline-start:20px;font-size:.9rem;color:var(--ink-soft);}
  details.shrine-list summary{cursor:pointer;color:var(--green);font-family:'Aref Ruqaa';font-size:1.1rem;}
  .shrine ol{margin:8px 0 0; padding-inline-start:20px; font-size:.9rem; color:var(--ink-soft);}
  .shrine li{margin-bottom:4px;}

  footer{text-align:center; margin-top:22px; padding-top:14px; border-top:2px double var(--gold); color:var(--ink-soft); font-size:.85rem;}
  footer .verse{font-family:'Aref Ruqaa', serif; color:var(--burgundy); font-size:1.05rem; margin-bottom:6px;}

  @media (max-width:480px){
    header.hero h1{font-size:1.55rem;}
    section.card h2{font-size:1.05rem;}
  }

  @media (orientation:landscape){
    body{padding:8px 6px 30px;}
    .wrap{max-width:100%;}
    .frame{padding:12px 8px;}
    #treeSection{padding:8px 6px;}
    .viewport{height:84vh; min-height:300px;}
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="frame">

    <header class="hero">
      <div class="eyebrow">نبذة في نسب — بحث وتحقيق على خشبه</div>
      <h1>شجرة عائلة خشبه بسمالوط</h1>
      <p class="sub">اضغط على أى اسم لفتح فروعه أو طيّها — واسحب بإصبعك للتنقل، وقرّص للتكبير والتصغير</p>
    </header>

    <section class="card">
      <h2>النسب الشريف لجدّ الأسرة الأكبر: سيدى منصور الباز</h2>
      <p style="font-size:.9rem;color:var(--ink-soft);margin:0 0 8px;">نسب السيد منصور الباز العراقى البطائحى (المتوفى نحو سنة ٥٠٠هـ ببغداد) من جهة أبيه:</p>
      <div class="chain">
        <span class="name">منصور الباز</span><span class="arrow">‹</span>
        <span class="name">السيد موسى الكامل</span><span class="arrow">‹</span>
        <span class="name">السيد الكامل</span><span class="arrow">‹</span>
        <span class="name">الطاهر عبد الصادق</span><span class="arrow">‹</span>
        <span class="name">جعفر الزكى</span><span class="arrow">‹</span>
        <span class="name">الإمام على الهادى</span><span class="arrow">‹</span>
        <span class="name">الإمام محمد الجواد</span><span class="arrow">‹</span>
        <span class="name">الإمام على الرضا</span><span class="arrow">‹</span>
        <span class="name">الإمام موسى الكاظم</span><span class="arrow">‹</span>
        <span class="name">الإمام جعفر الصادق</span><span class="arrow">‹</span>
        <span class="name">الإمام محمد الباقر</span><span class="arrow">‹</span>
        <span class="name">الإمام على زين العابدين</span><span class="arrow">‹</span>
        <span class="name">الإمام الحسين السبط</span><span class="arrow">‹</span>
        <span class="name">الإمام على بن أبى طالب وفاطمة الزهراء</span><span class="arrow">‹</span>
        <span class="name" style="background:var(--gold-soft);">سيدنا رسول الله ﷺ</span>
      </div>
      <div class="note">اللقب «أبو خشبه» أُطلق أصلًا على منصور الباز العراقى البطائحى، لواقعة العصا الخشبية التى استعان بها لإمساك اللصوص، ثم توارثه ذريته حتى صار «خشبه» هو اللقب الشائع لبعض الفروع اليوم.</div>
    </section>

    <section class="card">
      <h2>الجذر التاريخى بأسيوط قبل الرحيل إلى سمالوط</h2>
      <div class="chain">
        <span class="name">منصور الباز</span><span class="arrow">›</span>
        <span class="name">… (أجيال عدة)</span><span class="arrow">›</span>
        <span class="name">السيد عبد الرزاق</span><span class="arrow">›</span>
        <span class="name">أبناؤه: على — قاسم — محمد</span><span class="arrow">›</span>
        <span class="name">محمد</span><span class="arrow">›</span>
        <span class="name" style="background:var(--green);color:#fff;">على خشبه (الجد الأكبر لفرع سمالوط)</span>
      </div>
      <div class="note">«على خشبه» أول من ارتحل من أسيوط إلى سمالوط، منذ ما يزيد على ٢٠٠ سنة، إبان عهد محمد على باشا وأوائل القرن التاسع عشر، ومعه ابنه محمد وعدد من أقاربه.</div>
    </section>

    <section class="card" id="treeSection">
      <h2>شجرة عائلة خشبه بسمالوط — التفاعلية</h2>

      <div class="legend">
        <span><i style="background:var(--green)"></i> ج١</span>
        <span><i style="background:var(--green-soft)"></i> ج٢</span>
        <span><i style="background:#4a7a52"></i> ج٣</span>
        <span><i style="background:#8a9a3f"></i> ج٤</span>
        <span><i style="background:var(--gold)"></i> ج٥</span>
        <span><i style="background:#c07a3a"></i> ج٦</span>
      </div>

      <div class="tree-toolbar">
        <button id="expandAll">توسيع الكل</button>
        <button id="collapseAll" class="secondary">طى الكل</button>
        <button id="fitView" class="secondary">توسيط الشجرة</button>
        <button id="zoomIn" class="icon secondary">+</button>
        <button id="zoomOut" class="icon secondary">−</button>
      </div>

      <div class="viewport" id="viewport">
        <div class="canvas" id="canvas">
          <svg class="lines" id="lines"></svg>
        </div>
      </div>
      <div class="hint">📱 أدر موبايلك أفقيًا لأفضل عرض — اضغط على أى بطاقة لفتح أو طى أبنائها — استخدم إصبعين للتكبير</div>
    </section>

    <section class="card">
      <h2>ملخص الأجيال كما ورد بالنص</h2>
      <ul class="summary">
        <li><b>الجيل الأول:</b> على خشبه ونجله محمد على</li>
        <li><b>الجيل الثانى:</b> محمد بن محمد على خشبه، وابن عمه عبد الرحمن</li>
        <li><b>الجيل الثالث:</b> محمود، أحمد، محمد، حسن خشبه، وابن عمهم طلعت خشبه</li>
        <li><b>الجيل الرابع:</b> عبد الباقى، أحمد، محمد، أنس، محمود أحمد خشبه</li>
        <li><b>الجيل الخامس:</b> لطفى، خيرى، شريف، نبيل، صلاح ومن فى جيلهم</li>
        <li><b>الجيل السادس:</b> طلال، عصام، على، عادل، ممدوح، أحمد، سامى، خالد، مؤنس، مروان ومن فى جيلهم</li>
        <li><b>الجيل السابع:</b> مؤمن، ياسر، محمود، عمر، عبد الرحمن ومن فى جيلهم</li>
      </ul>
    </section>

    <section class="card">
      <details class="shrine-list">
        <summary>📍 بيان أضرحة السادة آل أبو خشبه (اضغط للعرض)</summary>
        <div class="shrine">
          <ol>
            <li>ضريح سيدى منصور الباز أبو خشبه بلزومه بالصعيد</li>
            <li>ضريح سيدى محمد أبو خشبه بالبر الأيمن للنيل، ديروط</li>
            <li>ضريح سيدى عامر أبو خشبه بقصر بغداد، مركز تلا، منوفية</li>
            <li>ضريح سيدى عامر حسن أبو خشبه بشباس الملح، دسوق</li>
            <li>ضريح سيدى على أبو خشبه بعزبته بشباس الملح</li>
            <li>ضريح سيدى محمد أبو خشبه بقصر حجاج، الأقصر</li>
            <li>ضريح سيدى منصور الباز أبو خشبه بفوه، كفر الشيخ</li>
            <li>ضريح سيدى منصور أبو خشبه بميت ربيعه، مركز بلبيس</li>
            <li>ضريح سيدى محمد أبو خشبه بالجزيرة الخضراء، رشيد</li>
            <li>ضريح سيدى محمد وسيدى أبو خشبه بمنية الحيط، الفيوم</li>
            <li>ضريح سيدى على جوش أبو خشبه، شرق كفر السودان، دسوق</li>
            <li>ضريح سيدى على أبو مندور أبو خشبه، رشيد</li>
            <li>ضريح سيدى يحيى أبو النظر أبو خشبه، أبى مندور</li>
            <li>ضريح سيدى حسن أبو خشبه بمحلة القصب، كفر الشيخ</li>
            <li>ضريح سيدى على أبو خشبه بإتميدة، دقهلية</li>
            <li>ضريح سيدى منصور الباز الأشهب القبابى، وأخيه ناصر الباز، بكفر الباز، القباب الكبرى</li>
            <li>ضريح سيدى شبل الباز، بالقباب الكبرى</li>
            <li>ضريح سيدى رسلان الباز، بدمشق</li>
            <li>ضريح سيدى أحمد الأرزق، بالمرج، مصر</li>
            <li>ضريح سيدى محمود الباز، مدفون بالعراق</li>
            <li>ضريح سيدى عرابى الباز، بالقاهرة (الجناين العباسية)</li>
            <li>ضريح سيدى يحيى أبو النور الباز، بجامع خيرت بالقاهرة</li>
            <li>ضريح سيدى سالم الباز، بالبلامون، مركز السنبلاوين</li>
            <li>ضريح سيدى أحمد البهلول، بمنشية الأخوة</li>
            <li>ضريح سيدى محمد شمس الدين بن سيدى سالم، بمسجده بدمياط</li>
          </ol>
        </div>
      </details>
    </section>

    <footer>
      <div class="verse">«إن أكرمكم عند الله أتقاكم»</div>
      <p>مستخرجة من كتيّب «نبذة فى نسب عائلة خشبه بسمالوط» — بحث وتحقيق على خشبه، الطبعة الأولى ١٤٣٢هـ / ٢٠١١م.<br>
      رُسمت هذه الشجرة رقميًا اعتمادًا على النص الأصلى للكتيّب فقط، وتظل الوثيقة الأصلية والمصادر المذكورة فيها هى المرجع الأدق لأى تفصيل.</p>
    </footer>

  </div>
</div>

<script>
// ---------------- data ----------------
const treeData = {
  name:"على خشبه", tag:"الجد الأكبر — ارتحل من أسيوط إلى سمالوط", gen:1,
  children:[
    { name:"محمد على خشبه", tag:"ابنه", gen:1,
      children:[
        { name:"محمد بن محمد على خشبه", tag:"أنجب ستة أبناء", gen:2,
          children:[
            { name:"محمود خشبه", tag:"من أعيان سمالوط — رئيس محكمة سمالوط", gen:3,
              children:[
                { name:"عبد الباقى محمود خشبه", tag:"من الأعيان — عضو مجلس الأمة", gen:4,
                  children:[
                    { name:"محمود خيرى", gen:5, children:[{name:"عصام، مايسه، على، أحمد، ناصر", gen:6}] },
                    { name:"سعد زغلول", gen:5, children:[{name:"سامى، أمل، أمانى", gen:6}] },
                    { name:"فاروق", tag:"لم يتزوج — استشهد ملازمًا أول فى حرب اليمن ١٩٦٣", gen:5 },
                    { name:"أسامة", tag:"لم يتزوج — توفى ١٩٨٩", gen:5 },
                    { name:"خيرية", tag:"تزوجت جمال فتح الباب", gen:5, children:[{name:"ليلي، نازلي، محمد، ميرفت، أحمد، إيمان", gen:6}] },
                    { name:"نفيسة", tag:"تزوجت ابن عم أبيها محمود خشبه", gen:5, children:[
                        { name:"نبيل", gen:6, children:[{name:"مروه، عمرو، هشام، خالد، يوسف، يحيا، مريم", gen:7}] },
                        { name:"وفاء، سناء، ناريمان، صفاء، عليه، سلوى، نجوى، أشرف، هناء، عبير", gen:6 }
                      ] },
                    { name:"فوزية", tag:"تزوجت طنطاوى الشريعى", gen:5, children:[{name:"على، هدى، عمار، منى، عادل، هناء، أحمد", gen:6}] },
                    { name:"فائزة", tag:"تزوجت شرف الدين عبد العزيز", gen:5, children:[{name:"سوسن، محمد، ميرفت، أميمة، مختار", gen:6}] }
                  ]
                },
                { name:"هانم محمود خشبه", tag:"تزوجت ابن عمها أحمد حسن خشبه", gen:4 },
                { name:"تفيدة محمود خشبه", tag:"تزوجت ابن عمها محمد حسن خشبه", gen:4 }
              ]
            },
            { name:"أحمد خشبه", tag:"من الأعيان — خريج الأزهر، درّس اللغة العربية إبان عهد الملك فؤاد", gen:3,
              children:[
                { name:"عبد الوهاب", gen:4, children:[{name:"سنية", tag:"تزوجت ابن عمها أنس حسن خشبه", gen:5}] },
                { name:"محمود", tag:"تزوج من نفيسة عبد الباقى خشبه", gen:4 }
              ]
            },
            { name:"محمد خشبه", tag:"من الأعيان", gen:3,
              children:[ { name:"زكية", tag:"تزوجت على طنطاوى الشريعى وأنجبت فوزية عبد الباقى خشبه", gen:4 } ]
            },
            { name:"حسن خشبه", tag:"من الأعيان — تزوج من عائلة خود", gen:3,
              children:[
                { name:"أحمد حسن خشبه", gen:4,
                  children:[
                    { name:"لطفى", gen:5, children:[{name:"طلال، ألفت، عادل، طاهر، مجدى، عبد العزيز، طارق", gen:6}] },
                    { name:"إبراهيم", gen:5 },
                    { name:"بثينة", gen:5, children:[{name:"فتح الله السوبى وإخوته", gen:6}] },
                    { name:"بهى الدين", gen:5, children:[{name:"نينت، ممدوح، مدحت، عماد، جيهان، ميرفت", gen:6}] },
                    { name:"خشيار", gen:5, children:[{name:"رجائى الشال وإخوته", gen:6}] },
                    { name:"محمود", gen:5, children:[{name:"محمد، أحمد، حنان، ياسمين", gen:6}] },
                    { name:"ثريا", gen:5, children:[{name:"محمد الدكر وإخوته", gen:6}] }
                  ]
                },
                { name:"محمد حسن خشبه", gen:4,
                  children:[
                    { name:"رئيسة", tag:"تزوجت ابن عمها إبراهيم — لم تنجب", gen:5 },
                    { name:"فاطمة", tag:"تزوجت مصطفى معلوف — لم تنجب", gen:5 },
                    { name:"فتحية", tag:"تزوجت نبيل خضر", gen:5, children:[{name:"رشا، رانيا", gen:6}] },
                    { name:"محمد الشريف", gen:5, children:[{name:"خالد، محمد، أحمد، إبراهيم، غادة", gen:6}] },
                    { name:"محمد وفدى", gen:5, children:[{name:"مروة، مروان، مى، ميادة، عبدالباقى", gen:6}] }
                  ]
                },
                { name:"أنس حسن خشبه", gen:4,
                  children:[
                    { name:"حسن", tag:"توفى فى شبابه ولم يتزوج", gen:5 },
                    { name:"صلاح", gen:5, children:[{name:"مؤنس، أحمد، محمد، محمود، مايسه، لمياء", gen:6}] },
                    { name:"نفيسه", gen:5, children:[{name:"بهاء الشال وإخوته", gen:6}] },
                    { name:"ليلى", gen:5, children:[{name:"ولاء شمس الدين الشيخ وأخيه وجدى", gen:6}] }
                  ]
                },
                { name:"زكيه حسن خشبه", gen:4,
                  children:[
                    { name:"سعودى، شمس، عزت", gen:5 },
                    { name:"آمال", tag:"من زوجها محمد الصغير إسماعيل الشيخ", gen:5 }
                  ]
                },
                { name:"نبوية حسن خشبه", tag:"أولادها: هند، فوزية، عبد الدايم خود", gen:4 }
              ]
            },
            { name:"فاطمة خشبه", tag:"تزوجت سيد محمد شعراوى — أولادها: شلقامى، ليثى، حسين، محمود، وجيده، وجيهه", gen:3 },
            { name:"آمنه خشبه", tag:"جدة أحمد موسى لوالدته، ووالد شحاتة والنقراشى", gen:3 }
          ]
        },
        { name:"عبد الرحمن خشبه", tag:"ابن عم محمد — من الأعيان", gen:2,
          children:[
            { name:"طلعت خشبه", tag:"ابنه الوحيد", gen:3,
              children:[
                { name:"زين العابدين", tag:"تزوج من عائلة الشيخ", gen:4, children:[{name:"طلعت، سنيه، ربيع، أزهار، ساميه، عبد الرحمن، عصمت، مديحه", gen:5}] },
                { name:"نعيمة طلعت خشبه", tag:"تزوجت ابن عمها عبد الباقى خشبه", gen:4 }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// default open/collapsed state: show up to generation 3, collapse deeper
(function setDefaults(n){
  if(n.children && n.children.length){
    n.collapsed = n.gen >= 3;
    n.children.forEach(setDefaults);
  }
})(treeData);
treeData.collapsed = false; // root always open

// ---------------- layout (VERTICAL: root at top, generations flow downward) ----------------
const UNIT_X = 176, ROW_H = 118, NODE_H_APPROX = 60;

function layoutWidth(n){
  if(!n.children || n.children.length===0 || n.collapsed){ n._w = 1; return 1; }
  let w = 0;
  n.children.forEach(c => w += layoutWidth(c));
  n._w = w;
  return w;
}
function assignPos(n, xStart, depth){
  n._y = depth;
  if(!n.children || n.children.length===0 || n.collapsed){
    n._x = xStart + 0.5;
    return xStart + 1;
  }
  let cursor = xStart;
  n.children.forEach(c => { cursor = assignPos(c, cursor, depth+1); });
  n._x = (n.children[0]._x + n.children[n.children.length-1]._x) / 2;
  return cursor;
}

let scale = 1, panX = 40, panY = 30;
const ROTATE_DEG = 90; // rotate the whole tree so it reads correctly when you turn the phone sideways
const viewport = document.getElementById('viewport');
const canvas = document.getElementById('canvas');
const svg = document.getElementById('lines');

function render(){
  layoutWidth(treeData);
  assignPos(treeData, 0, 0);

  const totalW = treeData._w * UNIT_X + 40;
  const maxDepth = getMaxDepth(treeData);
  const totalH = (maxDepth+1) * ROW_H + 60;

  canvas.style.width = totalW + 'px';
  canvas.style.height = totalH + 'px';
  svg.setAttribute('width', totalW);
  svg.setAttribute('height', totalH);
  svg.setAttribute('viewBox', '0 0 ' + totalW + ' ' + totalH);

  const nodesToRemove = canvas.querySelectorAll('.node');
  nodesToRemove.forEach(el => el.remove());
  svg.innerHTML = '';

  const pathParts = [];
  function walk(n, parent){
    const px = n._x * UNIT_X;
    const py = n._y * ROW_H + 20;

    if(parent){
      const ppx = parent._x * UNIT_X;
      const ppy = parent._y * ROW_H + 20 + NODE_H_APPROX;
      const midY = (ppy + py) / 2;
      pathParts.push('M '+ppx+' '+ppy+' C '+ppx+' '+midY+', '+px+' '+midY+', '+px+' '+py);
    }

    const div = document.createElement('div');
    const hasKids = n.children && n.children.length;
    div.className = 'node g' + n.gen + (hasKids ? '' : ' leaf') + (n === treeData ? ' root' : '');
    div.style.left = (px - 79) + 'px';
    div.style.top = py + 'px';

    let html = '<div class="badge">ج'+toArabicNum(n.gen)+'</div>';
    html += '<div class="nm">'+n.name+'</div>';
    if(n.tag) html += '<div class="tg">'+n.tag+'</div>';
    if(hasKids) html += '<div class="toggle">'+(n.collapsed ? '+' : '−')+'</div>';
    div.innerHTML = html;

    if(hasKids){
      div.addEventListener('click', (e)=>{
        e.stopPropagation();
        n.collapsed = !n.collapsed;
        render();
      });
    }
    canvas.appendChild(div);

    if(hasKids && !n.collapsed){
      n.children.forEach(c => walk(c, n));
    }
  }
  walk(treeData, null);

  svg.innerHTML = pathParts.map(d => '<path d="'+d+'" fill="none" stroke="var(--line)" stroke-width="2" opacity="0.6"/>').join('');

  applyTransform();
}

function getMaxDepth(n){
  if(!n.children || n.children.length===0 || n.collapsed) return n._y;
  return Math.max(...n.children.map(getMaxDepth));
}

function toArabicNum(n){
  const map = {1:'١',2:'٢',3:'٣',4:'٤',5:'٥',6:'٦',7:'٧'};
  return map[n] || n;
}

function applyTransform(){
  canvas.style.transform = 'translate('+panX+'px,'+panY+'px) rotate('+ROTATE_DEG+'deg) scale('+scale+')';
}

function fitView(){
  layoutWidth(treeData); assignPos(treeData,0,0);
  const totalW = treeData._w * UNIT_X + 40;
  const maxDepth = getMaxDepth(treeData);
  const totalH = (maxDepth+1) * ROW_H + 60;
  const vw = viewport.clientWidth, vh = viewport.clientHeight;
  // after a 90° rotation, the content's on-screen box is totalH wide × totalW tall
  scale = Math.min(vw/totalH, vh/totalW) * 0.94;
  panX = vw/2 + (totalH*scale)/2;
  panY = vh/2 - (totalW*scale)/2;
  applyTransform();
}

// ---------------- pan & zoom ----------------
let dragging = false, lastX=0, lastY=0;
let pinchStartDist=0, pinchStartScale=1;

viewport.addEventListener('pointerdown', (e)=>{
  dragging = true;
  lastX = e.clientX; lastY = e.clientY;
  viewport.classList.add('dragging');
  viewport.setPointerCapture(e.pointerId);
});
viewport.addEventListener('pointermove', (e)=>{
  if(!dragging) return;
  const dx = e.clientX - lastX, dy = e.clientY - lastY;
  panX += dx; panY += dy;
  lastX = e.clientX; lastY = e.clientY;
  applyTransform();
});
viewport.addEventListener('pointerup', (e)=>{
  dragging = false;
  viewport.classList.remove('dragging');
});
viewport.addEventListener('pointercancel', ()=>{ dragging=false; viewport.classList.remove('dragging'); });

// pinch zoom (touch)
viewport.addEventListener('touchstart', (e)=>{
  if(e.touches.length === 2){
    dragging = false;
    pinchStartDist = touchDist(e.touches);
    pinchStartScale = scale;
  }
}, {passive:true});
viewport.addEventListener('touchmove', (e)=>{
  if(e.touches.length === 2){
    e.preventDefault();
    const dist = touchDist(e.touches);
    const ratio = dist / pinchStartDist;
    scale = Math.min(Math.max(pinchStartScale * ratio, 0.25), 2.5);
    applyTransform();
  }
}, {passive:false});
function touchDist(touches){
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx*dx + dy*dy);
}

// mouse wheel zoom (desktop preview)
viewport.addEventListener('wheel', (e)=>{
  e.preventDefault();
  const delta = e.deltaY < 0 ? 1.1 : 0.9;
  scale = Math.min(Math.max(scale * delta, 0.25), 2.5);
  applyTransform();
}, {passive:false});

document.getElementById('zoomIn').addEventListener('click', ()=>{
  scale = Math.min(scale * 1.2, 2.5); applyTransform();
});
document.getElementById('zoomOut').addEventListener('click', ()=>{
  scale = Math.max(scale * 0.8, 0.25); applyTransform();
});
document.getElementById('fitView').addEventListener('click', fitView);

document.getElementById('expandAll').addEventListener('click', ()=>{
  (function open(n){ if(n.children){ n.collapsed=false; n.children.forEach(open);} })(treeData);
  render();
  setTimeout(fitView, 30);
});
document.getElementById('collapseAll').addEventListener('click', ()=>{
  (function close(n, depth){
    if(n.children){
      n.collapsed = depth >= 1;
      n.children.forEach(c => close(c, depth+1));
    }
  })(treeData, 0);
  render();
  setTimeout(fitView, 30);
});

render();
setTimeout(fitView, 50);
window.addEventListener('resize', fitView);
</script>
</body>
</html>
`;
