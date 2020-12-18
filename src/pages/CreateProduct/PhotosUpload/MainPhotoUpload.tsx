import React, { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import placeholderPhoto from '../../../asset/rastr/main_placeholder.png'

interface MainPhotoUploadProps {
  acceptedTypes: string[]
  mainPhoto: File | null
  onMainPhotoUpload(f: File | null): void
}

type File = {
  name: string
  preview: string
}

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 auto',
    position: 'relative',
    width: 360,
    height: 373,
    outline: 'none'
  },
  imageWrapper: {
    border: '5px solid #e9f5f8',
    width: 'inherit',
    height: 'inherit',
    transition: 'border .3s',
    '& > img': {
      width: '100%',
      height: '100%'
    },
    '&:hover': {
      border: '5px solid #afdbe6'
    }
  },
  dragActive: {
    '& $imageWrapper': {
      border: '5px solid #2196f3'
    }
  },
  dragAccept: {
    '& $imageWrapper': {
      border: '5px solid #5b9066'
    }
  },
  dragReject: {
    color: '#ff182e',
    '& $imageWrapper': {
      border: '5px solid #ff182e'
    }
  },
  buttonBox: {
    position: 'absolute',
    top: -22,
    right: -16
  },
  removeButton: {
    backgroundColor: '#e9f5f8'
  }
}))

const MainPhotoUpload: React.FC<MainPhotoUploadProps> = ({ acceptedTypes, mainPhoto, onMainPhotoUpload }) => {
  const classes = useStyles()

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (acceptedFiles.length) {
      const uploaded: unknown = acceptedFiles[0] // Type assertions
      const file: File = uploaded as File

      file.preview = URL.createObjectURL(file)

      onMainPhotoUpload(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: acceptedTypes,
    maxSize: 700000, // 700KB
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop
  })

  const handleRemoveClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(mainPhoto!.preview)
    onMainPhotoUpload(null)
  }

  // TODO: rename
  const s = <img src={mainPhoto?.preview} alt="Загруженное фото создаваемого товара" />

  useEffect(
    () => () => {
      if (mainPhoto) {
        URL.revokeObjectURL(mainPhoto.preview)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const dropZoneStyles = useMemo(
    () =>
      clsx({
        [classes.root]: true,
        [classes.dragActive]: isDragActive,
        [classes.dragAccept]: isDragAccept,
        [classes.dragReject]: isDragReject
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragActive, isDragReject, isDragAccept]
  )

  return (
    <div>
      <div
        {...getRootProps({
          className: dropZoneStyles
        })}
      >
        <input {...getInputProps()} />
        <div className={classes.imageWrapper}>
          {mainPhoto ? s : <img src={placeholderPhoto} alt="Главное фото создаваемого товара" />}
        </div>
        {isDragReject && <span>Типом файла может быть только: .jpeg, .jpg</span>}
        {mainPhoto && (
          <div className={classes.buttonBox}>
            <IconButton disableRipple onClick={handleRemoveClick} className={classes.removeButton}>
              <DeleteIcon color="inherit" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainPhotoUpload
