# Decentralized KickStarter

A funding website for startups, like [kickstarter](https://www.kickstarter.com/), but built decentralized with ethereum based on a contribute-approve model, where contributors of a campaign must approve transaction requests of campaign managers, to reduce scams.

This is currently deployed on ethereum's Rinkeby Test Network.

[Visit Site](https://decentralized-kickstarter.vercel.app/)

## Outline

- Campaign managers create campaigns to raise money for their ideas.
- Contributors contribute ether for the campaign.
- Campaign managers raise transaction request when they need to use the raised money.
- Contributors approve the request.
- Campaign manager finalizes the request after more than 50% of the contributors approve the request.
- The transaction requests processes successfully

## Built Using

- React
- Next.js
- Typescript
- Solidity
- Web3
- Truffle
- Ganache
- Mocha
- Semantic UI

## Steps to run locally

- Run `yarn` or `npm i` in `client` and `contract`
- Create a file called `secrets.ts` in root of `contract`, and fill it with -

```
export default {
  mnemonic:
    "YOUR-MNEMONIC",
  infuraEndpoint:
    "YOUR-INFURA-ENDPOINT",
  deployedAddress: "YOUR-DEPLOYED-CONTRACT-ADDRESS"
};
```

- Create a file called `.env` in root of `client` and fill it with -

```
REACT_APP_INFURA=YOUR-INFURA-ENDPOINT
REACT_APP_DEPLOYED_ADDRESS=YOUR-DEPLOYED-CONTRACT-ADDRESS
```

- Navigate to `contract` and run `yarn compile`, then run `yarn deploy`.
- Copy the address, from output and place it as `deployedAddress` in `contract/secrets.ts` and in `REACT_APP_DEPLOYED_ADDRESS` of `client/.env`.
- Navigate to client and run `yarn dev`.
- Go to `localhost:3000`

## License

[MIT](LICENSE) © [Pradeep-selva](https://github.com/Pradeep-selva)
