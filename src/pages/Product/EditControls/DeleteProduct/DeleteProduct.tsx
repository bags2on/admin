import React, { useState } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import IconButton from '@material-ui/core/IconButton'
import {
  DeleteProductMutation,
  DeleteProductVariables,
  DeleteProductDocument
} from '../../../../graphql/product/_gen_/deleteProduct.mutation'
import Modal from '../../../../shared/Modal'
import Button from '../../../../shared/Button'

import { useMutation } from '@apollo/client'
import { ReactComponent as DeleteIcon } from '../../../../asset/svg/delete.svg'
import { makeStyles } from '@material-ui/core/styles'
import history from '../../../../utils/history'
import routeNames from '../../../../utils/routeNames'
import styled from 'styled-components'

interface DeleteProductProps {
  id: string
}

const useStyles = makeStyles(() => ({
  root: {
    color: 'red'
  },
  modalContainer: {
    width: 500,
    padding: 50,
    '& > h1': {
      fontSize: 20,
      textAlign: 'center'
    }
  },
  submitButton: {
    width: 150,
    display: 'block',
    margin: '0 auto',
    marginTop: 20,
    backgroundColor: 'limegreen',
    '&:hover': {
      backgroundColor: 'limegreen'
    }
  }
}))

const ConfirmButton = styled(Button)`
  && {
    width: 150px;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
`

const DeleteProduct: React.FC<DeleteProductProps> = ({ id }) => {
  const classes = useStyles()
  const [isOpen, setOpen] = useState<boolean>(false)

  const [deleteProduct, { loading }] = useMutation<DeleteProductMutation, DeleteProductVariables>(
    DeleteProductDocument,
    {
      onCompleted: () => {
        history.replace(routeNames.catalog)
      },
      onError: (err) => {
        console.log(err.message)
      }
    }
  )

  const handleDeleteButtonClick = (): void => {
    setOpen(true)
  }

  const handleSubmitButtonClick = (): void => {
    deleteProduct({
      variables: {
        id
      }
    })
  }

  return (
    <>
      <IconButton disableRipple className={classes.root} onClick={handleDeleteButtonClick}>
        <SvgIcon component="span">
          <DeleteIcon />
        </SvgIcon>
      </IconButton>
      <Modal open={isOpen} onClose={() => setOpen((prev) => !prev)}>
        <div className={classes.modalContainer}>
          <h1>Действительно удалите товар?</h1>
          <ConfirmButton color="success" loading={loading} onClick={handleSubmitButtonClick}>
            Да
          </ConfirmButton>
        </div>
      </Modal>
    </>
  )
}

export default DeleteProduct
