import style from './TempPlayground.module.css'

const CELLS = 6 * 6

function TempPlayground() {
  return (
    <div className={style.board}>
      {Array.from({ length: CELLS }, (_, i) => (
        <div key={i} className={style.cell} />
      ))}
    </div>
  )
}

export default TempPlayground