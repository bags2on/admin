import React, { useState } from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import ImagePlaceholder from '../../shared/ImagePlaceholder'
import Icon from '@material-ui/core/Icon'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { ReactComponent as EyeIcon } from '../../asset/svg/eye.svg'
import { ReactComponent as EyeHidddenIcon } from '../../asset/svg/eye-hide.svg'
import { formatPrice, generateLink, tagToLocal, getColorForMainTagName } from '../../utils/helpers'
import routes from '../../utils/routeNames'
import classes from './styles.module.scss'
import {
  HideProductDocument,
  HideProductMutation,
  HideProductVariables
} from '../../graphql/product/_gen_/hideProduct.mutation'
import { SharedMutations } from '../../apollo/cache/mutations'

interface CatalogItemProps {
  id: string
  url: string
  title: string
  basePrice: number
  inStock: boolean
  hidden?: boolean
  currentPrice: number
  mainTag: string
  hideControls?: boolean
}

const CatalogItem: React.FC<CatalogItemProps> = ({
  id,
  url,
  title,
  basePrice,
  inStock,
  hidden = false,
  mainTag,
  currentPrice,
  hideControls = false
}) => {
  const [isHidden, setHidden] = useState<boolean>(hidden)

  const [hideProduct, { loading }] = useMutation<HideProductMutation, HideProductVariables>(
    HideProductDocument,
    {
      onCompleted: (data) => {
        SharedMutations.openSnackbar({
          message: `«${id}» — ` + (data.hideProduct?.isHidden ? 'cпрятан' : 'публичен'),
          type: 'success'
        })
      },
      onError: () => {
        SharedMutations.openSnackbar({
          message: `«${id}» — ошибка статуса видимости`,
          type: 'error'
        })
      }
    }
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

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.outStock]: !inStock
      })}
    >
      <div className={classes.image}>
        <Link to={generateLink(routes.editProduct, id)}>
          <ImagePlaceholder src={url} altText={title} />
        </Link>
      </div>
      <div className={classes.info}>
        <div className={classes.priceBox}>
          <div
            className={clsx({
              [classes.price]: true,
              [classes.price_discount]: currentPrice !== basePrice
            })}
          >
            {currentPrice !== basePrice && (
              <p className={classes.discount}>{formatPrice(basePrice)}&nbsp;₴</p>
            )}
            <span>{formatPrice(currentPrice)}&nbsp;₴</span>
          </div>

          <div className={clsx(hideControls ? classes.disabledActionButton : classes.likeButton)}>
            {!hideControls && (
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
            )}
          </div>
        </div>
        <Link className={classes.title} title={title} to={generateLink(routes.editProduct, id)}>
          {title}
        </Link>
      </div>
      {mainTag !== 'REGULAR' && (
        <div
          className={classes.tag}
          style={{
            backgroundColor: getColorForMainTagName(mainTag)
          }}
        >
          <span>{tagToLocal(mainTag)}</span>
        </div>
      )}
    </div>
  )
}

export default CatalogItem
