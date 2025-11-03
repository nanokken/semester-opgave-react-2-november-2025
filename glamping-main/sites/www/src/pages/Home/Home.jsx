import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import logo from '../../assets/logo.png'
import gitteImage from '../../assets/gitte.jpg'

export default function Home() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3042/reviews')
        const result = await response.json()
        
        if (result.status === 'ok') {
          setReviews(result.data)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  return (
    <div className={styles.home}>
      <div className={styles.header}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h1 className={styles.title}>Gittes</h1>
            <h2 className={styles.subtitle}>Glamping</h2>
            <Link to="/kontakt" className={styles.ctaButton}>
              <p>Kontakt</p>
            </Link>
      </div>
        <div className={styles.ophold}>
          <h2>Kom og prøv <br /> glamping hos Gitte!</h2>
          <p>
            Vi er stolte af at byde dig velkommen til Gitte's Glamping, hvor hjertevarme og omsorg møder naturens skønhed og eventyr. Vores dedikerede team, anført af Gitte selv, er her for at skabe den perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter at skabe minder og fordybelse, uanset om du besøger os som par, familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og interesser. Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find indre ro med vores wellnessaktiviteter.
          </p>
          <img src={gitteImage} alt="Gitte" className={styles.gitteOphold} />
            <Link to="/ophold" className={styles.opholdButton}>
                <p>Se vores ophold</p>
            </Link>
        </div>
        <div className={styles.reviews}>
          <div className={styles.reviewsHeader}>
            <h2>Vores gæster udtaler</h2>
            </div>
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            <div className={styles.reviewsGrid}>
              {reviews.map((review) => (
                <div key={review._id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <h3>{review.name}, {review.age} år</h3>
                    <p className={styles.stayType}>{review.stay}</p>
                  </div>
                  <p className={styles.reviewText}>{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}