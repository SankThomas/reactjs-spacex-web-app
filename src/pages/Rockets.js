import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function Rockets() {
  const [rockets, setRockets] = useState(null)

  useEffect(() => {
    const fetchRockets = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/rockets`)
      const data = await res.json()
      setRockets(data)
    }

    fetchRockets()
  }, [])

  return (
    <>
      {!rockets ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Rockets</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {rockets.map(({ id, name, description, flickr_images }) => (
                <Link to={`/rockets/${id}`} key={id}>
                  <article className="articles">
                    <img
                      src={flickr_images[0]}
                      alt={name}
                      className="h-72 w-full object-cover"
                    />
                    <div className="p-5">
                      <h2 className="text-white font-bold text-xl my-1">
                        {name}
                      </h2>
                      <p className="text-white opacity-75 text-sm mb-5">{`${description.substring(
                        0,
                        100
                      )}...`}</p>
                      <Link to={`/rockets/${id}`} className="btn">
                        Learn more
                      </Link>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
