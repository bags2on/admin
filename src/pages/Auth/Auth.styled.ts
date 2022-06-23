import styled, { keyframes, css } from 'styled-components'
import { Field, FieldProps } from 'formik'

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const Title = styled.p`
  color: #fff;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 7px;
  padding-left: 7px;
`

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
  height: 25px;
`

export const animationError = keyframes`
  0% {
      transform: translateX(0px);
      animation-timing-function: ease-in;
      
    }
    37% {
      transform: translateX(5px);
      animation-timing-function: ease-out;
    }
    55% {
      transform: translateX(-5px);
      animation-timing-function: ease-in;
    }
    73% {
      transform: translateX(4px);
      animation-timing-function: ease-out;
    }
    82% {
      transform: translateX(-4px);
      animation-timing-function: ease-in;
    }
    91% {
      transform: translateX(2px);
      animation-timing-function: ease-out;
    }
    96% {
      transform: translateX(-2px);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateX(0px);
      animation-timing-function: 'ease-in'
    }
`

interface InputProps extends FieldProps {
  $animated?: boolean
}

export const Input = styled(Field)<InputProps>`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  outline: none;
  width: 300px;
  border-radius: 7px;
  border: 2px solid;
  border-color: #afafaf;
  color: #fff;
  background-color: #3c4144;
  padding: 15px 10px;
  ${({ $animated }) =>
    $animated
      ? css`
          border-color: red;
          animation: ${animationError} 300ms ease-in-out;
        `
      : css`
          animation: none;
        `}
`
