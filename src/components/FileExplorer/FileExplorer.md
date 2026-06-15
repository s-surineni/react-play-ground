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

**This logic runs in the parent component** (e.g., `FileExplorerNormalized`) before rendering any `TreeNode` components. The child components don't need to know about root detection — they just receive a node ID and render recursively.

Only nodes that are **not** in any folder's `children` array are rendered at the top level:

```js
// Inside FileExplorerNormalized component
const childIds = new Set()
Object.values(nodes).forEach(node => {
  if (node.children) {
    node.children.forEach(id => childIds.add(id))
  }
})
const rootNodes = Object.values(nodes).filter(node => !childIds.has(node.id))

// Then render only the roots:
return (
  <div>
    {rootNodes.map(node => (
      <TreeNode key={node.id} nodeId={node.id} nodes={nodes} />
    ))}
  </div>
)
```

#### Why this approach?

In a normalized structure, there's no explicit "root" field. Every node lives at the same level in the flat object. To find which nodes should appear at the top of the tree, we need to identify nodes that are **not children of any other node**.

#### How it works (step-by-step)

1. **Collect all child IDs**: Loop through every node and gather all IDs that appear in any `children` array into a `Set`
   - Using a `Set` gives O(1) lookup performance in the next step
   - Any ID in this set means "I'm someone's child, so I'm not a root"

2. **Filter for roots**: Loop through all nodes again and keep only those whose ID is **not** in the `childIds` set
   - If a node's ID doesn't appear in any `children` array, it has no parent → it's a root

#### Example walkthrough

Given this tree:

```
src/
├── components/
│   └── Button.jsx
└── App.jsx
```

State looks like:

```js
{
  1: { id: 1, name: "src", type: "folder", children: [2, 3] },
  2: { id: 2, name: "components", type: "folder", children: [4] },
  3: { id: 3, name: "App.jsx", type: "file" },
  4: { id: 4, name: "Button.jsx", type: "file" }
}
```

**Step 1**: Build `childIds` set
- Node 1 has children `[2, 3]` → add 2 and 3
- Node 2 has children `[4]` → add 4
- Result: `childIds = Set([2, 3, 4])`

**Step 2**: Filter for roots
- Node 1: `1` not in `childIds` ✅ **root**
- Node 2: `2` in `childIds` ❌ (child of node 1)
- Node 3: `3` in `childIds` ❌ (child of node 1)
- Node 4: `4` in `childIds` ❌ (child of node 2)

**Result**: `rootNodes = [node 1]` — only "src" renders at the top level

#### Time complexity

- **Build childIds**: O(n) — iterate through all nodes once
- **Filter roots**: O(n) — iterate through all nodes once, with O(1) set lookup
- **Total**: O(n) where n = total number of nodes

This is efficient because it requires only two passes through the data, regardless of tree depth.

#### Edge cases

**Orphaned nodes** — if a node's ID is referenced in a `children` array but doesn't exist in the nodes object, it won't cause an error (it just won't render):

```js
{
  1: { id: 1, name: "src", type: "folder", children: [2, 99] },  // 99 doesn't exist
  2: { id: 2, name: "App.jsx", type: "file" }
}
```
- `childIds = Set([2, 99])`
- Root: node 1
- Node 99 is referenced but doesn't exist, so nothing breaks

**Circular references** — if two nodes reference each other as children, both would be excluded from roots (neither would render):

```js
{
  1: { id: 1, name: "A", children: [2] },
  2: { id: 2, name: "B", children: [1] }  // circular!
}
```
- `childIds = Set([1, 2])`
- Roots: none (both IDs are in the set)
- **Prevention**: validate on mutation that you're not creating cycles

**Multiple roots** — the algorithm naturally handles forests (multiple trees):

```js
{
  1: { id: 1, name: "src", children: [2] },
  2: { id: 2, name: "App.jsx" },
  3: { id: 3, name: "public", children: [4] },  // separate tree
  4: { id: 4, name: "index.html" }
}
```
- `childIds = Set([2, 4])`
- Roots: nodes 1 and 3 (both "src" and "public" render at top level)

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