const parse = (array) => {
    const resArr = [];
    for (let el of array){
        switch(el){
            case 'd-':
                resArr.push(DAY_EARLIER);
                break;
            case 'd+':
                resArr.push(DAY_LATER);
                break;
            case 'h-':
                resArr.push(HOUR_EARLIER);
                break;
            case 'h+':
                resArr.push(HOUR_LATER);
                break;
            
        }
    }
    return resArr;
}

module.exports = {parse};