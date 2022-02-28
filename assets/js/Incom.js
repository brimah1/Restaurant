document.getElementById("Load").onload = desplayIncome;
var arrayincome=[];

async function desplayIncome()
{
    
    arrayincome= await AllIncomes();
    
    opendata();
}

function opendata()
{
    var incm=document.getElementById("income");
    incm.innerHTML="";
    for(var i=0;i<arrayincome.length;i++)
    {
        arrayincome[i].AppDate=(arrayincome[i].AppDate).replace("T00:00:00.000Z", "");
        var rows=`<tr>
        <td>${arrayincome[i].Id_INCOME}</td>
        <td>
            <h2>
                $${arrayincome[i].INCOME}
            </h2>
        </td>
        <td class="text-end">${arrayincome[i].AppDate}</td>
        <td class="text-end">${arrayincome[i].Reason}</td>
        
        
    </tr>`;

        incm.innerHTML+=rows
    }
}

var el= document.getElementById("myDate")
if(el){
    el.addEventListener("change", myGetnewincom);
}

async function myGetnewincom()
{
    const inputDate=el.value;
    const data={AppDate:inputDate};

    arrayincome= await getdateincome(data);
    opendata();
}


//GetData
async function AllIncomes() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/GetIncome", await function (data) {
            output = data
        });
        return output;
}

async function getdateincome(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetIncomeDate`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}