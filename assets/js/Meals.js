document.getElementById("Load").onload = displayALLMeals;
var arrayMeal=[];

async function displayALLMeals(){
    if(localStorage.getItem("Status")=="true")
    {

        arrayMeal=await GetAllMeal();
        var l1=document.getElementById("Meals");
        l1.innerHTML="";
    
        for(var i=0;i<arrayMeal.length;i++){
            var rows=`<tr>
            <td>${arrayMeal[i].Id_Meal}</td>
            
            <td>
                <h2 class="table-avatar">
                    ${arrayMeal[i].Meal}
                </h2>
            </td>
            <td>
                
            ${arrayMeal[i].Quantity_Meal}
                
            </td>
            <td >
                
                ${arrayMeal[i].SalesPrice}
            
            </td>
            <td class="text-end">
                
                ${arrayMeal[i].Status}
            
            </td>
            <td class="text-end">
                <div class="actions">
                    <a class="btn btn-sm bg-success-light" data-bs-toggle="modal" href="#edit_specialities_details" onclick="MyEdit(${arrayMeal[i].Id_Meal})">
                        <i class="fe fe-pencil"></i> Edit
                    </a>
                    <a  data-bs-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light" onclick="MyDelete(${arrayMeal[i].Id_Meal})">
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


var el= document.getElementById("addMeal")
if(el){
    el.addEventListener("click", myAdd);
}
async function myAdd(){

    var vl=document.getElementsByClassName("form-control");
   
   const data={Meal:vl[0].value,AddDate:today,Quantity_Meal:0,Price:vl[1].value};
   
    AddMeal(data).then(response=>{
        window.location='Meals.html';
    });
}
async function MyDelete(id){

   
    localStorage.removeItem("IDMeal");
    localStorage.setItem("IDMeal",id);
  
    
}
var d= document.getElementById("Idelete")
if(d){
    d.addEventListener("click", myremove);
}
async function myremove(){
    const IDD=localStorage.getItem("IDMeal");
    const data={Id_Meals:IDD};
   
    DeleteMeal(data).then(response=>{
        if(response.OK)
        {
            alert("Delete Meal");
        }
        window.location='Meals.html';
    });
}




function MyEdit(id)
{
    localStorage.removeItem("IDMeal");
    localStorage.setItem("IDMeal",id);
    var vname=document.getElementById("idname");
    var vprice=document.getElementById("idprice");
    for(var i=0;arrayMeal.length;i++)
    {
        if(arrayMeal[i].Id_Meal===id){
           
            vname.value=arrayMeal[i].Meal;
            vprice.value=arrayMeal[i].SalesPrice;
        }
    }
   
}

var edt= document.getElementById("editMeal")
if(edt){
    edt.addEventListener("click", saveEdit);
}

async function saveEdit(){
    var vl=document.getElementsByClassName("form-control");
    const ID=localStorage.getItem("IDMeal");
    const data={Id_Meals:ID,Meal:vl[2].value,SalesPrice:vl[3].value};
    Editmeals(data).then(response=>{
        if(response.OK){
           
            alert("Edit is completed");
        }
        window.location='Meals.html';
    });
}


//GetData
async function GetAllMeal() {
    var output
        await $.get("https://apk-restaurant.herokuapp.com/GetAllMeals", await function (data) {
            output = data
        });
        return output;
}



async function AddMeal(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/AddNewMeal`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

async function Editmeals(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/EditMeals`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

async function DeleteMeal(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/DeleteMeals`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}