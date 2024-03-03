const packtCode = 1;

const fetchImagesOracleNames = async (packtCode) => {
    try {
        const response = await fetch(`http://172.16.17.2:8080/ords/market/tbl/pkt_images?packet_code=${packtCode}`);
        const json = await response.json();
        const imageNameArray = json.items;

        const promises = imageNameArray.map(async (item) => {
            try {
                const response1 = await fetch(`http://172.16.17.10:4666/api/Photo/get1/${item.img_name}`);
                const json1 = await response1.json();
                return json1;
            } catch (error) {
                console.log(error);
                return null; // or handle the error as per your requirement
            }
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        return results.filter(result => result !== null); // Filter out null results
    } catch (error) {
        console.log(error);
        return []; // Return an empty array in case of error
    }
};

// Call the function and handle the result using then/catch
fetchImagesOracleNames(packtCode)
    .then((result) => {
        console.log(result.length); // Log the result
    })
    .catch((error) => {
        console.error(error); // Log any errors occurred during the process
    });

