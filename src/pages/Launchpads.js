import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function Launchpads() {
  const [launchPads, setLaunchPads] = useState(null)

  useEffect(() => {
    const fetchLaunchPads = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/launchpads`)
      const data = await res.json()
      setLaunchPads(data)
    }

    fetchLaunchPads()
  }, [])

  return (
    <>
      {!launchPads ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Launchpads</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {launchPads.map(({ id, name, details, images }) => (
                <Link to={`/launchpads/${id}`} key={id}>
                  <article className="articles">
                    <img
                      src={images.large[0]}
                      alt={name}
                      loading="lazy"
                      className="h-52 w-full object-cover md:h-72"
                    />
                    <div className="p-5">
                      <h2 className="text-white font-bold text-xl my-1">
                        {name}
                      </h2>
                      <p className="text-white opacity-75 text-sm mb-5">
                        {`${details.substring(0, 100)}...`}
                      </p>
                      <Link to={`/launchpads/${id}`} className="btn">
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
