import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingState from "../components/LoadingState"
import { format } from "date-fns"

// Get a placeholder image

export default function SingleLaunches() {
  const [singleLaunch, setSingleLaunch] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleLaunch = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      const data = await res.json()
      setSingleLaunch(data)
    }

    fetchSingleLaunch()
  }, [id])

  return (
    <>
      {!singleLaunch ? (
        <LoadingState />
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article>
            <img src={singleLaunch.links.patch.large} alt={singleLaunch.name} />
            {/* When this is undefined, display placeholder image */}
            {/* {singleLaunch.links.patch.large ? (
            ) : (
              <figure>
                <img
                  src={singleLaunch[0].links.patch.large}
                  alt={singleLaunch.name}
                />
                <figcaption>This is a placeholder image</figcaption>
              </figure>
            )} */}
          </article>

          <article>
            <h1 className="heading-inner">{singleLaunch.name}</h1>
            <h2 className="text-white text-xl opacity-75 mb-5 font-bold">
              Launch Date:{" "}
              {format(new Date(singleLaunch.date_utc), "dd MMMM yyyy")},{" "}
              {singleLaunch.success ? (
                <span className="text-green-500">Successful</span>
              ) : (
                <span className="text-red-500">Failed</span>
              )}
            </h2>

            {singleLaunch.details ? (
              <p className="text-white opacity-75 text-sm lg:text-base mb-5">
                {singleLaunch.details}
              </p>
            ) : (
              <p></p>
            )}

            <ul className="text-white opacity-75">
              <li>
                Fairings:{" "}
                {singleLaunch.fairings
                  ? `${singleLaunch.fairings.reused ? "Reused" : "Not Reused"}`
                  : "No Fairings Used"}
              </li>
              <li>
                Recovered:{" "}
                {singleLaunch.fairings
                  ? `${
                      singleLaunch.fairings.recovered
                        ? "Fairings Recovered"
                        : "Fairings Not Recovered"
                    }`
                  : "No Fairings Used"}
              </li>
            </ul>

            <ul className="mt-5 flex flex-wrap items-center justify-start">
              <li className="mr-2 mb-2 md:mb-0">
                <a href={singleLaunch.links.article} className="btn">
                  Read Article
                </a>
              </li>
              <li className="mb-2 md:mb-0">
                <a href={singleLaunch.links.presskit} className="btn">
                  Presskit
                </a>
              </li>
            </ul>

            <article className="mt-5">
              <a href={singleLaunch.links.webcast} className="btn">
                Watch Launch on YouTube
              </a>
            </article>

            <button className="text-white mt-5">
              <Link to="/launches">&larr; Back</Link>
            </button>
          </article>
        </section>
      )}
    </>
  )
}
