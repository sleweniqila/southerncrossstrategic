(function(){
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header + back to top */
  var hdr=document.getElementById('hdr'), top=document.getElementById('top');
  var links=[].slice.call(document.querySelectorAll('nav a[href^="#"]'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
  function onScroll(){
    var y=window.scrollY;
    hdr.classList.toggle('stuck', y>40);
    top.classList.toggle('show', y>800);
    var cur=null;
    secs.forEach(function(s){ if(s.getBoundingClientRect().top<=140) cur=s.id; });
    if(links.length) links.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href')==='#'+cur); });
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  top.addEventListener('click', function(){ window.scrollTo({top:0, behavior: rm?'auto':'smooth'}); });

  /* mobile menu */
  var burger=document.getElementById('burger'), nav=document.getElementById('nav');
  burger.addEventListener('click', function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open?'Close menu':'Open menu');
  });
  nav.addEventListener('click', function(e){ if(e.target.tagName==='A'){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }});

  /* reveal on scroll */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); if(e.target.classList.contains('phase')) e.target.classList.add('on'); io.unobserve(e.target); }
    });
  },{threshold:.15, rootMargin:'0px 0px -60px'});
  [].forEach.call(document.querySelectorAll('.rv'), function(el,i){ el.style.transitionDelay=(i%4*70)+'ms'; io.observe(el); });

  /* subsidiary tabs */
  var tabs=[].slice.call(document.querySelectorAll('.subnav button'));
  tabs.forEach(function(b){
    b.addEventListener('click', function(){
      tabs.forEach(function(x){ x.setAttribute('aria-selected', x===b); });
      [].forEach.call(document.querySelectorAll('.pane'), function(p){
        if(p.id===b.dataset.tab){ p.setAttribute('data-open',''); } else { p.removeAttribute('data-open'); }
      });
    });
  });

  /* enquiry form -> mail client */
  var f=document.getElementById('enq'), note=document.getElementById('fn');
  if(f) f.addEventListener('submit', function(e){
    e.preventDefault();
    var n=document.getElementById('nm').value.trim(),
        em=document.getElementById('em').value.trim(),
        ms=document.getElementById('ms').value.trim(),
        sj=document.getElementById('sb').value;
    if(!n||!em||!ms){ note.textContent='Add your name, email and message before sending.'; note.style.color='#E8C77A'; return; }
    var body='Name: '+n+'%0D%0AEmail: '+em+'%0D%0A%0D%0A'+encodeURIComponent(ms);
    window.location.href='mailto:[insert company email]?subject='+encodeURIComponent('['+sj+'] '+n)+'&body='+body;
    note.textContent='Your email application should now be open with the message ready to send.';
    note.style.color='#8FA3BC';
  });

  var yr=document.getElementById('yr');
  if(yr) yr.textContent=new Date().getFullYear();

  /* ---- counters ---------------------------------------------------- */
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target, end=parseFloat(el.dataset.count)||0, t0=null, dur=1100;
      if(rm){ el.textContent=end; cio.unobserve(el); return; }
      function step(ts){
        if(t0===null) t0=ts;
        var p=Math.min((ts-t0)/dur,1), e2=1-Math.pow(1-p,3);
        el.textContent=Math.round(end*e2);
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step); cio.unobserve(el);
    });
  },{threshold:.4});
  [].forEach.call(document.querySelectorAll('.count'), function(el){ cio.observe(el); });

  /* ---- reduced motion: freeze every SVG timeline -------------------- */
  if(rm){
    [].forEach.call(document.querySelectorAll('svg'), function(s){
      if(s.pauseAnimations) try{ s.pauseAnimations(); }catch(err){}
    });
    [].forEach.call(document.querySelectorAll('.chartbox'), function(c){
      c.classList.add('chart-live');
    });
  }

  /* ================================================================== *
   *  THE SKY                                                            *
   *  Two canvases. #deep sits behind the whole document and shows       *
   *  through every transparent section; #sky is the hero field, which   *
   *  also carries the Southern Cross itself.                            *
   * ================================================================== */
  function field(canvas, opts){
    var c=canvas.getContext('2d'), W=0,H=0,dpr=1,layers=[],shots=[],t=0,scroll=0;

    function build(){
      dpr=Math.min(window.devicePixelRatio||1,2);
      W=canvas.clientWidth; H=canvas.clientHeight;
      canvas.width=Math.max(1,W*dpr); canvas.height=Math.max(1,H*dpr);
      c.setTransform(dpr,0,0,dpr,0,0);
      layers=[];
      var total=Math.min(Math.round(W*H/opts.density), opts.cap);
      [[0.45,0.55,1.0],[0.33,0.95,1.7],[0.22,1.5,2.6]].forEach(function(L,li){
        var n=Math.round(total*L[0]), arr=[];
        for(var i=0;i<n;i++) arr.push({
          x:Math.random()*W, y:Math.random()*H,
          r:L[1]+Math.random()*(L[2]-L[1]),
          a:0.20+Math.random()*0.55,
          s:(li+1)*0.035+Math.random()*0.03,
          p:Math.random()*6.283
        });
        layers.push({depth:(li+1)/3, stars:arr});
      });
    }

    function shoot(){
      if(!opts.shooting) return;
      var edge=Math.random();
      shots.push({
        x: W*(0.15+Math.random()*0.7), y: -20 + Math.random()*H*0.35,
        vx: -(2.6+Math.random()*2.2), vy: (1.5+Math.random()*1.4),
        life:0, max:52+Math.random()*26
      });
      if(shots.length>3) shots.shift();
      void edge;
    }

    function frame(){
      c.clearRect(0,0,W,H);
      layers.forEach(function(L){
        var par = opts.parallax ? (scroll*L.depth*0.06)%(H+40) : 0;
        L.stars.forEach(function(p){
          p.y -= p.s; if(p.y < -3){ p.y = H+3; p.x = Math.random()*W; }
          var y = p.y - par; if(y < -3) y += H+6; if(y > H+3) y -= H+6;
          var tw = p.a * (0.55 + 0.45*Math.sin(t/34 + p.p)) * (opts.dim || 1);
          c.beginPath(); c.arc(p.x, y, p.r, 0, 6.2832);
          c.fillStyle = 'rgba(214,226,242,'+tw.toFixed(3)+')';
          c.fill();
        });
      });

      /* shooting stars: rare, short, gold */
      for(var i=shots.length-1;i>=0;i--){
        var s=shots[i]; s.life++;
        s.x+=s.vx; s.y+=s.vy;
        var k=1-s.life/s.max;
        if(k<=0 || s.x<-60 || s.y>H+60){ shots.splice(i,1); continue; }
        var g=c.createLinearGradient(s.x,s.y,s.x-s.vx*11,s.y-s.vy*11);
        g.addColorStop(0,'rgba(244,227,180,'+(0.85*k).toFixed(3)+')');
        g.addColorStop(1,'rgba(244,227,180,0)');
        c.strokeStyle=g; c.lineWidth=1.5; c.lineCap='round';
        c.beginPath(); c.moveTo(s.x,s.y); c.lineTo(s.x-s.vx*11, s.y-s.vy*11); c.stroke();
      }

      if(opts.draw) opts.draw(c, W, H, t);
      t++;
      if(!rm) requestAnimationFrame(frame);
    }

    build();
    window.addEventListener('resize', function(){ build(); if(rm) frame(); });
    if(opts.parallax) window.addEventListener('scroll', function(){ scroll=window.scrollY; }, {passive:true});
    if(opts.shooting && !rm) setInterval(function(){ if(Math.random()<0.55) shoot(); }, 5200);
    frame();
  }

  /* the seven-pointed star used across the brand */
  function drawStar(c,x,y,r,pts,rot,fill){
    c.beginPath();
    for(var i=0;i<pts*2;i++){
      var rr=i%2?r*0.42:r, a=rot+i*Math.PI/pts;
      c[i?'lineTo':'moveTo'](x+rr*Math.cos(a), y+rr*Math.sin(a));
    }
    c.closePath(); c.fillStyle=fill; c.fill();
  }

  /* page-wide deep field */
  var deep=document.getElementById('deep');
  /* quieter behind the reading sections than in the hero: the field should
   feel like depth, not decoration, once there is text over it */
  if(deep) field(deep,{density:15000, cap:180, dim:.62, shooting:true, parallax:true});

  /* hero field, with the constellation drawn over it */
  var sky=document.getElementById('sky');
  if(sky){
    var cross=[{x:.62,y:.18,r:3.4},{x:.72,y:.34,r:2.6},{x:.55,y:.40,r:2.6},
               {x:.645,y:.47,r:1.5},{x:.615,y:.66,r:3.2}];
    field(sky,{density:9000, cap:200, shooting:true, parallax:false,
      draw:function(c,W,H,t){
        var k=Math.min(W,H);
        c.strokeStyle='rgba(217,162,39,.22)'; c.lineWidth=1;
        c.beginPath();
        c.moveTo(cross[0].x*W,cross[0].y*H); c.lineTo(cross[4].x*W,cross[4].y*H);
        c.moveTo(cross[2].x*W,cross[2].y*H); c.lineTo(cross[1].x*W,cross[1].y*H);
        c.stroke();
        cross.forEach(function(s,i){
          var tw=.86+.14*Math.sin(t/28+i*1.7), r=s.r*k/135;
          c.save();
          c.shadowColor='rgba(244,227,180,'+(0.75*tw).toFixed(2)+')'; c.shadowBlur=r*3.0;
          drawStar(c, s.x*W, s.y*H, r, 7, -Math.PI/2, 'rgba(255,255,255,'+tw.toFixed(3)+')');
          c.restore();
        });
      }});
  }


  /* ================================================================== *
   *  GALLERY                                                            *
   *  Tiles reshuffle on a timer. The reorder is done with FLIP: measure *
   *  where every tile is, reorder the DOM, measure again, then animate  *
   *  each tile from its old position to its new one. That keeps the     *
   *  movement smooth without ever laying the grid out twice on screen.  *
   * ================================================================== */
  var grid = document.getElementById('grid');
  if (grid) {
    var tiles   = [].slice.call(grid.children),
        photos  = JSON.parse(document.getElementById('galdata').textContent),
        chips   = [].slice.call(document.querySelectorAll('.chips [data-cat]')),
        countEl = document.getElementById('galcount'),
        cat     = 'all',
        timer   = null,
        auto    = !rm;

    function visible() {
      return tiles.filter(function (t) { return !t.classList.contains('gone'); });
    }

    function flip(reorder) {
      var shown = visible();
      var first = shown.map(function (t) { return t.getBoundingClientRect(); });
      reorder();
      shown.forEach(function (t, i) {
        var last = t.getBoundingClientRect(),
            dx = first[i].left - last.left,
            dy = first[i].top - last.top;
        if (!dx && !dy) return;
        t.style.transition = 'none';
        t.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      /* force a reflow so the browser accepts the start position */
      void grid.offsetWidth;
      shown.forEach(function (t, i) {
        t.style.transition = 'transform .78s cubic-bezier(.22,.72,.24,1) ' + (i % 8 * 26) + 'ms';
        t.style.transform = '';
      });
    }

    function shuffle() {
      if (document.hidden) return;
      flip(function () {
        var pool = visible();
        /* rotate a random slice rather than fully re-sorting: the set stays
           recognisable between passes instead of scrambling every time */
        for (var n = 0; n < Math.max(3, pool.length / 5); n++) {
          var a = pool[Math.floor(Math.random() * pool.length)];
          grid.insertBefore(a, pool[Math.floor(Math.random() * pool.length)]);
        }
        tiles = [].slice.call(grid.children);
      });
    }

    function filter(next) {
      cat = next;
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', c.dataset.cat === cat);
      });
      flip(function () {
        tiles.forEach(function (t) {
          t.classList.toggle('gone', cat !== 'all' && t.dataset.cat !== cat);
        });
      });
      if (countEl) countEl.textContent = visible().length;
    }

    chips.forEach(function (c) {
      c.addEventListener('click', function () { filter(c.dataset.cat); });
    });

    function startAuto() { stopAuto(); if (auto) timer = setInterval(shuffle, 5200); }
    function stopAuto()  { if (timer) { clearInterval(timer); timer = null; } }

    var sh = document.getElementById('shuffle'), ab = document.getElementById('autoshuf');
    if (sh) sh.addEventListener('click', shuffle);
    if (ab) {
      ab.setAttribute('aria-pressed', auto);
      ab.addEventListener('click', function () {
        auto = !auto;
        ab.setAttribute('aria-pressed', auto);
        ab.setAttribute('aria-label', auto ? 'Pause the continuous shuffle'
                                           : 'Resume the continuous shuffle');
        if (auto) startAuto(); else stopAuto();
      });
    }
    /* a shuffling grid in a background tab is wasted work */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAuto(); else startAuto();
    });
    startAuto();

    /* ---- lightbox --------------------------------------------------- */
    var lb = document.getElementById('lb'), lbImg = document.getElementById('lb-img'),
        lbT = document.getElementById('lb-t'), lbC = document.getElementById('lb-c'),
        lbN = document.getElementById('lb-n'), at = 0, opener = null;

    function show(i) {
      var pool = visible();
      if (!pool.length) return;
      at = (i + pool.length) % pool.length;
      var p = photos[+pool[at].dataset.i];
      lbImg.src = 'assets/img/gallery/' + p.id + '.jpg';
      lbImg.alt = p.t;
      lbT.textContent = p.t;
      lbC.textContent = p.c;
      lbN.textContent = p.cat + ' \u00b7 ' + (at + 1) + ' of ' + pool.length;
      /* preload the neighbours so arrowing through does not flash */
      [1, -1].forEach(function (d) {
        var n = photos[+pool[(at + d + pool.length) % pool.length].dataset.i];
        new Image().src = 'assets/img/gallery/' + n.id + '.jpg';
      });
    }

    function open(i, from) {
      opener = from || null;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      stopAuto();
      show(i);
      document.getElementById('lb-x').focus();
    }

    function close() {
      lb.hidden = true;
      document.body.style.overflow = '';
      startAuto();
      if (opener) opener.focus();
    }

    tiles.forEach(function (t) {
      t.querySelector('.tile-btn').addEventListener('click', function () {
        open(visible().indexOf(t), t.querySelector('.tile-btn'));
      });
    });
    document.getElementById('lb-x').addEventListener('click', close);
    document.getElementById('lb-prev').addEventListener('click', function () { show(at - 1); });
    document.getElementById('lb-next').addEventListener('click', function () { show(at + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(at - 1);
      else if (e.key === 'ArrowRight') show(at + 1);
    });
  }

  /* ================================================================== *
   *  RESOURCES: type-to-filter across both document sets                *
   * ================================================================== */
  var docq = document.getElementById('docq');
  if (docq) {
    var docs  = [].slice.call(document.querySelectorAll('.doc')),
        sets  = [].slice.call(document.querySelectorAll('.docset')),
        grps  = [].slice.call(document.querySelectorAll('.dgrp')),
        dchips = [].slice.call(document.querySelectorAll('[data-doc]')),
        none  = document.getElementById('docnone'),
        which = 'all';

    docs.forEach(function (d) {
      d.dataset.q = d.textContent.toLowerCase().replace(/\s+/g, ' ');
    });

    function apply() {
      var q = docq.value.trim().toLowerCase(), hits = 0;
      sets.forEach(function (s) {
        var setHit = 0;
        [].forEach.call(s.querySelectorAll('.doc'), function (d) {
          var ok = (which === 'all' || s.dataset.set === which) &&
                   (!q || d.dataset.q.indexOf(q) > -1);
          d.classList.toggle('gone', !ok);
          if (ok) { setHit++; hits++; }
        });
        s.classList.toggle('gone', !setHit);
      });
      /* hide a group heading whose documents have all been filtered out */
      grps.forEach(function (g) {
        var n = g.nextElementSibling, any = false;
        while (n && n.classList.contains('doc')) {
          if (!n.classList.contains('gone')) { any = true; break; }
          n = n.nextElementSibling;
        }
        g.classList.toggle('gone', !any);
      });
      none.hidden = hits > 0;
    }

    dchips.forEach(function (c) {
      c.addEventListener('click', function () {
        which = c.dataset.doc;
        dchips.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
        apply();
      });
    });
    docq.addEventListener('input', apply);
  }

})();
