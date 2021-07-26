import { useEffect } from "react"
import { useRef } from "react"
import { Link } from "react-router-dom"

const GoToLogin = () => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.click();
  }, [])

  return <div>
    <Link className=" h-10 cursor-pointer" to="/login?notAdmin=true" target='_parent' ref={ref}/>
  </div>
}

export default GoToLogin 