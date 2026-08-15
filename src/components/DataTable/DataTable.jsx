import data from './data.js'
import { useState } from 'react'
import './DataTable.css'
function DataTable() {
    const pageSizes = [5, 10, 15]
    const [pageSize, setPageSize] = useState(pageSizes[0])
    const [pageNumber, setPageNumber] = useState(1)
    const pageCount = Math.ceil(data.length / pageSize)
    const currentData = data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    return (
        <>
            <div className="data-table__toolbar">
                <label>
                    Rows per page:{' '}
                    <select value={pageSize} onChange={e => {setPageSize(Number(e.target.value)); setPageNumber(1)}}>
                        {pageSizes.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </label>
                <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Previous</button>
                <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === pageCount}>Next</button>
            </div>
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
