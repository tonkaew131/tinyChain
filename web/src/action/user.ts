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

export { updateWallet };
