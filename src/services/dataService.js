import db from "../data/db.json";

function getSession(){
    try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const cbid = JSON.parse(sessionStorage.getItem("cbid"));
        return {token, cbid};
    } catch(error) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("cbid");
        return {token: null, cbid: null};
    }
}

export async function getUser(){
    const browserData = getSession();
    if (!browserData.cbid) throw { message: "Please login again", status: 401 }; //eslint-disable-line

    const user = db.users.find(u => u.id === browserData.cbid);
    if (!user) throw { message: "User not found", status: 404 }; //eslint-disable-line
    
    return user;
}

export async function getUserOrders(){
    const browserData = getSession();
    if (!browserData.cbid) throw { message: "Please login again", status: 401 }; //eslint-disable-line

    const orders = db.orders.filter(order => order.user.id === browserData.cbid);
    return orders;
}

export async function createOrder(cartList, total, user){
    const browserData = getSession();
    if (!browserData.token) throw { message: "Please login again", status: 401 }; //eslint-disable-line

    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        },
        // Mock ID generation
        id: Math.floor(Math.random() * 1000000)
    }
    
    // In a real backend, we'd save this. Here we just return it to prompt success.
    return order;
}