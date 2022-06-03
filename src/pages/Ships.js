import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function Ships() {
  const [ships, setShips] = useState(null)

  useEffect(() => {
    const fetchShips = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/ships`)
      const data = await res.json()
      setShips(data)
    }

    fetchShips()
  }, [])

  return (
    <>
      {!ships ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 pt-32">
            <h1 className="heading">Ships</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {ships.map(({ id, name, home_port, image }) => (
                <Link to={`/ships/${id}`} key={id}>
                  <article className="articles">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-72 w-full object-cover"
                      />
                    ) : (
                      <img
                        src="https://i.imgur.com/eJWx70Z.jpg"
                        alt={name}
                        className="h-72 w-full object-cover"
                      />
                    )}
                    <div className="p-5">
                      <h2 className="text-white text-xl font-bold my-1">
                        {name}
                      </h2>
                      <p className="text-white opacity-75 text-sm lg:text-base">
                        Home Port: {home_port}
                      </p>
                      <button className="inline-block mt-5">
                        <Link to={`/ships/${id}`} className="btn">
                          Learn more
                        </Link>
                      </button>
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
