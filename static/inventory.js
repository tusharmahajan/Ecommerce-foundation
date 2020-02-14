
function getInventory() {
  inventory = JSON.parse(localStorage.getItem('availableQuantity'));
  let $tbody = $('#inventory-table').find('tbody');
  $tbody.empty();

  for (let i in inventory) {
    let row = '<tr>'
      + '<td>' + i + '</td>'
      + '<td>' + inventory[i] + '</td>'
      + '</tr>';
    $tbody.append(row);
  }

  let final_array = [];

  for (let i in inventory) {
    final_array.push({ 'name': i, 'quantity': inventory[i] });
  }

  // console.log(final_array);

  $('.download-csv').on('click', function () {

    let csv = Papa.unparse(final_array);

    let csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    let csvURL = window.URL.createObjectURL(csvData);
    let tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'download.csv');
    tempLink.click();
  });

}

$('#log-out').click(function(){
  localStorage.removeItem('credentials');
});

$(document).ready(getInventory);