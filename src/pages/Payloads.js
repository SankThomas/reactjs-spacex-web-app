import { useState, useEffect } from "react"
import LoadingState from "../components/LoadingState"

export default function Payloads() {
  const [payloads, setPayloads] = useState(null)

  useEffect(() => {
    const fetchPayloads = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/payloads`)
      const data = await res.json()
      setPayloads(data)
    }

    fetchPayloads()
  }, [])

  return (
    <>
      {!payloads ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Payloads</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {payloads.map(
                ({
                  id,
                  reference_system,
                  orbit,
                  name,
                  type,
                  customers,
                  nationalities,
                  manufacturers,
                }) => (
                  <article className="p-5 articles" key={id}>
                    <h2 className="text-white font-bold text-xl my-1">
                      {name}, <span className="opacity-75 text-lg">{type}</span>
                    </h2>

                    <ul className="text-sm text-white opacity-75 mt-2">
                      <li>Orbit: {orbit}</li>
                      <li>Reference System: {reference_system}</li>
                    </ul>

                    <h3 className="text-white font-bold text-base mt-2">
                      Customers:
                    </h3>
                    <ul className="text-sm text-white opacity-75">
                      {customers.map((customer, index) => (
                        <li key={index}>{customer}</li>
                      ))}
                    </ul>

                    <h3 className="text-white font-bold text-base mt-2">
                      Manufacturers:
                    </h3>
                    <ul className="text-sm text-white opacity-75">
                      {manufacturers.map((manufacturer, index) => (
                        <li key={index}>{manufacturer}</li>
                      ))}
                    </ul>

                    <h3 className="text-white font-bold text-base mt-2">
                      Countries:
                    </h3>
                    <ul className="text-sm text-white opacity-75">
                      {nationalities.map((nationality, index) => (
                        <li key={index}>{nationality}</li>
                      ))}
                    </ul>
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
