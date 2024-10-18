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

1. State Management Using React Context and Reducers
The React Context API, combined with a reducer pattern, was used for global state management. This allowed the application to centralize the logic for handling rounds, including adding, editing, and managing the new "distance" attribute.
The reducer pattern enabled a clean separation of state logic and user actions. By handling all state mutations through defined actions (ADD_ROUND, EDIT_ROUND), the app achieved predictability and maintainability. This also ensured that the new distance field was seamlessly integrated into the existing rounds state without introducing any side effects.
2. Distance Input and Data Validation
One key challenge was handling user input for the distance field, ensuring flexibility in units (miles and kilometers) while maintaining data consistency. This was solved by converting all distance values to a standard unit (feet) before persisting them, ensuring uniformity across the app.
User input validation was performed to guarantee that distance values entered by users fell within a reasonable range. The validation rules differed for miles and kilometers, ensuring that users entered valid values regardless of their preferred unit. This approach improved data quality and prevented invalid data from being stored.
3. Component Reusability and Modularity
The feature was designed with a modular component structure, keeping individual components focused on a single responsibility. The AddRound component handled all logic related to input and form submission, while the Rounds component was responsible for displaying, searching, and managing rounds.
This modular design allowed for better separation of concerns and made each component easier to test, extend, and maintain. It also facilitated future improvements, such as adding new features or expanding existing ones.
4. Local Storage for Persistence
To enhance the user experience, local storage was leveraged to persist round data, including the distance field, across browser sessions. By storing rounds in local storage, the application maintained data consistency even after page refreshes or browser restarts.

