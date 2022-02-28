
var el= document.getElementById("myDate")
if(el){
    el.addEventListener("change", displayreport);
}

async function displayreport()
{
    document.getElementById("date").innerHTML=el.value;
    var arrayreportA=[];
   
    const inputDate=el.value;
    const data={date:inputDate}
    arrayreportA=await getdateMarketexpense(data);

    var t=document.getElementById("tbl");
    t.innerHTML="";
    var a=document.getElementById("amntMarkeet");
    a.innerHTML="";
    var total=0;
    for(var i=0;i<arrayreportA.length;i++)
    {
        total+=arrayreportA[i].Price;

        var rows=`
        <tr>
        <td>${arrayreportA[i].Name}</td>
        <td class="d-none d-sm-table-cell">${arrayreportA[i].Quantity}</td>
        <td class="text-end">$${arrayreportA[i].Price}</td>
        </tr>`;
        t.innerHTML+=rows
    }
  
        var rows=`
       
        <tr>
        <th>Total:</th>
        <td class="text-end text-primary"><h5>$${total}</h5></td>
        </tr>`;
        a.innerHTML+=rows
        document.getElementById("primary").innerHTML="$"+arrayreportB[i].Closing;
    
}


//Getdata
async function getdateMarketexpense(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetMarketExpense`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}