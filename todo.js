let ourForm = document.getElementById("ourform")
let ourField = document.getElementById("ourfield")
let ourList = document.getElementById("ourlist")

ourForm.addEventListener("submit", (e) => {
  e.preventDefault()
  createItem(ourField.value)
})

function createItem(x) {
  let ourHTML = `<li>${x} <button onclick="deleteItem(this)"> delete</button></li>`
  ourList.insertAdjacentHTML("beforeend", ourHTML)
  ourField.value = ""
  ourField.focus()
}

function deleteItem(elementToDelete) {
  elementToDelete.parentElement.remove()
}