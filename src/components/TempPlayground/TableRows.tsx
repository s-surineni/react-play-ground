import { useMemo, useState } from "react"
import type {User} from './types.ts'

interface TableRowsProps {
    data: User[]
}

function TableRows({ data }: TableRowsProps) {
    const [NAME, OCCUPATION, AGE] = ['name', 'occupation', 'age'] as const
    const ASC = 'Asc' , DESC ='Desc';
    type SortOrder = typeof ASC | typeof DESC
    const [sortCol, setSortCol] = useState<keyof User | null>(null)
    const [sortOrder, setSordOrder] = useState<SortOrder | null>(null)
    const rows = useMemo(() => {
        if (!sortCol || !sortOrder) return data
        const sorted = [...data].sort((a, b) => {
            const x = a[sortCol]
            const y = b[sortCol]
            return typeof x === 'number' && typeof y === 'number'
                ? x - y
                : String(x).localeCompare(String(y))
        })
        return sortOrder === DESC ? sorted.reverse() : sorted
    }, [data, sortCol, sortOrder, DESC])
    function  sortBy(sortKey: Exclude<keyof User, 'id'>) {
                    setSortCol(sortKey)        
                if (!sortOrder || sortOrder == DESC) {
                    setSordOrder(ASC)
                } else {
                    setSordOrder(DESC)
                }
    }
    return (
        <table>
            <caption>Users</caption>
            <thead>
                <tr>
                    <th scope="col" onClick={() => sortBy('name')}>Name</th>
                    <th scope="col" onClick={()=> sortBy(AGE)}>Age</th>
            <th scope="col" onClick={()=>sortBy(OCCUPATION
)}>Occupation</th>
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
