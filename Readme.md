# Time Tracking API
De API als ondersteuning voor de Time Tracking React app.
Deze API maakt gebruik van `Node.js` in combinatie met `Express.js`.
Als database maken we gebruik van een MongoDB in de cloud.

## Project runnen
* `yarn` of `npm install`
* `yarn dev` of `npm run dev` zal het project runnen via `nodemon` en zo "watchen'

## Database opzetten
1. Maak een gratis account op https://cloud.mongodb.com/
2. Maak een eerste cluster
3. Creëer een user via `Database Access` → `Add new database user`
    > Let op: bewaar het wachtwoord ergens, je zal het na het aanmaken niet meer kunnen bekijken
4. Ga terug naar je cluster via `Clusters`
    * Klik op de cluster op `connect`.
    * Kies voor `connect your application`
    * Stel de Driver op `Node.js` in
    * Kopieer het stukje beginnend met `mongodb+srv` en vervang de 3 waarden (user, wachtwoord en database)
5. Maak een `.env` bestand en vul `MONGODB_CONNECTION=` in met het gekopieerde stukje

## REST API
### Clients
`/clients`
