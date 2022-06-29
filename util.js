module.exports = function getRandomName(array, num) {
    var payload=[];
    var check = [];
    for(let i = 0; i < num ; i++){
        var randomIndex = Math.floor(Math.random() * array.length);
        
        if(!check.includes(randomIndex)){
            check.push(randomIndex);
            var returnedNames = array[randomIndex];
            var temp={
            id:i,
            first_name:returnedNames
            }
            payload.push(temp);
        }else{
            i--;
        }
    }
    

    return payload;
}