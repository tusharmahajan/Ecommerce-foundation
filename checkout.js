var items = {};
function checkproduct() {
    currUser = Object.keys(JSON.parse(localStorage.getItem('credentials')))[0];
    // console.log(currUser);
    items = JSON.parse(localStorage.getItem("cart"));
    //    console.log(items[currUser]);
    var $tbody = $('#checkout-table').find('tbody');
    $tbody.empty();
    temp = 0;
    for (var i in items[currUser]) {
        if (items[currUser][i] != 0) {
            let buttonHtml = ' <button class="btn btn-primary" onclick="removeproduct(\'' + i + '\')">remove</button>'
            var row = '<tr>'
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
    $('#create-order').click(function () {
        alert("Congralutions order created");
    });
}
// Here Object.values(items[currUser])[temp] equivalent to items[currUser][i]

function removeproduct(id) {
    // console.log(items[currUser][id]);
    delete (items[currUser][id]);
    // console.log((items[currUser]));
    localStorage.setItem('cart', JSON.stringify(items));
    checkproduct();
}

$(document).ready(checkproduct);
