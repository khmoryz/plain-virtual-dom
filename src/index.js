import diff from "./pvdom/diff.js";
import renderNode from "./pvdom/renderNode.js";
import patch from "./pvdom/patch.js";

const vDOM = {
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
    {
      tagName: "input",
      attributes: {
        id: "input-id",
        type: "text",
        content: "",
      },
      children: [],
    },
  ],
};

// ブラウザ表示中のオブジェクト
let currentVDOM;
currentVDOM = JSON.parse(JSON.stringify(vDOM));
const realElement = renderNode(vDOM);
document.body.appendChild(realElement);

setInterval(() => {
  vDOM.children[0].children[0].attributes.content = String(Math.random());
  const patchTagets = diff(currentVDOM, vDOM);
  if (typeof patchTagets !== "undefined") {
    patchTagets.forEach((patchTaget) => {
      patch(patchTaget);
    });
  }
  currentVDOM = JSON.parse(JSON.stringify(vDOM));
}, 1000);

const input = document.getElementById("input-id");
input.oninput = handleInput;
function handleInput(e) {
  console.log(e.data);
}
