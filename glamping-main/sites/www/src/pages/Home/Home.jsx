import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import logo from '../../assets/logo.png'
import gitteImage from '../../assets/gitte.jpg'
import headerBg from '../../assets/image_00.jpg'

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
      <div className={styles.header} style={{ backgroundImage: `url(${headerBg})` }}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h1 className={styles.title}>Gittes</h1>
          <h1 className={styles.subtitle}>Glamping</h1>
          <Link to="/kontakt" className={styles.ctaButton}>
            BOOK NU
          </Link>
      </div>
        <div className={styles.ophold}>
          <h2>Kom og prøv <br /> glamping hos Gitte!</h2>
          <p>
            Vi er stolte af at byde dig velkommen til Gitte's Glamping, hvor hjertevarme og omsorg møder naturens skønhed og eventyr. Vores dedikerede team, anført af Gitte selv, er her for at skabe den perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter at skabe minder og fordybelse, uanset om du besøger os som par, familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og interesser. Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find indre ro med vores wellnessaktiviteter.
          </p>
          <img src={gitteImage} alt="Gitte" className={styles.gitteOphold} />
          <Link to="/ophold" className={styles.opholdButton}>
            SE VORES OPHOLD
          </Link>
        </div>
        <div className={styles.reviews}>
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            <div className={styles.reviewsGrid}>
              {/* Header Card */}
              <div className={`${styles.reviewCard} ${styles.headerCard}`}>
                <h2 className={styles.reviewTitle}>Vores gæster<br />udtaler</h2>
              </div>
              
              {/* Review Cards */}
              {reviews.map((review) => (
                <div key={review._id} className={styles.reviewCard}>
                  <h2 className={styles.reviewName}>{review.name}, {review.age} år</h2>
                  <h2 className={styles.stayType}>Har været på {review.stay}</h2>
                  <p className={styles.reviewText}>{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}