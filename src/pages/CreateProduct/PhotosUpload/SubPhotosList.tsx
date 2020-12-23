import React from 'react'
import cloneDeep from 'lodash.clonedeep'
import Grid from '@material-ui/core/Grid'
// import Fade from '@material-ui/core/Fade'
import Fade from '@material-ui/core/Zoom'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { ReactComponent as AddIcon } from '../../../asset/svg/add.svg'
import FileReader from '../../../components/FileReader/FileReader'
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

const SubPhotosList: React.FC<SubPhotosListProps> = ({ min, max, subPhotos, onSubPhotoUpload, acceptedTypes }) => {
  const classes = useStyles()

  const addFileHandler = (file: File, position: number): void => {
    const updatedPhotos = cloneDeep(subPhotos)

    const newFile: File = file
    newFile.preview = URL.createObjectURL(file)

    updatedPhotos[position] = newFile
    onSubPhotoUpload(updatedPhotos)
  }

  const handleAddClick = (): void => {
    if (subPhotos.length === max) return
    const prevPhotos = cloneDeep(subPhotos)
    onSubPhotoUpload([...prevPhotos, { preview: '' }])
  }

  return (
    <div className={classes.root}>
      <Grid container component="ul" className={classes.readerList}>
        {subPhotos.map((photo, ind) => (
          <Fade key={ind} in timeout={ind + 1 <= min ? 0 : 500}>
            <Grid xs={4} item key={ind} component="li">
              <FileReader onAdd={addFileHandler} position={ind} preview={photo.preview} acceptedTypes={acceptedTypes} />
            </Grid>
          </Fade>
        ))}
        {subPhotos.length < max && (
          <Grid item xs={4} className={classes.buttonBox} component="li">
            <IconButton disableRipple className={classes.addButton} onClick={handleAddClick}>
              <Icon className={classes.addIcon}>
                <AddIcon />
              </Icon>
            </IconButton>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default SubPhotosList
