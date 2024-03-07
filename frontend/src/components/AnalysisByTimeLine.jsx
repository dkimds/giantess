import '../style.css'
import SpreadsheetData from "./SpreadsheetData.jsx";


const AnalysisByTimeLine = ({timeframe}) => {

  const MediaBias = () => {
    return (
      <div className='analysis'>
        <h3>미디어별 감정 분석 결과 분포</h3>
        <iframe className='iframe-analysis2'
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR_32QLMj8yFcaAyDxpMWevlv9VX5UQvmp1DuW5faGVZmdRszWK5j0OtTwj1Pq1sCpzBakjQXGAT2jJ/pubchart?oid=1084013363&format=interactive">
        </iframe>
      </div>
    )
  }


  switch (timeframe) {
    case 'daily':
      return (
        <div className='analysis-container'>

          <div className='analysis'>
            <h3>일간 감성분석결과</h3>
            <iframe className='iframe-analysis'
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR_32QLMj8yFcaAyDxpMWevlv9VX5UQvmp1DuW5faGVZmdRszWK5j0OtTwj1Pq1sCpzBakjQXGAT2jJ/pubchart?oid=2122005342&amp;format=interactive">
            </iframe>

            <br/>
            <MediaBias />
            <h3>주요 키워드</h3>
            <SpreadsheetData />
          </div>

        </div>
      )
    case 'weekly':
      return (
        <div className='analysis-container'>

          <div className='analysis'>
            <h3>주간 감성분석결과</h3>
            <iframe className='iframe-analysis'
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR_32QLMj8yFcaAyDxpMWevlv9VX5UQvmp1DuW5faGVZmdRszWK5j0OtTwj1Pq1sCpzBakjQXGAT2jJ/pubchart?oid=950049376&amp;format=interactive">
            </iframe>
            <br/>

            <MediaBias />
            <h3>주요 키워드</h3>
            <SpreadsheetData/>
          </div>
        </div>
      )
    case 'monthly':
      return (
        <div className='empty'>
          추후에 추가될 예정입니다.
        </div>
      )
  }
}

export default AnalysisByTimeLine