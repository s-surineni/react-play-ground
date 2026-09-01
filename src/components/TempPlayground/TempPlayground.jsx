import { useState } from 'react'
import styles from './TempPlayground.module.css'

const folderStructure = {
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

function renameInTree(nodes, id, newName) {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, name: newName }
    }
    if (node.children) {
      return { ...node, children: renameInTree(node.children, id, newName) }
    }
    return node
  })
}

function TempPlayground() {
  const [files, setFiles] = useState(folderStructure)

  const handleRename = (id, newName) => {
    setFiles((prev) => renameInTree(prev, id, newName))
  }

  return <FileExplorer files={files} onRename={handleRename} />
}

function FileItem({ aFile, onRename }) {
  const [open, setOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [editValue, setEditValue] = useState(aFile.name)
  const isFolder = Array.isArray(aFile.children)

  const save = () => {
    const next = editValue.trim()
    if (next && next !== aFile.name) {
      onRename(aFile.id, next)
    } else {
      setEditValue(aFile.name)
    }
    setIsRenaming(false)
  }

  return (
    <div>
      <span
        onClick={(e) => {
          e.stopPropagation()
          if (isFolder && !isRenaming) {
            setOpen((prev) => !prev)
          }
        }}
      >
        {isRenaming ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={save}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                save()
              }
              if (e.key === 'Escape') {
                setEditValue(aFile.name)
                setIsRenaming(false)
              }
            }}
          />
        ) : (
          <span
            onDoubleClick={(e) => {
              e.stopPropagation()
              setEditValue(aFile.name)
              setIsRenaming(true)
            }}
          >
            {aFile.name}
          </span>
        )}
      </span>
      {isFolder && open && (
        <div className={styles.children}>
          <FileExplorer files={aFile.children} onRename={onRename} />
        </div>
      )}
    </div>
  )
}

function FileExplorer({ files, onRename }) {
  return files.map((node) => (
    <FileItem key={node.id} aFile={node} onRename={onRename} />
  ))
}

export default TempPlayground
