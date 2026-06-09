/* נושמים מזרחית — תפריט צד נייד (drawer) משותף לכל הדפים */
(function () {
  var burger = document.querySelector('.burger');
  if (!burger) return;
  var menu = document.querySelector('.menu');

  // שכבת רקע כהה
  var overlay = document.createElement('div');
  overlay.className = 'overlay';

  // מגירת התפריט
  var drawer = document.createElement('aside');
  drawer.className = 'drawer';
  drawer.setAttribute('aria-hidden', 'true');

  // כותרת המגירה + כפתור סגירה
  var top = document.createElement('div');
  top.className = 'drawer-top';
  var title = document.createElement('img');
  title.src = 'images/logo/logo.png';
  title.alt = 'נושמים מזרחית';
  title.className = 'drawer-logo';
  var close = document.createElement('button');
  close.className = 'drawer-close';
  close.setAttribute('aria-label', 'סגירת תפריט');
  close.innerHTML = '&times;';
  top.appendChild(title);
  top.appendChild(close);
  drawer.appendChild(top);

  // שדה חיפוש בתוך התפריט
  var search = document.createElement('label');
  search.className = 'search drawer-search';
  var hdrSearch = document.querySelector('.nav .search input');
  var ph = hdrSearch ? hdrSearch.getAttribute('placeholder') : 'חיפוש שיר, אמן או אלבום…';
  search.innerHTML = '<span>🔍</span><input type="text" placeholder="' + ph + '">';

  // קישורי הניווט (משוכפלים מתפריט הדסקטופ)
  var nav = document.createElement('nav');
  nav.className = 'drawer-nav';
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      nav.appendChild(a.cloneNode(true));
    });
  }
  drawer.appendChild(nav);

  // שדה החיפוש — מתחת לקישורים (מתחת ל"רדיו")
  drawer.appendChild(search);

  // כפתור הרשמה בתוך התפריט
  var reg = document.createElement('a');
  reg.className = 'btn block';
  reg.href = 'register.html';
  reg.textContent = 'הרשמה';
  drawer.appendChild(reg);

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  function open() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function shut() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', open);
  overlay.addEventListener('click', shut);
  close.addEventListener('click', shut);
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') shut();
  });
  reg.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') shut();
  });
})();

/* אייקוני רשתות חברתיות אמיתיים בפוטר (אחיד בכל הדפים) */
(function () {
  var social = document.querySelector('.social');
  if (!social) return;

  var svg = {
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.55 21v-8.18h2.73l.41-3.18h-3.14V7.61c0-.92.25-1.55 1.57-1.55h1.68V3.21c-.29-.04-1.29-.12-2.45-.12-2.42 0-4.08 1.48-4.08 4.2v2.35H7.5v3.18h2.74V21h3.31Z"/></svg>',
    youtube:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/></svg>'
  };

  social.innerHTML =
    '<a href="#" title="פייסבוק" aria-label="פייסבוק">' + svg.facebook + '</a>' +
    '<a href="#" title="יוטיוב" aria-label="יוטיוב">' + svg.youtube + '</a>' +
    '<a href="#" title="אינסטגרם" aria-label="אינסטגרם">' + svg.instagram + '</a>' +
    '<a href="mailto:mizrahit.co@gmail.com" title="אימייל" aria-label="אימייל">' + svg.email + '</a>';
})();
