/*Global variable
*/
var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
  
function getInfo() {
    let newname = $('#login-form input[name=ename]').val();
    let newpass = $('#login-form input[name=pname]').val();

    // let exist = JSON.parse(localStorage.getItem("credentials"));
    // if(newname=="") {
    //     alert("Enter email");
    //     return;
    // }

    // if(newpass==""){
    //     alert("Enter password");
    //     return;
    // }
    var credentials = {};
    credentials[newname] = newpass;

    localStorage.setItem('credentials', JSON.stringify(credentials));

    window.location.href = "/products.html";
    // window.open("index.html" ,"_self");
    // $(location).attr('href', "products.html");
    return false;
}


function getProductDetails() {
    // let url = "/assets/available-inventory.json";
    // $.ajax({
    //     url: url,
    //     type: 'GET',
    //     success: function (data) {
    //         displayProductDetails(data);
    //     },
    //     error: function(err) { console.log("error", err); }
    // });

    $.getJSON("/assets/available-inventory.json", function (json) {
        displayProductDetails(json);
    });
}

$('#reduce-cart').on('click', (function(){
    subtract("#cart-value",productDetails.name);
}));

// ALSO WORKS

$('body').on('click', '#increase-cart', (function(){
    add("#cart-value",productDetails.name);
}));
$('body').on('click','#add-cart', (function(){
    addToCart("#cart-value" ,productDetails.name);
}));

$('#exampleModalCenter').on('show.bs.modal', function (event) {
    // console.log(ev.relatedTarget);
    productDetails = $(event.relatedTarget).data('item');
    // console.log(productDetails);
    $('#product-img').attr('src' ,productDetails.imageUrl);
    $('#product-name').html(productDetails.name);
    $('#product-category').html(productDetails.category);
    $('#product-size').html(productDetails.size);
    $('#product-color').html(productDetails.color);
    $('#product-mrp').html(productDetails.mrp);

    $('#cart-value').val(0);
    

    // ('#exampleModalCenter').modal('hide');
});

// $('#exampleModalCenter').on('hide.bs.modal', function (e) {
//     console.log("close");
//     $('#product-img').removeAttr("img");
//     $('#product-name').empty("span");
//     $('#product-category').empty("span");
//     $('#product-size').empty("span");
//     $('#product-color').empty("span");
//     $('#product-mrp').empty("span");
// });

    function displayProductDetails(data) {
    var temp = 1;
    // console.log(data);
    for (let i in data) {
        // var $body = $('#product' + temp).find('p');
        var e = data[i];
        // console.log(i);
        $('#button-div').append($('<button/>', { id: 'btn_' + temp, text: 'Product ' + (Number(i) + 1),
         class: 'btn btn-primary my-2 mr-2','data-toggle': 'modal', 'data-target': '#exampleModalCenter' }).data("item", data[i]));
        /*let $div = $("<div/>"),
           elem = $('<label/>', {class: "font-weight-bold mr-3"}),
           $br = $("<br/>"),
           label1 = elem.clone().text("Name"),
           span1 = $('<span/>').text(e.name);
           label2 = elem.clone().text("Category"),
           span1 = $('<span/>').text(e.category);
           $div.append(label1).append(span1).append($br); */
        // $('#btn_' + temp).data('product' + temp);
        // $body.append(col);
        temp++;
    }
}

function add(id) {
    // console.log(Number($(id).val()));
    // debugger;
    let newCount = Number($(id).val()) + 1;
    $(id).val(newCount);
}

function subtract(id) {
    let newCount = Number($(id).val()) - 1;
    if (newCount < 0) return;
    $(id).val(newCount);
}

function addToCart(id ,name1) {
    currUser = Object.keys(JSON.parse(localStorage.getItem('credentials')))[0];
    //    let carts = cart;

    if (cart[currUser]) {
        cart[currUser][name1] = $(id).val();
    }
    else {
        cart[currUser] = {
            [name1]:$(id).val()
        };
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));

    // cartValue = Number($(id).val()); 
    // cart[id] = cartValue;
    // localStorage.cart = JSON.stringify(cart);
}

function init() {
    $('#check-email').click(getInfo);
    $('#footer-id').html(new Date());
    // $('check-email').on('click' , function(event){
    //     event.preventDefault();
    // });
    // setInterval(init ,1000);
    getProductDetails();
}
$(document).ready(init);
