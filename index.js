const messageObj = {
  tagName: "p",
  children: "this is virtual dom",
};

render(messageObj);

function render(obj) {
  const pElement = document.createElement(obj.tagName);
  const textNode = document.createTextNode(messageObj.children);
  pElement.appendChild(textNode);
  document.body.appendChild(pElement);
}
