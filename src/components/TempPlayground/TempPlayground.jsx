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
  const childIds = new Set(Object.values(folderStructure).flatMap((item) => item.children || []))
  console.log(childIds)
  const allIds = new Set(Object.keys(folderStructure).map(Number))
  console.log(allIds)
  const rootIds = [...allIds.difference(childIds)]
  console.log(rootIds)
  return rootIds.map((aRootId) => <FileExplorer key={aRootId} files={folderStructure} node={aRootId} />)
}

function FileExplorer({ node, files }) {
  const [open, setOpen] = useState(false)
  return <><div onClick={(e) => {
    files[node].children && setOpen(!open)
  }}>{files[node].name}</div>
    <div  className={styles.children}>
      {open && files[node].children && files[node].children.map(achildId => <FileExplorer key={achildId} files={files} node={achildId} />)}
    </div>
  </>

}
export default TempPlayground