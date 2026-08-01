export const TREE_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>شجرة نسب عائلة خشبة بسمالوط</title>
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
    --line: rgba(184,137,43,0.55);
  }
  *{box-sizing:border-box;}
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
  .wrap{max-width:820px;margin:0 auto;}

  /* manuscript frame, echoing the scanned pages' double-rule border with a curled corner */
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
  header.hero .eyebrow{
    font-family:'Noto Naskh Arabic';
    color:var(--burgundy);
    letter-spacing:1px;
    font-size:.85rem;
    margin-bottom:6px;
  }
  header.hero h1{
    font-family:'Aref Ruqaa', serif;
    font-weight:700;
    font-size:2.15rem;
    color:var(--green);
    margin:0 0 8px;
  }
  header.hero p.sub{
    color:var(--ink-soft);
    font-size:.95rem;
    margin:0;
  }

  section.card{
    background:var(--parchment-deep);
    border:1px solid var(--gold-soft);
    border-radius:12px;
    padding:16px 16px;
    margin:16px 0;
  }
  section.card h2{
    font-family:'Aref Ruqaa', serif;
    color:var(--green);
    font-size:1.35rem;
    margin:0 0 10px;
    display:flex; align-items:center; gap:8px;
  }
  section.card h2::before{
    content:"";
    width:10px;height:10px;border-radius:50%;
    background:var(--gold);
    display:inline-block;
  }
  .chain{
    display:flex; flex-wrap:wrap; gap:6px 10px; align-items:center;
    font-size:.98rem;
  }
  .chain .name{
    background:var(--panel);
    border:1px solid var(--gold-soft);
    border-radius:8px;
    padding:4px 10px;
    white-space:nowrap;
  }
  .chain .arrow{color:var(--gold); font-weight:700;}
  .note{
    color:var(--ink-soft);
    font-size:.9rem;
    margin-top:10px;
    border-right:3px solid var(--burgundy);
    padding-right:10px;
  }

  .toolbar{
    display:flex; gap:8px; justify-content:center; margin:14px 0 6px; flex-wrap:wrap;
  }
  .toolbar button{
    font-family:'Noto Naskh Arabic';
    background:var(--green);
    color:var(--parchment);
    border:none;
    padding:8px 16px;
    border-radius:20px;
    cursor:pointer;
    font-size:.9rem;
  }
  .toolbar button.secondary{
    background:transparent;
    color:var(--green);
    border:1.5px solid var(--green);
  }
  .toolbar button:active{transform:scale(0.97);}

  /* ---- tree ---- */
  .tree{margin-top:10px;}
  details{margin:2px 0;}
  details > summary{
    list-style:none;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:8px;
    padding:8px 10px;
    border-radius:10px;
    background:var(--panel);
    border:1px solid var(--gold-soft);
    position:relative;
  }
  details > summary::-webkit-details-marker{display:none;}
  details > summary::before{
    content:"›";
    display:inline-block;
    color:var(--gold);
    font-weight:900;
    font-size:1.1rem;
    transition:transform .15s ease;
    transform:rotate(180deg);
    width:14px;text-align:center;
  }
  details[open] > summary::before{transform:rotate(90deg);}
  details.leaf > summary::before{content:"•"; color:var(--burgundy); transform:none;}
  details.leaf > summary{cursor:default; background:transparent; border-color:transparent; padding-right:12px;}

  .person{
    font-weight:600;
    color:var(--ink);
  }
  .badge{
    font-family:'Noto Naskh Arabic';
    font-size:.72rem;
    color:var(--parchment);
    background:var(--green-soft);
    padding:2px 8px;
    border-radius:20px;
    white-space:nowrap;
  }
  .tag{
    font-size:.78rem;
    color:var(--ink-soft);
    margin-inline-start:auto;
    text-align:left;
  }
  .desc{
    font-size:.85rem;
    color:var(--ink-soft);
    padding:2px 6px 0 0;
  }

  .children{
    margin-right:16px;
    padding-right:16px;
    border-right:2px dashed var(--line);
    margin-top:4px;
  }

  .g1 .badge{background:var(--green);}
  .g2 .badge{background:var(--green-soft);}
  .g3 .badge{background:#4a7a52;}
  .g4 .badge{background:#8a9a3f;}
  .g5 .badge{background:var(--gold);}
  .g6 .badge{background:#c07a3a;}
  .g7 .badge{background:var(--burgundy);}

  .legend{
    display:flex; flex-wrap:wrap; gap:8px; margin:10px 0 4px; font-size:.8rem;
  }
  .legend span{
    display:inline-flex; align-items:center; gap:6px;
    background:var(--panel); border:1px solid var(--gold-soft); border-radius:20px; padding:3px 10px;
  }
  .legend i{width:10px;height:10px;border-radius:50%;display:inline-block;}

  details.shrine-list summary{font-weight:700;}
  .shrine ol{margin:8px 0 0; padding-inline-start:20px; font-size:.9rem; color:var(--ink-soft);}
  .shrine li{margin-bottom:4px;}

  footer{
    text-align:center;
    margin-top:22px;
    padding-top:14px;
    border-top:2px double var(--gold);
    color:var(--ink-soft);
    font-size:.85rem;
  }
  footer .verse{
    font-family:'Aref Ruqaa', serif;
    color:var(--burgundy);
    font-size:1.05rem;
    margin-bottom:6px;
  }

  @media (max-width:480px){
    header.hero h1{font-size:1.6rem;}
    section.card h2{font-size:1.1rem;}
    .chain{font-size:.85rem;}
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="frame">

    <header class="hero">
      <div class="eyebrow">نبذة في نسب — بحث وتحقيق على خشبة</div>
      <h1>شجرة عائلة خشبة بسمالوط</h1>
      <p class="sub">من الجد الأكبر «على خشبة» الذي ارتحل من أسيوط إلى سمالوط، إلى الجيل السابع من الأحفاء</p>
    </header>

    <!-- السلسلة الشريفة -->
    <section class="card">
      <h2>النسب الشريف لجدّ الأسرة الأكبر: سيدى منصور الباز</h2>
      <p style="font-size:.9rem;color:var(--ink-soft);margin:0 0 8px;">كما ورد بالنص: نسب السيد منصور الباز العراقى البطائحى (المتوفى نحو سنة ٥٠٠هـ ببغداد) من جهة أبيه:</p>
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
      <div class="note">اللقب «أبو خشبة» أُطلق أصلًا على الجد الأكبر منصور الباز العراقى البطائحى، لواقعة العصا الخشبية التى استعان بها لإمساك اللصوص، ثم توارثه ذريته حتى صار «خشبة» هو اللقب الشائع لبعض الفروع اليوم.</div>
    </section>

    <!-- الجذر بأسيوط -->
    <section class="card">
      <h2>الجذر التاريخى بأسيوط قبل الرحيل إلى سمالوط</h2>
      <div class="chain">
        <span class="name">منصور الباز</span><span class="arrow">›</span>
        <span class="name">… (أجيال عدة)</span><span class="arrow">›</span>
        <span class="name">السيد عبد الرزاق</span><span class="arrow">›</span>
        <span class="name">أبناؤه: على — قاسم — محمد</span><span class="arrow">›</span>
        <span class="name">محمد</span><span class="arrow">›</span>
        <span class="name" style="background:var(--green);color:#fff;">على خشبة (الجد الأكبر لفرع سمالوط)</span>
      </div>
      <div class="note">السيد عبد الرزاق هو أصل فروع أسيوط جميعها، وسُمّى بهذا الاسم لأنه رُزق به بعد تقدّم والده فى السن. أما «على خشبة» فهو أول من ارتحل من أسيوط إلى سمالوط، منذ ما يزيد على ٢٠٠ سنة، إبان عهد محمد على باشا وأوائل القرن التاسع عشر، ومعه ابنه محمد وعدد من أقاربه.</div>
    </section>

    <!-- شجرة العائلة التفاعلية -->
    <section class="card">
      <h2>شجرة عائلة خشبة بسمالوط — الأجيال من الأول إلى السابع</h2>
      <div class="legend">
        <span><i style="background:var(--green)"></i> الجيل ١</span>
        <span><i style="background:var(--green-soft)"></i> الجيل ٢</span>
        <span><i style="background:#4a7a52"></i> الجيل ٣</span>
        <span><i style="background:#8a9a3f"></i> الجيل ٤</span>
        <span><i style="background:var(--gold)"></i> الجيل ٥</span>
        <span><i style="background:#c07a3a"></i> الجيل ٦</span>
        <span><i style="background:var(--burgundy)"></i> الجيل ٧</span>
      </div>

      <div class="toolbar">
        <button id="expandAll">توسيع كل الشجرة</button>
        <button id="collapseAll" class="secondary">طى الشجرة</button>
      </div>

      <div class="tree" id="tree">

        <details class="g1" open>
          <summary><span class="badge">ج١</span><span class="person">على خشبة</span><span class="tag">الجد الأكبر — ارتحل من أسيوط إلى سمالوط</span></summary>
          <div class="children">

            <details class="g1" open>
              <summary><span class="badge">ج١</span><span class="person">محمد على خشبة</span><span class="tag">ابنه</span></summary>
              <div class="children">

                <details class="g2" open>
                  <summary><span class="badge">ج٢</span><span class="person">محمد بن محمد على خشبة</span><span class="tag">أنجب ستة أبناء</span></summary>
                  <div class="children">

                    <!-- 1) محمود خشبة -->
                    <details class="g3">
                      <summary><span class="badge">ج٣</span><span class="person">محمود خشبة</span><span class="tag">من أعيان سمالوط — رئيس محكمة سمالوط</span></summary>
                      <div class="children">

                        <details class="g4">
                          <summary><span class="badge">ج٤</span><span class="person">عبد الباقى محمود خشبة</span><span class="tag">من الأعيان — عضو مجلس الأمة</span></summary>
                          <div class="children">

                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">محمود خيرى</span></summary>
                              <div class="children">
                                <details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">عصام، مايسه، على، أحمد، ناصر</span></summary></details>
                              </div>
                            </details>

                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">سعد زغلول</span></summary>
                              <div class="children">
                                <details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">سامى، أمل، أمانى</span></summary></details>
                              </div>
                            </details>

                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">فاروق</span><span class="tag">لم يتزوج — استشهد ملازمًا أول فى حرب اليمن ١٩٦٣</span></summary></details>

                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">أسامة</span><span class="tag">لم يتزوج — توفى ١٩٨٩</span></summary></details>

                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">خيرية</span><span class="tag">تزوجت جمال فتح الباب</span></summary>
                              <div class="children">
                                <details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">ليلي، نازلي، محمد، ميرفت، أحمد، إيمان</span></summary></details>
                              </div>
                            </details>

                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">نفيسة</span><span class="tag">تزوجت ابن عم أبيها محمود خشبة</span></summary>
                              <div class="children">
                                <details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">نبيل، وفاء، سناء، ناريمان، صفاء، عليه، سلوى، نجوى، أشرف، هناء، عبير</span></summary></details>
                              </div>
                            </details>

                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">فوزية</span><span class="tag">تزوجت طنطاوى الشريعى</span></summary>
                              <div class="children">
                                <details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">على، هدى، عمار، منى، عادل، هناء، أحمد</span></summary></details>
                              </div>
                            </details>

                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">فائزة</span><span class="tag">تزوجت شرف الدين عبد العزيز (من رواد التعليم بسمالوط)</span></summary>
                              <div class="children">
                                <details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">سوسن، محمد، ميرفت، أميمة، مختار</span></summary></details>
                              </div>
                            </details>

                          </div>
                        </details>

                        <details class="leaf g4"><summary><span class="badge">ج٤</span><span class="person">هانم محمود خشبة</span><span class="tag">تزوجت ابن عمها أحمد حسن خشبة</span></summary></details>
                        <details class="leaf g4"><summary><span class="badge">ج٤</span><span class="person">تفيدة محمود خشبة</span><span class="tag">تزوجت ابن عمها محمد حسن خشبة</span></summary></details>

                      </div>
                    </details>

                    <!-- 2) أحمد خشبة -->
                    <details class="g3">
                      <summary><span class="badge">ج٣</span><span class="person">أحمد خشبة</span><span class="tag">من الأعيان — خريج الأزهر، درّس اللغة العربية إبان عهد الملك فؤاد</span></summary>
                      <div class="children">
                        <details class="g4">
                          <summary><span class="badge">ج٤</span><span class="person">عبد الوهاب</span></summary>
                          <div class="children">
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">سنية</span><span class="tag">تزوجت ابن عمها أنس حسن خشبة</span></summary></details>
                          </div>
                        </details>
                        <details class="leaf g4"><summary><span class="badge">ج٤</span><span class="person">محمود</span><span class="tag">تزوج من نفيسة عبد الباقى خشبة</span></summary></details>
                      </div>
                    </details>

                    <!-- 3) محمد خشبة -->
                    <details class="g3">
                      <summary><span class="badge">ج٣</span><span class="person">محمد خشبة</span><span class="tag">من الأعيان</span></summary>
                      <div class="children">
                        <details class="leaf g4"><summary><span class="badge">ج٤</span><span class="person">زكية</span><span class="tag">تزوجت على طنطاوى الشريعى وأنجبت فوزية عبد الباقى خشبة</span></summary></details>
                      </div>
                    </details>

                    <!-- 4) حسن خشبة -->
                    <details class="g3">
                      <summary><span class="badge">ج٣</span><span class="person">حسن خشبة</span><span class="tag">من الأعيان — تزوج من عائلة خود</span></summary>
                      <div class="children">

                        <details class="g4">
                          <summary><span class="badge">ج٤</span><span class="person">أحمد حسن خشبة</span></summary>
                          <div class="children">
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">لطفى</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">طلال، ألفت، عادل، طاهر، مجدى، عبد العزيز، طارق</span></summary></details></div>
                            </details>
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">إبراهيم</span></summary></details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">بثينة</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">فتح الله السوبى وإخوته</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">بهى الدين</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">نينت، ممدوح، مدحت، عماد، جيهان، ميرفت</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">خشيار</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">رجائى الشال وإخوته</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">محمود</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">محمد، أحمد، حنان، ياسمين</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">ثريا</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">محمد الدكر وإخوته</span></summary></details></div>
                            </details>
                          </div>
                        </details>

                        <details class="g4">
                          <summary><span class="badge">ج٤</span><span class="person">محمد حسن خشبة</span></summary>
                          <div class="children">
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">رئيسة</span><span class="tag">تزوجت ابن عمها إبراهيم — لم تنجب</span></summary></details>
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">فاطمة</span><span class="tag">تزوجت مصطفى معلوف — لم تنجب</span></summary></details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">فتحية</span><span class="tag">تزوجت نبيل خضر</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">رشا، رانيا</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">محمد الشريف</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">خالد، محمد، أحمد، إبراهيم، غادة</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">محمد وفدى</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">مروة، مروان، مى، ميادة، عبدالباقى</span></summary></details></div>
                            </details>
                          </div>
                        </details>

                        <details class="g4">
                          <summary><span class="badge">ج٤</span><span class="person">أنس حسن خشبة</span></summary>
                          <div class="children">
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">حسن</span><span class="tag">توفى فى شبابه ولم يتزوج</span></summary></details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">صلاح</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">مؤنس، أحمد، محمد، محمود، مايسه، لمياء</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">نفيسه</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">بهاء الشال وإخوته</span></summary></details></div>
                            </details>
                            <details class="g5">
                              <summary><span class="badge">ج٥</span><span class="person">ليلى</span></summary>
                              <div class="children"><details class="leaf g6"><summary><span class="badge">ج٦</span><span class="person">ولاء شمس الدين الشيخ وأخيه وجدى</span></summary></details></div>
                            </details>
                          </div>
                        </details>

                        <details class="g4">
                          <summary><span class="badge">ج٤</span><span class="person">زكيه حسن خشبة</span></summary>
                          <div class="children">
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">سعودى، شمس، عزت</span></summary></details>
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">آمال</span><span class="tag">من زوجها محمد الصغير إسماعيل الشيخ</span></summary></details>
                          </div>
                        </details>

                        <details class="leaf g4"><summary><span class="badge">ج٤</span><span class="person">نبوية حسن خشبة</span><span class="tag">أولادها: هند، فوزية، عبد الدايم خود</span></summary></details>

                      </div>
                    </details>

                    <!-- 5) فاطمة خشبة -->
                    <details class="leaf g3">
                      <summary><span class="badge">ج٣</span><span class="person">فاطمة خشبة</span><span class="tag">تزوجت سيد محمد شعراوى — أولادها: شلقامى، ليثى، حسين، محمود، وجيده، وجيهه</span></summary>
                    </details>

                    <!-- 6) آمنه خشبة -->
                    <details class="leaf g3">
                      <summary><span class="badge">ج٣</span><span class="person">آمنه خشبة</span><span class="tag">جدة أحمد موسى لوالدته، ووالد شحاتة والنقراشى</span></summary>
                    </details>

                  </div>
                </details>

                <!-- الفرع الموازى: عبد الرحمن ابن عم محمد -->
                <details class="g2" open>
                  <summary><span class="badge">ج٢</span><span class="person">عبد الرحمن خشبة</span><span class="tag">ابن عم محمد — من الأعيان</span></summary>
                  <div class="children">
                    <details class="g3">
                      <summary><span class="badge">ج٣</span><span class="person">طلعت خشبة</span><span class="tag">ابنه الوحيد</span></summary>
                      <div class="children">
                        <details class="g4">
                          <summary><span class="badge">ج٤</span><span class="person">زين العابدين</span><span class="tag">تزوج من عائلة الشيخ</span></summary>
                          <div class="children">
                            <details class="leaf g5"><summary><span class="badge">ج٥</span><span class="person">طلعت، سنيه، ربيع، أزهار، ساميه، عبد الرحمن، عصمت، مديحه</span></summary></details>
                          </div>
                        </details>
                        <details class="leaf g4"><summary><span class="badge">ج٤</span><span class="person">نعيمة طلعت خشبة</span><span class="tag">تزوجت ابن عمها عبد الباقى خشبة</span></summary></details>
                      </div>
                    </details>
                  </div>
                </details>

              </div>
            </details>
          </div>
        </details>

      </div>
    </section>

    <!-- ملخص الأجيال -->
    <section class="card">
      <h2>ملخص الأجيال كما ورد بالنص</h2>
      <ul style="margin:0;padding-inline-start:20px;font-size:.9rem;color:var(--ink-soft);">
        <li><b>الجيل الأول:</b> على خشبة ونجله محمد على</li>
        <li><b>الجيل الثانى:</b> محمد بن محمد على خشبة، وابن عمه عبد الرحمن</li>
        <li><b>الجيل الثالث:</b> محمود، أحمد، محمد، حسن خشبة، وابن عمهم طلعت خشبة</li>
        <li><b>الجيل الرابع:</b> عبد الباقى، أحمد، محمد، أنس، محمود أحمد خشبة</li>
        <li><b>الجيل الخامس:</b> لطفى، خيرى، شريف، نبيل، صلاح ومن فى جيلهم</li>
        <li><b>الجيل السادس:</b> طلال، عصام، على، عادل، ممدوح، أحمد، سامى، خالد، مؤنس، مروان ومن فى جيلهم</li>
        <li><b>الجيل السابع:</b> مؤمن، ياسر، محمود، عمر، عبد الرحمن ومن فى جيلهم</li>
      </ul>
    </section>

    <!-- الأضرحة -->
    <section class="card">
      <details class="shrine-list">
        <summary style="cursor:pointer;color:var(--green);font-family:'Aref Ruqaa';font-size:1.1rem;">📍 بيان أضرحة السادة آل أبو خشبة (اضغط للعرض)</summary>
        <div class="shrine">
          <ol>
            <li>ضريح سيدى منصور الباز أبو خشبة بلزومه بالصعيد</li>
            <li>ضريح سيدى محمد أبو خشبة بالبر الأيمن للنيل، ديروط</li>
            <li>ضريح سيدى عامر أبو خشبة بقصر بغداد، مركز تلا، منوفية</li>
            <li>ضريح سيدى عامر حسن أبو خشبة بشباس الملح، دسوق</li>
            <li>ضريح سيدى على أبو خشبة بعزبته بشباس الملح</li>
            <li>ضريح سيدى محمد أبو خشبة بقصر حجاج، الأقصر</li>
            <li>ضريح سيدى منصور الباز أبو خشبة بفوه، كفر الشيخ</li>
            <li>ضريح سيدى منصور أبو خشبة بميت ربيعه، مركز بلبيس</li>
            <li>ضريح سيدى محمد أبو خشبة بالجزيرة الخضراء، رشيد</li>
            <li>ضريح سيدى محمد وسيدى أبو خشبة بمنية الحيط، الفيوم</li>
            <li>ضريح سيدى على جوش أبو خشبة، شرق كفر السودان، دسوق</li>
            <li>ضريح سيدى على أبو مندور أبو خشبة، رشيد</li>
            <li>ضريح سيدى يحيى أبو النظر أبو خشبة، أبى مندور</li>
            <li>ضريح سيدى حسن أبو خشبة بمحلة القصب، كفر الشيخ</li>
            <li>ضريح سيدى على أبو خشبة بإتميدة، دقهلية</li>
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
      <p>مستخرجة من كتيّب «نبذة فى نسب عائلة خشبة بسمالوط» — بحث وتحقيق على خشبة، الطبعة الأولى ١٤٣٢هـ / ٢٠١١م.<br>
      رُسمت هذه الشجرة رقميًا اعتمادًا على النص الأصلى للكتيّب فقط، وتظل الوثيقة الأصلية والمصادر المذكورة فيها (كنقابة السادة الأشراف) هى المرجع الأدق لأى تفصيل.</p>
    </footer>

  </div>
</div>

<script>
  document.getElementById('expandAll').addEventListener('click', function(){
    document.querySelectorAll('#tree details').forEach(d => d.open = true);
  });
  document.getElementById('collapseAll').addEventListener('click', function(){
    document.querySelectorAll('#tree details').forEach(d => d.open = false);
    // keep the top two levels open for orientation
    document.querySelectorAll('#tree > details').forEach(d => d.open = true);
  });
</script>
</body>
</html>
`;
