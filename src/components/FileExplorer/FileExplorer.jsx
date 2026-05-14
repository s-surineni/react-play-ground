import { useState } from 'react';
export default function FileExplorer({ folders }) {
    const renderContent = [];
    const [expanded, setExpanded] = useState(true);
    return <>
        {folders.map((aFolder) => {
            renderContent.push(<div onClick={()=>setExpanded(!expanded)}>{aFolder.name}</div>);
            if (aFolder.children && expanded) {
                renderContent.push(<div style={{ paddingLeft: '20px' }}><FileExplorer folders={aFolder.children} /></div>);
            }
        })}
        {renderContent}
    </>
}