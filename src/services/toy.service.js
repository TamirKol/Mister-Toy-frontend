import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { httpService } from '../services/http.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    createToy,
    getToyLabels,
    getDefaultFilter,
    addMsg,
    removeMsg
}
const labels = ["Robot", "Doll", "Car", "Educational", "Puzzle", "Teddy Bear", "Train", "Action Figure", "Playset", "Board Game", "Stuffed Animal", "Building Blocks", "Toy Truck", "Remote Control", "Musical Instrument", "Art Kit", "Crayons", "Play-Doh", "Science Kit", "Magic Set", "Battery Powered", "Baby"];
const pics = ['car.jpg', 'doll.jpg', 'education.jpg', 'puzzle.jpg', 'robot.jpg', 'science.jpg']
const toysList = [
    {
        "_id": "t101",
        "name": "Talking Doll",
        "price": 123,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": 'true'
    },
    {
        "_id": "t102",
        "name": "Remote Control Car",
        "price": 89.99,
        "labels": ["Toy", "Battery Powered", "Kids"],
        "createdAt": 1632031801011,
        "inStock": 'true'
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

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
    // return storageService.query(STORAGE_KEY)
    //  .then(toys => {
    //     let toyToDisplay = [...toys]

    //     if (filterBy.txt) {
    //         const regExp = new RegExp(filterBy.txt, 'i')
    //         toyToDisplay = toyToDisplay.filter(toy => regExp.test(toy.name))
    //     }
    //     if (filterBy.inStock) {
    //         // const inStock = filterBy.instock === 'true' ? true : false
    //         if (filterBy.inStock === "false") {
    //             toyToDisplay = toyToDisplay.filter(toy => toy.inStock === false)
    //         } else {
    //             toyToDisplay = toyToDisplay.filter(toy => toy.inStock === true)
    //         }
    //     }
    //    if(filterBy.labels && filterBy.labels.length >0){
    //     toyToDisplay= toyToDisplay.filter(toy =>{
    //         return toy.labels.some(label =>filterBy.labels.includes(label))
    //     })
    //     }
    //     console.log(toyToDisplay)

    //     return toyToDisplay
    // })
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
    return httpService.get(BASE_URL + toyId)
    // return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
    // return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

// function save(toy) {
//     const method = toy._id ? 'put' : 'post'
//     return storageService[method](STORAGE_KEY, toy)
// }

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: '',
        labels: [],
        createdAt: '',
        inStock: true,
    }
}

function createToy() {
    return {
        _id: '',
        name: getRandomToyName(),
        price: utilService.getRandomIntInclusive(10, 1000),
        labels: getRandomLabels(),
        createdAt: Date.now(),
        inStock: true,
        pic: setPic()
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: '', labels: '' }
}

async function addMsg(toyId, txt) {
    // console.log('toyId',toyId , txt)
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
    return savedMsg
}

async function removeMsg(toyId, msgId) {
    const removedId = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
    return removedId
}
function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = toysList
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function getToyLabels() {
    return labels
}

function getRandomToyName() {
    // Generate a random number between 1 and 3 to determine the number of words in the toy name.
    const numberOfWords = Math.floor(Math.random() * 2) + 1;

    // Randomly select words to create the toy name.
    const randomToyName = [];
    for (let i = 0; i < numberOfWords; i++) {
        const randomIndex = Math.floor(Math.random() * labels.length);
        randomToyName.push(labels[randomIndex]);
    }
    return randomToyName.join(" ")
}

function getRandomLabels() {
    const numOfLabels = utilService.getRandomIntInclusive(1, 6)
    const randomLabels = []
    for (let i = 0; i < numOfLabels; i++) {
        const randomIndex = Math.floor(Math.random() * labels.length)
        randomLabels.push(labels[randomIndex])
    }
    return randomLabels
}

function setPic() {
    const picName = utilService.getRandomIntInclusive(0, pics.length - 1)
    return pics[picName]
}