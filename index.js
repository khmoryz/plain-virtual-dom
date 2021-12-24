const messageObj = {
  tagName: "div",
  children: [
    {
      tagName: "p",
      children: [
        {
          tagName: "text",
          attributes: "this is virtual dom",
        },
      ],
    },
  ],
};

render(messageObj);

function render(obj) {
  const realDOM = genRealDOM(obj);
  document.body.appendChild(realDOM);
}

function genRealDOM(obj) {
  if (obj.tagName == "text") {
    return document.createTextNode(obj.attributes);
  }

  const parent = document.createElement(obj.tagName);
  obj.children.forEach((child) => {
    parent.appendChild(genRealDOM(child));
  });
  return parent;
}
