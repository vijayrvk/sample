var a = '91,21,13,4,222,5,6,223,224,15,14,6';
var b = a.split(',');
var c = b.map(Number);
function sortNumber(a,b) {
    return a - b;
}
var dupArr = c.sort(sortNumber);

var finalArr = [...new Set(dupArr)];

console.log(finalArr)

var result;
var start;
function rescursive(a, b) {
	if((b-a) == 1) {
		if(!result) {
			result = a + '-' + b;
		} else {
			result = result.replace(a,b)			
		}
	} else {
		if(!result) {
			result = a;
		} else {
			if(b){
				result = result + ',' + b;
			}
		}
		
	}
}
for (var i = 0; i < finalArr.length; i++) {
	rescursive(finalArr[i], finalArr[i+1])
}




var result2 = [];
var lindex = 0, rindex = 1;
var newArr = [];
while(rindex < finalArr.length) {
	if((finalArr[rindex] - finalArr[lindex]) == 1) {
		newArr.push(finalArr[rindex]);
		rindex++;
		
	} else {
		if(newArr.length > 0) {
			if(result2.indexOf(finalArr[lindex]) != -1) {
				result2.splice(result2.indexOf(finalArr[lindex]), 1);
			}
			result2.push(finalArr[lindex] + '-' + finalArr[rindex]);	
			newArr = [];
		} else {
			result2.push(finalArr[rindex]);	
		}
		
		lindex = rindex;
		rindex++;
	}
}

console.log(result2.toString())