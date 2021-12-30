import PVDOM from "./pvdom/pvdom.js";

const vDOM = {
  tagName: "div",
  attributes: { id: "div-id", content: "" },
  children: [
    {
      tagName: "h3",
      attributes: { id: "p-id", content: "" },
      children: [
        {
          tagName: "text",
          attributes: { id: "text-id", content: "入力内容: " },
        },
      ],
    },
    {
      tagName: "input",
      attributes: {
        id: "input-id",
        type: "text",
        size: 30,
        content: "",
      },
      children: [],
    },
  ],
};

PVDOM.render(vDOM);

setInterval(() => {
  PVDOM.render(vDOM);
}, 30);

const input = document.getElementById("input-id");
input.oninput = handleInput;
function handleInput(e) {
  if (e.data) {
    vDOM.children[0].children[0].attributes.content += e.data;
  }
}
