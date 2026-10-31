import { useState } from "react"

export interface User {
    id: number
    name: string
    age: number
    occupation: string
}

interface TableRowsProps {
    data: User[]
}

function TableRows({ data }: TableRowsProps) {
    const [NAME, OCCUPATION, AGE] = ['name', 'occupation', 'age'] as const
    const [ASC, DESC] = ['Asc', 'Desc'] as const;
    const [sortCol, setSortCol] = useState<keyof User | null>(null)
    const [sortOrder, setSordOrder] = useState<ASC | DESC | null>(null)
    const [rows, setRows] = useState(data)
    function  sortBy(sortKey: Exclude<keyof User, 'id'>) {
        switch (sortKey) {
            case NAME:
            case OCCUPATION:
                if (!sortOrder || sortOrder == DESC) {
                    const newRows = [...rows]
                    newRows.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
                    setRows(newRows)
                    setSortCol(sortKey)
                }
                break
            case AGE:
                if (!sortOrder || sortOrder == DESC) {
                    const newRows = [...rows]
                    newRows.sort((a, b) => a[AGE] - (b[AGE]))
                    setRows(newRows)
                    setSordOrder(ASC)
                }
        }
    }
    return (
        <table>
            <caption>Users</caption>
            <thead>
                <tr>
                    <th scope="col" onClick={() => sortBy('name')}>Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Occupation</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={3}>No users found</td>
                    </tr>
                ) : (
                    rows.map(({ id, name, age, occupation }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{occupation}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default TableRows;
