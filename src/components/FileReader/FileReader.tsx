import React, { useMemo } from 'react'
import clsx from 'clsx'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import { ReactComponent as CloseIcon } from '../../asset/svg/close.svg'
import { ReactComponent as DeleteIcon } from '../../asset/svg/delete.svg'
import placeholderPhoto from '../../asset/rastr/placeholder.png'

type File = {
  name: string
  preview: string
}

interface FileReaderProps {
  preview: string
  position: number
  required: boolean
  withErrors?: boolean
  acceptedTypes: string[]
  deletePhotoOnly: boolean
  onAdd(file: File, position: number): void
  onDelete(position: number, photoOnly: boolean): void
  onError(code: string): void
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
    top: -12,
    right: -4
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#e9f5f8',
    transition: 'background-color .3s',
    '&:hover': {
      backgroundColor: '#ff182e',
      '& $closeIcon': {
        fill: '#fff'
      }
    }
  },
  closeIcon: {
    fontSize: 15,
    fill: '#ff182e',
    transition: 'fill .3s'
  }
}))

const FileReader: React.FC<FileReaderProps> = ({
  preview,
  position,
  acceptedTypes,
  required,
  deletePhotoOnly,
  withErrors = true,
  onAdd,
  onDelete,
  onError
}) => {
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
    const { errors } = rejectedFiles[0]
    const { code } = errors[0]
    onError(code)
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
    onDelete(position, deletePhotoOnly && !!preview)
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
        {withErrors && isDragReject && <span>Типом файла может быть только: .jpeg, .jpg</span>}
        {required && (
          <div className={classes.buttonBox}>
            <IconButton disableRipple onClick={handleRemoveClick} className={classes.removeButton}>
              <Icon className={classes.closeIcon}>{!preview ? <CloseIcon /> : <DeleteIcon />}</Icon>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileReader
