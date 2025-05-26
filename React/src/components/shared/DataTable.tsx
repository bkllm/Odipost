import { useState, useMemo } from 'react'

// ********** COMPONENTS **********
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Box,
  Paper,
  Pagination,
  TextField,
  MenuItem,
}                     from '@mui/material'

// ********** ICONS **********
import { SearchOff }  from '@mui/icons-material'

// ********** PROPS **********
export type Column<T> = {
  label:      string
  key:        keyof T
  sortable?:  boolean
  render?:    (row: T) => React.ReactNode
}

type DataTableProps<T> = {
  columns:          Column<T>[]
  rows:             T[]
  totalPages:       number
  page:             number
  pageSize:         number
  onPageChange:     (page: number) => void
  onPageSizeChange: (size: number) => void
  onRowClick?:      (row: T) => void
}

// ********** COMPONENT **********
const DataTable = <T,>({
  columns,
  rows,
  totalPages,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,
}: DataTableProps<T>) => {
  
  // ********** DATA **********
  const [sortKey, setSortKey]           = useState<keyof T>(columns[0].key)
  const [sortOrder, setSortOrder]       = useState<'asc' | 'desc'>('asc')
  const sortedRows                      = useMemo(() => {
    return [...rows].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      }

      return 0
    })
  }, [rows, sortKey, sortOrder])

  return (
    <>

      {/* ******************** TABLE ******************** */}
      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2, height: '56vh', overflowY: 'auto' }}>
        <Table stickyHeader size="small">
          
          {/* ********** TABLE HEAD ********** */}
          <TableHead>
            <TableRow>
              {columns.map(({ label, key, sortable }) => (
                <TableCell key={String(key)} sortDirection={sortKey === key ? sortOrder : false}>
                  {sortable ? (
                    <TableSortLabel
                      active={sortKey === key}
                      direction={sortKey === key ? sortOrder : 'asc'}
                      onClick={() => {
                        if (sortKey === key) {
                          setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
                        } else {
                          setSortKey(key)
                          setSortOrder('asc')
                        }
                      }}
                    >
                      <strong>{label}</strong>
                    </TableSortLabel>
                  ) : (
                    <strong>{label}</strong>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>


          {/* ********** TABLE BODY ********** */}
          <TableBody>
            {sortedRows.length > 0 ? (
              sortedRows.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ cursor: onRowClick ? 'pointer' : 'default', '&:hover': { backgroundColor: '#f0f4f8' } }}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map(({ key, render }) => (
                    <TableCell key={String(key)}>
                      {render ? render(row) : (row[key] as string)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // ********** NO RESULTS **********
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Box sx={{ py: 6, opacity: 0.6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <SearchOff sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="subtitle1">No results found.</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>

      {/* ******************** PAGINATION ******************** */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5, position: 'relative' }}>
        
        {/* ********** PAGES ********** */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
        />
        
        {/* ********** ROWS ********** */}
        <Box sx={{ position: 'absolute', right: 0 }}>
          <TextField
            select
            size="small"
            label="Rows per page"
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value))
            }}
            sx={{ minWidth: 140 }}
          >
            {[10, 20, 30, 50].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Box>

      </Box>

    </>
  )
}

export default DataTable