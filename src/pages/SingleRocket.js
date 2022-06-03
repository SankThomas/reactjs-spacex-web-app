import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function SingleRocket() {
  const [singleRocket, setSingleRocket] = useState(null)
  const [value, setValue] = useState(0)
  const [imperial, setImperial] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleRocket = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      const data = await res.json()
      setSingleRocket(data)
    }

    fetchSingleRocket()
  }, [id])

  return (
    <>
      {!singleRocket ? (
        <LoadingState />
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article className="mb-10 md:mb-0">
            <div>
              <h1 className="font-bold text-white text-3xl md:text-4xl lg:text-6xl capitalize mb-5">
                {singleRocket.name}
              </h1>
              <h2 className="text-white opacity-75 font-bold text-lg lg:text-2xl capitalize">
                Type: {singleRocket.type}
              </h2>
              <h2 className="text-white opacity-75 font-bold text-lg lg:text-2xl capitalize mt-2">
                First Flight: {singleRocket.first_flight}
              </h2>

              <article className="mt-5 text-white md:grid grid-cols-2">
                <ul className="text-sm lg:text-base opacity-75">
                  <li>
                    <span className="font-bold">Cost per launch:</span>{" "}
                    {singleRocket.cost_per_launch.toLocaleString()} USD
                  </li>
                  <li>
                    <span className="font-bold">Company:</span>{" "}
                    {singleRocket.company}
                  </li>
                  <li>
                    <span className="font-bold">Success Rate:</span>{" "}
                    {singleRocket.success_rate_pct}%
                  </li>
                  {singleRocket.active ? (
                    <li className="text-green-500">Active</li>
                  ) : (
                    <li className="text-red-500">Inactive</li>
                  )}
                </ul>

                <ul className="text-sm lg:text-base opacity-75">
                  <li>
                    <span className="font-bold">Country:</span>{" "}
                    {singleRocket.country}
                  </li>
                  <li>
                    <span className="font-bold">Stages:</span>{" "}
                    {singleRocket.stages}
                  </li>
                  {imperial ? (
                    <>
                      <li>
                        <span className="font-bold">Height:</span>{" "}
                        {singleRocket.height.feet} ft
                      </li>
                      <li>
                        <span className="font-bold">Diameter:</span>{" "}
                        {singleRocket.diameter.feet} ft
                      </li>
                      <li>
                        <span className="font-bold">Mass:</span>{" "}
                        {singleRocket.mass.lb.toLocaleString()} lb
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span className="font-bold">Height:</span>{" "}
                        {singleRocket.height.meters} m
                      </li>
                      <li>
                        <span className="font-bold">Diameter:</span>{" "}
                        {singleRocket.diameter.meters} m
                      </li>
                      <li>
                        <span className="font-bold">Mass:</span>{" "}
                        {singleRocket.mass.kg.toLocaleString()} kg
                      </li>
                    </>
                  )}
                </ul>
              </article>

              <p className="text-white text-sm lg:text-base opacity-75 my-5">
                {singleRocket.description}
              </p>

              <ul className="flex items-center justify-start flex-wrap">
                <li className="mr-5">
                  <a
                    href={singleRocket.wikipedia}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Wiki
                  </a>
                </li>
                <li className="mr-5">
                  <button
                    onClick={() => setImperial(!imperial)}
                    className="btn"
                  >
                    {imperial ? "Toggle Metric Units" : "Toggle Imperial Units"}
                  </button>
                </li>
                <li>
                  <Link to="/rockets" className="text-white">
                    &larr; Back
                  </Link>
                </li>
              </ul>
            </div>
          </article>

          <article>
            <img
              src={singleRocket.flickr_images[value]}
              alt={singleRocket.name}
              className="h-72 w-full object-cover lg:h-96"
            />

            <ul className="flex items-center flex-wrap justify-start mt-5">
              {singleRocket.flickr_images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setValue(index)}
                  className={`cursor-pointer mr-2 mb-2 ${
                    value === index && "p-1 bg-white"
                  }`}
                >
                  <img src={image} alt={singleRocket.name} className="w-20" />
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  )
}
