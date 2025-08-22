# Konfiguracja Automatycznej Odpowiedzi EmailJS

## Krok 1: Utworzenie nowego szablonu w EmailJS

1. Zaloguj się do [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Przejdź do sekcji **Email Templates**
3. Kliknij **Create New Template**
4. Ustaw **Template ID**: `template_vzmqhfo`

## Krok 2: Konfiguracja szablonu

### Ustawienia podstawowe:
- **Template Name**: `Auto Reply - Portfolio Contact`
- **Subject**: `{{reply_subject}}`
- **From Name**: `{{from_name}}`
- **From Email**: `pawel.chrzan93@gmail.com`
- **To Email**: `{{to_email}}`

### Treść emaila (HTML):
Skopiuj zawartość z pliku `auto-reply-template.html` do pola **Content**.

### Treść emaila (Text - opcjonalne):
```
Dzień dobry {{to_name}}!

Dziękuję za skontaktowanie się ze mną przez formularz na mojej stronie portfolio.

Twoja wiadomość została pomyślnie dostarczona!
Skontaktuję się z Tobą tak szybko, jak to możliwe - zazwyczaj w ciągu 24 godzin.

W międzyczasie zapraszam do:
- Przejrzenia moich projektów na GitHub: https://github.com/Finalway1606
- Odwiedzenia mojego profilu na LinkedIn
- Zapoznania się z moim portfolio na stronie

Jeśli Twoja sprawa jest pilna, możesz również skontaktować się ze mną bezpośrednio:
Email: pawel.chrzan93@gmail.com
Telefon: +48 123 456 789

Pozdrawiam serdecznie,
Paweł Chrzan
Full Stack Developer

Ta wiadomość została wygenerowana automatycznie. Proszę nie odpowiadać na ten email.
```

## Krok 3: Parametry szablonu

Upewnij się, że szablon używa następujących parametrów:
- `{{to_email}}` - email nadawcy
- `{{to_name}}` - imię nadawcy
- `{{from_name}}` - Twoje imię
- `{{reply_subject}}` - temat odpowiedzi

## Krok 4: Test szablonu

1. Kliknij **Test Template**
2. Wypełnij przykładowe dane:
   - `to_email`: twój-email@example.com
   - `to_name`: Jan Kowalski
   - `from_name`: Paweł Chrzan
   - `reply_subject`: Dziękuję za kontakt - Portfolio Paweł Chrzan
3. Wyślij test i sprawdź czy email dotarł poprawnie

## Krok 5: Zapisanie szablonu

1. Kliknij **Save**
2. Upewnij się, że Template ID to `template_vzmqhfo`

## Jak to działa?

Po wysłaniu formularza kontaktowego:
1. Wysyłany jest główny email do Ciebie (`template_4tnir7k`)
2. Automatycznie wysyłana jest odpowiedź do nadawcy (`template_vzmqhfo`)
3. Nadawca otrzymuje profesjonalne podziękowanie z informacją o czasie odpowiedzi

## Uwagi:

- Automatyczna odpowiedź jest wysyłana tylko po pomyślnym wysłaniu głównego emaila
- W przypadku błędu głównego emaila, automatyczna odpowiedź nie zostanie wysłana
- Możesz dostosować treść szablonu według własnych potrzeb
- Pamiętaj o aktualizacji danych kontaktowych w szablonie

## Rozwiązywanie problemów:

- Jeśli automatyczna odpowiedź nie działa, sprawdź Template ID w kodzie JavaScript
- Upewnij się, że wszystkie parametry są poprawnie przekazywane
- Sprawdź logi w konsoli przeglądarki pod kątem błędów