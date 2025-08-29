// Form logic
    const form = document.getElementById('loveForm');
    const calcBtn = document.getElementById('calcBtn');
    const yourNameInput = document.getElementById('yourName');
    const partnerNameInput = document.getElementById('partnerName');
    const scoreNumberEl = document.getElementById('scoreNumber');
    const scoreRowEl = document.getElementById('scoreRow');
    const meterFillEl = document.getElementById('meterFill');
    const messageEl = document.getElementById('loveMessage');

    function clearInput(id){
      const el = document.getElementById(id);
      el.value = '';
      // Reset result if both cleared
      if(!yourNameInput.value && !partnerNameInput.value){
        resetResult();
      }
      el.focus();
    }

    function resetResult(){
      scoreNumberEl.textContent = '--';
      meterFillEl.style.width = '0%';
      meterFillEl.style.filter = '';
      messageEl.textContent = '';
    }

    function sanitizeName(name){
      // Keep letters, spaces, hyphens, apostrophes; trim multiple spaces
      return name.replace(/[^A-Za-z\s'\-]/g, '').replace(/\s+/g,' ').trim();
    }

    function friendlyMessage(score){
      if(score >= 86) return "A cosmic connection! 💞 Soulmate vibes.";
      if(score >= 61) return "Great chemistry! 🔥 Keep the spark alive.";
      if(score >= 31) return "Promising! 🌟 Nurture the bond.";
      return "Every story starts small. 🌱 Give it time.";
    }

    function animateNumber(target){
      const duration = 900;
      const start = performance.now();
      function frame(now){
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const current = Math.round(eased * target);
        scoreNumberEl.textContent = String(current);
        if(p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function heartBurst(x, y) {
      const emojis = ["💖","💘","❤️","💕","💗","💓"];
      const count = 18;
      for(let i=0;i<count;i++){
        const span = document.createElement('span');
        span.className = 'floating-heart';
        span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        const dx = (Math.random() * 160 - 80); // left/right variance
        const dy = 140 + Math.random() * 160;  // float height
        const s = 0.9 + Math.random() * 0.8;   // scale
        const r = (Math.random() * 40 - 20) + 'deg';
        const dur = 900 + Math.random() * 900;
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        span.style.fontSize = (18 + Math.random()*18) + 'px';
        span.style.setProperty('--dx', dx+'px');
        span.style.setProperty('--dy', dy+'px');
        span.style.setProperty('--s', s);
        span.style.setProperty('--r', r);
        span.style.setProperty('--dur', dur+'ms');
        document.body.appendChild(span);
        span.addEventListener('animationend', () => span.remove(), { once: true });
      }
    }

    function calculateLove(){
      let nameA = sanitizeName(yourNameInput.value);
      let nameB = sanitizeName(partnerNameInput.value);
      yourNameInput.value = nameA;
      partnerNameInput.value = nameB;

      if(!nameA || !nameB){
        alert('Please enter both names!');
        return;
      }

      // Random 10..100
      const loveScore = Math.floor(Math.random() * 91) + 10;

      calcBtn.disabled = true;
      scoreRowEl.classList.add('pulse');
      animateNumber(loveScore);

      // meter animation + glow intensity by score
      requestAnimationFrame(() => {
        meterFillEl.style.width = loveScore + '%';
        const glow = Math.min(1, Math.max(0, (loveScore - 50)/50)); // 0..1
        const glowPx = 6 + glow * 16;
        meterFillEl.style.filter = `saturate(${1 + glow*0.4}) drop-shadow(0 0 ${glowPx}px rgba(255,110,166, ${0.35 + glow*0.25}))`;
      });

      messageEl.textContent = friendlyMessage(loveScore);

      // Celebratory heart burst around the button center
      const btnRect = calcBtn.getBoundingClientRect();
      heartBurst(btnRect.left + btnRect.width/2, btnRect.top + btnRect.height/2);

      setTimeout(() => {
        calcBtn.disabled = false;
        scoreRowEl.classList.remove('pulse');
      }, 1000);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      calculateLove();
    });

    // Background hearts animation (many floating hearts)
    const colors = ["#ff557f","#a35bf1","#59a5ff","#41cc92","#f9c25e","#ff8fab"];
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const SVG_XLINK = "http://www.w3.org/1999/xlink";
    const hearts = document.getElementById('hearts');

    const particles = [];
    const VB = { x:-600, y:-400, w:1200, h:800 };

    function rand(min, max){ return Math.random()*(max-min)+min; }

    function makeHeartParticle() {
      const use = document.createElementNS(SVG_NS, 'use');
      use.setAttributeNS(SVG_XLINK, 'xlink:href', '#heart');
      use.setAttributeNS(null, 'x', -69);
      use.setAttributeNS(null, 'y', -69);
      use.setAttributeNS(null, 'width', 138);
      use.setAttributeNS(null, 'height', 138);

      const p = {
        el: use,
        x: rand(VB.x, VB.x + VB.w),
        y: rand(VB.y, VB.y + VB.h),
        s: rand(0.25, 1.2),            // scale
        a: rand(0.25, 0.9),            // opacity
        r: rand(0, 360),               // rotation
        dr: rand(-8, 8)/100,           // rotation speed
        vx: rand(-10, 10)/100,         // horizontal drift
        vy: rand(12, 42)/100,          // upward speed
        color: colors[Math.floor(Math.random()*colors.length)]
      };

      use.setAttributeNS(null, 'fill', p.color);
      use.setAttributeNS(null, 'opacity', p.a.toFixed(2));
      hearts.appendChild(use);
      particles.push(p);
    }

    function spawnHearts(){
      particles.length = 0;
      hearts.innerHTML = `
        <defs>
          <symbol id="heart" viewBox="-69 -16 138 138">
            <path d="M0,12 C 50,-30 110,50  0,120 C-110,50 -50,-30 0,12z" />
          </symbol>
        </defs>
      `;
      // More hearts based on viewport area
      const area = window.innerWidth * window.innerHeight;
      const base = 70; // base amount
      const extra = Math.min(80, Math.floor(area / 15000)); // scale up for big screens
      const total = base + extra; // around 70-150
      for(let i=0;i<total;i++) makeHeartParticle();
    }

    function animateHearts(){
      for(const p of particles){
        p.y -= p.vy;
        p.x += p.vx;
        p.r += p.dr;

        // Reset when past the top or far sideways
        const outTop = p.y < VB.y - 80;
        const outSide = (p.x < VB.x - 80) || (p.x > VB.x + VB.w + 80);
        if(outTop || outSide){
          p.x = rand(VB.x, VB.x + VB.w);
          p.y = VB.y + VB.h + rand(20, 120);
          p.s = rand(0.25, 1.2);
          p.a = rand(0.25, 0.9);
          p.vx = rand(-10, 10)/100;
          p.vy = rand(12, 42)/100;
          p.r = rand(0, 360);
          p.dr = rand(-8, 8)/100;
          p.el.setAttributeNS(null, 'opacity', p.a.toFixed(2));
          p.el.setAttributeNS(null, 'fill', colors[Math.floor(Math.random()*colors.length)]);
        }
        p.el.setAttributeNS(null, 'transform', `translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`);
      }
      requestAnimationFrame(animateHearts);
    }

    // Initialize hearts and re-spawn on resize
    spawnHearts();
    requestAnimationFrame(animateHearts);
    let resizeTO;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(spawnHearts, 250);
    });