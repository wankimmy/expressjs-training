var v1=180;
var v2=140;
var v3=10;

if(v1>v2 && v1>v3){
	console.log("V1 is greater");

}else if(v2>v1 && v2>v3){
	console.log("V2 is greatest");

}else if(v3>v1 && v3>v2){
	console.log("V3 is greatest");
}

//Using For :

var i;
for(i=1; i<=10;i++)
{
    console.log(i)
}


// Using Switch Case
var location=3;
switch(location)
{
    case 1:  console.log("Location Is North")
    break;
    case  2:  console.log("Location Is South")
    break;
    case 3:  console.log("Location Is East")
    break;
    case  4:  console.log("Location Is West")
    break;
    default :
        console.log("Please enter Another Location")

}