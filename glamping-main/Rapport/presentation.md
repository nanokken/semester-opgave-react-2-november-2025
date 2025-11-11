# Hvad går vi igennem i det mundtlige

En lille gennemgang af hvad jeg vil kigge på i fremlæggelsen :D

## 1. Kig på site igennem de forskellige sider

- Forside med hero sektion og reviews
- Aktiviteter side med favoritter
- Ophold side med booking funktionalitet
- Login system med admin adgang
- Backoffice med CRUD funktionalitet

## 2. Gennemgang af koden

#### **Home Component**

_Fil: `sites/www/src/pages/Home/Home.jsx`_

- **Hero Sektion** (linje ~85-150): Responsive design med Material-UI
- **Reviews Sektion** (linje ~200-280): Dynamic content fra MongoDB
- **Ophold Sektion** (linje ~300-400): Centreret layout med Avatar og CTA

#### **Login System**

_Fil: `sites/www/src/pages/Login/Login.jsx`_

- **Authentication Logic** (linje ~50-100): JWT token handling
- **Form Validation** (linje ~30-50): Input validation og error handling
- **Role-based Access** (linje ~100-120): Admin vs user permissions

#### **PageTransition Component**

_Fil: `sites/www/src/components/PageTransition/PageTransition.jsx`_

- **Framer Motion Integration** (linje ~10-30): Smooth page transitions
- **Animation Variants** (linje ~5-15): Entry/exit animations


## 3. Spørgsmål fra lærer/eksaminere eller elever (Hvis der er tid)

### `Er der nogle spørgsmål til siden?`