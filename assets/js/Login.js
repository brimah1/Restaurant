var el= document.getElementById("loginID")
if(el){
    el.addEventListener("click", mylogin);
}

async function mylogin()
{
    var dt=document.getElementsByClassName("form-control");
    const data ={email:dt[0].value,psswrd:dt[1].value}
   await Login(data).then(response =>{
        if(response[0][""]==1)
        {
            localStorage.setItem("Status",true);
            window.location='index.html';
        }
        else{
            localStorage.setItem("Status",false);
            var d=document.getElementsByClassName("text-danger");
            d[0].style.display="block";
        }
    });
}


//getdata
async function Login(data) {
    const response=await fetch(`https://apk-restaurant.herokuapp.com/Login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}