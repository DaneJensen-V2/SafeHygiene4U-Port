const colors = {
    //these colors are from Repurpost brand style guide
    robin_egg_blue: "#00D6BA",
    bright_turquoise: "#00F5D4",
    medium_purple: "#9B5DE5",
    brilliant_rose: "#F15BB5",
    cerulean: "00BBF9",
    bright_sun: "#FEE440",
    ebony_clay: "#253342",
    pickled_bluewood: "#33475B",
    white: "#FFFFFF",
    catskill_white: "#EAF0F6",
    light_gray: "#798693",
};

const fontNames = {
    Poppins_Regular: 'Poppins_400Regular',
    Poppins_SemiBold: 'Poppins_600SemiBold',
    Poppins_Bold: 'Poppins_700Bold',
    Nunito_Regular: 'Nunito_400Regular',
    Nunito_Bold: 'Nunito_700Bold',
    Nunito_Medium : 'Nunito_500Medium',
};

const icons = {
    envelope: 'fa-regular fa-envelope',
    temp: 'fa-regular fa-circle-xmark',
    eye: 'fa-regular fa-eye',
    eyeSlash: 'fa-regular fa-eye-slash', 
    user: 'fa-regular fa-user'
};

const authenticationConstants = {
    userEmail: 'USER_EMAIL',
    userInfo: 'USER_INFO',
    accessToken: 'ACCESS_TOKEN',
    refreshToken: 'REFRESH_TOKEN',
};

module.exports = {
    colors,
    fontNames,
    icons,
    authenticationConstants,
};
