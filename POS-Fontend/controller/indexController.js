import {customers} from "../db/db_arrays.js";
import {items} from "../db/db_arrays.js";
import {orders} from "../db/db_arrays.js";

let mobNavOpened = false;

const displayNoneSections = () => {
    mobNavOpened = false;
    $(".mob-nav-btns").css("right", "-100vw");
    $("#login-section").css("display", "none");
    $("#dashboard-section").css("display", "none");
    $("#customer-section").css("display", "none");
    $("#item-section").css("display", "none");
    $("#order-section").css("display", "none");
    $("#order-history-section").css("display", "none");
}

displayNoneSections();
$("#nav_bar").css("display", "none");
$("#login-section").css("display", "flex");

$(".dashboard").on('click', () => {
    displayNoneSections();
    $("#sectionName").text("Dashboard");
    $("#dashboard-section").css("display", "block");
    loadDetails();
});

$(".customer").on('click', () => {
    displayNoneSections();
    $("#sectionName").text("Customer Manage");
    $("#customer-section").css("display", "block");
});

$(".item").on('click', () => {
    displayNoneSections();
    $("#sectionName").text("Item Manage");
    $("#item-section").css("display", "block");
});

$(".order").on('click', () => {
    displayNoneSections();
    $("#sectionName").text("Place Orders");
    $("#order-section").css("display", "block");
});

$(".order-history").on('click', () => {
    displayNoneSections();
    $("#sectionName").text("Order History");
    $("#order-history-section").css("display", "block");
});

$(".logout").on('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You have to login again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log Out!"
      }).then((result) => {
        if (result.isConfirmed) {
            displayNoneSections();
            $("#sectionName").text("Dashboard");
            $("#nav_bar").css("display", "none");
            $("#login-section").css("display", "flex");
        }
      });
});

$(".mob-nav-menu").on('click', ()=>{
    if(mobNavOpened){
        mobNavOpened = false;
        $(".mob-nav-btns").css("right", "-100vw");
    }else{
        mobNavOpened = true;
        $(".mob-nav-btns").css("right", 0);
    }
});

$(".mob-nav-btns i").on('click', ()=>{
    $(".mob-nav-btns").css("right", "-100vw");
});

$("section").on('click', ()=>{
    mobNavOpened = false;
    $(".mob-nav-btns").css("right", "-100vw");
})

const loadDetails = ()=> {
    $("#regCusCount").text(customers.length);
    $("#availableItemCount").text(items.length);
    $("#totOrders").text(orders.length);
}

