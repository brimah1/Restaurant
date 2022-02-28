document.getElementById("Load").onload = desplayClosing;
var arraycash=[];

async function desplayClosing()
{
    if(localStorage.getItem("Status")=="true"){
        arraycash= await AllCash();
        desplaycash();
    }
    else{
        window.location='login.html';
    }
    
}

function desplaycash()
{
    var incm=document.getElementById("cash");
    incm.innerHTML="";

    for(var i=0;i<arraycash.length;i++)
    {
        arraycash[i].AppDate=(arraycash[i].AppDate).replace("T00:00:00.000Z", "");
        var rows=`<tr>
        <td>
            <h2 class="table-avatar">
               ${arraycash[i].Id_CLOSING_CASH}
            </h2>
        </td>
        <td class="text-end">
            $${arraycash[i].CLOSING_CASH}
        </td>
        
        <td class="text-end">
        ${arraycash[i].AppDate}
        </td>
        
    </tr>`;

        incm.innerHTML+=rows
    }
}



var el= document.getElementById("myDate")
if(el){
    el.addEventListener("change", myGetnewclosing);
}

async function myGetnewclosing()
{
    const inputDate=el.value;
    const data={AppDate:inputDate};

    arraycash= await getdatecash(data);
    desplaycash();
}







//GetData
async function AllCash() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/GetClosingCash", await function (data) {
            output = data
        });
        return output;
}

async function getdatecash(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetClosingCashDate`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}