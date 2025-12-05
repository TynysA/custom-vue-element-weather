# 🌤️ Custom Vue Weather Widget
### Lightweight Weather Web Component (Vue + TypeScript + Shadow DOM)

**custom-vue-element-weather** — это автономный Weather Web Component,
который можно вставлять **в любой HTML**, без Vue, без сборщиков, без зависимостей.

Погода отображается в виде свайпера с несколькими городами, поиском, drag & drop и экраном настроек.

---

## 🚀 Demo / Usage

Подключите виджет в любой HTML-файл:

```html
<weather-widget></weather-widget>

<script src="https://TynysA.github.io/custom-vue-element-weather/dist/widget.js"></script>
```
---

## ✨ Features

- 🌤️ Получение погоды через WeatherAPI  
- 📍 Несколько городов  
- 🔄 Swipe-слайдер между городами  
- ••• Навигационные dots  
- ⚙️ Экран настроек (reorder, добавить, удалить)  
- 🔍 Поиск городов с автоподсказками (debounce)  
- ❌ Анимация удаления  
- 🔒 CSS изолирован (Shadow DOM)  
- 📦 Один файл `dist/widget.js` для продакшена  

---

## 📦 Installation

Используйте через CDN (GitHub Pages):

```html
<script src="https://TynysA.github.io/custom-vue-element-weather/dist/widget.js"></script>
<weather-widget></weather-widget>
```

---

## 🛠 Development

### Установка:

```bash
npm install
```

### Сборка:

```bash
npm run build
```

Сборка будет лежать в:

```
dist/widget.js
```

---

## 📁 Project Structure

```
custom-vue-element-weather/
 ├─ src/
 │   ├─ components/
 │   ├─ App.vue
 │   ├─ WeatherWidget.vue
 │   ├─ WeatherSettings.vue
 │   ├─ style.scss
 │   └─ widget.ts
 │
 ├─ dist/
 │   └─ widget.js          # финальная сборка (подключается через script)
 │
 ├─ webpack.config.js
 ├─ package.json
 ├─ tsconfig.json
 └─ README.md
```
## 🤝 Contributing

PRs welcome — можно добавить:

- геолокацию  
- hourly forecast  
- кастомизацию тем  
- тёмную тему  
- расширенный дизайн  

---

## 📄 License

MIT License.
