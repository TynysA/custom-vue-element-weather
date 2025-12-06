# 🌤️ Custom Vue Weather Widget
### Lightweight Weather Web Component (Vue + TypeScript + Shadow DOM)

**custom-vue-element-weather** is a standalone Weather Web Component  
that can be embedded **into any HTML page**, with **no Vue**, no bundlers, and no external dependencies.

The widget displays a swipeable weather carousel with multiple cities, search, drag & drop reordering, and a settings screen.

---

## 🚀 Demo / Usage

You can test the widget directly in your browser:  
👉 **https://tynysa.github.io/custom-vue-element-weather/public/test.html**

This page loads the widget from the `dist/widget.js` bundle and demonstrates how it behaves inside a regular HTML page.

Add the widget to any HTML file:

```html
<weather-widget></weather-widget>

<script src="https://TynysA.github.io/custom-vue-element-weather/dist/widget.js"></script>
```

The widget supports two visual themes:

- 🌞 **light** (default)  
- 🌙 **dark**

To set a theme, pass the `theme` attribute to the component:

```html
<weather-widget theme="light"></weather-widget>
```

--- 

## ✨ Features

- 🌤️ **Weather data from WeatherAPI**
- 📍 **Supports multiple saved cities**
- 🧭 **Automatic "My Location" detection** (geolocation API)
- 🌙 **Dark & Light theme support** (customizable via widget attribute)
- 🔄 **Swipe slider between cities**
- ••• **Navigation dots**
- ⚙️ **Settings screen** (reorder, add, delete cities)
- 🔍 **Search with autocomplete** (debounced API calls)
- ❌ **Smooth delete animation**
- 📦 **Single production bundle:** `dist/widget.js`

---
