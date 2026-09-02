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

function TempPlayground() {
  const [files, setFiles] = useState(folderStructure)
  const childIds = new Set(Object.values(files).flatMap((item) => item.children || []))
  const allIds = new Set(Object.keys(files).map(Number))
  const rootIds = [...allIds.difference(childIds)]

  const renameNode = (nodeId, newName) => {
    setFiles((prev) => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        name: newName,
      },
    }))
  }

  return rootIds.map((aRootId) => (
    <FileExplorer key={aRootId} files={files} node={aRootId} onRename={renameNode} />
  ))
}

function FileExplorer({ node, files, onRename }) {
  const [open, setOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [editValue, setEditValue] = useState(files[node].name)
  const current = files[node]

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    setIsRenaming(true)
    setEditValue(current.name)
  }

  const handleSubmit = () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== current.name) {
      onRename(node, trimmed)
    }
    setIsRenaming(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    } else if (e.key === "Escape") {
      setEditValue(current.name)
      setIsRenaming(false)
    }
  }

  return (
    <>
      <div
        onClick={() => {
          current.children && setOpen(!open)
        }}
        onDoubleClick={handleDoubleClick}
      >
        {isRenaming ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          current.name
        )}
      </div>
      <div className={styles.children}>
        {open &&
          current.children &&
          current.children.map((achildId) => (
            <FileExplorer
              key={achildId}
              files={files}
              node={achildId}
              onRename={onRename}
            />
          ))}
      </div>
    </>
  )
}
export default TempPlayground