<h1 align="center">Decentralized KickStarter</h1>
<div align="center">
  <p>A funding website for startups, like <a href="https://www.kickstarter.com/">kickstarter</a>, but built decentralized with ethereum based on a contribute-approve model, where contributors of a campaign must approve transaction requests of campaign managers, to reduce scams.</p>
  <p>This is currently deployed on ethereum's Rinkeby Test Network.</p>
  <p><a href="https://decentralized-kickstarter.vercel.app/">Visit Site</a></p>
</div>

![screenshot](https://i.ibb.co/R9wKXNf/image.png)

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
};
```

- Navigate to `contract` and run `yarn compile & yarn deploy`.
- Copy the address, from output and place it in `FACTORY_ADDRESS` of `client/instances/factory.ts`.
- Navigate to client and run `yarn dev`.
- Go to `localhost:3000`

## License

[MIT](LICENSE) © [Pradeep-selva](https://github.com/Pradeep-selva)
