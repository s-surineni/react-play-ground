import { useState } from "react"

const nodes = {
  1: {
    id:1,
    name:"src",
    type:"folder",
    children:[2,3]
  },

  2:{
    id:2,
    name:"App.jsx",
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
    return nodes.map(aNode => TreeNode(aNode))
}

function TreeNode({node}) {
  const [open, setOpen] = useState(false)
  if (node.type == "file") {
    return <div>
       📄 {node.name}
     </div>
  }
}