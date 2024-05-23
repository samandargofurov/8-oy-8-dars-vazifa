import { NavLink, Route, Routes } from "react-router-dom"
import Hour from "./pages/Hour"
import Day from "./pages/Day"
import TwoYears from "./pages/TwoYears"
import OneYears from "./pages/OneYear"
import Month from "./pages/Month"
import Week from "./pages/Week"
import FiveYears from "./pages/FiveYears"
import TenYears from "./pages/TenYears"
import './App.css'

function App() {
  return (
    <>
    <header>
    <div className="flex justify-center gap-10 mt-5 mb-5">
        <p><NavLink to='/12H'>12H</NavLink></p>
        <p><NavLink to='/1D'>1D</NavLink></p>
        <p><NavLink to='/1W'>1W</NavLink></p>
        <p><NavLink to='/1M'>1M</NavLink></p>
        <p><NavLink to='/1Y'>1Y</NavLink></p>
        <p><NavLink to='/2Y'>2Y</NavLink></p>
        <p><NavLink to='/5Y'>5Y</NavLink></p>
        <p><NavLink to='/10Y'>10Y</NavLink></p>
      </div>
    </header>
    <Routes>
      <Route path="/12H" element={<Hour></Hour>}></Route>
      <Route path="/1D" element={<Day></Day>}></Route>
      <Route path="/1W" element={<Week></Week>}></Route>
      <Route path="/1M" element={<Month></Month>}></Route>
      <Route path="/1Y" element={<OneYears></OneYears>}></Route>
      <Route path="/2Y" element={<TwoYears></TwoYears>}></Route>
      <Route path="/5Y" element={<FiveYears></FiveYears>}></Route>
      <Route path="/10Y" element={<TenYears></TenYears>}></Route>
    </Routes>
    </>
  )
}

export default App