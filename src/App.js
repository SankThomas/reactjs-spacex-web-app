import { BrowserRouter, Routes, Route } from "react-router-dom"
// import CheckOnlineStatus from "./components/CheckOnlineStatus"
import Header from "./components/Header"
import {
  Homepage,
  Capsules,
  Cores,
  Crew,
  SingleCrew,
  Dragons,
  SingleDragon,
  Landpads,
  SingleLandpad,
  Launches,
  Roadster,
  Error,
  SingleLaunches,
  Launchpads,
  SingleLaunchpad,
  Payloads,
  Rockets,
  SingleRocket,
  Ships,
  SingleShip,
  Starlink,
} from "./pages"

export default function App() {
  return (
    <>
      {/* <CheckOnlineStatus /> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/capsules" element={<Capsules />}></Route>
          <Route path="/cores" element={<Cores />}></Route>
          <Route path="/crew" element={<Crew />}></Route>
          <Route path="/crew/:id" element={<SingleCrew />}></Route>
          <Route path="/dragons" element={<Dragons />}></Route>
          <Route path="/dragons/:id" element={<SingleDragon />}></Route>
          <Route path="/landpads" element={<Landpads />}></Route>
          <Route path="/landpads/:id" element={<SingleLandpad />}></Route>
          <Route path="/launches" element={<Launches />}></Route>
          <Route path="/launches/:id" element={<SingleLaunches />}></Route>
          <Route path="/launchpads" element={<Launchpads />}></Route>
          <Route path="/launchpads/:id" element={<SingleLaunchpad />}></Route>
          <Route path="/payloads" element={<Payloads />}></Route>
          <Route path="/roadster" element={<Roadster />}></Route>
          <Route path="/rockets" element={<Rockets />}></Route>
          <Route path="/rockets/:id" element={<SingleRocket />}></Route>
          <Route path="/ships" element={<Ships />}></Route>
          <Route path="/ships/:id" element={<SingleShip />}></Route>
          <Route path="/starlink" element={<Starlink />}></Route>
          {/* Reroute error links back to the homepage */}
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
