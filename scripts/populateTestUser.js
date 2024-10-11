if (!localStorage.getItem("setupDone")) {
    var userData = {
        "accountInfo": {
            "email": "user@ss.org",
            "password": "Speedgolf1",
            "securityQuestion": "where is osu located?",
            "securityAnswer": "corvallis"
        },
        "identityInfo": {
            "displayName": "speedGolfUser",
            "profilePic": "images/DefaultProfilePic.jpg"
        },
        "speedgolfInfo": {
            "bio": "",
            "homeCourse": "",
            "firstRound": "",
            "personalBest": {
                "strokes": 0,
                "minutes": 0,
                "seconds": 0,
                "course": ""
            },
            "clubs": {},
            "clubComments": ""
        },
        "rounds": [
            {
                "date": "2022-10-14",
                "course": "Red Wolf",
                "type": "practice",
                "holes": "18",
                "strokes": "80",
                "minutes": "60",
                "seconds": "00",
                "SGS": "140:00",
                "notes": "",
                "roundNum": 1
            },
            {
                "date": "2022-10-10",
                "course": "Palouse Ridge",
                "type": "practice",
                "holes": "18",
                "strokes": "80",
                "minutes": "60",
                "seconds": "00",
                "SGS": "140:00",
                "notes": "",
                "roundNum": 2
            },
            {
                "date": "2022-10-05",
                "course": "Bryden Canyon",
                "type": "practice",
                "holes": "18",
                "strokes": "76",
                "minutes": "55",
                "seconds": "00",
                "SGS": "131:00",
                "notes": "",
                "roundNum": 3
            }
        ],
        "roundCount": 3
    };
    localStorage.setItem("user@ss.org", JSON.stringify(userData));
    localStorage.setItem("setupDone", "true");
    console.log("Local storage populated with user data:", userData);
} else {
    console.log("Setup has already been completed.");
}