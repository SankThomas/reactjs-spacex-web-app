import { useState, useEffect } from "react"
import LoadingState from "../components/LoadingState"
import { format } from "date-fns"

export default function Roadster() {
  const [details, setDetails] = useState(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const fetchRoadsetDetails = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/roadster`)
      const data = await res.json()
      setDetails(data)
    }

    fetchRoadsetDetails()
  }, [])

  return (
    <>
      {!details ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay pt-20 lg:pt-32">
            <h1 className="heading">Elon Musk's Tesla Roadster</h1>
          </div>

          <div className="max-width">
            <div className="articles p-5 rounded shadow mb-20">
              <article className="md:flex flex-row-reverse">
                <img
                  src={details.flickr_images[value]}
                  alt={details.name}
                  className="w-full object-fit object-cover md:w-11/12"
                />
                <ul className="flex md:flex-col items-center justify-start mt-5 md:mt-0 md:mr-5">
                  {details.flickr_images.map((image, index) => (
                    <li
                      onClick={() => setValue(index)}
                      className="cursor-pointer"
                    >
                      <img
                        key={index}
                        src={image}
                        alt={details.name}
                        className={`w-20 bg-white mx-1 md:mx-0 md:my-2 ${
                          value === index && "p-1"
                        }`}
                      />
                    </li>
                  ))}
                </ul>
              </article>

              <p className="mt-5 text-white opacity-75">{details.details}</p>

              <article className="grid grid-cols-1 md:grid-cols-2 opacity-75 mt-5">
                <ul className="text-white">
                  <li>
                    <span className="font-bold">Launch Date: </span>{" "}
                    {format(new Date(details.launch_date_utc), "dd MMMM yyyy")}
                  </li>
                  <li>
                    <span className="font-bold">Launch Mass: </span>
                    {details.launch_mass_kg} kg
                  </li>
                  <li>
                    <span className="font-bold">Days Since Launch: </span>{" "}
                    {Math.floor(details.period_days)} days
                  </li>
                  <li>
                    <span className="font-bold">Speed: </span>
                    {Math.floor(details.speed_kph)} kph
                  </li>
                </ul>

                <ul className="text-white">
                  <li>
                    <span className="font-bold">Distance From The Earth: </span>
                    {Math.floor(details.earth_distance_km).toLocaleString()} km
                  </li>
                  <li>
                    <a
                      href={details.wikipedia}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Wikipedia
                    </a>
                  </li>
                  <li>
                    <a
                      href={details.video}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      YouTube Video
                    </a>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
