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
    return <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
      📁 {node.name}
      {open && node.children && (
        <div style={{ paddingLeft: "20px" }}>
          {node.children.map(childId => 
            <TreeNode node={nodes[childId]} key={childId} />
          )}
        </div>
      )}
    </div>
  }
  return null
}