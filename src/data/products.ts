export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subCategory?: string;
  stockStatus: 'instock' | 'onbackorder' | 'outofstock';
  isNew?: boolean;
  isAmmo?: boolean;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  specNotice?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'oruzje',
    name: 'ORUŽJE',
    slug: 'oruzje',
    subCategories: ['Dugo oružje', 'Kratko oružje', 'Plinsko oružje', 'Zračno oružje', 'Čišćenje i održavanje']
  },
  {
    id: 'streljivo',
    name: 'STRELJIVO',
    slug: 'streljivo',
    subCategories: ['Sačmeno', 'Malokalibarsko', 'Karabinsko', 'Diabole', 'Reloading', 'Pištoljsko']
  },
  {
    id: 'odjeca',
    name: 'ODJEĆA',
    slug: 'odjeca',
    subCategories: ['Jakne', 'Hlače', 'Kape', 'Kratke majice']
  },
  {
    id: 'obuca',
    name: 'OBUĆA',
    slug: 'obuca',
    subCategories: ['Čizme']
  },
  {
    id: 'oprema',
    name: 'OPREMA',
    slug: 'oprema',
    subCategories: ['Oprema za lov', 'Optike', 'Svjetiljke', 'Noževi', 'Ruksaci i torbe']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '8967',
    name: 'Real Avid Bore Boss',
    sku: '99024-1',
    price: 19.00,
    images: ['/images/bore-boss.png'],
    category: 'oruzje',
    subCategory: 'Čišćenje i održavanje',
    stockStatus: 'instock',
    isNew: true,
    brand: 'Real Avid',
    description: 'Najjednostavniji i najbrži sustav za čišćenje cijevi oružja na svijetu. Integrirana četka i krpa u jednom komadu koji se pohranjuje u vlastito čvrsto kućište koje služi i kao ručka za povlačenje kabela.',
    specifications: {
      'Proizvođač': 'Real Avid',
      'Namjena': 'Čišćenje cijevi',
      'Kućište': 'Fleksibilni polimer',
      'Kompatibilnost': 'Više kalibara dostupno'
    }
  },
  {
    id: '10383',
    name: 'Karabin Browning A-Bolt Compo Green 308Win',
    sku: 'BROW3551555',
    price: 898.00,
    images: ['/images/a-bolt-compo-od-green-1.webp'],
    category: 'oruzje',
    subCategory: 'Dugo oružje',
    stockStatus: 'instock',
    isNew: true,
    brand: 'Browning',
    description: 'Browning A-Bolt 3 Composite nudi legendarnu Browning točnost i pouzdanost po cijeni koja je iznimno pristupačna. Ergonomski zeleni kompozitni kundak osigurava izvrsno rukovanje u svim vremenskim uvjetima.',
    specifications: {
      'Kalibar': '.308 Win',
      'Kapacitet spremnika': '4+1',
      'Dužina cijevi': '560 mm',
      'Ukupna dužina': '1060 mm',
      'Težina': '3.0 kg',
      'Kundak': 'Kompozitni (Zeleni)',
      'Kočnica': 'Ručna na vratu kundaka'
    }
  },
  {
    id: '9365',
    name: 'Valiant Kronos II 1-6x24',
    sku: 'VL3001',
    price: 443.00,
    images: [
      '/images/a1f5dc74-24f8-42fd-9708-8e15c741d00e.png',
      '/images/de7408f3-0785-43b0-b667-7e8c20c92455.png'
    ],
    category: 'oprema',
    subCategory: 'Optike',
    stockStatus: 'instock',
    isNew: true,
    brand: 'Valiant',
    description: 'Vrhunski lovački optički nišan sa širokim vidnim poljem idealan za pogonski lov. Poboljšana čistoća leća i osvijetljena crvena točka u središtu končanice omogućuju brzo ciljanje na kratkim i srednjim udaljenostima.',
    specifications: {
      'Povećanje': '1-6x',
      'Promjer objektiva': '24 mm',
      'Promjer tubusa': '30 mm',
      'Končanica': 'Osvijetljena crvena točka',
      'Vodootpornost': 'Da (punjeno dušikom)',
      'Otpornost na trzaj': 'Svi kalibri'
    }
  },
  {
    id: '9604',
    name: 'Springfield Armory 2020 .22 LR',
    sku: '87472',
    price: 597.00,
    images: ['/images/tgfd.png', '/images/1-2.png'],
    category: 'oruzje',
    subCategory: 'Dugo oružje',
    stockStatus: 'instock',
    isNew: true,
    brand: 'Springfield Armory',
    description: 'Springfield Armory Model 2020 Rimfire u kalibru .22 LR pruža vrhunske performanse i točnost u malom kalibru. Pogodan kako za natjecateljsko streljaštvo tako i za rekreaciju.',
    specifications: {
      'Kalibar': '.22 LR',
      'Kapacitet spremnika': '10 (Rotacijski)',
      'Dužina cijevi': '510 mm',
      'Težina': '2.9 kg',
      'Navoj na cijevi': '1/2x28',
      'Sustav': 'Obrtnočepni (Bolt Action)'
    }
  },
  {
    id: '9152',
    name: 'HS Produkt Echelon SS 4.0 Compact 9x19mm',
    sku: '100444',
    price: 701.20,
    originalPrice: 738.10,
    images: ['/images/DF76FBB4-B185-4237-B3DA-56115C399768.png'],
    category: 'oruzje',
    subCategory: 'Kratko oružje',
    stockStatus: 'instock',
    isNew: true,
    brand: 'HS Produkt',
    description: 'Echelon iz HS Produkta postavlja nove standarde za pištolje s udarnom iglom. Sadrži inovativni COG (Central Operating Group) sustav okidača i izuzetnu ergonomiju prilagođenu svakom strijelcu.',
    specifications: {
      'Kalibar': '9x19 mm',
      'Kapacitet spremnika': '15/17 metaka',
      'Dužina cijevi': '102 mm',
      'Ukupna dužina': '185 mm',
      'Težina (prazan)': '650 g',
      'Rukohvat': 'Polimer s adaptivnom teksture'
    },
    specNotice: 'Napomena: Akcijska cijena se odnosi na gotovinsko plaćanje.'
  },
  {
    id: '9501',
    name: 'Mauser 25 PURE 6.5 Creedmoor',
    sku: '50M80119280-P',
    price: 1709.05,
    originalPrice: 1799.00,
    images: ['/images/4-11.png', '/images/1-17.png'],
    category: 'oruzje',
    subCategory: 'Dugo oružje',
    stockStatus: 'onbackorder',
    isNew: true,
    brand: 'Mauser',
    description: 'Ekskluzivna serija Mauser karabina koja kombinira tradicionalni lovački šarm s modernom balističkom izvrsnošću kalibra 6.5 Creedmoor. Kundak od biranog drveta oraha s vrhunskom završnom obradom.',
    specifications: {
      'Kalibar': '6.5 Creedmoor',
      'Kapacitet spremnika': '5+1',
      'Dužina cijevi': '560 mm',
      'Težina': '3.1 kg',
      'Drvo kundaka': 'Orah klasa 2',
      'Zatvarač': 'Glatko hodajući Mauser sistem'
    },
    specNotice: 'Napomena: Akcijska cijena se odnosi na gotovinsko plaćanje.'
  },
  {
    id: '9482',
    name: 'Heckler & Koch MR308 A3-28 20"',
    sku: '0264',
    price: 4230.00,
    originalPrice: 4700.00,
    images: ['/images/1-13.png', '/images/2-13.png'],
    category: 'oruzje',
    subCategory: 'Dugo oružje',
    stockStatus: 'instock',
    isNew: true,
    brand: 'Heckler & Koch',
    description: 'Poluautomatski karabin vrhunske vojne klase u civilnoj verziji MR308. Izuzetna preciznost na velikim udaljenostima s cijevi dužine 20 inča slobodno plivajuće konfiguracije.',
    specifications: {
      'Kalibar': '.308 Win (7.62x51mm)',
      'Kapacitet spremnika': '10/20 metaka',
      'Dužina cijevi': '508 mm (20")',
      'Radni sustav': 'Kratki klip barutnih plinova',
      'Težina': '4.95 kg',
      'Boja': 'Crna / RAL8000'
    },
    specNotice: 'Napomena: Akcijska cijena se odnosi na gotovinsko plaćanje.'
  },
  {
    id: '9134',
    name: 'ČZ P-10C OR PORTED, 15rnd, 9mm Luger',
    sku: 'CZ-P10C-ORP',
    price: 719.10,
    originalPrice: 799.00,
    images: ['/images/cz_p-10_c_or_right_opt-2-1.png'],
    category: 'oruzje',
    subCategory: 'Kratko oružje',
    stockStatus: 'instock',
    isNew: true,
    brand: 'CZ',
    description: 'Specijalna OR (Optics Ready) verzija popularnog kompaktnog pištolja CZ P-10C koja ima portiranu (kompenziranu) cijev i navlaku za smanjenje odskoka pri pucanju. Omogućuje montažu crvenih točaka.',
    specifications: {
      'Kalibar': '9mm Luger',
      'Kapacitet spremnika': '15',
      'Okvir': 'Polimer ojačan staklenim vlaknima',
      'Težina': '740 g',
      'Cijev': 'Hladno kovana s kompenzacijskim otvorima',
      'Sustav': 'Optics Ready'
    },
    specNotice: 'Napomena: Akcijska cijena se odnosi na gotovinsko plaćanje.'
  },
  {
    id: '9786',
    name: 'Sellier&Bellot 7,62x25 TOKAREV FMJ',
    sku: '11V310112',
    price: 0.60,
    images: ['/images/sb_762x25_fmj_tokarev_55g_85gr.jpeg'],
    category: 'streljivo',
    subCategory: 'Pištoljsko',
    stockStatus: 'instock',
    isAmmo: true,
    isNew: true,
    brand: 'Sellier & Bellot',
    description: 'Kvalitetno pištoljsko streljivo kalibra 7,62x25 s FMJ (Full Metal Jacket) zrnom težine 5.5 grama (85 graina). Izvrsna probojnost i stabilnost leta.',
    specifications: {
      'Kalibar': '7.62x25 Tokarev',
      'Tip zrna': 'FMJ',
      'Težina zrna': '5.5 g / 85 gr',
      'Početna brzina': '502 m/s',
      'Pakiranje': '50 komada u kutiji'
    }
  },
  {
    id: '8256',
    name: 'GECO EXPR. 243 Win 4,9g',
    sku: '172317834',
    price: 2.69,
    images: ['/images/geco.png'],
    category: 'streljivo',
    subCategory: 'Karabinsko',
    stockStatus: 'instock',
    isAmmo: true,
    brand: 'GECO',
    description: 'GECO Express streljivo dizajnirano za brzu ekspanziju i iznimnu preciznost na većim udaljenostima. Idealno za lov na srneću i lakšu divljač.',
    specifications: {
      'Kalibar': '.243 Win',
      'Tip zrna': 'GECO Express (Ekspanzivno)',
      'Težina zrna': '4.9 g / 76 gr',
      'Balistički koeficijent': '0.280',
      'Preporučena udaljenost': 'Do 200m'
    }
  },
  {
    id: '4685',
    name: 'Sačmeno streljivo BORNAGHI 20/70 SEMI MAGNUM 32g, 4',
    sku: 'semi3240922',
    price: 0.83,
    images: ['/images/Slika_zaslona_2023-10-03_u_18.49.40-removebg-preview.png'],
    category: 'streljivo',
    subCategory: 'Sačmeno',
    stockStatus: 'instock',
    isAmmo: true,
    brand: 'Bornaghi',
    description: 'Bornaghi Semi Magnum nudi povećanu težinu sačme od 32g za kalibar 20, pružajući izuzetnu pokrivenost i snagu pri lovačkim aktivnostima na ptice i sitnu divljač.',
    specifications: {
      'Kalibar': '20/70',
      'Težina punjenja': '32 g',
      'Promjer sačme': '3.1 mm (Broj 4)',
      'Brzina': '395 m/s',
      'Pakiranje': '25 komada'
    }
  },
  {
    id: '4149',
    name: 'Karabinsko streljivo RWS 8x68 S Speed Tip Pro 11,7g',
    sku: '172410017',
    price: 6.60,
    images: [
      '/images/Slika_zaslona_2023-08-26_u_20.54.05-removebg-preview.png',
      '/images/asv5938.png'
    ],
    category: 'streljivo',
    subCategory: 'Karabinsko',
    stockStatus: 'instock',
    isAmmo: true,
    brand: 'RWS',
    description: 'Vrhunsko lovačko streljivo visoke probojne moći i dvodijelne konstrukcije zrna (Speed Tip Professional). Osigurava brzu predaju energije i siguran izlazni kanal na teškoj divljači.',
    specifications: {
      'Kalibar': '8x68 S',
      'Tip zrna': 'Speed Tip Pro',
      'Težina zrna': '11.7 g / 180 gr',
      'Preporučeno za': 'Tešku divljač (vepar, jelen)',
      'Pakiranje': '20 komada'
    }
  }
];
