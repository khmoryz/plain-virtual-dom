import diff from "./pvdom/diff.js";
import render from "./pvdom/render.js";
import patch from "./pvdom/patch.js";

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
    {
      tagName: "input",
      attributes: {
        id: "input-id",
        type: "text",
        oninput: "inputChange()",
        content: "",
      },
      children: [],
    },
  ],
};

// ブラウザ表示中のオブジェクト
let currentObj;
currentObj = firstObj;
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
    {
      tagName: "input",
      attributes: {
        id: "input-id",
        type: "text",
        oninput: "inputChange()",
        content: "",
      },
      children: [],
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
