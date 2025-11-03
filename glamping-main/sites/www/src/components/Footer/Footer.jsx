import logo from '../../assets/logo.png'
import styles from './Footer.module.css'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialSection}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook style={{ width: '82px', height: '82px' }} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram style={{ width: '82px', height: '82px' }} />
        </a>
      </div>
      <div className={styles.logoSection}>
        <img src={logo} alt="Gittes Glamping Logo" className={styles.footerLogo} />
        <p>Gittes Glamping</p>
      </div>
    </footer>
  )
}