<div align="center">

# 🎬 F4A Flex™ Player

![Version](https://img.shields.io/badge/Version-1.0.0-red?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Player-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-GlassUI-blue?style=for-the-badge&logo=css3)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=github)
![Stars](https://img.shields.io/github/stars/ganulak123/Flex-Player?style=for-the-badge&logo=github)
![Forks](https://img.shields.io/github/forks/ganulak123/Flex-Player?style=for-the-badge&logo=github)

**The Glass Player — Premium Video Experience**

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Now-red?style=for-the-badge&logo=githubpages)](https://ganulak123.github.io/Flex-Player/)
[![CDN](https://img.shields.io/badge/CDN-Use_Now-blue?style=for-the-badge&logo=jsdelivr)](https://ganulak123.github.io/Flex-Player/flex-player.js)
[![Documentation](https://img.shields.io/badge/Documentation-Read_Now-blue?style=for-the-badge&logo=readthedocs)](#-api-reference)
[![Report Issue](https://img.shields.io/badge/Report_Issue-GitHub-black?style=for-the-badge&logo=github)](https://github.com/ganulak123/Flex-Player/issues)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [State Object](#-state-object)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Subtitle File Formats](#-subtitle-file-formats)
- [PostMessage API](#-postmessage-api)
- [Mobile Support](#-mobile-support)
- [Browser Support](#-browser-support)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [License & Ownership](#-license--ownership)
- [Credits](#-credits)

---

## 📌 About

**F4A Flex™ Player** (*Free-For-All*) is a modern, glass-themed video player engine built with vanilla JavaScript. It features a custom backdrop-filter blur interface, comprehensive subtitle support, intelligent queue system, multi-server stream switching, and a complete JS API for seamless web integration.

**Why F4A Flex Player?**

- 🎨 **Beautiful Glass UI** - Premium translucent visual design with responsive layouts
- 🚀 **Zero Dependencies** - Pure vanilla JS and standard CSS, lightweight and fast
- 🔌 **Fully Extensible** - Add custom backend servers, custom playback speeds, and dynamic controls
- 📱 **Responsive & Touch Ready** - Works smoothly on desktop and mobile browsers
- 🌍 **Multi-Language Subtitles** - VTT/SRT file parser with built-in Sinhala auto-translation support
- 🆓 **F4A (Free For All)** - Open source and free to use while preserving author attribution

---

## 🎬 Live Demo

**Experience the player in action:**

https://ganulak123.github.io/Flex-Player/

The demo showcases:

- Glass UI effects with backdrop blur
- Subtitle upload and rendering (SRT/VTT)
- Queue system with auto-play next video
- Server switching with real-time status
- All playback controls and keyboard shortcuts
- Mobile-responsive touch interface

---

## ✨ Features

| Feature | Description | Status |
| :--- | :--- | :---: |
| 🎨 **Glass UI** | Beautiful backdrop-filter blur with responsive glassmorphism controls | ✅ |
| ⚡ **Custom Speeds** | Adjust playback rates (0.5x, 1x, 1.5x, 2x) | ✅ |
| 🔄 **Smart Skip** | Auto-adjusts seek intervals based on total video length | ✅ |
| 📺 **Queue System** | Auto-plays next episode with last-3-seconds preview popup | ✅ |
| 🌍 **Multi-Language** | Native English & Sinhala subtitle rendering support | ✅ |
| 📁 **Custom Subtitles** | Drag-and-drop or load .vtt and .srt files dynamically | ✅ |
| 🖥️ **Server Switching** | Seamlessly toggle between multiple stream source nodes | ✅ |
| 📱 **Mobile Touch** | Optimized touch gestures and responsive control overlays | ✅ |
| ⌨️ **Keyboard Controls** | Keyboard shortcuts for play/pause, seek, mute, and fullscreen | ✅ |
| 🔌 **JavaScript API** | Global window.FlexPlayer instance for programmatic control | ✅ |
| 🎯 **PostMessage API** | Remote control support for parent iframe embedding | ✅ |
| 🔄 **Loop Function** | Toggle video looping with visual indicator | ✅ |
| ⏭️ **Next Popup** | Shows next video in last 3 seconds with progress bar | ✅ |
| 📝 **Sinhala Subs** | Auto-translate to Sinhala with Google Translate integration | ✅ |

---

## 🚀 Quick Start

### One Line - Load the Player (CDN)

<script src="https://ganulak123.github.io/Flex-Player/flex-player.js"></script>

### Load a Video

<script>
    window.F4A_VIDEO = 'https://example.com/video.mp4';
    window.F4A_TITLE = 'My Movie';
</script>
<script src="https://ganulak123.github.io/Flex-Player/flex-player.js"></script>

### Complete Example

<!DOCTYPE html>
<html>
<head>
    <title>F4A Flex Player</title>
</head>
<body>

    <div id="f4a-player"></div>

    <script src="https://ganulak123.github.io/Flex-Player/flex-player.js"></script>

    <script>
        setTimeout(function() {
            F4A.load(
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                "Elephant's Dream"
            );
        }, 1500);
    </script>

</body>
</html>

### Option 2: Iframe Embed

<iframe 
    src="https://ganulak123.github.io/Flex-Player/playertest.html"
    width="100%"
    height="500px"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen>
</iframe>

### Option 3: Download & Host Yourself

git clone https://github.com/ganulak123/Flex-Player.git
cd Flex-Player
# Open playertest.html in browser or deploy to your server

---

## 🎯 API Reference

### F4A API (CDN Version)

| Method | Description | Example |
|--------|-------------|---------|
| F4A.load(url, title) | Load a video | F4A.load('video.mp4', 'My Movie') |
| F4A.play() | Start playing | F4A.play() |
| F4A.pause() | Pause video | F4A.pause() |
| F4A.toggle() | Toggle play/pause | F4A.toggle() |
| F4A.seek(seconds) | Jump to time | F4A.seek(120) |
| F4A.speed(speed) | Set playback speed | F4A.speed(1.5) |
| F4A.volume(level) | Set volume (0-1) | F4A.volume(0.8) |
| F4A.mute() | Mute/unmute | F4A.mute() |
| F4A.loop() | Toggle loop | F4A.loop() |
| F4A.fullscreen() | Enter/exit fullscreen | F4A.fullscreen() |
| F4A.skip(seconds) | Skip forward/backward | F4A.skip(10) or F4A.skip(-10) |
| F4A.state() | Get current state | var state = F4A.state() |

### Core Methods (Full FlexPlayer API)

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| load(data) | Load a video with metadata | Object | FlexPlayer |
| queue(data) | Add video to queue | Object | FlexPlayer |
| play() | Start playing | - | FlexPlayer |
| pause() | Pause video | - | FlexPlayer |
| togglePlay() | Toggle play/pause | - | FlexPlayer |
| seek(seconds) | Jump to specific time | Number | FlexPlayer |
| setVolume(level) | Set volume (0-1) | Number | FlexPlayer |
| toggleMute() | Mute/unmute | - | FlexPlayer |
| setLoop(boolean) | Enable/disable loop | Boolean | FlexPlayer |
| toggleLoop() | Toggle loop | - | FlexPlayer |
| setSpeed(speed) | Set playback speed | Number | FlexPlayer |
| toggleFullscreen() | Enter/exit fullscreen | - | FlexPlayer |
| skipForward() | Skip forward (smart) | - | FlexPlayer |
| skipBackward() | Skip backward (smart) | - | FlexPlayer |
| destroy() | Clean up player | - | FlexPlayer |

#### load(data) Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | ✅ | Video title |
| src | String | ✅ | Video URL |
| type | String | ❌ | 'Movie', 'TV Show', 'Anime' |
| duration | Number | ❌ | Duration in seconds |
| year | Number/String | ❌ | Release year |
| season | Number | ❌ | Season number |
| episode | Number | ❌ | Episode number |
| totalEpisodes | Number | ❌ | Total episodes |
| poster | String | ❌ | Poster image URL |
| lastEpisode | String | ❌ | Last episode info |
| nextEpisode | String | ❌ | Next episode info |

#### queue(data) Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | ✅ | Video title |
| src | String | ✅ | Video URL |
| type | String | ❌ | 'Movie', 'TV Show', 'Anime' |
| duration | Number | ❌ | Duration in seconds |
| season | Number | ❌ | Season number |
| episode | Number | ❌ | Episode number |
| poster | String | ❌ | Poster image URL |

---

### Subtitle Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| setSubtitles(array) | Load custom subtitles | Array | FlexPlayer |
| toggleSubtitles() | Toggle subtitles on/off | - | FlexPlayer |
| uploadSubtitles(file) | Upload .srt/.vtt file | File | FlexPlayer |
| enableSinhala() | Auto-translate to Sinhala | - | FlexPlayer |
| setSubtitleStyle(object) | Customize appearance | Object | FlexPlayer |
| getSubtitleStatus() | Get subtitle state | - | Object |

#### setSubtitles(array) Format

player.setSubtitles([
    {start: 0, end: 5, text: 'Hello world'},
    {start: 5, end: 10, text: 'Welcome to Flex Player'},
    {start: 10, end: 15, text: 'Enjoy the show!'}
]);

#### setSubtitleStyle(object) Options

| Field | Options | Default |
|-------|---------|---------|
| size | 'small', 'medium', 'large', 'xl' | 'medium' |
| color | Hex color (e.g., '#ffffff') | '#ffffff' |
| background | 'dark', 'light', 'none' | 'dark' |

player.setSubtitleStyle({
    size: 'large',
    color: '#ff6b6b',
    background: 'dark'
});

---

### Pre-Play Customization Methods

| Method | Description | Example |
|--------|-------------|---------|
| setPrePlayTitle(text) | Set title on launch screen | player.setPrePlayTitle('My Movie') |
| setPrePlayMeta(text) | Set meta info | player.setPrePlayMeta('Movie • 02:30') |
| setPrePlayDetails(text) | Set details line | player.setPrePlayDetails('📅 2024') |
| setPrePlayEpisodes(text) | Set episode info | player.setPrePlayEpisodes('📺 Season 1 • Ep 1') |
| setPrePlayLast(text) | Set last episode | player.setPrePlayLast('⬅️ Ep 2 (3d ago)') |
| setPrePlayNext(text) | Set next episode | player.setPrePlayNext('➡️ Ep 4 (Tomorrow)') |

---

### Server Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| setServers(array) | Configure available servers | Array | FlexPlayer |
| connectServer(name) | Switch to server | String | FlexPlayer |
| getCurrentServer() | Get active server | - | String |

#### setServers(array) Format

player.setServers([
    {name: 'Server 1', url: 'https://server1.com', active: true},
    {name: 'Server 2', url: 'https://server2.com', active: false},
    {name: 'Server 3', url: 'https://server3.com', active: false}
]);

---

### Queue Methods

| Method | Description | Returns |
|--------|-------------|---------|
| clearQueue() | Clear all queued videos | FlexPlayer |
| getQueue() | Get queue array | Array |
| skipToNext() | Manually play next | FlexPlayer |
| getQueueLength() | Get queue size | Number |

---

### Info Methods

| Method | Description | Returns |
|--------|-------------|---------|
| getState() | Get current player state | Object |
| getVideoInfo() | Get current video metadata | Object |
| setTitle(title) | Update displayed title | FlexPlayer |
| setMetadata(data) | Update video metadata | FlexPlayer |
| isPlaying() | Check if playing | Boolean |
| getCurrentTime() | Get current time | Number |
| getDuration() | Get duration | Number |

---

## 📊 State Object

{
    playing: true,
    currentTime: 45.2,
    duration: 120.0,
    volume: 0.8,
    muted: false,
    loop: false,
    speed: 1.0,
    server: 'Server 1',
    hasNext: true,
    queueLength: 2,
    subtitles: {
        enabled: true,
        language: 'en',
        count: 15
    },
    metadata: {
        title: 'My Movie',
        type: 'Movie',
        duration: 120,
        year: 2024
    }
}

---

## ⌨️ Keyboard Shortcuts

| Key | Action | Description |
|-----|--------|-------------|
| Space / K | Play/Pause | Toggle playback |
| F | Fullscreen | Enter/exit fullscreen |
| M | Mute | Toggle mute |
| C | Subtitles | Toggle subtitles |
| L | Loop | Toggle video loop |
| → | Skip Forward | Skip forward (smart amount) |
| ← | Skip Backward | Skip backward (smart amount) |
| ESC | Close Settings | Close settings dropdown |

---

## 🎨 Subtitle File Formats

### SRT Format

1
00:00:00,000 --> 00:00:05,000
Hello world!

2
00:00:05,000 --> 00:00:10,000
Welcome to Flex Player

3
00:00:10,000 --> 00:00:15,000
Enjoy the show!

### VTT Format

WEBVTT

00:00:00.000 --> 00:00:05.000
Hello world!

00:00:05.000 --> 00:00:10.000
Welcome to Flex Player

00:00:10.000 --> 00:00:15.000
Enjoy the show!

---

## 🔌 PostMessage API

### Send Commands from Parent Page

// Get iframe reference
var iframe = document.getElementById('playerIframe');

// Load video
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'load',
    data: {
        title: 'My Movie',
        src: 'https://example.com/video.mp4'
    }
}, '*');

// Play
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'play'
}, '*');

// Set speed (1.5x)
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'setSpeed',
    data: 1.5
}, '*');

// Seek to 2 minutes
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'seek',
    data: 120
}, '*');

// Queue next video
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'queue',
    data: {
        title: 'Next Movie',
        src: 'https://example.com/next.mp4'
    }
}, '*');

// Clear queue
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'clearQueue'
}, '*');

// Toggle subtitles
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'toggleSubtitles'
}, '*');

// Set loop on
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'setLoop',
    data: true
}, '*');

// Connect server
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'connectServer',
    data: 'CDN-Asia'
}, '*');

// Toggle fullscreen
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'toggleFullscreen'
}, '*');

// Get state
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'getState'
}, '*');

// Destroy
iframe.contentWindow.postMessage({
    type: 'flexPlayer',
    action: 'destroy'
}, '*');

### Listen for Events from Player

window.addEventListener('message', function(e) {
    if(e.data && e.data.type === 'flexPlayer') {
        switch(e.data.event) {
            case 'play':
                console.log('▶️ Video started playing');
                break;
            case 'pause':
                console.log('⏸️ Video paused');
                break;
            case 'ended':
                console.log('🏁 Video ended');
                break;
            case 'timeupdate':
                console.log('⏱️ Time:', e.data.data.currentTime);
                break;
            case 'volumechange':
                console.log('🔊 Volume:', e.data.data.volume);
                break;
            case 'nextVideo':
                console.log('➡️ Next video:', e.data.data.title);
                break;
            case 'state':
                console.log('📊 State:', e.data.data);
                break;
            case 'serverChange':
                console.log('🖥️ Server:', e.data.data.server);
                break;
            case 'subtitleChange':
                console.log('📝 Subtitles:', e.data.data.enabled);
                break;
            case 'noMoreVideos':
                console.log('📭 Queue empty');
                break;
        }
    }
});

---

## 📱 Mobile Support

| Feature | Description |
|---------|-------------|
| Touch Play/Pause | Tap right half of video → toggle play/pause |
| Touch Skip Back | Tap left half of video → skip backward |
| Swipe Gestures | Swipe left/right for seek |
| Responsive Controls | Controls auto-adjust for mobile screens |
| Auto-Hide Controls | Controls hide after 3 seconds of inactivity |
| Touch Progress Bar | Drag progress bar with touch |

---

## 🛠️ Browser Support

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 55+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |
| Opera | 47+ | ✅ Fully Supported |
| Mobile Chrome | 60+ | ✅ Fully Supported |
| Mobile Safari | 12+ | ✅ Fully Supported |
| Samsung Internet | 6.2+ | ✅ Supported |

---

## 📁 Project Structure

Flex-Player/
├── flex-player.js      # CDN loader - contains ALL code (CSS, HTML, JS)
├── playertest.html     # Main player page
├── playertest.css      # All styles (glass UI + animations)
├── playertest.js       # Player logic + complete API
├── index.html          # Example usage
├── LICENSE.txt         # MIT License
├── README.md           # This documentation
└── .gitignore          # Git ignore file

---

## 🚀 Deployment

### GitHub Pages (Free)

1. Create repository on GitHub

git init
git add .
git commit -m "Initial commit: F4A Flex Player v1.0.0"
git remote add origin https://github.com/ganulak123/Flex-Player.git
git push -u origin main

2. Enable GitHub Pages

- Go to Settings → Pages
- Select main branch
- Save

3. Access your player

https://ganulak123.github.io/Flex-Player/

---

## 📄 License & Ownership

This project is licensed under the MIT License - see the LICENSE.txt file for details.

### What You Can Do ✅

| Action | Allowed |
|--------|---------|
| Use commercially | Yes |
| Modify the code | Yes |
| Distribute copies | Yes |
| Private use | Yes |
| Sublicense | Yes |
| Credit required | Yes |

### What You Cannot Do ❌

| Action | Not Allowed |
|--------|-------------|
| Remove copyright notice | No |
| Claim as your own | No |
| Hold liable | No |

### Brand Notice

F4A Flex™ is a trademark of Ganula. The name "F4A" stands for "Free For All" - reflecting the open-source nature of this project. The "Flex" name represents the flexible, powerful, and stylish nature of the player.

---

## 🙏 Credits

- Built With: Vanilla JavaScript, HTML5, CSS3
- UI Inspiration: Modern glassmorphism design trends
- Video Playback: HTML5 Video API
- Icons: Custom SVG icons
- Brand: F4A Flex™ - Free For All

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Make your changes
4. Commit (git commit -m 'Add amazing feature')
5. Push (git push origin feature/amazing-feature)
6. Open a Pull Request

### Guidelines

- Keep code clean and readable
- Follow existing code style
- Update documentation if needed
- Test your changes

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

[![Star on GitHub](https://img.shields.io/badge/⭐_Star_on_GitHub-View_Repo-blue?style=for-the-badge&logo=github)](https://github.com/ganulak123/Flex-Player)

---

## 📞 Contact

- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

<div align="center">

---

### Built with ❤️ by Ganula

**F4A Flex™ Player v1.0.0** • © 2026 Ganula

**F4A = Free For All**

---

**📝 This project is open source and free to use.**
**Made for the community, by the community.**

[⬆ Back to Top](#-f4a-flex-player)

</div>
