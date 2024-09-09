// Template
const template = document.createElement('template')
template.innerHTML = `
    <style>
        body {
            padding: 30px;
            border-type: solid;
        }
    </style>

    <div id="wrapper">
        <div id="nameInput">
            <input id="nameInputBox" placeholder="Write your name here..."></input>
            <button id="searchButton">Submit</button>
        </div>


        <div id="answerBox">
            <p id="answer"></p>
        </div>

        <form>
            <label for="backgroundcolor">Select background color:</label>
            <input type="color" id="backgroundcolor" name="backgroundcolor">
        </form>
    </div>
`

customElements.define('name-input',

  /**
   * Creates a custom element.
   */
  class extends HTMLElement {
    #nameInput
    #answer
    #button
    #colorPicker

    /**
     * The constructor.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#nameInput = this.shadowRoot.getElementById('nameInputBox')
        this.#answer = this.shadowRoot.getElementById('answer')
        this.#button = this.shadowRoot.getElementById('searchButton')

        this.#button.addEventListener('click', () => this.handleSubmit())

        this.#colorPicker = this.shadowRoot.querySelector("#backgroundcolor");
        if (this.#colorPicker) {
            this.#colorPicker.addEventListener("input", () => this.updateColor());
            this.#colorPicker.addEventListener("change", () => this.updateColor());
        }
    }

    handleSubmit() {
        const input = this.#nameInput.value.trim()
        if (input === '') {
            alert('Please enter your name.')
            return
        }
        this.#nameInput.value = ''
        this.#answer.textContent = 'Hej ' + input + '!'

    }

    updateColor() {
        const colorPicker = this.shadowRoot.querySelector("#backgroundcolor")
        const color = colorPicker.value
        this.shadowRoot.querySelector("#wrapper").style.backgroundColor = color
        //console.log(color)
    }
  })
