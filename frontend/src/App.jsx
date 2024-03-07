import React, { useState } from 'react';
import Header from './components/Header.jsx'
import './style.css'
import Footer from "./components/Footer.jsx"
import AnalysisByTimeLine from "./components/AnalysisByTimeLine.jsx";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";

const Home = () => {
  return (
    <div className='airtable-container'>
      <div className="airtable">
        <iframe className="airtable-embed"
                src="https://airtable.com/embed/appQSVmonWlsUImRc/shrxApnVpf8TXJ7BY?backgroundColor=orange&viewControls=on">
        </iframe>
      </div>
    </div>
  )
}

const padding = {
  padding: 10
}

const Analysis = () => {

  const [page, setPage] = useState('weekly')

  const toPage = (page) => (e) => {
    e.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'daily')
      return <AnalysisByTimeLine timeframe='daily' />

    else if (page === 'weekly')
      return <AnalysisByTimeLine timeframe='weekly' />

    else if (page === 'monthly')
      return <AnalysisByTimeLine timeframe='monthly' />
  }

  return (
    <div className='analysis-nav'>
      <button onClick={toPage('daily')}>
        일간
      </button>
      <button onClick={toPage('weekly')}>
        주간
      </button>
      <button onClick={toPage('monthly')}>
        월간
      </button>

      {content()}
    </div>
  )
}

const App = () => {

  return (
    <>
      <Header/>
      <Router>
        <div className='nav-tabs'>
          <Link style={padding} to='/'>참조한 뉴스</Link>
          <Link style={padding} to='/analysis'>결과분석</Link>
        </div>
          <Routes>
            <Route path='/analysis' element={<Analysis />} />
            <Route path='/' element ={<Home />} />
          </Routes>
        </Router>
      <Footer />
    </>
  )
}


export default App