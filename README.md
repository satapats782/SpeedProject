# SpeedScore

This repository contains the code for SpeedScore, a single page web application that supports the sport of speedgolf by allowing users to

-   log and analyze their speedgolf rounds
-   share and discuss their speedgolf rounds with other speedgolfers
-   add detailed golf, running, and topographical data on speedgolf-friendly to SpeedScore's course database

SpeedScore is implemented in HTML, CSS, and JavaScript. It presently stores all app data locally in `localStorage`. In the future, it will also store app data in a cloud-based database.

To run SpeedScore from Visual Studio Code, type
`npm run start`
in the terminal.

# Reflection

Approach:

I approached this task by first creating a new warmup branch as instructed. 
Then, I started implementing the "About" box functionality by copying the HTML code from aboutBox.html into the index.html file. This allowed me to quickly integrate the "About" modal box into the project.
After setting up the global variables to reference the modal and its buttons in scripts/main.js, I added event handlers in scripts/sideMenu.js for the "About" menu item and for the buttons to control opening and closing the modal.

Testing and Validation:

I wrote a Playwright test suite to validate the functionality of the "About" box. The tests covered the display of the modal when the "About" menu item is clicked, as well as closing the modal when the "x" button or the "OK" button is pressed. Running these tests using npm run test confirmed that the functionality worked as expected and helped me catch any potential edge cases.


