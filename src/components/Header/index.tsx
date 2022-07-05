import { Container } from './styles'

interface props {
  icon: any
  label: string
}

const Header = ({ icon, label }: props) => (
  <Container>
    <header>
      <div>
        <div>{icon}</div>
        <span>{label}</span>
      </div>
    </header>
  </Container>
)

export default Header
