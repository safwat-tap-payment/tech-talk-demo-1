class CounterApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // This is where you define you're own shadow DOM

    this._count = 0;
  }

  // The following lines to enable customising properties like `initial`
  /**
   * @example
   * ```js
   * const counter = document.querySelector("counter-app");
   * console.log(counter.initial);
   * ```
   */

  // // Property (JS usage)
  // get initial() {
  //   return this._count;
  // }

  // set initial(value) {
  //   this.setAttribute("initial", value);
  // }

  connectedCallback() {
    // This is a lifecycle method that is called when the component is added to the DOM // it's like componentDidMount in React
    // Initialize from attribute (first render)
    if (this.hasAttribute("initial")) {
      this._count = Number(this.getAttribute("initial")) || 0;
    }

    this.render();
    this.attachEvents();
  }

  // Observe attribute changes
  static get observedAttributes() {
    return ["initial"];
  }

  // Attribute → state sync
  attributeChangedCallback(name, oldValue, newValue) {
    // Life cycle method
    if (name === "initial" && oldValue !== newValue) {
      this._count = Number(newValue) || 0;
      this.update();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          font-family: Arial;
          text-align: center;
          border: 1px solid #ddd;
          padding: 20px;
          width: 200px;
          border-radius: 10px;
        }

        .count {
          font-size: 2rem;
          margin: 10px 0;
        }

        button {
          margin: 5px;
          padding: 8px 12px;
          cursor: pointer;
        }
      </style>

      <div class="container">
        <h3>Counter</h3>
        <div class="count">${this._count}</div>

        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="reset">Reset</button>
      </div>
    `;
  }

  attachEvents() {
    this.shadowRoot
      .getElementById("increment")
      .addEventListener("click", () => {
        this._count++;
        this.update();
      });

    this.shadowRoot
      .getElementById("decrement")
      .addEventListener("click", () => {
        this._count--;
        this.update();
      });

    this.shadowRoot.getElementById("reset").addEventListener("click", () => {
      this._count = Number(this.getAttribute("initial")) || 0;
      this.update();
    });
  }

  update() {
    const el = this.shadowRoot.querySelector(".count");
    if (el) el.textContent = this._count;
  }
}

customElements.define("counter-app", CounterApp);
