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
1. State-Driven UI Management:
   
The core of the delete functionality is managed through React state, ensuring that the UI remains responsive and efficient. The modal confirmation dialog is triggered by setting a piece of state (showDeleteModal) and specifying the round to be deleted through another piece of state (roundToDelete).

2. Delete Confirmation Modal for User Safety :
   
The delete process requires user confirmation through a Bootstrap modal. This approach offers a clean, accessible, and responsive UI for the user to confirm whether they want to proceed with the deletion.
The modal's close/cancel button and confirmation button are tied to the state management system, ensuring that the UI updates accordingly based on user interaction.

3. Data Persistence :
One of the key aspects of the delete functionality is the synchronization between the local application state and localStorage. When a round is deleted:
It is first filtered out of the current dataset stored in the component’s state (sortedData).
Next, the new list of rounds is persisted to localStorage, ensuring that the deleted round is no longer visible after page refreshes or when the user revisits the app.

4. Handling Deletions Efficiently:
The deletion is processed locally by filtering the sortedData state array. This ensures that the component re-renders immediately after a round is deleted, providing a real-time update to the user without reloading the entire page.
Updating localStorage is done in the same step to ensure data persistence, which is crucial for retaining consistency across user sessions.

6. Modularity and Scalability
The delete functionality is built to be extendable, allowing for future scalability:
The current implementation focuses on local data, but the modular design allows for easy integration with a server-side API. For example, the onDeleteRoundClick handler could be updated to send a DELETE request to a backend service before updating local state.

 
