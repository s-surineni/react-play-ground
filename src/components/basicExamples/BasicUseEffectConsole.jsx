import { useEffect } from "react"

const BasicUseEffectConsole = () => {
    useEffect(()=> {
        console.log('useEffect')
    })
    return <>hello</>
}

export default BasicUseEffectConsole