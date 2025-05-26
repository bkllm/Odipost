import type { ReactNode }   from 'react'

// ********** COMPONENTS **********
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
}                           from '@mui/material'
import type { DialogProps } from '@mui/material'

// ********** ICONS **********
import CloseIcon from '@mui/icons-material/Close'


// ********** PROPS **********
type ModalDetailProps = {
  open:       boolean
  title:      string
  onClose:    () => void
  children?:  ReactNode
  maxWidth?:  DialogProps['maxWidth']  // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}


const Modal = ({ open, title, onClose, children, maxWidth = 'lg' }: ModalDetailProps) => {

  return (    
    /* ******************** MODAL ******************** */
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>

      {/* ********** TITLE ********** */}
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}

        {/* ****** ICON ****** */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>

      {/* ********** CONTENT ********** */}
      <DialogContent dividers>
        {children}
      </DialogContent>

    </Dialog>
  )
}

export default Modal