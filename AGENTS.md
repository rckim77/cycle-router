# Agent instructions — public repository

This project is published as a **public GitHub repository**. All code, configuration, and documentation in this repo must remain safe to expose to the internet.

## Required for every change

- **No secrets**: Do not add API keys, tokens, passwords, private keys, `.env` files with real values, or credentials of any kind. Use only public, unauthenticated client-side APIs already used by the app, or document optional env vars in `.env.example` with placeholder values only.
- **No private personal data**: Do not commit home or work street addresses, phone numbers, email addresses, real names tied to individuals, or other PII. Use public landmarks, generic examples, or user-editable defaults (e.g. a well-known park) instead of a specific residence.
- **No private infrastructure**: Do not commit internal hostnames, VPN endpoints, database connection strings, or non-public URLs meant for private networks.
- **Review before commit**: If a change could identify a person or grant access to a paid/private service, it does not belong in this repo.

## Client-side app constraints

- Routing, geocoding, and map tiles must continue to work from the browser using **public** endpoints only (no server-side proxy that would require a hidden key in the repo).
- Saved routes and preferences stay in the user’s browser (`localStorage`); do not add server storage of user data without an explicit, reviewed privacy model.

## If authentication or paid APIs are needed later

- Keep secrets out of the repository entirely (e.g. GitHub Actions secrets, a separate private backend, or user-supplied keys in local-only config that is gitignored).
- Add `.env.example` with dummy values; never commit `.env`.

## Summary

**Treat every file in this repo as world-readable.** Future changes must stay safe to publish on a public GitHub repo.
