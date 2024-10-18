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
