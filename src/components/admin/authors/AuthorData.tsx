/* eslint-disable */
import React from 'react'
import { useTable } from 'react-table'
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import { AuthorWithID } from '@db'
import { useRouter } from 'next/router'
interface Props {
  data: AuthorWithID[]
  deleteAuth: (id: string) => void
}

const AuthorData: React.FC<Props> = ({ data, deleteAuth }): JSX.Element => {
  const router = useRouter()
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Surname',
        accessor: 'surname',
      },
      {
        Header: 'Date of birth',
        accessor: 'dateOfBirth',
      },
      {
        Header: 'Date of death',
        accessor: 'dateOfDeath',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <Table {...getTableProps()} mt={10}>
      <Thead>
        {headerGroups.map((headerGroup, i) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, j) => (
              <Th {...column.getHeaderProps()} key={j}>
                {column.render('Header')}
              </Th>
            ))}
            <Th>Delete</Th>
            <Th>More</Th>
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, j) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()} key={j}>
              {row.cells.map((cell, i) => {
                return (
                  <Td {...cell.getCellProps()} key={i}>
                    {cell.render('Cell')}
                  </Td>
                )
              })}

              <Td>
                <Button
                  type="button"
                  onClick={() => deleteAuth(row.original._id)}
                >
                  Delete
                </Button>
              </Td>
              <Td>
                <Button
                  type="button"
                  onClick={() =>
                    router.push(`/admin/authors/${row.original._id}`)
                  }
                >
                  More
                </Button>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default AuthorData
