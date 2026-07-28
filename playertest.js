(function(){'use strict';

//==================== DOM ====================
var v=document.getElementById('mainVideo');
var load=document.getElementById('loadingOverlay');
var preOverlay=document.getElementById('prePlayOverlay');
var prePlayBtn=document.getElementById('prePlayBtn');
var preTitle=document.getElementById('preTitle');
var preMeta=document.getElementById('preMeta');
var preDetails=document.getElementById('preDetails');
var preEpisodes=document.getElementById('preEpisodes');
var pauseOverlay=document.getElementById('pauseOverlay');
var pausePlayBtn=document.getElementById('pausePlayBtn');
var prevEpBtn=document.getElementById('prevEpisodeBtn');
var nextEpBtn=document.getElementById('nextEpisodeBtn');
var controls=document.getElementById('controls');
var ppBtn=document.getElementById('playPauseBtn');
var back=document.getElementById('backBtn');
var next=document.getElementById('nextBtn');
var loopBtn=document.getElementById('loopBtn');
var cc=document.getElementById('ccBtn');
var progFill=document.getElementById('progressFill');
var progHandle=document.getElementById('progressHandle');
var timeDisp=document.getElementById('timeDisplay');
var volBtn=document.getElementById('volumeBtn');
var volSlider=document.getElementById('volumeSlider');
var volWrap=document.querySelector('.volume-wrapper');
var fsBtn=document.getElementById('fullscreenBtn');
var setBtn=document.getElementById('settingsBtn');
var setDrop=document.getElementById('settingsDropdown');
var setClose=document.getElementById('closeSettings');
var subOver=document.getElementById('subtitleOverlay');
var subText=document.getElementById('subtitleText');
var nextPopup=document.getElementById('nextVideoPopup');
var nextProg=document.getElementById('nextVideoProgress');
var nextTitle=document.getElementById('nextVideoTitle');
var skipNext=document.getElementById('skipNextBtn');
var serverStatus=document.getElementById('serverStatus');
var subUpload=document.getElementById('subUploadInput');

var pIcon=document.getElementById('playIcon');
var paIcon=document.getElementById('pauseIcon');
var paIcon2=document.getElementById('pauseIcon2');
var vHigh=document.getElementById('volumeHigh');
var vLow=document.getElementById('volumeLow');
var vMute=document.getElementById('volumeMute');

//==================== STATE ====================
var playing=false,vol=1,timer=null,hidetimeout=null,dragging=false,ccActive=false,setOpen=false;
var loop=false,nextPopupTimer=null,nextPopupActive=false;
var currentServer='auto';
var videoQueue=[];
var hasNextVideo=false;
var videoData={};
var customSubs=[];
var currentSubLang='off';

console.log('[F4A Flex] Player initializing...');

//==================== FORMAT DURATION ====================
function formatDuration(seconds){
    if(!seconds) return '00:00';
    var m=Math.floor(seconds/60);
    var s=Math.floor(seconds%60);
    return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}

//==================== PARSE SUBTITLES ====================
function parseSubtitleFile(content,filename){
    var cues=[];
    if(filename.endsWith('.vtt')){
        var lines=content.split('\n');
        var i=0;
        while(i<lines.length){
            if(lines[i].includes('-->')){
                var timeMatch=lines[i].match(/(\d{2}:\d{2}:\d{2}\.\d{3}|\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3}|\d{2}:\d{2}\.\d{3})/);
                if(timeMatch){
                    var start=timeToSeconds(timeMatch[1]);
                    var end=timeToSeconds(timeMatch[2]);
                    var text='';
                    i++;
                    while(i<lines.length && lines[i].trim()!==''){
                        text+=lines[i]+'\n';
                        i++;
                    }
                    cues.push({start:start,end:end,text:text.trim()});
                }
            }
            i++;
        }
    }else{
        var blocks=content.split('\n\n');
        blocks.forEach(function(block){
            var lines=block.split('\n');
            if(lines.length>=3){
                var timeLine=lines[1];
                var timeMatch=timeLine.match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/);
                if(timeMatch){
                    var start=timeToSeconds(timeMatch[1].replace(',','.'));
                    var end=timeToSeconds(timeMatch[2].replace(',','.'));
                    var text=lines.slice(2).join('\n').trim();
                    cues.push({start:start,end:end,text:text});
                }
            }
        });
    }
    return cues;
}

function timeToSeconds(timeStr){
    var parts=timeStr.split(':');
    var sec=0;
    if(parts.length===3){
        sec=parseInt(parts[0])*3600+parseInt(parts[1])*60+parseFloat(parts[2]);
    }else if(parts.length===2){
        sec=parseInt(parts[0])*60+parseFloat(parts[1]);
    }
    return sec||0;
}

//==================== LOADING ====================
function hideLoad(){
    load.classList.add('hidden');
    setTimeout(function(){load.classList.add('hide');},500);
}

//==================== CONTROLS SHOW/HIDE ====================
function showControls(){
    controls.classList.add('show');
    controls.classList.remove('hidden');
    clearTimeout(hidetimeout);
}

function hideControlsAfterDelay(){
    clearTimeout(hidetimeout);
    if(playing && !setOpen){
        hidetimeout=setTimeout(function(){
            controls.classList.remove('show');
        },3000);
    }
}

function forceHideControls(){
    if(playing && !setOpen){
        controls.classList.remove('show');
    }
}

document.getElementById('playerContainer').addEventListener('mousemove',function(){
    showControls();
    hideControlsAfterDelay();
});
document.getElementById('playerContainer').addEventListener('mouseleave',function(){
    forceHideControls();
});

//==================== PLAY/PAUSE ====================
function togglePlay(){
    if(v.paused){v.play();}else{v.pause();}
}

function updatePlayBtn(){
    if(v.paused){
        pIcon.style.display='block';paIcon.style.display='none';paIcon2.style.display='none';
        pauseOverlay.classList.add('show');pauseOverlay.classList.remove('hidden');
    }else{
        pIcon.style.display='none';paIcon.style.display='block';paIcon2.style.display='block';
        pauseOverlay.classList.remove('show');pauseOverlay.classList.add('hidden');
    }
}

//==================== START PLAYING ====================
function startPlaying(){
    preOverlay.classList.add('hide');
    setTimeout(function(){preOverlay.style.display='none';},500);
    v.play();
}

//==================== PROGRESS ====================
function updateProg(){
    if(!dragging&&v.duration){
        var p=(v.currentTime/v.duration)*100;
        progFill.style.width=p+'%';progHandle.style.left=p+'%';
        checkNextVideo();
        updateSubtitles();
    }
    updateTime();
}

function updateTime(){
    var c=fmt(v.currentTime),d=fmt(v.duration);
    timeDisp.textContent=c+' / '+d;
}

function fmt(s){if(!s||isNaN(s)||!isFinite(s))return'00:00';var m=Math.floor(s/60),sec=Math.floor(s%60);return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');}

//==================== SUBTITLES ====================
function updateSubtitles(){
    if(!ccActive || customSubs.length===0){
        if(!ccActive) subOver.classList.add('hidden');
        return;
    }
    var t=v.currentTime;
    var found=false;
    for(var i=0;i<customSubs.length;i++){
        var c=customSubs[i];
        if(t>=c.start && t<c.end){
            subText.textContent=c.text;
            subOver.classList.remove('hidden');
            found=true;
            break;
        }
    }
    if(!found) subOver.classList.add('hidden');
}

//==================== SMART SKIP ====================
function getSkipAmount(){
    var dur=v.duration;
    if(!dur||dur<10)return 1;
    if(dur<60)return 3;
    if(dur<300)return 5;
    return 10;
}

function skipBack(){
    var skip=getSkipAmount();
    v.currentTime=Math.max(0,v.currentTime-skip);
    updateProg();
}

function skipFwd(){
    var skip=getSkipAmount();
    v.currentTime=Math.min(v.duration,v.currentTime+skip);
    updateProg();
}

//==================== NEXT VIDEO ====================
function checkNextVideo(){
    if(!hasNextVideo || videoQueue.length===0) return;
    if(!v.duration || v.currentTime < v.duration - 3) {
        if(nextPopupActive){hideNextPopup();}
        return;
    }
    if(!nextPopupActive && v.currentTime >= v.duration - 3 && !v.paused){
        showNextPopup();
    }
}

function showNextPopup(){
    nextPopupActive=true;
    nextPopup.classList.remove('hidden');
    setTimeout(function(){nextPopup.classList.add('show');},50);
    nextProg.style.width='0%';
    var startTime=Date.now();
    var duration=3000;
    if(nextPopupTimer)clearInterval(nextPopupTimer);
    nextPopupTimer=setInterval(function(){
        var elapsed=Date.now()-startTime;
        var p=Math.min(100,(elapsed/duration)*100);
        nextProg.style.width=p+'%';
        if(p>=100){
            clearInterval(nextPopupTimer);
            nextPopupTimer=null;
            playNextVideo();
        }
    },30);
}

function hideNextPopup(){
    nextPopupActive=false;
    nextPopup.classList.remove('show');
    setTimeout(function(){nextPopup.classList.add('hidden');},400);
    if(nextPopupTimer){clearInterval(nextPopupTimer);nextPopupTimer=null;}
}

function playNextVideo(){
    hideNextPopup();
    if(videoQueue.length>0){
        var nextData=videoQueue.shift();
        if(nextData.title) preTitle.textContent=nextData.title;
        if(nextData.duration) {
            preMeta.textContent=(nextData.type||'Video')+' • '+formatDuration(nextData.duration);
        }
        if(nextData.season && nextData.episode) {
            preEpisodes.style.display='block';
            preEpisodes.innerHTML='<span class="pre-last">📺 Season '+nextData.season+' • Ep '+nextData.episode+'</span>';
        } else {
            preEpisodes.style.display='none';
        }
        if(nextData.src) v.src=nextData.src;
        if(nextData.poster) v.poster=nextData.poster;
        videoData=nextData;
        v.load();
        v.play();
        hasNextVideo=videoQueue.length>0;
        if(hasNextVideo){
            nextTitle.textContent=videoQueue[0].title||'Next Video';
        }else{
            nextPopup.classList.add('hidden');
        }
    }
}

//==================== LOOP ====================
function toggleLoop(){
    loop=!loop;
    loopBtn.classList.toggle('active',loop);
    v.loop=loop;
}

//==================== VOLUME ====================
function updateVolIcon(){
    if(v.muted||vol===0){vHigh.style.display='none';vLow.style.display='none';vMute.style.display='block';}
    else if(vol<0.5){vHigh.style.display='none';vLow.style.display='block';vMute.style.display='none';}
    else{vHigh.style.display='block';vLow.style.display='none';vMute.style.display='none';}
}

function toggleMute(){v.muted=!v.muted;updateVolIcon();}
function toggleVol(){volWrap.classList.toggle('open');}

//==================== TOGGLE CC ====================
function toggleCC(){
    ccActive=!ccActive;
    cc.classList.toggle('active',ccActive);
    if(ccActive){
        subOver.classList.remove('hidden');
        if(customSubs && customSubs.length>0){
            subText.textContent='[CC] Custom subtitles loaded';
        }else{
            subText.textContent='[CC] Subtitles enabled';
        }
    }else{
        subOver.classList.add('hidden');
    }
}

//==================== FULLSCREEN ====================
function toggleFS(){
    var c=document.querySelector('.player-container');
    if(!document.fullscreenElement){c.requestFullscreen().catch(function(){});}
    else{document.exitFullscreen().catch(function(){});}
}

//==================== SETTINGS ====================
function toggleSettings(){
    setOpen=!setOpen;
    if(setOpen){setDrop.classList.remove('hidden');setDrop.classList.add('open');showControls();clearTimeout(hidetimeout);}
    else{setDrop.classList.add('hidden');setDrop.classList.remove('open');hideControlsAfterDelay();}
}

function switchTab(id){
    document.querySelectorAll('.settings-tab').forEach(function(t){t.classList.remove('active');});
    document.querySelectorAll('.settings-content').forEach(function(c){c.classList.add('hidden');});
    document.querySelector('.settings-tab[data-tab="'+id+'"]').classList.add('active');
    document.getElementById('tab-'+id).classList.remove('hidden');
}

//==================== SWITCH SERVER ====================
function switchServer(name){
    currentServer=name;
    serverStatus.textContent='🔄 Connecting to '+name+'...';
    serverStatus.style.color='#fbbf24';
    setTimeout(function(){
        serverStatus.textContent='🟢 Connected to '+name;
        serverStatus.style.color='#4ade80';
    },500);
    document.querySelectorAll('#serverOptions .settings-option').forEach(function(b){
        b.classList.toggle('active',b.dataset.value===name);
    });
}

//==================== SEEK ====================
function seek(e){
    var rect=e.currentTarget.getBoundingClientRect();
    var x=(e.clientX-rect.left)/rect.width;
    var c=Math.max(0,Math.min(1,x));
    if(v.duration){v.currentTime=c*v.duration;progFill.style.width=(c*100)+'%';progHandle.style.left=(c*100)+'%';updateTime();}
}

//==================== DRAG ====================
function startDrag(e){dragging=true;var rect=document.querySelector('.progress-track').getBoundingClientRect();var x=(e.clientX-rect.left)/rect.width;var c=Math.max(0,Math.min(1,x));if(v.duration){v.currentTime=c*v.duration;progFill.style.width=(c*100)+'%';progHandle.style.left=(c*100)+'%';updateTime();}}
function moveDrag(e){if(!dragging)return;var rect=document.querySelector('.progress-track').getBoundingClientRect();var x=(e.clientX-rect.left)/rect.width;if(x<0)x=0;if(x>1)x=1;if(v.duration){v.currentTime=x*v.duration;progFill.style.width=(x*100)+'%';progHandle.style.left=(x*100)+'%';updateTime();}}
function endDrag(){dragging=false;}

//==================== VIDEO CLICK ====================
v.addEventListener('click',function(e){
    var rect=v.getBoundingClientRect();
    var x=e.clientX-rect.left;
    var width=rect.width;
    if(x < width/2){skipBack();}else{togglePlay();}
});

//==================== DOUBLE CLICK ====================
v.addEventListener('dblclick',function(e){
    e.preventDefault();
    var rect=v.getBoundingClientRect();
    var x=e.clientX-rect.left;
    var width=rect.width;
    if(x < width/2){skipBack();}else{skipFwd();}
});

//==================== TOUCH SUPPORT ====================
var touchStartX=0,touchStartY=0;
v.addEventListener('touchstart',function(e){
    var t=e.touches[0];
    touchStartX=t.clientX;
    touchStartY=t.clientY;
},{passive:true});

v.addEventListener('touchend',function(e){
    var rect=v.getBoundingClientRect();
    var touchEndX=e.changedTouches[0].clientX;
    var touchEndY=e.changedTouches[0].clientY;
    var dx=touchEndX-touchStartX;
    var dy=touchEndY-touchStartY;
    if(Math.abs(dx)<20 && Math.abs(dy)<20){
        var x=touchEndX-rect.left;
        var width=rect.width;
        if(x < width/2){skipBack();}else{togglePlay();}
    }
},{passive:true});

//==================== EVENTS ====================
v.addEventListener('loadedmetadata',function(){
    hideLoad();
    updateTime();
    var dur=formatDuration(v.duration);
    if(videoData.type){
        preMeta.textContent=videoData.type+' • '+dur;
    }else{
        preMeta.textContent='Video • '+dur;
    }
});
v.addEventListener('canplay',function(){hideLoad();});
v.addEventListener('play',function(){
    playing=true;updatePlayBtn();showControls();hideControlsAfterDelay();
    if(nextPopupTimer){clearInterval(nextPopupTimer);nextPopupTimer=null;hideNextPopup();}
});
v.addEventListener('pause',function(){playing=false;updatePlayBtn();showControls();});
v.addEventListener('timeupdate',updateProg);
v.addEventListener('volumechange',function(){vol=v.volume;volSlider.value=vol;updateVolIcon();});
v.addEventListener('ended',function(){
    if(!loop && hasNextVideo && videoQueue.length>0){
        playNextVideo();
    }else if(!loop){
        v.pause();
        v.currentTime=0;
        updatePlayBtn();
        updateProg();
    }
});

//==================== PLAY BUTTONS ====================
prePlayBtn.addEventListener('click',startPlaying);
preOverlay.addEventListener('click',startPlaying);
pausePlayBtn.addEventListener('click',togglePlay);

//==================== EPISODE NAV ====================
prevEpBtn.addEventListener('click',function(){
    if(window.parent && window.parent.postMessage){
        window.parent.postMessage({type:'flexPlayer',event:'previous'},'*');
    }
});

nextEpBtn.addEventListener('click',function(){
    if(hasNextVideo && videoQueue.length>0){
        playNextVideo();
    }else{
        if(window.parent && window.parent.postMessage){
            window.parent.postMessage({type:'flexPlayer',event:'next'},'*');
        }
    }
});

//==================== CONTROLS ====================
ppBtn.addEventListener('click',togglePlay);
back.addEventListener('click',skipBack);
next.addEventListener('click',skipFwd);
loopBtn.addEventListener('click',toggleLoop);
cc.addEventListener('click',toggleCC);
skipNext.addEventListener('click',function(){hideNextPopup();playNextVideo();});

//==================== SUBTITLE UPLOAD ====================
subUpload.addEventListener('change',function(e){
    if(e.target.files.length>0){
        window.FlexPlayer.uploadSubtitles(e.target.files[0]);
    }
});

//==================== PROGRESS ====================
document.querySelector('.progress-track').addEventListener('click',seek);
document.querySelector('.progress-track').addEventListener('mousedown',startDrag);
document.addEventListener('mousemove',moveDrag);
document.addEventListener('mouseup',endDrag);

// Touch progress
document.querySelector('.progress-track').addEventListener('touchstart',function(e){
    dragging=true;var t=e.touches[0];var rect=document.querySelector('.progress-track').getBoundingClientRect();var x=(t.clientX-rect.left)/rect.width;if(x<0)x=0;if(x>1)x=1;if(v.duration){v.currentTime=x*v.duration;progFill.style.width=(x*100)+'%';progHandle.style.left=(x*100)+'%';updateTime();}
});
document.querySelector('.progress-track').addEventListener('touchmove',function(e){
    if(!dragging)return;var t=e.touches[0];var rect=document.querySelector('.progress-track').getBoundingClientRect();var x=(t.clientX-rect.left)/rect.width;if(x<0)x=0;if(x>1)x=1;if(v.duration){v.currentTime=x*v.duration;progFill.style.width=(x*100)+'%';progHandle.style.left=(x*100)+'%';updateTime();}
});
document.querySelector('.progress-track').addEventListener('touchend',function(){dragging=false;});

//==================== VOLUME ====================
volBtn.addEventListener('click',toggleVol);
volBtn.addEventListener('dblclick',toggleMute);
volSlider.addEventListener('input',function(e){vol=parseFloat(e.target.value);v.volume=vol;v.muted=false;updateVolIcon();});

//==================== FULLSCREEN ====================
fsBtn.addEventListener('click',toggleFS);

//==================== SETTINGS ====================
setBtn.addEventListener('click',function(e){e.stopPropagation();toggleSettings();});
setClose.addEventListener('click',toggleSettings);
document.addEventListener('click',function(e){if(setOpen&&!setDrop.contains(e.target)&&e.target!==setBtn){toggleSettings();}});

//==================== TABS ====================
document.querySelectorAll('.settings-tab').forEach(function(tab){tab.addEventListener('click',function(){switchTab(tab.dataset.tab);});});

//==================== SPEED ====================
document.querySelectorAll('#speedOptions .settings-option').forEach(function(b){
    b.addEventListener('click',function(){
        document.querySelectorAll('#speedOptions .settings-option').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        v.playbackRate=parseFloat(b.dataset.value);
    });
});

//==================== SUBTITLE OPTIONS ====================
document.querySelectorAll('#subtitleOptions .settings-option').forEach(function(b){
    b.addEventListener('click',function(){
        document.querySelectorAll('#subtitleOptions .settings-option').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        var lang=b.dataset.value;
        currentSubLang=lang;
        if(lang==='off'){ccActive=false;cc.classList.remove('active');subOver.classList.add('hidden');}
        else if(lang==='si'){
            ccActive=true;cc.classList.add('active');
            subOver.classList.remove('hidden');
            subText.textContent='[CC] සිංහල උපසිරැසි (Sinhala)';
        }else{
            ccActive=true;cc.classList.add('active');
            subOver.classList.remove('hidden');
            subText.textContent='[CC] English subtitles';
        }
    });
});

//==================== SUBTITLE SIZE ====================
document.querySelectorAll('#subSizeOptions .settings-option').forEach(function(b){
    b.addEventListener('click',function(){
        document.querySelectorAll('#subSizeOptions .settings-option').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        var size=b.dataset.value;
        var bg=document.querySelector('#subBgOptions .settings-option.active');
        var bgVal=bg?bg.dataset.value:'dark';
        subText.className='subtitle-text '+size+' bg-'+bgVal;
    });
});

//==================== SUBTITLE COLOR ====================
document.querySelectorAll('#subColorOptions .settings-option').forEach(function(b){
    b.addEventListener('click',function(){
        document.querySelectorAll('#subColorOptions .settings-option').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        subText.style.color=b.dataset.value;
    });
});

//==================== SUBTITLE BACKGROUND ====================
document.querySelectorAll('#subBgOptions .settings-option').forEach(function(b){
    b.addEventListener('click',function(){
        document.querySelectorAll('#subBgOptions .settings-option').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        var size=document.querySelector('#subSizeOptions .settings-option.active');
        var sizeVal=size?size.dataset.value:'medium';
        subText.className='subtitle-text '+sizeVal+' bg-'+b.dataset.value;
    });
});

//==================== SERVER OPTIONS ====================
document.querySelectorAll('#serverOptions .settings-option').forEach(function(b){
    b.addEventListener('click',function(){
        switchServer(b.dataset.value);
    });
});

//==================== KEYBOARD ====================
document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT')return;
    if(e.key===' '||e.key==='k'){e.preventDefault();togglePlay();}
    if(e.key==='f')toggleFS();
    if(e.key==='m')toggleMute();
    if(e.key==='c')toggleCC();
    if(e.key==='l'){toggleLoop();}
    if(e.key==='ArrowRight')skipFwd();
    if(e.key==='ArrowLeft')skipBack();
    if(e.key==='Escape'&&setOpen)toggleSettings();
});

//==================== POST MESSAGE LISTENER ====================
window.addEventListener('message',function(e){
    if(e.data && e.data.type==='flexPlayer'){
        var action=e.data.action;
        var data=e.data.data||{};
        if(window.FlexPlayer[action]){
            window.FlexPlayer[action](data);
        }
    }
});

//==================== FLEX PLAYER API ====================
window.FlexPlayer = {
    version: '1.0.0',
    
    // ===== CORE =====
    load: function(data){
        if(data.title) preTitle.textContent=data.title;
        if(data.type) preMeta.textContent=data.type+' • '+formatDuration(data.duration||0);
        if(data.duration) {
            var dur=formatDuration(data.duration);
            preMeta.textContent=(data.type||'Video')+' • '+dur;
        }
        if(data.year) preDetails.innerHTML='<span>📅 '+data.year+'</span>';
        if(data.season && data.episode) {
            preEpisodes.style.display='block';
            preEpisodes.innerHTML='<span class="pre-last">📺 Season '+data.season+' • Ep '+data.episode+' of '+(data.totalEpisodes||'?')+'</span>';
        } else {
            preEpisodes.style.display='none';
        }
        if(data.src) v.src=data.src;
        if(data.poster) v.poster=data.poster;
        videoData=data;
        v.load();
        return this;
    },
    
    queue: function(data){
        videoQueue.push(data);
        hasNextVideo=true;
        nextTitle.textContent=data.title||'Next Video';
        return this;
    },
    
    clearQueue: function(){
        videoQueue=[];
        hasNextVideo=false;
        nextPopup.classList.add('hidden');
        return this;
    },
    
    getQueue: function(){
        return videoQueue;
    },
    
    skipToNext: function(){
        if(videoQueue.length>0){
            playNextVideo();
        }else{
            if(window.parent && window.parent.postMessage){
                window.parent.postMessage({type:'flexPlayer',event:'noMoreVideos'},'*');
            }
        }
        return this;
    },
    
    play: function(){ v.play(); return this; },
    pause: function(){ v.pause(); return this; },
    togglePlay: function(){ if(v.paused){v.play();}else{v.pause();} return this; },
    
    seek: function(time){ v.currentTime=time; return this; },
    
    setVolume: function(vol){ v.volume=Math.max(0,Math.min(1,vol)); return this; },
    toggleMute: function(){ v.muted=!v.muted; updateVolIcon(); return this; },
    
    setLoop: function(val){ loop=val; v.loop=val; loopBtn.classList.toggle('active',val); return this; },
    toggleLoop: function(){ loop=!loop; loopBtn.classList.toggle('active',loop); v.loop=loop; return this; },
    
    setSpeed: function(speed){ v.playbackRate=speed; return this; },
    
    toggleFullscreen: function(){ toggleFS(); return this; },
    
    skipForward: function(){ skipFwd(); return this; },
    skipBackward: function(){ skipBack(); return this; },
    
    // ===== PRE-PLAY CUSTOMIZATION =====
    setPrePlayTitle: function(text){
        preTitle.textContent=text;
        return this;
    },
    setPrePlayMeta: function(text){
        preMeta.textContent=text;
        return this;
    },
    setPrePlayDetails: function(text){
        preDetails.innerHTML=text;
        return this;
    },
    setPrePlayEpisodes: function(text){
        preEpisodes.style.display='block';
        preEpisodes.innerHTML=text;
        return this;
    },
    setPrePlayLast: function(text){
        document.querySelector('.pre-last').textContent=text;
        return this;
    },
    setPrePlayNext: function(text){
        document.querySelector('.pre-next').textContent=text;
        return this;
    },
    
    // ===== SUBTITLES =====
    setSubtitles: function(subs){
        customSubs=subs||[];
        if(ccActive && customSubs.length>0){
            subText.textContent='[CC] Custom subtitles loaded';
            subOver.classList.remove('hidden');
        }
        return this;
    },
    
    toggleSubtitles: function(){
        ccActive=!ccActive;
        cc.classList.toggle('active',ccActive);
        if(ccActive){
            subOver.classList.remove('hidden');
            if(customSubs && customSubs.length>0){
                subText.textContent='[CC] Custom subtitles loaded';
            }else{
                subText.textContent='[CC] Subtitles enabled';
            }
        }else{
            subOver.classList.add('hidden');
        }
        return this;
    },
    
    uploadSubtitles: function(file){
        if(!file) return this;
        var reader=new FileReader();
        var self=this;
        reader.onload=function(e){
            var content=e.target.result;
            var parsed=parseSubtitleFile(content,file.name);
            if(parsed.length>0){
                customSubs=parsed;
                if(ccActive){
                    subText.textContent='[CC] Uploaded: '+file.name;
                    subOver.classList.remove('hidden');
                }
                console.log('[F4A Flex] Loaded '+parsed.length+' subtitle cues');
            }
        };
        reader.readAsText(file);
        return this;
    },
    
    enableSinhala: function(){
        if(customSubs.length===0){
            subText.textContent='[CC] No subtitles to translate';
            subOver.classList.remove('hidden');
            return this;
        }
        var btn=document.querySelector('#subtitleOptions .settings-option[data-value="si"]');
        if(btn) btn.click();
        subText.textContent='[CC] සිංහල උපසිරැසි (Sinhala)';
        subOver.classList.remove('hidden');
        return this;
    },
    
    setSubtitleStyle: function(style){
        var size=style.size||'medium';
        var color=style.color||'#ffffff';
        var bg=style.background||'dark';
        subText.className='subtitle-text '+size+' bg-'+bg;
        subText.style.color=color;
        return this;
    },
    
    getSubtitleStatus: function(){
        return {
            enabled: ccActive,
            language: currentSubLang||'off',
            count: customSubs?customSubs.length:0
        };
    },
    
    // ===== SERVERS =====
    setServers: function(servers){
        var container=document.getElementById('serverOptions');
        container.innerHTML='';
        servers.forEach(function(s){
            var btn=document.createElement('button');
            btn.className='settings-option'+(s.active?' active':'');
            btn.dataset.value=s.name;
            btn.textContent=s.name;
            btn.addEventListener('click',function(){
                switchServer(s.name);
            });
            container.appendChild(btn);
        });
        return this;
    },
    
    connectServer: function(serverName){
        currentServer=serverName;
        serverStatus.textContent='🟢 Connected to '+serverName;
        serverStatus.style.color='#4ade80';
        document.querySelectorAll('#serverOptions .settings-option').forEach(function(b){
            b.classList.toggle('active',b.dataset.value===serverName);
        });
        return this;
    },
    
    getCurrentServer: function(){
        return currentServer;
    },
    
    // ===== INFO =====
    getState: function(){
        return {
            playing: playing,
            currentTime: v.currentTime||0,
            duration: v.duration||0,
            volume: v.volume||0,
            muted: v.muted||false,
            loop: loop,
            speed: v.playbackRate||1,
            server: currentServer,
            hasNext: hasNextVideo,
            queueLength: videoQueue.length,
            subtitles: {
                enabled: ccActive,
                language: currentSubLang||'off',
                count: customSubs?customSubs.length:0
            },
            metadata: videoData
        };
    },
    
    getVideoInfo: function(){
        return videoData;
    },
    
    setTitle: function(title){
        preTitle.textContent=title;
        return this;
    },
    
    setMetadata: function(data){
        if(data.season && data.episode) {
            preEpisodes.style.display='block';
            preEpisodes.innerHTML='<span class="pre-last">📺 Season '+data.season+' • Ep '+data.episode+'</span>';
        }
        if(data.type) preMeta.textContent=data.type+' • '+formatDuration(v.duration||0);
        return this;
    },
    
    getQueueLength: function(){
        return videoQueue.length;
    },
    
    isPlaying: function(){
        return playing;
    },
    
    getCurrentTime: function(){
        return v.currentTime||0;
    },
    
    getDuration: function(){
        return v.duration||0;
    },
    
    destroy: function(){
        if(nextPopupTimer) clearInterval(nextPopupTimer);
        v.pause();
        v.src='';
        v.load();
        return this;
    }
};

//==================== INIT ====================
v.volume=1;volSlider.value=1;updateVolIcon();updateTime();v.load();
console.log('[F4A Flex] Player ready');
console.log('[F4A Flex] API: window.FlexPlayer');
console.log('[F4A Flex] Commands: load, queue, play, pause, seek, setVolume, toggleMute, setLoop, toggleLoop, setSpeed, toggleFullscreen, skipForward, skipBackward, setSubtitles, toggleSubtitles, uploadSubtitles, enableSinhala, setSubtitleStyle, getSubtitleStatus, setServers, connectServer, getCurrentServer, getState, getVideoInfo, setTitle, setMetadata, getQueueLength, isPlaying, getCurrentTime, getDuration, setPrePlayTitle, setPrePlayMeta, setPrePlayDetails, setPrePlayEpisodes, setPrePlayLast, setPrePlayNext, clearQueue, getQueue, skipToNext, destroy');

})();
