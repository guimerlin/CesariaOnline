const { app, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const { startServer } = require('./server.js'); // Importa a nossa API

// Previne que múltiplas instâncias da aplicação rodem ao mesmo tempo
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
}

let tray = null; // Variável para manter a referência do ícone da bandeja

// Função para criar o ícone na bandeja do sistema
function createTray() {
  // Crie um ícone (ex: icon.png de 16x16 ou 32x32) e coloque na raiz do projeto
  const iconPath = path.join(__dirname, 'icon.ico');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);

  // Cria o menu de contexto (clique com o botão direito)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'API Rodando', enabled: false },
    { type: 'separator' },
    {
      label: 'Sair',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Cesária Online');
  tray.setContextMenu(contextMenu);
}

// Quando o Electron estiver pronto
app.whenReady().then(() => {
  createTray(); // Cria o ícone da bandeja

  // Inicia o servidor da API Node.js
  startServer(3000);

  // Configura a aplicação para iniciar com o sistema operacional
  // Isso funciona para Windows e macOS.
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  });

  // No macOS, é comum recriar uma janela quando o ícone do dock é clicado.
  // Como não temos janela, essa parte é opcional mas boa prática.
  app.on('activate', () => {
    // Não faremos nada aqui, pois não queremos uma janela.
  });
});

// Impede que o aplicativo seja encerrado quando não há janelas abertas
app.on('window-all-closed', (e) => {
  e.preventDefault();
});