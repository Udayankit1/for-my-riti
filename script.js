/**
 * FOR MY RITI ❤️ — A Little World Made Just For You
 * Pure Vanilla JavaScript (Zero frameworks, zero external dependencies)
 * Created with love by Ankit for Preeti ("Riti")
 */

(function () {
  'use strict';

  /* =========================================================================
     OPTIONAL CUSTOM AUDIO CONFIGURATION
     Leave empty ("") to use the built-in original Web Audio API romantic
     piano & warm ambient pad melody (zero missing file requests).
     If you add an MP3 file to assets/music/, set its relative path here,
     e.g.: const CUSTOM_AUDIO_FILE = './assets/music/our-melody.mp3';
     ========================================================================= */
  const CUSTOM_AUDIO_FILE = '';

  /* =========================================================================
     LOCAL STORAGE KEYS & SAFE STORAGE HELPER
     ========================================================================= */
  const STORAGE_KEYS = {
    BUCKET: 'for_my_riti_bucket_v1',
    QUESTIONS: 'for_my_riti_questions_v1',
    LETTERS_READ: 'for_my_riti_letters_read_v1',
    VOLUME: 'for_my_riti_volume_v1',
  };

  const storage = {
    get(key, fallback) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (_err) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (_err) {
        // Ignore storage quota or private mode restrictions gracefully
      }
    },
  };

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  /* =========================================================================
     1. CONTENT DATA — QUESTIONS, LETTERS & BUCKET LIST
     ========================================================================= */

  const QUESTIONS_DATA = [
    {
      id: 'q1',
      prompt: '“Riti, why do you love me?”',
      options: [
        {
          text: 'Because you make me feel special.',
          reply:
            'Because you truly are special to me, Riti — making you feel cherished comes naturally.',
        },
        {
          text: 'Because you understand me without saying much.',
          reply:
            'Even in silence, Preeti, understanding your heart is my favourite language.',
        },
        {
          text: 'Because your childishness makes me smile.',
          reply:
            'If acting a little silly brings that smile to your face, Riti, I’ll happily keep doing it forever.',
        },
        {
          text: 'I don’t know why, I just know I love you! ❤️',
          reply:
            'The best feelings never need an explanation — hearing that from my Riti means everything to me. ❤️',
        },
      ],
    },
    {
      id: 'q2',
      prompt: '“What do you love the most about me?”',
      options: [
        {
          text: 'My caring and protective nature.',
          reply:
            'Taking care of you and protecting your peace will always come first for me, Riti.',
        },
        {
          text: 'My silly jokes and childish behaviour.',
          reply:
            'Knowing my goofy side is safe with you makes loving you feel effortless.',
        },
        {
          text: 'The way I express my love and make you feel special.',
          reply:
            'You deserve to know how deeply you’re loved every single day, Preeti — never just on special occasions.',
        },
      ],
    },
    {
      id: 'q3',
      prompt: '“Do you genuinely see me as your future husband?”',
      options: [
        {
          text: 'Yes, absolutely! ❤️',
          reply:
            'You have no idea how wide I’m smiling imagining that future right beside you, Riti. ❤️',
        },
        {
          text: 'Yes, but you still have to impress me! 🙈',
          reply:
            'Deal, Riti! I promise I’ll never stop trying to win your heart all over again.',
        },
        {
          text: 'Obviously, who else? 😂',
          reply:
            'Best answer ever — nobody else stands a chance anyway, my Riti!',
        },
      ],
    },
    {
      id: 'q4',
      prompt:
        '“Riti, when we finally meet, what would you want our first moment to be like?”',
      options: [
        {
          text: 'A tight hug that makes us forget everything.',
          reply:
            'One long, warm hug where all the waiting quietly melts away.',
        },
        {
          text: 'Looking into each other’s eyes and smiling.',
          reply:
            'Just looking at you in person and smiling because you’re finally right there.',
        },
        {
          text: 'Holding hands and spending hours together.',
          reply:
            'Holding your hand with nowhere else to rush — I can’t wait for those unhurried hours.',
        },
        {
          text: 'I’ll let you surprise me! ❤️',
          reply:
            'Then leave it to me, Riti — I’ll make sure our very first moment stays in your heart forever. ❤️',
        },
      ],
    },
  ];

  const LETTERS_DATA = [
    {
      id: 'miss-me',
      indexLabel: 'LETTER 01 OF 05',
      title: 'OPEN WHEN YOU MISS ME',
      preview:
        'For the quiet moments when distance feels a little heavier and you wish I were right beside you.',
      occasion: 'Whenever the wait between us feels a little too long',
      paragraphs: [
        { type: 'greeting', text: 'My dearest Riti,' },
        {
          type: 'body',
          text: 'If you are opening this right now, it probably means you’re missing me — and I want you to know that wherever I am, there is a very real chance I’m thinking of you at this exact moment too.',
        },
        {
          type: 'body',
          text: 'Missing someone you genuinely care about has a quiet ache to it, doesn’t it? Sometimes it shows up in the middle of a busy day, and sometimes late at night when everything slows down and all you really want is to sit next to the one person who feels like peace.',
        },
        {
          type: 'body',
          text: 'We’ve spent so much time waiting for the day we finally don’t have to rely on a screen to hear each other’s voice. And the sweetest comfort right now is knowing that our wait is nearly over. Soon, missing each other from afar will turn into sitting across from each other, laughing in person, and spending real, unhurried quality time together.',
        },
        {
          type: 'highlight',
          text: 'Until I’m right there beside you, Preeti, close your eyes for a second and remember how deeply you’re on my mind. We’re almost there. ❤️',
        },
      ],
    },
    {
      id: 'our-story',
      indexLabel: 'LETTER 02 OF 05',
      title: 'OPEN WHEN YOU WANT TO KNOW OUR STORY',
      preview:
        'How a quiet morning in KYOTA around Class 6 or 7 quietly stayed in my memory across all these years.',
      occasion: 'The real beginning of how you stayed in my memory',
      paragraphs: [
        { type: 'greeting', text: 'Hey Preeti, my Riti,' },
        {
          type: 'body',
          text: 'Isn’t it amazing how life works? Long before you became “my Riti,” long before either of us could ever imagine talking about our future together, a tiny memory of you had already found a permanent place in my mind back in KYOTA.',
        },
        {
          type: 'body',
          text: 'I first noticed you around Class 6 or 7. Even after all these years, the exact scene I remember is so clear to me — it was a quiet morning, somewhere around 8 or 9 AM. You had just woken up and were sitting outside your home on a lawn chair.',
        },
        {
          type: 'body',
          text: 'There was nothing staged or dramatic about that morning, and maybe that is why it stayed so real in my head. Just the way you looked sitting there in the morning light, and the gentle, respectful way you said hello — it left an honest impression on me even back then as a kid.',
        },
        {
          type: 'body',
          text: 'Thousands of ordinary childhood mornings come and go without leaving a trace, Riti, yet that one simple moment never faded. Looking back now, it feels so special knowing that the girl from that quiet KYOTA morning is the exact person I care for so deeply today.',
        },
        {
          type: 'highlight',
          text: 'Some stories really do begin in the most unexpected, innocent ways — and ours will always be my favourite one to tell. ❤️',
        },
      ],
    },
    {
      id: 'upset-with-me',
      indexLabel: 'LETTER 03 OF 05',
      title: 'OPEN WHEN YOU ARE UPSET WITH ME',
      preview:
        'Because your heart, peace, and feelings will always matter far more to me than pride.',
      occasion: 'For moments when we misunderstand each other',
      paragraphs: [
        { type: 'greeting', text: 'My sweet Riti,' },
        {
          type: 'body',
          text: 'If you’re reading this letter, I probably did or said something that hurt your feelings, frustrated you, or left you feeling unheard. Before anything else, take a breath and let me tell you honestly: I’m sorry that I caused a heavy feeling in your heart.',
        },
        {
          type: 'body',
          text: 'I’m not perfect, Preeti, and there may be moments when I miss a cue or express myself clumsily. Please know that it is never from a lack of care for you. Your feelings are completely valid to me — I never want you to hold back what hurts you or pretend everything is fine just to keep the peace.',
        },
        {
          type: 'body',
          text: 'Whenever we have a misunderstanding, I want us to remember that we are on the exact same side. There is no “winning” an argument with the person I love. All I want is for us to talk honestly, listen to each other with patience and respect, and understand what the other person truly needs.',
        },
        {
          type: 'highlight',
          text: 'Whenever you’re ready to talk, Riti, I’m right here with an open heart and zero ego — ready to listen, understand you, and make things right together.',
        },
      ],
    },
    {
      id: 'doubt-my-love',
      indexLabel: 'LETTER 04 OF 05',
      title: 'OPEN WHEN YOU DOUBT HOW MUCH I LOVE YOU',
      preview:
        'A quiet, honest reminder of who you are in my life and why my heart chose you.',
      occasion: 'Whenever you need reassurance about what you mean to me',
      paragraphs: [
        { type: 'greeting', text: 'My Riti,' },
        {
          type: 'body',
          text: 'Sometimes overthinking creeps in quietly, even when everything is okay. If you ever find yourself wondering just how much you mean to me, I want these words to clear every bit of doubt from your mind.',
        },
        {
          type: 'body',
          text: 'You aren’t a passing chapter in my days, Preeti — you have become one of the most important, grounding parts of my life. Calling you “Riti” isn’t just a cute nickname to me; it carries warmth, comfort, and the feeling of having someone who genuinely feels like home.',
        },
        {
          type: 'body',
          text: 'I value our connection for the little things just as much as the big dreams: the way talking to you lightens my mood, the trust we share, the care in your voice, and the calm certainty I feel when I picture tomorrow with you.',
        },
        {
          type: 'highlight',
          text: 'I love you deeply and intentionally, Riti — and I am genuinely excited for every single memory, trip, quiet evening, and milestone waiting ahead of us. ❤️',
        },
      ],
    },
    {
      id: 'before-first-meeting',
      indexLabel: 'LETTER 05 OF 05',
      title: 'OPEN BEFORE OUR FIRST MEETING',
      preview:
        'Save this one for right before the waiting ends and we finally stand in front of each other.',
      occasion: 'For the hours right before I finally see you in person',
      paragraphs: [
        { type: 'greeting', text: 'My dearest Preeti, my Riti,' },
        {
          type: 'body',
          text: 'If you are opening this letter because we are finally about to meet… pause for a second with me and let that sink in. After all the waiting, imagining, and counting down, it is actually happening.',
        },
        {
          type: 'body',
          text: 'I’ll be completely honest with you — my heart is probably beating a little faster than usual right now. As excited as I am, I know I might feel a bit shy and nervous in those final few seconds right before I spot you.',
        },
        {
          type: 'body',
          text: 'All I’ve wanted for so long is to walk up to you, wrap you in a warm hug, look straight into your eyes, and smile knowing you’re really there in front of me — not on a phone call, not in a message, but right within reach. I want to make every single moment of our first meeting feel safe, unhurried, and unforgettable for you.',
        },
        {
          type: 'highlight',
          text: '“Riti, I don’t know what I’ll say when I finally see you, but I know I’ll be incredibly happy that you’re standing right in front of me. ❤️”',
        },
      ],
    },
  ];

  const BUCKET_CATEGORIES = [
    {
      id: 'first-moments',
      code: 'CATEGORY A',
      title: 'OUR FIRST MOMENTS',
      svgIcon:
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
      items: [
        { id: 'fm-1', label: 'Our first proper meeting.' },
        { id: 'fm-2', label: 'Our first tight hug.' },
        { id: 'fm-3', label: 'Our first time holding hands.' },
        { id: 'fm-4', label: 'Our first coffee date.' },
        { id: 'fm-5', label: 'Our first dinner date.' },
        { id: 'fm-6', label: 'Our first long drive.' },
        { id: 'fm-7', label: 'Our first couple photograph.' },
        { id: 'fm-8', label: 'Our first movie date.' },
      ],
    },
    {
      id: 'romance-dates',
      code: 'CATEGORY B',
      title: 'ROMANCE AND DATES',
      svgIcon:
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>',
      items: [
        { id: 'rd-1', label: 'A beautiful candlelight dinner.' },
        { id: 'rd-2', label: 'Watching the sunset together.' },
        { id: 'rd-3', label: 'Watching the sunrise together.' },
        { id: 'rd-4', label: 'A romantic walk holding hands.' },
        { id: 'rd-5', label: 'Slow dancing together.' },
        { id: 'rd-6', label: 'Cooking something together.' },
        { id: 'rd-7', label: 'Surprise flowers and gifts.' },
        { id: 'rd-8', label: 'A long conversation under the stars.' },
        { id: 'rd-9', label: 'A special birthday celebration.' },
        { id: 'rd-10', label: 'Forehead kisses and endless hugs.' },
        { id: 'rd-11', label: 'Spending an entire lazy Sunday together.' },
      ],
    },
    {
      id: 'travel-adventures',
      code: 'CATEGORY C',
      title: 'TRAVEL AND ADVENTURES',
      svgIcon:
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
      items: [
        { id: 'ta-1', label: 'Our first weekend getaway.' },
        { id: 'ta-2', label: 'Our first proper couple trip.' },
        { id: 'ta-3', label: 'A mountain vacation.' },
        { id: 'ta-4', label: 'A beach vacation.' },
        { id: 'ta-5', label: 'A road trip with our favourite songs.' },
        { id: 'ta-6', label: 'Exploring a new city together.' },
        { id: 'ta-7', label: 'Staying at a beautiful resort.' },
        {
          id: 'ta-8',
          label: 'Watching the sunrise from a beautiful destination.',
        },
        { id: 'ta-9', label: 'Creating our own travel photo collection.' },
      ],
    },
    {
      id: 'little-forever',
      code: 'CATEGORY D',
      title: 'OUR LITTLE FOREVER',
      svgIcon:
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 17.5s-3-2-3-4a1.8 1.8 0 0 1 3-1.3 1.8 1.8 0 0 1 3 1.3c0 2-3 4-3 4Z"/></svg>',
      items: [
        { id: 'lf-1', label: 'Celebrating festivals together.' },
        { id: 'lf-2', label: 'Planning our dream home.' },
        { id: 'lf-3', label: 'Creating our own traditions.' },
        { id: 'lf-4', label: 'Celebrating relationship milestones.' },
        { id: 'lf-5', label: 'Making countless beautiful memories.' },
        { id: 'lf-6', label: 'Supporting each other’s dreams.' },
        { id: 'lf-7', label: 'Growing together.' },
        { id: 'lf-8', label: 'Growing old together.' },
      ],
    },
  ];

  const TOTAL_BUCKET_ITEMS = BUCKET_CATEGORIES.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  /* =========================================================================
     2. AMBIENT CANVAS ENGINE — ROSE PETALS, PARTICLES & FLOATING HEARTS
     ========================================================================= */

  const AmbientCanvas = (function () {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) {
      return { burst: function () {} };
    }
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = null;

    const particles = [];
    const burstItems = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createAmbientItem(randomY) {
      const roll = Math.random();
      const kind = roll < 0.42 ? 'petal' : roll < 0.85 ? 'glow' : 'heart';
      return {
        kind: kind,
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -24 - Math.random() * 80,
        size:
          kind === 'petal'
            ? 6 + Math.random() * 7
            : kind === 'heart'
              ? 6 + Math.random() * 5
              : 1.4 + Math.random() * 2.4,
        speedY:
          kind === 'glow' ? -0.18 - Math.random() * 0.28 : 0.35 + Math.random() * 0.55,
        speedX: (Math.random() - 0.5) * 0.35,
        swayAmp: 0.3 + Math.random() * 0.65,
        swayFreq: 0.006 + Math.random() * 0.012,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.016,
        alpha:
          kind === 'glow'
            ? 0.25 + Math.random() * 0.45
            : 0.22 + Math.random() * 0.34,
        tint:
          Math.random() > 0.45
            ? 'rgba(242, 198, 213,'
            : Math.random() > 0.5
              ? 'rgba(201, 154, 131,'
              : 'rgba(131, 37, 75,',
      };
    }

    function seedParticles() {
      particles.length = 0;
      const count = width < 640 ? 28 : 44;
      for (let i = 0; i < count; i++) {
        particles.push(createAmbientItem(true));
      }
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.beginPath();
      const s = p.size;
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.85, -s * 0.5, s * 0.9, s * 0.65, 0, s);
      ctx.bezierCurveTo(-s * 0.9, s * 0.65, -s * 0.85, -s * 0.5, 0, -s);
      ctx.fillStyle = p.tint + p.alpha.toFixed(3) + ')';
      ctx.fill();
      ctx.restore();
    }

    function drawMiniHeart(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * 0.25);
      const s = p.size * 0.11;
      ctx.scale(s, s);
      ctx.beginPath();
      ctx.moveTo(0, 28);
      ctx.bezierCurveTo(-36, 4, -38, -26, -18, -32);
      ctx.bezierCurveTo(-6, -36, 0, -24, 0, -18);
      ctx.bezierCurveTo(0, -24, 6, -36, 18, -32);
      ctx.bezierCurveTo(38, -26, 36, 4, 0, 28);
      ctx.fillStyle = 'rgba(242, 198, 213,' + p.alpha.toFixed(3) + ')';
      ctx.fill();
      ctx.restore();
    }

    function drawGlow(p, tick) {
      const pulse = 0.65 + 0.35 * Math.sin(tick * 0.02 + p.phase);
      const a = p.alpha * pulse;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 247, 242,' + a.toFixed(3) + ')';
      ctx.fill();
    }

    let tick = 0;

    function renderFrame() {
      if (prefersReducedMotion.matches) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(function (p) {
          if (p.kind === 'glow') drawGlow(p, 0);
        });
        rafId = null;
        return;
      }

      tick += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * p.swayFreq + p.phase) * p.swayAmp;
        p.rotation += p.rotSpeed;

        if (p.kind === 'glow' && p.y < -20) {
          p.y = height + 18;
          p.x = Math.random() * width;
        } else if (p.kind !== 'glow' && p.y > height + 30) {
          p.y = -24;
          p.x = Math.random() * width;
        }

        if (p.x < -30) p.x = width + 25;
        if (p.x > width + 30) p.x = -25;

        if (p.kind === 'petal') {
          drawPetal(p);
        } else if (p.kind === 'heart') {
          drawMiniHeart(p);
        } else {
          drawGlow(p, tick);
        }
      }

      for (let j = burstItems.length - 1; j >= 0; j--) {
        const b = burstItems[j];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += b.gravity;
        b.vx *= 0.99;
        b.rotation += b.rotSpeed;
        b.life -= 0.012;

        if (b.life <= 0) {
          burstItems.splice(j, 1);
          continue;
        }

        const drawObj = {
          x: b.x,
          y: b.y,
          size: b.size,
          rotation: b.rotation,
          alpha: Math.max(0, b.life * 0.72),
          tint: b.tint,
          phase: 0,
        };

        if (b.kind === 'heart') {
          drawMiniHeart(drawObj);
        } else if (b.kind === 'petal') {
          drawPetal(drawObj);
        } else {
          drawGlow(drawObj, tick);
        }
      }

      rafId = window.requestAnimationFrame(renderFrame);
    }

    function burst(count, originX, originY) {
      if (prefersReducedMotion.matches) return;
      const cx = typeof originX === 'number' ? originX : width * 0.5;
      const cy = typeof originY === 'number' ? originY : height * 0.5;
      const total = count || 26;

      for (let i = 0; i < total; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.4 + Math.random() * 4.2;
        const r = Math.random();
        burstItems.push({
          kind: r < 0.45 ? 'petal' : r < 0.78 ? 'heart' : 'glow',
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.6,
          gravity: 0.045,
          size: 5 + Math.random() * 6,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.06,
          life: 0.9 + Math.random() * 0.35,
          tint:
            Math.random() > 0.4
              ? 'rgba(242, 198, 213,'
              : 'rgba(201, 154, 131,',
        });
      }
    }

    function start() {
      resize();
      seedParticles();
      if (!rafId) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    }

    window.addEventListener('resize', function () {
      resize();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden && rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && !rafId) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    });

    start();

    return { burst: burst };
  })();

  /* =========================================================================
     3. ROMANTIC INSTRUMENTAL MUSIC ENGINE (WEB AUDIO API + OPTIONAL MP3)
     Gentle felt piano + warm dreamy ambient pads in F Major / D Minor.
     ========================================================================= */

  const RomanticAudio = (function () {
    let audioCtx = null;
    let masterGain = null;
    let htmlAudio = null;
    let schedulerTimer = null;

    let isPlaying = false;
    let isMuted = false;
    let volume = storage.get(STORAGE_KEYS.VOLUME, 65);
    let stepIndex = 0;

    const toggleBtn = document.getElementById('music-toggle-btn');
    const statusText = document.getElementById('music-status-text');
    const volumePopoverBtn = document.getElementById('volume-popover-btn');
    const volumePopover = document.getElementById('volume-popover');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValueLabel = document.getElementById('volume-value-label');
    const muteToggleBtn = document.getElementById('mute-toggle-btn');

    // Note frequency converter (MIDI note -> Hz)
    function midiToFreq(midi) {
      return 440 * Math.pow(2, (midi - 69) / 12);
    }

    // 32-step gentle romantic piano & pad progression (Fmaj9 -> Dm9 -> Bbmaj7 -> C9sus4 -> Am7 -> Dm7 -> Gm9 -> C7sus4)
    // Each step = 1 eighth-note at ~62 BPM (480ms per step)
    const PROGRESSION = [
      // Bar 1: Fmaj9
      { pad: [53, 60, 69], notes: [65, 76], dur: 2.4, vel: 0.72 },
      { notes: [60], dur: 1.4, vel: 0.42 },
      { notes: [69], dur: 1.5, vel: 0.48 },
      { notes: [79], dur: 1.9, vel: 0.64 },
      { notes: [77], dur: 2.1, vel: 0.68 },
      { notes: [69], dur: 1.4, vel: 0.42 },
      { notes: [76], dur: 1.8, vel: 0.58 },
      { notes: [72], dur: 1.6, vel: 0.48 },

      // Bar 2: Dm9
      { pad: [50, 57, 65], notes: [62, 74], dur: 2.5, vel: 0.7 },
      { notes: [65], dur: 1.4, vel: 0.42 },
      { notes: [69], dur: 1.5, vel: 0.46 },
      { notes: [76], dur: 1.9, vel: 0.6 },
      { notes: [72], dur: 2.2, vel: 0.64 },
      { notes: [65], dur: 1.3, vel: 0.4 },
      { notes: [69], dur: 1.7, vel: 0.5 },
      { notes: [], dur: 1.2, vel: 0 },

      // Bar 3: Bbmaj7
      { pad: [46, 53, 62], notes: [58, 74], dur: 2.4, vel: 0.7 },
      { notes: [62], dur: 1.4, vel: 0.42 },
      { notes: [65], dur: 1.5, vel: 0.46 },
      { notes: [77], dur: 2.0, vel: 0.66 },
      { notes: [76], dur: 2.0, vel: 0.62 },
      { notes: [65], dur: 1.3, vel: 0.4 },
      { notes: [74], dur: 1.8, vel: 0.56 },
      { notes: [72], dur: 1.6, vel: 0.5 },

      // Bar 4: C9sus4 -> C
      { pad: [48, 55, 65], notes: [60, 72], dur: 2.5, vel: 0.68 },
      { notes: [65], dur: 1.4, vel: 0.42 },
      { notes: [67], dur: 1.5, vel: 0.46 },
      { notes: [74], dur: 2.0, vel: 0.62 },
      { pad: [48, 55, 64], notes: [76], dur: 2.3, vel: 0.64 },
      { notes: [67], dur: 1.4, vel: 0.42 },
      { notes: [72], dur: 2.0, vel: 0.52 },
      { notes: [], dur: 1.2, vel: 0 },

      // Bar 5: Am7
      { pad: [45, 52, 64], notes: [57, 76], dur: 2.4, vel: 0.7 },
      { notes: [64], dur: 1.4, vel: 0.42 },
      { notes: [67], dur: 1.5, vel: 0.46 },
      { notes: [79], dur: 2.0, vel: 0.66 },
      { notes: [81], dur: 2.2, vel: 0.68 },
      { notes: [67], dur: 1.3, vel: 0.4 },
      { notes: [76], dur: 1.8, vel: 0.56 },
      { notes: [74], dur: 1.6, vel: 0.48 },

      // Bar 6: Dm7
      { pad: [50, 57, 65], notes: [62, 77], dur: 2.4, vel: 0.7 },
      { notes: [65], dur: 1.4, vel: 0.42 },
      { notes: [69], dur: 1.5, vel: 0.46 },
      { notes: [76], dur: 1.9, vel: 0.6 },
      { notes: [74], dur: 2.2, vel: 0.64 },
      { notes: [69], dur: 1.4, vel: 0.42 },
      { notes: [72], dur: 1.8, vel: 0.52 },
      { notes: [], dur: 1.2, vel: 0 },

      // Bar 7: Gm9
      { pad: [43, 50, 62], notes: [55, 74], dur: 2.4, vel: 0.7 },
      { notes: [62], dur: 1.4, vel: 0.42 },
      { notes: [65], dur: 1.5, vel: 0.46 },
      { notes: [72], dur: 2.0, vel: 0.6 },
      { notes: [70], dur: 2.1, vel: 0.62 },
      { notes: [62], dur: 1.3, vel: 0.4 },
      { notes: [69], dur: 1.8, vel: 0.56 },
      { notes: [67], dur: 1.6, vel: 0.5 },

      // Bar 8: C9sus4 resolving gently back toward F
      { pad: [48, 55, 65], notes: [60, 69], dur: 2.5, vel: 0.68 },
      { notes: [65], dur: 1.4, vel: 0.42 },
      { notes: [72], dur: 1.8, vel: 0.54 },
      { notes: [74], dur: 1.9, vel: 0.58 },
      { pad: [48, 55, 64], notes: [67, 76], dur: 2.6, vel: 0.64 },
      { notes: [64], dur: 1.5, vel: 0.4 },
      { notes: [60], dur: 2.0, vel: 0.42 },
      { notes: [], dur: 1.4, vel: 0 },
    ];

    function getEffectiveGain() {
      if (isMuted || volume <= 0) return 0;
      return Math.pow(volume / 100, 1.6) * 0.48;
    }

    function ensureWebAudio() {
      if (audioCtx) return;
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.0001;

      // Warm concert-hall stereo feedback delay reverb
      const dryBus = audioCtx.createGain();
      dryBus.gain.value = 0.78;

      const delayA = audioCtx.createDelay(1.0);
      delayA.delayTime.value = 0.31;
      const delayB = audioCtx.createDelay(1.0);
      delayB.delayTime.value = 0.46;

      const dampFilter = audioCtx.createBiquadFilter();
      dampFilter.type = 'lowpass';
      dampFilter.frequency.value = 980;

      const fbGain = audioCtx.createGain();
      fbGain.gain.value = 0.28;

      const wetGain = audioCtx.createGain();
      wetGain.gain.value = 0.34;

      masterGain.connect(dryBus);
      dryBus.connect(audioCtx.destination);

      masterGain.connect(delayA);
      delayA.connect(dampFilter);
      dampFilter.connect(delayB);
      delayB.connect(fbGain);
      fbGain.connect(delayA);

      dampFilter.connect(wetGain);
      delayB.connect(wetGain);
      wetGain.connect(audioCtx.destination);
    }

    function playFeltPianoNote(midi, duration, velocity) {
      if (!audioCtx || !masterGain) return;
      const now = audioCtx.currentTime;
      const freq = midiToFreq(midi);

      const noteGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1650 * (0.6 + velocity * 0.4), now);
      filter.frequency.exponentialRampToValueAtTime(
        480,
        now + Math.max(0.6, duration)
      );

      // Fundamental warm triangle + delicate 2nd harmonic sine
      const osc1 = audioCtx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      const harmGain = audioCtx.createGain();
      harmGain.gain.setValueAtTime(0.14 * velocity, now);
      harmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      const peak = 0.16 * velocity;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(peak, now + 0.022);
      noteGain.gain.exponentialRampToValueAtTime(peak * 0.38, now + 0.42);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8);

      osc1.connect(filter);
      osc2.connect(harmGain);
      harmGain.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.9);
      osc2.stop(now + duration + 0.9);
    }

    function playWarmPadChord(midiList, duration) {
      if (!audioCtx || !masterGain || !midiList || !midiList.length) return;
      const now = audioCtx.currentTime;

      const padFilter = audioCtx.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(420, now);

      const padGain = audioCtx.createGain();
      padGain.gain.setValueAtTime(0.0001, now);
      padGain.gain.linearRampToValueAtTime(0.068, now + 1.35);
      padGain.gain.setValueAtTime(0.062, now + Math.max(1.5, duration - 1.1));
      padGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.2);

      padFilter.connect(padGain);
      padGain.connect(masterGain);

      midiList.forEach(function (midi) {
        const freq = midiToFreq(midi);
        [-4, 4].forEach(function (detuneCents) {
          const osc = audioCtx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime(detuneCents, now);
          osc.connect(padFilter);
          osc.start(now);
          osc.stop(now + duration + 1.3);
        });
      });
    }

    function stepSequencer() {
      if (!isPlaying) return;
      const event = PROGRESSION[stepIndex % PROGRESSION.length];
      if (event.pad) {
        playWarmPadChord(event.pad, 3.8);
      }
      if (event.notes && event.notes.length) {
        event.notes.forEach(function (n, idx) {
          window.setTimeout(function () {
            if (isPlaying) {
              playFeltPianoNote(n, event.dur, event.vel);
            }
          }, idx * 42);
        });
      }
      stepIndex = (stepIndex + 1) % PROGRESSION.length;
    }

    function syncAudioUI() {
      if (toggleBtn) {
        toggleBtn.classList.toggle('is-playing', isPlaying);
        toggleBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
        toggleBtn.setAttribute(
          'aria-label',
          isPlaying
            ? 'Pause romantic background melody'
            : 'Play romantic background melody'
        );
      }
      if (statusText) {
        statusText.textContent = isPlaying ? 'Playing' : 'Paused';
      }
      if (volumeSlider) {
        volumeSlider.value = String(isMuted ? 0 : volume);
      }
      if (volumeValueLabel) {
        volumeValueLabel.textContent = (isMuted ? 0 : volume) + '%';
      }
      if (muteToggleBtn) {
        muteToggleBtn.textContent = isMuted || volume === 0 ? 'Unmute' : 'Mute';
      }
    }

    function applyVolume() {
      const target = getEffectiveGain();
      if (CUSTOM_AUDIO_FILE && htmlAudio) {
        htmlAudio.volume = isMuted ? 0 : Math.min(1, volume / 100);
        return;
      }
      if (audioCtx && masterGain) {
        masterGain.gain.setTargetAtTime(
          Math.max(0.0001, target),
          audioCtx.currentTime,
          0.08
        );
      }
    }

    function play() {
      if (isPlaying) return;

      if (CUSTOM_AUDIO_FILE) {
        if (!htmlAudio) {
          htmlAudio = new Audio(CUSTOM_AUDIO_FILE);
          htmlAudio.loop = true;
        }
        htmlAudio.volume = isMuted ? 0 : Math.min(1, volume / 100);
        htmlAudio
          .play()
          .then(function () {
            isPlaying = true;
            syncAudioUI();
          })
          .catch(function () {
            isPlaying = false;
            syncAudioUI();
          });
        return;
      }

      ensureWebAudio();
      if (!audioCtx) return;

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isPlaying = true;
      applyVolume();
      stepSequencer();
      schedulerTimer = window.setInterval(stepSequencer, 485);
      syncAudioUI();
    }

    function pause() {
      if (!isPlaying) return;
      isPlaying = false;

      if (CUSTOM_AUDIO_FILE && htmlAudio) {
        htmlAudio.pause();
        syncAudioUI();
        return;
      }

      if (schedulerTimer) {
        window.clearInterval(schedulerTimer);
        schedulerTimer = null;
      }
      if (audioCtx && masterGain) {
        masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.14);
      }
      syncAudioUI();
    }

    function toggle() {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    }

    function playCelebrationChord() {
      if (!isPlaying || CUSTOM_AUDIO_FILE || !audioCtx) return;
      // Gentle arpeggiated Fmaj9 shimmer chord on special reveals
      const shimmer = [65, 69, 72, 76, 79];
      shimmer.forEach(function (note, idx) {
        window.setTimeout(function () {
          if (isPlaying) {
            playFeltPianoNote(note, 2.2, 0.55);
          }
        }, idx * 75);
      });
    }

    function initControls() {
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
          toggle();
        });
      }

      if (volumePopoverBtn && volumePopover) {
        volumePopoverBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          const willOpen = volumePopover.hasAttribute('hidden');
          if (willOpen) {
            volumePopover.removeAttribute('hidden');
            volumePopoverBtn.setAttribute('aria-expanded', 'true');
          } else {
            volumePopover.setAttribute('hidden', '');
            volumePopoverBtn.setAttribute('aria-expanded', 'false');
          }
        });

        volumePopover.addEventListener('click', function (e) {
          e.stopPropagation();
        });

        document.addEventListener('click', function () {
          if (!volumePopover.hasAttribute('hidden')) {
            volumePopover.setAttribute('hidden', '');
            volumePopoverBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (volumeSlider) {
        volumeSlider.addEventListener('input', function () {
          volume = Number(volumeSlider.value);
          if (volume > 0 && isMuted) {
            isMuted = false;
          }
          storage.set(STORAGE_KEYS.VOLUME, volume);
          applyVolume();
          syncAudioUI();
        });
      }

      if (muteToggleBtn) {
        muteToggleBtn.addEventListener('click', function () {
          if (isMuted || volume === 0) {
            isMuted = false;
            if (volume === 0) {
              volume = 65;
              storage.set(STORAGE_KEYS.VOLUME, volume);
            }
          } else {
            isMuted = true;
          }
          applyVolume();
          syncAudioUI();
        });
      }

      syncAudioUI();
    }

    initControls();

    return {
      play: play,
      pause: pause,
      toggle: toggle,
      chime: playCelebrationChord,
    };
  })();

  /* =========================================================================
     4. WELCOME SCREEN TRANSITION
     ========================================================================= */

  function initWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-world-btn');
    const revisitBtn = document.getElementById('revisit-welcome-btn');
    const mainWorld = document.getElementById('main-world');

    if (!welcomeScreen || !enterBtn) return;

    enterBtn.addEventListener('click', function (evt) {
      const rect = enterBtn.getBoundingClientRect();
      AmbientCanvas.burst(
        34,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      // Start gentle music on user interaction (respecting browser autoplay policy)
      RomanticAudio.play();

      welcomeScreen.classList.add('is-exiting');
      document.body.classList.remove('welcome-locked');

      window.setTimeout(function () {
        welcomeScreen.setAttribute('hidden', '');
        if (mainWorld) {
          mainWorld.focus({ preventScroll: true });
        }
      }, 760);

      evt.preventDefault();
    });

    if (revisitBtn) {
      revisitBtn.addEventListener('click', function () {
        welcomeScreen.removeAttribute('hidden');
        // Force reflow so transition plays smoothly
        void welcomeScreen.offsetWidth;
        welcomeScreen.classList.remove('is-exiting');
        document.body.classList.add('welcome-locked');
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    }
  }

  /* =========================================================================
     5. SECTION ONE — FOUR SPECIAL QUESTIONS
     ========================================================================= */

  function initQuestionnaire() {
    const progressWrap = document.getElementById('question-progress-bar-wrap');
    const stepCounterEl = document.getElementById('q-step-counter');
    const stepPercentEl = document.getElementById('q-step-percent');
    const progressBarEl = document.getElementById('q-progressbar');
    const progressFillEl = document.getElementById('q-progress-fill');
    const dotsContainer = document.getElementById('q-step-dots');

    const stageEl = document.getElementById('question-stage');
    const titleEl = document.getElementById('question-title');
    const optionsContainer = document.getElementById('question-options');
    const feedbackWrap = document.getElementById('question-feedback');
    const feedbackText = document.getElementById('question-feedback-text');
    const backBtn = document.getElementById('q-back-btn');
    const nextBtn = document.getElementById('q-next-btn');

    const completeEl = document.getElementById('question-complete');
    const recapContainer = document.getElementById('q-answers-recap');
    const restartBtn = document.getElementById('q-restart-btn');

    if (!stageEl || !titleEl || !optionsContainer) return;

    const savedState = storage.get(STORAGE_KEYS.QUESTIONS, {
      answers: [null, null, null, null],
      completed: false,
    });

    let answers = Array.isArray(savedState.answers)
      ? savedState.answers.slice(0, 4)
      : [null, null, null, null];
    while (answers.length < 4) answers.push(null);

    let isCompleted = Boolean(savedState.completed);
    let currentIndex = 0;

    function persistState() {
      storage.set(STORAGE_KEYS.QUESTIONS, {
        answers: answers,
        completed: isCompleted,
      });
    }

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.textContent = '';
      for (let i = 0; i < QUESTIONS_DATA.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'q-dot';
        if (answers[i] !== null) dot.classList.add('is-answered');
        if (i === currentIndex) dot.classList.add('is-current');
        dotsContainer.appendChild(dot);
      }
    }

    function renderQuestion(animate) {
      if (isCompleted) {
        showCompletionView(false);
        return;
      }

      if (progressWrap) progressWrap.removeAttribute('hidden');
      if (stageEl) stageEl.removeAttribute('hidden');
      if (completeEl) completeEl.setAttribute('hidden', '');

      const applyDOM = function () {
        const q = QUESTIONS_DATA[currentIndex];
        const stepNum = currentIndex + 1;
        const pct = Math.round((stepNum / QUESTIONS_DATA.length) * 100);

        if (stepCounterEl) {
          stepCounterEl.textContent =
            'Question 0' + stepNum + ' of 0' + QUESTIONS_DATA.length;
        }
        if (stepPercentEl) {
          stepPercentEl.textContent = pct + '%';
        }
        if (progressFillEl) {
          progressFillEl.style.width = pct + '%';
        }
        if (progressBarEl) {
          progressBarEl.setAttribute('aria-valuenow', String(stepNum));
        }

        titleEl.textContent = q.prompt;
        optionsContainer.textContent = '';

        const chosenIdx = answers[currentIndex];

        q.options.forEach(function (opt, optIdx) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'q-option-btn';
          btn.setAttribute('role', 'radio');

          const isSelected = chosenIdx === optIdx;
          btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
          if (isSelected) btn.classList.add('is-selected');

          const indicator = document.createElement('span');
          indicator.className = 'q-option-indicator';
          indicator.setAttribute('aria-hidden', 'true');
          indicator.textContent = '♥';

          const labelSpan = document.createElement('span');
          labelSpan.textContent = opt.text;

          btn.appendChild(indicator);
          btn.appendChild(labelSpan);

          btn.addEventListener('click', function () {
            answers[currentIndex] = optIdx;
            persistState();
            renderQuestion(false);
          });

          optionsContainer.appendChild(btn);
        });

        if (chosenIdx !== null && q.options[chosenIdx]) {
          feedbackText.textContent = q.options[chosenIdx].reply;
          feedbackWrap.removeAttribute('hidden');
        } else {
          feedbackWrap.setAttribute('hidden', '');
        }

        if (backBtn) {
          backBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
          nextBtn.disabled = chosenIdx === null;
          nextBtn.textContent =
            currentIndex === QUESTIONS_DATA.length - 1
              ? 'Complete ❤️'
              : 'Next Question';
        }

        renderDots();
      };

      if (animate && !prefersReducedMotion.matches) {
        stageEl.classList.add('is-switching');
        window.setTimeout(function () {
          applyDOM();
          stageEl.classList.remove('is-switching');
        }, 170);
      } else {
        applyDOM();
      }
    }

    function showCompletionView(celebrate) {
      if (progressWrap) progressWrap.setAttribute('hidden', '');
      if (stageEl) stageEl.setAttribute('hidden', '');
      if (completeEl) completeEl.removeAttribute('hidden');

      if (recapContainer) {
        recapContainer.textContent = '';
        QUESTIONS_DATA.forEach(function (q, idx) {
          const ansIdx = answers[idx];
          const chosen =
            ansIdx !== null && q.options[ansIdx]
              ? q.options[ansIdx].text
              : 'Selected with love ❤️';

          const row = document.createElement('div');
          row.className = 'recap-row';

          const qLine = document.createElement('p');
          qLine.className = 'recap-q';
          qLine.textContent = q.prompt;

          const aLine = document.createElement('p');
          aLine.className = 'recap-a';
          aLine.textContent = chosen;

          row.appendChild(qLine);
          row.appendChild(aLine);
          recapContainer.appendChild(row);
        });
      }

      if (celebrate) {
        const rect = completeEl.getBoundingClientRect();
        AmbientCanvas.burst(
          32,
          rect.left + rect.width / 2,
          Math.max(120, rect.top + 80)
        );
        RomanticAudio.chime();
      }
    }

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex -= 1;
          renderQuestion(true);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (answers[currentIndex] === null) return;
        if (currentIndex < QUESTIONS_DATA.length - 1) {
          currentIndex += 1;
          renderQuestion(true);
        } else {
          isCompleted = true;
          persistState();
          showCompletionView(true);
        }
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        isCompleted = false;
        currentIndex = 0;
        persistState();
        renderQuestion(true);
      });
    }

    renderQuestion(false);
  }

  /* =========================================================================
     6. SECTION TWO — OPEN WHEN… LETTERS & LUXURY STATIONERY MODAL
     ========================================================================= */

  function initLettersSection() {
    const grid = document.getElementById('envelopes-grid');
    const readStatusEl = document.getElementById('letters-read-status');

    const modalBackdrop = document.getElementById('letter-modal-backdrop');
    const modalIndexEl = document.getElementById('modal-letter-index');
    const modalTitleEl = document.getElementById('modal-letter-title');
    const modalOccasionEl = document.getElementById('modal-letter-occasion');
    const modalContentEl = document.getElementById('modal-letter-content');

    const closeXBtn = document.getElementById('close-letter-x-btn');
    const closeBottomBtn = document.getElementById('close-letter-btn');
    const prevBtn = document.getElementById('prev-letter-btn');
    const nextBtn = document.getElementById('next-letter-btn');

    if (!grid || !modalBackdrop) return;

    const readMap = storage.get(STORAGE_KEYS.LETTERS_READ, {});
    let activeLetterIdx = 0;
    let lastFocusedTrigger = null;

    function updateReadCountDisplay() {
      if (!readStatusEl) return;
      const openedCount = LETTERS_DATA.filter(function (l) {
        return Boolean(readMap[l.id]);
      }).length;
      readStatusEl.textContent =
        openedCount + ' of ' + LETTERS_DATA.length + ' letters opened';
    }

    function renderEnvelopes() {
      grid.textContent = '';

      LETTERS_DATA.forEach(function (letter, idx) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'envelope-card scroll-reveal is-visible';
        if (readMap[letter.id]) {
          card.classList.add('is-read');
        }
        card.setAttribute('aria-label', letter.title);

        // Envelope Visual Top Stage
        const visual = document.createElement('div');
        visual.className = 'envelope-visual';
        visual.setAttribute('aria-hidden', 'true');

        const paperPeek = document.createElement('div');
        paperPeek.className = 'envelope-paper-peek';
        const l1 = document.createElement('span');
        l1.className = 'peek-line';
        const l2 = document.createElement('span');
        l2.className = 'peek-line short';
        paperPeek.appendChild(l1);
        paperPeek.appendChild(l2);

        const pocket = document.createElement('div');
        pocket.className = 'envelope-pocket';

        const flap = document.createElement('div');
        flap.className = 'envelope-flap';

        const seal = document.createElement('div');
        seal.className = 'wax-seal';
        seal.textContent = 'R';

        visual.appendChild(paperPeek);
        visual.appendChild(pocket);
        visual.appendChild(flap);
        visual.appendChild(seal);

        // Envelope Copy Body
        const copy = document.createElement('div');
        copy.className = 'envelope-copy';

        const num = document.createElement('span');
        num.className = 'envelope-number';
        num.textContent = letter.indexLabel;

        const title = document.createElement('h3');
        title.className = 'envelope-title';
        title.textContent = letter.title;

        const preview = document.createElement('p');
        preview.className = 'envelope-preview';
        preview.textContent = letter.preview;

        const ctaLine = document.createElement('div');
        ctaLine.className = 'envelope-cta-line';

        const actionSpan = document.createElement('span');
        actionSpan.textContent = 'Unseal Letter →';

        const stateSpan = document.createElement('span');
        stateSpan.className = 'envelope-read-state';
        stateSpan.textContent = readMap[letter.id] ? 'Opened ♥' : 'Sealed';

        ctaLine.appendChild(actionSpan);
        ctaLine.appendChild(stateSpan);

        copy.appendChild(num);
        copy.appendChild(title);
        copy.appendChild(preview);
        copy.appendChild(ctaLine);

        card.appendChild(visual);
        card.appendChild(copy);

        card.addEventListener('click', function () {
          lastFocusedTrigger = card;
          card.classList.add('is-opening');
          const rect = card.getBoundingClientRect();
          AmbientCanvas.burst(
            16,
            rect.left + rect.width / 2,
            rect.top + 60
          );

          const delay = prefersReducedMotion.matches ? 0 : 280;
          window.setTimeout(function () {
            card.classList.remove('is-opening');
            openLetterModal(idx);
          }, delay);
        });

        grid.appendChild(card);
      });

      updateReadCountDisplay();
    }

    function populateModal(idx) {
      activeLetterIdx = idx;
      const letter = LETTERS_DATA[idx];
      if (!letter) return;

      readMap[letter.id] = true;
      storage.set(STORAGE_KEYS.LETTERS_READ, readMap);
      renderEnvelopes();

      modalIndexEl.textContent = letter.indexLabel;
      modalTitleEl.textContent = letter.title;
      modalOccasionEl.textContent = letter.occasion;

      modalContentEl.textContent = '';
      letter.paragraphs.forEach(function (para) {
        const p = document.createElement('p');
        if (para.type === 'greeting') {
          p.className = 'letter-greeting';
        } else if (para.type === 'highlight') {
          p.className = 'letter-closing-highlight';
        }
        p.textContent = para.text;
        modalContentEl.appendChild(p);
      });

      const sheet = modalBackdrop.querySelector('.letter-sheet');
      if (sheet) sheet.scrollTop = 0;
    }

    function openLetterModal(idx) {
      populateModal(idx);
      modalBackdrop.removeAttribute('hidden');
      document.body.classList.add('modal-open');
      if (closeXBtn) closeXBtn.focus();
    }

    function closeLetterModal() {
      modalBackdrop.setAttribute('hidden', '');
      document.body.classList.remove('modal-open');
      if (lastFocusedTrigger) {
        lastFocusedTrigger.focus();
      }
    }

    if (closeXBtn) closeXBtn.addEventListener('click', closeLetterModal);
    if (closeBottomBtn)
      closeBottomBtn.addEventListener('click', closeLetterModal);

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        const prevIdx =
          (activeLetterIdx - 1 + LETTERS_DATA.length) % LETTERS_DATA.length;
        populateModal(prevIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        const nextIdx = (activeLetterIdx + 1) % LETTERS_DATA.length;
        populateModal(nextIdx);
      });
    }

    modalBackdrop.addEventListener('click', function (evt) {
      if (evt.target === modalBackdrop) {
        closeLetterModal();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' && !modalBackdrop.hasAttribute('hidden')) {
        closeLetterModal();
      }
    });

    renderEnvelopes();
  }

  /* =========================================================================
     7. SECTION THREE — INTERACTIVE BUCKET LIST WITH LOCALSTORAGE
     ========================================================================= */

  function initBucketList() {
    const container = document.getElementById('bucket-categories-container');
    const ringFill = document.getElementById('bucket-ring-fill');
    const percentNum = document.getElementById('bucket-percent-num');
    const completedCountEl = document.getElementById('bucket-completed-count');
    const remainingCountEl = document.getElementById('bucket-remaining-count');
    const encouragementEl = document.getElementById('bucket-encouragement');

    const categoryTabsWrap = document.getElementById('bucket-category-tabs');
    const statusFilterBtns = document.querySelectorAll('.status-filter-btn');

    const resetBtn = document.getElementById('bucket-reset-btn');
    const resetModal = document.getElementById('reset-modal-backdrop');
    const cancelResetBtn = document.getElementById('cancel-reset-btn');
    const confirmResetBtn = document.getElementById('confirm-reset-btn');

    if (!container) return;

    let checkedIds = storage.get(STORAGE_KEYS.BUCKET, {});
    if (!checkedIds || typeof checkedIds !== 'object') {
      checkedIds = {};
    }

    let activeCategory = 'all';
    let activeStatus = 'all';

    const CIRCUMFERENCE = 2 * Math.PI * 42; // r = 42 => ~263.89

    function getEncouragementMessage(selectedCount, pct) {
      if (selectedCount === 0) {
        return 'Tap any dream below to select the moments you want with me.';
      }
      if (pct < 25) {
        return 'Such a lovely start, Riti — every one of these is a promise.';
      }
      if (pct < 60) {
        return 'Look at our story taking shape — I can’t wait for all of these with you.';
      }
      if (pct < 100) {
        return 'So many beautiful memories waiting for Ankit and Riti! ❤️';
      }
      return 'Every single dream selected — let’s live them all together, my Riti! ❤️';
    }

    function updateDashboard() {
      let selectedCount = 0;
      BUCKET_CATEGORIES.forEach(function (cat) {
        cat.items.forEach(function (item) {
          if (checkedIds[item.id]) selectedCount += 1;
        });
      });

      const remaining = TOTAL_BUCKET_ITEMS - selectedCount;
      const pct = Math.round((selectedCount / TOTAL_BUCKET_ITEMS) * 100);

      if (completedCountEl) completedCountEl.textContent = String(selectedCount);
      if (remainingCountEl) remainingCountEl.textContent = String(remaining);
      if (percentNum) percentNum.textContent = pct + '%';

      if (ringFill) {
        const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
        ringFill.style.strokeDashoffset = String(offset);
      }

      if (encouragementEl) {
        encouragementEl.textContent = getEncouragementMessage(
          selectedCount,
          pct
        );
      }

      if (resetBtn) {
        resetBtn.disabled = selectedCount === 0;
      }
    }

    function renderCategories() {
      container.textContent = '';
      container.classList.toggle('single-col', activeCategory !== 'all');

      let renderedAnyItem = false;

      BUCKET_CATEGORIES.forEach(function (cat) {
        if (activeCategory !== 'all' && cat.id !== activeCategory) {
          return;
        }

        const filteredItems = cat.items.filter(function (item) {
          const isChecked = Boolean(checkedIds[item.id]);
          if (activeStatus === 'selected') return isChecked;
          if (activeStatus === 'remaining') return !isChecked;
          return true;
        });

        if (filteredItems.length === 0) {
          return;
        }

        renderedAnyItem = true;

        const catCompletedCount = cat.items.filter(function (item) {
          return Boolean(checkedIds[item.id]);
        }).length;

        const card = document.createElement('div');
        card.className = 'bucket-category-card';

        const head = document.createElement('div');
        head.className = 'category-card-head';

        const titleGroup = document.createElement('div');
        titleGroup.className = 'category-title-group';

        const iconBox = document.createElement('div');
        iconBox.className = 'category-icon-box';
        iconBox.setAttribute('aria-hidden', 'true');
        // Static trusted SVG defined in BUCKET_CATEGORIES above
        iconBox.innerHTML = cat.svgIcon;

        const headingWrap = document.createElement('div');
        const codeSpan = document.createElement('span');
        codeSpan.className = 'category-code';
        codeSpan.textContent = cat.code;

        const nameHeading = document.createElement('h3');
        nameHeading.className = 'category-name';
        nameHeading.textContent = cat.title;

        headingWrap.appendChild(codeSpan);
        headingWrap.appendChild(nameHeading);

        titleGroup.appendChild(iconBox);
        titleGroup.appendChild(headingWrap);

        const countSpan = document.createElement('span');
        countSpan.className = 'category-count';
        countSpan.textContent = catCompletedCount + ' / ' + cat.items.length;

        head.appendChild(titleGroup);
        head.appendChild(countSpan);

        const list = document.createElement('ul');
        list.className = 'bucket-items-list';

        filteredItems.forEach(function (item) {
          const li = document.createElement('li');
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'bucket-item-btn';

          const isChecked = Boolean(checkedIds[item.id]);
          btn.setAttribute('aria-pressed', isChecked ? 'true' : 'false');
          if (isChecked) btn.classList.add('is-checked');

          const checkCircle = document.createElement('span');
          checkCircle.className = 'check-circle';
          checkCircle.setAttribute('aria-hidden', 'true');
          checkCircle.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

          const labelSpan = document.createElement('span');
          labelSpan.className = 'bucket-item-label';
          labelSpan.textContent = item.label;

          btn.appendChild(checkCircle);
          btn.appendChild(labelSpan);

          btn.addEventListener('click', function () {
            const nextState = !checkedIds[item.id];
            if (nextState) {
              checkedIds[item.id] = true;
              const rect = btn.getBoundingClientRect();
              AmbientCanvas.burst(8, rect.left + 26, rect.top + 24);
            } else {
              delete checkedIds[item.id];
            }
            storage.set(STORAGE_KEYS.BUCKET, checkedIds);
            updateDashboard();
            renderCategories();
          });

          li.appendChild(btn);
          list.appendChild(li);
        });

        card.appendChild(head);
        card.appendChild(list);
        container.appendChild(card);
      });

      if (!renderedAnyItem) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'bucket-empty-filter';
        emptyMsg.textContent =
          activeStatus === 'selected'
            ? 'No dreams selected in this category yet — tap “All” to start choosing together!'
            : 'Every dream in this category has been selected! ❤️';
        container.appendChild(emptyMsg);
      }
    }

    if (categoryTabsWrap) {
      const catButtons = categoryTabsWrap.querySelectorAll('.filter-tab');
      catButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeCategory = btn.getAttribute('data-category') || 'all';
          catButtons.forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderCategories();
        });
      });
    }

    statusFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeStatus = btn.getAttribute('data-status') || 'all';
        statusFilterBtns.forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderCategories();
      });
    });

    // Custom Accessible Reset Confirmation Modal
    function closeResetModal() {
      if (!resetModal) return;
      resetModal.setAttribute('hidden', '');
      document.body.classList.remove('modal-open');
    }

    if (resetBtn && resetModal) {
      resetBtn.addEventListener('click', function () {
        resetModal.removeAttribute('hidden');
        document.body.classList.add('modal-open');
        if (cancelResetBtn) cancelResetBtn.focus();
      });

      if (cancelResetBtn) {
        cancelResetBtn.addEventListener('click', closeResetModal);
      }

      if (confirmResetBtn) {
        confirmResetBtn.addEventListener('click', function () {
          checkedIds = {};
          storage.set(STORAGE_KEYS.BUCKET, checkedIds);
          updateDashboard();
          renderCategories();
          closeResetModal();
        });
      }

      resetModal.addEventListener('click', function (evt) {
        if (evt.target === resetModal) {
          closeResetModal();
        }
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape' && !resetModal.hasAttribute('hidden')) {
          closeResetModal();
        }
      });
    }

    updateDashboard();
    renderCategories();
  }

  /* =========================================================================
     8. SECTION FOUR — THE FINAL SURPRISE GIFT BOX REVEAL
     ========================================================================= */

  function initFinalSurprise() {
    const lockedView = document.getElementById('surprise-locked-view');
    const giftBoxVisual = document.getElementById('gift-box-visual');
    const openBtn = document.getElementById('open-surprise-btn');
    const revealedView = document.getElementById('surprise-revealed-view');
    const replayBtn = document.getElementById('replay-surprise-btn');

    if (!lockedView || !openBtn || !revealedView || !giftBoxVisual) return;

    let isAnimating = false;

    function triggerSurpriseOpen() {
      if (isAnimating) return;
      isAnimating = true;

      giftBoxVisual.classList.add('is-opening');

      const rect = giftBoxVisual.getBoundingClientRect();
      AmbientCanvas.burst(
        46,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
      RomanticAudio.chime();

      const waitMs = prefersReducedMotion.matches ? 50 : 780;

      window.setTimeout(function () {
        lockedView.setAttribute('hidden', '');
        revealedView.removeAttribute('hidden');
        AmbientCanvas.burst(28, window.innerWidth * 0.5, window.innerHeight * 0.35);
        isAnimating = false;
      }, waitMs);
    }

    openBtn.addEventListener('click', triggerSurpriseOpen);

    giftBoxVisual.addEventListener('click', triggerSurpriseOpen);
    giftBoxVisual.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        triggerSurpriseOpen();
      }
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', function () {
        giftBoxVisual.classList.remove('is-opening');
        revealedView.setAttribute('hidden', '');
        lockedView.removeAttribute('hidden');
      });
    }
  }

  /* =========================================================================
     9. INTERSECTION OBSERVER — SCROLL REVEALS & ACTIVE NAV HIGHLIGHTING
     ========================================================================= */

  function initScrollObservers() {
    const revealEls = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }

    // Active Chapter Navigation Highlight
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    const sections = ['questions', 'letters', 'bucket-list', 'surprise']
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length && navLinks.length) {
      const navObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              navLinks.forEach(function (link) {
                link.classList.toggle(
                  'is-active',
                  link.getAttribute('data-nav') === activeId
                );
              });
            }
          });
        },
        { rootMargin: '-32% 0px -55% 0px', threshold: 0 }
      );

      sections.forEach(function (sec) {
        navObserver.observe(sec);
      });
    }
  }

  /* =========================================================================
     BOOT INITIALISATION
     ========================================================================= */

  function init() {
    initWelcomeScreen();
    initQuestionnaire();
    initLettersSection();
    initBucketList();
    initFinalSurprise();
    initScrollObservers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
