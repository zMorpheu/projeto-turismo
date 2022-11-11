const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given(/^I am in register page$/, function(table) {
  this.data = getData(table.rowsHash());
  createUserPage.enterUserDetails(this.data);
});