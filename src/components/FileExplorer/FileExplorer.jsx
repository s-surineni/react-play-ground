import { useState } from 'react';

function TreeNode({ node, onRename }) {
  const [open, setOpen] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [editValue, setEditValue] = useState(node.name);

  const isFolder = Array.isArray(node.children) && node.children.length > 0;

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
    setEditValue(node.name);
  };

  const handleSubmit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== node.name) {
      onRename(node.id, trimmed);
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setEditValue(node.name);
      setIsRenaming(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => isFolder && setOpen(!open)}
        style={{ cursor: isFolder ? 'pointer' : 'default' }}
      >
        {isFolder ? (open ? '📂' : '📁') : '📄'}{' '}
        {isRenaming ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 'inherit', fontFamily: 'inherit' }}
          />
        ) : (
          <span onDoubleClick={handleDoubleClick}>{node.name}</span>
        )}
      </div>
      {isFolder && open && (
        <div style={{ paddingLeft: '20px' }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onRename={onRename} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ folders, onRename }) {
  return (
    <>
      {folders.map((item) => (
        <TreeNode key={item.id} node={item} onRename={onRename} />
      ))}
    </>
  );
}