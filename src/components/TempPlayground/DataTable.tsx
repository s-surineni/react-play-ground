import users from './data'
import TableRows from './TableRows'
import type { User } from './types'

interface DataTableProps {
    data?: User[]
}

function DataTable({ data = users }: DataTableProps) {
    return <TableRows data={data} />
}

export default DataTable