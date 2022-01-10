/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useFormikContext } from 'formik'

interface AutoSaveProps {
  onSave(values: any): void
}

const AutoSave: React.FC<AutoSaveProps> = ({ onSave }) => {
  const { values } = useFormikContext()
  const [mount, setMount] = useState(false)

  useEffect(() => setMount(true), [])

  useEffect(() => {
    if (mount) {
      onSave(values)
    }
  }, [values])

  return null
}

export default AutoSave
