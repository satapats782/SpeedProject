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

