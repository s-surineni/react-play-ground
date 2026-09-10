import users from "./users"
function TempPlayground() {
  return <table>
    <thead><tr><th>Name</th><th>Age</th><th>Occupation</th></tr></thead>
    <tbody>
      {users.map(aUser => <tr key={aUser.id}><td>{aUser.name}</td></tr>)}
    </tbody>
  </table>
}

export default TempPlayground