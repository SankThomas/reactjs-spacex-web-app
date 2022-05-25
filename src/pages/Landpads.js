import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function Landpads() {
  const [landpads, setLandpads] = useState(null)

  useEffect(() => {
    const fetchLandPads = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/landpads`)
      const data = await res.json()
      setLandpads(data)
    }

    fetchLandPads()
  }, [])

  return (
    <>
      {!landpads ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 pt-32">
            <h1 className="heading">Landpads</h1>

            <div className="max-width grid grid-cols 1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {landpads.map(
                ({ images: { large }, type, full_name, details, id }) => (
                  <Link to={`/landpads/${id}`} key={id}>
                    <article className="articles">
                      <img
                        src={large}
                        alt={full_name}
                        className="h-52 w-full"
                      />
                      <div className="p-5">
                        <h2 className="text-white font-bold text-xl">
                          <span className="opacity-75 text-lg font-normal">
                            {type}
                          </span>
                          , {full_name}
                        </h2>
                        <p className="text-white opacity-75 text-sm">{`${details.substring(
                          0,
                          200
                        )}...`}</p>
                        <button className="inline-block mt-5">
                          <Link to={`/landpads/${id}`} className="btn">
                            Read More
                          </Link>
                        </button>
                      </div>
                    </article>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
