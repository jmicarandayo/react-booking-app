import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import './reserve.css'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Reserve = ({setOpen, hotelid}) => {
    const navigate = useNavigate();
    const [ selectedRooms, setSelectedRooms ] = useState([]);
    const { data, loading, error} = useFetch(`/hotels/rooms/${hotelid}`);
    const { dates } = useContext(SearchContext);

    // Get all dates
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1)
        }
        return dates;
    };
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => 
            allDates.includes(new Date(date).getTime()));
        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [ ...selectedRooms, value ]
                : selectedRooms.filter(item => item !== value)
        )
    }
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map(roomId => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDates,
                    });
                    return res.data;
                })
            );
        } catch(err) {

        }
        setOpen(false)
        navigate('/')
    }
    console.log(selectedRooms)
  return (
    <div className='reserve-container'>
        <div className="reserve-wrapper">
        <FontAwesomeIcon icon={faCircleXmark} className="reserve-close" onClick={() => setOpen(false)}/>
        Reserve
        <span>Select your rooms</span>
        {data.map(item => (
            <div className='reserve-item' key={data._id}>
                <div className="reserve-info">
                    <div className="reserve-title">{item.title}</div>
                    <div className="reserve-desc">{item.desc}</div>
                    <div className="reserve-max">Max people: 
                        <b> {item.maxPeople}</b>
                    </div>
                    <div className="reserve-price">{item.price}</div>
                </div>
                <div className="reserve-selected">
                {item.roomNumbers.map(roomNumber => (
                    <div className="reserve-room" key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input 
                        type="checkbox" 
                        value={roomNumber._id} 
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                        />
                    </div>
                ))}  
                </div>
            </div>
        ))}
        <button className="r-button" onClick={handleClick}>Reserve Now</button>
        </div>
    </div>
  )
}

export default Reserve