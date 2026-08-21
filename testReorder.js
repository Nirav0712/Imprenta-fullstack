import axios from 'axios';

async function test() {
    try {
        // First get categories manually from local DB
        const res = await axios.get('http://localhost:5000/api/categories');
        const categories = res.data.categories || res.data;
        if (!categories.length) {
            console.log("No categories.");
            return;
        }
        console.log("First Category ID:", categories[0]._id, "Order:", categories[0].order);

        // Try to patch
        // Note: we need admin token to patch.
        console.log("Cannot patch without token.")
    } catch (err) {
        console.error(err);
    }
}
test();
