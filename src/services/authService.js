import db from "../data/db.json";
const { users } = db;

function getUsers() {
    const storedUsers = JSON.parse(sessionStorage.getItem("cb_users"));
    return storedUsers || users; 
}

function saveUsers(userList) {
    sessionStorage.setItem("cb_users", JSON.stringify(userList));
}

export async function login(authDetail){
    const userList = getUsers();
    const user = userList.find(user => user.email === authDetail.email);
    
    if(!user){
        throw { message: "Cannot find user. Please register", status: 401 }; //eslint-disable-line
    }
    // Simple password check mock 
    if(user.password && user.password !== authDetail.password){
         throw { message: "Incorrect password", status: 401 }; //eslint-disable-line
    }

    return {
        accessToken: "mock_token_123",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

export async function register(authDetail){
    const userList = getUsers();
    const existingUser = userList.find(user => user.email === authDetail.email);
    
    if(existingUser){
        throw { message: "User already exists", status: 400 }; //eslint-disable-line
    }

    const newUser = {
        ...authDetail,
        id: userList.length + 1
    };
    
    // Save to session storage
    userList.push(newUser);
    saveUsers(userList);

    return {
        accessToken: "mock_token_123",
        user: newUser
    };
}

export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cbid");
}