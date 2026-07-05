# POINTER TRGOVINA - React 19 Webshop

Ovaj repozitorij sadrži modernu, performantnu i responzivnu **React 19** Single Page Aplikaciju (SPA) za lovačku trgovinu **POINTER**, migriranu sa statičkih HTML/CSS datoteka.

## Tehnologije
- **React 19**: Korištenje najnovijih značajki kao što su native Document Metadata, Actions, `useActionState` za obrasce te `useTransition` za učitavanje košarice.
- **Vite**: Brz i moderan developer server i builder.
- **TypeScript**: Potpuna tipska sigurnost.
- **Vanilla CSS**: Čist, moderan, responzivan dizajn s CSS varijablama (Forest Olive i Hunter Orange lovačka tema), glassmorphism i micro-animacije.
- **Lucide React**: Premium vektorske ikone.

## Struktura Projekta
- `public/`: Sadrži migrirane slikovne resurse i fontove.
- `src/components/`: Modularne komponente (Header, Footer, ProductCard, QuickViewModal, CookieBanner, PromoPopup, MobileNavbar).
- `src/pages/`: Prikazi stranica (Home, Shop s filtriranjem, ProductDetail, CartPage sa simuliranom naplatom, Account, Contact, AboutUs, NotFound, PrivacyPolicy).
- `src/context/`: Globalno stanje košarice i liste želja (`ShopContext`).
- `src/data/`: Mock baza proizvoda (`products.ts`) sastavljena iz izvornog kataloga.

## Pokretanje Projekta
1. Instalirajte ovisnosti:
   ```bash
   npm install
   ```
2. Pokrenite razvojni server:
   ```bash
   npm run dev
   ```
3. Izgradite produkcijsku verziju:
   ```bash
   npm run build
   ```
