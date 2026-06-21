# Avaloch CMS

The CMS for [Avaloch](https://avalochinn.com/) ([repo](https://github.com/tophtucker/avaloch/)), based on [Sanity](https://www.sanity.io/). To use the CMS, log into https://avaloch.sanity.studio/.

To run dev:

```
npm run dev
```

To deploy:

```
npm run deploy
```

To back up:

```
npx sanity dataset export prod backup-prod-2026-06-21.tar.gz
```

To back up documents without assets:

```
npx sanity dataset export prod backup-prod-2026-06-21.tar.gz --no-assets
```

To import new data:

```
npx sanity dataset import sanity_import_2025-08-01.ndjson prod
```

To import and replace:

```
npx sanity dataset import backup-prod-2026-06-21.tar.gz prod --replace
```

To populate places’ coordinates, addresses, and websites from Google Maps links, see the `enrich-places` script in the [avaloch](https://github.com/tophtucker/avaloch) repo.
