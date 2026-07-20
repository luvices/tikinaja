/* devtools-guard.js — runs BEFORE page loads (beforeInteractive) */
(function () {
  // Mobile skip
  var ua = navigator.userAgent || navigator.vendor || window.opera || '';
  if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua)) return;
  if (('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 768) return;

  // ─── IMMEDIATE PAUSE ──────────────────────────────────────────────────────
  // Fires synchronously before any HTML renders.
  // If DevTools is open, execution stops HERE before the user sees the page.
  debugger; // eslint-disable-line no-debugger

  // ─── MID-SESSION DETECTION → RELOAD ──────────────────────────────────────
  var _open = false;

  // Method 1: regex getter — toString() only called when DevTools formats it
  var _det = /./;
  _det.toString = function () { _open = true; };

  // Method 2: timing — debugger takes >100 ms when DevTools paused
  function timingCheck() {
    var t0 = performance.now();
    debugger; // eslint-disable-line no-debugger
    return performance.now() - t0 > 100;
  }

  // Method 3: window size diff (docked DevTools)
  function sizeCheck() {
    return window.outerHeight - window.innerHeight > 150 ||
           window.outerWidth  - window.innerWidth  > 150;
  }

  // Runs every 300ms — reloads page the moment DevTools is detected
  setInterval(function () {
    _open = false;
    console.log(_det);
    console.clear();

    if (_open || sizeCheck() || timingCheck()) {
      // Force reload → triggers immediate debugger pause again on next load
      window.location.reload();
    }
  }, 300);
})();
