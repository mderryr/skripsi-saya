'use server'

import { headers } from 'next/headers'
// import {userAgent} from 'next/server'
// import UAParser from 'ua-parser-js'

export async function getDeviceType(): Promise<'mobile' | 'desktop' | 'tablet'> {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''

  const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const tabletPattern = /iPad|Android(?!.*Mobile)|Tablet/i

  if (tabletPattern.test(userAgent)) {
    return 'tablet'
  } else if (mobilePattern.test(userAgent)) {
    return 'mobile'
  } else {
    return 'desktop'
  }
}

export async function isMobile(): Promise<boolean> {
  const device = await getDeviceType()
//   console.log(device)
  return device === 'mobile'
// return true
}

export async function isDesktop(): Promise<boolean> {
  const device = await getDeviceType()
  return device === 'desktop'
}

// Reusable layout component
export async function ResponsiveLayout({ 
  mobile, 
  desktop 
}: { 
  mobile: React.ReactNode
  desktop: React.ReactNode 
}) {
  const deviceType = await getDeviceType()
  console.log("ResponsiveLayout Device:", deviceType)
  return deviceType === 'mobile' ? mobile : desktop
}