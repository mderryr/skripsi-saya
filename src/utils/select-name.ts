import {textDetail} from '@/env/description.mjs'

export const TitelAutoSelect=(Tittle:string)=>{
    switch(Tittle){
        case "/admin/list-penyu-dikerami": return textDetail.penyuDikerami.tittle
        case "/admin/list-penyu-dilepas" : return textDetail.penyuDilepas.tittle
        case "/admin/list-penyu-dirawat" : return textDetail.penyuDiinkubasi.tittle
        case "/admin/list-mati-dirawat" : return textDetail.penyuMati.tittle
        case "/admin/list-penyu-menetas" : return textDetail.penyuMenetas.tittle
        case "/admin/list-penyu-naik" : return textDetail.penyuNaik.tittle
        case "/admin/list-inkubator" : return textDetail.inkubator.tittle
        default: return "Halaman Input Data"
    }
}

export const FunctionChangeForFunction=(Tittle:string,someFunction:()=>void)=>{
    switch(Tittle){
        case "/admin/list-penyu-dikerami": someFunction
        case "/admin/list-penyu-dilepas" : someFunction
        case "/admin/list-penyu-dirawat" : someFunction
        case "/admin/list-mati-dirawat" : someFunction
        case "/admin/list-penyu-menetas" : someFunction
        case "/admin/list-penyu-naik" :someFunction
        case "/admin/list-inkubator" : someFunction
        default: return someFunction
    }
}