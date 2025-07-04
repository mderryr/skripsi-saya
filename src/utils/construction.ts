
import { redirect } from 'next/navigation'
import { headers } from "next/headers";

export async function ConstructionRedirect ():Promise<void>{
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    
    if(pathname === "/pendataan"){
         redirect('/pendataan')
    }
    if (!process.env.UNDERCONSTRUCTION) {
         redirect('/construction')
    }
}