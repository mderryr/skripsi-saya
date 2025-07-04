import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis';



const credentialsJson = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),  // Convert escaped \n to actual newlines
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN
};


export async function GET(req:NextRequest){
  try{
    const auth = await new google.auth.GoogleAuth({ 
      credentials:credentialsJson,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] 
    });
  const client = auth.getClient()
    const googleSheet = google.sheets({ version: 'v4', auth: client as any });
    const sheettsId = 3
    // Query
    const range = `datainduk!B${sheettsId}:F`;

    const response1 = await googleSheet.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
    });

    // console.log(response1.data)

    if(!response1) throw new Error("Data Tidak ada")
    const data:any = []
    response1.data.values!.map((items:any)=>{
      data.push({
        tahun:items[0],
        total_induk:items[1],
        total_telur:items[2],
        menetas:items[3],
        tidak_menetas:items[4],
      })
    }) 

    // console.log(data)
    
    return NextResponse.json({ data });

  }catch(err:any ){
    console.log(err)
    return Response.json(err)
  }
}