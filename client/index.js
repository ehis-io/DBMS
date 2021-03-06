document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

});

// document.querySelector('table tbody').addEventListener('click', function(event){
//     if (event.target.className === 'delete-row-btn') {
//         deleteRowById(event.target.dataset.id);
//     }
//     if (event.target.className === "edit-row-btn") {
//         handleEditRow(event.target.dataset.id);
//     }
// });



const addBtn = document.querySelector("#add-name-btn");
const updateBtn = document.querySelector("#update-row-btn");
const searchBtn =document.querySelector('#search-btn');
const submitBtn = document.querySelector("submit-form");


searchBtn.onclick =function(){
    const searchValue =document.querySelector('#search-id').value;
    searchBtn.onclick =document.querySelector('#search-btn').value;

    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

}




function deleteRowById(id){
    fetch('http://localhost:5000/delete/'+ id, {
        method: 'DELETE'
    })
    .then(response =>response.json())
    .then(data => { 
        if (data.success) {
            location.reload();
        }
    });




}
function handleEditRow(id) {
    const updateSection = document.querySelector("#update-row");
    updateSection.hidden = false;
    document.querySelector("#update-row-btn").dataset.id = id;
  
} 


updateBtn.onclick = function() {
    const updateNameInput = document.querySelector("#update-name-input");
   

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers:{
            'Content-type': 'application/json'
        },  
        body : JSON.stringify({
            id : updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    
 
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            location.reload();
        }
    })
    
    
 }


submitBtn.onclick =function () {
    const formData = document.querySelectorAll('#registrationForm input').value;
    // const name = nameInput.value;
    // nameInput.value ="";
    console.log(formdata);

    fetch('http://localhost:5000/insert', {
        headers:{
            'content-type': 'application/json'},
        method:'POST', 
        body:JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data){
    const table = document.querySelector("tbody");
    const isTableData = table.querySelector('.no-data');

    let tableHtml ="<tr>";

    for (var key in data){
        if (data.hasOwnProperty(key)){
            if (key === 'dataAdded'){
                date[key] =new Date(data[key]).toLocaleString();
            }
            tableHtml += ` <td>${data[key]}</td>`;
        }
    }
   
        tableHtml += `<td><button class ="delete-row-btn" data-id = ${data.id}>Delete</td>`;
        tableHtml += `<td><button class ="edit-row-btn" data-id = ${data.id}>Edit</td>`;
        
 

    tableHtml += "</tr>";

    if (isTableData){
        table.innerHTML=tableHtml;
    }else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }



}

function loadHTMLTable(data) {
    const table = document.querySelector('tbody');
   
    
    if (data.lenght === 0) {
        table.innerHTML = '<tr><td class = "no-data" colspan ="5">No Data</td></tr>';
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, date_added}){
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class ="delete-row-btn" data-id = ${id}>Delete</td>`;
        tableHtml += `<td><button class ="edit-row-btn" data-id = ${id}>Edit</td>`;
        
      table.innerHTML +=  "</tr>";
    });
    table.innerHTML = tableHtml;







}