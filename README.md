# Blockchain-based Toll Payment System

## Overview

This project implements a decentralized toll payment system using blockchain technology. The system enhances traditional toll collection processes by providing transparency, security, and efficiency through the use of blockchain and QR codes.

## Features

- **Blockchain Integration**: Utilizes a distributed ledger for transparent and tamper-proof toll transactions.
- **Smart Contracts**: Implements smart contracts for automatic toll deduction and validation.
- **QR Code Payments**: Users can make toll payments by scanning QR codes at toll booths.
- **Decentralization**: Reduces the need for centralized toll collection infrastructure, minimizing points of failure.
- **Secure and Private**: Ensures secure and private transactions using blockchain cryptography.

## How it Works

1. **User Registration**: Users register on the blockchain network to create a digital wallet.
2. **Wallet Funding**: Users fund their digital wallets with cryptocurrency.
3. **QR Code Generation**: Toll booths generate unique QR codes for each transaction.
4. **Payment Process**: Users scan the QR code using a mobile app, triggering an automatic payment through a smart contract.
5. **Blockchain Confirmation**: The transaction is recorded on the blockchain for transparency and accountability.
6. **Toll Gate Activation**: Upon successful payment, the toll gate opens automatically.

## Getting Started

### Prerequisites

- Next.js
- Remix IDE
- Ethereum wallet (Metamask)
- Ethereum-compatible blockchain network (Sepolia Testnet)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/blockchain-toll-payment.git
    ```

2. Install dependencies:

    ```bash
    cd blockchain-toll-payment
    npm install
    ```

3. Deploy smart contracts:

    ```bash
    truffle migrate
    ```

  *(you can also deploy smart contracts manually using remix ide)*


4. Run the application:

    ```bash
    npm start
    npm run dev
    ```
