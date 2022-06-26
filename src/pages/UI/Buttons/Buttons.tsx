import React from 'react'
import styled from 'styled-components'
import Button from '../../../shared/Button'
import { ReactComponent as EyeIcon } from '../../../asset/svg/eye.svg'

const Container = styled.section``

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ButtonWrapper = styled.div`
  flex-basis: 25%;
  padding: 20px 10px;
`

const StyledEyeIcon = styled(EyeIcon)`
  width: 24px;
  height: 24px;
  fill: currentColor;
  margin-right: 5px;
`
const StyledEyeIconEnd = styled(EyeIcon)`
  width: 24px;
  height: 24px;
  fill: currentColor;
  margin-left: 5px;
`

const Buttons: React.FC = () => {
  return (
    <Container>
      <h4>Buttons:</h4>
      <Box>
        <ButtonWrapper>
          <p>Primary: plain</p>
          <Button>Submit</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Primary: loading</p>
          <Button loading>Submit</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Primary: loading [disabled]</p>
          <Button disabled loading>
            Submit
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Primary: without a shadow</p>
          <Button disableShadow>Submit</Button>
        </ButtonWrapper>
        {/* With Icons */}
        <div style={{ display: 'flex', flexBasis: '100%' }}>
          <ButtonWrapper>
            <p>Primary: startIcon</p>
            <Button startIcon={<StyledEyeIcon />}>Submit</Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <p>Primary: endIcon</p>
            <Button endIcon={<StyledEyeIconEnd />}>Submit</Button>
          </ButtonWrapper>
        </div>
        {/* Secondary */}
        <ButtonWrapper>
          <p>Secondary: plain</p>
          <Button color="secondary">Submit</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Secondary: loading</p>
          <Button color="secondary" loading>
            Submit
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Secondary: loading [disabled]</p>
          <Button color="secondary" loading disabled>
            Submit
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Secondary: without a shadow</p>
          <Button color="secondary" disableShadow>
            Submit
          </Button>
        </ButtonWrapper>
        {/* Success */}
        <ButtonWrapper>
          <p>Success: plain</p>
          <Button color="success">Submit</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Success: loading</p>
          <Button color="success" loading>
            Submit
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Success: loading [disabled]</p>
          <Button color="success" loading disabled>
            Submit
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Success: without a shadow</p>
          <Button color="success" disableShadow>
            Submit
          </Button>
        </ButtonWrapper>
        {/* Danger */}
        <ButtonWrapper>
          <p>Danger: plain</p>
          <Button color="danger">Submit</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Danger: loading</p>
          <Button color="danger" loading>
            Submit
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Danger: loading [disabled]</p>
          <Button color="danger" loading disabled>
            Submit
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <p>Danger: without a shadow</p>
          <Button color="danger" disableShadow>
            Submit
          </Button>
        </ButtonWrapper>
      </Box>
    </Container>
  )
}

export default Buttons
