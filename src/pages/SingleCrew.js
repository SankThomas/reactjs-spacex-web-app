import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function SingleCrew() {
  const [singleCrew, setSingleCrew] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const crewMember = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/crew/${id}`)
      const data = await res.json()
      setSingleCrew(data)
    }

    crewMember()
  }, [id])

  return (
    <>
      {!singleCrew ? (
        <LoadingState />
      ) : (
        <>
          <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
            <article>
              <img src={singleCrew.image} alt={singleCrew.name} />
            </article>
            <article>
              <h1 className="heading-inner">{singleCrew.name}</h1>
              <h2 className="font-bold text-white text-xl mb-3">Details</h2>
              <ul className="text-white">
                <li className="mb-1 opacity-75">
                  Currently at {singleCrew.agency}
                </li>
                <li className="mb-1 opacity-75">
                  {singleCrew.launches.length} launches
                </li>
                <li
                  className={`capitalize mb-1 opacity-75 ${
                    singleCrew.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {singleCrew.status}
                </li>
              </ul>

              <ul className="flex items-center mt-5">
                <li className="mr-5">
                  <a href={singleCrew.wikipedia} className="btn">
                    Wiki
                  </a>
                </li>
                <li>
                  <Link to="/crew" className="text-white">
                    &larr; Back
                  </Link>
                </li>
              </ul>
            </article>
          </section>
        </>
      )}
    </>
  )
}
