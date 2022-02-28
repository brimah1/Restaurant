document.getElementById("Load").onload = desplayActualcash;
var arrayactual=[];

async function desplayActualcash()
{
    if(localStorage.getItem("Status")=="true"){
        arrayactual=await AllActualCash();
        openactual();
    }
    else{
        window.location='login.html';
        }
}

function openactual()
{var rus=0;
    var incm=document.getElementById("actual");
    incm.innerHTML="";
    for(var i=0;i<arrayactual.length;i++)
    {
        arrayactual[i].AppDate=(arrayactual[i].AppDate).replace("T00:00:00.000Z", "");
        if(arrayactual[i].marketE==null)arrayactual[i].marketE=0;
        if(arrayactual[i].Expense==null)arrayactual[i].Expense=0;
        if(arrayactual[i].INCOME==null)arrayactual[i].INCOME=0;
       
        var total=((arrayactual[i].ACTUAL_CASH+arrayactual[i].INCOME)-(arrayactual[i].marketE+arrayactual[i].Expense))
        rus+=total;
        var rows=`<tr>
        <td>${arrayactual[i].Id_ACTUAL_CASH}</td>
        <td class="text-center">${arrayactual[i].AppDate}</td>
        <td class="text-center">
            $${arrayactual[i].ACTUAL_CASH}
        </td>
        <td class="text-center">
        $${arrayactual[i].INCOME}
    </td>
        <td class="text-center">$${arrayactual[i].marketE}</td>
        <td class="text-center">
            $${arrayactual[i].Expense}
        </td>
        <td class="text-end">
            $${total}
        </td>
    </tr>`;

        incm.innerHTML+=rows
    }
    var r=document.getElementById("ruselta");
    r.innerHTML=rus;
}

//GetData
async function AllActualCash() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/GetActual", await function (data) {
            output = data
        });
        return output;
}
