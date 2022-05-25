import { useState, useEffect } from "react"
import LoadingState from "../components/LoadingState"
import { Link } from "react-router-dom"

// Get a placeholder image

export default function Launches() {
  const [launches, setLaunches] = useState(null)

  useEffect(() => {
    const fetchLaunches = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/launches`)
      const data = await res.json()
      setLaunches(data)
    }

    fetchLaunches()
  }, [])

  return (
    <>
      {!launches ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Launches</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
              {launches.map(({ id, details, links, name }) => (
                <Link to={`/launches/${id}`} key={id}>
                  <article className="p-5 articles">
                    {/* When this is undefined, display placeholder image */}
                    <img src={links.patch.large} alt={name} loading="lazy" />
                    <h2 className="text-white font-bold text-xl my-1">
                      {name}
                    </h2>
                    {details ? (
                      <p className="text-white opacity-75 text-sm">{`${details.substring(
                        0,
                        50
                      )}...`}</p>
                    ) : (
                      <p></p>
                    )}
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
