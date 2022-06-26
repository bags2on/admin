import React from 'react'
import styled, { css } from 'styled-components'
import ScaleLoader from '../Loader/Loader'

enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger'
}

interface BottonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit'
  color?: 'primary' | 'secondary' | 'success' | 'danger'
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  disableShadow?: boolean // TODO: rename to withoutShadow
  darkLoader?: boolean
  className?: string
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

interface BaseButtonProps {
  $withoutShadow: boolean
  $color: ButtonColor
}

const BaseButton = styled.button<BaseButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  padding: 15px 30px;
  border-radius: 8px;
  border: 1px solid;
  transition: all 0.3s;
  &:disabled {
    cursor: not-allowed;
    pointer-events: initial;
    opacity: 0.7;
  }
  ${({ $withoutShadow }) =>
    $withoutShadow
      ? css`
          box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.3);
        `
      : css`
          box-shadow: none;
        `}
  ${({ $color, theme }) => {
    switch ($color) {
      case ButtonColor.primary:
        return css`
          color: ${theme.colors.primary};
          background-color: #363636;
          border-color: #6a6a6a;
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #323232;
          }
        `
      case ButtonColor.secondary:
        return css`
          color: #343434;
          background-color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #fff128;
          }
        `
      case ButtonColor.success:
        return css`
          color: #343434;
          background-color: #32cd32;
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #45ff45;
          }
        `
      case ButtonColor.danger:
        return css`
          color: #343434;
          background-color: #f44336;
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #f2554a;
          }
        `
    }
  }}
`

const ButtonText = styled.span``

const Button: React.FC<BottonProps> = ({
  loading,
  children,
  darkLoader,
  color = ButtonColor.primary,
  disableShadow = false,
  startIcon,
  endIcon,
  type = 'button',
  ...otherProps
}: BottonProps) => {
  return (
    <BaseButton
      $withoutShadow={!disableShadow}
      $color={color as ButtonColor}
      type={type}
      {...otherProps}
    >
      {startIcon}
      {loading ? (
        <ScaleLoader dark={color !== ButtonColor.primary} />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
      {endIcon}
    </BaseButton>
  )
}

export default Button