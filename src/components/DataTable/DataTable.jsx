import data from './data.js'
function DataTable({data =[]}) {
    return (<table>
        <caption>People</caption>
        <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Occupation</th></tr></thead>
        <tbody>
           { data.map( row => <tr><td>ID</td><td>ID</td><td>ID</td><td>ID</td></tr>)}
            
        </tbody>

    </table>)
}

export default DataTable
