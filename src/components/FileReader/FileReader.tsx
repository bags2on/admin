import React, { useMemo } from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import placeholderPhoto from '../../asset/rastr/placeholder.png'

type File = {
  name: string
  preview: string
}

interface FileReaderProps {
  preview: string
  position: number
  acceptedTypes: string[]
  onAdd(file: File, position: number): void
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: 140,
    outline: 'none'
  },
  imageWrapper: {
    border: '3px solid #e9f5f8',
    width: 'inherit',
    height: 'inherit',
    transition: 'border .3s',
    '& > img': {
      width: '100%',
      height: '100%'
    },
    '&:hover': {
      border: '3px solid #afdbe6'
    }
  },
  dragActive: {
    '& $imageWrapper': {
      border: '3px solid #2196f3'
    }
  },
  dragAccept: {
    '& $imageWrapper': {
      border: '3px solid #5b9066'
    }
  },
  dragReject: {
    color: '#ff182e',
    '& $imageWrapper': {
      border: '3px solid #ff182e'
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

const FileReader: React.FC<FileReaderProps> = ({ preview, position, acceptedTypes, onAdd }) => {
  const classes = useStyles()

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (acceptedFiles.length) {
      const uploaded: unknown = acceptedFiles[0] // Type assertions
      const file: File = uploaded as File
      onAdd(file, position)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDropReject = (rejectedFiles: any) => {
    console.log(rejectedFiles)
    const { errors } = rejectedFiles[0]
    const { code } = errors[0]
    // code: "file-too-large"
    console.log(code)
    // TODO custom error on drop rejected
  }

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: acceptedTypes,
    maxSize: 700000, // 700KB
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected: handleDropReject
  })

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

  const uploaded = <img src={preview} alt="Загруженное фото создаваемого товара" />

  const handleRemoveClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()

    // TODO complete

    // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // URL.revokeObjectURL(mainPhoto!.preview)
    // onMainPhotoUpload(null)
  }

  return (
    <div>
      <div
        {...getRootProps({
          className: dropZoneStyles
        })}
      >
        <input {...getInputProps()} />
        <div className={classes.imageWrapper}>
          {preview ? uploaded : <img src={placeholderPhoto} alt="фото создаваемого товара" />}
        </div>
        {isDragReject && <span>Типом файла может быть только: .jpeg, .jpg</span>}
        {preview && (
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

export default FileReader
