"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunction = exports.getArguments = exports.tinyAgiHeal = exports.callOpenAI = void 0;
var openai_1 = require("openai");
var config = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID
});
var openai = new openai_1.OpenAIApi(config);
// void async function main() {
//     try {
//         const response = await openai.listEngines();
//         console.log(response.data);
//     } catch(e) {
//         console.error(e);
//     }
// }();
var callOpenAI = function (prompt) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: prompt }],
                        max_tokens: 2000,
                        temperature: 0.7,
                        stop: undefined,
                        n: 1
                    })];
            case 1:
                response = _c.sent();
                console.log((_a = response.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content.trim());
                if (response.data.choices)
                    return [2 /*return*/, (_b = response.data.choices[0].message) === null || _b === void 0 ? void 0 : _b.content.trim()];
                else
                    throw new Error("No data");
                return [3 /*break*/, 3];
            case 2:
                e_1 = _c.sent();
                console.error(e_1);
                throw e_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.callOpenAI = callOpenAI;
var tinyAgiHeal = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = "\n    You are worlds greatest most sophisticated code fixing automated system. From now on, I will provide a function source and the error, and you will fix the function. The format that will be provided is:\n\n    ## Source:\n    <source goes here>\n    \n    ## Error:\n    <error goes here>\n    \n    You will only respond with the new modified Source. The issue is:\n    \n    ## Source:\n    ".concat(options.source, "\n\n    ## Error:\n    ").concat(options.error, "    \n ");
                return [4 /*yield*/, (0, exports.callOpenAI)(prompt)];
            case 1:
                response = _a.sent();
                if (!response)
                    throw new Error("No response from OpenAI");
                return [2 /*return*/, {
                        arguments: (0, exports.getArguments)(response),
                        function: (0, exports.getFunction)(response)
                    }];
        }
    });
}); };
exports.tinyAgiHeal = tinyAgiHeal;
var getArguments = function (response) { var _a; return ((_a = response.match(/\(([^)]+)\)/)) === null || _a === void 0 ? void 0 : _a[1].split(",").map(function (arg) { return arg.trim(); })) || []; };
exports.getArguments = getArguments;
var getFunction = function (response) { var _a; return ((_a = response.match(/(?<={)[\s\S]*(?=})/)) === null || _a === void 0 ? void 0 : _a[0].trim()) || ""; };
exports.getFunction = getFunction;
