import type { ChipPropsColorOverrides } from '@mui/material'
import type { OverridableStringUnion }  from '@mui/types'

export const getStatusColor = (
  status: string
): OverridableStringUnion<
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  ChipPropsColorOverrides
> => {
  switch (status) {
    case 'Available':
      return 'success'
    case 'InUse':
    case 'Driving':
      return 'error'
    case 'Maintenance':
    case 'OnLeave':
      return 'warning'
    case 'Unavailable':
      return 'default'
    default:
      return 'default'
  }
}