import data from './data.js'
function DataTable() {
    return (<table>
        <caption>People</caption>
        <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Occupation</th></tr></thead>
        <tbody>
           { data.map( row => <tr><td>{row['id']}</td><td>{row['name']}</td><td>{row['age']}</td><td>{row['occupation']}</td></tr>)}
            
        </tbody>

    </table>)
}

export default DataTable
