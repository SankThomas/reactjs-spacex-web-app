import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function SingleLaunchpad() {
  const [singleLaunchPad, setSingleLaunchPad] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleLaunchpad = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${id}`)
      const data = await res.json()
      setSingleLaunchPad(data)
    }

    fetchSingleLaunchpad()
  }, [id])

  return (
    <>
      {!singleLaunchPad ? (
        <LoadingState />
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article className="mb-10 md:mb-0">
            <div>
              <h1 className="font-bold text-white text-3xl md:text-4xl capitalize mb-5">
                {singleLaunchPad.full_name}
              </h1>
              <h2 className="opacity-75 text-white font-bold text-lg lg:text-2xl">
                {singleLaunchPad.name}
              </h2>

              <article className="mt-5 text-white md:grid grid-cols-2">
                <ul>
                  <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {singleLaunchPad.launches.length}
                    </span>{" "}
                    Launches Attempts
                  </li>
                  <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {singleLaunchPad.launch_successes}
                    </span>
                    Successful Launches
                  </li>
                  <li
                    className={`flex items-center justify-start capitalize ${
                      singleLaunchPad.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span className="font-bold text-lg mr-2">Status: </span>
                    {singleLaunchPad.status}
                  </li>
                </ul>

                <ul>
                  <li className="font-bold">Location</li>
                  <li className="opacity-75">
                    Locality: {singleLaunchPad.locality}
                  </li>
                  <li className="opacity-75">
                    Region: {singleLaunchPad.region}
                  </li>
                </ul>
              </article>

              <p className="text-white opacity-75 text-sm lg:text-base mt-5">
                {singleLaunchPad.details}
              </p>

              <button className="inline-block mt-5 text-white">
                <Link to="/launchpads">&larr; Back</Link>
              </button>
            </div>
          </article>

          <article>
            <img
              src={singleLaunchPad.images.large[0]}
              alt={singleLaunchPad.name}
              className="w-full h-72 object-cover md:h-96"
            />
          </article>
        </section>
      )}
    </>
  )
}
