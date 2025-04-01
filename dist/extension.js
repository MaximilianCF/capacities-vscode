"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv = __importStar(require("dotenv"));
// Carregamos variáveis de ambiente
dotenv.config();
function activate(context) {
    let disposable = vscode.commands.registerCommand('capacities.sendMarkdown', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage("Nenhum editor ativo!");
                return;
            }
            const text = editor.document.getText().trim();
            if (!text) {
                vscode.window.showWarningMessage("Nenhum conteúdo encontrado no arquivo.");
                return;
            }
            const capacitiesToken = process.env.CAPACITIES_API_KEY;
            if (!capacitiesToken) {
                vscode.window.showErrorMessage("CAPACITIES_API_KEY não definido!");
                return;
            }
            const body = {
                spaceId: "96be4298-cfe2-4c1c-accd-500995a1a19b",
                mdText: text,
                origin: "commandPalette",
                noTimeStamp: false
            };
            console.log("Enviando para Capacities:", body);
            const response = await (0, node_fetch_1.default)('https://api.capacities.io/save-to-daily-note', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${capacitiesToken}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                const errorText = await response.text();
                vscode.window.showErrorMessage(`Erro ao criar nota diária: ${response.status} - ${errorText}`);
                return;
            }
            vscode.window.showInformationMessage("Texto enviado com sucesso para a nota diária!");
        }
        catch (err) {
            vscode.window.showErrorMessage(`Erro inesperado: ${err.message}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() {
    // ...
}
//# sourceMappingURL=extension.js.map