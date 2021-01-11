export const getFileReaderError = (code: string): string => {
  /*
    Available codes:
        "file-too-large"
        "file-too-small"
        "too-many-files"
        "file-invalid-type"
  */
  switch (code) {
    case 'file-invalid-type':
      return 'Типом файла может быть только: .jpeg, .jpg'
    case 'file-too-large':
      return 'Размер фото не должен превышать 700 KB'
    default:
      return ''
  }
}
