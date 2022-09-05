import { Link } from 'react-router-dom'
import './searchItem.css'

const SearchItem = ({item}) => {
    console.log(item)
  return (
    <div className="si-container">
        <img src={item.photos[0]} alt="" className="si-image" />
        <div className="si-details">
            <span className="si-title">T{item.name}</span>
            <span className="si-distance">{item.distance}m from center</span>
            <span className="si-ride">Free airport taxi</span>
            <span className="si-type">Studio Apartment with Air conditioner</span>
            <span className="si-features">{item.desc}</span>
            <span className="si-cancel">Free cancellation</span>
            <span className="si-cancelDesc">You can cancel later, so lock in this great price today!</span>
        </div>
        <div className="si-desc">
            {item.rating && 
            <div className="si-rating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="descTexts">
                <span className="si-price">${item.cheapestPrice}</span>
                <span className="si-tax">Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                    <button className='si-button'>See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem