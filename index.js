
// 1. Define the createLoginTracker function
function createLoginTracker(userInfo) {

    // 2. Initialize the login attempt counter
    let attemptCount = 0;

    // Validate the user information
    if (
        !userInfo ||
        typeof userInfo.username !== "string" ||
        userInfo.username.trim() === "" ||
        typeof userInfo.password !== "string" ||
        userInfo.password.length === 0
    ) {
        throw new Error("Invalid user information provided.");
    }

    // 3. Define the nested arrow function to handle login attempts
    const loginAttempt = (passwordAttempt) => {

        // Check whether the account is already locked
        if (attemptCount >= 3) {
            return "Account locked due to too many failed login attempts.";
        }

        // Count the current login attempt
        attemptCount++;

        // Validate the password input
        if (typeof passwordAttempt !== "string") {
            if (attemptCount >= 3) {
                return "Account locked due to too many failed login attempts.";
            }

            return `Invalid password input. Attempt ${attemptCount} of 3.`;
        }

        // Check whether the entered password matches the correct password
        if (passwordAttempt === userInfo.password) {
            return `Login successful on attempt ${attemptCount}!`;
        } else {

            // Handle an incorrect password
            if (attemptCount >= 3) {
                return "Account locked due to too many failed login attempts.";
            }

            return `Login failed. Attempt ${attemptCount} of 3.`;
        }
    };

    // 4. Return the inner function
    return loginAttempt;
}


// 5. Create a user information object
const userInfo = {
    username: "user123",
    password: "pass123"
};


// 6. Create the login tracker
const login = createLoginTracker(userInfo);


// 7. Test Case One: Successful login
console.log("TEST 1: Successful Login");
console.log(login("pass123"));
// Expected: Login successful on attempt 1!


// 8. Test Case Two: Failed login
console.log("\nTEST 2: Failed Login");
const login2 = createLoginTracker(userInfo);

console.log(login2("wrongpass"));
// Expected: Login failed. Attempt 1 of 3.

console.log(login2("wrongpass"));
// Expected: Login failed. Attempt 2 of 3.


// 9. Test Case Three: Correct password after a failed attempt
console.log("\nTEST 3: Correct Password After Failure");
const login3 = createLoginTracker(userInfo);

console.log(login3("wrongpass"));
// Expected: Login failed. Attempt 1 of 3.

console.log(login3("pass123"));
// Expected: Login successful on attempt 2!


// 10. Test Case Four: Lock account after three failed attempts
console.log("\nTEST 4: Account Locking");
const login4 = createLoginTracker(userInfo);

console.log(login4("wrongpass"));
// Expected: Login failed. Attempt 1 of 3.

console.log(login4("wrongpass"));
// Expected: Login failed. Attempt 2 of 3.

console.log(login4("wrongpass"));
// Expected: Account locked due to too many failed login attempts.

console.log(login4("pass123"));
// Expected: Account locked due to too many failed login attempts.


// 11. Test Case Five: Invalid password input
console.log("\nTEST 5: Invalid Password Input");
const login5 = createLoginTracker(userInfo);

console.log(login5(12345));
// Expected: Invalid password input. Attempt 1 of 3.


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};