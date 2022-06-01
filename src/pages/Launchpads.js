import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingState from "../components/LoadingState"

export default function Launchpads() {
  const [launchPads, setLaunchPads] = useState(null)

  useEffect(() => {
    const fetchLaunchPads = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/launchpads`)
      const data = await res.json()
      setLaunchPads(data)
    }

    fetchLaunchPads()
  }, [])

  return <>Launchpads</>
}
