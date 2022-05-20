import { useState, useEffect } from "react"
import LoadingState from "../components/LoadingState"

export default function Homepage() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/company`)
      const data = await res.json()
      setItems(data)
    }

    fetchItems()
  }, [])

  return (
    <>
      <section className="showcase">
        <div className="overlay px-5">
          <h1 className="heading">
            All SpaceX info in one place{" "}
            <span className="block mt-2 opacity-50">
              aside from their website
            </span>
          </h1>

          {!items ? (
            <LoadingState />
          ) : (
            <>
              <div className="flex flex-col justify-center md:flex-row">
                <article className="mt-5 mb-5 sm:mt-0 md:mr-10 lg:mr-20">
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    About
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Founded in {items.founded} by {items.founder}
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Has {items.employees} employees,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {items.vehicles} space vehicles,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {items.vehicles} launch sites,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      and {items.test_sites} test sites,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Valued at ${items.valuation.toLocaleString()}.
                    </li>
                  </ul>
                </article>

                <article className="mb-5 md:mr-10 lg:mr-20">
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    Headquarters
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {items.headquarters.address},
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {items.headquarters.city}, {items.headquarters.state}
                    </li>
                  </ul>
                </article>

                <article>
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    Social Media
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={items.links.website}>Website</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={items.links.flickr}>Flickr</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={items.links.twitter}>Twitter</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={items.links.elon_twitter}>Elon Musk Twitter</a>
                    </li>
                  </ul>
                </article>
              </div>

              <div className="text-center">
                <p className="text-white mt-10 sm:max-w-7xl md:max-w-5xl lg:max-w-2xl">
                  {items.summary}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
