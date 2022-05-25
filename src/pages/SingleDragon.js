import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function SingleDragon() {
  const [singleDragon, setSingleDragon] = useState(null)
  const [value, setValue] = useState(0)
  const [imperial, setImperial] = useState(false)
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
        <LoadingState />
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article>
            <h1 className="font-bold text-white text-3xl md:text-4xl lg:text-6xl capitalize mb-5">
              {singleDragon.name}
            </h1>
            <h2 className="text-white opacity-75 text-xl font-bold">
              First Flight Date: {singleDragon.first_flight}
            </h2>

            <article className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <ul className="text-white opacity-75 capitalize">
                <li>Type: {singleDragon.type}</li>
                <li>Crew: {singleDragon.crew_capacity}</li>
                {!imperial && (
                  <li>Dry Mass: {Math.floor(singleDragon.dry_mass_kg)} kg</li>
                )}
                {imperial && (
                  <li>Dry Mass: {Math.floor(singleDragon.dry_mass_lb)} lb</li>
                )}
                <li className={`${singleDragon.active && "text-green-500"}`}>
                  Active
                </li>
                <li className="mt-2">
                  <a href={singleDragon.wikipedia} className="btn">
                    Wiki
                  </a>
                </li>
              </ul>

              <ul
                style={{ backgroundColor: "#0F0F0F" }}
                className="p-5 text-white"
              >
                <h3 className="text-white uppercase font-bold">
                  heat shield details
                </h3>
                <li className="opacity-75">
                  Material: {singleDragon.heat_shield.material}
                </li>
                <li className="opacity-75">
                  Size: {singleDragon.heat_shield.size_meters} m
                </li>
                <li className="opacity-75">
                  Temperature: {singleDragon.heat_shield.temp_degrees} degrees
                </li>
                <li className="opacity-75">
                  Dev Partner: {singleDragon.heat_shield.dev_partner}
                </li>
              </ul>
            </article>

            <p className="text-white opacity-75 my-5">
              {singleDragon.description}
            </p>
          </article>

          <article className="mt-10 md:mt-0">
            <img
              src={singleDragon.flickr_images[value]}
              alt={singleDragon.name}
            />

            <ul className="flex items-center justify-start mt-5">
              {singleDragon.flickr_images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setValue(index)}
                  className="mr-2 cursor-pointer"
                >
                  <img
                    src={image}
                    alt={singleDragon.name}
                    className={`w-20 h-20 object-fit object-cover ${
                      value === index && "p-1 bg-white"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </article>

          <article>
            {imperial ? (
              // <Imperial key={singleDragon.id} {...singleDragon} />
              <ul className="text-white opacity-75 md:grid grid-cols-2 text-sm">
                <li>
                  Launch Payload Mass: {singleDragon.launch_payload_mass.lb} lb
                </li>
                <li>
                  Launch Payload Volume:{" "}
                  {singleDragon.launch_payload_vol.cubic_feet} ft
                  <sup>3</sup>
                </li>
                <li>
                  Return Payload Mass: {singleDragon.return_payload_mass.lb} lb
                </li>
                <li>
                  Return Payload Volume:{" "}
                  {singleDragon.return_payload_vol.cubic_feet} ft
                  <sup>3</sup>
                </li>
                <li>
                  Pressurized Capsule Payload Volume:{" "}
                  {singleDragon.pressurized_capsule.payload_volume.cubic_feet}{" "}
                  ft
                  <sup>3</sup>
                </li>
                <li>
                  Trunk Volume: {singleDragon.trunk.trunk_volume.cubic_feet} ft
                  <sup>3</sup>
                </li>
                <li>
                  Height With Trunk: {singleDragon.height_w_trunk.feet} ft
                </li>
                <li>Diameter: {singleDragon.diameter.feet} ft</li>
              </ul>
            ) : (
              // <Metric key={singleDragon.id} {...singleDragon} />
              <ul className="text-white opacity-75 md:grid grid-cols-2 text-sm">
                <li>
                  Launch Payload Mass: {singleDragon.launch_payload_mass.kg} kg
                </li>
                <li>
                  Launch Payload Volume:{" "}
                  {singleDragon.launch_payload_vol.cubic_meters} m<sup>3</sup>
                </li>
                <li>
                  Return Payload Mass: {singleDragon.return_payload_mass.kg} kg
                </li>
                <li>
                  Return Payload Volume:{" "}
                  {singleDragon.return_payload_vol.cubic_meters} m<sup>3</sup>
                </li>
                <li>
                  Pressurized Capsule Payload Volume:{" "}
                  {singleDragon.pressurized_capsule.payload_volume.cubic_meters}{" "}
                  m<sup>3</sup>
                </li>
                <li>
                  Trunk Volume: {singleDragon.trunk.trunk_volume.cubic_meters} m
                  <sup>3</sup>
                </li>
                <li>
                  Height With Trunk: {singleDragon.height_w_trunk.meters} m
                </li>
                <li>Diameter: {singleDragon.diameter.meters} m</li>
              </ul>
            )}
            <button
              onClick={() => setImperial(!imperial)}
              className="btn mt-10"
            >
              {imperial ? "Toggle Metric Units" : "Toggle Imperial Units"}
            </button>

            <Link to="/dragons" className="inline-block ml-5 text-white">
              &larr; Back
            </Link>
          </article>
        </section>
      )}
    </>
  )
}
