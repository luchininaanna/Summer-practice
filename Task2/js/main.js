let g_countingNumder = 0;
let g_listOfElements = document.createElement("ul");
document.body.appendChild(g_listOfElements);

document.getElementById("Add").onclick = addItem;

function addItem() {
  g_countingNumder += 1;

  let elementOfList = document.createElement("li");

  let inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.onchange = switchButtonRemove;
  inputCheckbox.className = "checkboxOfListElement";

  let nameElement = document.createElement("input");
  nameElement.className = "inputOfListElement";
  nameElement.type = "text";
  nameElement.value = "Item" + g_countingNumder;

  elementOfList.appendChild(inputCheckbox);
  elementOfList.appendChild(nameElement);
  g_listOfElements.appendChild(elementOfList);
}

function switchButtonRemove() {
  if (checkStatusOfCheckbox()) {
    document.getElementById("Remove").disabled = false;
  } else {
    document.getElementById("Remove").disabled = true;
  }
}

function checkStatusOfCheckbox() {
  let listOfCheckbox = document.getElementsByClassName("checkboxOfListElement");
  let amountOfCheckboxInList = listOfCheckbox.length;

  for (let i = 0; i < amountOfCheckboxInList; i++) {
    if (listOfCheckbox[i].checked) {
      return true;
    }
  }
  return false;
}

document.getElementById("Clean").onclick = deletingItems;

function deletingItems() {
  g_countingNumder = 0;
  g_listOfElements.innerHTML = '';
}

document.getElementById("Remove").onclick = removeElement;

function removeElement() {
  let listOfCheckbox = document.getElementsByClassName("checkboxOfListElement");
  let amountOfCheckboxInList = listOfCheckbox.length;

  for (let i = 0; i < amountOfCheckboxInList; i++) {
    if (listOfCheckbox[i].checked) {
      let removeElement = listOfCheckbox[i].parentNode;
      removeElement.innerHTML = "";
      amountOfCheckboxInList--;
      i--
    }
  }
  document.getElementById("Remove").disabled = true;
}