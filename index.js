const message = "this is virtual dom";
render(message);

function render(text) {
  const textNode = document.createTextNode(text);
  const pElement = document.createElement("p");
  pElement.appendChild(textNode);
  document.body.appendChild(pElement);
}

