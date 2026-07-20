/* devtools-guard.js — runs BEFORE page loads (beforeInteractive) */
(function () {
  // Mobile skip
  var ua = navigator.userAgent || navigator.vendor || window.opera || '';
  if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua)) return;
  if (('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 768) return;

  // ─── IMMEDIATE PAUSE ──────────────────────────────────────────────────────
  // Fires synchronously before any HTML renders.
  // If DevTools is open when page loads, execution stops here.
  debugger; // eslint-disable-line no-debugger

  // ─── MID-SESSION DETECTION → RELOAD ──────────────────────────────────────
  // Method 1: regex getter — toString() ONLY called when DevTools is open
  // and actively formatting the object for display. Reliable, no false positives.
  var _open = false;
  var _det = /./;
  _det.toString = function () { _open = true; };

  // Method 2: window size diff — only for docked DevTools (desktop)
  // Threshold 200px to avoid false positives from browser chrome / taskbar
  function sizeCheck() {
    return (window.outerHeight - window.innerHeight > 200) ||
           (window.outerWidth  - window.innerWidth  > 200);
  }

  setInterval(function () {
    _open = false;
    console.log(_det); // triggers _det.toString() only when DevTools console is open
    console.clear();

    if (_open || sizeCheck()) {
      window.location.reload();
    }
  }, 500);
})();
