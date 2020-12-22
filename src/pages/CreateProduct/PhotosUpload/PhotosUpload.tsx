import React from 'react'
import MainPhotoUpload from './MainPhotoUpload'
import SubPhotosList from './SubPhotosList'

type File = {
  name?: string
  preview: string
}

interface PhotosUploadProps {
  mainPhoto: File | null
  subPhotos: File[]
  onMainPhotoUpload(f: File): void
  onSubPhotoUpload(newFiles: File[]): void
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg,']

const PhotosUpload: React.FC<PhotosUploadProps> = ({ mainPhoto, onMainPhotoUpload, subPhotos, onSubPhotoUpload }) => {
  return (
    <section style={{ width: 'fit-content' }}>
      <MainPhotoUpload mainPhoto={mainPhoto} onMainPhotoUpload={onMainPhotoUpload} acceptedTypes={ACCEPTED_TYPES} />
      <SubPhotosList
        min={2}
        max={6}
        subPhotos={subPhotos}
        onSubPhotoUpload={onSubPhotoUpload}
        acceptedTypes={ACCEPTED_TYPES}
      />
    </section>
  )
}

export default PhotosUpload
