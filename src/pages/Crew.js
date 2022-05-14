import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Crew() {
  const [crew, setCrew] = useState(null)

  useEffect(() => {
    const fetchCrew = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/crew`)
      const data = await res.json()
      setCrew(data)
    }

    fetchCrew()
  }, [])

  return (
    <>
      {!crew ? (
        <div className="loading-spinner">
          <article></article>
          <p>The spinny thingy means it's working</p>
        </div>
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Crew</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {crew.map(({ name, image, id }) => (
                <Link to={`/crew/${id}`} key={id}>
                  <article className="relative">
                    <img
                      src={image}
                      alt={name}
                      loading="lazy"
                      className="h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3">
                      <h2 className="text-white font-bold text-xl">{name}</h2>
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
