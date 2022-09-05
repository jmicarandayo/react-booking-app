import './propertyFeatured.css'
import useFetch from '../../hooks/useFetch'

const PropertyFeatured = () => {
    const {data, loading, error} = useFetch('/hotels?featured=true&limit=4')
  return (
    <div className="pf">
        { loading ? ("Loading") : (
            <>
            { data.map(item => (
                <div className="pf-item" key={item._id}>
                    <img src={item.photos[0]} alt="" className="pf-image" />
                    <span className='pf-name'>{item.name}</span>
                    <span className='pf-city'>{item.city}</span>
                    <span className='pf-price'>Starting from {item.cheapestPrice}</span>
                    {item.rating && 
                    <div className="pf-rating">
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                        <span className='hyphen'> - </span>
                        <span className='pf-reviews'>298 reviews</span>
                    </div>
                }
                </div>
                ))}
            </>
        )}
    </div>
  )
}

export default PropertyFeatured