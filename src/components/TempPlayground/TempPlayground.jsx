import users from "./users"
import {useState} from 'react'
function TempPlayground() {
  const pageSizes = [5, 10, 15]
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0])
  return <>
    <label>
      Rows :
      <select onChange={(e) => setSelectedPageSize(e.target.value)}>
        {pageSizes.map(aPageSize => <option key={aPageSize}
          value={selectedPageSize}>{aPageSize}</option>)}
      </select>
      </label>
    <table>
      <thead><tr><th>Name</th><th>Age</th><th>Occupation</th></tr></thead>
      <tbody>
        {users.map(aUser => <tr key={aUser.id}><td>{aUser.name}</td><td>{aUser.age}</td><td>{aUser.occupation}</td></tr>)}
      </tbody>
    </table></>
}

export default TempPlayground