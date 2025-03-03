let ourForm = document.getElementById("ourform")
let ourField = document.getElementById("ourfield")
let ourList = document.getElementById("ourlist")
let listSpace = document.getElementById("listSpace")

ourForm.addEventListener("submit", (e) => {
  e.preventDefault()
  createItem(ourField.value)
})

// function createList(y) {
//   let newList = `<div><h1>${y}</h1></div>`
//   let listName.insertAdjacentHTML("afterbeginning", newList)
//   let listNameField.value = ""
// }

function createItem(x) {
  let ourHTML = `<li>${x} <button onclick="deleteItem(this)"> delete</button></li>`
  ourList.insertAdjacentHTML("beforeend", ourHTML)
  ourField.value = ""
  ourField.focus()
}

function deleteItem(elementToDelete) {
  elementToDelete.parentElement.remove()
}