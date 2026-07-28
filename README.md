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

**The Glass Player - Premium Open Source Video Experience**

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Now-red?style=for-the-badge&logo=githubpages)](https://ganulak123.github.io/Flex-Player/)
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
- [Subtitle Formats](#-subtitle-file-formats)
- [PostMessage API](#-postmessage-api)
- [Mobile Support](#-mobile-support)
- [Browser Support](#-browser-support)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [License & Ownership](#-license--ownership)
- [Credits](#-credits)

---

## 📌 About

**F4A Flex™ Player** (Free-For-All) is a modern, glass-themed web media player built with vanilla JavaScript. It features a sleek glassmorphism UI, custom subtitle styling, server-switching capabilities, and an extensible postMessage API for web integration.

**Why F4A Flex Player?**
- 🎨 **Beautiful UI** - Premium frosted-glass visual aesthetics
- 🚀 **Zero Dependencies** - Pure Vanilla JS/CSS for blazing fast loads
- 🔌 **Fully Extensible** - Add custom stream servers, playback speed ranges, and controls
- 📱 **Mobile Optimized** - Touch control ready with responsive glass controls
- 🌍 **Global** - Multi-language subtitle & auto-translation engine
- 🆓 **F4A (Free For All)** - 100% Free for personal and commercial usage with attribution preserved

---

## 🎬 Live Demo

**[https://ganulak123.github.io/Flex-Player/](https://ganulak123.github.io/Flex-Player/)**

---

## ✨ Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🎨 **Glass UI** | Backdrop-filter blur interface with responsive layout | ✅ |
| ⚡ **Custom Playback Rates** | Easy configuration for playback speeds (0.5x, 1x, 1.5x, 2x, etc.) | ✅ |
| 🖥️ **Multi-Server Switching** | Seamlessly add or switch backend stream source mirrors | ✅ |
| 🔄 **Smart Queue System** | Auto-play next episode queue with overlay preview | ✅ |
| 🌍 **Subtitle Engine** | Support for external `.vtt` / `.srt` files and Sinhala translation | ✅ |
| 📱 **Touch Gestures** | Mobile-ready touch controls and responsive overlays | ✅ |
| 🔌 **PostMessage API** | Control playback state from parent iframe contexts | ✅ |

---

## 🚀 Quick Start

### Option 1: Iframe Embed (Recommended)

```html
<iframe 
    src="[https://ganulak123.github.io/Flex-Player/playertest.html](https://ganulak123.github.io/Flex-Player/playertest.html)"
    width="100%"
    height="500px"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
></iframe>
