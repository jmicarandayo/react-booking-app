import './list.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch.js'


const List = () => {
  const location = useLocation();
  const [ openDate, setOpenDate ] = useState(false)
  const [ destination, setDestination ] = useState(location.state.destination)
  const [ dates, setDates ] = useState(location.state.dates)
  const [ options, setOptions ] = useState(location.state.options)
  const [ min, setMin ] = useState(undefined)
  const [ max, setMax ] = useState(undefined)
  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 20000}`)

  const handleClick = () => {
    reFetch()
  }
  console.log(dates)
  console.log(destination)
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="list-container">
        <div className="list-search">
          <h1>Search</h1>
          <div className="list-search-items">
            <span className="list-title">Destination</span>
            <input type="text" placeholder={destination} onChange={(e)=> setDestination(e.target.value)}/>
          </div>
          <div className="list-search-items">
            <span className="list-title">Check-in Date</span>
            <span onClick={() => setOpenDate(!openDate)} className='search-date'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            { openDate && 
            <DateRange
            editableDateInputs={true}
            onChange={item => setDates([item.selection])}
            ranges={dates}
            minDate = {new Date()}
            />}
          </div>
          <div className="list-search-items">
            <span className="list-title">Options</span>
            <div className="list-options">
              <div className="list-option">
                <span className="option-title">Min price <small>per night</small></span>
                <input type="text" onChange={e => setMin(e.target.value)}/>
              </div>
              <div className="list-option">
                <span className="option-title">Max price <small>per night</small></span>
                <input type="text" onChange={e => setMax(e.target.value)}/>
              </div>
              <div className="list-option">
                <span className="option-title">Adult</span>
                <input type="number" min="1" placeholder={options.adult}/>
              </div>
              <div className="list-option">
                <span className="option-title">Children</span>
                <input type="number" min="0" placeholder={options.children}/>
              </div>
              <div className="list-option">
                <span className="option-title">Room</span>
                <input type="number" min="1" placeholder={options.room}/>
              </div>
            </div>
          </div>
          <button onClick={handleClick}>Search</button>
        </div>
        <div className="list-result">
          {loading ? "Loading" : (
            <>
            {data.map((item) => (
              <SearchItem item={item} key={item._id}/>
            ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default List