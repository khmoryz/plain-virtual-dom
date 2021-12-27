const firstObj = {
  tagName: "div",
  attributes: { id: "div-id", content: "" },
  children: [
    {
      tagName: "p",
      attributes: { id: "p-id", content: "" },
      children: [
        {
          tagName: "text",
          attributes: { id: "text-id", content: "this is virtual dom" },
        },
      ],
    },
  ],
};

// ブラウザ表示中のオブジェクト
let currentObj;
render(firstObj);

const seccondObj = {
  tagName: "div",
  attributes: { id: "div-id", content: "" },
  children: [
    {
      tagName: "p",
      attributes: { id: "p-id", content: "" },
      children: [
        {
          tagName: "text",
          attributes: { id: "text-id", content: "changed!!!" },
        },
      ],
    },
  ],
};

setTimeout(() => {
  const patchTagets = diff(currentObj, seccondObj);
  if (typeof patchTagets !== "undefined") {
    patchTagets.forEach((patchTaget) => {
      patch(patchTaget);
    });
  }
}, 3000);

function diff(oldObj, newObj) {
  let patchArray = [];
  diffNode(oldObj, newObj, patchArray);
  return patchArray;
}

function diffNode(oldNode, newNode, patchArray) {
  if (oldNode.tagName != newNode.tagName) {
    patchArray.push({
      id: oldNode.attributes.id,
      type: "tagName",
      value: newNode,
    });
  }
  if (oldNode.children && newNode.children) {
    // contentの更新対象は親ノードのidとなるため、先読みする
    for (let i = 0; i < oldNode.children.length; i++) {
      if (oldNode.children[i].attributes.content != newNode.children[i].attributes.content) {
        patchArray.push({
          id: oldNode.attributes.id,
          type: "content",
          value: newNode.children[i].attributes.content,
        });
      }
      diffNode(oldNode.children[i], newNode.children[i], patchArray);
    }
  }
  return;
}

function patch(target) {
  let targetElement;
  let newElement;
  switch (target.type) {
    case "tagName":
      targetElement = window.document.getElementById(target.id);
      newElement = document.createElement(target.value);
      targetElement.replaceWith(newElement);
      break;
    case "content":
      targetElement = window.document.getElementById(target.id);
      targetElement.parentElement.innerText = target.value;
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
