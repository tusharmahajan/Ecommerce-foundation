let items = {};
let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {};
let role = JSON.parse(localStorage.getItem('credentials'));

function checkproduct() {
    currUser = Object.keys(JSON.parse(localStorage.getItem('credentials')))[0];
    // console.log(currUser);
    if (!localStorage.getItem('cart')) {
        return;
    }
    items = JSON.parse(localStorage.getItem('cart'));


    // if(Object.entries(items).length === 0 && items.constructor === Object){
    //     alert("First create Order");
    // }
    // console.log(Object.keys(items[currUser])!=0);
    let $tbody = $('#checkout-table').find('tbody');
    $tbody.empty();
    temp = 0;
    for (i in items[currUser]) {
        if (items[currUser][i] != 0) {
            let buttonHtml = ' <button class="btn btn-primary" onclick="removeproduct(\'' + i + '\')">remove</button>'
            let row = '<tr>'
                + '<td>' + i + '</td>'
                + '<td>' + items[currUser][i] + '</td>'
                + '<td>' + 1999 + '</td>'
                + '<td>' + items[currUser][i] * 1999 + '</td>'
                + '<td>' + buttonHtml + '</td>'
                + '</tr>';
            $tbody.append(row);
            temp++;
        }
    }

    if (Object.keys(items[currUser]).length != 0) {
        $('body').on('click', '.show-toast', (function () {
            $("#myToast").removeClass('d-none');
            $('#myToast').toast('show');
            createOrder();
            inventoryUpdate();
            localStorage.removeItem('cart');
            $tbody.empty();
            $('#success-snackbar').empty().show(100, function () {
                setTimeout(() => {
                    $('#success-snackbar').hide();
                }, 2000);
            }).append("<i class='material-icons'>done_outline</i>" + "Success");
        }));
    }

}
// Here Object.values(items[currUser])[temp] equivalent to items[currUser][i]


function removeproduct(id) {
    // console.log(items[currUser][id]);
    delete (items[currUser][id]);

    localStorage.setItem('cart', JSON.stringify(items));
    checkproduct();
}

function createOrder() {
    currUser = Object.keys(JSON.parse(localStorage.getItem('credentials')))[0];

    for (i in items[currUser]) {
        if (order[i]) {
            order[i] = Number(order[i]) + Number(items[currUser][i]);
        }
        else {
            order[i] = items[currUser][i];
        }
    }

    localStorage.setItem('order', JSON.stringify(order));
}

function inventoryUpdate() {
    availableQuantity = JSON.parse(localStorage.getItem('availableQuantity'));
    for (i in items[currUser]) {
        availableQuantity[i] = availableQuantity[i] - items[currUser][i];
    }
    availableQuantity = localStorage.setItem('availableQuantity', JSON.stringify(availableQuantity));
}
$('#log-out').click(function () {
    localStorage.removeItem('credentials');
});

function init() {
    if (Object.values(role)[0] == 'admin') {
        $("#admin").removeClass("d-none");
    }
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    checkproduct();
}

$(document).ready(init);
