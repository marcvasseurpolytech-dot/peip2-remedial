// G21 : Faux amis et mots confusants
import { S, FICHE, MURPHY, F, OK, R, W, P, K, SK } from './dsl2.js';
import { ch, E } from './dsl.js';

const guideeA = [
  K('She is very ___ (= raisonnable, sensée) about risk management.', [['sensible']], "Elle est très raisonnable en matière de gestion des risques.", 'sensible = raisonnable ; sensitive = sensible (au toucher, aux émotions).', 'sensible = reasonable; sensitive = easily affected.'),
  K('He ___ (= exige) an immediate and full response from the team.', [['demands']], "Il exige une réponse immédiate et complète de l'équipe.", 'demand = exiger ; demander = ask, request.', 'demand = require firmly; ask / request = demander.'),
  K('The drug was ___ (= finalement) approved after five years of clinical trials.', [['eventually']], "Le médicament a finalement été approuvé après cinq ans d'essais cliniques.", 'eventually = finalement ; éventuellement = possibly.', 'eventually = in the end; it does not mean possibly.'),
  K('The misleading graph ___ (= a trompé) all the reviewers.', [['deceived', 'misled']], "Le graphique trompeur a trompé tous les relecteurs.", 'deceive = tromper ; disappoint = décevoir.', 'deceive = trick; disappoint = let down.'),
  K('She ___ (= fait semblant de) not to hear the critical feedback.', [['pretends']], "Elle fait semblant de ne pas entendre les critiques.", 'pretend = faire semblant ; claim = prétendre.', 'pretend = act as if; claim = state that.'),
  K('He went to the ___ (= bibliothèque) to find academic papers.', [['library']], "Il est allé à la bibliothèque pour trouver des articles universitaires.", 'library = bibliothèque ; librairie = bookshop.', 'library = place to borrow books; librairie = bookshop.'),
  K('I ___ (= ai assisté à) the entire conference last week.', [['attended']], "J'ai assisté à toute la conférence la semaine dernière.", 'attend = assister à ; assist = aider.', 'attend = be present at; assist = help.'),
  K('The office needs to be ___ (= propre, rangé) before the inspection.', [['clean', 'tidy']], "Le bureau doit être propre et rangé avant l'inspection.", 'propre = clean ou tidy ; proper = convenable.', 'propre = clean or tidy; proper = appropriate.'),
  K('She ___ (= a prétendu, affirmé) she had no prior knowledge of the error.', [['claimed', 'maintained', 'asserted']], "Elle a affirmé n'avoir eu aucune connaissance préalable de l'erreur.", 'claim = prétendre, affirmer ; pretend = faire semblant.', 'claim = state; pretend = act as if.'),
  K('___ (= En fait), the experiment produced the opposite result.', [['actually', 'in fact']], "En fait, l'expérience a produit le résultat inverse.", 'actually = en fait ; actuellement = currently.', 'actually = in fact; actuellement = currently.')
];
const guideeB = [
  K('This policy decision will ___ (affect / effect) all departments.', [['affect']], "Cette décision politique touchera tous les services.", 'verbe : affect.', 'verb: affect.'),
  K('The ___ (affect / effect) of the new regulation was immediate.', [['effect']], "L'effet de la nouvelle réglementation a été immédiat.", 'nom : effect.', 'noun: effect.'),
  K('The ___ (principal / principle) goal of the project is emissions reduction.', [['principal']], "L'objectif principal du projet est la réduction des émissions.", 'principal = principal (adjectif).', 'principal = main (adjective).'),
  K('This methodology is based on the ___ (principal / principle) of parsimony.', [['principle']], "Cette méthodologie repose sur le principe de parcimonie.", 'principle = règle, principe.', 'principle = rule.'),
  K('The experimental data ___ (complements / compliments) our initial hypothesis.', [['complements']], "Les données expérimentales complètent notre hypothèse initiale.", 'complement = compléter.', 'complement = complete.'),
  K('She ___ (complimented / complemented) him on his excellent oral presentation.', [['complimented']], "Elle l'a félicité pour son excellent exposé oral.", 'compliment = féliciter.', 'compliment = praise.'),
  K('This is an ___ (economic / economical) approach, it uses very few resources.', [['economical']], "C'est une approche économe, elle utilise très peu de ressources.", 'economical = économe.', 'economical = cheap to run.'),
  K('The ___ (economic / economical) consequences of the decision were serious.', [['economic']], "Les conséquences économiques de la décision ont été graves.", 'economic = relatif à l\'économie.', 'economic = relating to the economy.'),
  K('She gave me some excellent ___ (advice / advise) on the application process.', [['advice']], "Elle m'a donné d'excellents conseils sur la procédure de candidature.", 'nom : advice.', 'noun: advice.'),
  K('He ___ (advised / advice) me to apply for the research fellowship.', [['advised']], "Il m'a conseillé de postuler à la bourse de recherche.", 'verbe : advised.', 'verb: advised.')
];
const nivA = [
  F('She is very sensible about cold temperatures.', ['She is very sensitive to cold temperatures.', 'She is very sensitive to the cold.', 'She is very sensitive about cold temperatures.'], "Elle est très sensible au froid.", 'sensible = raisonnable ; sensible (français) = sensitive.', 'sensible = reasonable; French sensible = sensitive.'),
  F('Eventually, if needed, we can add a second sensor.', ['Possibly, if needed, we can add a second sensor.', 'If needed, we can possibly add a second sensor.', 'Perhaps, if needed, we can add a second sensor.', 'If needed, we can perhaps add a second sensor.', 'If needed, we can add a second sensor.'], "Éventuellement, si besoin, nous pourrons ajouter un second capteur.", 'éventuellement = possibly, perhaps ; eventually = finalement.', 'the French word means possibly, perhaps; eventually means in the end.'),
  F('The library is a great place to buy new textbooks.', ['The bookshop is a great place to buy new textbooks.', 'The bookstore is a great place to buy new textbooks.'], "La librairie est un excellent endroit pour acheter des manuels neufs.", 'librairie = bookshop ; library = bibliothèque.', 'librairie = bookshop; library = place to borrow books.'),
  F('I assisted the international conference last Tuesday.', ['I attended the international conference last Tuesday.'], "J'ai assisté à la conférence internationale mardi dernier.", 'assister à = attend.', 'to be present at an event = attend.'),
  K('He ___ to understand everything. (= fait semblant)', [['pretended']], "Il faisait semblant de tout comprendre.", 'pretend = faire semblant.', 'pretend = act as if.')
];
const nivB = [
  K('The increased pollution ___ (affects / effects) marine biodiversity.', [['affects']], "L'augmentation de la pollution affecte la biodiversité marine.", 'verbe : affects.', 'verb: affects.'),
  K('The ___ (affect / effect) on local wildlife has been devastating.', [['effect']], "L'effet sur la faune locale a été dévastateur.", 'nom : effect.', 'noun: effect.'),
  K('Our ___ (principal / principle) aim is to reduce operational costs.', [['principal']], "Notre objectif principal est de réduire les coûts d'exploitation.", 'principal = principal.', 'principal = main.'),
  K('This decision violates a basic ___ (principal / principle) of engineering ethics.', [['principle']], "Cette décision viole un principe de base de l'éthique de l'ingénieur.", 'principle = principe.', 'principle = rule.'),
  K('She ___ (complimented / complemented) him on his excellent analytical work.', [['complimented']], "Elle l'a félicité pour son excellent travail d'analyse.", 'compliment = féliciter.', 'compliment = praise.'),
  F('She is very sympathic with her struggling students.', ['She is very sympathetic with her struggling students.', 'She is very sympathetic towards her struggling students.', 'She is very sympathetic to her struggling students.'], "Elle est très compréhensive avec ses étudiants en difficulté.", 'sympathetic = compréhensif, compatissant.', 'sympathetic = understanding, compassionate.'),
  F('He demanded me to explain the results.', ['He asked me to explain the results.', 'He demanded that I explain the results.', 'He demanded that I should explain the results.', 'He demanded an explanation of the results.', 'He requested me to explain the results.'], "Il m'a demandé d'expliquer les résultats.", 'demand ne se construit pas avec objet + to : ask somebody to, ou demand that.', 'demand is not followed by object + to: ask somebody to, or demand that.'),
  F("I'm going to the library to buy a new reference book.", ["I'm going to the bookshop to buy a new reference book.", "I'm going to the bookstore to buy a new reference book.", 'I am going to the bookshop to buy a new reference book.', 'I am going to the bookstore to buy a new reference book.'], "Je vais à la librairie acheter un nouvel ouvrage de référence.", 'librairie = bookshop.', 'librairie = bookshop.'),
  OK("Actually, the meeting hasn't started yet, we're still waiting.", "En fait, la réunion n'a pas encore commencé, nous attendons toujours.", 'actually = en fait : emploi correct.', 'actually = in fact: correct use.'),
  F('This is a proper office, it is very tidy.', ['This is a clean office, it is very tidy.', 'This is a tidy office, it is very tidy.', 'This is a clean office, it is very neat.', 'This is a clean and tidy office.', 'This is a clean office, it is very orderly.'], "C'est un bureau propre, il est très bien rangé.", 'proper = convenable, véritable ; propre = clean.', 'proper = appropriate, real; propre = clean.')
];
const nivC = [
  R("En fait, les résultats sont bien meilleurs que prévu.", ['Actually, the results are much better than expected.', 'In fact, the results are much better than expected.', 'Actually, the results are far better than expected.', 'In fact, the results are far better than expected.', 'Actually, the results are a lot better than expected.', 'In fact, the results are a lot better than expected.', 'Actually, the results are much better than we expected.', 'In fact, the results are much better than we expected.'], 'en fait = actually / in fact.', 'en fait = actually / in fact.'),
  R("Elle a finalement obtenu le financement après deux ans de démarches.", ['She eventually received the funding after two years of effort.', 'She eventually received the funding after two years of efforts.', 'She eventually obtained the funding after two years of effort.', 'She eventually got the funding after two years of effort.', 'She finally received the funding after two years of effort.', 'She finally obtained the funding after two years of effort.', 'She finally got the funding after two years of effort.', 'She eventually secured the funding after two years of effort.', 'She finally secured the funding after two years of effort.', 'She eventually obtained the funding after two years of efforts.', 'She eventually got the funding after two years of efforts.', 'She finally received the funding after two years of efforts.', 'She finally obtained the funding after two years of efforts.', 'She finally got the funding after two years of efforts.', 'She eventually received the funding after two years of applications.', 'She eventually got the funding after two years of applications.', 'She finally got the funding after two years of applications.', 'She finally received the funding after two years of applications.'], 'finalement = eventually.', 'finalement = eventually.'),
  R("Il est très sympathique avec ses étudiants.", ['He is very friendly with his students.', 'He is very nice to his students.', 'He is very kind to his students.', 'He is very pleasant with his students.', 'He is very friendly towards his students.', 'He is very nice with his students.', 'He is very friendly to his students.', 'He is very pleasant to his students.'], 'sympathique = friendly, nice ; sympathetic = compréhensif.', 'sympathique = friendly, nice; sympathetic = understanding.'),
  R("Cette approche est raisonnable et facile à mettre en œuvre.", ['This approach is sensible and easy to implement.', 'This approach is reasonable and easy to implement.', 'This approach is sensible and easy to put into practice.', 'This approach is reasonable and easy to put into practice.', 'This approach is sensible and easy to apply.', 'This approach is reasonable and easy to apply.'], 'raisonnable = sensible / reasonable.', 'raisonnable = sensible / reasonable.'),
  R("La décision a trompé de nombreux investisseurs.", ['The decision deceived many investors.', 'The decision misled many investors.', 'The decision fooled many investors.'], 'tromper = deceive, mislead.', 'tromper = deceive, mislead.'),
  R("Je suis allé à la bibliothèque pour trouver des articles sur ce sujet.", ['I went to the library to find articles on this subject.', 'I went to the library to find articles on this topic.', 'I went to the library to find articles about this subject.', 'I went to the library to find articles about this topic.', 'I went to the library to find papers on this subject.', 'I went to the library to find papers on this topic.', 'I went to the library to find papers about this subject.', 'I went to the library to find papers about this topic.'], 'bibliothèque = library.', 'a place to borrow books = library.'),
  R("Il a exigé une réponse immédiate de tous les membres de l'équipe.", ['He demanded an immediate response from all team members.', 'He demanded an immediate response from all the team members.', 'He demanded an immediate response from every member of the team.', 'He demanded an immediate reply from all team members.', 'He demanded an immediate answer from all team members.', 'He demanded an immediate response from all members of the team.', 'He demanded an immediate reply from every member of the team.', 'He demanded an immediate answer from every member of the team.'], 'exiger = demand.', 'exiger = demand.'),
  R("Elle a prétendu ne pas connaître les résultats.", ['She claimed not to know the results.', 'She claimed she did not know the results.', "She claimed she didn't know the results.", 'She claimed that she did not know the results.', "She claimed that she didn't know the results.", 'She claimed to be unaware of the results.', 'She claimed to have no knowledge of the results.'], 'prétendre (affirmer) = claim ; pretend = faire semblant.', 'to state something = claim; pretend = act as if.'),
  R("La décision a déçu de nombreux chercheurs.", ['The decision disappointed many researchers.', 'The decision let down many researchers.'], 'décevoir = disappoint.', 'to let someone down = disappoint.'),
  R("Actuellement, le laboratoire manque de ressources suffisantes.", ['Currently, the laboratory lacks sufficient resources.', 'At present, the laboratory lacks sufficient resources.', 'At the moment, the laboratory lacks sufficient resources.', 'Currently, the lab lacks sufficient resources.', 'At present, the lab lacks sufficient resources.', 'At the moment, the lab lacks sufficient resources.', 'Currently, the laboratory lacks enough resources.', 'At present, the laboratory lacks enough resources.', 'At the moment, the laboratory lacks enough resources.', 'Currently, the laboratory does not have sufficient resources.', 'At present, the laboratory does not have sufficient resources.', 'At the moment, the laboratory does not have sufficient resources.', 'Currently, the laboratory does not have enough resources.', 'At present, the laboratory does not have enough resources.', 'At the moment, the laboratory does not have enough resources.', 'Nowadays, the laboratory lacks sufficient resources.'], 'actuellement = currently, at present.', 'actuellement = currently, at present.')
];
const nivD = [
  F('Actually, our team arrived at the conference and assisted it with great interest.', ['Actually, our team arrived at the conference and attended it with great interest.', 'Actually, our team arrived at the conference and attended with great interest.', 'Actually, our team arrived at the conference and attended the sessions with great interest.', 'In fact, our team arrived at the conference and attended it with great interest.'], "En fait, notre équipe est arrivée à la conférence et y a assisté avec un grand intérêt.", 'assister à = attend ; assist = aider. Actually est correct.', 'to be present at = attend; assist = help. Actually is correct.'),
  F('The principal speakers were very sympathic and sensible about the concerns raised.', ['The principal speakers were very sympathetic and sensitive to the concerns raised.', 'The principal speakers were very sympathetic and sensible about the concerns raised.', 'The principal speakers were very sympathetic and sensitive about the concerns raised.', 'The principal speakers were very understanding and sensitive to the concerns raised.', 'The principal speakers were very sympathetic and reasonable about the concerns raised.'], "Les intervenants principaux étaient très compréhensifs et sensibles aux préoccupations exprimées.", 'sympathetic ; sensible (raisonnable) reste correct, mais sensitive to rend le sens français.', 'sympathetic; sensible (reasonable) stays correct, but sensitive to renders the French meaning.'),
  F('Eventually, if needed, we may publish our findings.', ['Possibly, if needed, we may publish our findings.', 'If needed, we may possibly publish our findings.', 'Perhaps, if needed, we may publish our findings.', 'If needed, we may perhaps publish our findings.', 'If needed, we may publish our findings.'], "Éventuellement, si nécessaire, nous pourrons publier nos résultats.", 'éventuellement = possibly, if needed.', 'the sense here is possibly, if needed.'),
  F('We demand the reviewers to take these results seriously.', ['We ask the reviewers to take these results seriously.', 'We demand that the reviewers take these results seriously.', 'We request that the reviewers take these results seriously.', 'We request the reviewers to take these results seriously.', 'We demand that the reviewers should take these results seriously.', 'We urge the reviewers to take these results seriously.'], "Nous demandons aux relecteurs de prendre ces résultats au sérieux.", 'demander à quelqu\'un de = ask somebody to ; demand that.', 'ask somebody to; demand that.')
];
const bonus = [
  P("Donne le sens réel de 'comprehensive' et son faux ami français.", "comprehensive (adj.) What does it really mean? Which French word is it not equivalent to?", ['comprehensive = complete, thorough; it does not mean understanding or sympathetic.'], 'complet, exhaustif.', "What does it really mean? Which French word is it not equivalent to?", 'complete, thorough.'),
  P("Donne le sens réel de 'affluent' et son faux ami français.", "affluent (adj.) What does it really mean? Which French word is it not equivalent to?", ['affluent = wealthy, well-off; it does not mean a tributary of a river.'], 'riche, aisé.', "What does it really mean? Which French word is it not equivalent to?", 'rich, well-off.'),
  P("Donne le sens réel de 'genial' et son faux ami français.", "genial (adj.) What does it really mean? Which French word is it not equivalent to?", ['genial = friendly, cheerful (formal or rare); it does not mean brilliant.'], 'jovial, agréable.', "What does it really mean? Which French word is it not equivalent to?", 'cheerful, pleasant.'),
  P("Donne le sens de 'benevolent'. Est-ce un vrai faux ami ?", "benevolent (adj.) What does it mean? Is it really a false friend?", ['benevolent = kind, well-meaning; it is very close to bienveillant, so it is not really a false friend.'], 'bienveillant.', "What does it mean? Is it really a false friend?", 'kind, well-meaning.'),
  P("Donne le sens réel de 'candid' et son faux ami français.", "candid (adj.) What does it really mean? Which French word is it not equivalent to?", ['candid = frank, direct; it does not mean naive.'], 'franc, direct.', "What does it really mean? Which French word is it not equivalent to?", 'frank, direct.')
];
const devoir = [
  K('The tutor is very ___ (= compréhensif) towards anxious first-year students.', [['sympathetic']], "Le tuteur est très compréhensif envers les étudiants de première année anxieux.", 'sympathetic.', 'sympathetic.'),
  K('The experiment ___ (affect / effect) the results significantly.', [['affects']], "L'expérience influence sensiblement les résultats.", 'verbe : affects.', 'verb: affects.'),
  K('He went to the ___ (= bibliothèque) to find research papers on thermodynamics.', [['library']], "Il est allé à la bibliothèque chercher des articles de recherche sur la thermodynamique.", 'library.', 'library.'),
  K('The CEO ___ (= a exigé) a full written report by end of day.', [['demanded']], "Le PDG a exigé un rapport écrit complet avant la fin de la journée.", 'demand.', 'demand.'),
  K('She ___ (= fait semblant de) not to understand the question.', [['pretends']], "Elle fait semblant de ne pas comprendre la question.", 'pretend.', 'pretend.'),
  K('The ___ (principal / principle) aim is to reduce carbon emissions by 40%.', [['principal']], "L'objectif principal est de réduire les émissions de carbone de 40 %.", 'principal.', 'principal.'),
  K('She ___ (deceived / disappointed) us with her below-average results.', [['disappointed']], "Elle nous a déçus avec ses résultats en dessous de la moyenne.", 'disappoint = décevoir.', 'disappoint = let down.'),
  K('The new laboratory ___ (complements / compliments) the existing research infrastructure.', [['complements']], "Le nouveau laboratoire complète l'infrastructure de recherche existante.", 'complement.', 'complement.'),
  K('He is very ___ (= raisonnable, sensé) about project risk management.', [['sensible']], "Il est très raisonnable en matière de gestion des risques du projet.", 'sensible.', 'sensible.'),
  K('The treatment was ___ (= finalement) approved after an extended review process.', [['eventually']], "Le traitement a finalement été approuvé après un long processus d'examen.", 'eventually.', 'eventually.'),
  K('She ___ (= a assisté à) the full international symposium last month.', [['attended']], "Elle a assisté à tout le colloque international le mois dernier.", 'attend.', 'attend.'),
  K('This is a very ___ (economic / economical) solution, it saves both time and money.', [['economical']], "C'est une solution très économique, elle fait gagner du temps et de l'argent.", 'economical.', 'economical.'),
  K('The decision had serious ___ (economic / economical) consequences for the region.', [['economic']], "La décision a eu de graves conséquences économiques pour la région.", 'economic.', 'economic.'),
  K('He ___ (advised / advice) her to apply for the competitive research grant.', [['advised']], "Il lui a conseillé de postuler à la bourse de recherche compétitive.", 'verbe : advised.', 'verb: advised.'),
  K('___ (= En fait), the system was already working, no action was needed.', [['actually', 'in fact']], "En fait, le système fonctionnait déjà, aucune action n'était nécessaire.", 'actually.', 'actually.')
];
const m21a1 = [
  K('___ (Actually / Currently), the lab is short of staff.', [['currently']], "Actuellement, le laboratoire manque de personnel.", 'currently = actuellement.', 'currently = at the moment.'),
  K('The merger was ___ (eventually / possibly) completed after three years of talks.', [['eventually']], "La fusion a finalement été conclue après trois ans de négociations.", 'eventually = finalement.', 'eventually = in the end.'),
  K('I bought the manual at the ___ (library / bookshop) near the campus.', [['bookshop', 'bookstore']], "J'ai acheté le manuel à la librairie près du campus.", 'librairie = bookshop.', 'librairie = bookshop.'),
  K('He is quite ___ (sensible / sensitive) to noise.', [['sensitive']], "Il est assez sensible au bruit.", 'sensible (français) = sensitive.', 'French sensible = sensitive.'),
  K('She ___ (demanded / asked) for a day off.', [['asked']], "Elle a demandé un jour de congé.", 'demander poliment = ask for.', 'demander politely = ask for.')
];
const m21a2 = [
  K('Late delivery ___ (affects / effects) customer satisfaction.', [['affects']], "Un retard de livraison affecte la satisfaction des clients.", 'verbe : affects.', 'verb: affects.'),
  K('The side ___ (affect / effect) of the drug is mild.', [['effect']], "L'effet secondaire du médicament est léger.", 'nom : effect.', 'noun: effect.'),
  K('The ___ (principal / principle) investor withdrew his funds.', [['principal']], "L'investisseur principal a retiré ses fonds.", 'principal = principal.', 'principal = main.'),
  K('Honesty is a basic ___ (principal / principle) of research.', [['principle']], "L'honnêteté est un principe fondamental de la recherche.", 'principle = principe.', 'principle = rule.'),
  K('The new module ___ (complements / compliments) the older one.', [['complements']], "Le nouveau module complète l'ancien.", 'complement.', 'complement.')
];
const m21b = [
  W('the / look / figures / fact / in / reassuring', ['In fact, the figures look reassuring.'], "En fait, les chiffres sont rassurants.", 'in fact = en fait.', 'in fact = actually.'),
  W('was / eventually / agreement / the / signed', ['The agreement was eventually signed.'], "L'accord a finalement été signé.", 'eventually = finalement.', 'eventually = in the end.'),
  W('from / she / the / borrowed / library / journal / a', ['She borrowed a journal from the library.'], "Elle a emprunté une revue à la bibliothèque.", 'library = bibliothèque.', 'library = place to borrow.'),
  W('that\'s / offer / a / reasonable / very', ["That's a very reasonable offer."], "C'est une offre très raisonnable.", 'reasonable = raisonnable.', 'reasonable = fair.'),
  W('she / spare / asked / for / parts', ['She asked for spare parts.', 'She requested spare parts.'], "Elle a demandé des pièces de rechange.", 'demander = ask for / request.', 'demander = ask for / request.'),
  W('the / affects / strike / whole / production / line', ['The strike affects the whole production line.'], "La grève affecte toute la ligne de production.", 'affect = affecter.', 'affect = influence.'),
  W('is / our / quality / priority / main', ['Quality is our main priority.'], "La qualité est notre priorité principale.", 'main = principal.', 'main = principal.'),
  W('data / the / our / confirm / hypothesis', ['The data confirm our hypothesis.', 'The data confirms our hypothesis.'], "Les données confirment notre hypothèse.", 'data accepte un verbe au pluriel ou au singulier.', 'data takes a plural or singular verb.')
];
const th = [
  R("En fait, les prévisions semblent réalistes.", ['In fact, the forecasts look realistic.', 'Actually, the forecasts look realistic.', 'In fact, the forecasts seem realistic.', 'Actually, the forecasts seem realistic.', 'In fact, the predictions look realistic.', 'Actually, the predictions look realistic.', 'In fact, the predictions seem realistic.', 'Actually, the predictions seem realistic.'], 'en fait = in fact / actually.', 'en fait = in fact / actually.'),
  R("L'accord a finalement été conclu.", ['The agreement was eventually reached.', 'The agreement was finally reached.', 'The deal was eventually reached.', 'The deal was finally reached.', 'The agreement was eventually concluded.', 'The agreement was finally concluded.', 'The deal was eventually concluded.', 'The deal was finally concluded.', 'The agreement was eventually signed.', 'The agreement was finally signed.'], 'finalement = eventually.', 'finalement = eventually.'),
  R("Elle a emprunté une revue à la bibliothèque universitaire.", ['She borrowed a journal from the university library.', 'She borrowed a magazine from the university library.', 'She borrowed a journal from the university\'s library.', 'She borrowed a journal from the campus library.', 'She borrowed a magazine from the campus library.'], 'bibliothèque = library.', 'a place to borrow books = library.'),
  R("C'est une offre tout à fait raisonnable.", ["That's a perfectly reasonable offer.", 'That is a perfectly reasonable offer.', "It's a perfectly reasonable offer.", 'It is a perfectly reasonable offer.', "That's a quite reasonable offer.", "That's a completely reasonable offer.", 'That is a completely reasonable offer.', "It's a completely reasonable offer.", "That's an entirely reasonable offer.", "It's a very reasonable offer.", "That's a very reasonable offer."], 'raisonnable = reasonable.', 'raisonnable = reasonable.'),
  R("Il a demandé des informations complémentaires.", ['He asked for additional information.', 'He requested additional information.', 'He asked for further information.', 'He requested further information.', 'He asked for more information.', 'He requested more information.', 'He asked for extra information.', 'He asked for complementary information.'], 'demander = ask for / request.', 'demander = ask for / request.'),
  R("La panne touche toute la chaîne de montage.", ['The breakdown affects the whole assembly line.', 'The breakdown affects the entire assembly line.', 'The failure affects the whole assembly line.', 'The failure affects the entire assembly line.', 'The breakdown is affecting the whole assembly line.', 'The breakdown is affecting the entire assembly line.'], 'affecter = affect.', 'affecter = affect.'),
  R("Notre priorité principale est la qualité.", ['Our main priority is quality.', 'Our main priority is the quality.', 'Our principal priority is quality.', 'Our top priority is quality.', 'Our primary priority is quality.', 'Our chief priority is quality.'], 'principal = main, principal.', 'principal = main, principal.')
];

const VF = (s, truth, fr, why, whyEn) => ch(s + ' This is ___.', ['true', 'false'], truth ? 0 : 1, fr, why, E(whyEn, null, { s: s + ' This is ___.', o: ['true', 'false'] }));
const CH2 = (s, o, k, fr, why, whyEn) => ch(s, o, k, fr, why, E(whyEn, null, { s, o }));
const vf = [
  VF('The English word "library" means a shop where you buy books.', false, "Le mot anglais library désigne une librairie où l'on achète des livres : faux.", 'library = bibliothèque, où l\'on emprunte ; la librairie se dit bookshop.', 'a library lends books; a shop that sells them is a bookshop.'),
  VF('"Eventually" means "in the end, after a long time".', true, "Eventually signifie finalement, au bout d'un long moment : vrai.", 'eventually = finalement.', 'eventually refers to the final result after a delay.'),
  VF('"Actually" means "at the present time".', false, "Actually signifie en fait, pas actuellement : faux.", 'actually = en fait ; actuellement se dit currently.', 'actually means in fact; for now, say currently.'),
  VF('"I assisted the lecture" means "I was present at the lecture".', false, "I assisted the lecture ne veut pas dire que j'y ai assisté : faux.", 'assister à se dit attend ; assist = aider.', 'to be present at is attend; assist means help.'),
  VF('"Sensible" means "reasonable and practical".', true, "Sensible signifie raisonnable et pratique : vrai.", 'sensible = raisonnable ; sensitive = sensible.', 'sensible means showing good judgement.'),
  VF('"To pretend" means "to say that something is true".', false, "To pretend signifie faire semblant, pas prétendre : faux.", 'pretend = faire semblant ; prétendre se dit claim.', 'pretend means act as if; to say something is true is claim.'),
  VF('"Sympathetic" can mean "understanding someone\'s feelings".', true, "Sympathetic peut signifier compréhensif envers les sentiments de quelqu'un : vrai.", 'sympathetic = compréhensif, compatissant.', 'sympathetic shows understanding of someone\'s feelings.'),
  VF('"To demand" is a polite way of asking for something.', false, "To demand est une exigence ferme, pas une demande polie : faux.", 'demand = exiger ; demander poliment = ask.', 'demand is firm; a polite request is ask.'),
  VF('"Large" means "wide".', false, "Large signifie grand, pas large : faux.", 'large = grand ; large (au sens de largeur) = wide.', 'large means big; wide describes distance from side to side.'),
  VF('"To deceive" means "to disappoint".', false, "To deceive signifie tromper, pas décevoir : faux.", 'deceive = tromper ; disappoint = décevoir.', 'deceive means trick; disappoint means let down.'),
  VF('"Comprehensive" means "complete and covering everything".', true, "Comprehensive signifie complet : vrai.", 'comprehensive = complet, exhaustif.', 'comprehensive means including everything.'),
  VF('A "lecture" is a talk given to students.', true, "Un lecture est un cours magistral donné à des étudiants : vrai.", 'lecture = cours magistral ; lecture (français) = reading.', 'a lecture is a talk given to students; reading is the activity of reading.')
];
const trou = [
  K('The ___ (= réel) cost was twice the estimate.', [['actual', 'real', 'true']], "Le coût réel a été le double de l'estimation.", 'actual = réel, effectif ; actuel se dit current.', 'actual = real; the idea of now is current.'),
  K('We will ___ (= reprendre) the discussion after lunch.', [['resume', 'continue']], "Nous reprendrons la discussion après le déjeuner.", 'resume = reprendre ; un CV se dit résumé ou CV.', 'resume (verb) = start again after a pause.'),
  K('Please send your ___ (= CV) with the application form.', [['cv', 'resume', 'résumé', 'curriculum vitae']], "Envoyez votre CV avec le formulaire de candidature.", 'CV = CV ou résumé (américain).', 'CV in British English; resume in American English.'),
  K('He gave an interesting ___ (= cours magistral) on robotics.', [['lecture', 'talk']], "Il a donné un cours magistral intéressant sur la robotique.", 'lecture = cours magistral.', 'lecture = talk given to students.'),
  K('The ___ (= ordre du jour) of the meeting has five items.', [['agenda']], "L'ordre du jour de la réunion comporte cinq points.", 'agenda = ordre du jour ; agenda (français) = diary.', 'agenda = list of items to discuss; a diary is a planner.'),
  K('She was ___ (= blessée) in a car accident.', [['injured', 'hurt', 'wounded']], "Elle a été blessée dans un accident de voiture.", 'blesser = injure, hurt ; blessed a un autre sens.', 'injured = physically harmed; blessed means something else.'),
  K('Is this a good ___ (= emplacement) for the new plant?', [['location', 'site', 'place', 'spot']], "Est-ce un bon emplacement pour la nouvelle usine ?", 'location = emplacement, lieu ; location (français) = rental.', 'location = place; for renting, say rental.'),
  K('He decided to ___ (= rester) at home all day.', [['stay', 'remain']], "Il a décidé de rester chez lui toute la journée.", 'rester = stay ; rest = se reposer.', 'stay = remain in a place; rest means relax.'),
  K('We ran an ___ (= expérience scientifique) to test the theory.', [['experiment']], "Nous avons mené une expérience pour tester la théorie.", 'experiment = expérience scientifique ; experience = vécu.', 'experiment = scientific test; experience = what you have lived through.'),
  K('The ___ (= client) complained about the bill.', [['customer', 'client']], "Le client s'est plaint de l'addition.", 'customer = client d\'un magasin ; client = client d\'un service.', 'customer buys goods; client buys a service.'),
  K('There is not enough ___ (= place) for everyone in this office.', [['room', 'space']], "Il n'y a pas assez de place pour tout le monde dans ce bureau.", 'room / space = place, espace ; place a un autre sens.', 'room / space = available area.'),
  K('Good ___ (= bonne chance) with the exam!', [['luck']], "Bonne chance pour l'examen !", 'luck = chance ; chance = occasion, probabilité.', 'luck = good fortune; chance means opportunity.')
];
const spot = [
  F('He is a very sensible person, he cries at every film.', ['He is a very sensitive person, he cries at every film.', 'He is a very sensitive person; he cries at every film.'], "C'est une personne très sensible, il pleure à chaque film.", 'sensible = raisonnable ; sensitive = sensible.', 'sensible = reasonable; sensitive = easily moved.'),
  F("I'm going to the library to buy a dictionary.", ["I'm going to the bookshop to buy a dictionary.", "I'm going to the bookstore to buy a dictionary.", 'I am going to the bookshop to buy a dictionary.', 'I am going to the bookstore to buy a dictionary.'], "Je vais à la librairie acheter un dictionnaire.", 'On achète un livre dans une bookshop.', 'You buy books in a bookshop.'),
  OK('Actually, I disagree with your last point.', "En fait, je ne suis pas d'accord avec votre dernier point.", 'actually = en fait : emploi correct.', 'actually = in fact: correct use.'),
  F('I read the lecture of this chapter twice.', ['I read this chapter twice.'], "J'ai lu ce chapitre deux fois.", 'lecture = cours ; l\'action de lire se dit reading.', 'lecture = talk; the act of reading is reading.'),
  F('His team lost, which was a big deception for him.', ['His team lost, which was a big disappointment for him.'], "Son équipe a perdu, ce qui a été une grande déception pour lui.", 'déception = disappointment ; deception = tromperie.', 'disappointment = let-down; deception = trickery.'),
  F('We need to assist the meeting at ten.', ['We need to attend the meeting at ten.', 'We need to be at the meeting at ten.'], "Nous devons assister à la réunion à dix heures.", 'assister à = attend.', 'to be present at = attend.'),
  OK('The students are waiting for the lecturer in the hall.', "Les étudiants attendent le conférencier dans le hall.", 'lecturer = enseignant-conférencier : emploi correct.', 'lecturer = person who gives lectures: correct use.'),
  OK('The meeting will resume after lunch.', "La réunion reprendra après le déjeuner.", 'resume = reprendre : emploi correct.', 'resume = start again: correct use.'),
  F('He passed an exam yesterday, but we do not know the result yet.', ['He took an exam yesterday, but we do not know the result yet.', 'He sat an exam yesterday, but we do not know the result yet.', 'He sat for an exam yesterday, but we do not know the result yet.', 'He took an exam yesterday but we do not know the result yet.'], "Il a passé un examen hier, mais nous ne connaissons pas encore le résultat.", 'passer un examen = take / sit ; pass = réussir.', 'passer un examen = take / sit; pass = succeed in.'),
  F('She wears a big pull in winter.', ['She wears a big sweater in winter.', 'She wears a big jumper in winter.', 'She wears a big pullover in winter.', 'She wears a big sweatshirt in winter.', 'She wears a big woolly jumper in winter.'], "Elle porte un gros pull en hiver.", 'pull = sweater, jumper ; pull = tirer.', 'a pull-over is a sweater or jumper; pull means draw towards you.'),
  OK('The tourists took photos of the monument.', "Les touristes ont pris des photos du monument.", 'Phrase correcte, aucun faux ami.', 'The sentence is correct, no false friend.')
];
const choix = [
  CH2('I need to ___ a car for the weekend.', ['rent', 'locate'], 0, "J'ai besoin de louer une voiture pour le week-end.", 'rent = louer ; locate = situer, repérer.', 'rent = pay to use; locate = find the position of.'),
  CH2('Three people were ___ in the crash.', ['damaged', 'injured'], 1, "Trois personnes ont été blessées dans l'accident.", 'injured pour une personne ; damaged pour un objet.', 'injured is for people; damaged is for objects.'),
  CH2('The bridge was badly ___ in the storm.', ['damaged', 'injured'], 0, "Le pont a été gravement endommagé pendant la tempête.", 'damaged pour un objet.', 'damaged is for objects.'),
  CH2('The printer needs a new ink ___.', ['cartridge', 'cartouche'], 0, "L'imprimante a besoin d'une nouvelle cartouche d'encre.", 'cartouche (français) = cartridge.', 'the correct English spelling is cartridge.'),
  CH2('I have a ___ in the afternoon: a talk about solar power.', ['reading', 'lecture'], 1, "J'ai un cours magistral cet après-midi : une conférence sur l'énergie solaire.", 'lecture = cours magistral.', 'lecture = talk given to students.'),
  CH2('His speech was very ___ and many people cried.', ['moving', 'emotioning'], 0, "Son discours était très émouvant et beaucoup de gens ont pleuré.", 'moving = émouvant ; emotioning n\'existe pas.', 'moving = causing strong feelings; emotioning does not exist.')
];
const A = SK('Faux amis essentiels', 'Essential false friends');
const B = SK('Paires confusantes : affect / effect, principal / principle...', 'Confusing pairs: affect / effect, principal / principle...');
export const G21 = {
  id: 'G21',
  title: 'Faux amis et mots confusants (False Friends)',
  coursUrl: '',
  skills: {
    '*': A,
    'g21-guidee-b': B, 'g21-niv-b': B, 'g21-m21a-2': B,
    'g21-niv-c': SK('Faux amis : thème', 'False friends: translation'), 'g21-th': SK('Faux amis : thème', 'False friends: translation'),
    'g21-niv-d': SK('Faux amis : repérer et corriger', 'False friends: spotting and correcting'),
    'g21-bonus': SK('Faux amis moins connus', 'Less obvious false friends'),
    'g21-m21b': SK('Ordre des mots', 'Word order'),
    'g21-vf': SK('Faux amis : vrai ou faux', 'False friends: true or false'),
    'g21-trou': SK('Faux amis moins connus', 'Less obvious false friends'),
    'g21-spot': SK('Faux amis : repérer et corriger', 'False friends: spotting and correcting'),
    'g21-choix': SK('Faux amis : choisir le bon mot', 'False friends: choosing the right word')
  },
  sets: [
    S('g21-guidee-a', FICHE, ['Série guidée A : faux amis en contexte', 'Guided set A: false friends in context'], 'B1', ['Complète avec le mot anglais qui correspond à la définition.', 'Complete with the English word that matches the definition.'], guideeA),
    S('g21-guidee-b', FICHE, ['Série guidée B : paires confusantes', 'Guided set B: confusing pairs'], 'B1+', ['Choisis le bon mot.', 'Choose the right word.'], guideeB),
    S('g21-niv-a', FICHE, ['Niveau A : faux amis classiques', 'Level A: classic false friends'], 'B1', ['Corrige la phrase ou complète-la.', 'Correct the sentence or complete it.'], nivA),
    S('g21-niv-b', FICHE, ['Niveau B : paires confusantes en contexte', 'Level B: confusing pairs in context'], 'B1+', ['Choisis le bon mot, ou corrige la phrase si nécessaire.', 'Choose the right word, or correct the sentence if needed.'], nivB),
    S('g21-niv-c', FICHE, ['Niveau C : thème sans faux amis', 'Level C: translation without false friends'], 'B1+', ['Traduis en évitant les faux amis, puis compare avec le modèle.', 'Translate avoiding false friends, then compare with the model.'], nivC),
    S('g21-niv-d', FICHE, ['Niveau D : repérer les faux amis dans un texte', 'Level D: spotting false friends in a text'], 'B2', ['Corrige chaque phrase du texte.', 'Correct each sentence of the text.'], nivD),
    S('g21-bonus', FICHE, ['Bonus : faux amis moins connus', 'Bonus: less obvious false friends'], 'B2', ['Donne le sens réel, puis compare avec le modèle.', 'Give the real meaning, then compare with the model.'], bonus),
    S('g21-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter.', 'Fifteen sentences to complete.'], devoir),
    S('g21-vf', FICHE, ['Vrai ou faux ?', 'True or false?'], 'B1+', ['Dis si l\'affirmation est vraie ou fausse.', 'Say whether the statement is true or false.'], vf),
    S('g21-trou', FICHE, ['Phrases à trous : autres faux amis', 'Gap-fill: more false friends'], 'B1+', ['Complète avec le mot anglais qui correspond.', 'Complete with the matching English word.'], trou),
    S('g21-spot', FICHE, ['Repère l\'erreur', 'Spot the error'], 'B2', ['Corrige la phrase si elle est fausse, recopie-la si elle est correcte.', 'Correct the sentence if it is wrong, copy it if it is correct.'], spot),
    S('g21-choix', FICHE, ['Choisis le bon mot', 'Choose the right word'], 'B1+', ['Choisis le mot qui convient.', 'Choose the word that fits.'], choix),
    S('g21-m21a-1', MURPHY, ['Unité 21A : faux amis essentiels (1/2)', 'Unit 21A: essential false friends (1/2)'], 'B1', ['Choisis le bon mot anglais.', 'Choose the right English word.'], m21a1),
    S('g21-m21a-2', MURPHY, ['Unité 21A : paires confusantes (2/2)', 'Unit 21A: confusing pairs (2/2)'], 'B1+', ['Choisis le bon mot.', 'Choose the right word.'], m21a2),
    S('g21-m21b', MURPHY, ['Unité 21B : remettre les mots dans l\'ordre', 'Unit 21B: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m21b),
    S('g21-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Faux amis essentiels',
        forms: [
          ['actually', 'en fait (≠ actuellement = currently, at present)'],
          ['eventually', 'finalement (≠ éventuellement = possibly, if needed)'],
          ['library', 'bibliothèque (≠ librairie = bookshop)'],
          ['sensible', 'raisonnable (≠ sensible = sensitive)'],
          ['sympathetic', 'compréhensif (≠ sympathique = nice, friendly)'],
          ['pretend', 'faire semblant (≠ prétendre = claim)'],
          ['attend', 'assister à (assist = aider)'],
          ['demand', 'exiger (≠ demander = ask, request)'],
          ['deceive / disappoint', 'tromper / décevoir'],
          ['proper / large', 'convenable (≠ propre = clean) / grand (≠ large = wide)']
        ],
        uses: ['Méfie-toi d\'un mot anglais qui ressemble au français.']
      },
      {
        title: 'Paires confusantes',
        forms: [
          ['affect / effect', 'verbe / nom'],
          ['principal / principle', 'principal / principe'],
          ['complement / compliment', 'compléter / féliciter'],
          ['economic / economical', 'relatif à l\'économie / économe'],
          ['advice / advise', 'nom / verbe'],
          ['stationary / stationery', 'immobile / papeterie'],
          ['historic / historical', 'marquant / relatif au passé']
        ],
        uses: []
      }
    ],
    tables: [],
    notes: ['demand ne se construit pas avec objet + to : ask somebody to, ou demand that.'],
    rule: 'actually ≠ actuellement ; eventually ≠ éventuellement.'
  },
  enMeta: {
    title: 'False Friends & Confusing Words',
    recap: {
      blocks: [
        {
          title: 'Essential false friends',
          forms: [
            ['actually', 'in fact (≠ French actuellement = currently, at present)'],
            ['eventually', 'in the end (≠ French éventuellement = possibly, if needed)'],
            ['library', 'place to borrow books (≠ French librairie = bookshop)'],
            ['sensible', 'reasonable (≠ French sensible = sensitive)'],
            ['sympathetic', 'understanding (≠ French sympathique = nice, friendly)'],
            ['pretend', 'act as if (≠ French prétendre = claim)'],
            ['attend', 'be present at (assist = help)'],
            ['demand', 'require firmly (≠ French demander = ask, request)'],
            ['deceive / disappoint', 'trick / let down'],
            ['proper / large', 'appropriate (≠ French propre = clean) / big (≠ French large = wide)']
          ],
          uses: ['Be wary of an English word that looks like a French one.']
        },
        {
          title: 'Confusing pairs',
          forms: [
            ['affect / effect', 'verb / noun'],
            ['principal / principle', 'main / rule'],
            ['complement / compliment', 'complete / praise'],
            ['economic / economical', 'relating to the economy / cheap to run'],
            ['advice / advise', 'noun / verb'],
            ['stationary / stationery', 'not moving / paper and pens'],
            ['historic / historical', 'significant / relating to the past']
          ],
          uses: []
        }
      ],
      tables: [],
      notes: ['demand is not followed by object + to: use ask somebody to, or demand that.'],
      rule: 'actually ≠ currently; eventually ≠ possibly.'
    }
  }
};
