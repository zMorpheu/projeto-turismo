const assert = require('assert');
const { Given, When, Then } = require('cucumber');

const isItFilled = form => {
  if(form === "Filled") {
    return 'The form is filled!';
  } else {
    return 'The form is empty!';
  }
}

Given('form is {string}', stateForm => {
  this.form = stateForm;
});

When('I ask if the form is Filled out', () => {
  this.actualAnswer = isItFilled(this.form);
});
Then('I should be told {string}', expectedAnswer => {
  assert.equal(this.actualAnswer, expectedAnswer);
});