
/*Global variable
*/

var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
var availableQuantity = localStorage.getItem('availableQuantity') ? JSON.parse(localStorage.getItem('availableQuantity')) : {};
var credentials = {};
var role = localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : {};

function getInfo() {

    let newname = $('#login-form input[name=ename]').val();
    let newpass = $('#login-form input[name=pname]').val();
    newpass = hash(newpass);
    $.getJSON("/assets/config.json", function (json) {
        for (i in json) {
            // console.log(json[i].password + " " + newpass);
            if (json[i].email == newname && json[i].password == newpass) {
                if (json[i].type == 'admin') {
                    // console.log("admin");
                    credentials[newname] = json[i].type;
                }
                else {
                    // console.log("user");
                    credentials[newname] = json[i].type;
                }
                localStorage.setItem('credentials', JSON.stringify(credentials));

                window.location.href = "/products.html";
                return false;
            }
        }

    });
    // console.log("sdfasd");
    $("#invalid-snackbar").show(100, function () {
        setTimeout(() => {
            $('#invalid-snackbar').hide();
        }, 2000);
    }).html("Wrong credentials.");
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
        inventorySetUp(json);
        displayProductDetails(json);
    });
}

$('#reduce-cart').on('click', (function () {
    subtract("#cart-value");
}));

// ALSO WORKS

$('body').on('click', '#increase-cart', (function () {
    add("#cart-value", productDetails.name);
}));
$('body').on('click', '#add-cart', (function () {
    addToCart("#cart-value", productDetails.name);
}));

$('#exampleModalCenter').on('show.bs.modal', function (event) {
    // console.log(ev.relatedTarget);
    productDetails = $(event.relatedTarget).data('item');
    // console.log(productDetails);
    $('#product-img').attr('src', productDetails.imageUrl);
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
        $('#button-div').append($('<button/>', {
            id: 'btn_' + temp, text: 'Product ' + (Number(i) + 1),
            class: 'btn btn-primary my-2 mr-2', 'data-toggle': 'modal', 'data-target': '#exampleModalCenter'
        }).data("item", data[i]));
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

var hash = function(s) {

    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;

        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
};

function add(id, name1) {
    // console.log(Number($(id).val()));
    // debugger;
    if (availableQuantity[name1] < 0) {
        alert("quantity not available");
        return false;
    }

    let newCount = Number($(id).val()) + 1;
    $(id).val(newCount);
}

function subtract(id) {
    let newCount = Number($(id).val()) - 1;
    if (newCount < 0) return;
    $(id).val(newCount);
}

function addToCart(id, name1) {
    currUser = Object.keys(JSON.parse(localStorage.getItem('credentials')))[0];
    //    let carts = cart;
    if ($(id).val() > availableQuantity[name1]) {
        alert("Maximum quantity available is :" + availableQuantity[name1]);
        return false;
    }

    // console.log(availableQuantity[name1]);

    if (cart[currUser]) {
        cart[currUser][name1] = $(id).val();
    }
    else {
        cart[currUser] = {
            [name1]: $(id).val()
        };
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
    // cartValue = Number($(id).val()); 
    // cart[id] = cartValue;
    // localStorage.cart = JSON.stringify(cart);
}
function total() {
    totalQty = 0;
    products = localStorage.getItem('cart') ? Object.values(JSON.parse(localStorage.getItem('cart'))) : 0;
    for (i in products[0]) {
        totalQty += Number(products[0][i]);
    }
    $('.badge').html(totalQty);
}

function inventorySetUp(data) {

    if (Object.keys(availableQuantity).length == 0) {
        for (i in data) {
            availableQuantity[data[i].name] = data[i].quantity;
        }
    }
    localStorage.setItem('availableQuantity', JSON.stringify(availableQuantity));
}

function getSession() {
    if (localStorage.getItem('credentials') == null) {
        window.location.href = "/index.html";
        return;
    }
    $("body").removeClass("d-none");
    // console.log(Object.keys(role)[0]);
    $('#login-snackbar').show(100, function () {
        setTimeout(() => {
            $('#login-snackbar').hide();
        }, 2000);
    }).html("Login Successful : " + Object.keys(role)[0]);
}

$('#log-out').click(function () {
    localStorage.removeItem('credentials');
});

function init() {

    if (Object.values(role)[0] == 'admin') {
        $("#admin").removeClass("d-none");
    }
    $('#login-form').on('submit', getInfo);

    if (window.location.pathname != "/index.html") {
        getSession();
    }

    getProductDetails();
    total();
}



$(document).ready(init);
