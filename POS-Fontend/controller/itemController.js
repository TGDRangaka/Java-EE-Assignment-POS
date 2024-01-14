import {Item} from "../model/item.js";
import {items} from "../db/db_arrays.js";

let row_index = null;
const loadId = () =>{
    if(items.length == 0){
        $("#itemId").val("I001");
    }else{
        $("#itemId").val(generateNewId(items[items.length - 1].code));
    }
};
const getAllItems = () => {
    var settings = {
        "url": "http://localhost:8080/pos/item",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        response.map(itm => {
            items.push(itm);
        })
        loadId();
    });
}
getAllItems();
const loadItemTable = () => {
    $("#itemTable").html("");
    items.map((item) => {
        $("#itemTable").append(`<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`);
    });
};
const loadTable = (array) => {
    $("#itemTable").html("");
    array.map((item) => {
        $("#itemTable").append(`<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`);
    });
};

$(".item").on('click', ()=> loadItemTable());

//save
$("#item-save").on('click', () => {
    let id = $("#itemId").val(),
        name = $("#itemName").val(),
        price = Number.parseFloat($("#itemPrice").val()),
        qty = Number.parseInt($("#itemQty").val());

    if(-1 != items.findIndex(item => item.id === id)){
        showErrorAlert(`ID ${id} is already exist!`);
        return;
    }
    if(!checkValidation(id, name, price, qty)) return;

    let item = new Item(id, name, price, qty);
    var settings = {
        "url": "http://localhost:8080/pos/item",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(item),
    };

    $.ajax(settings).done(function (response) {
        if(response == 'saved'){
            items.push(item);
            loadItemTable();
            $("#item-reset").click();
            loadId();
            Swal.fire({
                icon: 'success',
                title: 'Item has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            showErrorAlert("Item Not Saved");
        }
    });
});

//search
$("#item-section .search").on('input', ()=>{
    let text = $("#item-section .search").val();
    console.log(text);
    if(!text) {
        loadItemTable();
        return;
    }
    let tempItem = items.filter(item => item.code.includes(text) || item.name.includes(text));
    loadTable(tempItem);
})

//select
$("#itemTable").on('click', "tr", function(){
    let selectedId = $(this).find("td:nth-child(1)").text();

    $("#itemId").val( selectedId );
    $("#itemName").val( $(this).find("td:nth-child(2)").text() );
    $("#itemPrice").val( Number.parseFloat($(this).find("td:nth-child(3)").text() ) );
    $("#itemQty").val( Number.parseInt( $(this).find("td:nth-child(4)").text() ) );

    row_index = items.findIndex((item => item.code == selectedId));
});

//update
$("#item-update").on('click', () => {
    let id = $("#itemId").val(),
        name = $("#itemName").val(),
        price = Number.parseFloat($("#itemPrice").val()),
        qty = Number.parseInt($("#itemQty").val());

    if(!checkValidation(id, name, price, qty)) return;

    let item = new Item(id, name, price, qty);
    var settings = {
        "url": "http://localhost:8080/pos/item",
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(item),
    };

    $.ajax(settings).done(function (response) {
        if(response == 'updated'){
            items[row_index].code = id;
            items[row_index].name = name;
            items[row_index].price = price;
            items[row_index].qty = qty;
            loadItemTable();
            $("#item-reset").click();
            row_index = null;
            loadId();
            Swal.fire({
                icon: 'success',
                title: 'Item has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        }else {
            showErrorAlert('Item Not Updated');
        }
    });

});

//remove
$("#item-delete").on('click', () => {
    if (row_index == null) return;
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var settings = {
                "url": `http://localhost:8080/pos/item?item_code=${$("#itemId").val()}`,
                "method": "DELETE",
                "timeout": 0,
            };
            $.ajax(settings).done(function (response) {
                if(response == 'deleted'){
                    items.splice(row_index, 1);
                    loadItemTable();
                    $("#item-reset").click();
                    loadId();
                    Swal.fire(
                        'Deleted!',
                        'Item has been deleted.',
                        'success'
                    )
                }else{
                    showErrorAlert('Item Not Deleted');
                }
            });
        }
    })
});

//validation
function checkValidation(id, name, price, qty){
    console.log(id);
    if(!/^I\d{3}$/.test(id)){ //chekc ID
        showErrorAlert("Please enter a valid ID!")
        return false;
    }
    if(!name){ //check name
        showErrorAlert("Please enter a name!");
        return false;
    }
    if(!/^\d+(\.\d{1,2})?$/.test(price.toString())){ //check address
        showErrorAlert("Please enter a price for item!");
        return false;
    }
    if(!qty || qty == 0){ //check salary
        showErrorAlert("Please enter a quantity");
        return false;
    }
    return true;
}

//showErrorAlert
function showErrorAlert(message){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    });
}

//generateNewID
function generateNewId(lastId) {
    const lastNumber = parseInt(lastId.slice(1), 10);
    const newNumber = lastNumber + 1;
    const newId = "I" + newNumber.toString().padStart(3, "0");
    return newId;
}

$("#item-reset").on('click', ()=>{
    setTimeout(loadId, 10);
})