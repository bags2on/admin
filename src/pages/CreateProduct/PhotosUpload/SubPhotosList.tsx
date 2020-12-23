import React from 'react'
import cloneDeep from 'lodash.clonedeep'
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

const useStyles = makeStyles(() => ({
  root: {},
  addButton: {},
  addIcon: {
    fill: '#6c6ea9'
  }
}))

const SubPhotosList: React.FC<SubPhotosListProps> = ({ min, subPhotos, onSubPhotoUpload, acceptedTypes }) => {
  const classes = useStyles()

  const addFileHandler = (file: File, position: number): void => {
    const prevPhotos = cloneDeep(subPhotos)

    const newFile: File = file
    newFile.preview = URL.createObjectURL(file)

    if (position < min || subPhotos.length === min) {
      prevPhotos[position] = newFile
      onSubPhotoUpload(prevPhotos)
      return
    }
    onSubPhotoUpload([...prevPhotos, newFile])
  }

  return (
    <div style={{ display: 'flex', paddingTop: 20 }}>
      {subPhotos.map((photo, ind) => (
        <FileReader
          key={ind}
          onAdd={addFileHandler}
          position={ind}
          preview={photo.preview}
          acceptedTypes={acceptedTypes}
        />
      ))}
      <div>
        <IconButton className={classes.addButton}>
          <Icon className={classes.addIcon}>
            <AddIcon />
          </Icon>
        </IconButton>
      </div>
    </div>
  )
}

export default SubPhotosList
