import data from './data.js'
import { useState } from 'react'
function DataTable() {
    const [pageSizes, setPageSizes] = useState([5, 10, 15])
    return (
        <>
            <select>
                {pageSizes.map(size => <option key={size} value={size}>{size}</option>)}
            </select>
            <table>
            <caption>People</caption>
            <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Occupation</th></tr></thead>
            <tbody>
                {data.map(row => <tr key={row['id']}><td>{row['id']}</td><td>{row['name']}</td><td>{row['age']}</td><td>{row['occupation']}</td></tr>)}

            </tbody>

        </table>
        </>)
}

export default DataTable
