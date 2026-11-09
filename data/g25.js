// G25 : Relative clauses (d'après les fiches complémentaires rc001 à rc005 et le rappel du hub)
import { S, FICHE, F, OK, R, P, K, SK } from './dsl2.js';
import { ch, E } from './dsl.js';

const CHR = (s, o, k, fr, why, whyEn) => ch(s, o, k, fr, why, E(whyEn, null, { s, o }));
const WHO = ['who : personne, sujet de la relative.', 'who: a person, subject of the relative clause.'];
const WHOM = ['whom ou who : personne, objet de la relative (whom est plus formel).', 'whom or who: a person, object of the relative clause (whom is more formal).'];
const WHSE = ['whose : possession, devant un nom (the man whose car...).', 'whose: possession, before a noun (the man whose car...).'];
const WHR = ['where : lieu.', 'where: a place.'];
const WHN = ['when : temps (the day when...).', 'when: time (the day when...).'];
const WHY = ['why : raison (the reason why...).', 'why: reason (the reason why...).'];
const THW = ['which ou that : chose ; après une virgule, seulement which.', 'which or that: a thing; after a comma, only which.'];
const THP = ['who ou that : personne ; après une virgule, seulement who.', 'who or that: a person; after a comma, only who.'];

const guideeA = [
  K('Is he the person ___ lives with you?', [['who', 'that']], "Est-ce la personne qui habite avec toi ?", ...THP),
  K('The man called his wife, ___ picked up the phone.', [['who']], "L'homme a appelé sa femme, qui a décroché.", ...WHO),
  K('Can you tell me about the policeman, ___ you spoke with this morning?', [['whom', 'who']], "Peux-tu me parler du policier avec qui tu as parlé ce matin ?", ...WHOM),
  K('Food ___ is imported from other countries is often more expensive than local food.', [['that', 'which']], "Les aliments importés d'autres pays sont souvent plus chers que les produits locaux.", ...THW),
  K('The cake ___ my mother made tasted really great.', [['that', 'which']], "Le gâteau que ma mère a fait était vraiment délicieux.", ...THW),
  K('The fireman rescued the girl ___ was trapped on the third floor.', [['who', 'that']], "Le pompier a sauvé la fille qui était coincée au troisième étage.", ...THP),
  K('I often visit my grandparents, ___ live a few blocks down the street.', [['who']], "Je rends souvent visite à mes grands-parents, qui habitent à quelques rues d'ici.", ...WHO),
  K('Avatar, ___ we saw a few days ago, won several Oscars.', [['which']], "Avatar, que nous avons vu il y a quelques jours, a remporté plusieurs Oscars.", 'which : chose ; après une virgule, that est impossible.', 'which: a thing; after a comma, that is impossible.'),
  K('I visited one of my uncles, ___ lives on the other side of town.', [['who']], "J'ai rendu visite à l'un de mes oncles, qui habite de l'autre côté de la ville.", ...WHO),
  K('Most of the people ___ she met were asylum seekers.', [['whom', 'who', 'that']], "La plupart des personnes qu'elle a rencontrées étaient des demandeurs d'asile.", ...WHOM),
  K('My classmate, ___ studied hard for the test, failed.', [['who']], "Mon camarade de classe, qui avait beaucoup travaillé pour l'examen, a échoué.", ...WHO),
  K('The man ___ sold me the car is my neighbour.', [['who', 'that']], "L'homme qui m'a vendu la voiture est mon voisin.", ...THP)
];
const guideeB = [
  K('The man, ___ wife is a famous violinist, can play the piano himself.', [['whose']], "L'homme, dont la femme est une célèbre violoniste, sait aussi jouer du piano.", ...WHSE),
  K('The Johnson family, ___ son moved to the U.K., lives in Canada.', [['whose']], "La famille Johnson, dont le fils a déménagé au Royaume-Uni, vit au Canada.", ...WHSE),
  K("The bad weather is the reason ___ I didn't come to practice yesterday.", [['why', 'that']], "Le mauvais temps est la raison pour laquelle je ne suis pas venu à l'entraînement hier.", ...WHY),
  K('I know a great restaurant ___ we can get good food.', [['where']], "Je connais un excellent restaurant où l'on mange bien.", ...WHR),
  K('The policeman talked to the children ___ mothers were waiting outside.', [['whose']], "Le policier a parlé aux enfants dont les mères attendaient dehors.", ...WHSE),
  K('I helped the old lady ___ books fell on the floor.', [['whose']], "J'ai aidé la vieille dame dont les livres sont tombés par terre.", ...WHSE),
  K('Do you know ___ there are no elephants in South America?', [['why']], "Sais-tu pourquoi il n'y a pas d'éléphants en Amérique du Sud ?", ...WHY),
  K('My parents remember the time ___ there was no internet.', [['when', 'that']], "Mes parents se souviennent de l'époque où internet n'existait pas.", ...WHN),
  K('The woman ___ dog barks all the time lives together with her daughter.', [['whose']], "La femme dont le chien aboie tout le temps vit avec sa fille.", ...WHSE),
  K('My dad knows a man ___ brother works in the White House.', [['whose']], "Mon père connaît un homme dont le frère travaille à la Maison-Blanche.", ...WHSE),
  K('The office is a place ___ I can do my work without being disturbed.', [['where']], "Le bureau est un endroit où je peux travailler sans être dérangé.", ...WHR),
  K('Give this medicine to the parents ___ child is ill.', [['whose']], "Donnez ce médicament aux parents dont l'enfant est malade.", ...WHSE),
  K('There is the cafeteria ___ we can have lunch.', [['where']], "Voilà la cafétéria où nous pouvons déjeuner.", ...WHR)
];
const nivA = [
  K('The new movie is about a boy ___ has lost his parents in a car accident.', [['who', 'that']], "Le nouveau film parle d'un garçon qui a perdu ses parents dans un accident de voiture.", ...THP),
  K('He is the young man, ___ wife left him for someone else.', [['whose']], "C'est le jeune homme dont la femme l'a quitté pour quelqu'un d'autre.", ...WHSE),
  K('The DVD recorder ___ I bought at this store a few days ago is not working.', [['which', 'that']], "Le graveur de DVD que j'ai acheté dans ce magasin il y a quelques jours ne fonctionne pas.", ...THW),
  K("That's the book ___ I recommended reading in class.", [['that', 'which']], "C'est le livre dont j'ai recommandé la lecture en classe.", ...THW),
  K('Is this the hotel ___ you are staying for the tournament?', [['where']], "Est-ce l'hôtel où vous logez pour le tournoi ?", ...WHR),
  K('My dad, ___ travels a lot on business, is in Australia at the moment.', [['who']], "Mon père, qui voyage beaucoup pour son travail, est en Australie en ce moment.", ...WHO),
  K('It was midnight ___ the first rescue team arrived at the scene of the accident.', [['when']], "Il était minuit quand la première équipe de secours est arrivée sur les lieux de l'accident.", ...WHN),
  K('There are several reasons ___ I am not allowed to give you any information.', [['why', 'that']], "Il y a plusieurs raisons pour lesquelles je n'ai pas le droit de vous donner d'informations.", ...WHY),
  K('We stayed at the famous Rockstar hotel, ___ also had an indoor swimming pool.', [['which']], "Nous avons séjourné au célèbre hôtel Rockstar, qui avait aussi une piscine couverte.", 'which : chose ; après une virgule, that est impossible.', 'which: a thing; after a comma, that is impossible.'),
  K('Did you write back to the person ___ offered you a job?', [['who', 'that']], "As-tu répondu à la personne qui t'a proposé un emploi ?", ...THP)
];
const nivB = [
  K('The story is about a young woman ___ 5-year-old son suddenly disappears.', [['whose']], "L'histoire parle d'une jeune femme dont le fils de 5 ans disparaît soudain.", ...WHSE),
  K('The tennis court ___ they usually play is currently not available.', [['where']], "Le court de tennis où ils jouent habituellement n'est pas disponible actuellement.", ...WHR),
  K('My sister was born at a time ___ my dad was out of work.', [['when', 'that']], "Ma sœur est née à une époque où mon père était au chômage.", ...WHN),
  K('Where is the money ___ I gave you yesterday?', [['that', 'which']], "Où est l'argent que je t'ai donné hier ?", ...THW),
  K("That's the man ___ I spoke to the other day.", [['whom', 'who', 'that']], "C'est l'homme à qui j'ai parlé l'autre jour.", ...WHOM),
  K('Mr. Fields, ___ sister is one of the leading experts in this country, talked about the dangers of the virus.', [['whose']], "M. Fields, dont la sœur est l'une des principales expertes du pays, a parlé des dangers du virus.", ...WHSE),
  K("He didn't tell us ___ he made such an irresponsible decision.", [['why']], "Il ne nous a pas dit pourquoi il avait pris une décision aussi irresponsable.", ...WHY),
  K('The present ___ I got from my boyfriend was really fantastic.', [['that', 'which']], "Le cadeau que j'ai reçu de mon petit ami était vraiment fantastique.", ...THW),
  K('I have to buy a present for my mother, ___ birthday is next week.', [['whose']], "Je dois acheter un cadeau pour ma mère, dont l'anniversaire est la semaine prochaine.", ...WHSE),
  K('The youth hostel ___ we stayed last week was really big.', [['where']], "L'auberge de jeunesse où nous avons séjourné la semaine dernière était vraiment grande.", ...WHR)
];
const nivC = [
  CHR('The report ___ I wrote last week has been approved.', ['which', 'whose'], 0, "Le rapport que j'ai rédigé la semaine dernière a été approuvé.", 'which : chose, objet de la relative.', 'which: a thing, object of the relative clause.'),
  CHR('My neighbour, ___ is a retired pilot, taught me to fly a kite.', ['that', 'who'], 1, "Mon voisin, qui est pilote à la retraite, m'a appris à faire voler un cerf-volant.", 'Après une virgule (non-defining), that est impossible : who.', 'After a comma (non-defining), that is impossible: who.'),
  CHR('The student ___ project won the prize is my cousin.', ['who', 'whose'], 1, "L'étudiant dont le projet a remporté le prix est mon cousin.", ...WHSE),
  CHR('This is the village ___ my grandparents were born.', ['where', 'which'], 0, "C'est le village où mes grands-parents sont nés.", ...WHR),
  CHR('The year ___ we moved to Lille was very difficult.', ['where', 'when'], 1, "L'année où nous avons déménagé à Lille a été très difficile.", ...WHN),
  CHR('Nobody knows the reason ___ the machine stopped.', ['why', 'how'], 0, "Personne ne connaît la raison pour laquelle la machine s'est arrêtée.", ...WHY),
  CHR('My laptop, ___ I bought in 2022, still works perfectly.', ['that', 'which'], 1, "Mon ordinateur, que j'ai acheté en 2022, fonctionne encore parfaitement.", 'Après une virgule, that est impossible : which.', 'After a comma, that is impossible: which.'),
  CHR('The woman to ___ I sent the email never replied.', ['whom', 'who'], 0, "La femme à qui j'ai envoyé le courriel n'a jamais répondu.", 'Après une préposition, whom est obligatoire.', 'After a preposition, whom is required.'),
  CHR('Everything ___ he said was true.', ['what', 'that'], 1, "Tout ce qu'il a dit était vrai.", 'Après everything, all, nothing : that, jamais what.', 'After everything, all, nothing: that, never what.'),
  CHR('The engineer ___ designed the bridge received an award.', ['whose', 'who'], 1, "L'ingénieur qui a conçu le pont a reçu un prix.", ...WHO)
];
const nivD = [
  F('The woman which lives upstairs is a nurse.', ['The woman who lives upstairs is a nurse.', 'The woman that lives upstairs is a nurse.'], "La femme qui habite à l'étage est infirmière.", 'Pour une personne : who ou that, pas which.', 'For a person: who or that, not which.'),
  F('My brother, that lives in Berlin, is an architect.', ['My brother, who lives in Berlin, is an architect.'], "Mon frère, qui vit à Berlin, est architecte.", 'Après une virgule, that est impossible : who.', 'After a comma, that is impossible: who.'),
  F('The book what I bought was expensive.', ['The book that I bought was expensive.', 'The book which I bought was expensive.', 'The book I bought was expensive.'], "Le livre que j'ai acheté était cher.", 'What n\'est pas un pronom relatif ici : that ou which.', 'What is not a relative pronoun here: that or which.'),
  F('This is the teacher whose I told you about.', ['This is the teacher whom I told you about.', 'This is the teacher who I told you about.', 'This is the teacher that I told you about.', 'This is the teacher I told you about.', 'This is the teacher about whom I told you.'], "Voici le professeur dont je t'ai parlé.", 'whose se place devant un nom ; ici il faut who, whom ou that (ou rien).', 'whose goes before a noun; here use who, whom or that (or nothing).'),
  F('The man whom wife called is my uncle.', ['The man whose wife called is my uncle.'], "L'homme dont la femme a appelé est mon oncle.", 'Possession devant un nom : whose.', 'Possession before a noun: whose.'),
  F('I know a cafe where we can eat there.', ['I know a cafe where we can eat.', 'I know a café where we can eat.'], "Je connais un café où nous pouvons manger.", 'where remplace déjà there : pas de there en plus.', 'where already replaces there: do not add there.'),
  F('The house that we lived in it was small.', ['The house that we lived in was small.', 'The house we lived in was small.', 'The house in which we lived was small.', 'The house which we lived in was small.'], "La maison où nous habitions était petite.", 'Le pronom relatif reprend déjà l\'objet : pas de it en plus.', 'The relative pronoun already stands for the object: do not add it.'),
  OK('The film we saw last night was brilliant.', "Le film que nous avons vu hier soir était génial.", 'Pronom omis : correct pour un objet dans une relative déterminative.', 'Omitted pronoun: correct for an object in a defining relative clause.'),
  F('She gave me everything what she had.', ['She gave me everything that she had.', 'She gave me everything she had.'], "Elle m'a donné tout ce qu'elle avait.", 'Après everything : that, jamais what.', 'After everything: that, never what.'),
  F('The city where I was born it is in Spain.', ['The city where I was born is in Spain.', 'The city in which I was born is in Spain.'], "La ville où je suis né est en Espagne.", 'Pas de pronom sujet en plus après la relative.', 'No extra subject pronoun after the relative clause.'),
  OK('My sister, who works at the hospital, called me.', "Ma sœur, qui travaille à l'hôpital, m'a appelé.", 'Non-defining avec who et deux virgules : correct.', 'Non-defining with who and two commas: correct.')
];
const IN = 'Combine the two sentences into one using a relative pronoun.';
const mk = (s, m, h, hEn) => P('Combine les deux phrases en une seule avec un pronom relatif.', s, m, h, IN, hEn);
const combA = [
  mk('We talked about the party. Sarah wants to organize it for my birthday.', ['We talked about the party that Sarah wants to organize for my birthday.', 'We talked about the party which Sarah wants to organize for my birthday.', 'We talked about the party Sarah wants to organize for my birthday.'], "Le pronom est objet : tu peux l'omettre.", 'The pronoun is an object: you may leave it out.'),
  mk('Mrs Flowers has paintings in her house. They are worth over $10,000.', ['Mrs Flowers has paintings in her house that are worth over $10,000.', 'Mrs Flowers has paintings in her house which are worth over $10,000.', 'Mrs Flowers has paintings that are worth over $10,000 in her house.'], "Le pronom est sujet : il ne s'omet pas.", 'The pronoun is a subject: it cannot be left out.'),
  mk('The couple lives next to us. Their daughter has two charming boys.', ['The couple whose daughter has two charming boys lives next to us.', 'The couple, whose daughter has two charming boys, lives next to us.'], "Possession : quel pronom relatif ?", 'Possession: which relative pronoun?'),
  mk('This is the house. I had my first party here.', ['This is the house where I had my first party.', 'This is the house in which I had my first party.'], "Lieu.", 'A place.'),
  mk('Jerry received a bad mark on his essay. It was only one page long.', ['Jerry received a bad mark on his essay, which was only one page long.'], "Information supplémentaire entre virgules.", 'Extra information, with a comma.'),
  mk('Ingrid went to see the doctor yesterday. He is a friend of hers.', ['Ingrid went to see the doctor, who is a friend of hers, yesterday.', 'Yesterday Ingrid went to see the doctor, who is a friend of hers.', 'Ingrid went to see the doctor, who is a friend of hers.'], "Information supplémentaire sur une personne.", 'Extra information about a person.'),
  mk('Mr Reynolds had to do all the work himself. His secretary left a few days ago.', ['Mr Reynolds, whose secretary left a few days ago, had to do all the work himself.', 'Mr Reynolds, whose secretary had left a few days ago, had to do all the work himself.'], "Possession entre virgules.", 'Possession between commas.'),
  mk('The boy took the photograph. He gave it to his mother.', ['The boy took the photograph, which he gave to his mother.', 'The boy gave his mother the photograph, which he had taken.'], "Deux actions successives du même garçon.", 'Two successive actions by the same boy.'),
  mk('That is the man. I met him at Alice\'s party.', ["That is the man whom I met at Alice's party.", "That is the man who I met at Alice's party.", "That is the man that I met at Alice's party.", "That is the man I met at Alice's party."], "Objet : plusieurs formes possibles.", 'Object: several forms are possible.'),
  mk('The boy smiled. Elena gave him some money.', ['The boy to whom Elena gave some money smiled.', 'The boy who Elena gave some money to smiled.', 'The boy that Elena gave some money to smiled.', 'The boy Elena gave some money to smiled.'], "Attention à la préposition to.", 'Mind the preposition to.'),
  mk('Steven is an architect. His designs have won many awards.', ['Steven is an architect whose designs have won many awards.', 'Steven, whose designs have won many awards, is an architect.'], "Possession.", 'Possession.'),
  mk('Decorating is a difficult job. I hate it.', ['Decorating is a difficult job that I hate.', 'Decorating is a difficult job which I hate.', 'Decorating is a difficult job I hate.', 'I hate decorating, which is a difficult job.'], "Deux constructions possibles.", 'Two constructions are possible.'),
  mk('Christmas is a day. People are happy.', ['Christmas is a day when people are happy.', 'Christmas is a day that people are happy.', 'Christmas is a day on which people are happy.'], "Temps.", 'Time.'),
  mk('We went to the restaurant. We had met there before.', ['We went to the restaurant where we had met before.', 'We went to the restaurant at which we had met before.'], "Lieu.", 'A place.'),
  mk('The woman called yesterday. She wants to buy the house.', ['The woman who wants to buy the house called yesterday.', 'The woman who called yesterday wants to buy the house.'], "Deux combinaisons possibles : choisis-en une.", 'Two combinations are possible: choose one.')
];
const combB = [
  mk('The police arrested the man. He murdered his wife.', ['The police arrested the man who murdered his wife.', 'The police arrested the man that murdered his wife.'], "Personne, sujet.", 'A person, subject.'),
  mk("I can't remember the name of the street. I lost my passport there.", ["I can't remember the name of the street where I lost my passport.", "I can't remember the name of the street in which I lost my passport."], "Lieu.", 'A place.'),
  mk('Where are the shoes? I bought them yesterday.', ['Where are the shoes that I bought yesterday?', 'Where are the shoes which I bought yesterday?', 'Where are the shoes I bought yesterday?'], "Objet : le pronom peut disparaître.", 'Object: the pronoun may disappear.'),
  mk('The book is very interesting. I borrowed it from the library.', ['The book that I borrowed from the library is very interesting.', 'The book which I borrowed from the library is very interesting.', 'The book I borrowed from the library is very interesting.'], "Objet.", 'Object.'),
  mk("I'll never forget the day. I got my first bike on that day.", ["I'll never forget the day when I got my first bike.", "I'll never forget the day that I got my first bike.", "I'll never forget the day I got my first bike.", "I'll never forget the day on which I got my first bike."], "Temps.", 'Time.'),
  mk('This is the man. His dog bit me.', ['This is the man whose dog bit me.'], "Possession.", 'Possession.'),
  mk('The pupils missed the test. They came late.', ['The pupils who came late missed the test.', 'The pupils that came late missed the test.'], "Personnes, sujet, au milieu de la phrase.", 'People, subject, inside the sentence.'),
  mk('This is my boyfriend. His father works at Macy\'s.', ["This is my boyfriend, whose father works at Macy's.", "This is my boyfriend whose father works at Macy's."], "Possession.", 'Possession.'),
  mk('That man is a politician. I forgot his name.', ['That man, whose name I forgot, is a politician.'], "Possession : whose + nom.", 'Possession: whose + noun.'),
  mk("I'll show you the church. I got married there.", ["I'll show you the church where I got married.", "I'll show you the church in which I got married."], "Lieu.", 'A place.'),
  mk('The actor is very famous. I met him a few days ago.', ['The actor whom I met a few days ago is very famous.', 'The actor who I met a few days ago is very famous.', 'The actor that I met a few days ago is very famous.', 'The actor I met a few days ago is very famous.'], "Objet : plusieurs formes possibles.", 'Object: several forms are possible.'),
  mk('I have a new camera. I bought it last week.', ['I have a new camera which I bought last week.', 'I have a new camera that I bought last week.', 'I have a new camera I bought last week.'], "Objet.", 'Object.'),
  mk('I passed the entrance test. That is quite difficult to do.', ['I passed the entrance test, which is quite difficult to do.', 'I passed the entrance test, which is quite difficult.'], "La relative commente toute la phrase, ou le nom : quelle virgule ?", 'The relative clause comments on the noun: mind the comma.'),
  mk('My friend invited many people. His house is huge.', ['My friend, whose house is huge, invited many people.', 'My friend whose house is huge invited many people.'], "Possession.", 'Possession.'),
  mk('John belongs to a group of people. They send food packages to Africa.', ['John belongs to a group of people who send food packages to Africa.', 'John belongs to a group of people that send food packages to Africa.'], "Personnes, sujet.", 'People, subject.')
];
const combC = [
  mk('That is the man. I spoke to him the other day.', ['That is the man to whom I spoke the other day.', 'That is the man whom I spoke to the other day.', 'That is the man who I spoke to the other day.', 'That is the man that I spoke to the other day.', 'That is the man I spoke to the other day.'], "Objet avec préposition.", 'Object with a preposition.'),
  mk('They elected a new mayor. His aim is to help the poor.', ['They elected a new mayor whose aim is to help the poor.'], "Possession.", 'Possession.'),
  mk('I really like the car. I bought it last year.', ['I really like the car that I bought last year.', 'I really like the car which I bought last year.', 'I really like the car I bought last year.'], "Objet.", 'Object.'),
  mk('Mr Black took over the company. His wife died last year.', ['Mr Black, whose wife died last year, took over the company.'], "Possession entre virgules.", 'Possession between commas.'),
  mk('The restaurant is the best in town. We usually eat there.', ['The restaurant where we usually eat is the best in town.', 'The restaurant in which we usually eat is the best in town.'], "Lieu.", 'A place.'),
  mk('The film is about a woman. Her son mysteriously disappears.', ['The film is about a woman whose son mysteriously disappears.'], "Possession.", 'Possession.'),
  mk('That is the place. I grew up there.', ['That is the place where I grew up.', 'That is the place in which I grew up.'], "Lieu.", 'A place.'),
  mk('I met a woman. Her husband is a famous producer.', ['I met a woman whose husband is a famous producer.'], "Possession.", 'Possession.'),
  mk('The man was arrested yesterday. He escaped from prison a week ago.', ['The man who escaped from prison a week ago was arrested yesterday.', 'The man that escaped from prison a week ago was arrested yesterday.'], "Personne, sujet.", 'A person, subject.'),
  mk('The bag is heavy. It contains a lot of presents.', ['The bag, which contains a lot of presents, is heavy.', 'The bag that contains a lot of presents is heavy.', 'The bag which contains a lot of presents is heavy.'], "Chose, sujet.", 'A thing, subject.'),
  mk('The Marybelle Hotel is opening up again. I stayed there a few years ago.', ['The Marybelle Hotel, where I stayed a few years ago, is opening up again.'], "Nom propre : relative entre virgules.", 'Proper noun: relative clause between commas.'),
  mk("My friend's father gave us the tickets. He owns a travel agency.", ["My friend's father, who owns a travel agency, gave us the tickets."], "Information supplémentaire.", 'Extra information.'),
  mk('Mr Honeywell is a good teacher. Everyone likes him.', ['Mr Honeywell, whom everyone likes, is a good teacher.', 'Mr Honeywell, who everyone likes, is a good teacher.', 'Mr Honeywell is a good teacher whom everyone likes.', 'Mr Honeywell is a good teacher who everyone likes.', 'Mr Honeywell is a good teacher everyone likes.'], "Objet : plusieurs formes possibles.", 'Object: several forms are possible.'),
  mk('The exercise was very complicated. Nobody could do it.', ['The exercise that nobody could do was very complicated.', 'The exercise which nobody could do was very complicated.', 'The exercise nobody could do was very complicated.'], "Objet.", 'Object.'),
  mk("That's the producer. His films are always a great success.", ["That's the producer whose films are always a great success.", 'That is the producer whose films are always a great success.'], "Possession.", 'Possession.')
];
const bonus = [
  R("L'ingénieur dont l'équipe a conçu ce capteur est venu hier.", ['The engineer whose team designed this sensor came yesterday.', 'The engineer whose team designed this sensor visited yesterday.', 'The engineer whose team designed this sensor came here yesterday.'], 'dont (possession) = whose.', 'dont (possession) = whose.'),
  R("C'est la raison pour laquelle je ne suis pas venu.", ["That is the reason why I did not come.", "That's the reason why I didn't come.", "That is the reason I did not come.", "That's the reason I didn't come.", "This is the reason why I didn't come.", "That is the reason that I did not come."], 'pour laquelle après reason = why, that ou rien.', 'pour laquelle after reason = why, that or nothing.'),
  R("La ville où j'ai grandi est très calme.", ['The town where I grew up is very quiet.', 'The city where I grew up is very quiet.', 'The town I grew up in is very quiet.', 'The city I grew up in is very quiet.', 'The town in which I grew up is very quiet.', 'The city in which I grew up is very quiet.'], 'où (lieu) = where, ou préposition en fin de phrase.', 'a place relative clause = where, or a stranded preposition.'),
  R("Mon voisin, qui est médecin, m'a aidé.", ['My neighbour, who is a doctor, helped me.', 'My neighbor, who is a doctor, helped me.'], 'Relative non déterminative : who entre virgules.', 'Non-defining relative clause: who between commas.'),
  R("Le livre dont tu parles est épuisé.", ['The book you are talking about is out of print.', 'The book that you are talking about is out of print.', 'The book which you are talking about is out of print.', 'The book you are talking about is sold out.', 'The book that you are talking about is sold out.', 'The book about which you are talking is out of print.', 'The book you are talking about is out of stock.'], 'dont (complément de parler de) = préposition about, souvent en fin de relative.', 'dont (complement of parler de) = preposition about, often at the end of the clause.'),
  R("Les étudiants à qui j'ai écrit n'ont pas répondu.", ['The students I wrote to have not replied.', "The students I wrote to haven't replied.", 'The students I wrote to did not reply.', "The students I wrote to didn't reply.", 'The students to whom I wrote have not replied.', "The students to whom I wrote haven't replied.", 'The students to whom I wrote did not reply.', 'The students whom I wrote to have not replied.', 'The students who I wrote to have not replied.', "The students who I wrote to haven't replied.", "The students whom I wrote to haven't replied."], 'à qui = to whom (formel) ou préposition en fin de phrase.', 'to + person = to whom (formal) or a stranded preposition.'),
  R("La réunion, qui a duré trois heures, était inutile.", ['The meeting, which lasted three hours, was useless.', 'The meeting, which lasted for three hours, was useless.', 'The meeting, which went on for three hours, was useless.', 'The meeting, which took three hours, was useless.'], 'Relative non déterminative sur une chose : which entre virgules.', 'Non-defining relative clause about a thing: which between commas.'),
  R("Je connais quelqu'un dont le frère travaille chez Airbus.", ['I know someone whose brother works at Airbus.', 'I know somebody whose brother works at Airbus.', 'I know someone whose brother works for Airbus.', 'I know somebody whose brother works for Airbus.'], 'dont + nom (possession) = whose.', 'dont + noun (possession) = whose.')
];
const A = SK('Choisir le pronom relatif', 'Choosing the relative pronoun');
export const G25 = {
  id: 'G25',
  title: 'Propositions relatives (Relative Clauses)',
  coursUrl: '',
  skills: {
    '*': A,
    'g25-guidee-b': SK('Whose, where, when, why', 'Whose, where, when, why'),
    'g25-niv-b': SK('Whose, where, when, why', 'Whose, where, when, why'),
    'g25-niv-c': SK('Défini ou non défini : that, which, who', 'Defining or non-defining: that, which, who'),
    'g25-niv-d': SK('Relatives : repérer et corriger', 'Relative clauses: spotting and correcting'),
    'g25-comb-a': SK('Relier deux phrases', 'Combining two sentences'), 'g25-comb-b': SK('Relier deux phrases', 'Combining two sentences'), 'g25-comb-c': SK('Relier deux phrases', 'Combining two sentences'),
    'g25-bonus': SK('Relatives : thème', 'Relative clauses: translation')
  },
  sets: [
    S('g25-guidee-a', FICHE, ['Série guidée A : who, whom, which, that', 'Guided set A: who, whom, which, that'], 'B1', ['Complète avec le pronom relatif qui convient.', 'Complete with the right relative pronoun.'], guideeA),
    S('g25-guidee-b', FICHE, ['Série guidée B : whose, where, when, why', 'Guided set B: whose, where, when, why'], 'B1', ['Complète avec le pronom ou l\'adverbe relatif qui convient.', 'Complete with the right relative pronoun or adverb.'], guideeB),
    S('g25-niv-a', FICHE, ['Niveau A : tous les pronoms (1/2)', 'Level A: all the pronouns (1/2)'], 'B1', ['Complète avec le pronom relatif qui convient.', 'Complete with the right relative pronoun.'], nivA),
    S('g25-niv-b', FICHE, ['Niveau B : tous les pronoms (2/2)', 'Level B: all the pronouns (2/2)'], 'B1+', ['Complète avec le pronom relatif qui convient.', 'Complete with the right relative pronoun.'], nivB),
    S('g25-niv-c', FICHE, ['Niveau C : choisis le bon pronom', 'Level C: choose the right pronoun'], 'B1+', ['Choisis le pronom qui convient.', 'Choose the pronoun that fits.'], nivC),
    S('g25-niv-d', FICHE, ['Niveau D : repère l\'erreur', 'Level D: spot the error'], 'B2', ['Corrige la phrase si elle est fausse, recopie-la si elle est correcte.', 'Correct the sentence if it is wrong, copy it if it is correct.'], nivD),
    S('g25-comb-a', FICHE, ['Relier A : une seule phrase (1/3)', 'Combine A: one sentence (1/3)'], 'B1+', ['Combine les deux phrases, puis compare avec les modèles et évalue-toi.', 'Combine the two sentences, then compare with the models and assess yourself.'], combA),
    S('g25-comb-b', FICHE, ['Relier B : une seule phrase (2/3)', 'Combine B: one sentence (2/3)'], 'B1+', ['Combine les deux phrases, puis compare avec les modèles et évalue-toi.', 'Combine the two sentences, then compare with the models and assess yourself.'], combB),
    S('g25-comb-c', FICHE, ['Relier C : une seule phrase (3/3)', 'Combine C: one sentence (3/3)'], 'B2', ['Combine les deux phrases, puis compare avec les modèles et évalue-toi.', 'Combine the two sentences, then compare with the models and assess yourself.'], combC),
    S('g25-bonus', FICHE, ['Bonus : thème', 'Bonus: translation'], 'B2', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], bonus)
  ],
  recap: {
    blocks: [
      {
        title: 'Les pronoms et adverbes relatifs',
        forms: [
          ['who', 'personne, sujet'],
          ['whom', 'personne, objet (formel) ; obligatoire après une préposition'],
          ['which', 'chose, sujet ou objet'],
          ['that', 'personne ou chose, déterminative seulement, jamais après une virgule'],
          ['whose', 'possession, devant un nom'],
          ['where / when / why', 'lieu / temps / raison']
        ],
        uses: ['Le pronom objet peut disparaître dans une relative déterminative : the film we saw.']
      },
      {
        title: 'Déterminative ou non déterminative',
        forms: [
          ['sans virgule', 'information essentielle : that est possible'],
          ['entre virgules', 'information supplémentaire : who ou which, jamais that']
        ],
        uses: ['Après everything, all, nothing : that, jamais what.']
      }
    ],
    tables: [],
    notes: ['Pas de pronom en plus dans la relative : the house we lived in, pas the house we lived in it.'],
    rule: 'Identifie le nom (personne ou chose), la fonction (sujet, objet, possession) et le type de relative.'
  },
  enMeta: {
    title: 'Relative Clauses',
    recap: {
      blocks: [
        {
          title: 'Relative pronouns and adverbs',
          forms: [
            ['who', 'a person, subject'],
            ['whom', 'a person, object (formal); required after a preposition'],
            ['which', 'a thing, subject or object'],
            ['that', 'a person or thing, defining clauses only, never after a comma'],
            ['whose', 'possession, before a noun'],
            ['where / when / why', 'place / time / reason']
          ],
          uses: ['The object pronoun may be left out in a defining clause: the film we saw.']
        },
        {
          title: 'Defining or non-defining',
          forms: [
            ['no commas', 'essential information: that is possible'],
            ['between commas', 'extra information: who or which, never that']
          ],
          uses: ['After everything, all, nothing: that, never what.']
        }
      ],
      tables: [],
      notes: ['No extra pronoun inside the clause: the house we lived in, not the house we lived in it.'],
      rule: 'Identify the noun (person or thing), its function (subject, object, possession) and the type of clause.'
    }
  }
};
