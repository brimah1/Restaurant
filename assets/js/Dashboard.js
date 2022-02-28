var arrayItems=[];

let today = new Date().toISOString().slice(0, 10);

document.getElementById("Load").onload = displayHomeItems;

async function displayHomeItems(){

    if(localStorage.getItem("Status")=="true"){
        dataAmount();
        arrayItems=await AllItems();
       
        var lu1=document.getElementById("HomeItems");
        lu1.innerHTML="";
       
    
        for(var i=0;i<arrayItems.length;i++)
        {
            if(arrayItems[i].Status==true){
                var rows=` <tr>
                <td>
                    <h2 class="table-avatar">
                     ${arrayItems[i].Id_Item}
                    </h2>
                </td>
                <td>${arrayItems[i].Name_Item}</td>
                <td>$${arrayItems[i].SalesPrice}</td>
                <td>
                ${arrayItems[i].Quantity_Item}
                </td>
             </tr>`;
         lu1.innerHTML+=rows; 
            }
             
        }
    
        MARKETE_Expense();
        Income();
        Stock_Count();
    }
   else{
       window.location='login.html';
   }
}


async function MARKETE_Expense()
{
    var arrayME=[];
    const data={appdate:today};
    arrayME=await MARKETExp(data);

    var lu=document.getElementById("MarketExpences");
    lu.innerHTML="";
   

    for(var i=0;i<arrayME.length;i++)
    {
        arrayME[i].AddDate= (arrayME[i].AddDate).replace("T00:00:00.000Z", "");

        var rows=
    `<tr>
        <td>
            <h2 class="table-avatar">
            ${arrayME[i].Name_Item}
            </h2>
        </td>
        <td>${arrayME[i].AddDate}</td>
        <td>${arrayME[i].Quantity_Item}</td>
        <td >$${arrayME[i].Price}</td>
     </tr>`;
                lu.innerHTML+=rows;   
    }
    Expense();
}
async function Expense()
{
    
    var arrayExp=[];
    arrayExp=await Exp();
    var lu=document.getElementById("Expences");
    lu.innerHTML="";
   

    for(var i=0;i<arrayExp.length;i++)
    {
        arrayExp[i].AppDate= (arrayExp[i].AppDate).replace("T00:00:00.000Z", "");

        var rows=
       `<tr>
           <td>
             <h2 class="table-avatar">
             ${arrayExp[i].Id_EXPENSE}
            </h2>
             </td>
            <td>$${arrayExp[i].EXPENSE}</td>
            <td>${arrayExp[i].AppDate}</td>
            <td>
               <div style="width: 40px;">
               <p>
               ${arrayExp[i].Reason}
               </p>
                </div>
            </td>
        </tr>`;
                lu.innerHTML+=rows;   
    }
    
}
async function Income()
{
    
    var arrayINCOME=[];
    arrayINCOME=await INCOME();
    var lu=document.getElementById("INCOME");
    lu.innerHTML="";
   

    for(var i=0;i<arrayINCOME.length;i++)
    {
        arrayINCOME[i].AppDate= (arrayINCOME[i].AppDate).replace("T00:00:00.000Z", "");

        var rows=
       `<tr>
           <td>
             <h2 class="table-avatar">
             ${arrayINCOME[i].Id_INCOME}
            </h2>
             </td>
            <td>$${arrayINCOME[i].INCOME}</td>
            <td>${arrayINCOME[i].AppDate}</td>
            <td>
               <div style="width: 40px;">
               <p>
               ${arrayINCOME[i].Reason}
               </p>
                </div>
            </td>
        </tr>`;
                lu.innerHTML+=rows;   
    }
}
var arrayStockCount=[];
async function Stock_Count()
{
    
    arrayStockCount=[];
    const data={date:today};
    arrayStockCount=await StockCount(data);
    onpenstock()
}

function onpenstock()
{
    var lu=document.getElementById("StockCount");
    lu.innerHTML="";
   

    for(var i=0;i<arrayStockCount.length;i++)
    {
        arrayStockCount[i].AppDate=(arrayStockCount[i].AppDate).replace("T00:00:00.000Z", "");
        var rows=`<tr>
        <td>
            <h2 class="table-avatar">
                ${arrayStockCount[i].Id_StockCount}
            </h2>
        </td>
        <td> ${arrayStockCount[i].Name_Item}</td>
        <td>
            <h2 class="table-avatar">
            ${arrayStockCount[i].AppDate}
            </h2>
        </td>
        <td> ${arrayStockCount[i].Remaining_Quantity}</span></td>
        <td>
            $ ${arrayStockCount[i].Sold_Quantity}
        </td>
        <td>
            $ ${arrayStockCount[i].Actual_Cach_Item}
        </td>
    </tr>`;
                lu.innerHTML+=rows;   
    }
}

var el= document.getElementById("myDate")
if(el){
    el.addEventListener("change", DateStock);
}

async function DateStock(){
    arrayStockCount=[];
    const data={date:el.value};
    arrayStockCount=await StockCount(data);
    onpenstock()
}

async function dataAmount()
{
   

    var exp=document.getElementById("Exp");
    exp.innerHTML="";
    var inc=document.getElementById("Inc");
    inc.innerHTML="";
    var act=document.getElementById("act");
    act.innerHTML="";
    var cls=document.getElementById("clos");
    cls.innerHTML="";
    
    await dataPrice().then(response=>{
        if(response[0]["Expense"]==null)response[0]["Expense"]=0;
        if(response[0]["MarketExpense"]==null)response[0]["MarketExpense"]=0;
        if(response[0]["Income"]==null)response[0]["Income"]=0;
        if(response[0]["Actual_Cach"]==null)response[0]["Actual_Cach"]=0;
        if(response[0]["Closing_cash"]==null)response[0]["Closing_cash"]=0;

        var totalE=response[0]["Expense"]+response[0]["MarketExpense"];
        var actual=response[0]["Actual_Cach"]-totalE;
        if(actual<0)actual=0;
        exp.innerHTML+=`<h3>$${totalE}</h3>`;
        inc.innerHTML+=`<h3>$${response[0]["Income"]}</h3>`;
        act.innerHTML+=`<h3>$${actual}</h3>`;
        cls.innerHTML+=`<h3>$${response[0]["Closing_cash"]}</h3>`;
    })


}




//GetData
async function AllItems() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/GetAllItems", await function (data) {
            output = data
        });
        return output;
}

async function MARKETExp(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetMarket`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function Exp() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/Get6EXPENSE", await function (data) {
            output = data
        });
        return output;
}
async function INCOME() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/Get6INCOME", await function (data) {
            output = data
        });
        return output;
}

async function StockCount(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetStockCount`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function dataPrice() {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/GetdataPrice`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify()
    });
    return response.json();
}