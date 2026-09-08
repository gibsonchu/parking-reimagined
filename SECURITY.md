# Security Policy

Parking, Reimagined is a **static, client-side web app**. It has no backend, no
user accounts, and no database. It does not collect, transmit, or store personal
data: designs live in your own browser (`localStorage`), and a shared link
carries the design in the URL itself. There is no server to breach and no
credentials to leak.

Because of that, the realistic security surface is small — mainly things like a
cross-site-scripting bug in how content renders, or a vulnerability in a
third-party dependency.

## Reporting a vulnerability

If you find a security issue, please report it privately rather than opening a
public issue:

- **Email:** gibsontchu@gmail.com
- Or use GitHub's [private vulnerability reporting](https://github.com/gibsonchu/parking-reimagined/security/advisories/new).

Please include steps to reproduce and, if you can, a proof of concept. We aim to
acknowledge reports within about a week. As a small volunteer project there is
no bug-bounty program, but credit is happily given to reporters who want it.

## Supported versions

Only the current version deployed at
[parking-reimagined.com](https://parking-reimagined.com) (the `main` branch) is
maintained.
