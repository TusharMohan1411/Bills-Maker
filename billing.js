var item = document.querySelector("#item");
var price = document.querySelector("#price");
var qty = document.querySelector("#qty");
var au = document.querySelector("#au");
const addItem = document.querySelector("#add-item");
const addNewBIll = document.querySelector("#add-new-bill");

var billTable = document.getElementById("bill").getElementsByTagName('tbody')[0];
var totalAmt = document.getElementById("totalAmt");

function billCalc() {
    var itemf = item.value;
    var pricef = price.value;
    var qtyf = qty.value;
    var auf = au.value;

    if (!itemf) {
        alert("Item is not added.!")
        return false;
    }

    if (!qtyf || isNaN(qtyf)) {
        alert("Quantity is empty or wrong.!")
        return false;
    }

    if (qtyf < 0) {
        alert("Quantity can not be less than 0");
        return false;
    }

    if (!auf) {
        alert("AU is not added.!")
        return false;
    }

    if (pricef < 0) {
        alert("Price cannot be negative!")
        return false;
    }

    // to insert row in table
    var billRow = billTable.insertRow(-1);
    billRow.classList.add("billRowC");

    // to insert row cells in new made row
    var addItem = billRow.insertCell(0);
    addItem.classList.add("final-item");

    var addQty = billRow.insertCell(1);
    addQty.classList.add("final-qtyf");

    var addPrice = billRow.insertCell(2);
    addPrice.classList.add("final-pricef");

    var addAU = billRow.insertCell(3);
    addPrice.classList.add("auuf");

    var addAmount = billRow.insertCell(4);
    addAmount.classList.add("final-amountf");

    var removeItem = billRow.insertCell(5);
    removeItem.classList.add("remove-item");

    addItem.innerHTML = itemf;
    addQty.innerHTML = qtyf;

    addPrice.innerHTML = "₹ " + pricef;

    if (auf === "Kg") {
        addAmount.innerHTML = (pricef * qtyf).toFixed(2);
    } else if (auf === "gm") {
        addAmount.innerHTML = (pricef * (qtyf / 1000)).toFixed(2);
    } else if (auf === "No") {
        addAmount.innerHTML = (pricef * qtyf).toFixed(2);
    }

    addAU.innerHTML = auf;
    removeItem.innerHTML = '<span class="material-symbols-outlined">delete</span>';

    // to find total
    console.log(billRow.lastChild.innerText);

    var row = billTable.rows;
    console.log(row);

    var totalAmtf = 0;

    for (i = 0; i < row.length; i++) {
        var rowl = billTable.rows[i];
        var lastCell = rowl.cells[rowl.cells.length - 2];
        var lastCellData = parseFloat(lastCell.textContent);
        totalAmtf = totalAmtf + lastCellData;
    }

    totalAmt.textContent = totalAmtf.toFixed(2);

    item.value = "";
    price.value = "";
    qty.value = "";
    au.value = "";

    //remove the row
    billTable.addEventListener("click", (event) => {
        // console.log(event.target.innerHTML);

        if (event.target.innerHTML === 'delete') {
            event.target.parentElement.parentElement.remove();
            var totalAmtf = 0;
            for (i = 0; i < row.length; i++) {
                var rowl = billTable.rows[i];
                var lastCell = rowl.cells[rowl.cells.length - 2];
                var lastCellData = parseFloat(lastCell.textContent);
                totalAmtf = totalAmtf + lastCellData;
            }
            totalAmt.textContent = totalAmtf.toFixed(2);
        }
    });

}

// bill main function to add items 
addItem.addEventListener("click", billCalc);

// to download the bill
document.getElementById('downloadBill').addEventListener('click', function() {
    if (billTable.rows.length > 0) {
        var billcard = document.getElementById('billcardId');
        html2canvas(billcard).then(function(canvas) {
            var dataURL = canvas.toDataURL('image/png');
            var link = document.createElement('a');
            link.download = totalAmt.textContent + '.png'; // file name
            link.href = dataURL;

            // Trigger the download
            link.click();
        });
    } else {
        alert("Please add an item before downloading!");
    }
});

// adding price dinamically when the value of item changes
item.addEventListener("change", (event) => {
    var priceKey = event.target.value;
    switch (priceKey) {
        case "Rasgulla":
            price.value = "200";
            break;
        case "Gulabjamun":
            price.value = "220";
            break;
        case "Cham Cham":
            price.value = "350";
            break;
        case "Patisa":
            price.value = "430";
            break;
        case "Kalakand":
            price.value = "620";
            break;
        case "Samosa":
            price.value = "10";
            break;
        case "Burger":
            price.value = "15";
            break;
        case "Bread Pakoda":
            price.value = "20";
            break;
        default:
            0;
            break;
    }
});