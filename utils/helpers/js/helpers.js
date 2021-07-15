// Check data type of a variable
export const checkDataType = data =>
    Object.prototype.toString.call(data).slice(8, -1);

// Form a display name of a user without dp. e.g.: John Doe = JD or Ram Kumar Gopal = RG
export const getDisplayName = fullName => {
    // fullName is `undefined`
    if (!fullName) {
        return '';
    }
    // fullName could be `Object` or `Array` which are invalid type
    const typeOfFullName = checkDataType(fullName);
    if (typeOfFullName === 'Object' || typeOfFullName === 'Array') {
        return '';
    }
    // Finally, fullName is `String`
    let displayName = '';
    const fullNameArr = fullName.split(' ');
    const fullNameArrLen = fullNameArr.length;

    displayName =
        fullNameArrLen > 1
            ? fullNameArr[0].charAt(0) +
              fullNameArr[fullNameArrLen - 1].charAt(0).toUpperCase()
            : fullNameArr[0].charAt(0).toUpperCase();

    return displayName;
};

// Returns a random integer between min (inclusive) and max (inclusive)
export const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// Regex to validate email address
export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Get min date as today and disable the past dates in calendar
// Format as YYYY-MM-DD
export const getDateAsToday = () => {
    const dateToday = new Date();
    const year = dateToday.getFullYear();
    let month = dateToday.getMonth() + 1;
    let day = dateToday.getDate();

    if (month < 10) {
        month = '0' + month.toString();
    }
    if (day < 10) {
        day = '0' + day.toString();
    }

    return `${year}-${month}-${day}`;
};

export const getFutureDateFromToday = (interval = 3) => {
    let dateToday = new Date();
    dateToday.setMonth(dateToday.getMonth() + interval);
    dateToday = dateToday.toLocaleDateString();
    const dateTodayArr = dateToday.split('/');
    let month = dateTodayArr[0];
    let day = dateTodayArr[1];

    if (parseInt(month) < 10) {
        month = '0' + month.toString();
    }
    if (parseInt(day) < 10) {
        day = '0' + day.toString();
    }

    return `${dateTodayArr[2]}-${month}-${day}`;
};

// Safe anchor/link redirection
export const safeRedirect = (url, isNewTab = false) => {
    if (url && url !== '#!') {
        const redirectLink = document.createElement('a');
        redirectLink.href = url;
        if (isNewTab) {
            redirectLink.target = '_blank';
            redirectLink.rel = 'noopener noreferrer';
        }
        redirectLink.click();
    }
};

// Logout and redirect to login page
export const logoutAndRedirect = (uiApiUtils, Cookies) => {
    // Clear cookies
    Cookies.remove('hms_acct');
    Cookies.remove('hms_reft');
    // Redirect to logout URL to destroy the session
    safeRedirect(`${uiApiUtils.domain}/logout`);
};

// Check if session access token is expired or not
export const isAccessTokenExpired = (jwt, accessToken) => {
    const nowTimestamp = Math.floor(new Date().getTime() / 1000);
    const {
        payload: { exp }
    } = jwt.decode(accessToken, { complete: true });
    // Returns `true` if token is expired, else `false`
    return exp < nowTimestamp;
};

// Sort array of objects in alphabetical order using value or name
export const sortArrayOfObjects = arr =>
    (arr &&
        arr
            .map(obj => obj.value || obj.name)
            .sort()
            .reduce((resArr, str) => {
                arr.forEach(item => {
                    if (item.value === str) {
                        resArr.push(item);
                    }
                });

                return resArr;
            }, [])) ||
    [];

// Stringify array values
export const stringifyArrayValues = arr =>
    (arr && arr.map(item => item.data).join(',')) || '';

// Just to log formData values; keeping as handy tool (for dev only)
export const consoleFormData = formData => {
    for (let [key, value] of formData) {
        console.log('key =', key, ', value =', value);
    }
};

// UI and API app's URL & Port config
export const envUrlandPort = {
    app: {
        ui: `${window.location.protocol}//${window.location.hostname}:${
            window.location.port === '' ? 443 : 3000
        }`,
        api: process.env.REACT_APP_API_URL
    }
};

export const WARNING_INTERVAL = 7200000; // In msec, 2 * 60 * 60 * 1000 = 2hrs
export const EXPIRED_INTERVAL = 300; // In sec, 5 * 60 = 5mins

// Generic or specific error messages
export const fieldLevelMsg = {
    errorText: 'field is required'
};
