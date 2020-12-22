import React from 'react'
import cloneDeep from 'lodash.clonedeep'
import FileReader from '../../../components/FileReader/FileReader'

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

const SubPhotosList: React.FC<SubPhotosListProps> = ({ min, subPhotos, onSubPhotoUpload, acceptedTypes }) => {
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
    </div>
  )
}

export default SubPhotosList
