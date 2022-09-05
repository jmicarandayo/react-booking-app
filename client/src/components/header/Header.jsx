import React, { useContext } from 'react'
import './header.css'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'

const Header = ({type}) => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [ destination, setDestination ] = useState('')
    const [ openDate, setOpenDate ] = useState(false)
    const [ dates, setDates ] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [ openOptions, setOpenOptions ] = useState(false)
    const [ options, setOptions ] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const handleOptions = (name, operation) => {
        setOptions((prev) => {
          return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1
          } 
        })
    }
    const {dispatch}  = useContext(SearchContext)
    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{ destination, dates, options}})
        navigate('/hotels', { state: {destination, dates, options}})
    }
  return (
    <div className={ type === "list" ? "header list-mode" : "header"}>
        <div className="header-container">
            <div className="header-lists">
                <div className="header-item active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stay</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Atractions</span>
                </div>
                <div className="header-item">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis </span>
                </div>
            </div>
            { type !== 'list' &&
                <>
                        <h1 className='header-title'>A lifetime of discounts? It's Genius.</h1>
                    <p className='header-desc'>Get rewarder for your travels - unlock instant savings of 10% or more with a free Kingsbooking accunt</p>
                    {!user && <button className='header-button'>Sign in/Register</button>}
                    <div className="search">
                        <div className="search-lists">
                            <div className="search-items">
                                <FontAwesomeIcon icon={faBed} className="search-icon"/>
                                <input type="text"  className='search-input' placeholder='Where are you going?'
                                onChange={(e) => setDestination(e.target.value)}/>
                            </div>
                            <div className="search-items">
                                <FontAwesomeIcon icon={faCalendarDays} className="search-icon"/>
                                <span onClick={() => setOpenDate(!openDate)} className='search-text'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                                { openDate && 
                                    <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="date"
                                    />
                                }
                            </div>
                            <div className="search-items">
                                <FontAwesomeIcon icon={faPerson} className="search-icon"/>
                                <span onClick={() => setOpenOptions(!openOptions)} className='search-text'>{`adult - ${options.adult} children - ${options.children} room - ${options.room}`}</span>
                                { openOptions && 
                                    <div className="options">
                                        <div className="option-item">
                                            <span className="option-text">Adult</span>
                                            <div className="option-counter">
                                                <button disabled={options["adult"] <= 1} className="option-button" onClick={() => handleOptions("adult", "d")}>-</button>
                                                <span className="option-number">{options.adult}</span>
                                                <button className="option-button" onClick={() => handleOptions("adult", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="option-item">
                                            <span className="option-text">Children</span>
                                            <div className="option-counter">
                                                <button disabled={options["children"] <= 0} className="option-button" onClick={() => handleOptions("children", "d")}>-</button>
                                                <span className="option-number">{options.children}</span>
                                                <button className="option-button" onClick={() => handleOptions("children", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="option-item">
                                            <span className="option-text">Room</span>
                                            <div className="option-counter">
                                                <button disabled={options["room"] <= 1} className="option-button" onClick={() => handleOptions("room", "d")}>-</button>
                                                <span className="option-number">{options.room}</span>
                                                <button className="option-button" onClick={() => handleOptions("room", "i")}>+</button>
                                            </div>
                                        </div>
                                </div>
                                }
                            </div>
                            <button className='header-button'
                            onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default Header