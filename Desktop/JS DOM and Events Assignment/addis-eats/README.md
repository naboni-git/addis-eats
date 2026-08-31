# Addis Market Shopping List

## Project Goal
Build a working single-page app where data leads and the DOM follows using the **state-then-render loop** in vanilla JavaScript.

## Requirements
*   **State Management:** Hold grocery items in a JavaScript array (`items` array is the single source of truth).
*   **Rendering:** Use a `render()` function to rebuild the list every time the data changes.
*   **Form Handling:** Prevent default reloads (`e.preventDefault()`), validate input, and push new objects to the array on submit.
*   **Live Counter:** Display a running count of items and remaining items above the list.
*   **Event Delegation:** Use one listener on the parent `<ul>` (`#list`) to handle toggling `.done` and row deletion.
*   **Data Identification:** Use `data-id` attributes on rows to link DOM elements to array objects.
*   **CSS Toggling:** Use the `.done` class for bought items instead of inline JS styles.

## Self-Check List
- [x] Does the form add items without reloading the page?
- [x] Does clicking an item toggle a strikethrough via a CSS class?
- [x] Does clicking the remove button delete the correct item from the array?
- [x] Does the counter update immediately after every change?
- [x] Is the `render()` function the only place where the list DOM is modified?

## File Structure
- `index.html`: Form, count paragraph, and empty `<ul id="list">`.
- `styles.css`: Clean responsive layout with `.done` strikethrough and `.del` button styles.
- `app.js`: State array, DOM selectors, `render()`, form submit handler, and event delegation on `#list`.
