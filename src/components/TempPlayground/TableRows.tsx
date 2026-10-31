import { useMemo, useState } from "react"

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
        switch (sortKey) {
            case NAME:
            case OCCUPATION:
            case AGE:
                if (!sortOrder || sortOrder == DESC) {
                    setSortCol(sortKey)
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
