var arrayAvailable=[];
let today = new Date().toISOString().slice(0, 10);

document.getElementById("Load").onload =marketExpence;

async function marketExpence(){

  
    const data={date:today};
    arrayAvailable= await getdateMarketexpense(data);

    desplayData();
}

function desplayData()
{
    var mx=document.getElementById("Available");
    mx.innerHTML="";
    for(var i=0;i<arrayAvailable.length;i++)
    { arrayAvailable[i].Date= (arrayAvailable[i].Date).replace("T00:00:00.000Z", "");
        var rows=`<tr>
        <td class="text-center">
            <h2>
                ${arrayAvailable[i].Name}
            </h2>
        </td>
        <td class="text-center">${arrayAvailable[i].Date}</td>
        
        <td class="text-center">${arrayAvailable[i].Quantity}</td>
       
    </tr>`;
    mx.innerHTML+=rows;
    }
}

var el= document.getElementById("myDate")
if(el){
    el.addEventListener("change", myGetnewdata);
}
async function myGetnewdata()
{
    const inputDate=el.value;
    const data={date:inputDate};
    arrayAvailable= await getdateAvailableMeals(data);

    desplayData();
}

//GetData
async function getdateAvailableMeals(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetQuntityMeals`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}