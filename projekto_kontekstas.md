# Augintinio Dienoraštis – projekto kontekstas ChatGPT

Šis dokumentas skirtas pateikti ChatGPT aktualų projekto aprašą ir saugaus pakeitimų darbo gaires. Prieš pakeitimus pirmiausia patikrink dabartinį kodą; šis aprašas gali pasenti.

## Projekto paskirtis

„Augintinio dienoraštis“ – naršyklėje veikianti React/Vite programa, kurioje galima išsaugoti augintinio vardą, pridėti kasdienes priežiūros užduotis, pažymėti jas atliktomis ir matyti dienos progresą. Sąsajos tekstai turi būti lietuviški.

## Technologijos ir komandos

- React ir React DOM 19, JavaScript/JSX, Vite 8.
- Stiliai rašomi įprastu CSS; nenaudoti TypeScript, Tailwind ar CSS Modules, nebent aiškiai paprašyta.
- Vienintelės programos priklausomybės yra `react` ir `react-dom`; testavimo ir kūrimo priemonės nurodytos `package.json`.
- Komandos: `npm run dev`, `npm run build`, `npm run lint`, `npm test`.
- Prieš vykdydamas patikras įvertink užduoties apimtį. Nepaleisk testų ar kitų patikrų, jei naudotojas jų neprašo.

## Dabartinė struktūra

- `src/main.jsx` – programos įėjimo taškas.
- `src/App.jsx` – pagrindinė sąsaja, augintinio vardo ir užduočių būsena, `localStorage` sinchronizavimas.
- `src/NaujaUzduotis.jsx` – naujos užduoties forma ir kategorijos pasirinkimas.
- `src/DienosProgresas.jsx` – užduočių atlikimo procentų rodinys.
- `src/App.css` – kortelių, užduočių sąrašo, progreso ir formų stiliai.
- `src/index.css` – globalūs stiliai ir CSS kintamieji.
- `src/assets/` – naudojami vaizdai.
- `tests/komponentai.test.js` – komponentų testai.

Prieš redaguodamas patikrink tikrą failų sąrašą ir atitinkamų failų turinį. Struktūra gali keistis.

## Esamas funkcionalumas

- Augintinio vardas saugomas `localStorage` raktu `petName`; vardą galima įrašyti, keisti ir išvalyti.
- Užduotys saugomos `localStorage` raktu `petTasks`.
- Pradiniame sąraše yra penkios užduotys: rytinis ir vakarinis maitinimas, vandens patikrinimas bei du pasivaikščiojimai.
- Užduotis turi bent `id`, `title` ir `completed` laukus; nauja užduotis turi ir `category`.
- Naujos užduoties kategorijos: `maitinimas`, `aktyvumas`, `prieziura`, `sveikata`.
- Užduotys atvaizduojamos dviejuose sąrašuose – „Atlikta“ ir „Neatlikta“; žymėjimas atnaujina progreso rodinį.
- `App.jsx` turi kategorijų pavadinimų ir piktogramų atvaizdavimą, taip pat senesnių užduočių kategorijų nustatymą pagal pavadinimą.

## Dizainas ir sąsajos kalba

- Matomi tekstai, klaidos, mygtukai ir prieinamumo aprašai turi būti trumpi ir lietuviški.
- Pagrindinė vizualinė kryptis – tamsios kortelės, užapvalinti kampai ir mėlynas progreso gradientas `linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)`.
- Naudojamos bendros klasės `.tasks-card` ir `.tasks-title`; kortelių stiliai `App.css` faile apibrėžti keliose vietose, todėl prieš keičiant patikrink galiojančias taisykles ir kaskadą.
- `index.css` globali spalvų tema skiriasi pagal `prefers-color-scheme`, o akcento kintamieji nėra tokie patys kaip kortelių/progreso stiliai. Nelaikyk visos programos tamsia tema vien pagal dokumentaciją – tikrink veikiančius CSS.
- Išlaikyk responsive elgseną ir esamą dviejų užduočių stulpelių išdėstymą, nebent užduotis prašo kitaip.

## Pakeitimų taisyklės

1. Pirmiausia perskaityk `AGENTS.md`, šį failą ir keičiamus šaltinius. Dabartinis kodas turi pirmenybę prieš pasenusius aprašus.
2. Keisk tik užduočiai reikalingus failus; neišgalvok API, būsenų ar komponentų.
3. Išlaikyk funkcinius React komponentus ir esamą `localStorage` elgseną. Jei keičiama `petName` ar `tasks` būsena, užtikrink, kad pakeitimas būtų išsaugotas pagal esamą architektūrą.
4. Nenaudok naujų bibliotekų be aiškaus poreikio ir naudotojo prašymo.
5. Patikras vykdyk tik tada, kai naudotojas paprašo patikrinti/testuoti arba jos būtinos aiškiai nurodytam rezultatui patvirtinti.
6. Atsakyme lietuviškai trumpai nurodyk, kas pakeista, pateik tikslius failų kelius ir kaip naudotojas gali patikrinti rezultatą. Pilną failo turinį pateik, jei naudotojas to prašo arba jei tai praktiškai reikalinga pakeitimui perkelti.

## Nurodymai ChatGPT darbui

Kai pateikiu pakeitimo užduotį:

- Pirmiausia išsiaiškink dabartinę kodo būklę ir laikykis `AGENTS.md`.
- Jei užduoties detalės neblokuoja darbo, priimk nedidelį pagrįstą sprendimą ir tęsk; klausk tik dėl informacijos, be kurios negalima teisingai įgyvendinti.
- Užbaik pakeitimą projekto failuose, o ne vien pateik pavyzdinį kodą, kai turi prieigą prie darbo aplinkos.
- Paaiškink rezultatą lietuviškai, glaustai ir nurodyk, ar failas sukurtas, ar pakeistas.
