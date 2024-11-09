// export const useAuth = () => {
//     //getting token from local storage
//     const user = localStorage.getItem('loginData')
//     //checking whether token is preset or not
//     console.log("user===",user);
    
//     if (user) {
//         return true;
//     } else {
//         return false
//     }
// };



export const useAuth = () => {
    // Get loginData from local storage
    const user = JSON.parse(localStorage.getItem('loginData'));

    return user && user.email; // Returns true if email exists, otherwise false
};




// export const useAuth = () => {
//     // Getting token from local storage
//     const user = JSON.parse(localStorage.getItem('loginData'));

//     // Checking whether token is present or not
//     console.log("user===", user);
    
//     return !!user; // Returns true if user exists, otherwise false
// };
