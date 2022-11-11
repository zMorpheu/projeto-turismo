Feature: Is the form filled out?
  Everyone wants to know if the form is filled out
  Scenario Outline: The form is "<state>"
    Given form is "<state>"
    When I ask if the form is Filled out
    Then I should be told "<answer>"

    Examples:
    | state          | answer |
    | Filled         | The form is filled! |
    | Empty          | The form is empty!  |
  