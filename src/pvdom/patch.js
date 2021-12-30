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
      targetElement.innerText = target.value;
      break;
    default:
      console.error("invalid patch type");
      break;
  }
}

export default patch;
