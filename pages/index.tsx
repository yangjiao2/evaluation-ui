import { useRouter } from 'next/router'
import { useEffect } from 'react'
 
export default function Page() {
  const router = useRouter()
  useEffect(()=> {
    console.log("Page, pages/index.tsx", window?.location?.origin)
    let redirectUrl = '/dashboard/home'

    // if(window?.location?.origin.includes('scout')){[
    //   redirectUrl = '/bot/scout'
    // ]}

    // else if(window?.location?.origin.includes('nvbot')){
    //   redirectUrl = '/bot/nvhelp'
    // }

    // else if(window?.location?.origin.includes('avc')){
    //   redirectUrl = '/bot/avc'
    // }

    // else if(window?.location?.origin.includes('perceptor')){
    //   redirectUrl = '/bot/nautobot'
    // }

    // else if(window?.location?.origin.includes('nvsalesbot')){
    //   redirectUrl = '/bot/sales'
    // }

    // else {
    //   redirectUrl = '/bot/nvhelp'
    // }
    
    // console.log('hit /', {href: window?.location?.href, origin, redirectUrl})
    router.push({
      pathname: redirectUrl,
      query: {
        ...router.query
      }
    })
  })
  return
}