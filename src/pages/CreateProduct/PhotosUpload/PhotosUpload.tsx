import React from 'react'
import MainPhotoUpload from './MainPhotoUpload'

type File = {
  name: string
  preview: string
}
interface PhotosUploadProps {
  mainPhoto: File | null
  onMainPhotoUpload(f: File): void
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg,'] // 'image/png'

const PhotosUpload: React.FC<PhotosUploadProps> = ({ mainPhoto, onMainPhotoUpload }) => {
  return (
    <section>
      <MainPhotoUpload mainPhoto={mainPhoto} onMainPhotoUpload={onMainPhotoUpload} acceptedTypes={ACCEPTED_TYPES} />
    </section>
  )
}

export default PhotosUpload
