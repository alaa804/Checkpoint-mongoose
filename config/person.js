// 1- Install and setup mongoose :
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 2- Create a person prototype(Modal) :
const personSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    age: Number,
    favoriteFoods: [String]
  });

  const Person = mongoose.model('person', personSchema);
  
// 3- Create and Save a Record of a Model :
const createAndSavePerson = function(done) {
    const person = new Person({ name: "Alaa Taguiaa", age: 28, favoriteFoods: ["potato", "sandwitch"] });
  
    person.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    });
  };

// 4- Create Many Records with model.create() using the function argument arrayOfPeople :

const arrayOfPeople = [
    {name: "Alaa", age: 28, favoriteFoods: ["sandwitch"]},
    {name: "samir", age: 25, favoriteFoods: ["spaghetti"]},   
];

const createManyPeople = function(arrayOfPeople, done) {
    Model.create(arrayOfPeople, (err, data) => {
      if(err) {
         done(err); 
      }
    done(null, data);
    }) 
};
// 5- Using model.find() to Search the Database :
// example searching the name
const findPeopleByFood = function(personFood, done) {
    Person.find({food: personFood}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
    });
};

// 6- Using model.findOne() to Return a Single Matching Document from Your Database :
const findOneByName = function(name, done) {
    Person.findOne({ personName: name }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
    });
};

// 7- Using model.findById() to Search Your Database By _id :
// Using the function argument 'personId' as search key.

const findPersonById = function(personId, done) {
    Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
    });
};

// 8- Perform Classic Updates by Running Find, Edit, then Save :
 
const findEditThenSave = (personId, done) => {
    const foodToAdd = 'sauce Tomato';
    Person.findById({_id: personId}, (err, data) => {
    if (err) {
        console.error(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
        if (err) {
        console.error(err);
        }
        done(null, data);
    });
    });
};


// 9- Performing New Updates on a Document Using model.findOneAndUpdate() :
const findAndUpdate = (personName, done) => {
    const ageToSet = 24;
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) {
        console.error(err);
    }
    done(null, data);
    });
};

// 10- Remove One Document Using model.findByIdAndRemove :
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
        console.error(err);
    }
    done(null, data);
    });
};

// 11- MongoDB and Mongoose - Delete Many Documents with model.remove() :

const removeManyPeople = (done) => {
    const nameToRemove = "Tony";
    Person.remove({name: nameToRemove}, (err, data) => {
    if (err) {
        console.error(err);
    }
    done(null, data);
    });
};

// 12- Chain Search Query Helpers to Narrow Search Results :
//Find people who like tiramisu food. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec()//
const queryChain = (done) => {
    const foodToSearch = "tiramisu";
    Person.find({favoriteFoods: foodToSearch})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((err, data) => {
        if (err) {
        console.error(err);
        }  
        done(null, data);
    });
};