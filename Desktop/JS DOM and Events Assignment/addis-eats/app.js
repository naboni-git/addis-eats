// ============================================================
// Addis Market Shopping List - Vanilla JavaScript
// State-then-render loop architecture
// ============================================================

// TODO: Hold items in an array (this is your single source of truth)
let items = [
  { id: "1", name: "Teff", done: false },
  { id: "2", name: "Berbere", done: false },
  { id: "3", name: "Coffee Beans", done: true },
];

// TODO: Select necessary DOM elements (form, input, list, count)
const addForm = document.getElementById("add-form");
const nameInput = document.getElementById("name");
const list = document.getElementById("list");
const count = document.getElementById("count");

// TODO: Write a render() function to rebuild the list from the array
// 1. Clear the current list (innerHTML = "")
// 2. Loop through the items array
// 3. Create elements, use data-id on each row, and append to the list
// 4. Update the live count paragraph
function render() {
  // 1. Clear the current list
  list.innerHTML = "";

  // If no items, show empty message
  if (items.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-state";
    emptyLi.textContent = "Your shopping list is empty. Add an item above!";
    list.appendChild(emptyLi);
  } else {
    // 2. Loop through the items array
    items.forEach((item) => {
      // 3. Create elements, use data-id on each row, and append to the list
      const li = document.createElement("li");
      li.setAttribute("data-id", item.id);

      // Apply .done class if item is marked as bought
      if (item.done) {
        li.classList.add("done");
      }

      // Create item container with checkbox and label
      const itemContent = document.createElement("div");
      itemContent.className = "item-content";

      const checkbox = document.createElement("span");
      checkbox.className = "item-checkbox";
      checkbox.setAttribute("aria-hidden", "true");

      const itemText = document.createElement("span");
      itemText.className = "item-text";
      itemText.textContent = item.name;

      itemContent.appendChild(checkbox);
      itemContent.appendChild(itemText);

      // Create delete button with .del class
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "del";
      delBtn.textContent = "Remove";
      delBtn.setAttribute("aria-label", `Remove ${item.name}`);

      li.appendChild(itemContent);
      li.appendChild(delBtn);

      list.appendChild(li);
    });
  }

  // 4. Update the live count paragraph
  const total = items.length;
  const remaining = items.filter((item) => !item.done).length;

  if (total === 0) {
    count.textContent = "0 items";
  } else if (remaining === total) {
    count.textContent = `${total} ${total === 1 ? "item" : "items"}`;
  } else {
    count.textContent = `${remaining} of ${total} ${total === 1 ? "item" : "items"} remaining`;
  }
}

// TODO: Handle form submission
// 1. preventDefault to stop page reload
// 2. Read and validate the input
// 3. Push a new object to the items array (include a unique id and done: false)
// 4. Call render()
addForm.addEventListener("submit", function (e) {
  // 1. Prevent default form reload
  e.preventDefault();

  // 2. Read and validate the input
  const text = nameInput.value.trim();
  if (!text) {
    nameInput.focus();
    return;
  }

  // 3. Push a new object to the items array
  const newItem = {
    id: Date.now().toString(),
    name: text,
    done: false,
  };
  items.push(newItem);

  // Clear input and refocus
  nameInput.value = "";
  nameInput.focus();

  // 4. Call render() to update the DOM
  render();
});

// TODO: Set up event delegation on the #list
// 1. Listen for clicks on the parent <ul>
// 2. Use e.target and closest() to find the clicked row
// 3. Determine if the user is toggling ".done" or removing a row
// 4. Update the items array accordingly
// 5. Call render()
list.addEventListener("click", function (e) {
  // 2. Find the clicked row
  const row = e.target.closest("li");
  if (!row) return;

  const id = row.getAttribute("data-id");
  if (!id) return;

  // 3. Determine if the user is removing a row or toggling ".done"
  if (e.target.classList.contains("del") || e.target.closest(".del")) {
    // Remove item from items array
    items = items.filter((item) => item.id !== id);
  } else {
    // Toggle done status in items array
    const item = items.find((item) => item.id === id);
    if (item) {
      item.done = !item.done;
    }
  }

  // 4 & 5. Update DOM by re-rendering
  render();
});

// Initial render to build the initial list
render();
