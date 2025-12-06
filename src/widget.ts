import { createApp } from "vue";
import App from "./App.vue";
import styles from "./style.scss"; // <-- SCSS импортируется как STRING!

class WeatherCustomElement extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `<meta charset="UTF-8">`;
      const theme = this.getAttribute("theme") || "auto";
      shadow.host.setAttribute("data-theme", theme);

    // создать mount point для Vue
    const mountPoint = document.createElement("div");
    shadow.appendChild(mountPoint);

    // вставить СТИЛИ внутрь Shadow DOM
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    shadow.appendChild(styleTag);



      // монтируем Vue внутрь Shadow DOM
    const app = createApp(App);
    app.mount(mountPoint);
  }
}

customElements.define("weather-widget", WeatherCustomElement);
