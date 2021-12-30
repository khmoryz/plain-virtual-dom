function renderNode(node) {
  const nodeElement = document.createElement(node.tagName);
  for (const key in node.attributes) {
    nodeElement.setAttribute(key, node.attributes[key]);
  }

  node.children.forEach((child) => {
    if (child.tagName == "text") {
      nodeElement.innerText = child.attributes.content;
      return;
    }
    nodeElement.appendChild(renderNode(child));
  });

  return nodeElement;
}

export default renderNode;
