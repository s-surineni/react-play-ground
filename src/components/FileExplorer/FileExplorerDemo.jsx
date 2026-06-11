import { useState } from 'react';
import FileExplorer from './FileExplorer';

function renameInTree(nodes, id, newName) {
  return nodes.map(node => {
    if (node.id === id) {
      return { ...node, name: newName };
    }
    if (node.children) {
      return { ...node, children: renameInTree(node.children, id, newName) };
    }
    return node;
  });
}

export default function FileExplorerDemo() {
  const [data, setData] = useState([
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
  ]);

  const handleRename = (id, newName) => {
    setData(prev => renameInTree(prev, id, newName));
  };

  return <FileExplorer folders={data} onRename={handleRename} />;
}