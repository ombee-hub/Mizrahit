/* מפת האתר — כותרת מעל עמודות הקישורים בפוטר (משותף לכל הדפים) */
(function () {
  var fg = document.querySelector('footer .fgrid');
  if (!fg || fg.classList.contains('mapped')) return;
  var children = Array.prototype.slice.call(fg.children);
  if (children.length < 2) return;
  var cols = children.slice(1); // הראשון = בלוק הלוגו; השאר = עמודות הקישורים
  var fmap = document.createElement('div');
  fmap.className = 'fmap';
  var title = document.createElement('h3');
  title.className = 'fmap-title';
  title.textContent = 'מפת האתר';
  var fcols = document.createElement('div');
  fcols.className = 'fcols';
  cols.forEach(function (c) { fcols.appendChild(c); });
  fmap.appendChild(title);
  fmap.appendChild(fcols);
  fg.appendChild(fmap);
  fg.classList.add('mapped');
})();

/* נושמים מזרחית — תוסף נגישות (משותף לכל הדפים) */
(function () {
  if (document.querySelector('.acc-fab')) return;

  // עוטף את תוכן העמוד ב-#acc-root כדי שאפקטי הסינון/הזום לא ישפיעו על התוסף עצמו
  var root = document.getElementById('acc-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'acc-root';
    Array.prototype.slice.call(document.body.children).forEach(function (el) {
      var c = el.classList;
      if (el.tagName === 'SCRIPT') return;
      if (c && (c.contains('overlay') || c.contains('drawer') || c.contains('acc-fab') || c.contains('acc-panel'))) return;
      root.appendChild(el);
    });
    document.body.insertBefore(root, document.body.firstChild);
  }

  // אייקון הנגישות המלא (כפתור צף)
  var FAB_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="3.6" r="2.1"/><path d="M21 8.4c0 .6-.5 1.05-1.1 1.05h-3.9v3.05l1.45 7.05c.12.62-.34 1.2-.98 1.2-.5 0-.92-.36-1.02-.85L14.2 14.4H9.8l-1.25 5.5c-.1.5-.52.85-1.02.85-.64 0-1.1-.58-.98-1.2l1.45-7.05V9.45H4.1C3.5 9.45 3 9 3 8.4s.5-1.05 1.1-1.05h15.8c.6 0 1.1.45 1.1 1.05Z"/></svg>';

  function ic(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var OPTS = [
    { k: 'linksh',   label: 'הדגשת קישורים', icon: ic('<path d="M9 15l6-6"/><path d="M11 6l1-1a3.5 3.5 0 0 1 5 5l-1 1"/><path d="M13 18l-1 1a3.5 3.5 0 0 1-5-5l1-1"/>') },
    { k: 'contrast', label: 'ניגודיות',       icon: ic('<circle cx="12" cy="12" r="9"/><path d="M12 3v18z" fill="currentColor" stroke="none"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>') },
    { k: 'space',    label: 'ריווח טקסט',     icon: ic('<path d="M3 12h18"/><path d="M6 9l-3 3 3 3"/><path d="M18 9l3 3-3 3"/>') },
    { k: 'bigtext',  label: 'טקסט גדול',      icon: ic('<path d="M4 7h9"/><path d="M8.5 7v11"/><path d="M14 5h6"/><path d="M17 5v13"/>'), cycle: 3 },
    { k: 'noimg',    label: 'הסתרת תמונות',   icon: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 17l5-5 4 4"/><path d="M4 4l16 16"/>') },
    { k: 'noanim',   label: 'ביטול הנפשות',   icon: ic('<rect x="7" y="6" width="3" height="12" rx="1"/><rect x="14" y="6" width="3" height="12" rx="1"/>') },
    { k: 'cursor',   label: 'סמן גדול',       icon: ic('<path d="M6 4l11 7-4.5.9 2.8 5.6-2.2 1.1L10.9 13 6 16z"/>') },
    { k: 'dyslexia', label: 'תמיכה בדיסלקציה', icon: ic('<path d="M5 18V7a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v11"/><path d="M5 12h6"/><path d="M14 18V8h2.5a3 3 0 0 1 0 6H14"/>') },
    { k: 'lineh',    label: 'גובה שורה',      icon: ic('<path d="M9 6h12"/><path d="M9 12h12"/><path d="M9 18h12"/><path d="M4 4v16"/><path d="M2 6l2-2 2 2"/><path d="M2 18l2 2 2-2"/>') },
    { k: 'gray',     label: 'גווני אפור',     icon: ic('<path d="M12 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z"/>') },
    { k: 'center',   label: 'יישור למרכז',    icon: ic('<path d="M4 6h16"/><path d="M7 12h10"/><path d="M5 18h14"/>') }
  ];

  var KEY = 'mz-a11y';
  var st = {};
  try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { st = {}; }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  function apply() {
    var cl = root.classList;
    cl.toggle('acc-linksh',  !!st.linksh);
    cl.toggle('acc-contrast', !!st.contrast);
    cl.toggle('acc-space',    !!st.space);
    cl.toggle('acc-noimg',    !!st.noimg);
    cl.toggle('acc-noanim',   !!st.noanim);
    cl.toggle('acc-cursor',   !!st.cursor);
    cl.toggle('acc-dyslexia', !!st.dyslexia);
    cl.toggle('acc-lineh',    !!st.lineh);
    cl.toggle('acc-gray',     !!st.gray);
    cl.toggle('acc-center',   !!st.center);
    cl.toggle('acc-bigtext1', st.bigtext === 1);
    cl.toggle('acc-bigtext2', st.bigtext === 2);
    save();
  }

  // כפתור צף
  var fab = document.createElement('button');
  fab.className = 'acc-fab';
  fab.setAttribute('aria-label', 'תפריט נגישות');
  fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = FAB_ICON;
  document.body.appendChild(fab);

  // פאנל
  var panel = document.createElement('div');
  panel.className = 'acc-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'הגדרות נגישות');
  var grid = OPTS.map(function (o) {
    return '<button class="acc-opt" data-k="' + o.k + '">' + o.icon +
           '<span>' + o.label + '</span><span class="lvl" data-lvl="' + o.k + '"></span></button>';
  }).join('');
  panel.innerHTML =
    '<div class="acc-head"><h3>' + ic('<circle cx="12" cy="3.6" r="2.1" fill="currentColor" stroke="none"/><path d="M21 8.4c0 .6-.5 1-1.1 1h-3.9v3l1.45 7.1c.12.6-.34 1.2-.98 1.2-.5 0-.92-.37-1.02-.86L14.2 14.4H9.8l-1.25 5.44c-.1.5-.52.86-1.02.86-.64 0-1.1-.6-.98-1.2L8 12.4v-3H4.1C3.5 9.4 3 9 3 8.4s.5-1 1.1-1h15.8c.6 0 1.1.4 1.1 1Z" fill="currentColor" stroke="none"/>') +
    ' נגישות</h3><button class="acc-x" aria-label="סגירה">&times;</button></div>' +
    '<div class="acc-grid">' + grid + '</div>' +
    '<button class="acc-reset">איפוס כל ההגדרות</button>' +
    '<div class="acc-links">' +
      '<a href="accessibility.html">📄 הצהרת נגישות</a>' +
      '<a href="privacy.html">🔒 מדיניות פרטיות</a>' +
    '</div>';
  document.body.appendChild(panel);

  function refresh() {
    OPTS.forEach(function (o) {
      var btn = panel.querySelector('.acc-opt[data-k="' + o.k + '"]');
      var on = o.cycle ? (st[o.k] || 0) > 0 : !!st[o.k];
      btn.classList.toggle('on', on);
      var lvl = btn.querySelector('.lvl');
      lvl.textContent = (o.cycle && st[o.k]) ? 'רמה ' + st[o.k] : '';
    });
  }

  panel.addEventListener('click', function (e) {
    var opt = e.target.closest('.acc-opt');
    if (opt) {
      var k = opt.getAttribute('data-k');
      var def = OPTS.filter(function (o) { return o.k === k; })[0];
      if (def.cycle) st[k] = ((st[k] || 0) + 1) % def.cycle;
      else st[k] = !st[k];
      apply(); refresh();
      return;
    }
    if (e.target.closest('.acc-reset')) {
      st = {}; apply(); refresh();
    }
  });

  function open() { panel.classList.add('open'); fab.setAttribute('aria-expanded', 'true'); }
  function shut() { panel.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); }
  fab.addEventListener('click', function () {
    panel.classList.contains('open') ? shut() : open();
  });
  panel.querySelector('.acc-x').addEventListener('click', shut);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
  document.addEventListener('click', function (e) {
    if (panel.classList.contains('open') && !panel.contains(e.target) && !fab.contains(e.target)) shut();
  });

  // החלת העדפות שמורות בטעינה
  apply();
  refresh();
})();

/* באנר מדיניות פרטיות / עוגיות — מופיע בכניסה ראשונה בלבד */
(function () {
  var KEY = 'mz-privacy-consent';
  try { if (localStorage.getItem(KEY)) return; } catch (e) {}

  var b = document.createElement('div');
  b.className = 'cookie-banner';
  b.setAttribute('role', 'dialog');
  b.setAttribute('aria-label', 'הודעת פרטיות');
  b.innerHTML =
    '<div class="wrap cookie-inner">' +
      '<p>🍪 אתר נושמים מזרחית משתמש בעוגיות (Cookies) כדי לשפר את חוויית הגלישה ולשמור את העדפותיך. המשך הגלישה באתר מהווה הסכמה ל<a href="privacy.html">מדיניות הפרטיות</a>.</p>' +
      '<div class="cookie-actions">' +
        '<a href="privacy.html" class="cookie-link">קראו עוד</a>' +
        '<button class="btn cookie-accept" type="button">אישור והמשך</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(b);
  setTimeout(function () { b.classList.add('show'); }, 600);

  b.querySelector('.cookie-accept').addEventListener('click', function () {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    b.classList.remove('show');
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 380);
  });
})();
