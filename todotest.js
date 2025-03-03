let listSpace = document.getElementById("listSpace");

function createList() {
    const listName = prompt("Enter the name of the list:");
    if (listName) {
        let ourHTML = `<div class="list"><h1>${listName}</h1></div>`;
        listSpace.insertAdjacentHTML("beforeend", ourHTML);
    }
}
