document.getElementById("Load").onload = desplayExpense;
var arrayExpense=[];

async function desplayExpense()
{
    if(localStorage.getItem("Status")=="true"){
        arrayExpense= await AllExpenses();
    
        opendataE();
    }
    else{
        window.location='login.html';
    }
    
  
}

function opendataE()
{
    var incm=document.getElementById("Expense");
    incm.innerHTML="";
    for(var i=0;i<arrayExpense.length;i++)
    {
        arrayExpense[i].AppDate=(arrayExpense[i].AppDate).replace("T00:00:00.000Z", "");
        var rows=`<tr>
        <td>${arrayExpense[i].Id_EXPENSE}</td>
        <td>
            <h2>
                $${arrayExpense[i].EXPENSE}
            </h2>
        </td>
        <td class="text-end">${arrayExpense[i].AppDate}</td>
        <td class="text-end">${arrayExpense[i].Reason}</td>
        
        
    </tr>`;

        incm.innerHTML+=rows
    }
}

var el= document.getElementById("myDate")
if(el){
    el.addEventListener("change", myGetnewex);
}

async function myGetnewex()
{
    if(localStorage.getItem("Status")=="true"){
    const inputDate=el.value;
    const data={AppDate:inputDate};

    arrayExpense= await getdateExpense(data);
    opendataE();
    }
     else{
    window.location='login.html';
    }
  
}


//GetData
async function AllExpenses() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/GetExpense", await function (data) {
            output = data
        });
        return output;
}

async function getdateExpense(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetExpenseDate`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}