let listSpace = document.getElementById("listSpace");
if (!listSpace) {
    console.error("Error: listSpace element not found.");
}


document.addEventListener("DOMContentLoaded", loadLists);

function createList() {
    let listId = Date.now().toString(); 
    let ourHTML = `<div class="list" data-id="${listId}">
        <button class="del1" onclick="deleteList(this)">Delete</button>
        <form onsubmit="event.preventDefault();">
          <h3 contenteditable="true" oninput="saveLists()">Click to Rename</h3>
          <input type="text" autocomplete="off" onkeydown="handleEnter(event, this)">
          <button type="button" onclick="createItem(this)">Create Item</button>
        </form>
        <ul></ul>
      </div>`;
    listSpace.insertAdjacentHTML("beforeend", ourHTML);
    saveLists();
}

function createItem(buttonElement) {
    let listDiv = buttonElement.closest(".list"); 
    let inputField = listDiv.querySelector("input");
    let list = listDiv.querySelector("ul"); 
    let itemId = Date.now().toString(); 

    let itemText = inputField.value.trim();
    if (itemText !== "") {
        let ourHTML = `<div class="listItem" data-id="${itemId}">
            <li>
                <input type="checkbox" onchange="saveLists()"> ${itemText} 
                <button onclick="deleteItem(this)">Delete</button>
            </li>
        </div>`;
        list.insertAdjacentHTML("beforeend", ourHTML);
        inputField.value = "";
        inputField.focus();
        saveLists();
    }
}

function handleEnter(event, inputElement) {
    if (event.key === "Enter") {
        event.preventDefault();
        createItem(inputElement.closest("form").querySelector("button")); 
    }
}

function deleteItem(elementToDelete) {
    elementToDelete.closest(".listItem").remove();
    saveLists();
}

function deleteList(buttonElement) {
    buttonElement.closest(".list").remove();
    saveLists();
}

function saveLists() {
    let lists = [];
    document.querySelectorAll(".list").forEach(list => {
        let listData = {
            id: list.getAttribute("data-id"),
            title: list.querySelector("h3").innerText,
            items: []
        };
        list.querySelectorAll(".listItem").forEach(item => {
            listData.items.push({
                id: item.getAttribute("data-id"),
                text: item.innerText.replace("Delete", "").trim(),
                checked: item.querySelector("input[type=checkbox]").checked
            });
        });
        lists.push(listData);
    });
    sessionStorage.setItem("todoLists", JSON.stringify(lists));
}

function loadLists() {
  let storedLists = sessionStorage.getItem("todoLists");
  if (storedLists) {
      try {
          let lists = JSON.parse(storedLists);
          lists.forEach(listData => {
              let ourHTML = `<div class="list" data-id="${listData.id}">
                  <button class="del1" onclick="deleteList(this)">Delete</button>
                  <form onsubmit="event.preventDefault();">
                    <h3 contenteditable="true" oninput="saveLists()">${listData.title}</h3>
                    <input type="text" autocomplete="off" onkeydown="handleEnter(event, this)">
                    <button type="button" onclick="createItem(this)">Create Item</button>
                  </form>
                  <ul>
                    ${listData.items.map(item => `
                      <div class="listItem" data-id="${item.id}">
                        <li>
                          <input type="checkbox" ${item.checked ? "checked" : ""} onchange="saveLists()"> ${item.text}
                          <button onclick="deleteItem(this)">Delete</button>
                        </li>
                      </div>
                    `).join('')}
                  </ul>
                </div>`;
              listSpace.insertAdjacentHTML("beforeend", ourHTML);
          });
      } catch (error) {
          console.error("Error loading lists from sessionStorage:", error);
          sessionStorage.removeItem("todoLists"); 
      }
  }
}