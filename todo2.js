let listSpace = document.getElementById("listSpace");

function createList() {
    let ourHTML = `<div class="list"><button class="del1" onclick="deleteItem(this)">Delete</button>
        <form onsubmit="event.preventDefault();">
          <h3 contenteditable="true">Click to Rename</h3>
          <input type="text" autocomplete="off" onkeydown="handleEnter(event, this)">
          <button type="button" onclick="createItem(this)">Create Item</button>
        </form>
        <ul></ul>
      </div>`;
    listSpace.insertAdjacentHTML("beforeend", ourHTML);
}

function createItem(buttonElement) {
    let listDiv = buttonElement.closest(".list"); 
    let inputField = listDiv.querySelector("input");
    let list = listDiv.querySelector("ul"); 

    let itemText = inputField.value.trim();
    if (itemText !== "") {
        let ourHTML = `<div class="listItem"><li><input type="checkbox" id="myCheckbox" name="myCheckbox">${itemText} <button onclick="deleteItem(this)">Delete</button></li></div>`;
        list.insertAdjacentHTML("beforeend", ourHTML);
        inputField.value = "";
        inputField.focus();
    }
}

function handleEnter(event, inputElement) {
  if (event.key === "Enter") {
      event.preventDefault();
      createItem(inputElement); 
  }
}



function deleteItem(elementToDelete) {
    elementToDelete.parentElement.remove();
}
