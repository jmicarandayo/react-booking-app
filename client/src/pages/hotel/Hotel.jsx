import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import './hotel.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import Reserve from '../../components/reserve/Reserve'
import { AuthContext } from '../../context/AuthContext'

const Hotel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split('/')[2]
  const [ open, setOpen ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const [ index, setIndex ] = useState(0);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`)
  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 *24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate)
  const handleOpen = (i) => {
    setIndex(i)
    setOpen(true)
  }
  const handleCLose = () => {
    setOpen(false)
  }
  const handleMove = (direction) => {
    let indexNumber;

    if(direction === "l") {
      indexNumber = index === 0 ? data.photos.length - 1 : index - 1
    } else {
      indexNumber = index === data.photos.length - 1 ? 0 : index + 1
    }
    setIndex(indexNumber)
  }
  const handleReserve = () => {
    if(user) {
      setOpenModal(true)
    } else {
      navigate('/')
    }
  }
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
        { loading ? "Loading" : (
          <div className="hotel-container">
          { open && 
              <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} onClick={handleCLose} className="close"/>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} className="arrow" onClick={() => handleMove('l')}/>
                <div className="slider-wrapper">
                  <img src={data.photos[index]} alt="" className='slider-image' />
                </div>
                <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow" onClick={() => handleMove('r')}/>
              </div>
              }
            <div className="hotel-wrapper">
              <div className="hotel-desc">
              <button className='reserve-button'>Reserve or Book Now!</button>
                <h1 className="hotel-name">{data.name}</h1>
                <div className="">
                  <FontAwesomeIcon icon={faLocationDot}/>
                  <span className="hotel-address">{data.address}</span>
                </div>
                <span className="hotel-distance">Excellent location - {data.distance}m from center</span>
                <span className="hotel-book">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
              </div>
              <div className="hotel-images">
                { data.photos?.map((photo, i) => (
                    <div className="hotel-image-wrapper" key={i}>
                      <img src={photo} alt="" className="hotel-image" 
                      onClick={() => handleOpen(i)}/>
                    </div>
                  ))
                }
              </div>
              <div className="hotel-info">
                <div className="hotel-details">
                  <h1 className='hotel-title'>{data.title}</h1>
                  <p className='hotel-text'>{data.desc}</p>
                </div>
                <div className="hotel-detail-price">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <p>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</p>
                  <h2><b>${days * data.cheapestPrice * options.room}</b> ({days} nights)</h2>
                  <button onClick={handleReserve}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
          </div>
        )}
      <MailList/>
      <Footer/>
      {openModal && <Reserve setOpen={setOpenModal} hotelid={id}/>}
    </div>
  )
}

export default Hotel