import users from "./users"
import {useState} from 'react'
function TempPlayground() {
  const pageSizes = [5, 10, 15]
  const [userData, setUserData] = useState(users);
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0])
  const [cursorPos, setCursorPos] = useState(0)
  function sortByName() {
    const sortVal = 'name'
    userData.sort((a, b) => {
      a[sortVal].localeCompare(b[sortVal])
    })
    setUserData([...userData])
  }
  return <>
    <label>
      Rows :
      <select onChange={(e) => {
        setCursorPos(0)
        setSelectedPageSize(Number(e.target.value))}}
        value={selectedPageSize}>
        {pageSizes.map(aPageSize => <option key={aPageSize}
          value={aPageSize}>{aPageSize}</option>)}
      </select>
      </label>
      <button onClick={() => setCursorPos(cursorPos - selectedPageSize)} disabled={cursorPos <= 0}>prev</button>
      <button onClick={() => setCursorPos(cursorPos + selectedPageSize)} disabled={cursorPos + selectedPageSize >= users.length}>next</button>
    <table>
      <thead><tr><th onClick={sortByName}>Name</th><th>Age</th><th>Occupation</th></tr></thead>
      <tbody>
        {users.slice(cursorPos, cursorPos+ selectedPageSize).map(aUser => <tr key={aUser.id}><td>{aUser.name}</td><td>{aUser.age}</td><td>{aUser.occupation}</td></tr>)}
      </tbody>
    </table></>
}

export default TempPlayground