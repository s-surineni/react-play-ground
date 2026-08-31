import { useState } from 'react'
import styles from './TempPlayground.module.css'

const folderStructure = [
  {
    id: 1,
    name: 'README.md',
  },
  {
    id: 2,
    name: 'Documents',
    children: [
      {
        id: 3,
        name: 'Word.doc',
      },
      {
        id: 4,
        name: 'Powerpoint.ppt',
      },
    ],
  },
  {
    id: 5,
    name: 'Downloads',
    children: [
      {
        id: 6,
        name: 'unnamed.txt',
      },
      {
        id: 7,
        name: 'Misc',
        children: [
          {
            id: 8,
            name: 'foo.txt',
          },
          {
            id: 9,
            name: 'bar.txt',
          },
        ],
      },
    ],
  },
]

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
