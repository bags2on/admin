import React from 'react'

interface SubPhotosUploadProps {
  acceptedTypes: string[]
}

const SubPhotosUpload: React.FC<SubPhotosUploadProps> = ({ acceptedTypes }) => {
  return (
    <div>
      <p>SubPhotosUpload</p>
    </div>
  )
}

export default SubPhotosUpload
