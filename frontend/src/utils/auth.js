export const saveToken = (

    token,
    role,
    name

) => {

    localStorage.setItem(
        "token",
        token
    );

    localStorage.setItem(
        "role",
        role
    );

    localStorage.setItem(
        "name",
        name
    );
};


export const getToken = () => {

    return localStorage.getItem(
        "token"
    );
};


export const getRole = () => {

    return localStorage.getItem(
        "role"
    );
};


export const getName = () => {

    return localStorage.getItem(
        "name"
    );
};


export const removeToken = () => {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "role"
    );

    localStorage.removeItem(
        "name"
    );
};


export const isAuthenticated = () => {

    return !!localStorage.getItem(
        "token"
    );
};