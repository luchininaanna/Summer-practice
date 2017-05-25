var g_number = 0;
var listOfElements = document.createElement('ul');
document.body.appendChild(listOfElements);

document.getElementById("Add").onclick = function addItem() {
  g_number += 1;
  var element = document.createElement('li');
  var inputCheckbox = document.createElement('input');
  inputCheckbox.type = "checkbox";
  inputCheckbox.id = "id" + g_number;
  var askedNameElement = prompt("Введите имя элемента списка", "Item" + g_number);
  if ((askedNameElement) === null) {
    askedNameElement = "Item" + g_number;
  }
  var nameElement = document.createTextNode(askedNameElement);
  element.appendChild(inputCheckbox);
  element.appendChild(nameElement);
  listOfElements.appendChild(element);
  isChecked();
};

document.getElementById("Clean").onclick = function deletingItems() {
  g_number = 0;
  listOfElements.innerHTML = '';
};

document.getElementById("Remove").onclick = function removeElement() {
  for (var i = 1; i <= g_number; i += 1) {
    var amount = 0;
    var removeCheckbox = document.getElementById("id" + i);
    if (removeCheckbox.checked) {
      var removeElement = removeCheckbox.parentNode;
      if (removeElement) {
        removeElement.innerHTML = '';
        amount += 1;
      }
    }
  }
};

function isChecked() {
  for (var i = 1; i <= g_number; i += 1) {
    var removeCheckbox = document.getElementById("id" + i);
    if (removeCheckbox.checked) {
      document.getElementById("Remove").disabled = false;
    }
  }
}