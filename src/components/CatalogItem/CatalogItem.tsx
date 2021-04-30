import React, { useState } from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import ImagePlaceholder from '../../shared/ImagePlaceholder'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg'
import { generateLink } from '../../utils/links'
import { formatPrice } from '../../utils/helpers'
import { getColorForMainTagName } from '../../utils/styling'
import routes from '../../utils/routes'
import classes from './styles.module.scss'

interface CatalogItemProps {
  id: string
  url: string
  title: string
  price: number
  discountPrice?: number
  mainTag: string
}

const CatalogItem: React.FC<CatalogItemProps> = ({ id, url, title, price, mainTag, discountPrice }) => {
  const [isLiked, setLiked] = useState<boolean>(false)

  const handleLikeClick = (): void => {
    setLiked(!isLiked)
  }

  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <Link to={generateLink(routes.product, id)}>
          <ImagePlaceholder src={url} altText={title} />
        </Link>
      </div>
      <div className={classes.info}>
        <div className={classes.priceBox}>
          <div
            className={clsx({
              [classes.price]: true,
              [classes.price_discount]: Boolean(discountPrice)
            })}
          >
            {!!discountPrice && <p className={classes.discount}>{formatPrice(discountPrice)}&nbsp;₴</p>}
            <span>{formatPrice(price)}</span>
          </div>
          <div className={classes.likeButton}>
            <IconButton onClick={handleLikeClick}>
              <Icon
                classes={{
                  root: clsx({
                    [classes.heartIcon]: true,
                    [classes.heartIcon_liked]: isLiked
                  })
                }}
              >
                <HeartIcon />
              </Icon>
            </IconButton>
          </div>
        </div>
        <Link className={classes.title} title={title} to={generateLink(routes.product, id)}>
          {title}
        </Link>
      </div>
      {!!mainTag && (
        <div
          className={classes.tag}
          style={{
            backgroundColor: getColorForMainTagName(mainTag)
          }}
        >
          <span>{mainTag}</span>
        </div>
      )}
    </div>
  )
}

export default CatalogItem
