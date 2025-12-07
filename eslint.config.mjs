import globals from "globals";
import pluginJs from "@eslint/js";

const customGlobals = {
  ...globals.browser,
  module: 'readonly',
};

export default [
  {
    languageOptions: { globals: customGlobals },
  },
  pluginJs.configs.recommended,
];

/**
 * @jest-environment jsdom
 */

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
} = require('../index')

describe('Additional DOM tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="dynamic-content"></div>
      <div id="error-message" class="hidden"></div>
      <form id="user-form">
        <input type="text" id="user-input" />
        <button type="submit">Submit</button>
      </form>
    `
  })

  it('should export the required functions', () => {
    expect(typeof addElementToDOM).toBe('function')
    expect(typeof removeElementFromDOM).toBe('function')
    expect(typeof simulateClick).toBe('function')
    expect(typeof handleFormSubmit).toBe('function')
  })

  it('removeElementFromDOM should not throw when the element does not exist', () => {
    expect(() => removeElementFromDOM('non-existent-id')).not.toThrow()
    expect(document.getElementById('non-existent-id')).toBeNull()
  })

  it('simulateClick should dispatch a click event on the target element', () => {
    const btn = document.createElement('button')
    btn.id = 'simulate-btn'
    document.body.appendChild(btn)

    // attach listener that updates DOM when clicked
    btn.addEventListener('click', () => {
      const dc = document.getElementById('dynamic-content')
      dc.textContent = 'simulate-click-fired'
    })

    // call the utility
    simulateClick('simulate-btn')

    const dynamicContent = document.getElementById('dynamic-content')
    expect(dynamicContent.textContent).toBe('simulate-click-fired')
  })

  it('handleFormSubmit should attach a submit handler that updates dynamic content when the form is submitted', () => {
    const input = document.getElementById('user-input')
    input.value = 'Event Submit Value'

    // set up the form submit handler (expected to attach listener)
    handleFormSubmit('user-form', 'dynamic-content')

    const form = document.getElementById('user-form')
    // dispatch a submit event to simulate user submitting the form
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    form.dispatchEvent(submitEvent)

    const dynamicContent = document.getElementById('dynamic-content')
    expect(dynamicContent.textContent).toContain('Event Submit Value')
  })
})