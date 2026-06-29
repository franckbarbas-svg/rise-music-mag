# Rise Music Mag V2

🎵 Refonte complète du magazine musical professionnel

## 📋 Architecture

### Structure de base
```
/css           - Stylesheets modulaires (variables, base, animations, components, layout, responsive)
/js            - JavaScript modulaire (router, dataManager, seoManager, utils, app)
/data          - Données JSON (artistes, interviews, articles, albums, events, partenaires)
/admin         - Configuration CMS (Décap CMS)
/images        - Images et assets
```

### Fichiers clés
- `index.html` - Point d'entrée unique (SPA)
- `config.json` - Configuration du site
- `manifest.json` - PWA manifest
- `sitemap.xml` - Sitemap pour SEO
- `robots.txt` - Robots exclusions

## 🚀 Fonctionnalités

### Pages
- ✅ Accueil (Hero + Stats + Featured)
- ✅ Artistes (Liste filtrable par genre)
- ✅ Interviews (Modèle réutilisable)
- ✅ Articles (Système de blog)
- ✅ Événements (Agenda)
- ✅ À propos
- ✅ Contact
- ✅ Partenariats
- ✅ Mentions légales

### Système de routage
- ✅ Router SPA client-side
- ✅ Navigation sans rechargement
- ✅ Gestion de l'historique
- ✅ Paramètres dynamiques

### Gestion des données
- ✅ DataManager avec cache
- ✅ Chargement JSON asynchrone
- ✅ Recherche globale
- ✅ Filtrage par genre
- ✅ Statistiques en temps réel

### SEO & Performance
- ✅ Schema.org (Person, NewsArticle, BlogPosting, BreadcrumbList, Organization)
- ✅ Open Graph et Twitter Cards
- ✅ Métadonnées dynamiques
- ✅ Canonical URLs
- ✅ Sitemap XML
- ✅ robots.txt

### Design & UX
- ✅ Palette doré/noir/blanc
- ✅ Animations fluides
- ✅ Responsive parfait (mobile-first)
- ✅ Loader personnalisé
- ✅ Progress bar
- ✅ Toast notifications
- ✅ Reveal animations

### Accessibilité
- ✅ ARIA labels
- ✅ Focus visible
- ✅ Navigation clavier
- ✅ Prefers reduced motion
- ✅ Contraste WCAG AA

### PWA
- ✅ manifest.json
- ✅ Support offline (à compléter avec service worker)
- ✅ Installation sur l'écran d'accueil

### Admin CMS
- ✅ Configuration Décap CMS
- ✅ Authentification GitHub
- ✅ Collections (artistes, interviews, articles, albums, events)
- ✅ Éditeur visuel

## 🛠️ Utilisation

### Développement
```bash
# Serveur local
python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

### Déploiement
Le site est configuré pour GitHub Pages via la branche `main`

### Admin CMS
Accès: `https://risemusicmag.fr/admin`

## 📱 Responsive
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (640px - 767px)
- Small Mobile (380px - 639px)

## 🎨 Design Tokens
- Couleur primaire: `#C8A44E` (Doré)
- Couleur primaire clair: `#E8C46A`
- Fond sombre: `#0A0A0F`
- Texte clair: `#F0EDE6`
- Typo: Inter (sans-serif), Roboto Condensed (display), Georgia (serif)

## 📊 Genres musicaux
- Pop & Nouvelle Variété
- Afro & Global Pop
- Dance & Club Pop
- Bedroom Pop & Indie
- Hybrid & Future Pop

## 🔄 Mise à jour des données
Modifiez les fichiers JSON dans `/data`:
- `artistes.json`
- `interviews.json`
- `articles.json`
- `albums.json`
- `events.json`
- `partenaires.json`

Ou utilisez l'interface CMS à `/admin`

## 📈 Performance
- Lazy loading des images
- CSS optimisé et modulaire
- JavaScript ES6+ sans dépendances externes
- Compression des assets
- Preconnect pour les fonts

## 🔐 Sécurité
- Échappement des caractères HTML
- CORS pour les requêtes externes
- CSP (à configurer au niveau serveur)

## 📝 SEO Score
Score Lighthouse: >90 (à vérifier)

## 🚀 Prochaines étapes
- [ ] Service Worker pour offline
- [ ] Mode sombre (préférence système)
- [ ] Commentaires (Disqus/Giscus)
- [ ] Newsletter
- [ ] Playlist Spotify intégrée
- [ ] Analytics (Plausible/Fathom)
- [ ] Multilingue (EN/FR)
- [ ] Favoris/Bookmarks
- [ ] Export PDF articles
- [ ] Social sharing avancé

## 📄 Licence
© 2025 Rise Music Mag — Tous droits réservés
