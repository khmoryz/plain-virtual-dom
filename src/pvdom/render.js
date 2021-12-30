function render(obj) {
  const realDOM = genRealDOM(obj);
  document.body.appendChild(realDOM);
}

function genRealDOM(obj) {
  const parent = document.createElement(obj.tagName);
  parent.setAttribute("id", obj.attributes.id);

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
