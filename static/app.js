/*Global variable
*/
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
let availableQuantity = localStorage.getItem('availableQuantity') ? JSON.parse(localStorage.getItem('availableQuantity')) : {};
let credentials = {};
let role = localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : {};

function getInfo() {

    let newname = $('#login-form input[name=ename]').val();
    let newpass = $('#login-form input[name=pname]').val();
    newpass = hash(newpass);
    $.getJSON("/assets/config.json", function (json) {
        for (i in json) {
            if (json[i].email == newname && json[i].password == newpass) {
                if (json[i].type == 'admin') {
                    credentials[newname] = json[i].type;
                }
                else {
                    credentials[newname] = json[i].type;
                }
                localStorage.setItem('credentials', JSON.stringify(credentials));

                window.location.href = "/products.html#loginSuccess=true";
                return false;
            }
        }

    });
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

// $('body').on('click', '.reduce-cart', (function () {
//     subtract(".cart-value" , $(this).attr('id'));
// }));

// // ALSO WORKS

// $('body').on('click','.increase-cart', (function () {
//     add(".cart-value",$(this).attr('id'));
// }));

// $('body').on('click', '.add-cart' ,(function () {
//     addToCart(".cart-value",$(this).attr('id'));
// }));

// $('#exampleModalCenter').on('show.bs.modal', function (event) {
// console.log(ev.relatedTarget);
// productDetails = $(event.relatedTarget).data('item');
// console.log(productDetails);
// $('#product-img').attr('src', productDetails.imageUrl);
// $('#product-name').html(productDetails.name);
// $('#product-category').html(productDetails.category);
// $('#product-size').html(productDetails.size);
// $('#product-color').html(productDetails.color);
// $('#product-mrp').html(productDetails.mrp);

// $('#cart-value').val(0);


// ('#exampleModalCenter').modal('hide');
// });

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
    let temp = 1;
    for (let i in data) {

        // var e = data[i];
        // $('#button-div').append($('<button/>', {
        //     id: 'btn_' + temp, text: 'Product ' + (Number(i) + 1),
        //     class: 'btn btn-primary my-2 mr-2', 'data-toggle': 'modal', 'data-target': '#exampleModalCenter'
        // }).data("item", data[i]));

        let myCol = $('<div/>', { "class": "col-sm-6 col-md-4 col-lg-3 pb-4" });

        let product = $('<div class="card"><img class="card-img-top"' +
            ' src="' + data[i].imageUrl + '" alt="Card image cap" style="height:150px;">  <div class="card-body">' +
            '<h5 class="card-title">' + data[i].name + '</h5> <div>' +
            '<label class="font-weight-bold"> Name:</label><span>' + data[i].name + '</span><br />' +
            '<label class="font-weight-bold"> Category:</label><span>' + data[i].category + '</span><br />' +
            '<label class="font-weight-bold"> Size:</label><span>' + data[i].size + '</span><br />' +
            '<label class="font-weight-bold"> Color:</label><span>' + data[i].color + '</span><br />' +
            '<label class="font-weight-bold"> MRP:</label><span>' + data[i].mrp + '</span>' +
            '</div> <button type="button" id= "'+ data[i].name+'1'+'" class="add-cart disabled btn btn-info d-inline-flex mb-2" onclick="addToCart(\'' + data[i].name + '\')"><i class="material-icons">' +
            'shopping_cart</i>Add to Cart</button> <div class="row"> <div class="col-2 ">' +
            '<button type="button" class="reduce-cart btn btn-info" onclick="subtract(\'' + data[i].name + '\')" data-toggle="tooltip"' +
            'title="Reduce Quantity">-</button></div><div class="col-6 mb-5">' +
            '<input type="text" id="' + data[i].name + '" class="cart-value form-control text-center ml-3" maxlength="3" value=0>' +
            '</div> <div class="col-2 mr-2"><button type="button" ' + 'class="increase-cart btn btn-info" onclick="add(\'' + data[i].name + '\')" data-toggle="tooltip" title="Increase Quantity">+</button>' +
            '</div></div> </div> </div>');

        $(product).appendTo(myCol);
        myCol.appendTo($('#products'));

        // productDetails = $(event.relatedTarget).data('item');
        // console.log(productDetails);
        // $('#product-img').attr('src', data[i].imageUrl);
        // $('#product-name').html(data[i].name);
        // $('#product-category').html(data[i].category);
        // $('#product-size').html(data[i].size);
        // $('#product-color').html(data[i].color);
        // $('#product-mrp').html(data[i].mrp);

        // $('#cart-value').val(0);
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

let hash = function (s) {

    let a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a << 6 & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ c >> 21 : a;
        }
    }
    return String(a);
};

function add(name1) {


    if (availableQuantity[name1] <= 0) {
        // alert("quantity not available");
        // console.log("sdfa"); 
        $('#quantityToast').removeClass('d-none');

        $('.toast-body').html(" Quantity not available" );
        $('.toast').toast('show');

        return false;
    }

    let newCount = Number($('#' + name1).val()) + 1;
    $('#' + name1).val(newCount);
    if(newCount > 0){
        $('#'+name1 + '1').removeClass('disabled');
    }
}

function subtract(name1) {
    let newCount = Number($('#' + name1).val()) - 1;
    if (newCount < 0) return;
    $('#' + name1).val(newCount);
    if(newCount==0){
        $('#' + name1+'1').attr('disabled',true);
    }
}

function addToCart(name1) {
    currUser = Object.keys(JSON.parse(localStorage.getItem('credentials')))[0];
    if ($('#' + name1).val() > availableQuantity[name1]) {
        $('#quantityToast').removeClass('d-none');
        $('.toast-body').html("Maximum quantity available is : " + availableQuantity[name1]);
        $('.toast').toast('show');
        $('#max-snackbar').empty();
        $('#max-snackbar').show(100, function () {
            setTimeout(() => {
                $('#max-snackbar').hide();
            }, 2000);
        }).append("<i class='material-icons'>error</i>"+ "Error");
        return false;
    }
    if (cart[currUser]) {
        cart[currUser][name1] = $('#' + name1).val();
    }
    else {
        cart[currUser] = {
            [name1]: $('#' + name1).val()
        };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    $('#'+name1).val(0);
    total();
}
function total() {
    totalQty = 0;
    products = localStorage.getItem('cart') ?JSON.parse(localStorage.getItem('cart')) : 0;

    user = Object.keys(role)[0];

    for (i in products[user]) {
        totalQty += Number(products[user][i]);
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
    if (window.location.hash) {
        $('#login-snackbar').show(100, function () {
            setTimeout(() => {
                $('#login-snackbar').hide();
            }, 2000);
        }).html("Login Successful : " + Object.keys(role)[0]);
        history.replaceState(null, null, ' ');

    }
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
