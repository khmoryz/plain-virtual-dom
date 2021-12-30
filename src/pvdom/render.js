function render(obj) {
  const realDOM = genRealDOM(obj);
  document.body.appendChild(realDOM);
}

function genRealDOM(obj) {
  const parent = document.createElement(obj.tagName);
  if (obj.attributes.id) {
    parent.setAttribute("id", obj.attributes.id);
  }
  if (obj.attributes.type) {
    parent.setAttribute("type", obj.attributes.type);
  }
  if (obj.attributes.oninput) {
    parent.setAttribute("oninput", obj.attributes.oninput);
  }

  obj.children.forEach((child) => {
    if (child.tagName == "text") {
      parent.innerText = child.attributes.content;
      return;
    }
    parent.appendChild(genRealDOM(child));
  });

  return parent;
}

export default render;
