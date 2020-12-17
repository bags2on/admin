import React from 'react'
import MainPhotoUpload from './MainPhotoUpload'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhotosUploadProps {}

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg,'] // 'image/png'

const PhotosUpload: React.FC<PhotosUploadProps> = () => {
  return (
    <section>
      <MainPhotoUpload acceptedTypes={ACCEPTED_TYPES} />
    </section>
  )
}

export default PhotosUpload
