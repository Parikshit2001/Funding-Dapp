function App() {
  return (
    <div className="text-center">
      <nav className="w-full bg-gray-100 px-auto py-8">
        <h1 className="text-xl">Funding</h1>
      </nav>
      <section className="py-5 space-y-5">
        <div>
          <p className="text-2xl font-semibold">Balance: 20ETH</p>
          <p>Account: 0x0000000000000000000000000000000000000000</p>
        </div>
        <div className="space-x-3">
          <button className="bg-green-500 text-white rounded-md px-4 py-2">Connect to metamask</button>
          <button className="bg-green-500 text-white rounded-md px-4 py-2">Transfer</button>
          <button className="bg-blue-500 text-white rounded-md px-4 py-2">Withdraw</button>
        </div>
      </section>
      <footer className="w-full bg-gray-100 px-auto py-8">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
