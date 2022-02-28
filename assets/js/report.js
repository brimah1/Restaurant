
var el= document.getElementById("myDate")
if(el){
    el.addEventListener("change", displayreport);
}

async function displayreport()
{
    document.getElementById("date").innerHTML=el.value;
    var arrayreportA=[];
    var arrayreportB=[];
    const inputDate=el.value;
    const data={date:inputDate}
    arrayreportA=await Reportdata(data);
    arrayreportB=await ReportAmountdata(data);
    
    var t=document.getElementById("tb");
    t.innerHTML="";
    var a=document.getElementById("amnt");
    a.innerHTML="";
    
    for(var i=0;i<arrayreportA.length;i++)
    {
        if(arrayreportA[i].Actual_Cach_Item==null)arrayreportA[i].Actual_Cach_Item=0;
        if(arrayreportA[i].Remaining_Quantity==null)arrayreportA[i].Remaining_Quantity=0;
        if(arrayreportA[i].Sold_Quantity==null)arrayreportA[i].Sold_Quantity=0;
        var rows=`
        <tr>
        <td>${arrayreportA[i].NameItem}</td>
        <td class="d-none d-sm-table-cell">${arrayreportA[i].Remaining_Quantity}</td>
        <td>${arrayreportA[i].Sold_Quantity}</td>
        <td>$${arrayreportA[i].Actual_Cach_Item}</td>
        </tr>`;
        t.innerHTML+=rows
    }
    for(var i=0;i<arrayreportB.length;i++)
    {
        if(arrayreportB[i].actualCash==null)arrayreportB[i].actualCash=0;
        if(arrayreportB[i].Income==null)arrayreportB[i].Income=0;
        if(arrayreportB[i].Expense==null)arrayreportB[i].Expense=0;
        if(arrayreportB[i].Market==null)arrayreportB[i].Market=0;
        if(arrayreportB[i].Closing==null)arrayreportB[i].Closing=0;
        var total=((arrayreportB[i].actualCash+arrayreportB[i].Income)-(arrayreportB[i].Expense+arrayreportB[i].Market));
        var rows=`
        <tr>
        <th>Actual cash:</th>
        <td class="text-end">$${arrayreportB[i].actualCash}</td>
        </tr>
        <tr>
        <th>INCOME:</th>
        <td class="text-end">$${arrayreportB[i].Income}</td>
        </tr>
        <tr>
        <th>EXPENSE:</th>
        <td class="text-end">$${arrayreportB[i].Expense}</td>
        </tr>
        <tr>
        <th>MARKET EXPENSES:</th>
        <td class="text-end">$${arrayreportB[i].Market}</td>
        </tr>
        <tr>
        <th>Total:</th>
        <td class="text-end text-primary"><h5>$${total}</h5></td>
        </tr>`;
        a.innerHTML+=rows
        document.getElementById("primary").innerHTML="$"+arrayreportB[i].Closing;
    }
}


//Getdata
async function Reportdata(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetStockCountDate`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function ReportAmountdata(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetAmountDate`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}