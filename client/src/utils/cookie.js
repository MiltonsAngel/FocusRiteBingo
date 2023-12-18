class Cookie {
    
    setCookieWith12HourExpiry(name, value) {
        // Create a new Date instance for the current time
        const now = new Date();
    
        // Set the time to 12 hours from now
        now.setTime(now.getTime() + (12 * 60 * 60 * 1000)); // 12 hours in milliseconds
    
        // Convert the time to a UTC string
        const expires = "expires=" + now.toUTCString();
    
        // Set the cookie with the name, value, and expiry time
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }


    getCookie(name) {
        // Add the equal sign and the cookie name
        const nameWithEquals = name + "=";
    
        // Split document.cookie on semicolons into an array
        const cookieArray = document.cookie.split(';');
    
        // Loop through the array elements
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            
            // Trim leading whitespace
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
    
            // Check if the cookie string begins with the name we want
            if (cookie.indexOf(nameWithEquals) === 0) {
                return cookie.substring(nameWithEquals.length, cookie.length);
            }
        }
        return null; // Return null if not found
    }
}
const cookie = new Cookie();

export default cookie;