import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useOnboardCTA = () => {
  const { user } = useUser()
  const [text, setText] = useState('Get Started')
  const [href, setHref] = useState('SIGNIN')
  const subscriptionFlowEnabled = false

  // 1. sign in 2. pay 3. install
  useEffect(() => {
    if (user) {
      const { publicMetadata: { isCustomer, isInstalled }, ...t } = user
      console.log(t)

      // TODO: disabling customer check for demo !
      if (subscriptionFlowEnabled) {
        //if (!isCustomer) {
        setText('Mint Bitcode')
        setHref('SUBSCRIBE')
        //setHref('https://buy.stripe.com/6oE9Bx0d05yugpO4gh')
      } else {
        if (isInstalled) {
          setText('Configure App')
        } else {
          setText('Install App')
        }
        setHref('https://github.com/marketplace/bitcode-github-app')
      }
    } else {
      setText('Get Started')
      setHref('SIGNIN')
      //setHref('https://accounts.engi.exchange/sign-up')
    }
  }, [subscriptionFlowEnabled, user])

  return { text, href }
}
