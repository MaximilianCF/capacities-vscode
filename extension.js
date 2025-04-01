import * as vscode from 'vscode';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
// Carregamos variáveis de ambiente
dotenv.config();
export function activate(context) {
    let disposable = vscode.commands.registerCommand('capacities.sendMarkdown', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage("Nenhum editor ativo!");
                return;
            }
            const text = editor.document.getText();
            // Pegamos a API Key do Capacities (definida como CAPACITIES_API_KEY no .env)
            const capacitiesToken = process.env.CAPACITIES_API_KEY;
            if (!capacitiesToken) {
                vscode.window.showErrorMessage("CAPACITIES_API_KEY não definido!");
                return;
            }
            // Chamada POST para criar/atualizar página
            const response = await fetch('https://api.capacities.io/v1/pages', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${capacitiesToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: "Nova página via VSCode",
                    content: text
                })
            });
            if (!response.ok) {
                const errorText = await response.text();
                vscode.window.showErrorMessage(`Erro ao criar página: ${response.status} - ${errorText}`);
                return;
            }
            const responseData = await response.json();
            vscode.window.showInformationMessage(`Página criada com sucesso! ID: ${responseData?.id ?? "desconhecido"}`);
        }
        catch (err) {
            vscode.window.showErrorMessage(`Erro: ${err.message}`);
        }
    });
    context.subscriptions.push(disposable);
}
export function deactivate() {
    // ...
}
//# sourceMappingURL=extension.js.map