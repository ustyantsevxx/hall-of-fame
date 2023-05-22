# I18n

Locale files directory — `./locales`

## Tips

Must-have VSCode extension - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)

Just install it and generate keys with default configuration (kebab-case).

Example:

```json
{
  // ...
  "open-log": "Open log",
  "save-csv": "Save CSV",
  "logs-not-found": "Logs not found",
  "battery-name": "Battery name",
  "serial-number": "Serial Number"
  // ...
}
```

**Always** generate new keys, even if suitable ones already exist. This way you will be able to avoid unnecessary changes in other places.

Example:

```json
{
  // ...
  "open-log": "Open log",
  "open-log-0": "Open log",
  "open-log-1": "Open log",
  "open-log-branch-1": "Open log",
  "open-log-branch-2": "Open log"
  // ...
}
```

## Problems

```json
{
  // ...
  "open-log": "Open log",
  "open-log-0": "Open log",
  "open-log-branch-1": "Open log",
  "open-log-branch-2": "Open log"
  // ...
}
```

Keys `open-log-branch-1` and `open-log-branch-2` are created manually to avoid merge-conflicts.

Solves this problem: One branch generates `open-log-1` (as `open-log-0` already exists)
and other one does too.
