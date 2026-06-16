const initialNodes = {
  1: {
    id: 1,
    name: "src",
    type: "folder",
    children: [2, 3, 6, 10]
  },

  2: {
    id: 2,
    name: "App.jsx",
    type: "file"
  },

  3: {
    id: 3,
    name: "components",
    type: "folder",
    children: [4, 5]
  },

  4: {
    id: 4,
    name: "Button.jsx",
    type: "file"
  },

  5: {
    id: 5,
    name: "Header.jsx",
    type: "file"
  },

  6: {
    id: 6,
    name: "utils",
    type: "folder",
    children: [7, 8, 9]
  },

  7: {
    id: 7,
    name: "helpers.js",
    type: "file"
  },

  8: {
    id: 8,
    name: "api.js",
    type: "file"
  },

  9: {
    id: 9,
    name: "constants.js",
    type: "file"
  },

  10: {
    id: 10,
    name: "index.js",
    type: "file"
  }
}

export default function TempPlayground() {
  const childNodes = new Set(Object.values(initialNodes).flatMap(aNode => aNode.children || []))
  const rootNodes = Object.values(initialNodes).filter(node => !(childNodes.has(node.id)))
  console.log('childNodes', childNodes)
  console.log('rootNodes', rootNodes)
  return <>{rootNodes.map(aRootNode => <Folder node={aRootNode} />)}</>
}

function File({ name }) {
  return <>📄 {name}</>;
}

function Folder({ node }) {
  return (<>📁 {node.name}
  {node.children.map(child => child.name)}</>)
}