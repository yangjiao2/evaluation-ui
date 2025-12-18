'use client'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

// this is to handle the callback from auth/sso 
export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(()=> {
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
    var searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code') || searchParams.get('code');
    const state = searchParams.get('state') || searchParams.get('state');
    console.log('Callback', code, state)
    
    if(code && state) {
      const returnUrlFromSession = sessionStorage.getItem('returnUrl') || ''
      let url = ''
      if(state === 'returnUrl') {
        url = `${returnUrlFromSession ? returnUrlFromSession : '/'}?code=${code}&state=${state}`
      }
      else {
        url = `${state}?code=${code}&state=${state}`
      }
      console.log('url', url)
      if(url.includes('[bot]')){
        // console.log('hit /callback route, url contails url.includes([bot]), so removing that')
        url = url.replace('[bot]', '')
      }
      // console.log('hit /callback route', {origin, redirectUrl: url, state, code})
      router.push(url)
    }

    const userLoggedIn = sessionStorage.getItem("IsUserLoggedIn") === 'true' 
    if(userLoggedIn) {
      const returnUrlFromSession = sessionStorage.getItem('returnUrl') || ''
      const url = returnUrlFromSession ? returnUrlFromSession : '/'
      // console.log('hit /callback route with useer logged in', {origin, redirectUrl: url})
      router.push(url)
    }
  })
  return
}