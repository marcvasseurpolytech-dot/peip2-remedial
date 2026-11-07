// Langue de l'interface : français (par défaut) ou anglais. Choix mémorisé dans ce navigateur.
const KEY = 'peip2.lang';
let lang = 'en'; // anglais par défaut ; le choix de l'élève est mémorisé
try { if (localStorage.getItem(KEY) === 'fr') lang = 'fr'; } catch (e) { /* stockage indisponible */ }

export const getLang = () => lang;
export function setLang(l) {
  lang = l === 'en' ? 'en' : 'fr';
  try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
  document.documentElement.lang = lang;
}
document.documentElement.lang = lang;

// L('texte français', 'English text')
export const L = (fr, en) => (lang === 'en' ? en : fr);
export const locale = () => (lang === 'en' ? 'en-GB' : 'fr-FR');

// Version de l'objet (item, série, chapitre) dans la langue courante.
export function lz(o) {
  return lang === 'en' && o && o.en ? Object.assign({}, o, o.en) : o;
}

// Messages renvoyés par le serveur (en français) : traduits côté navigateur en mode anglais.
const SERVER = {
  'Ton compte attend la validation de ton enseignant. Reviens plus tard.': 'Your account is waiting for your teacher to approve it. Please come back later.',
  'NOM ou code incorrect.': 'Incorrect NAME or code.',
  'Tous les champs sont obligatoires.': 'All fields are required.',
  'Données manquantes ou invalides.': 'Missing or invalid data.',
  "Trop d'essais. Réessaie dans quelques minutes.": 'Too many attempts. Try again in a few minutes.',
  'Trop de demandes. Réessaie plus tard.': 'Too many requests. Try again later.',
  'Session expirée.': 'Session expired.',
  'Session expirée, reconnecte-toi.': 'Session expired, please sign in again.',
  'Compte indisponible.': 'Account unavailable.',
  'Données invalides.': 'Invalid data.',
  'Erreur du serveur.': 'Server error.',
  "Conflit d'écriture, réessaie.": 'Write conflict, please try again.',
  "Carnet plein : supprime d'anciennes notes.": 'Notebook full: delete some old notes.',
  'Identifiant manquant.': 'Missing identifier.',
  'Méthode non autorisée.': 'Method not allowed.',
  'Action inconnue.': 'Unknown action.',
  'Connexion impossible. Vérifie ton réseau et réessaie.': 'Connection failed. Check your network and try again.',
  'Mot de passe incorrect.': 'Incorrect password.',
  'Accès administrateur requis.': 'Administrator access required.',
  'Élève introuvable.': 'Student not found.',
  "ADMIN_HASH n'est pas configuré sur Vercel.": 'ADMIN_HASH is not configured on Vercel.',
  'Serveur mal configuré (GITHUB_TOKEN manquant).': 'Server misconfigured (GITHUB_TOKEN missing).',
  'Serveur mal configuré (DATA_REPO manquant).': 'Server misconfigured (DATA_REPO missing).'
};

export const msgText = m => translateServer(m, lang === 'en');
// Pour l'administration, toujours en anglais.
export const msgTextEn = m => translateServer(m, true);

function translateServer(m, en) {
  const s = String(m == null ? '' : m);
  if (!en) return s;
  if (SERVER[s]) return SERVER[s];
  let x = /^Le nom « (.+) » est déjà inscrit\. Connecte-toi plutôt\.$/.exec(s);
  if (x) return `The name "${x[1]}" is already registered. Please sign in instead.`;
  x = /^Note trop longue \((\d+) caractères maximum\)\.$/.exec(s);
  if (x) return `Note too long (${x[1]} characters maximum).`;
  x = /^Stockage indisponible : /.exec(s);
  if (x) return 'Storage unavailable. Please try again in a moment.';
  if (/^Erreur \d+$/.test(s)) return s.replace('Erreur', 'Error');
  return s;
}
