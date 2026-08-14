import data from './data.js'
import { useState } from 'react'
function DataTable() {
    const pageSizes = [5, 10, 15]
    const [pageSize, setPageSize] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const currentData = data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    return (
        <>
            <select onChange={e => setPageSize(e.target.value)}>
                {pageSizes.map(size => <option key={size} value={size}>{size}</option>)}
            </select>
            <table>
            <caption>People</caption>
            <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Occupation</th></tr></thead>
            <tbody>
                {currentData.map(row => <tr key={row['id']}><td>{row['id']}</td><td>{row['name']}</td><td>{row['age']}</td><td>{row['occupation']}</td></tr>)}

            </tbody>

        </table>
        </>)
}

export default DataTable
