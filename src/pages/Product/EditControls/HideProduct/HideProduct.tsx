import React, { useState } from 'react'
import clsx from 'clsx'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation } from '@apollo/client'
import { ReactComponent as EyeIcon } from '../../../../asset/svg/eye.svg'
import { ReactComponent as EyeHidddenIcon } from '../../../../asset/svg/eye-hide.svg'
import {
  HideProductMutation,
  HideProductVariables,
  HideProductDocument
} from '../../../../graphql/product/_gen_/hideProduct.mutation'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  eyeIcon: {
    fill: theme.palette.primary.main
  },
  eyeIconHidden: {
    fill: '#bfbfbf'
  }
}))

interface HideProductProps {
  id: string
  productHiddenStatus: boolean
}

const HideProduct: React.FC<HideProductProps> = ({ id, productHiddenStatus }) => {
  const classes = useStyles()
  const [isHidden, setHidden] = useState<boolean>(productHiddenStatus)

  const [hideProduct, { loading }] = useMutation<HideProductMutation, HideProductVariables>(
    HideProductDocument
  )

  const onHiddenChange = async () => {
    const { data } = await hideProduct({
      variables: {
        id,
        isHidden: !isHidden
      }
    })

    if (!data) {
      return
    }

    const newStatus = data.hideProduct?.isHidden

    if (newStatus === undefined) {
      return
    }

    setHidden(newStatus)
  }

  const handleHiddenClick = (): void => {
    onHiddenChange()
  }

  React.useEffect(() => {
    setHidden(productHiddenStatus)
  }, [productHiddenStatus])

  return (
    <div>
      <IconButton onClick={handleHiddenClick} disabled={loading}>
        {loading ? (
          <CircularProgress size={20} style={{ padding: 0 }} />
        ) : (
          <Icon
            classes={{
              root: clsx({
                [classes.eyeIcon]: true,
                [classes.eyeIconHidden]: isHidden
              })
            }}
          >
            {isHidden ? <EyeHidddenIcon /> : <EyeIcon />}
          </Icon>
        )}
      </IconButton>
    </div>
  )
}

export default HideProduct
