(function () {
  'use strict';

  /* ── Console greeting ─────────────────────────────────────────────────── */
  const REPO = 'https://github.com/luvices/tikinaja';

  console.log(
    '%c Eh, ngapain sampe sini? 👀 ',
    'background:#18181b;color:#a78bfa;font-size:16px;font-weight:bold;padding:6px 12px;border-radius:6px;'
  );
  console.log(
    '%c This project is open source → ' + REPO,
    'color:#6ee7b7;font-size:13px;padding:2px 0;'
  );
  console.log(
    '%c No need to snoop around — just read the source.',
    'color:#71717a;font-size:12px;'
  );

  /* ── Block DevTools keyboard shortcuts ───────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C / Ctrl+U
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (view source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      return false;
    }
  }, true);

  /* ── Custom right-click context menu ─────────────────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    // Remove any existing custom menu
    const existing = document.getElementById('__ctx_menu__');
    if (existing) existing.remove();

    const menu = document.createElement('div');
    menu.id = '__ctx_menu__';
    menu.style.cssText = [
      'position:fixed',
      'z-index:999999',
      `left:${e.clientX}px`,
      `top:${e.clientY}px`,
      'background:#18181b',
      'border:1px solid #3f3f46',
      'border-radius:8px',
      'padding:4px',
      'min-width:140px',
      'box-shadow:0 8px 24px rgba(0,0,0,0.5)',
      'font-family:system-ui,sans-serif',
      'font-size:13px',
    ].join(';');

    const items = [
      { label: '📋 Copy',  action: () => document.execCommand('copy') },
      { label: '📌 Paste', action: async () => {
          try {
            const text = await navigator.clipboard.readText();
            const active = document.activeElement;
            if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
              const start = active.selectionStart;
              const end = active.selectionEnd;
              const val = active.value;
              active.value = val.slice(0, start) + text + val.slice(end);
              active.setSelectionRange(start + text.length, start + text.length);
              active.dispatchEvent(new Event('input', { bubbles: true }));
            }
          } catch {}
        }
      },
    ];

    items.forEach(({ label, action }) => {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.style.cssText = [
        'display:block',
        'width:100%',
        'text-align:left',
        'background:transparent',
        'border:none',
        'color:#e4e4e7',
        'padding:7px 12px',
        'border-radius:5px',
        'cursor:pointer',
        'transition:background 0.1s',
      ].join(';');
      btn.addEventListener('mouseenter', () => { btn.style.background = '#27272a'; });
      btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; });
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        action();
        menu.remove();
      });
      menu.appendChild(btn);
    });

    document.body.appendChild(menu);

    // Close on click outside
    const close = (ev) => {
      if (!menu.contains(ev.target)) {
        menu.remove();
        document.removeEventListener('click', close, true);
      }
    };
    setTimeout(() => document.addEventListener('click', close, true), 0);
  });

  /* ── Continuous debugger trap ─────────────────────────────────────────── */
  // Opens the debugger every 100ms when DevTools panel is open.
  // Does nothing when DevTools is closed because the debugger statement
  // is a no-op without an active debugging session.
  let devtoolsOpen = false;

  function detectDevTools() {
    const threshold = 160;
    const widthDiff  = window.outerWidth  - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    devtoolsOpen = widthDiff > threshold || heightDiff > threshold;
  }

  setInterval(function () {
    detectDevTools();
    if (devtoolsOpen) {
      // eslint-disable-next-line no-debugger
      (function () { debugger; })();
    }
  }, 100);

})();
