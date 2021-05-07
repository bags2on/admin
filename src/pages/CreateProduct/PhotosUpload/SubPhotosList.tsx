import React, { useState, useEffect } from 'react'
import cloneDeep from 'lodash.clonedeep'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { ReactComponent as AddIcon } from '../../../asset/svg/add.svg'
import FileReader from '../../../components/FileReader/FileReader'
import { getFileReaderError } from '../../../utils/errorsByCode'
import { makeStyles } from '@material-ui/core/styles'

type File = {
  name?: string
  preview: string
}

interface SubPhotosListProps {
  min: number
  max: number
  subPhotos: File[]
  acceptedTypes: string[]
  onSubPhotoUpload(newFiles: File[]): void
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    width: 440 // TODO not the best solution
  },
  readerList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& > li': {
      padding: '0 5px 5px 0'
    },
    '& > li:nth-child(3n)': {
      paddingRight: 0
    }
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    height: 24,
    fontSize: 14,
    color: '#ff182e',
    opacity: 0,
    transition: 'all 0.33s linear'
  },
  addButton: {
    '&:hover': {
      backgroundColor: 'transparent',
      '& $addIcon': {
        fill: theme.palette.primary.main
      }
    }
  },
  addIcon: {
    fontSize: 43,
    fill: '#6c6ea9',
    transition: 'fill .2s'
  }
}))

function useErrorStatus(code: string, callback: (t: string) => void): string {
  const [message, setMessage] = useState<string>('')

  let timerID: NodeJS.Timeout

  useEffect(() => {
    setMessage(getFileReaderError(code))
    return () => {
      if (timerID) {
        clearTimeout(timerID)
      }
    }
  })

  if (message) {
    timerID = setTimeout(() => {
      callback('')
      setMessage('')
    }, 3000)
  }

  return message
}

const SubPhotosList: React.FC<SubPhotosListProps> = ({ min, max, subPhotos, onSubPhotoUpload, acceptedTypes }) => {
  const classes = useStyles()

  const [errorCode, setErrorCode] = useState<string>('')

  const validationError = useErrorStatus(errorCode, setErrorCode)

  const addFileHandler = (file: File, position: number): void => {
    const updatedPhotos = cloneDeep(subPhotos)

    const newFile: File = file
    newFile.preview = URL.createObjectURL(file)

    updatedPhotos[position] = newFile
    onSubPhotoUpload(updatedPhotos)
  }

  const deleteFileHandler = (position: number, photoOnly: boolean): void => {
    const updatedPhotos = cloneDeep(subPhotos)

    URL.revokeObjectURL(updatedPhotos[position].preview)

    if (subPhotos.length <= min) {
      updatedPhotos[position] = { preview: '' }
      onSubPhotoUpload(updatedPhotos)
      return
    }

    if (!photoOnly) {
      updatedPhotos.splice(position, 1)
      onSubPhotoUpload(updatedPhotos)
      return
    }

    updatedPhotos[position] = { preview: '' }

    onSubPhotoUpload(updatedPhotos)
  }

  const handleAddReaderClick = (): void => {
    if (subPhotos.length === max) return
    const prevPhotos = cloneDeep(subPhotos)
    onSubPhotoUpload([...prevPhotos, { preview: '' }])
  }

  const handleErrorUpload = (code: string): void => {
    setErrorCode(code)
  }

  return (
    <div className={classes.root}>
      <Grid container component="ul" className={classes.readerList}>
        {subPhotos.map((photo, ind) => (
          <Zoom key={ind} in timeout={ind + 1 <= min ? 0 : 500}>
            <Grid xs={4} item key={ind} component="li">
              <FileReader
                position={ind}
                deletePhotoOnly
                withErrors={false}
                preview={photo.preview}
                required={ind > min - 1}
                onAdd={addFileHandler}
                onDelete={deleteFileHandler}
                onError={handleErrorUpload}
                acceptedTypes={acceptedTypes}
              />
            </Grid>
          </Zoom>
        ))}
        {subPhotos.length < max && (
          <Grid item xs={4} className={classes.buttonBox} component="li">
            <IconButton disableRipple className={classes.addButton} onClick={handleAddReaderClick}>
              <Icon className={classes.addIcon}>
                <AddIcon />
              </Icon>
            </IconButton>
          </Grid>
        )}
      </Grid>

      {validationError && (
        <Fade in={!!validationError}>
          <Typography component="p" className={classes.message}>
            {validationError}
          </Typography>
        </Fade>
      )}
    </div>
  )
}

export default SubPhotosList
