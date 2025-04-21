# Limule API

Une API Express sécurisée permettant de distribuer des outils stockés dans un dépôt GitHub.

## Routes disponibles

- GET `/tools?key=Raphael25` : Tools List
- GET `/tools/:filename?key=Raphael25` : Takes a specific tool

## Authentification

API Key : `Raphael25` (change in `.env` if needed)