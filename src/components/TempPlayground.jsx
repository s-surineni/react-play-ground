import "./TempPlayground.module.css"
export default function TempPlayground() {
  return (<>
    <ProgressBar fillPercentage={50} />
  </>)
}

function ProgressBar({ fillPercentage }) {
  return (
    <div className="progress-bar">
      {fillPercentage}%
      <div className="progress-fill" style={{ width: `${fillPercentage}%`,
    height: "100%" }}></div>
    </div>
  )
}