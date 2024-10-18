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

1. State Management Using React Context and Reducers :
   
The React Context API, combined with a reducer pattern, was used for global state management. This allowed the application to centralize the logic for handling rounds, including adding, editing, and managing the new "distance" attribute.
The reducer pattern enabled a clean separation of state logic and user actions. By handling all state mutations through defined actions (ADD_ROUND, EDIT_ROUND), the app achieved predictability and maintainability. This also ensured that the new distance field was seamlessly integrated into the existing rounds state without introducing any side effects.
3. Distance Input and Data Validation :

One key challenge was handling user input for the distance field, ensuring flexibility in units (miles and kilometers) while maintaining data consistency. This was solved by converting all distance values to a standard unit (feet) before persisting them, ensuring uniformity across the app.
User input validation was performed to guarantee that distance values entered by users fell within a reasonable range. The validation rules differed for miles and kilometers, ensuring that users entered valid values regardless of their preferred unit. This approach improved data quality and prevented invalid data from being stored.

4. Component Reusability and Modularity :
   
The feature was designed with a modular component structure, keeping individual components focused on a single responsibility. The AddRound component handled all logic related to input and form submission, while the Rounds component was responsible for displaying, searching, and managing rounds.
This modular design allowed for better separation of concerns and made each component easier to test, extend, and maintain. It also facilitated future improvements, such as adding new features or expanding existing ones. 

6. Local Storage for Persistence :
   
To enhance the user experience, local storage was leveraged to persist round data, including the distance field, across browser sessions. By storing rounds in local storage, the application maintained data consistency even after page refreshes or browser restarts.


# Reflection

The migration of SpeedScore from a vanilla JavaScript-based implementation to React.js involved a fundamental redesign of how the application manages and interacts with data, UI, and state. This transition significantly improved the application's scalability, maintainability, and overall structure.

Component-Based Architecture:

One of the key changes in moving to React.js was the shift towards a component-based architecture. In the React version, the application was divided into smaller, reusable components such as AddRound, EditRound, and RoundsTable. Each of these components handles a specific aspect of the app, allowing for better modularity and isolation of features. This modularity makes the code easier to maintain and scale as each component can be independently developed and tested.

State Management with Hooks:

React's useState and useEffect hooks were critical to handling dynamic UI updates. In vanilla JavaScript, DOM manipulation was manually managed, which could lead to complex and error-prone code. React's declarative state-driven approach simplifies this by letting components automatically re-render when state changes. The state, which includes data like the list of rounds or user inputs, is now managed in each component and changes flow through the app more predictably.

React Context and Reducers:

To manage the global state more effectively, React Context and Reducers were introduced into the application. The RoundContext provides a global state management solution without the need for prop drilling, making it easier to access rounds data across the application.

React's useReducer is used to implement a more structured way to handle complex state updates, especially for actions like adding, editing, or deleting rounds. By dispatching actions (such as ADD_ROUND or DELETE_ROUND), the state is updated in a predictable manner, which improves code maintainability and scalability. This use of context and reducers emulates how Redux works but without introducing external dependencies, keeping the solution lightweight and well-structured.

LocalStorage for Persistence :

To preserve the app's original functionality of storing user rounds across sessions, the React version integrates localStorage. When users add or edit rounds, these are immediately saved to localStorage via useEffect. Upon refreshing the page, the app loads the stored rounds back into the application's state, ensuring that the user’s data persists. This hybrid use of local state and browser storage allows the app to behave consistently with the vanilla JavaScript version while taking advantage of React's reactivity.

API Integration and Backend Communication:

The React version also extends functionality by connecting to a backend API for more robust data handling. Components like AddRound and EditRound now communicate with a backend using fetch for actions like adding and updating rounds. This integration prepares the app for more advanced use cases such as user authentication and database persistence, moving away from solely front-end data management.


# Reflection

Technical Approach: 
Client-Side Filtering:

The search was implemented on the client side using JavaScript’s .filter() function. As the user types into the search box, the list of rounds is dynamically filtered based on the search query.
This decision was based on the assumption that the dataset is relatively small and could be handled effectively in the browser. For larger datasets, server-side filtering might be more efficient.
Case-Insensitive Search:

To make the search more user-friendly, I ensured that the search is case-insensitive. This was accomplished by converting both the search query and the data fields to lowercase before comparison.
Challenge: One challenge in case-insensitive searching was ensuring the consistent handling of different data types, particularly when searching numbers (like distance and score). I used toString() to convert these numbers into strings for comparison.

Multi-Field Search:
The search was designed to match results across multiple fields: "Date," "Course," "Score," and "Distance." This allows users to search for a round by entering any information they have, without having to specify which field they are searching in.
Solution: I implemented this by combining multiple conditions in the .filter() method, checking each field for a match with the search query. This provides flexibility for the user to search across multiple data points.


In addition to filtering the data, I added functionality to update the table caption to reflect the number of rounds displayed after filtering. This provides immediate feedback to the user on how many rounds match their search criteria.


