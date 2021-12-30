import PVDOM from "./pvdom/pvdom.js";

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

PVDOM.render(vDOM);

setInterval(() => {
  vDOM.children[0].children[0].attributes.content = String(Math.random());
  PVDOM.render(vDOM);
}, 1000);

const input = document.getElementById("input-id");
input.oninput = handleInput;
function handleInput(e) {
  console.log(e.data);
}
