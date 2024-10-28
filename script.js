var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var getButton = document.getElementById('getPosts');
var refreshButton = document.getElementById("refresh");
var output = document.getElementById('output');
// navButtons 
var homeButton = document.getElementById('home');
var recentlyDeletedButton = document.getElementById('recentlyDeleted');
var likedButton = document.getElementById('liked');
var posts = JSON.parse(localStorage.getItem("posts") || '[]');
var index = JSON.parse(localStorage.getItem("index") || '1');
getButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, postData, finalText, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts/".concat(index))];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (data.id) {
                    postData = {
                        delete: 0,
                        like: false,
                        userId: data.userId,
                        id: data.id,
                        title: data.title,
                        body: data.body
                    };
                    posts.push(postData);
                    localStorage.setItem("posts", JSON.stringify(posts));
                    appendRecentlyFetchedPost(postData);
                    index++;
                    localStorage.setItem("index", JSON.stringify(index));
                }
                else {
                    finalText = document.createElement('h2');
                    finalText.className = 'finalText';
                    finalText.innerText = 'No more posts to show';
                    output.appendChild(finalText);
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
window.onload = function () {
    output.innerHTML = '';
    homeButton.click();
};
function appendRecentlyFetchedPost(postData) {
    var newPost = document.createElement('div');
    newPost.className = 'posts';
    newPost.innerHTML = "\n        <h2>".concat(postData.title, "</h2>\n        <p>").concat(postData.body, "</p>\n        <div id=\"postAction\">\n            <button id=\"likeToggleIcon\"><img src=\"assets/like.svg\" class=\"icons\"></button>\n            <button id=\"deleteIcon\"><img src=\"assets/delete.svg\" class=\"icons\"></button>\n        </div>\n    ");
    output.appendChild(newPost);
    newPost.scrollIntoView();
    var likedButton = newPost.querySelector('#likeToggleIcon');
    var deleteButton = newPost.querySelector('#deleteIcon');
    likedButton.addEventListener('click', function () {
        var _a, _b, _c;
        var currTitle = (_c = (_b = (_a = likedButton.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
        var likedIndex = posts.findIndex(function (post) { return post.title === currTitle; });
        if (posts[likedIndex].like) {
            likedButton.setAttribute('style', 'background-color: #fff');
        }
        else {
            likedButton.setAttribute('style', 'background-color: #4caf50');
        }
        posts[likedIndex].like = !posts[likedIndex].like;
        localStorage.setItem("posts", JSON.stringify(posts));
    });
    deleteButton.addEventListener('click', function () {
        var _a, _b, _c;
        var currTitle = (_c = (_b = (_a = likedButton.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
        var deletedIndex = posts.findIndex(function (post) { return post.title === currTitle; });
        newPost.style.display = 'none';
        posts[deletedIndex].delete = 1;
        localStorage.setItem("posts", JSON.stringify(posts));
    });
}
;
homeButton.addEventListener('click', function () {
    output.innerHTML = '';
    posts.forEach(function (post) {
        if (!post.delete) {
            var newPost_1 = document.createElement('div');
            newPost_1.className = 'posts';
            newPost_1.innerHTML = "\n                <h2>".concat(post.title, "</h2>\n                <p>").concat(post.body, "</p>\n                <div id=\"postAction\">\n                    <button id=\"likeToggleIcon\"><img src=\"assets/like.svg\" class=\"icons\"></button>\n                    <button id=\"deleteIcon\"><img src=\"assets/delete.svg\" class=\"icons\"></button>\n                </div>\n            ");
            output.appendChild(newPost_1);
            var likedButton_1 = newPost_1.querySelector('#likeToggleIcon');
            var deleteButton = newPost_1.querySelector('#deleteIcon');
            likedButton_1.setAttribute('style', "background-color: ".concat(post.like ? '#4caf50' : '#fff'));
            likedButton_1.addEventListener('click', function () {
                var _a, _b, _c;
                var currTitle = (_c = (_b = (_a = likedButton_1.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
                var likedIndex = posts.findIndex(function (post) { return post.title === currTitle; });
                if (posts[likedIndex].like) {
                    likedButton_1.setAttribute('style', 'background-color: #fff');
                }
                else {
                    likedButton_1.setAttribute('style', 'background-color: #4caf50');
                }
                posts[likedIndex].like = !posts[likedIndex].like;
                localStorage.setItem("posts", JSON.stringify(posts));
            });
            deleteButton.addEventListener('click', function () {
                var _a, _b, _c;
                var currTitle = (_c = (_b = (_a = likedButton_1.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
                var deletedIndex = posts.findIndex(function (post) { return post.title === currTitle; });
                newPost_1.style.display = 'none';
                posts[deletedIndex].delete = 1;
                localStorage.setItem("posts", JSON.stringify(posts));
            });
        }
    });
});
likedButton.addEventListener('click', function () {
    output.innerHTML = '';
    posts.forEach(function (post) {
        if (post.like && !post.delete) {
            var newPost_2 = document.createElement('div');
            newPost_2.className = 'posts';
            newPost_2.innerHTML = "\n                <h2>".concat(post.title, "</h2>\n                <p>").concat(post.body, "</p>\n                <div id=\"postAction\">\n                    <button id=\"likeToggleIcon\"><img src=\"assets/like.svg\" class=\"icons\"></button>\n                    <button id=\"deleteIcon\"><img src=\"assets/delete.svg\" class=\"icons\"></button>\n                </div>\n            ");
            output.appendChild(newPost_2);
            var likedButton_2 = newPost_2.querySelector('#likeToggleIcon');
            var deleteButton = newPost_2.querySelector('#deleteIcon');
            likedButton_2.setAttribute('style', "background-color: ".concat(post.like ? '#4caf50' : '#fff'));
            likedButton_2.addEventListener('click', function () {
                var _a, _b, _c;
                var currTitle = (_c = (_b = (_a = likedButton_2.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
                var likedIndex = posts.findIndex(function (post) { return post.title === currTitle; });
                if (posts[likedIndex].like) {
                    likedButton_2.setAttribute('style', 'background-color: #fff');
                }
                else {
                    likedButton_2.setAttribute('style', 'background-color: #4caf50');
                }
                posts[likedIndex].like = !posts[likedIndex].like;
                localStorage.setItem("posts", JSON.stringify(posts));
            });
            deleteButton.addEventListener('click', function () {
                var _a, _b, _c;
                var currTitle = (_c = (_b = (_a = likedButton_2.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
                var deletedIndex = posts.findIndex(function (post) { return post.title === currTitle; });
                newPost_2.style.display = 'none';
                posts[deletedIndex].delete = 1;
                localStorage.setItem("posts", JSON.stringify(posts));
            });
        }
    });
});
recentlyDeletedButton.addEventListener('click', function () {
    output.innerHTML = '';
    posts.forEach(function (post) {
        if (post.delete == 1) {
            var newPost_3 = document.createElement('div');
            newPost_3.className = 'posts';
            newPost_3.innerHTML = "\n                <h2>".concat(post.title, "</h2>\n                <p>").concat(post.body, "</p>\n                <div id=\"postAction\">\n                    <button id=\"restoreIcon\"><img src=\"assets/restore.svg\" class=\"icons\"></button>\n                    <button id=\"deleteIcon\"><img src=\"assets/delete.svg\" class=\"icons\"></button>\n                </div>\n            ");
            output.appendChild(newPost_3);
            var restoreButton_1 = newPost_3.querySelector('#restoreIcon');
            var deleteButton = newPost_3.querySelector('#deleteIcon');
            restoreButton_1.addEventListener('click', function () {
                var _a, _b, _c;
                var currTitle = (_c = (_b = (_a = restoreButton_1.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
                var restoreIndex = posts.findIndex(function (post) { return post.title === currTitle; });
                newPost_3.style.display = 'none';
                posts[restoreIndex].delete = 0;
                localStorage.setItem("posts", JSON.stringify(posts));
            });
            deleteButton.addEventListener('click', function () {
                var _a, _b, _c;
                var currTitle = (_c = (_b = (_a = likedButton.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('h2')) === null || _c === void 0 ? void 0 : _c.innerText;
                var deletedIndex = posts.findIndex(function (post) { return post.title === currTitle; });
                var modalDialog = document.getElementById("modalDialog");
                modalDialog === null || modalDialog === void 0 ? void 0 : modalDialog.showModal();
                var postTitle = post.title;
                ;
                var confirmDelete = document.getElementById("confirmDelete");
                var cancelDelete = document.getElementById("cancelDelete");
                confirmDelete.addEventListener('click', function () {
                    var deletedIndex = posts.findIndex(function (post) { return post.title === postTitle; });
                    posts[deletedIndex].delete = 2;
                    newPost_3.style.display = 'none';
                    modalDialog === null || modalDialog === void 0 ? void 0 : modalDialog.close();
                });
                cancelDelete.addEventListener('click', function () {
                    modalDialog === null || modalDialog === void 0 ? void 0 : modalDialog.close();
                });
                localStorage.setItem("posts", JSON.stringify(posts));
            });
        }
    });
});
refreshButton.addEventListener('click', function () {
    output.innerHTML = '';
    index = 1;
    posts = [];
    localStorage.setItem("index", JSON.stringify(index));
    localStorage.setItem("posts", JSON.stringify(posts));
});
