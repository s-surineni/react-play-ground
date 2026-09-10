import users from "./users"
function TempPlayground() {
  const pageSizes = [5, 10, 15]
  return <>
  <select>
    {pageSizes.map(aPageSize => <value>{aPageSize}</value>)}
    </select><table>
    <thead><tr><th>Name</th><th>Age</th><th>Occupation</th></tr></thead>
    <tbody>
      {users.map(aUser => <tr key={aUser.id}><td>{aUser.name}</td><td>{aUser.age}</td><td>{aUser.occupation}</td></tr>)}
    </tbody>
  </table></>
}

export default TempPlayground