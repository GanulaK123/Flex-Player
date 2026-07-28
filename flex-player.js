// ==================== F4A FLEX PLAYER - CDN EDITION ====================
(function() {
    'use strict';

    if (window.F4AFlexLoaded) return;
    window.F4AFlexLoaded = true;

    console.log('[F4A] Loading player...');

    // ===== INJECT CSS =====
    var css = `
        .f4a-wrap{width:100%;position:relative;background:#000;border-radius:12px;overflow:hidden;aspect-ratio:16/9}
        .f4a-wrap video{width:100%!important;height:100%!important;display:block!important;object-fit:contain;background:#000}
        .f4a-glass{position:absolute;bottom:16px;left:16px;right:16px;z-index:20;background:rgba(10,10,10,.7);backdrop-filter:blur(24px);border-radius:12px;border:1px solid rgba(255,255,255,.04);padding:10px 16px;opacity:0;transform:translateY(12px);transition:all .35s ease;pointer-events:none}
        .f4a-glass.show{opacity:1;transform:translateY(0);pointer-events:auto}
        .f4a-progress{width:100%;cursor:pointer;padding:4px 0 8px}
        .f4a-track{width:100%;height:3px;background:rgba(255,255,255,.08);border-radius:2px;position:relative}
        .f4a-track:hover{height:5px}
        .f4a-fill{height:100%;background:linear-gradient(90deg,#e50914,#ff2d2d);border-radius:2px;width:0%;position:relative}
        .f4a-handle{position:absolute;top:50%;left:0%;transform:translate(-50%,-50%) scale(0);width:12px;height:12px;background:#e50914;border-radius:50%;border:2px solid #fff;transition:transform .2s ease}
        .f4a-track:hover .f4a-handle{transform:translate(-50%,-50%) scale(1)}
        .f4a-row{display:flex;align-items:center;justify-content:space-between;gap:4px}
        .f4a-left{display:flex;align-items:center;gap:4px;flex-wrap:wrap}
        .f4a-right{display:flex;align-items:center;gap:4px}
        .f4a-btn{background:none;border:none;color:rgba(255,255,255,.5);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;transition:all .2s ease;border-radius:6px;width:30px;height:30px}
        .f4a-btn:hover{color:#fff;background:rgba(255,255,255,.06);transform:scale(1.05)}
        .f4a-btn svg{width:16px;height:16px;display:block}
        .f4a-btn.active{color:#e50914}
        .f4a-time{font-size:10px;font-weight:500;color:rgba(255,255,255,.4);font-family:monospace;min-width:65px;text-align:center}
        .f4a-volwrap{display:flex;align-items:center;overflow:hidden;transition:all .3s ease;max-width:0;opacity:0}
        .f4a-volwrap.open{max-width:52px;opacity:1;margin-left:2px}
        .f4a-volslider{-webkit-appearance:none;appearance:none;width:44px;height:3px;border-radius:2px;background:rgba(255,255,255,.1);outline:none;cursor:pointer}
        .f4a-volslider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:10px;height:10px;border-radius:50%;background:#e50914;cursor:pointer;border:2px solid #fff}
        .f4a-pause{position:absolute;inset:0;z-index:7;display:none;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.2);backdrop-filter:blur(4px)}
        .f4a-pause.show{display:flex}
        .f4a-pause-glass{display:flex;align-items:center;gap:20px;background:rgba(10,10,10,.75);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:24px 32px}
        .f4a-pause-btn{width:64px;height:64px;border-radius:50%;background:rgba(229,9,14,.12);border:2px solid rgba(229,9,14,.3);display:flex;align-items:center;justify-content:center;cursor:pointer}
        .f4a-pause-btn:hover{transform:scale(1.08);background:rgba(229,9,14,.2);border-color:#e50914}
        .f4a-pause-nav{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.4)}
        .f4a-pause-nav:hover{background:rgba(255,255,255,.08);color:#fff}
        .f4a-watermark{position:absolute;bottom:80px;right:20px;z-index:6;font-size:10px;font-weight:800;letter-spacing:1.5px;color:rgba(255,255,255,.03);text-transform:uppercase;pointer-events:none}
        .f4a-pre{position:absolute;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.25);backdrop-filter:blur(8px);transition:opacity .5s ease}
        .f4a-pre.hide{opacity:0;pointer-events:none}
        .f4a-pre-glass{background:rgba(10,10,10,.75);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:32px 40px;max-width:420px;width:90%;text-align:center}
        .f4a-pre-title{font-size:22px;font-weight:800;color:#fff;margin-bottom:4px}
        .f4a-pre-meta{font-size:13px;font-weight:500;color:rgba(255,255,255,.4)}
        .f4a-play-btn{background:rgba(229,9,14,.15);border:2px solid rgba(229,9,14,.4);border-radius:50px;padding:12px 28px;display:inline-flex;align-items:center;gap:10px;cursor:pointer;transition:all .3s ease;color:#fff;font-weight:700;font-size:14px;margin-top:12px}
        .f4a-play-btn:hover{transform:scale(1.04);background:rgba(229,9,14,.25);border-color:#e50914}
        .f4a-load{position:absolute;inset:0;z-index:10;background:rgba(10,10,10,.92);backdrop-filter:blur(12px);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .6s ease;pointer-events:none}
        .f4a-load.hidden{opacity:0;pointer-events:none}
        .f4a-load.hide{display:none!important}
        .f4a-spinner{width:40px;height:40px;border:3px solid rgba(229,9,14,.1);border-top-color:#e50914;border-radius:50%;animation:f4a-spin .9s ease infinite}
        @keyframes f4a-spin{to{transform:rotate(360deg)}}
        .f4a-load-text{margin-top:12px;font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.1)}
        .f4a-glow{position:absolute;inset:-40px;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 50% 80%,rgba(229,9,14,.08),transparent 60%);filter:blur(60px)}
        @media(max-width:768px){.f4a-pre-glass{padding:24px 28px;max-width:340px}.f4a-pre-title{font-size:18px}.f4a-glass{padding:8px 12px 6px}.f4a-btn{width:26px;height:26px}.f4a-btn svg{width:14px;height:14px}.f4a-time{font-size:9px;min-width:55px}.f4a-pause-glass{padding:18px 24px;gap:14px}.f4a-pause-btn{width:54px;height:54px}.f4a-pause-nav{width:38px;height:38px}}
        @media(max-width:480px){.f4a-pre-glass{padding:18px 20px;max-width:280px}.f4a-pre-title{font-size:15px}.f4a-glass{padding:6px 8px 4px}.f4a-btn{width:22px;height:22px;padding:2px}.f4a-btn svg{width:12px;height:12px}.f4a-time{font-size:8px;min-width:48px}.f4a-pause-glass{padding:14px 16px;gap:10px}.f4a-pause-btn{width:46px;height:46px}.f4a-pause-nav{width:32px;height:32px}}
    `;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // ===== INJECT HTML =====
    var html = `
        <div class="f4a-wrap" id="f4a-wrap">
            <div class="f4a-load" id="f4a-load"><div class="f4a-spinner"></div><div class="f4a-load-text">Connecting...</div></div>
            <div class="f4a-pre" id="f4a-pre">
                <div class="f4a-pre-glass">
                    <div class="f4a-pre-title" id="f4a-title">F4A Flex Player</div>
                    <div class="f4a-pre-meta" id="f4a-meta">Ready to play</div>
                    <button class="f4a-play-btn" id="f4a-playbtn"><svg viewBox="0 0 24 24" width="48" height="48"><polygon points="5,3 19,12 5,21" fill="#fff"/></svg><span>Play Now</span></button>
                </div>
            </div>
            <video id="f4a-video" playsinline preload="metadata"></video>
            <div class="f4a-glow"></div>
            <div class="f4a-pause" id="f4a-pause">
                <div class="f4a-pause-glass">
                    <button class="f4a-pause-nav" id="f4a-prev"><svg viewBox="0 0 24 24" width="28" height="28"><polygon points="2,12 12,5 12,19" fill="white"/><polygon points="12,12 22,5 22,19" fill="white"/></svg></button>
                    <button class="f4a-pause-btn" id="f4a-pausebtn"><svg viewBox="0 0 24 24" width="48" height="48"><polygon points="5,3 19,12 5,21" fill="#fff"/></svg></button>
                    <button class="f4a-pause-nav" id="f4a-next"><svg viewBox="0 0 24 24" width="28" height="28"><polygon points="22,12 12,5 12,19" fill="white"/><polygon points="12,12 2,5 2,19" fill="white"/></svg></button>
                </div>
            </div>
            <div class="f4a-glass" id="f4a-glass">
                <div class="f4a-progress"><div class="f4a-track" id="f4a-track"><div class="f4a-fill" id="f4a-fill"></div><div class="f4a-handle" id="f4a-handle"></div></div></div>
                <div class="f4a-row">
                    <div class="f4a-left">
                        <button class="f4a-btn" id="f4a-pp"><svg viewBox="0 0 24 24" width="18" height="18"><polygon id="f4a-pi" points="5,3 19,12 5,21" fill="white"/><rect id="f4a-pi2" x="6" y="4" width="4" height="16" fill="white" style="display:none;"/><rect id="f4a-pi3" x="14" y="4" width="4" height="16" fill="white" style="display:none;"/></svg></button>
                        <button class="f4a-btn" id="f4a-back"><svg viewBox="0 0 24 24" width="16" height="16"><polygon points="2,12 12,5 12,19" fill="white"/><polygon points="12,12 22,5 22,19" fill="white"/></svg></button>
                        <button class="f4a-btn" id="f4a-fwd"><svg viewBox="0 0 24 24" width="16" height="16"><polygon points="22,12 12,5 12,19" fill="white"/><polygon points="12,12 2,5 2,19" fill="white"/></svg></button>
                        <button class="f4a-btn" id="f4a-loop"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 12C4 8 8 6 12 6C16 6 20 8 20 12" stroke="white" stroke-width="2" fill="none"/><path d="M8 15L4 12L8 9" stroke="white" stroke-width="2" fill="none"/><path d="M20 12C20 16 16 18 12 18C8 18 4 16 4 12" stroke="white" stroke-width="2" fill="none"/><path d="M16 9L20 12L16 15" stroke="white" stroke-width="2" fill="none"/></svg></button>
                        <button class="f4a-btn" id="f4a-cc"><svg viewBox="0 0 24 24" width="16" height="16"><rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="white" stroke-width="1.5"/><text x="6" y="15" font-size="10" fill="white" font-weight="bold">CC</text></svg></button>
                        <div style="display:flex;align-items:center;">
                            <button class="f4a-btn" id="f4a-vol"><svg viewBox="0 0 24 24" width="16" height="16"><polygon points="3,9 9,9 14,5 14,19 9,15 3,15" fill="white"/><path id="f4a-vh" d="M19 8 L21 10 L19 12 L21 14 L19 16" stroke="white" stroke-width="2" fill="none"/><path id="f4a-vl" d="M16 8 L18 10 L16 12" stroke="white" stroke-width="2" fill="none" style="display:none;"/><path id="f4a-vm" d="M19 8 L21 10 L19 12 L21 14 L19 16 M21 8 L19 10 L21 12 L19 14 L21 16" stroke="white" stroke-width="2" fill="none" style="display:none;"/></svg></button>
                            <div class="f4a-volwrap" id="f4a-volwrap"><input type="range" min="0" max="1" step="0.05" value="1" class="f4a-volslider" id="f4a-volslider"/></div>
                        </div>
                        <span class="f4a-time" id="f4a-time">00:00 / 00:00</span>
                    </div>
                    <div class="f4a-right">
                        <button class="f4a-btn" id="f4a-fs"><svg viewBox="0 0 24 24" width="16" height="16"><polygon points="3,3 8,3 8,5 5,5 5,8 3,8" fill="white"/><polygon points="21,3 16,3 16,5 19,5 19,8 21,8" fill="white"/><polygon points="3,21 8,21 8,19 5,19 5,16 3,16" fill="white"/><polygon points="21,21 16,21 16,19 19,19 19,16 21,16" fill="white"/></svg></button>
                    </div>
                </div>
            </div>
            <div class="f4a-watermark">F4A FLEX™</div>
        </div>
    `;

    // ===== INJECT INTO PAGE =====
    var container = document.createElement('div');
    container.innerHTML = html;
    var player = container.firstElementChild;

    var target = document.getElementById('f4a-player');
    if (target) {
        target.innerHTML = '';
        target.appendChild(player);
    } else {
        document.body.insertBefore(player, document.body.firstChild);
    }

    // ===== PLAYER ENGINE =====
    (function() {
        var v = document.getElementById('f4a-video');
        var load = document.getElementById('f4a-load');
        var pre = document.getElementById('f4a-pre');
        var preTitle = document.getElementById('f4a-title');
        var preMeta = document.getElementById('f4a-meta');
        var preBtn = document.getElementById('f4a-playbtn');
        var glass = document.getElementById('f4a-glass');
        var ppBtn = document.getElementById('f4a-pp');
        var back = document.getElementById('f4a-back');
        var fwd = document.getElementById('f4a-fwd');
        var loopBtn = document.getElementById('f4a-loop');
        var ccBtn = document.getElementById('f4a-cc');
        var fill = document.getElementById('f4a-fill');
        var handle = document.getElementById('f4a-handle');
        var track = document.getElementById('f4a-track');
        var timeD = document.getElementById('f4a-time');
        var volBtn = document.getElementById('f4a-vol');
        var volSlider = document.getElementById('f4a-volslider');
        var volWrap = document.getElementById('f4a-volwrap');
        var fsBtn = document.getElementById('f4a-fs');
        var pauseOverlay = document.getElementById('f4a-pause');
        var pauseBtn = document.getElementById('f4a-pausebtn');
        var prevBtn = document.getElementById('f4a-prev');
        var nextBtn = document.getElementById('f4a-next');

        var pIcon = document.getElementById('f4a-pi');
        var paIcon = document.getElementById('f4a-pi2');
        var paIcon2 = document.getElementById('f4a-pi3');
        var vHigh = document.getElementById('f4a-vh');
        var vLow = document.getElementById('f4a-vl');
        var vMute = document.getElementById('f4a-vm');

        var playing = false,
            vol = 1,
            dragging = false,
            loop = false,
            ccActive = false;

        function fmt(s) { if (!s || isNaN(s) || !isFinite(s)) return '00:00'; var m = Math.floor(s / 60),
                sec = Math.floor(s % 60); return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0'); }

        function updateTime() { timeD.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration); }

        function updateProg() { if (!dragging && v.duration) { var p = (v.currentTime / v.duration) * 100;
                fill.style.width = p + '%';
                handle.style.left = p + '%'; } updateTime(); }

        function updatePlayBtn() {
            if (v.paused) {
                pIcon.style.display = 'block';
                paIcon.style.display = 'none';
                paIcon2.style.display = 'none';
                pauseOverlay.classList.add('show');
                pauseOverlay.classList.remove('hidden');
            } else {
                pIcon.style.display = 'none';
                paIcon.style.display = 'block';
                paIcon2.style.display = 'block';
                pauseOverlay.classList.remove('show');
                pauseOverlay.classList.add('hidden');
            }
        }

        function updateVolIcon() {
            if (v.muted || vol === 0) { vHigh.style.display = 'none';
                vLow.style.display = 'none';
                vMute.style.display = 'block'; } else if (vol < 0.5) { vHigh.style.display = 'none';
                vLow.style.display = 'block';
                vMute.style.display = 'none'; } else { vHigh.style.display = 'block';
                vLow.style.display = 'none';
                vMute.style.display = 'none'; }
        }

        function togglePlay() { if (v.paused) { v.play(); } else { v.pause(); } }

        function showControls() { glass.classList.add('show');
            glass.classList.remove('hidden'); }

        function hideControls() { if (playing) glass.classList.remove('show'); }

        function skip(sec) { v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + sec));
            updateProg(); }

        function toggleLoop() { loop = !loop;
            loopBtn.classList.toggle('active', loop);
            v.loop = loop; }

        function toggleCC() { ccActive = !ccActive;
            ccBtn.classList.toggle('active', ccActive); }

        function toggleMute() { v.muted = !v.muted;
            updateVolIcon(); }

        function toggleFS() { var c = document.getElementById('f4a-wrap'); if (!document.fullscreenElement) { c.requestFullscreen().catch(function() {}); } else { document.exitFullscreen().catch(function() {}); } }

        function toggleVol() { volWrap.classList.toggle('open'); }

        function seek(e) {
            var rect = track.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            var c = Math.max(0, Math.min(1, x));
            if (v.duration) { v.currentTime = c * v.duration;
                fill.style.width = (c * 100) + '%';
                handle.style.left = (c * 100) + '%';
                updateTime(); }
        }

        function startDrag(e) {
            dragging = true;
            var rect = track.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            var c = Math.max(0, Math.min(1, x));
            if (v.duration) { v.currentTime = c * v.duration;
                fill.style.width = (c * 100) + '%';
                handle.style.left = (c * 100) + '%';
                updateTime(); }
        }

        function moveDrag(e) {
            if (!dragging) return;
            var rect = track.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            if (x < 0) x = 0;
            if (x > 1) x = 1;
            if (v.duration) { v.currentTime = x * v.duration;
                fill.style.width = (x * 100) + '%';
                handle.style.left = (x * 100) + '%';
                updateTime(); }
        }

        function endDrag() { dragging = false; }

        // ===== EVENTS =====
        v.addEventListener('loadedmetadata', function() {
            load.classList.add('hidden');
            setTimeout(function() { load.classList.add('hide'); }, 500);
            updateTime();
            preMeta.textContent = 'Video • ' + fmt(v.duration);
        });

        v.addEventListener('canplay', function() {
            load.classList.add('hidden');
            setTimeout(function() { load.classList.add('hide'); }, 500);
        });

        v.addEventListener('error', function() {
            load.classList.add('hidden');
            setTimeout(function() { load.classList.add('hide'); }, 500);
            var err = v.error ? v.error.code : 'unknown';
            console.error('[F4A] Video load failed. MediaError code:', err);
            preMeta.textContent = 'Failed to load video (see console)';
            pre.classList.remove('hide');
            pre.style.display = 'flex';
        });

        v.addEventListener('play', function() { playing = true;
            updatePlayBtn();
            showControls();
            setTimeout(hideControls, 3000); });
        v.addEventListener('pause', function() { playing = false;
            updatePlayBtn();
            showControls(); });
        v.addEventListener('timeupdate', updateProg);
        v.addEventListener('volumechange', function() { vol = v.volume;
            volSlider.value = vol;
            updateVolIcon(); });

        v.addEventListener('ended', function() {
            if (!loop) { v.pause();
                v.currentTime = 0;
                updatePlayBtn();
                updateProg(); }
        });

        // ===== CLICK TO PLAY/PAUSE =====
        v.addEventListener('click', function(e) {
            var rect = v.getBoundingClientRect();
            if ((e.clientX - rect.left) < rect.width / 2) { skip(-10); } else { togglePlay(); }
        });

        // ===== DOUBLE CLICK SKIP =====
        v.addEventListener('dblclick', function(e) {
            e.preventDefault();
            var rect = v.getBoundingClientRect();
            if ((e.clientX - rect.left) < rect.width / 2) { skip(-10); } else { skip(10); }
        });

        // ===== BUTTONS =====
        preBtn.addEventListener('click', function() { pre.classList.add('hide');
            setTimeout(function() { pre.style.display = 'none'; }, 500);
            v.play(); });
        ppBtn.addEventListener('click', togglePlay);
        pauseBtn.addEventListener('click', togglePlay);
        back.addEventListener('click', function() { skip(-10); });
        fwd.addEventListener('click', function() { skip(10); });
        loopBtn.addEventListener('click', toggleLoop);
        ccBtn.addEventListener('click', toggleCC);
        volBtn.addEventListener('click', toggleVol);
        volBtn.addEventListener('dblclick', toggleMute);
        volSlider.addEventListener('input', function(e) { vol = parseFloat(e.target.value);
            v.volume = vol;
            v.muted = false;
            updateVolIcon(); });
        fsBtn.addEventListener('click', toggleFS);

        // ===== PROGRESS BAR =====
        track.addEventListener('click', seek);
        track.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', moveDrag);
        document.addEventListener('mouseup', endDrag);

        // ===== TOUCH SUPPORT =====
        track.addEventListener('touchstart', function(e) {
            dragging = true;
            var t = e.touches[0];
            var rect = track.getBoundingClientRect();
            var x = (t.clientX - rect.left) / rect.width;
            if (x < 0) x = 0;
            if (x > 1) x = 1;
            if (v.duration) { v.currentTime = x * v.duration;
                fill.style.width = (x * 100) + '%';
                handle.style.left = (x * 100) + '%';
                updateTime(); }
        });
        track.addEventListener('touchmove', function(e) {
            if (!dragging) return;
            var t = e.touches[0];
            var rect = track.getBoundingClientRect();
            var x = (t.clientX - rect.left) / rect.width;
            if (x < 0) x = 0;
            if (x > 1) x = 1;
            if (v.duration) { v.currentTime = x * v.duration;
                fill.style.width = (x * 100) + '%';
                handle.style.left = (x * 100) + '%';
                updateTime(); }
        });
        track.addEventListener('touchend', function() { dragging = false; });

        // ===== KEYBOARD SHORTCUTS =====
        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.key === ' ' || e.key === 'k') { e.preventDefault();
                togglePlay(); }
            if (e.key === 'f') toggleFS();
            if (e.key === 'm') toggleMute();
            if (e.key === 'c') toggleCC();
            if (e.key === 'l') { toggleLoop(); }
            if (e.key === 'ArrowRight') skip(10);
            if (e.key === 'ArrowLeft') skip(-10);
        });

        // ===== MOUSE MOVE SHOW CONTROLS =====
        document.getElementById('f4a-wrap').addEventListener('mousemove', function() {
            showControls();
            clearTimeout(window.f4aTimer);
            window.f4aTimer = setTimeout(hideControls, 3000);
        });

        // ===== INIT =====
        v.volume = 1;
        volSlider.value = 1;
        updateVolIcon();
        updateTime();

        // ===== API =====
        window.F4A = {
            load: function(url, title) {
                preTitle.textContent = title || 'Video';
                preMeta.textContent = 'Click Play to start';
                v.src = url;
                v.load();
                pre.classList.add('hide');
                setTimeout(function() { pre.style.display = 'none'; }, 500);
                // v.play();  // REMOVED - User clicks Play
                return this;
            },
            play: function() { v.play(); return this; },
            pause: function() { v.pause(); return this; },
            toggle: function() { togglePlay(); return this; },
            seek: function(s) { v.currentTime = s; return this; },
            speed: function(s) { v.playbackRate = s; return this; },
            volume: function(l) { v.volume = Math.max(0, Math.min(1, l)); return this; },
            mute: function() { toggleMute(); return this; },
            loop: function() { toggleLoop(); return this; },
            fullscreen: function() { toggleFS(); return this; },
            skip: function(s) { skip(s); return this; },
            state: function() {
                return { playing: !v.paused, currentTime: v.currentTime, duration: v.duration, volume: v.volume, muted: v.muted,
                    loop: loop };
            }
        };

        console.log('[F4A] Player ready!');
        console.log('[F4A] Commands: F4A.load(url, title), F4A.play(), F4A.pause(), F4A.speed(1.5), F4A.volume(0.8), F4A.loop(), F4A.fullscreen(), F4A.skip(10), F4A.state()');

        // ===== AUTO-LOAD DEFAULT VIDEO =====
        if (window.F4A_VIDEO) {
            F4A.load(window.F4A_VIDEO, window.F4A_TITLE || 'Video');
        }
    })();

})();
