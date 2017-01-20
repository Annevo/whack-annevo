### Annevo code test
Vill du jobba med oss?

Koda något av:
- Backend-server
- Frontend-klient
- Bot-svärm

Vi gillar kod som är (bonus för *):
- Simpel
- Lättläst
- Testbar
- Skalbar
- *Funktionell
- *Reaktiv

#### Backend-server
- Varannan sekund slumpas 0, 1, 2 eller 3 `targets` med slumpmässig position på ett 5x5 rutnät
- Servern skickar all relevant data till alla anslutna klienter
- Servern lyssnar efter klienter som slår `targets`
- När träff registrerats ökar `whacks` med 1 på målet

#### Frontend-klient
- Klienten ansluter genom socket.io till servern
- Uppdateringar från spelvärlden kommer på `socket.on('state', fn)`
- 5x5 rutnät där `targets` ritas ut
- Klienten skickar `actions` med `socket.emit('action', {type, payload})`
- Ta bort target vid träff
- `whacklist` har inte sorterats på servern så det måste göras på klienten

##### Actions
```js
{
  type: 'WHACK',
  payload: {
    id, // target id
    pos, // position on 5x5 grid (0-24)
  }
}
```

#### Bot-swärm
- Koda en botsvärm som kan startas i terminalen med `bot connect <number bots>`
- Svärmen ansluter till servern med 1-5 bottar
- Varje bot kan ha sitt egna beteende med parametrarna:
  - `reaction` (hur lång tid innan slag)
  - `accuracy` (hur ofta den ska slå)
- Logga händelser
- Insamling och analys av data
