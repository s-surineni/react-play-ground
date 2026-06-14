# File Explorer — Architecture & Features

## Overview

This repo contains two implementations of a file explorer component:

| Component | Approach | State Shape |
|-----------|----------|-------------|
| `FileExplorer.jsx` | Recursive — nested array of objects | `[{ id, name, children: [...] }]` |
| `FileExplorerNormalized.jsx` | Normalized — flat object keyed by id | `{ [id]: { id, name, type, children: [ids] } }` |

The normalized approach is preferred for large trees because updates are **O(1)** per node (no deep cloning or recursive traversal).

---

## Normalized State Structure

```js
nodes = {
  1: { id: 1, name: "src", type: "folder", children: [2, 3, 6, 10] },
  2: { id: 2, name: "App.jsx", type: "file" },
  3: { id: 3, name: "components", type: "folder", children: [4, 5] },
  // ...
}
```

### Why normalized?

- **Faster lookup** — `nodes[id]` is O(1) vs. recursive search
- **Easy updates** — only the changed node is cloned, siblings/ancestors are untouched
- **No deep cloning** — a shallow spread is sufficient

---

## Rename Feature (FileExplorerNormalized.jsx)

### Data Flow

```
User double-clicks name
  → handleDoubleClick() sets isRenaming=true
    → <input> appears with current name
      → User types new name → editValue updates locally
        → User presses Enter or clicks away
          → handleSubmit() validates input
            → renameNode(id, newName) updates parent state
              → React re-renders with new name
                → isRenaming=false → label shows updated name
```

### Key Pieces

#### 1. `renameNode` — the state updater (O(1))

```js
const renameNode = (nodeId, newName) => {
  setNodes(prev => ({
    ...prev,                       // shallow-copy all other nodes (unchanged)
    [nodeId]: {                    // replace only the target node
      ...prev[nodeId],             // copy all its existing properties
      name: newName                // override just the name
    }
  }))
}
```

Because the store is flat, no recursion is needed — unlike the nested approach where every ancestor up to the root must be cloned.

#### 2. Local editing state (per TreeNode)

```js
const [isRenaming, setIsRenaming] = useState(false)
const [editValue, setEditValue] = useState(node.name)
```

- `isRenaming` — toggles between label and `<input>`
- `editValue` — tracks the in-progress edit locally before committing

#### 3. Double-click to enter rename mode

```js
const handleDoubleClick = (e) => {
  e.stopPropagation()       // prevent click from bubbling to parent (folder toggle)
  setIsRenaming(true)
  setEditValue(node.name)   // pre-fill input with current name
}
```

- **Files**: `onDoubleClick` is on the outer `<div>`
- **Folders**: `onDoubleClick` is on the `<span>` around the name

#### 4. The input replaces the label

```jsx
{isRenaming ? (
  <input
    autoFocus
    value={editValue}
    onChange={(e) => setEditValue(e.target.value)}
    onBlur={handleSubmit}
    onKeyDown={handleKeyDown}
    onClick={(e) => e.stopPropagation()}
    style={{ fontSize: "inherit", fontFamily: "inherit" }}
  />
) : (
  node.name
)}
```

- `autoFocus` — input gets focus immediately
- `onClick={e.stopPropagation()}` — clicking the input doesn't trigger folder toggle
- Inline `font-size` / `font-family` so the input blends in visually

#### 5. Submit validation

```js
const handleSubmit = () => {
  const trimmed = editValue.trim()
  if (trimmed && trimmed !== node.name) {
    renameNode(node.id, trimmed)
  }
  setIsRenaming(false)
}
```

Triggered by:
- **Enter** key
- **Blur** (clicking away)

#### 6. Cancel

```js
if (e.key === "Escape") {
  setEditValue(node.name)    // reset to original
  setIsRenaming(false)       // return to display mode
}
```

---

## Rename Feature (FileExplorer.jsx — recursive approach)

Uses a recursive `renameInTree` helper:

```js
function renameInTree(nodes, id, newName) {
  return nodes.map(node => {
    if (node.id === id) {
      return { ...node, name: newName }
    }
    if (node.children) {
      return { ...node, children: renameInTree(node.children, id, newName) }
    }
    return node
  })
}
```

- Must walk the entire tree and clone every ancestor on the path to the target node
- O(n) worst case vs. O(1) for the normalized approach

---

## Tree Structure Rendering

### Root node detection (normalized)

Only nodes that are **not** in any folder's `children` array are rendered at the top level:

```js
const childIds = new Set()
Object.values(nodes).forEach(node => {
  if (node.children) {
    node.children.forEach(id => childIds.add(id))
  }
})
const rootNodes = Object.values(nodes).filter(node => !childIds.has(node.id))
```

### Preventing child clicks from toggling parent folders

The folder header (`onClick={() => setOpen(!open)}`) is separated from the children container:

```jsx
<div>
  <div onClick={() => setOpen(!open)}>    {/* toggle on header only */}
    📁 {name}
  </div>
  {open && children && (
    <div style={{ paddingLeft: "20px" }}>  {/* children don't trigger toggle */}
      {children.map(childId => <TreeNode ... />)}
    </div>
  )}
</div>
```

Without this, clicking a child would bubble up to the parent folder's `onClick`, closing it.

---

## Feature Ideas

- [x] Expand/collapse folders
- [x] Rename files and folders
- [ ] Delete files/folders
- [ ] Create new folder
- [ ] Lazy-load children
- [ ] Search files by name
- [ ] Drag and drop
- [ ] Permissions (read-only files)

---

## Performance: Handling 100,000+ Files

### Virtualization

Only render visible rows. Flatten the tree into a list because virtualized lists work on flat arrays:

```jsx
// Recursive (doesn't work with virtualization)
<TreeNode node={root} />

// Iterative (works with virtualization)
items.map(item => <Row item={item} />)
```

Virtualization needs:
- Item index
- Item height
- Visible range

### Search Optimization

Naive: DFS every time — O(n)

For large trees, build an index:

```js
{
  "app.jsx": [2],
  "button.jsx": [5]
}
```

Search becomes O(1).

---

## Drag and Drop

When moving a node from one parent to another:

```
A            C
├── B   →   └── B
```

Operations:
1. Remove from old parent: `oldParent.children = oldParent.children.filter(id => id !== nodeId)`
2. Add to new parent: `newParent.children.push(nodeId)`

With normalized state, both operations are O(1).

---

## Permissions (Senior-level discussion)

Model:

```js
{
  name: "config.json",
  permissions: { read: true, write: false }
}
```

UI:

```jsx
{canEdit && <RenameButton />}
```

> **Note**: UI hides controls but the backend enforces permissions.

---

## Architecture: Google Drive-level Design

```
React
  → Tree virtualization
    → Query cache
      → File API
        → Backend
          → Database
```

**Frontend owns**: selection, expansion, optimistic updates

**Backend owns**: hierarchy, permissions, persistence