import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

export default function SingleDragon() {
  const [singleDragon, setSingleDragon] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchDragon = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/dragons/${id}`)
      const data = await res.json()
      setSingleDragon(data)
    }
    fetchDragon()
  }, [id])

  return (
    <>
      {!singleDragon ? (
        <div className="loading-spinner">
          <article></article>
          <p>The spinny thingy means it's working</p>
        </div>
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article>
            <h1 className="font-bold text-white text-3xl md:text-4xl lg:text-6xl capitalize mb-5">
              {singleDragon.name}
            </h1>
            <ul className="flex items-center mt-5">
              <li className="mr-5">
                <a href={singleDragon.wikipedia} className="btn">
                  Wiki
                </a>
              </li>
              <li>
                <Link to="/dragons" className="text-white">
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <img src={singleDragon.flickr_images[0]} alt={singleDragon.name} />
          </article>
        </section>
      )}
    </>
  )
}
