var number = 0;
var ul = document.createElement('ul');
document.body.appendChild(ul);
function addItem() {
  number += 1;
  var li = document.createElement('li');
  li.appendChild(document.createTextNode('Item ' + number));
  ul.appendChild(li);
}
function deletingItems() {
  number = 0;
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }
}

