import * as vscode from 'vscode';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

// Carregamos variáveis de ambiente
dotenv.config();

export function activate(context: vscode.ExtensionContext) {
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

      const response = await fetch('https://api.capacities.io/save-to-daily-note', {
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
    } catch (err: any) {
      vscode.window.showErrorMessage(`Erro inesperado: ${err.message}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  // ...
}
