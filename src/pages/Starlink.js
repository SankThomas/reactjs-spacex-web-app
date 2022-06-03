import { useState, useEffect } from "react"
import LoadingState from "../components/LoadingState"

export default function Starlink() {
  const [starlink, setStarlink] = useState(null)

  useEffect(() => {
    const fetchStarlink = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/starlink`)
      const data = await res.json()
      setStarlink(data)
    }

    fetchStarlink()
  }, [])

  return (
    <>
      {!starlink ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 pt-32">
            <h1 className="heading">Starlink</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {starlink.map(({ id, version, spaceTrack }) => (
                <article key={id} className="articles p-5">
                  <h2 className="text-white text-xl font-bold mb-2">
                    {spaceTrack.OBJECT_NAME},{" "}
                    <span className="text-base opacity-75">{version}</span>
                  </h2>
                  <p className="text-sm lg:text-base text-white opacity-75">
                    <span className="font-bold">Launch Date: </span>
                    {spaceTrack.LAUNCH_DATE}
                  </p>
                  <p className="text-sm lg:text-base text-white opacity-75">
                    <span className="font-bold">Launch Site: </span>
                    {spaceTrack.SITE}
                  </p>
                  <p className="text-sm lg:text-base text-white opacity-75 mt-2">
                    G
                    <span className="lowercase">{`${spaceTrack.COMMENT.substring(
                      1,
                      33
                    )}`}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
