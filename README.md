<div align="center">

# 🎬 Flex Player

![Version](https://img.shields.io/badge/Version-1.0.0-red?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Player-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-GlassUI-blue?style=for-the-badge&logo=css3)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=github)
![Stars](https://img.shields.io/github/stars/your-username/flex-player?style=for-the-badge&logo=github)
![Forks](https://img.shields.io/github/forks/your-username/flex-player?style=for-the-badge&logo=github)

**The Glass Player - Premium Video Experience**

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Now-red?style=for-the-badge&logo=githubpages)](https://your-username.github.io/flex-player/demo.html)
[![Documentation](https://img.shields.io/badge/Documentation-Read_Now-blue?style=for-the-badge&logo=readthedocs)](#-api-reference)
[![Report Issue](https://img.shields.io/badge/Report_Issue-GitHub-black?style=for-the-badge&logo=github)](https://github.com/your-username/flex-player/issues)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
  - [Core Methods](#core-methods)
  - [Subtitle Methods](#subtitle-methods)
  - [Server Methods](#server-methods)
  - [Queue Methods](#queue-methods)
  - [Info Methods](#info-methods)
- [State Object](#-state-object)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Subtitle Formats](#-subtitle-file-formats)
- [PostMessage API](#-postmessage-api)
- [Mobile Support](#-mobile-support)
- [Browser Support](#-browser-support)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [License](#-license)
- [Credits](#-credits)

---

## 📌 About

**Flex Player** is a modern, glass-themed video player built with vanilla JavaScript. It features a beautiful UI with backdrop-filter blur effects, comprehensive subtitle support, intelligent queue system, server switching, and a complete API for seamless integration.

**Why Flex Player?**
- 🎨 **Beautiful** - Premium glass UI design
- 🚀 **Lightweight** - Pure vanilla JS, no dependencies
- 🔌 **Extensible** - Complete API for integration
- 📱 **Responsive** - Works on all devices
- 🌍 **Global** - Multi-language subtitle support

---

## ✨ Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🎨 **Glass UI** | Beautiful backdrop-filter blur with glassmorphism | ✅ |
| 🔄 **Smart Skip** | Auto-adjusts skip time based on video length | ✅ |
| 📺 **Queue System** | Auto-play next video with 3-second popup | ✅ |
| 🌍 **Multi-Language** | English & Sinhala subtitles support | ✅ |
| 📁 **Custom Subs** | Upload .srt or .vtt files | ✅ |
| 🎨 **Subtitle Styles** | Size, color, background customization | ✅ |
| 🖥️ **Server Switching** | Multiple stream server support | ✅ |
| 📱 **Mobile Optimized** | Touch support + responsive design | ✅ |
| ⌨️ **Keyboard Shortcuts** | Full keyboard control | ✅ |
| 🔌 **API Ready** | Complete JavaScript API | ✅ |
| 🎯 **PostMessage** | Control from parent pages | ✅ |
| 🔄 **Loop Function** | Toggle video looping | ✅ |
| ⏭️ **Next Popup** | Shows next video in last 3 seconds | ✅ |
| 📝 **Sinhala Subs** | Auto-translate to Sinhala | ✅ |

---

## 🚀 Quick Start

### Option 1: Iframe Embed (Recommended)

```html
<iframe 
    src="https://your-username.github.io/flex-player/playertest.html"
    width="100%"
    height="500px"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
></iframe>
