import React from 'react'
import MuiSnackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import { SvgIcon } from '@material-ui/core'
import { UiMutations } from '../../apollo/cache/mutations'
import { ReactComponent as CloseIcon } from '../../asset/svg/close.svg'
import { ReactComponent as ErrorIcon } from '../../asset/svg/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../asset/svg/icons/check.svg'
import Slide, { SlideProps } from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'

interface SnackbarProps {
  message?: string
  type: 'error' | 'success'
}

const variantIcon = {
  success: CheckIcon,
  error: ErrorIcon
}

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: '#2bab2b'
  },
  error: {
    backgroundColor: '#f44336'
  },
  icon: {
    fontSize: 20,
    marginRight: 10
  },
  closeIcon: {
    fontSize: 15
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

function SlideTransition(props: Omit<SlideProps, 'direction'>) {
  return <Slide {...props} direction="up" />
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type }) => {
  const classes = useStyles()

  const handleClose = (_: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    UiMutations.closeSnackbar()
  }

  if (!message) return null

  const IconType = variantIcon[type]

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" onClick={handleClose}>
        <SvgIcon className={classes.closeIcon} component="span">
          <CloseIcon fontSize="small" />
        </SvgIcon>
      </IconButton>
    </React.Fragment>
  )

  return (
    <div>
      <MuiSnackbar
        open={!!message}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <SnackbarContent
          action={action}
          className={classes[type]}
          message={
            <span id="client-snackbar" className={classes.message}>
              <SvgIcon component="span" className={classes.icon}>
                <IconType />
              </SvgIcon>
              {message}
            </span>
          }
        />
      </MuiSnackbar>
    </div>
  )
}

export default Snackbar
