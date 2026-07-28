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

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Now-red?style=for-the-badge&logo=githubpages)](https://ganulak123.github.io/Flex-Player/playertest.html)
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

**[https://ganulak123.github.io/Flex-Player/playertest.html](https://ganulak123.github.io/Flex-Player/playertest.html)**

The demo showcases:
- ✅ Glass UI effects with backdrop blur
- ✅ Subtitle upload and rendering (SRT/VTT)
- ✅ Queue system with auto-play next video
- ✅ Server switching with real-time status
- ✅ All playback controls and keyboard shortcuts
- ✅ Mobile-responsive touch interface

---

## ✨ Features

| Feature | Description | Status |
| :--- | :--- | :---: |
| 🎨 **Glass UI** | Beautiful backdrop-filter blur with responsive glassmorphism controls | ✅ |
| ⚡ **Custom Speeds** | Adjust playback rates (0.5x, 1x, 1.5x, 2x) | ✅ |
| 🔄 **Smart Skip** | Auto-adjusts seek intervals based on total video length | ✅ |
| 📺 **Queue System** | Auto-plays next episode with last-3-seconds preview popup | ✅ |
| 🌍 **Multi-Language** | Native English & Sinhala subtitle rendering support | ✅ |
| 📁 **Custom Subtitles** | Drag-and-drop or load `.vtt` and `.srt` files dynamically | ✅ |
| 🖥️ **Server Switching** | Seamlessly toggle between multiple stream source nodes | ✅ |
| 📱 **Mobile Touch** | Optimized touch gestures and responsive control overlays | ✅ |
| ⌨️ **Keyboard Controls** | Keyboard shortcuts for play/pause, seek, mute, and fullscreen | ✅ |
| 🔌 **JavaScript API** | Global `window.FlexPlayer` instance for programmatic control | ✅ |
| 🎯 **PostMessage API** | Remote control support for parent `<iframe>` embedding | ✅ |
| 🔄 **Loop Function** | Toggle video looping with visual indicator | ✅ |
| ⏭️ **Next Popup** | Shows next video in last 3 seconds with progress bar | ✅ |
| 📝 **Sinhala Subs** | Auto-translate to Sinhala with Google Translate integration | ✅ |

---

## 🚀 Quick Start

### Option 1: Iframe Embed (Recommended)

```html
<iframe 
    src="https://ganulak123.github.io/Flex-Player/playertest.html"
    width="100%"
    height="500px"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
></iframe>
