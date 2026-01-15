import db from "../data/db.json";
const { products, featured_products } = db;

export async function getProductList(searchTerm){
    if (!searchTerm) return products;
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export async function getProduct(id){
    const product = products.find(p => p.id === Number(id));
    if (!product) {
        throw { message: "Product not found", status: 404 }; //eslint-disable-line
    }
    return product;
}

export async function getFeaturedList(){
    return featured_products;
}