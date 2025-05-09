require('dotenv').config();
let mongoose = require("mongoose");
mongooseURI = process.env.MONGO_URI;

mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true })

let Person;

personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

Person = mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Dave Ramsay",
    age: 15,
    favoriteFoods: ["pizza", "steak", "burger"],
  });
  person.save((err,data) => {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

let arrayOfPeople = [
  {
    name: "Dave Ramsay",
    age: 15,
    favoriteFoods: ["pizza", "steak", "burger"],
  },
  {
    name: "Mike Trout",
    age: 40,
    favoriteFoods: ["banana", "broccoli", "salt"]
  },
  {
    name: "Shohei Ohtani",
    age: 29,
    favoriteFoods: ["sushi", "tuna", "hot dog"]
  }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data) => {
    if(err) console.error(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err,data) => {
    if(err) console.error(err);
    done(null,data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err,data) => {
    if(err) console.error(err);
    done(null,data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if(err) console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, data) => {
    if (err) console.error(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) console.error(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age: ageToSet}, {new: true}, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
