// Constructor function for Shop
function Shop(location, minCustomers, maxCustomers, avgCookiesPerSale) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.salesData = [];
  this.dailyTotal = 0;
  Shop.allShops.push(this);
}

// Array to hold all shop instances
Shop.allShops = [];
Shop.hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// Generate random number of customers per hour
Shop.prototype.generateCustomers = function() {
  return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
};

// Calculate sales data
Shop.prototype.calculateSalesData = function() {
  for (let hour of Shop.hours) {
    const cookiesSold = Math.round(this.generateCustomers() * this.avgCookiesPerSale);
    this.salesData.push(cookiesSold);
    this.dailyTotal += cookiesSold;
  }
};

// Render header row
function renderHeaderRow() {
  const salesTable = document.getElementById('sales-table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  tr.innerHTML = '<th>Location</th>';
  Shop.hours.forEach(hour => {
    tr.innerHTML += `<th>${hour}</th>`;
  });
  tr.innerHTML += '<th>Daily Location Total</th>';
  thead.appendChild(tr);
  salesTable.appendChild(thead);
}

// Render each shop row
Shop.prototype.render = function() {
  const salesTable = document.getElementById('sales-table');
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${this.location}</td>`;
  this.salesData.forEach(sales => {
    tr.innerHTML += `<td>${sales}</td>`;
  });
  tr.innerHTML += `<td>${this.dailyTotal}</td>`;
  salesTable.appendChild(tr);
};

// Render footer row
function renderFooterRow() {
  const salesTable = document.getElementById('sales-table');
  const tfoot = document.createElement('tfoot');
  const tr = document.createElement('tr');
  let grandTotal = 0;
  tr.innerHTML = '<td>Totals</td>';
  Shop.hours.forEach((hour, index) => {
    let hourlyTotal = Shop.allShops.reduce((sum, shop) => sum + shop.salesData[index], 0);
    grandTotal += hourlyTotal;
    tr.innerHTML += `<td>${hourlyTotal}</td>`;
  });
  tr.innerHTML += `<td>${grandTotal}</td>`;
  tfoot.appendChild(tr);
  salesTable.appendChild(tfoot);
}

// Render the table
function renderTable() {
  renderHeaderRow();
  Shop.allShops.forEach(shop => {
    shop.calculateSalesData();
    shop.render();
  });
  renderFooterRow();
}

// Instantiate shop objects
new Shop('Seattle', 23, 65, 6.3);
new Shop('Tokyo', 3, 24, 1.2);
new Shop('Dubai', 11, 38, 3.7);
new Shop('Paris', 20, 38, 2.3);
new Shop('Lima', 2, 16, 4.6);

// Call renderTable when the DOM is fully loaded
window.onload = renderTable;
