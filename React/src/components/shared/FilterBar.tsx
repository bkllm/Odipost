// ********** COMPONENTS **********
import {
  Box,
  TextField,
  MenuItem,
  Button,
}                             from '@mui/material'

// ********** ICONS **********
import { Clear, RestartAlt }  from '@mui/icons-material'


// ********** PROPS **********
type FilterDefinition = {
  label:      string
  state:      string
  setState:   (val: string) => void
  options:    string[]
}

type FilterBarProps = {
  searchTerm:         string
  searchPlaceHolder:  string
  setSearchTerm:      (value: string) => void
  filters:            FilterDefinition[]
  onReset:            () => void
}


// ********** COMPONENT **********
const FilterBar = ({ searchTerm, searchPlaceHolder, setSearchTerm, filters, onReset }: FilterBarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        mb: 3,
      }}
    >

      {/* ********** SEARCHBAR ********** */}
      <TextField
        label="Search"
        placeholder={searchPlaceHolder}
        variant="outlined"
        size="small"
        sx={{ width: 400 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        slotProps={{
          input: {
            endAdornment: searchTerm && (
              <Clear
                onClick={() => setSearchTerm('')}
                sx={{ cursor: 'pointer', color: '#888', ml: 1 }}
              />
            ),
          },
        }}
      />


      {/* ********** FILTERS ********** */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>

        {filters.map((filter) => (
          <TextField
            key={filter.label}
            select
            label={filter.label}
            variant="outlined"
            size="small"
            sx={{ minWidth: 160 }}
            value={filter.state}
            onChange={(e) => filter.setState(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {filter.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        ))}


        {/* ********** RESET ********** */}
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<RestartAlt />}
          onClick={onReset}
          disabled={
            !searchTerm &&
            filters.every((f) => f.state === '')
          }
        >
          Reset
        </Button>

      </Box>

    </Box>
  )
}

export default FilterBar