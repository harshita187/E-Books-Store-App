import db from "../data/db.json";
const { users } = db;

export async function login(authDetail){
    const user = users.find(user => user.email === authDetail.email);
    
    if(!user){
        throw { message: "Cannot find user. Please register", status: 401 }; //eslint-disable-line
    }
    // Simple password check mock - In real app, we would hash/check password
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
    const existingUser = users.find(user => user.email === authDetail.email);
    
    if(existingUser){
        throw { message: "User already exists", status: 400 }; //eslint-disable-line
    }

    // "Create" user in memory (won't persist to file in static app)
    const newUser = {
        ...authDetail,
        id: users.length + 1
    };
    
    // Note: We can't push to the imported JSON file to persist it on the server
    // But we can return success so the flow continues in the UI

    return {
        accessToken: "mock_token_123",
        user: newUser
    };
}

export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cbid");
}