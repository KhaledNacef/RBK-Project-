let title= document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category= document.getElementById('category');
let submit = document.getElementById('submit');

let mood='create';

let tmp;
//get total
function getTotal()
{
  if(price.value != ''){
   let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
   total.innerHTML= result;
   total.style.background='#040';
  }
  else{
   total.innerHTML= '';
   total.style.background='#a00d02';
  }
}




//create
let dataPro;
if(localStorage.product !=null){
  dataPro=JSON.parse(localStorage.product)
}
else{
  dataPro=[];
}



submit.onclick=function(){
  let newPro ={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value
  }
  if(mood==='create'){
    if(count.value>1){
      for(i=0;i<newPro.count;i++){
        dataPro.push(newPro);
      }
      
    }else{dataPro.push(newPro);}
  }
  else{
    dataPro[tmp]=newPro
    mood='create';
    submit.innerHTML='create';
    count.style.display='block';

  }
  
  
  //save localstorage
  localStorage.setItem('product',JSON.stringify(dataPro));
  cleardata();
  showdata()
  
}



//clear

function cleardata(){
title.value='';
price.value='';
ads.value='';
taxes.value='';
discount.value='';
total.innerHTML=''
count.value='';
category.value='';
}


//read



function showdata(){
 getTotal()
 
  let body='';
  
  for( let  i=0 ; i<dataPro.length ; i++){
    body += 
    `
    <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button id="update" onclick=updateData(${i})>update</button></td>
      <td><button onclick=deleteD(${i}) id="delete">delete</button></td>
    </tr>`;
           
  
  }
   
  document.getElementById('tbody').innerHTML=body;
  let btndelete=document.getElementById('delteall')
  if(dataPro.length>0){
    btndelete.innerHTML=`
    <button onclick="delteall()">delete All</button>
    `

  } 
  else{

  }

  }
  showdata()



//delete

function deleteD(i)
{

dataPro.splice(i,1)
localStorage.product=JSON.stringify(dataPro);
showdata()
}
function delteall(){
  localStorage.clear()
  dataPro.splice(0)
  showdata()
}

//count



//update

function updateData(i){

title.value= dataPro[i].title
price.value= dataPro[i].price
taxes.value= dataPro[i].taxes
ads.value= dataPro[i].ads
discount.value= dataPro[i].discount
category.value=dataPro[i].category

getTotal()
count.style.display='none';
submit.innerHTML='update'

mood='update'
tmp=i;
scroll({
  top:0,
  behavior:'smooth'
})


}




//search
 let searchMood='title';
 let searchh=document.getElementById('search');
 function getsearchMood(id){
  
  if(id=='searchTitle'){
    searchMood='title';
    searchh.placeholder='search by title';


  }
  else{
    searchMood='category';
    searchh.placeholder='search by category';
  }
  searchh.focus()
  searchh.value='';
  showdata()
 }

 function searchData(value){
  let body='';
  
  if(searchMood==='title'){

    for(i=0;i<dataPro.length;i++){
        if(dataPro[i].title.includes(value)){

          body += 
    `
    <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button id="update" onclick=updateData(${i})>update</button></td>
      <td><button onclick=deleteD(${i}) id="delete">delete</button></td>
    </tr>`;

        }


    }




  }else{
    for(i=0;i<dataPro.length;i++){
      if(dataPro[i].category.includes(value)){

        body += 
  `
  <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button id="update" onclick=updateData(${i})>update</button></td>
    <td><button onclick=deleteD(${i}) id="delete">delete</button></td>
  </tr>`;

      }


  }


  }
  document.getElementById('tbody').innerHTML=body;

 }


//clean data