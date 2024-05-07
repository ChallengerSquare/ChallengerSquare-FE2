import { Link, NavLink } from 'react-router-dom'
import useNavbarScroll from '@/hooks/useNavbarScroll'
import Button from '@components/Button/Button'
import styles from './Navbar.module.scss'

interface NavbarProps {
  enableScrollEffect?: boolean
}

const Navbar = ({ enableScrollEffect = false }: NavbarProps) => {
  const challS = `${process.env.PUBLIC_URL}/svgs/logo/challS.svg`
  const navbarScroll = useNavbarScroll(enableScrollEffect)
  return (
    <header className={styles.header} style={{ backgroundColor: navbarScroll }}>
      <div className="header container mx-auto flex justify-between items-center">
        <div className="flex items-center text-xl">
          <Link to="/">
            <img src={challS} alt="renewal" className={styles.logo} />
          </Link>
        </div>
        <nav>
          <NavLink
            to="/competition"
            className={styles.link}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
                color: isActive ? '#8930FD' : '',
              }
            }}
          >
            대회
          </NavLink>
          <NavLink
            to="/competition-results"
            className={styles.link}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
                color: isActive ? '#8930FD' : '',
              }
            }}
          >
            수상/참가 조회
          </NavLink>
        </nav>
        <Link to="/sign-in">
          <Button variation="purple">로그인</Button>
        </Link>
      </div>
    </header>
  )
}

export default Navbar