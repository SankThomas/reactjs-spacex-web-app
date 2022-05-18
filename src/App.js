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
  Roadster,
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
          <Route path="/roadster" element={<Roadster />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
