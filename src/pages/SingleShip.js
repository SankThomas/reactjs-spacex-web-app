import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingState from "../components/LoadingState"

// https://i.imgur.com/eJWx70Z.jpg

export default function SingleShip() {
  const [singleShip, setSingleShip] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleShip = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/ships/${id}`)
      const data = await res.json()
      setSingleShip(data)
    }

    fetchSingleShip()
  }, [id])

  return (
    <>
      {!singleShip ? (
        <LoadingState />
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article className="mb-10 md:mb-0">
            <div>
              <h1 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl capitalize mb-5">
                {singleShip.name}
              </h1>
              {!singleShip.year_built ? (
                <></>
              ) : (
                <h2 className="text-white text-2xl opacity-75 font-bold">
                  Built in {singleShip.year_built}
                </h2>
              )}
            </div>

            <article className="my-5">
              <ul className="text-white opacity-75 text-sm lg:text-base">
                <li>
                  {!singleShip.mass_kg
                    ? "Mass in kgs not indicated"
                    : `${singleShip.mass_kg.toLocaleString()} kg`}{" "}
                </li>
                <li>
                  {!singleShip.mass_lbs
                    ? "Mass in pounds not indicated"
                    : `${singleShip.mass_lbs.toLocaleString()} lbs`}{" "}
                </li>
                <li>{singleShip.launches.length} launches</li>
                <li>
                  <span className="font-bold">Type:</span> {singleShip.type}
                </li>
                {singleShip.active ? (
                  <li className="text-green-500">Active</li>
                ) : (
                  <li className="text-red-500">Inactive</li>
                )}
                <li>
                  <span className="font-bold">Home port: </span>
                  {singleShip.home_port}
                </li>
              </ul>

              <ul className="flex flex-wrap items-center justify-start mt-10">
                <li className="mr-5">
                  <a
                    href={singleShip.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Read More
                  </a>
                </li>
                <li>
                  <Link to="/ships" className="text-white">
                    &larr; Back
                  </Link>
                </li>
              </ul>
            </article>
          </article>

          <article>
            {!singleShip.image ? (
              <img
                src="https://i.imgur.com/eJWx70Z.jpg"
                alt={singleShip.name}
              />
            ) : (
              <img src={singleShip.image} alt="" />
            )}
          </article>
        </section>
      )}
    </>
  )
}
