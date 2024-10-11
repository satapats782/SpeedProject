import { expect } from "@playwright/test";

/****************************************************************************************
 * This file contains helper functions for the tests. These functions are used to
 * initialize the test user, log in to SpeedScore, and add a round.
 * *************************************************************************************/

function getRandomDate() {
    const start = new Date(2000, 0, 1).getTime();
    const end = new Date().getTime();
    const randomDate = new Date(start + Math.random() * (end - start));
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const day = String(randomDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

/****************************************************************************************
 * @function initTestUser
 * @param {Page} page - The page object to use for the test
 * @param {string} email - The email of the test user
 * @param {string} password - The password of the test user
 * @description
 * This function initializes a new user account with no rounds for the specified user.
 ****************************************************************************************/
export async function initTestUser(
    page,
    email = "testuser@gmail.com",
    password = "TestUser123"
) {
    await page.evaluate(
        ({ email, password }) => {
            const testUser = {
                accountInfo: {
                    email: email,
                    password: password,
                    securityQuestion: "What is your favorite color?",
                    securityAnswer: "Orange",
                },
                identityInfo: {
                    displayName: "Test User",
                    profilePic: "images/DefaultProfilePic.jpg",
                },
                speedgolfInfo: {
                    bio: "",
                    clubs: {},
                    clubComments: "",
                    firstRound: "",
                    homeCourse: "",
                    personalBest: {
                        strokes: 0,
                        minutes: 0,
                        seconds: 0,
                        course: "",
                    },
                },
                roundCount: 0,
                rounds: [],
            };
            localStorage.setItem(
                "testuser@gmail.com",
                JSON.stringify(testUser)
            );
        },
        { email, password }
    );
}

/****************************************************************************************
 * @function login
 * @param {Page} page - The page object to use for the test
 * @description
 * This function logs in to SpeedScore with the test user account. It asserts that the
 * login page is visible, fills out the email and password fields, and clicks the login
 * button. It then asserts that the "Feed" page is visible--the landing page for a logged
 * in user.
 ****************************************************************************************/
export async function login(
    page,
    email = "testuser@gmail.com",
    password = "TestUser123"
) {
    await expect(page.isVisible("#loginPage")).resolves.toBe(true);
    await page.fill("#email", email);
    await page.fill("#password", password);
    await page.click("#loginBtn");
    await expect(page.isVisible("#feedModeTab")).resolves.toBe(true);
}

/****************************************************************************************
 * @function addRound
 * @param {Page} page - The page object to use for the test
 * @param {object} round - The round to add
 * @description
 * This function adds a round to the test user account. It asserts that the "New Round"
 * button is visible, clicks the button, fills out the form, and clicks the "Submit" button.
 * Additional checks can be done after this function to verify expected behavior.
 * *************************************************************************************/
export async function addRound(page, round) {
    await expect(page.isVisible("#roundsModeActionBtn")).resolves.toBe(true);
    await page.click("#roundsModeActionBtn");
    await expect(page.isVisible("#logRoundForm")).resolves.toBe(true);
    await page.fill("#roundDate", round.date);
    await page.fill("#roundCourse", round.course);
    await page.selectOption(
        "#roundType",
        round.hasOwnProperty("type") ? round.type : "practice"
    );
    await page.selectOption(
        "#roundHoles",
        round.hasOwnProperty("holes") ? round.holes : "18"
    );
    await page.fill("#roundStrokes", round.strokes);
    await page.fill("#roundMinutes", round.minutes);
    await page.fill("#roundSeconds", round.seconds);
    const distElt = await page.$("#roundDistance");
    if (distElt !== null) {
        await page.fill(
            "#roundDistance",
            round.hasOwnProperty("distance") ? round.distance : ""
        );
    }
    await page.fill("#roundNotes", round.notes);
    await page.click("#roundFormSubmitBtn");
}

/****************************************************************************************
 * @function addRounds
 * @param {Page} page - The page object to use for the test
 * @param {number} roundCount - The number of rounds to add
 * @description
 * This function adds a specified number of valid rounds (with random values for date,
 * strokes, minutes, seconds, and distance) to the test user account. It returns
 * an array of the rounds that were added.
 * *************************************************************************************/
export async function addRounds(page, roundCount) {
    const rounds = [];
    for (let i = 0; i < roundCount; i++) {
        const round = {
            date: getRandomDate(),
            course: "Test Course " + i,
            type: "practice",
            holes: "18",
            strokes: getRandomInt(65, 100).toString(), // Random strokes between 65 and 100
            minutes: getRandomInt(40, 85).toString(), // Random minutes between 40 and 85
            seconds: getRandomInt(0, 59).toString(), // Random seconds between 0 and 59
            distance: getRandomFloat(4, 8).toString(), // Need random distance between 4 and 8
            notes: "Test Round " + i,
        };
        rounds.push(round);
        await addRound(page, round);
    }
    return rounds;
}
