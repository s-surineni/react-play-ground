import { useState } from "react"
import styles from './FileExplorer.module.css'

function FileExplorer({ data }) {
    return <FileList fileList={data} level={1} />
}
function FileList({ fileList, level }) {
    const directories = fileList.filter(file => file.children)
    directories.sort((a, b) => a.name.localeCompare(b.name))
    const files = fileList.filter(file => !file.children)
    console.log('files', JSON.stringify(files))
    files.sort((a, b) => {
        console.log('a, b', JSON.stringify(a), JSON.stringify(b))
        return a.name.localeCompare(b.name)
    })
    const items = [...directories, ...files]
    return items.map((fileItem) => (
        <ul className={styles["file-list"]}>
            <FileObject key={fileItem.id}
                file={fileItem}
                level={level} />
        </ul>))
}

function FileObject({ file, level }) {
    const [expanded, setExpanded] = useState(true)

    return (<li ><span onClick={() => setExpanded(prev => !prev)}>{file.name}</span>
        <div>{expanded && file.children ? <FileList fileList={file.children} level={level + 1} /> : null}</div></li>)
}
export default FileExplorer;