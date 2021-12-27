const firstObj = {
  tagName: "div",
  attributes: { id: "div-id" },
  children: [
    {
      tagName: "p",
      attributes: { id: "p-id" },
      children: [
        {
          tagName: "text",
          attributes: { content: "this is virtual dom" },
        },
      ],
    },
  ],
};

// ブラウザ表示中のオブジェクト
let currentObj;
render(firstObj);

const seccondObj = {
  tagName: "p",
  attributes: { id: "div-id" },
  children: [
    {
      tagName: "p",
      attributes: { id: "p-id" },
      children: [
        {
          tagName: "text",
          attributes: { content: "this is virtual dom" },
        },
      ],
    },
  ],
};

const changes = diff(currentObj, seccondObj);
patch(changes);

function diff(oldObj, newObj) {
  if (oldObj.tagName != newObj.tagName) {
    const id = oldObj.attributes.id;
    const tagName = newObj.tagName;
    return {
      id: oldObj.attributes.id,
      type: "tagName",
      value: newObj.tagName,
    };
  }
}

function patch(target) {
  switch (target.type) {
    case "tagName":
      const targetElement = window.document.getElementById(target.id);
      const newElement = document.createElement(target.value);

      targetElement.replaceWith(newElement);
      break;
    default:
      console.error("invalid patch type");
      break;
  }
}

function render(obj) {
  currentObj = obj;
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
