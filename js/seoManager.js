/* ===== SEO MANAGER ===== */

/**
 * Gestionnaire SEO et métadonnées
 */

class SEOManager {
  constructor(config = {}) {
    this.config = config;
    this.baseUrl = config.url || 'https://risemusicmag.fr';
    this.siteTitle = config.title || 'Rise Music Mag';
    this.siteDescription = config.description || '';
  }

  /**
   * Met à jour les métadonnées d'une page
   */
  updatePageMeta(options = {}) {
    const {
      title = this.siteTitle,
      description = this.siteDescription,
      image = null,
      url = this.baseUrl,
      type = 'website'
    } = options;

    // Titre
    document.title = title;
    this.setMeta('og:title', title);
    this.setMeta('twitter:title', title);

    // Description
    this.setMeta('description', description);
    this.setMeta('og:description', description);
    this.setMeta('twitter:description', description);

    // URL
    this.setMeta('og:url', url);
    this.setMeta('canonical', url);

    // Image
    if (image) {
      const imageUrl = image.startsWith('http') ? image : `${this.baseUrl}${image}`;
      this.setMeta('og:image', imageUrl);
      this.setMeta('twitter:image', imageUrl);
      this.setMeta('og:image:width', '1200');
      this.setMeta('og:image:height', '630');
    }

    // Type
    this.setMeta('og:type', type);
    this.setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
  }

  /**
   * Met à jour les métadonnées d'un artiste
   */
  updateArtistMeta(artist) {
    const url = `${this.baseUrl}/artistes/${artist.id}`;
    const description = artist.description || artist.biographie;
    const image = artist.photo || (artist.youtube ? this.getYouTubeThumbnail(artist.youtube) : null);

    this.updatePageMeta({
      title: `${artist.nom} — Rise Music Mag`,
      description,
      image,
      url,
      type: 'profile'
    });

    // Schema.org Person
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': artist.nom,
      'description': description,
      'image': image,
      'url': url,
      'knowsAbout': artist.genre
    });
  }

  /**
   * Met à jour les métadonnées d'une interview
   */
  updateInterviewMeta(interview) {
    const url = `${this.baseUrl}/interviews/${interview.id}`;
    const image = interview.photo || (interview.youtube ? this.getYouTubeThumbnail(interview.youtube) : null);

    this.updatePageMeta({
      title: `Interview : ${interview.nom} — Rise Music Mag`,
      description: interview.biographie,
      image,
      url,
      type: 'article'
    });

    // Schema.org NewsArticle
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': `Interview : ${interview.nom}`,
      'description': interview.biographie,
      'image': image,
      'datePublished': interview.date,
      'author': {
        '@type': 'Organization',
        'name': 'Rise Music Mag'
      }
    });
  }

  /**
   * Met à jour les métadonnées d'un article
   */
  updateArticleMeta(article) {
    const url = `${this.baseUrl}/articles/${article.slug}`;

    this.updatePageMeta({
      title: `${article.titre} — Rise Music Mag`,
      description: article.extrait,
      image: article.image,
      url,
      type: 'article'
    });

    // Schema.org BlogPosting
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': article.titre,
      'description': article.extrait,
      'image': article.image,
      'datePublished': article.date,
      'author': {
        '@type': 'Organization',
        'name': article.auteur || 'Rise Music Mag'
      }
    });
  }

  /**
   * Crée un breadcrumb Schema.org
   */
  setBreadcrumb(items = []) {
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };

    this.setJsonLd(breadcrumb);
  }

  /**
   * Crée un Schema.org Organization
   */
  setOrganization() {
    const org = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': this.siteTitle,
      'description': this.siteDescription,
      'url': this.baseUrl,
      'logo': `${this.baseUrl}/images/logo.svg`,
      'sameAs': [
        'https://instagram.com/risemusicmag',
        'https://youtube.com/@risemusicmag',
        'https://open.spotify.com/user/risemusicmag',
        'https://tiktok.com/@risemusicmag'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Support',
        'email': 'contact@risemusicmag.fr'
      }
    };

    this.setJsonLd(org);
  }

  /**
   * Crée un sitemap en mémoire (devrait être sur le serveur)
   */
  generateSitemap(pages = [], artists = [], articles = []) {
    const urls = [
      { url: this.baseUrl, priority: 1.0, changefreq: 'daily' },
      ...pages.map((page) => ({
        url: `${this.baseUrl}/${page}`,
        priority: 0.8,
        changefreq: 'weekly'
      })),
      ...artists.map((artist) => ({
        url: `${this.baseUrl}/artistes/${artist.id}`,
        priority: 0.7,
        changefreq: 'monthly'
      })),
      ...articles.map((article) => ({
        url: `${this.baseUrl}/articles/${article.slug}`,
        priority: 0.8,
        changefreq: 'weekly'
      }))
    ];

    return urls;
  }

  /**
   * Définit une méta balise
   */
  setMeta(name, content) {
    let element;
    const isProperty = name.startsWith('og:') || name.startsWith('twitter:');
    const attribute = isProperty ? 'property' : 'name';

    element = document.querySelector(`meta[${attribute}="${name}"]`);

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  }

  /**
   * Définit une balise canonical
   */
  setCanonical(url) {
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = url;
  }

  /**
   * Définit le JSON-LD
   */
  setJsonLd(data) {
    let script = document.querySelector('script[type="application/ld+json"]');

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  /**
   * Obtient la miniature YouTube
   */
  getYouTubeThumbnail(videoId, quality = 'hqdefault') {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }

  /**
   * Ajoute les balises Twitter Cards
   */
  setTwitterCard(type = 'summary_large_image') {
    this.setMeta('twitter:card', type);
    this.setMeta('twitter:site', '@risemusicmag');
  }

  /**
   * Ajoute les préconnexions
   */
  addPreconnect(urls = []) {
    const defaultUrls = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.youtube.com',
      'https://open.spotify.com'
    ];

    [...defaultUrls, ...urls].forEach((url) => {
      let link = document.querySelector(`link[href="${url}"][rel="preconnect"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }

  /**
   * Génère les balises pour Web App
   */
  setWebAppMeta() {
    this.setMeta('theme-color', '#C8A44E');
    this.setMeta('apple-mobile-web-app-capable', 'yes');
    this.setMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
    this.setMeta('apple-mobile-web-app-title', this.siteTitle);

    let link = document.querySelector('link[rel="apple-touch-icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'apple-touch-icon';
      link.href = '/images/icon-192.png';
      document.head.appendChild(link);
    }
  }
}

export const seoManager = new SEOManager(window.RISE_CONFIG || {});
