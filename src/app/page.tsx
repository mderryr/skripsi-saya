import LandingPage from "@/app/landing-page.view"
import { Suspense } from "react"
import Loading from './loading'
import {ConstructionRedirect} from '@/utils/construction'

export default function Home() {

  ConstructionRedirect()

  return(
    <Suspense fallback={<Loading />}>
      <LandingPage />
    </Suspense> 
  )

}


