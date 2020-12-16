const mongoose = require('mongoose');
const Card = require("../models/card.js");
const Story = require("../models/story.js");

const cards = [
    { text: "When I was a kid, I was very mischeivious." },
    { text: "Once, in 8th standard, I was reading Archie comics during the English class." },
    { text: "The class was doing reading of 'A tale of two cities' in turns." },
    { text: "When my turn came I didn't know where to start from." },
    { text: "Teacher saw me reading the comics." },
    { text: "She took it away, and kept on her desk." },
    { text: "I read my part from the syllabus book,..." },
    { text: "...and took out another copy of my Archie comics." },
    { text: "I don't know why I had two copies!" },
    { text: "My turn for reading was back and I didn't know where to pick-up from, again!" },
    { text: "Teacher saw second comics book in my hand and got confused." },
    { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,..." },
    { text: "...when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    { text: "It has survived not only five centuries,..." },
    { text: "...but also the leap into electronic typesetting, remaining essentially unchanged." },
    { text: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,..." },
    { text: "...and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { text: "Contrary to popular belief, Lorem Ipsum is not simply random text." },
    { text: "It has roots in a piece of classical Latin literature from 45 BC,..." },
    { text: "...making it over 2000 years old." },
    { text: "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,..." },
    { text: "...looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,..." },
    { text: "...and going through the cites of the word in classical literature, discovered the undoubtable source." },
    { text: "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum..." },
    { text: "...(The Extremes of Good and Evil) by Cicero, written in 45 BC." },
    { text: "This book is a treatise on the theory of ethics, very popular during the Renaissance." },
    { text: "The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32." },
    { text: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested." },
    { text: "Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form,..." },
    { text: "...accompanied by English versions from the 1914 translation by H. Rackham." },
    { text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." },
    { text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,..." },
    { text: "...as opposed to using 'Content here, content here', making it look like readable English." },
    { text: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,..." },
    { text: "...and a search for 'lorem ipsum' will uncover many web sites still in their infancy." },
    { text: "Various versions have evolved over the years,..." },
    { text: "sometimes by accident, sometimes on purpose (injected humour and the like)." },
    { text: "There are many variations of passages of Lorem Ipsum available,..." },
    { text: "...but the majority have suffered alteration in some form,..." },
    { text: "...by injected humour, or randomised words which don't look even slightly believable." },
    { text: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text." },
    { text: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,..." },
    { text: "...making this the first true generator on the Internet." },
    { text: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures,..." },
    { text: "...to generate Lorem Ipsum which looks reasonable." },
    { text: "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc." },
    { text: "The entire class was also going ballistic trying to see who would win." },
    { text: "It was just a game of How many books does this, one 8th grader have?" },
    { text: "So at the end of the class she thought she had taken 11 books from me." }
];

const seedDB = () => {
    Card.countDocuments({}, (err, count) => {
        if (err) console.log(err);
        if (count === 0) {
            Story.deleteMany({}, (err) => {
                if (err) console.log(err);
                console.log("Old stories has been deleted!");
            });
            try {
                for (const card of Cards) {
                    Card.create(card, (card) => {
                        console.log(card._id + "cards has been created!");
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        } else {
            console.log('The database is not empty! Seeding has been skipped...')
        }
    });
}

module.exports = seedDB;