import useFetch from '../../hooks/useFetch'
import './featured.css'

const Featured = () => {
    const {data, loading, error} = useFetch('/hotels/countByCity?cities=manila,cebu,davao')
    // console.log(data)
  return (
    <div className="featured">
        { loading ? ("Loading please wait"
        ) :(
            <>
                <div className="featured-item">
                <img src="https://cf.bstatic.com/xdata/images/city/540x270/685748.webp?k=49456a1d6dc4ab0633b32be0cbf15d3814e3b6be39ce5d63d3bd423a0229849b&o=" alt="" className="featured-image" />
                <div className="featured-titles">
                    <h1>Manila</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featured-item">
                <img src="https://cf.bstatic.com/xdata/images/city/540x270/685726.webp?k=25b602b90c38b13fe9e858b62a9bbd3c773bf459b16e84b26642a8a056c9f524&o=" className="featured-image"/>
                <div className="featured-titles">
                    <h1>Cebu</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featured-item">
                <img src="https://cf.bstatic.com/xdata/images/city/540x270/685683.webp?k=33499c8d1da42751a03bf634f186073fe11c4315c7d7db78701b946653d9b53c&o=" alt="" className="featured-image" />
                <div className="featured-titles">
                    <h1>Davao</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div>
            </>
        )}
    </div>
  )
}

export default Featured