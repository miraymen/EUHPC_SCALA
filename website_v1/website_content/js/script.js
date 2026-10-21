// ScaLa supplementary website. Inlined into index.html by build_site.py; this file is the source.
// Videos play only while on screen (ten 2560-px animations at once would stall a laptop), and the top bar
// marks the section in view.
(function () {
  var vids = Array.prototype.slice.call(document.querySelectorAll('video[data-auto]'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && e.intersectionRatio > 0.25) {
          if (v.preload !== 'auto') { v.preload = 'auto'; }
          var p = v.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: [0, 0.25, 0.6] });
    vids.forEach(function (v) { io.observe(v); });

    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && byId[e.target.id]) {
          links.forEach(function (a) { a.classList.remove('on'); });
          byId[e.target.id].classList.add('on');
          var bar = byId[e.target.id].parentNode.parentNode;
          var a = byId[e.target.id];
          if (bar.scrollTo) { bar.scrollTo({ left: a.offsetLeft - 80, behavior: 'smooth' }); }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) { so.observe(s); }
    });
  } else {
    vids.forEach(function (v) { v.autoplay = true; v.play(); });
  }
})();
