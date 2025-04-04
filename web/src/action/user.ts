const updateWallet = async (amount: number) => {
    const response = await fetch('/api/payment/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });
    return await response.json();
};

const developerFarmerStats = async () => {
    const response = await fetch('/api/developer/stats', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

export { updateWallet, developerFarmerStats };
