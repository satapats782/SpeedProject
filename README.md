# SpeedScore

This repository contains the code for SpeedScore, a single page web application that supports the sport of speedgolf by allowing users to

-   log and analyze their speedgolf rounds
-   share and discuss their speedgolf rounds with other speedgolfers
-   add detailed golf, running, and topographical data on speedgolf-friendly to SpeedScore's course database

SpeedScore is implemented in HTML, CSS, and JavaScript. It presently stores all app data locally in `localStorage`. In the future, it will also store app data in a cloud-based database.

To run SpeedScore from Visual Studio Code, type
`npm run start`
in the terminal.

# Reflection for Rounds Sorting
1. State Management for Sorting Logic:
   
React’s useState Hook was used to manage the state of the sorting column and order. The sortedColumn and sortOrder states were introduced to track which column (date, course, score, or distance) was being sorted and whether the sorting was in ascending or descending order.
This state-driven approach made it easy to update the UI dynamically whenever a user clicked on a sortable column. 

2. Dynamic Sorting with Flexibility :
   
The sorting logic was designed to be generic, allowing any column to be sorted by clicking on the column header. This function compared values based on the type of data (date, string, or number), ensuring robust sorting behavior for all columns.
Sorting Icons: FontAwesome icons were utilized to visually represent the sort order for each column. The icons dynamically switched between ascending, descending, and neutral states depending on the user's interaction, improving the user experience and making the functionality intuitive.

3. Optimizing Sorting for Large Data Sets:
   
To handle potentially large datasets efficiently, the sorting logic was built to operate on shallow copies of the data, avoiding unnecessary re-rendering or mutation of the original data. This ensures that the sorting operation does not affect the underlying state and allows for more predictable behavior, especially in larger applications.

4. Integration with Existing Features :
The sorting feature was smoothly integrated into the existing search and filter functionalities.

5. User Experience (UX) Considerations :
From a user experience perspective, the sort functionality was designed to be intuitive. Clicking on a column header switches the sort order, and the sort order persists visually through the icon change. This visual feedback helps users understand the state of the table at a glance.

6. Scalability and Extensibility:
The sorting logic was implemented in a scalable way, making it easy to extend to future columns or data types. By utilizing a flexible comparator function and abstracting the sorting state, any new columns can be added with minimal changes to the core logic.

