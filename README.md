# React-Blockchain

A Bitcoin Wallet and Transaction Explorer.
React Blockchain is built using React.js, Webpack, Node.js & Express.

### Setup
### Installing dependencies

1) If you haven't already done so, [install Node](https://nodejs.org/en/) (version 4.4.0 and above).

## Running React-Blockchain

1) Clone [ReactBlockChain]() repo:

```bash
git clone https://github.com/Pardo7/React-Blockchain.git
```

2) Use NPM to install dependencies:

```bash
cd React-Blockchain
npm install
```

This will create the `/node_modules` folder.

3) Start your node server

```bash
npm run server
```

4) In a separate terminal session: Start your local React-Blockchain development server:

```bash
npm run start
```

You'll see some output in the terminal resembling the sample output below:

```bash
Hash: 0b30ddc337bb002f147f
Version: webpack 4.19.1
Time: 2356ms
Built at: 2018-09-20 17:31:27
       Asset       Size  Chunks             Chunk Names
     main.js    148 KiB       0  [emitted]  main
./index.html  571 bytes          [emitted]
```

4) Open the application url http://localhost:3000/


# Taking React Blockchain To Production
### Build

This command performs HTML, CSS, and JS minification on the application dependencies. The minified files are output to the /dist folder, and are suitable for serving from a HTTP/2+Push compatible server.

```bash
npm run build
```
