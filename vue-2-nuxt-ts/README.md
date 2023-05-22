# Developer guide

## Scripts

### Main:

- `yarn setup` - use just after git clone
- `yarn dev` - use in **local development**
- `yarn stage` - used to run on **staging server** (_production mode with Vue DevTools enabled_)
- `yarn prod` - used in **production**

### Additional:

- `yarn serve` - used to locally run production mode _with DevTools_ and _without reinstalling node_modules_
- `yarn lint` - used to show ESLint issues
- `yarn lint:fix` - used to autofix some ESLint issues
- `yarn gen` - used to code-gen logic modules

## Modules

### Code generation

Run `yarn gen` to create a new business logic module.

It will create

- `TechnicalSupportService.ts` — used to store business logic
- `TechnicalSupportApi.ts` — used to call api endpoints (injected in service)
- `technical-support.stations.chat.uploader.transactions.technical-support-topics.users.bonus-cards.articles.types.ts` — used to store module specific types and interfaces
- `technical-support.chat.uploader.transactions.technical-support-topics.bonus-cards.constants.ts` — used to store module specific enums and constants
- `index.ts` — used to export all parts of a module

in `~/logic/modules/{MODULE_NAME_KEBAB}`.

### Usage

Import module like this:

```ts
import { TechnicalSupportModule } from '~/logic/modules/technical-support'
```

Do not import service or api by itself. Try to **only** use module from `index.ts`.

All imports come from a single file (`index.ts`):

```ts
import {
  TechnicalSupportModule,
  SOME_SUPPORT_CONSTANT,
  ISupportType
  // other types and constants
} from '~/logic/modules/technical-support'
```
