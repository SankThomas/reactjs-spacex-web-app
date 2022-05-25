import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function SingleLandpad() {
  const [singleLandpad, setSingleLandpad] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleLandpad = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/landpads/${id}`)
      const data = await res.json()
      setSingleLandpad(data)
    }
    fetchSingleLandpad()
  }, [id])

  return (
    <>
      {!singleLandpad ? (
        <LoadingState />
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article className="mb-10 md:mb-0">
            <div>
              <h1 className="font-bold text-white text-3xl md:text-4xl lg:text-6xl capitalize mb-5">
                {singleLandpad.full_name}
              </h1>
              <h2 className="opacity-75 text-white font-bold text-lg lg:text-2xl">
                {singleLandpad.name}
              </h2>

              <article className="mt-5 text-white md:grid grid-cols-2">
                <ul>
                  <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {singleLandpad.launches.length}
                    </span>{" "}
                    Launches
                  </li>
                  <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {singleLandpad.landing_successes}
                    </span>
                    Successful Landings
                  </li>
                  <li
                    className={`flex items-center justify-start capitalize ${
                      singleLandpad.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span className="font-bold text-lg mr-2">Status: </span>
                    {singleLandpad.status}
                  </li>
                </ul>

                <ul>
                  <li className="font-bold">Location</li>
                  <li className="opacity-75">
                    Locality: {singleLandpad.locality}
                  </li>
                  <li className="opacity-75">Region: {singleLandpad.region}</li>
                </ul>
              </article>

              <p className="mt-5 opacity-75 text-white">
                {singleLandpad.details}
              </p>
            </div>
            <ul className="flex items-center mt-5">
              <li className="mr-5">
                <a href={singleLandpad.wikipedia} className="btn">
                  Wiki
                </a>
              </li>
              <li>
                <Link to="/landpads" className="text-white">
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <img
              src={singleLandpad.images.large[0]}
              alt={singleLandpad.name}
              className="h-full object-cover"
            />
          </article>
        </section>
      )}
    </>
  )
}
