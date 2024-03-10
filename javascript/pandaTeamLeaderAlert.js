async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
}

async function fetchDataAndProcess() {
    try {
        const fortniteShopUrl = "https://fortnite-api.com/v2/shop/br/combined";
        const fortniteShopData = await fetchJsonData(fortniteShopUrl);

        const shopItems = fortniteShopData.data.featured.entries.flatMap(
            (entry) => entry.items || []
        );

        const condensedShopItems = shopItems.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            type: item.type,
            rarity: item.rarity,
            series: item.series,
            set: item.set,
            introduction: item.introduction,
            images: item.images,
            variants: item.variants,
            searchTags: item.searchTags,
            shopHistory: item.shopHistory,
        }));

        const pandaExists = condensedShopItems.some(
            (item) => item.name === "P.A.N.D.A Team Leader"
        );

        if (pandaExists) {
            throw new Error("P.A.N.D.A Team Leader is in the shop!");
        } else {
            console.log("P.A.N.D.A Team Leader is not in the shop.");
        }
    } catch (error) {
        console.error("Error fetching and processing data: ", error);
    }
}

fetchDataAndProcess();
