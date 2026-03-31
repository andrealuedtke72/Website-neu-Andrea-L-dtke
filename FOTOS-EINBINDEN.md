# Fotos einbinden – Anleitung

Lege deine Fotos im Ordner `images/` ab und ersetze dann in `style.css`
die jeweiligen Kommentarblöcke:

## 1. Hero-Bild (Startseite, vollflächig)
Datei: `images/hero.jpg` (empfohlen: 1920×1080 px oder größer)

In `style.css` suche nach `.hero-image-placeholder {` und ändere:
```css
.hero-image-placeholder {
  position: absolute;
  inset: 0;
  background: url('images/hero.jpg') center/cover no-repeat;
}
```

## 2. Über-mich-Foto (Portrait)
Datei: `images/andrea-portrait.jpg` (empfohlen: 800×1000 px)

Suche nach `.about-image-placeholder {` und ändere:
```css
.about-image-placeholder {
  width: 100%;
  aspect-ratio: 4/5;
  border-radius: var(--radius-lg);
  background: url('images/andrea-portrait.jpg') center/cover no-repeat;
  position: relative;
  overflow: hidden;
}
```

## 3. Coaching-Bild
Datei: `images/coaching.jpg` (empfohlen: 800×1000 px)

Suche nach `.coaching-image-placeholder {` und ändere:
```css
.coaching-image-placeholder {
  width: 100%;
  aspect-ratio: 4/5;
  border-radius: var(--radius-lg);
  background: url('images/coaching.jpg') center/cover no-repeat;
  position: relative;
  overflow: hidden;
}
```

## 4. Körperklar-Bild
Datei: `images/koerperklar.jpg` (empfohlen: 800×1066 px)

Suche nach `.koerperklar-image-placeholder {` und ändere:
```css
.koerperklar-image-placeholder {
  background: url('images/koerperklar.jpg') center/cover no-repeat;
}
```

## 5. Fit-im-Job / Corporate-Bild
Datei: `images/fitimjob.jpg` (empfohlen: 800×1000 px)

Suche nach `.corporate-image-placeholder {` und ändere:
```css
.corporate-image-placeholder {
  background: url('images/fitimjob.jpg') center/cover no-repeat;
}
```

---

## Öffnen ohne Webserver
Die Website kann einfach per Doppelklick auf `index.html` im Browser geöffnet werden.
Alle Schriften werden von Google Fonts geladen (Internetverbindung nötig).
