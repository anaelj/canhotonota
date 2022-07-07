import React from 'react'
import { Link } from 'react-router-dom'
import { MdReceiptLong } from 'react-icons/md'

import { Container, LoginBtn, Logo } from './styles'

const Login: React.FC = () => {
  return (
    <Container>
      <Logo>
        <MdReceiptLong color="#FB8500" size={90} />
      </Logo>
      <Link to={'/invoices'}>
        <LoginBtn>ENTRAR</LoginBtn>
      </Link>
    </Container>
  )
}

export default Login
