/* ===== UTILS ===== */

/**
 * Utilitaires et helpers JavaScript
 */

/**
 * Échappe les caractères HTML dangereux
 */
export const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Crée un slug à partir d'une chaîne
 */
export const slugify = (str) => {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Formate une date
 */
export const formatDate = (dateString, locale = 'fr-FR') => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Calcule le temps de lecture
 */
export const getReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};

/**
 * Obtient l'URL d'une miniature YouTube
 */
export const getYouTubeThumbnail = (videoId, quality = 'hqdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Construit l'URL d'un artiste
 */
export const buildArtistUrl = (artistId, baseUrl = '') => {
  return `${baseUrl}/artistes/${artistId}`;
};

/**
 * Construit l'URL d'une interview
 */
export const buildInterviewUrl = (interviewId, baseUrl = '') => {
  return `${baseUrl}/interviews/${interviewId}`;
};

/**
 * Construit l'URL d'un article
 */
export const buildArticleUrl = (articleSlug, baseUrl = '') => {
  return `${baseUrl}/articles/${articleSlug}`;
};

/**
 * Partage sur les réseaux sociaux
 */
export const shareOnSocial = (platform, url, text) => {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  }
};

/**
 * Copie du texte dans le presse-papiers
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Erreur lors de la copie:', err);
    return false;
  }
};

/**
 * Affiche un toast de notification
 */
export const showToast = (message, duration = 2000) => {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
};

/**
 * Attend que le DOM soit chargé
 */
export const onReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

/**
 * Intersection Observer pour les animations de reveal
 */
export const observeReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
};

/**
 * Gère le scroll smooth pour les ancres
 */
export const handleSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

/**
 * Gère la progress bar au scroll
 */
export const handleScrollProgress = () => {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
};

/**
 * Gère la navigation au scroll
 */
export const handleStickyNav = () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
};

/**
 * Filtre un tableau par genres
 */
export const filterByGenre = (items, genre) => {
  if (genre === 'all') return items;
  return items.filter((item) => item.genre === genre);
};

/**
 * Filtre un tableau par recherche
 */
export const filterBySearch = (items, query, fields = ['nom', 'description']) => {
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowerQuery);
    });
  });
};

/**
 * Trie un tableau par date
 */
export const sortByDate = (items, field = 'date', order = 'desc') => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[field]);
    const dateB = new Date(b[field]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

/**
 * Groupe un tableau par clé
 */
export const groupBy = (items, key) => {
  return items.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});
};

/**
 * Débounce une fonction
 */
export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle une fonction
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Détecte si l'appareil est mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Détecte le support du Web Share API
 */
export const canShare = () => {
  return navigator.share !== undefined;
};

/**
 * Partage avec le Web Share API
 */
export const shareWithAPI = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  }
};

/**
 * Génère un UUID simple
 */
export const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Récupère les paramètres d'URL
 */
export const getURLParams = (url = window.location.href) => {
  const params = new URLSearchParams(new URL(url).search);
  return Object.fromEntries(params);
};

/**
 * Construit une URL avec des paramètres
 */
export const buildURL = (baseUrl, params) => {
  const url = new URL(baseUrl, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

/**
 * Animation d'entrée des nombres
 */
export const animateNumbers = (element, target, duration = 1000) => {
  const start = 0;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(animate);
};
