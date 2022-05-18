import { useCallback, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function CheckOnlineStatus() {
  const isOnline = navigator.onLine

  const checkIsOnline = useCallback(() => {
    if (!isOnline) {
      toast.success("Back online")
      console.log("Online")
    } else {
      toast.error("You seem to be offline.")
      console.log("Offline")
    }
  }, [isOnline])

  useEffect(() => {
    checkIsOnline()
  }, [isOnline, checkIsOnline])

  return <ToastContainer position="top-right" theme="colored" />
}
