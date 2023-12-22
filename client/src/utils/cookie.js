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

    getCookiesEndingWith(suffix) {
       // const suffixWithEquals = suffix + "=";
        const cookiesArray = document.cookie.split(';');
        let filteredCookies = [];

        for (let i = 0; i < cookiesArray.length; i++) {
            let cookie = cookiesArray[i].trim();
            let cookieName = cookie.split('=')[0];
           
            // Check if the cookie name ends with the specified suffix
            if (cookieName.endsWith(suffix)) {
                const cookieKey = cookie.substring(0, cookie.indexOf('=')).replace(/_/g, ' ');
                let pos = cookieKey.lastIndexOf(' ');
                const cookieValue = cookie.substring(cookie.indexOf('=') + 1);
               // filteredCookies[cookieKey.substring(0,pos)] = decodeURIComponent(cookieValue);
                filteredCookies.push( 
                {
                    name: cookieKey.substring(0,pos),
                    email: decodeURIComponent(cookieValue)
                });
            }
        }
    
        return filteredCookies; 
    }


    deleteCookiesEndingWith(suffix) {
        // Access the document.cookie string and split it into individual cookies
        const cookies = document.cookie.split(';');
    
        // Iterate through each cookie
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
    
            // Trim leading spaces
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
    
            // Check if the cookie ends with the specified suffix
            if (cookie.endsWith(suffix)) {
                const equalsIndex = cookie.indexOf('=');
                const cookieName = equalsIndex > -1 ? cookie.substr(0, equalsIndex) : cookie;
                
                // Set the cookie to expire in the past to effectively delete it
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            }
        }
    }    
}
const cookie = new Cookie();

export default cookie;