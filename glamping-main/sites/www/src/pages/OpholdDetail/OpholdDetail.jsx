import { useParams } from 'react-router-dom'

export default function OpholdDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1>Ophold Detail</h1>
      <p>Her kan du se detaljerne for et specifikt ophold.</p>
      <p>Ophold ID: {id}</p>
    </div>
  )
}
