import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function Dragons() {
  const [dragons, setDragons] = useState(null)

  useEffect(() => {
    const fetchDragons = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/dragons`)
      const data = await res.json()
      setDragons(data)
    }

    fetchDragons()
  }, [])

  return (
    <>
      {!dragons ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Dragons</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2">
              {dragons.map(({ name, flickr_images, description, id }) => (
                <Link to={`/dragons/${id}`} key={id}>
                  <article className="articles">
                    <img
                      src={flickr_images[0]}
                      alt={name}
                      loading="lazy"
                      className="md:h-52 lg:h-80 h-full object-cover object-fit w-full"
                    />
                    <div className="p-5">
                      <h2 className="text-white font-bold text-xl">{name}</h2>
                      <p className="text-white opacity-75 text-sm">
                        {`${description.substring(0, 200)}...`}
                      </p>
                      <button className="inline-block mt-5">
                        <Link to={`/dragons/${id}`} className="btn">
                          Read More
                        </Link>
                      </button>
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
