HP GAS हिसाब मैनेजर 2.0 — केवल Chrome Web App

इस पैकेज में:
- index.html, manifest.webmanifest, sw.js और ऐप आइकन: Chrome में इंस्टॉल होने वाला PWA
- Code.gs: Google Sheets पर फोन से बैकअप भेजने के लिए Apps Script
- HP_Gas_Google_Sheet_Stock_Bakaya.xlsx: स्टॉक/बकाया की नमूना शीट

मुख्य सुविधाएँ:
- पहली बार 4 अंकों का PIN बनाना
- 14 KG, 19 KG, 10 KG और 5 KG सिलेंडर
- दैनिक भरा/खाली स्टॉक और opening/closing
- मार्केट/पार्टी का खाली सिलेंडर तथा रुपये का बकाया
- डिलीवरी स्टाफ का सिलेंडर बकाया और कैश जमा
- जमा/खर्च कैशबुक
- डैशबोर्ड, JSON बैकअप/रीस्टोर और CSV रिपोर्ट
- Google Sheets पर फोन से बैकअप भेजना

Chrome में इंस्टॉल करने के चरण:
1. ZIP को Extract करें।
2. index.html सहित सभी पाँच PWA फाइलें किसी HTTPS static hosting पर अपलोड करें।
   उदाहरण: GitHub Pages में repository के docs फ़ोल्डर में ये फाइलें रखें और Pages को
   Settings > Pages में main branch /docs पर चालू करें।
3. HTTPS लिंक Android फोन के Chrome में खोलें।
4. Chrome के ⋮ मेन्यू में Install app या Add to Home screen चुनें।

Google Sheets बैकअप सेटअप:
1. Google Drive में नई Google Sheet बनाएँ।
2. Extensions > Apps Script खोलें और इस पैकेज की Code.gs फाइल का पूरा कोड पेस्ट करें।
3. Code.gs में YAHAN_APNA_PRIVATE_TOKEN_LIKHEN की जगह अपना निजी, लंबा token लिखें।
   यही token ऐप के Settings में भी डालना होगा। इसे किसी से साझा न करें।
4. Deploy > New deployment > Web app चुनें; Execute as: Me रखें।
   Access सेटिंग को अपने डेटा की गोपनीयता के अनुसार चुनें और Deploy/Authorize करें।
5. मिले हुए /exec URL और वही निजी token ऐप के Settings में डालकर सेव करें।
6. अभी सिंक करें दबाएँ और Google Sheet में Stock, Market, Staff, Cashbook और Backup Info टैब जाँचें।

महत्वपूर्ण:
- यह स्वतंत्र हिसाब-किताब टूल है; HPCL/HP Gas का आधिकारिक ऐप नहीं है।
- PWA को इंस्टॉल करने के लिए HTTPS hosting आवश्यक है; ZIP अपने-आप सार्वजनिक वेबसाइट नहीं बनाता।
- डेटा पहले इसी फोन के ब्राउज़र में सेव होता है। ब्राउज़र डेटा मिटाने/फोन बदलने से पहले JSON बैकअप लें।
- Google Sheets सिंक एकतरफा बैकअप है (फोन → Sheet); Sheet से ऐप में automatic restore शामिल नहीं है।
- पहली बार वास्तविक काम से पहले छोटे नमूने के डेटा से गणना जाँचें।
