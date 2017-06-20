let g_countOfNumder = 0;
let g_list_element_input = document.createElement("ul");
document.body.appendChild(g_list_element_input);

document.getElementById("Add").onclick = addItem;
document.getElementById("Clean").onclick = clearList;
document.getElementById("Remove").onclick = removeElement;


function addItem() {
  g_countOfNumder += 1;

  let elementOfList = document.createElement("li");

  let inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.onchange = switchButtonRemove;
  inputCheckbox.className = "checkboxOfListElement";

  let nameElement = document.createElement("input");
  nameElement.className = "inputOfListElement";
  nameElement.type = "text";
  nameElement.value = "Item" + g_countOfNumder;

  elementOfList.appendChild(inputCheckbox);
  elementOfList.appendChild(nameElement);
  g_list_element_input.appendChild(elementOfList);
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

function clearList() {
  g_countOfNumder = 0;
  g_list_element_input.innerHTML = '';
}

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