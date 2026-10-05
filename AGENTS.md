# Augintinio Dienoraštis – AI Agento Instrukcijos

Šios instrukcijos taikomos dirbtinio intelekto agentams, dirbantiems prie projekto **Augintinio Dienoraštis**.

## Projekto Kontekstas
Prieš atlikdami bet kokius pakeitimus, būtinai perskaitykite `projekto_kontekstas.md`.
Visada teikite pirmenybę esamam ir naujausiam projekto kodui, o ne pasenusiai dokumentacijai.

## Technologijos ir Architektūra
- **Karkasas:** React + Vite (SPA).
- **Kalba:** JavaScript ir JSX (Nekonvertuoti į TypeScript).
- **Stiliai:** Paprastas CSS (App.css, index.css, komponentų .css failai). Nenaudoti Tailwind CSS ar CSS Modules, nebent atskirai paprašyta.
- **Saugojimas:** Duomenys saugomi naršyklės `localStorage` (raktai: `'petName'`, `'petTasks'`).
- **Komponentai:** Visi React komponentai laikomi `src/` kataloge ir rašomi lietuviškais pavadinimais (pvz., `DienosProgresas.jsx`, `NaujaUzduotis.jsx`).

## Kodo Pakeitimų Taisyklės
- Prieš redaguodami failą, visada peržiūrėkite esamą jo turinį.
- Neišgalvokite neegzistuojančios logikos, funkcijų ar API.
- Išsaugokite esamą funkcionalumą, nebent buvo aiškiai paprašyta jį pakeisti.
- Bet koks `tasks` ar `petName` būsenos pakeitimas privalo iškart sinchronizuotis su `localStorage`.
- Venkite nereikalingų bibliotekų ar kodo refaktoravimo, kuris nesusijęs su užduotimi.
- Naudokite funkcinius React komponentus ir `hooks` (`useState`, `useEffect`).

## Dizainas ir UI
Išlaikykite nustatytą **Augintinio Dienoraštis** tamsios temos stilių:
- **Tema:** Tamsi (`Dark Mode`).
- **Akcentas:** Mėlynas gradientas (`linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)`) progreso juostai ir aktyviems mygtukams.
- **Kortelės:** Naudokite `.tasks-card` ir `.tasks-title` klases iš `App.css` (tamsiai pilkas fonas, užapvalinti kampai `16px`, lengvas kraštelis ir subtilus šešėlis).
- **Išdėstymas:** Dviejų stulpelių užduočių sąrašas („Atlikta“ / „Neatlikta“), reaktyvus (responsive) dizainas.

## Sąsajos Kalba
- Visi vartotojui matomi tekstai, mygtukai ir pranešimai turi būti **lietuvių kalba**.
- Tekstai turi būti trumpi, aiškūs ir atitikti projekto terminologiją.

## Patikra Prieš Baigiant Darbą
Patikrinkite, ar:
1. Kodas atitinka projekto failų struktūrą.
2. Esamos funkcijos (vardo keitimas, užduočių žymėjimas, progresas) veikia be klaidų.
3. Neįkeltos nereikalingos išorinės bibliotekos.
4. Nauji komponentai naudoja teisingas CSS klases ir išlaiko dizaino vientisumą.
5. Visi importai ir failų keliai yra teisingi.

## Pakeitimų Pristatymas
- Trumpai paaiškinkite, kas buvo pakeista ar pridėta.
- Nurodykite kiekvieno keičiamo ar kuriamo failo tikslų kelią (pvz., `src/components/NaujasKomponentas.jsx`).
- Pateikite pilną atnaujintą kodo failą, kad jį būtų galima lengvai nukopijuoti.
- Aiškiai nurodykite, ar failą reikia sukurti iš naujo, ar pakeisti esamą.
- Pateikite trumpą instrukciją, kaip patikrinti atliktus pakeitimus.