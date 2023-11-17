// Helper function to generate random number of customers
function randomCustomerCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shop constructor
function Shop(location, minCustomers, maxCustomers, avgCookiesPerSale) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.salesData = [];
}

// Calculate sales method
Shop.prototype.calculateSales = function() {
  for (let hour = 6; hour <= 20; hour++) {
    const customers = randomCustomerCount(this.minCustomers, this.maxCustomers);
    const cookies = Math.floor(customers * this.avgCookiesPerSale);
    this.salesData.push(cookies);
  }
};

// Rendering sales to the DOM
Shop.prototype.renderSales = function(parentId) {
  const parentElement = document.getElementById(parentId);
  const locationElement = document.createElement('h2');
  locationElement.textContent = this.location;
  parentElement.appendChild(locationElement);

  const listElement = document.createElement('ul');
  for (let i = 0; i < this.salesData.length; i++) {
    const listItem = document.createElement('li');
    const hour = i + 6;
    listItem.textContent = `${hour % 12 || 12}${hour < 12 ? 'am' : 'pm'}: ${this.salesData[i]} cookies`;
    listElement.appendChild(listItem);
  }
  parentElement.appendChild(listElement);
};

// Creating shop instances
const seattleShop = new Shop('Seattle', 23, 65, 6.3);
const tokyoShop = new Shop('Tokyo', 3, 24, 1.2);
const dubaiShop = new Shop('Dubai', 11, 38, 3.7);
const parisShop = new Shop('Paris', 20, 38, 2.3);
const limaShop = new Shop('Lima', 2, 16, 4.6);

// Array of all shops
const allShops = [seattleShop, tokyoShop, dubaiShop, parisShop, limaShop];

// Calculate sales for each shop and render to the DOM
allShops.forEach(shop => {
  shop.calculateSales();
  shop.renderSales('sales-data');
});
