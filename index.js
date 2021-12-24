const messageObj = {
  tagName: "p",
  children: ["this is virtual dom"],
};

render(messageObj);

function render(obj) {
  const pElement = document.createElement(obj.tagName);
  const textNode = document.createTextNode(messageObj.children[0]);
  pElement.appendChild(textNode);
  document.body.appendChild(pElement);
}
