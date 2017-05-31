let g_countingNumder = 0;
let listOfElements = document.createElement("ul");
document.body.appendChild(listOfElements);

document.getElementById("Add").onclick = function addItem() {
  g_countingNumder += 1;

  let elementOfList = document.createElement("li");

  let inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.onchange = switchButtonRemove;
  inputCheckbox.name = "checkbox";

  let nameElement = document.createElement("input");
  nameElement.type = "text";
  nameElement.value = "Item" + g_countingNumder;

  elementOfList.appendChild(inputCheckbox);
  elementOfList.appendChild(nameElement);
  listOfElements.appendChild(elementOfList);
};

function switchButtonRemove() {
  if (checkStatusOfCheckbox()) {
    document.getElementById("Remove").disabled = false;
  } else {
    document.getElementById("Remove").disabled = true;
  }
}

function checkStatusOfCheckbox() {
  let listOfCheckbox = document.getElementsByName("checkbox");
  let amountOfCheckboxInList = listOfCheckbox.length;

  for (let i = 0; i < amountOfCheckboxInList; i++) {
    if (listOfCheckbox[i].checked) {
      return true;
    }
  }
  return false;
}

document.getElementById("Clean").onclick = function deletingItems() {
  g_countingNumder = 0;
  listOfElements.innerHTML = '';
};

document.getElementById("Remove").onclick = function removeElement() {
  let listOfCheckbox = document.getElementsByName("checkbox");
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
};