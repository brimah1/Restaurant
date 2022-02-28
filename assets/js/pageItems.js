document.getElementById("Load").onload = displayALLItems;
var arrayItem=[];

async function displayALLItems(){
    if(localStorage.getItem("Status")=="true")
    {

        arrayItem=await AllItems();
        var l1=document.getElementById("items");
        l1.innerHTML="";
    
        for(var i=0;i<arrayItem.length;i++){
            var rows=`<tr>
            <td>${arrayItem[i].Id_Item}</td>
            
            <td>
                <h2 class="table-avatar">
                    ${arrayItem[i].Name_Item}
                </h2>
            </td>
            <td>
                
            ${arrayItem[i].Quantity_Item}
                
            </td>
            <td>
                
                $${arrayItem[i].SalesPrice}
            
            </td>
            <td class="text-end">
                
                ${arrayItem[i].Status}
            
            </td>
            <td class="text-end">
                <div class="actions">
                    <a class="btn btn-sm bg-success-light" data-bs-toggle="modal" href="#edit_specialities_details" onclick="MyEdit(${arrayItem[i].Id_Item})">
                        <i class="fe fe-pencil"></i> Edit
                    </a>
                    <a  data-bs-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light" onclick="MyDelete(${arrayItem[i].Id_Item})">
                        <i class="fe fe-trash"></i> Delete
                    </a>
                </div>
            </td>
        </tr>`;
        l1.innerHTML+=rows;
        }
    }
    else{
        window.location='login.html';
    }
}

let today = new Date().toISOString().slice(0, 10);


var el= document.getElementById("addItem")
if(el){
    el.addEventListener("click", myAdd);
}
async function myAdd(){

    var vl=document.getElementsByClassName("form-control");
   
   const data={Name_Item:vl[0].value,AddDate:today,Quantity_Item:0,SalesPrice:vl[1].value};
   
    AddItems(data).then(response=>{
        window.location='Items.html';
    });
}
async function MyDelete(id){

   
    localStorage.removeItem("IDItem");
    localStorage.setItem("IDItem",id);
  
    
}
var d= document.getElementById("Idelete")
if(d){
    d.addEventListener("click", myremove);
}
async function myremove(){
    const IDD=localStorage.getItem("IDItem");
    const data={Id_Items:IDD};
   
    DeleteItem(data).then(response=>{
        if(response.OK)
        {
            alert("Delete Item");
        }
        window.location='Items.html';
    });
}

var ed= document.getElementById("addItem")
if(ed){
    ed.addEventListener("click", myAdd);
}



function MyEdit(id)
{
    localStorage.removeItem("IDItem");
    localStorage.setItem("IDItem",id);
    var vname=document.getElementById("idname");
    var vprice=document.getElementById("idprice");
    for(var i=0;arrayItem.length;i++)
    {
        if(arrayItem[i].Id_Item===id){
            
            vname.value=arrayItem[i].Name_Item;
            vprice.value=arrayItem[i].SalesPrice;
        }
    }
   
}

var edt= document.getElementById("editItem")
if(edt){
    edt.addEventListener("click", saveEdit);
}

async function saveEdit(){
    var vl=document.getElementsByClassName("form-control");
   const ID=localStorage.getItem("IDItem");
    const data={Id_Items:ID,Name_Item:vl[2].value,SalesPrice:vl[3].value};
    EditItems(data).then(response=>{
        if(response.OK){
           
            alert("Edit is completed");
        }
        window.location='Items.html';
    });
}


//GetData
async function AllItems() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/GetAllItems", await function (data) {
            output = data
        });
        return output;
}

async function AddItems(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/AddNewItem`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

async function EditItems(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/EditItems`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

async function DeleteItem(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/DeleteItems`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}