// Constructor function for Shop
function Shop(location, minCustomers, maxCustomers, avgCookiesPerSale, address, hours, contact) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.address = address;
  this.hours = hours;
  this.contact = contact;
  this.salesData = [];
  this.dailyTotal = 0;
  Shop.allShops.push(this);
}

Shop.prototype.renderDetails = function() {
  const mainSection = document.getElementById('location-details');
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  h2.textContent = this.location;
  article.appendChild(h2);

  const pAddress = document.createElement('p');
  pAddress.textContent = `Address: ${this.address}`;
  article.appendChild(pAddress);

  const pHours = document.createElement('p');
  pHours.textContent = `Hours: ${this.hours}`;
  article.appendChild(pHours);

  const pContact = document.createElement('p');
  pContact.textContent = `Contact: ${this.contact}`;
  article.appendChild(pContact);

  mainSection.appendChild(article);
};


Shop.allShops = [];
Shop.hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

Shop.prototype.generateCustomers = function() {
  return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
};

Shop.prototype.calculateSalesData = function() {
  for (let hour of Shop.hours) {
    const customers = this.generateCustomers();
    const cookiesSold = Math.round(customers * this.avgCookiesPerSale);
    this.salesData.push(cookiesSold);
    this.dailyTotal += cookiesSold;
  }
};

Shop.prototype.render = function(table) {
  const tr = document.createElement('tr');
  let td = document.createElement('td');
  td.textContent = this.location;
  tr.appendChild(td);

  this.salesData.forEach(sales => {
    td = document.createElement('td');
    td.textContent = sales;
    tr.appendChild(td);
  });

  td = document.createElement('td');
  td.textContent = this.dailyTotal;
  tr.appendChild(td);

  table.appendChild(tr);
};

function renderHeaderRow(table) {
  const tr = document.createElement('tr');
  let th = document.createElement('th');
  th.textContent = 'Location';
  tr.appendChild(th);

  Shop.hours.forEach(hour => {
    th = document.createElement('th');
    th.textContent = hour;
    tr.appendChild(th);
  });

  th = document.createElement('th');
  th.textContent = 'Daily Location Total';
  tr.appendChild(th);

  table.appendChild(tr);
}

function renderFooterRow(table) {
    // Clear existing footer
    const existingFooter = table.querySelector('tfoot');
    if (existingFooter) {
        existingFooter.remove();
    }

    // Create new footer
    const tfoot = document.createElement('tfoot');
    const tr = document.createElement('tr');
    let td;

    // Add the first cell for the label 'Totals'
    td = document.createElement('td');
    td.textContent = 'Totals';
    tr.appendChild(td);

    let grandTotal = 0;
    Shop.hours.forEach((_, hourIndex) => {
        let hourlyTotal = 0;
        Shop.allShops.forEach(shop => {
            hourlyTotal += shop.salesData[hourIndex];
        });
        grandTotal += hourlyTotal;

        td = document.createElement('td');
        td.textContent = hourlyTotal;
        tr.appendChild(td);
    });

    // Add the grand total at the end
    td = document.createElement('td');
    td.textContent = grandTotal;
    tr.appendChild(td);

    tfoot.appendChild(tr);
    table.appendChild(tfoot);
}

function renderTable() {
  const salesTable = document.getElementById('sales-table');
  salesTable.innerHTML = '';
  renderHeaderRow(salesTable);

  Shop.allShops.forEach(shop => {
    shop.calculateSalesData();
    shop.render(salesTable);
  });

  renderFooterRow(salesTable);
}

// Instantiate shop objects
new Shop('Seattle', 23, 65, 6.3, '123 Pike Place', '6am - 8pm', 'seattle@salmoncookies.com');
new Shop('Tokyo', 3, 24, 1.2, '2 Chome-11-3 Meguro', '6am - 8pm', 'tokyo@salmoncookies.com');
new Shop('Dubai', 11, 38, 3.7, 'The Dubai Mall', '6am - 8pm', 'dubai@salmoncookies.com');
new Shop('Paris', 20, 38, 2.3, '101 Rue de Rivoli', '6am - 8pm', 'paris@salmoncookies.com');
new Shop('Lima', 2, 16, 4.6, 'Av. La Paz', '6am - 8pm', 'lima@salmoncookies.com');

document.getElementById('new-shop-form').addEventListener('submit', function(event) {
});

// Check if the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderTable);
