# Konfiguracja EmailJS dla formularza kontaktowego

## Kroki konfiguracji:

### 1. Załóż konto EmailJS
- Przejdź na https://www.emailjs.com/
- Zarejestruj się lub zaloguj

### 2. Skonfiguruj usługę email
- W panelu EmailJS przejdź do "Email Services"
- Kliknij "Add New Service"
- Wybierz Gmail i połącz swoje konto Gmail (pawel.chrzan93@gmail.com)
- Zapisz Service ID (np. "service_l72b2pn")

### 3. Utwórz szablon email
- Przejdź do "Email Templates"
- Kliknij "Create New Template"
- **WAŻNE: W sekcji Settings ustaw:**
  - **To Email:** pawel.chrzan93@gmail.com (adres odbiorcy)
  - **From Name:** {{from_name}} (nazwa nadawcy)
  - **Reply-To:** {{from_email}} (adres do odpowiedzi)

**Temat:** Nowa wiadomość z portfolio - {{subject}}

**Treść:**
```
Nowa wiadomość z formularza kontaktowego:

Od: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}
Temat: {{subject}}

Wiadomość:
{{message}}

---
Wiadomość wysłana z portfolio Kranik
```

- Zapisz Template ID (np. "template_y90r1qr")

### 4. Pobierz klucze
- Przejdź do "Account" → "General"
- Skopiuj Public Key

### 5. Zaktualizuj kod
W pliku `script.js` zastąp:
- `YOUR_PUBLIC_KEY` → Twój Public Key
- `YOUR_SERVICE_ID` → Twój Service ID (np. "service_l72b2pn")
- `YOUR_TEMPLATE_ID` → Twój Template ID (np. "template_contact")

### 6. Testowanie
- Otwórz stronę w przeglądarce
- Wypełnij formularz kontaktowy
- Sprawdź czy email dotarł na pawel.chrzan93@gmail.com

## Przykład konfiguracji:
```javascript
// W script.js:
emailjs.init({
    publicKey: 'abcd1234567890', // Twój Public Key
});

// W funkcji wysyłania:
emailjs.send('service_l72b2pn', 'template_y90r1qr', templateParams)
```

## Uwagi:
- EmailJS ma limit 200 emaili miesięcznie w planie darmowym
- Sprawdź folder spam jeśli emaile nie docierają
- Możesz dodać więcej usług email jako backup