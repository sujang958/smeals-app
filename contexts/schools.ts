import { createContext } from "react"
import { SchoolReducerActions } from "../App"
import { TResult } from "../screens/search"

type SchoolsContextType = {
  schools: TResult[]
  dispatch: React.Dispatch<SchoolReducerActions>
}

const SchoolsContext = createContext<SchoolsContextType>({
  schools: [],
  dispatch: (v) => v,
})

export default SchoolsContext
