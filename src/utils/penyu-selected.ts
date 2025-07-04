export const selectedPenyuId = (penyu:any,selectedPenyu:any) =>{
    let selected = 0
    penyu.data.map(({id,nama}:any)=>{
       if(nama === selectedPenyu){
       selected = id
       }
     })
     return selected
}