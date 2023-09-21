import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter
}
const toysList = [
    {
        "_id": "t101",
        "name": "Talking Doll",
        "price": 123,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true
      },
      {
        "_id": "t102",
        "name": "Remote Control Car",
        "price": 89.99,
        "labels": ["Toy", "Battery Powered", "Kids"],
        "createdAt": 1632031801011,
        "inStock": true
      },
      {
        "_id": "t103",
        "name": "Puzzle Set",
        "price": 19.99,
        "labels": ["Toy", "Educational", "Kids"],
        "createdAt": 1633031801011,
        "inStock": true
      }
    
]
_createToys()

function query(filterBy={}) {
    return storageService.query(STORAGE_KEY)
     .then(toys => {
        const toysData = {
            toyCount: toys.length,
            doneCount: toys.filter(toy => toy.inStock).length,
            toysToDisplay: []
        }

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toys = toys.filter(toy => regExp.test(toy.name))
        }
        if (filterBy.inStock) {
            if (filterBy.inStock === 'false') {
                toys = toys.filter(toy => toy.inStock === false)
            } else {
                toys = toys.filter(toy => toy.inStock === true)
            }
        }
        // toys = getSortedToys(toys, sortBy)
        // if (filterBy.pageIdx != - undefined) {
        //     const startIdx = filterBy.pageIdx * PAGE_SIZE
        //     toys = toys.slice(startIdx, PAGE_SIZE + startIdx)
        // }
        console.log(toys)
        toysData.toysToDisplay = toys
        return toysData.toysToDisplay
    })
}

function getSortedToys(toysToDisplay, sortBy) {
    if (sortBy.type === 'txt') {
        toysToDisplay.sort((b1, b2) => {
            const title1 = b1.txt.toLowerCase()
            const title2 = b2.txt.toLowerCase()
            return sortBy.desc * title2.localeCompare(title1)
        })
    } else {
        toysToDisplay.sort(
            (b1, b2) => sortBy.desc * (b2[sortBy.type] - b1[sortBy.type])
        )
    }
    return toysToDisplay
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return storageService[method](STORAGE_KEY, toy)
}

function getEmptyToy() {
    return {
        _id: '',
        name: getRandomToyName(),
        price: utilService.getRandomIntInclusive(10, 1000),
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}


function getDefaultFilter() {
    return { txt: '', inStock:'' ,labels: ''}
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = toysList
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}
function getRandomToyName() {
    const toyWords = ["Robot", "Doll", "Car", "Puzzle", "Teddy Bear", "Train", "Action Figure", "Playset", "Board Game", "Stuffed Animal", "Building Blocks", "Toy Truck", "Remote Control", "Musical Instrument", "Art Kit", "Crayons", "Play-Doh", "Science Kit", "Magic Set"];
    
    // Generate a random number between 1 and 3 to determine the number of words in the toy name.
    const numberOfWords = Math.floor(Math.random() * 3) + 1;
    
    // Randomly select words to create the toy name.
    const randomToyName = [];
    for (let i = 0; i < numberOfWords; i++) {
      const randomIndex = Math.floor(Math.random() * toyWords.length);
      randomToyName.push(toyWords[randomIndex]);
    }
    
    return randomToyName.join(" ");
  }
  