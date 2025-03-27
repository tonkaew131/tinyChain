const fetchMsg = async () => {
    const response = await fetch('/api/hello-world');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

const updateMsg = async (newMsg: string) => {
    const response = await fetch('/api/hello-world', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMsg }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export { fetchMsg, updateMsg };
