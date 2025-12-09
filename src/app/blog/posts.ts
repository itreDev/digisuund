export interface BlogPost {
  title: string;
  description: string;
  date: Date;
  type: string;
  image: string;
  slug: string;
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[ä]/g, "a")
    .replace(/[ö]/g, "o")
    .replace(/[õ]/g, "o")
    .replace(/[ü]/g, "u")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const posts: BlogPost[] = [
  {
    title:
      "Kuidas alustada digiturundusega: praktiline teekond väikesele ettevõttele",
    slug: "kuidas-alustada-digiturundusega-praktiline-teekond-vaikesele-ettevottele",
    description: `Digiturundusega alustamine võib tunduda esmapilgul segane – kanaleid on palju, nõuandeid veel rohkem ning igaüks lubab kiireid tulemusi. Tegelikkuses algab kõik üsna lihtsast: selge siht, korralik vundament ja järjepidevad sammud. Väikeettevõtte jaoks on digiturundus võimalus kasvatada oma nähtavust täpselt seal, kus inimesed päriselt tegutsevad, ning teha seda paindlikult ja kontrollitava eelarvega.
      <br />  
      Esimene samm on alati eesmärk. Kui pole täpselt teada, kas soov on suurendada päringuid, müüki või lihtsalt teadlikkust, jääb ka kogu ülejäänud tegevus ähmaseks. Ettevõte, kes võtab endale aega mõelda, mida ta kolme, kuue või kaheteistkümne kuu pärast saavutada tahab, loob kohe alguses endale tohutu eelise. Sama oluline on mõista oma klienti: kellele müüd, millist probleemi lahendad ja kuidas inimene üldse otsusele jõuab. Lihtne ostupersoona joonistab kogu pildi selgeks.
      <br />
      Kui suund on määratud, tuleb luua tugev digitaalne alus. Professionaalne ja mobiilisõbralik veebileht ei ole enam pelgalt visiitkaart — see on ettevõtte kõige olulisem müügitööriist. Seal peab olema lihtne navigeerida, info peab olema arusaadav ning üleskutsed selged. Ka analytics-tööriistad peaksid juba alguses paigas olema, sest ilma andmeteta ei saa ükski turundaja midagi parandada.
      <br />
      Edukas digiturundus ei tähenda, et peaks kohe igasse kanalisse tormama. Väikeettevõtte jaoks on mõistlik alustada nendest kohtadest, mis toovad kõige kiiremini väärtust: sisuturundus ja SEO annavad stabiilset orgaanilist liiklust, sotsiaalmeedia aitab luua usaldust ja kogukonda ning Google’i reklaamid sobivad hästi siis, kui on vaja kohest tulemust. Võti peitub mitte kanalite arvus, vaid selles, kui hästi need valitud eesmärkidega kokku kõlavad.
      <br />
      Kõige olulisem osa digiturundusest on sisu. Inimesed ei otsi võõrsõnu ega keerulisi slaide – nad otsivad lahendusi. Kui ettevõte suudab oma blogis, videotes või postitustes selgitada teemasid lihtsalt ja praktiliselt, hakkab see loomulikult kasvatama nähtavust, usaldust ja lõpuks ka müüki. Hästi kirjutatud juhend või selgitav video teeb tihti rohkem kui kallis reklaam.
      <br />
      Digiturundus on pidev protsess. Miski ei ole lõplikult valmis. Kui kord kuus võtta tunnike ja vaadata üle, mis tõi liiklust, mis kõnetas inimesi ja mis jäi kahvatuks, liigub kogu turundus samm-sammult õiges suunas. Just see järjepidevus toob tulemused, mitte korraga tehtud suured kampaaniad.`,
    date: new Date(2024, 8, 3),
    type: "Strateegia",
    image: "/images/strategy-blog.png",
  },
  {
    title:
      "SEO põhiteadmised 2024. aastal: kuidas Google’i silmis nähtavaks saada",
    description: `SEO-st räägitakse palju, kuid selle mõte on alati sama: aidata ettevõttel jõuda inimesteni, kes otsivad lahendust, mida just sina pakud. Viimastel aastatel on Google muutnud seda, kuidas ta sisu hindab, ning 2024. aastal on fookus nihkunud veelgi enam kasutajakogemuse ja sisukuse poole.
      <br />
      Kõige tugevam positsioon kuulub sisule, mis on kirjutatud päris inimeselt päris inimesele. Google eelistab tekste, mis vastavad konkreetsetele küsimustele ja pakuvad selgeid lahendusi. Lühikesed, märksõnadega üle puistatud artiklid ei tööta enam ammu – otsingumootor tunnetab väga hästi, kas tekstis on tegelikku väärtust või mitte. Hästi kirjutatud juhend, mis selgitab teemat põhjalikult ja loogiliselt, on alati eelistatum kui pealiskaudne sissevaade.
      <br />
      EEAT-mõõdikud (eksperditeadmine, autoriteetsus ja usaldusväärsus) mängivad varasemast suuremat rolli. See tähendab, et ka ettevõtte taust, autorite tutvustused, kogemus ja läbipaistvus mõjutavad seda, kui hästi Google sisu usaldab. Blogipostitus, mille all on autori nimi, lühike tutvustus ja kontaktivõimalus, mõjub märksa usaldusväärsemalt kui anonüümne tekst.
      <br />
      Tehniline pool jääb samuti oluliseks. Google ei taha tõsta esile veebilehti, mis on aeglased, segase struktuuriga või mobiilis halvasti kasutatavad. Liiga sageli jäävad head sisud varju ainult seetõttu, et saidil on katkisi linke, puudub selge URL-ide süsteem või on lehe laadimine lihtsalt liiga aeglane. Tehnilise osa korrastamine ei ole küll efektselt nähtav, kuid tulemused otsingutes räägivad iseenda eest.
      <br />
      Märksõnauuring on endiselt SEO üks tugevamaid tööriistu, kuigi ka siin on toimunud muutused. Üksiku märksõna sihtimise asemel tasub mõelda teemade kaupa. Inimesed otsivad järjest pikemaid, konkreetsemaid päringuid – küsimusi, võrdlusi, probleemi kirjeldusi. Kui tekst vastab otsingukavatsusele täpselt, liigub see otsingutulemustes loomulikult ülespoole.
      Linkide loomine ei ole kuhugi kadunud, kuid selle roll on muutunud. Suur hulk madala kvaliteediga linke ei aita enam edasi; mõjusad on need, mis tulevad päriselt autoriteetsetelt veebilehtedelt või partneritelt, kellega ettevõttel on tegelik seos. Hea sisu toob linke ka ise – inimesed jagavad ja viitavad sellele loomulikult.
      <br />
      Kõige tähtsam on mõista, et SEO ei ole lühisprint. See on järjepidev töö, mis tasub end aja jooksul mitmekordselt ära. Ettevõte, kes loob head sisu, hoiab oma veebilehe tehniliselt korras ja mõtleb lugeja vaatenurgast, liigub igal aastal üha kõrgemale.`,
    date: new Date(2024, 0, 12),
    type: "SEO",
    image: "/images/seo-blog.png",
    slug: "seo-pohiteadmised-2024-kuidas-google-silmis-nahtavaks-saada",
  },
  {
    title:
      "Sotsiaalmeedia sisu loomine: kuidas alustada niinimetatud tühjalt lehelt",
    description: `Sotsiaalmeedia on koht, kus ettevõte saab oma hääle selgelt kuuldavaks teha. Kuid just siin satuvad paljud algajad ummikusse — mida postitada, kuidas postitada ja kuidas leida oma brändile sobivat stiili? Tegelikult on sotsiaalmeedia palju vähem “loovuse loterii” ning palju rohkem läbimõeldud rütm ja järjepidevus.
      <br />
      Kõik algab mõttest, miks üldse sotsiaalmeedias olla. Kui ettevõtte eesmärk on kasvatada usaldust ja näidata oma ekspertsust, kõlab sisu teistsugusena kui juhul, kui soov on lihtsalt uusi jälgijaid koguda. Mõlemad eesmärgid on head, kuid nende teekond on erinev. Kui suund on selge, tekib ka sisu loomisel kindlam käekiri.
      <br />
      Sotsiaalmeedia edu alus ei ole efektne graafika ega keerukas montaaž, vaid sõnum, mis päriselt korda läheb. Inimesed tahavad näha midagi, mis aitab neil probleemi lahendada, annab neile mõtteainet või pakub väärtuslikku teadmise. Seetõttu on kõige tugevamad need postitused, mis selgitavad, õpetavad, avavad telgitaguseid või räägivad päris klientide lugusid. Selline sisu loob sideme, mida ei saa osta ega kiirendada.
      <br />
      Mitmekesisus annab kanalile elu. Lühivideod jõuavad sageli kõige suurema publikuni, kuid karussellid selgitavad keerulisemaid teemasid, pildid annavad brändile iseloomu ja tekstipostitused panevad mõtlema. Kui ettevõte katsetab erinevaid formaate, leiab ta üsna kiiresti oma tugevused.
      <br />
      Järjepidevus on sotsiaalmeedias üks suurimaid väljakutseid, kuid samas ka üks olulisemaid tegureid. Pole vaja postitada iga päev — piisab sellest, kui nädalas on paar sisuühikut, mis on mõtestatud ja kvaliteetsed. Sotsiaalmeedia algoritmid soosivad kontosid, mis tegutsevad stabiilselt ja loovad inimestele väärtust.
      <br />
      Hea sotsiaalmeedia kasvab analüüsist. Kui kord nädalas või kuus vaadata, millised postitused said enim reaktsioone, millised teemad inimesi kõnetasid ja millised mitte, muutub kogu sisu loomine lihtsamaks. Tulemused hakkavad ilmnema siis, kui ettevõte julgeb katsetada, jälgida ja kohandada.
      <br />
      Sotsiaalmeedia on koht, kus bränd saab olla inimlik. Ja just see — inimlikkus — ongi lõpuks sisu kõige tugevam valuuta.
      <br />`,
    date: new Date(2024, 11, 1),
    type: "Sotsiaalmeedia",
    image: "/images/social-media-blog.png",
    slug: "sotsiaalmeedia-sisu-loomine-kuidas-alustada-niinimetatud-tuhjalt-lehelt",
  },
];
