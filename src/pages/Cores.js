import { useState, useEffect } from "react"
import LoadingState from "../components/LoadingState"

export default function Cores() {
  const [cores, Cores] = useState(null)

  useEffect(() => {
    const fetchCores = async () => {
      const res = await fetch("https://api.spacexdata.com/v4/cores")
      const data = await res.json()
      Cores(data)
    }

    fetchCores()
  }, [])

  return (
    <>
      {!cores ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Cores</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cores.map(
                ({
                  reuse_count,
                  rtls_landings,
                  asds_landings,
                  last_update,
                  launches,
                  serial,
                  status,
                  id,
                }) => (
                  <article key={id} className="articles p-5">
                    <h2 className="text-white font-bold text-xl">{serial}</h2>
                    <ul className="text-sm opacity-75 text-white mt-3">
                      <li>Reused {reuse_count} times</li>
                      <li>{launches.length} launches</li>
                      <li>{rtls_landings} RTLS landings</li>
                      <li>{asds_landings} ASDS landings</li>
                      <li
                        className={`capitalize ${
                          status === "active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        Status: {status}
                      </li>
                    </ul>
                    <p className="text-white text-sm opacity-75 mt-3">
                      {last_update}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
