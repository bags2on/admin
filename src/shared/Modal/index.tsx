import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core'
import { ReactComponent as CloseIcon } from '../../asset/svg/close.svg'
import { TransitionProps } from '@material-ui/core/transitions'

interface ModalProps {
  open: boolean
  onClose(): void
  children?: React.ReactElement
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 'none',
    borderRadius: '10px',
    border: '5px solid #4c4c4c',
    margin: 0,
    [theme.breakpoints.up('md')]: {
      margin: 30
    }
  },
  paperScrollPaper: {
    maxHeight: 'none'
  },
  scrollPaper: {
    marginTop: 220,
    [theme.breakpoints.up('md')]: {
      marginTop: 0
    }
  },
  closeButton: {
    position: 'absolute',
    color: '#fff',
    top: 7,
    right: 15,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}))

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      classes={{
        paper: classes.paper,
        paperScrollPaper: classes.paperScrollPaper,
        scrollPaper: classes.scrollPaper
      }}
    >
      {children}
      <IconButton disableRipple onClick={handleClose} className={classes.closeButton}>
        <SvgIcon component="span">
          <CloseIcon />
        </SvgIcon>
      </IconButton>
    </Dialog>
  )
}

export default Modal
