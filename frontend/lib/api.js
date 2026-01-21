import { cookies } from 'next/headers'; // 1. Import this

export const getTransactions = async (pageId) => {
    const api_url = process.env.NEXT_PUBLIC_SERVER_API;

    try {
        // 2. Grab the cookies from the incoming user request
        const cookieStore = await cookies(); 
        const token = cookieStore.toString(); // Converts all cookies to a string header

        const response = await fetch(`${api_url}/api/transactions/getTransactions/${pageId}`, {
            method: 'GET',
            cache: 'no-store', // 'no-cache' or 'no-store' for dynamic data
            headers: {
                'Content-Type': 'application/json',
                'Cookie': token // 3. Manually forward the cookies here
            }
        });

        if (!response.ok) {
            console.log(`API Error: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Fetch error:", error);
        return [];
    }
}