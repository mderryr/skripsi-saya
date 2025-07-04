export const numberWithCommas = (number:number)=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const ordinalSuffix = (number:number)=>{
    let j = number % 10,
        k = number % 100;
    if (j == 1 && k != 11) {
        return number + "st";
    }
    if (j == 2 && k != 12) {
        return number + "nd";
    }
    if (j == 3 && k != 13) {
        return number + "rd";
    }
    return number + "th";
}

export const compactNumber = (value:number)=>{
    const suffixes = ["","k","m","b","t"]
    const suffixNum = Math.floor((""+value).length/3)

    let shortValue:number|string = parseFloat((suffixNum !== 0 ? (value/Math.pow(100,suffixNum)):value).toPrecision(2))

    if(shortValue%1!==0) {
        shortValue = shortValue.toFixed(1)
    }
    return shortValue+suffixes[suffixNum]
}