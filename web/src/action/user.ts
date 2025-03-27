const updateWallet = (amount: number) => {
  const response = await fetch('/api/update-wallet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })
  return await response.json()
}

export { updateWallet }
