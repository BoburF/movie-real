import { Link } from 'react-router-dom'
import './Card.scss'

const Card = ({ data }) => {
    return (
        <Link to={'/movies/' + data._id} className='Card' style={{background: 'url(' + data.img + ')'}}>
            <div className="info_card">
                <div>
                    <h3>{data.name}</h3>
                    <p>Janri: {data.genre.join(' ')}</p>
                    <p>Chiqqan: {data.related}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card