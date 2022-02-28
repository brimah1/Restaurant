var arrayMExp=[];
let today = new Date().toISOString().slice(0, 10);

document.getElementById("Load").onload =marketExpence;

async function marketExpence(){

  
    const data={date:today};
    arrayMExp= await getdateMarketexpense(data);

    desplayData();
}

function desplayData()
{
    var mx=document.getElementById("MXP");
    mx.innerHTML="";
    for(var i=0;i<arrayMExp.length;i++)
    { arrayMExp[i].Date= (arrayMExp[i].Date).replace("T00:00:00.000Z", "");
        var rows=`<tr>
        <td>
            <h2>
                ${arrayMExp[i].Name}
            </h2>
        </td>
        <td>${arrayMExp[i].Date}</td>
        
        <td>${arrayMExp[i].Quantity}</td>
        <td class="text-end">
            $${arrayMExp[i].Price}
        </td>
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
    arrayMExp= await getdateMarketexpense(data);

    desplayData();
}

//GetData
async function getdateMarketexpense(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetMarketExpense`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}