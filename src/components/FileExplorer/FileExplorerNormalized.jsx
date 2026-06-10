import { useState } from "react"

const nodes = {
  1: {
    id:1,
    name:"src",
    type:"folder",
    children:[2,3,6,10]
  },

  2:{
    id:2,
    name:"App.jsx",
    type:"file"
  },

  3: {
    id:3,
    name:"components",
    type:"folder",
    children:[4,5]
  },

  4: {
    id:4,
    name:"Button.jsx",
    type:"file"
  },

  5: {
    id:5,
    name:"Header.jsx",
    type:"file"
  },

  6: {
    id:6,
    name:"utils",
    type:"folder",
    children:[7,8,9]
  },

  7: {
    id:7,
    name:"helpers.js",
    type:"file"
  },

  8: {
    id:8,
    name:"api.js",
    type:"file"
  },

  9: {
    id:9,
    name:"constants.js",
    type:"file"
  },

  10: {
    id:10,
    name:"index.js",
    type:"file"
  }
}

// Why?

// faster lookup
// easy updates
// no deep cloning

// Component design
// FileExplorer

//  ├── Tree
//  │
//  ├── TreeNode
//  │       |
//  │       ├── Folder
//  │       └── File
//  │
//  └── ContextMenu
export default function FileExplorerNormalized() {
    return Object.values(nodes).map(aNode => <TreeNode node={aNode} key={aNode.id} />)
}

function TreeNode({node}) {
  const [open, setOpen] = useState(false)
  if (node.type == "file") {
    return <div>
       📄 {node.name}
     </div>
  }
  if (node.type == "folder") {
    return (
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        📁 {node.name}
        {open && node.children && (
          <div style={{ paddingLeft: "20px" }}>
            {node.children.map(childId => 
              nodes[childId] ? <TreeNode key={childId} node={nodes[childId]} /> : null
            )}
          </div>
        )}
      </div>
    )
  }
  return null
}

// Follow-up: "How do you handle 100,000 files?"
// 1. Virtualization

// Only render visible rows.
// we flatten the tree  because virtualized lists work on a flat list, not a recursive tree.
// A recursive renderer does:

// <TreeNode node={root}/> recursive

// and each node decides whether to render children.

// But virtualization needs something like:

// items.map(item => <Row item={item}/>) iterative
// because it needs to know:

// item index
// item height
// visible range

// Follow-up: Lazy loading folders

// Interviewer:

// What if folders are huge?

// Don't fetch everything.

// Updating tree (important)

// Question:

// Rename a file. How?