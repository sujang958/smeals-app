import { EventHandler, useState } from "react"

const useInput = (initial = ""): [string, (text: string) => void] => {
  const [value, setValue] = useState("")
  const onChange = (text: string) => setValue(text)

  return [value, onChange]
}

export default useInput
