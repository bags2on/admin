import React, { useState, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import placeholderPhoto from '../../../asset/rastr/main_placeholder.png'

interface MainPhotoUploadProps {
  acceptedTypes: string[]
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
    '& $imageWrapper': {
      border: '5px solid #ff4033'
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

const MainPhotoUpload: React.FC<MainPhotoUploadProps> = ({ acceptedTypes }) => {
  const [mainPhoto, setMainPhoto] = useState<File>()

  const classes = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileDrop = (acceptedFiles: any[]) => {
    console.log(acceptedFiles)

    if (acceptedFiles.length) {
      const file = acceptedFiles[0]
      file.preview = URL.createObjectURL(file)

      setMainPhoto(file)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDropReject = (e: any) => {
    console.log(e)
  }

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: acceptedTypes,
    maxSize: 700000, // 700kb
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected: handleDropReject
  })

  const handleRemoveClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(mainPhoto!.preview)
    setMainPhoto(undefined)
  }

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
