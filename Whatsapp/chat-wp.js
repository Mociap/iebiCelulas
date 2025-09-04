const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const admin = require('firebase-admin');
const path = require('path');

// Configuração do Firestore
// Comentado temporariamente para teste sem Firebase
/*
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://<your-database-name>.firebaseio.com" // Altere para o seu URL do Firebase
});

const db = admin.firestore();
*/

// Configuração do cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "igreja-chatbot-session",
        dataPath: __dirname
    }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Evento disparado quando o QR Code é gerado
client.on('qr', (qr) => {
    console.log('--------------------------------------------------');
    console.log('📸 Para conectar o chatbot, escaneie o QR Code abaixo:');
    qrcode.generate(qr, { small: true });
    console.log('--------------------------------------------------');
});

// Evento disparado quando a autenticação falha
client.on('auth_failure', (msg) => {
    console.error('❌ Falha na autenticação:', msg);
});

// Evento disparado quando o cliente é desconectado
client.on('disconnected', (reason) => {
    console.warn('⚠️ Cliente desconectado:', reason);
});

// Evento principal: disparado quando o cliente está pronto
client.on('ready', () => {
    console.log('✅ Chatbot conectado e pronto para responder mensagens!');
    console.log('🤖 Aguardando mensagens...');
});

// Função para enviar o menu principal
function enviarMenuPrincipal(message) {
    const menuTexto = `Olá! 🙏 Sou Ester, sua atendente vitual IEBI.\n\nDigite o número das opções abaixo:\n\n1️⃣ Baixar Estudo de Célula\n2️⃣ Reservar uma Sala\n\nDigite apenas o número da opção desejada.`;
    message.reply(menuTexto);
}

// Função para enviar o arquivo EstudoCelula.pdf
async function enviarEstudoCelula(message) {
    try {
        const arquivoPath = path.join(__dirname, '../assets/EstudoCelula/EstudoCelula.pdf');
        
        // Verificar se o arquivo existe
        if (!fs.existsSync(arquivoPath)) {
            message.reply('❌ Desculpe, o arquivo do estudo de célula não foi encontrado.');
            return;
        }
        
        // Enviar mensagem de texto primeiro
        await message.reply('📚 Aqui está o estudo de célula que você solicitou:');
        
        // Enviar o arquivo PDF
        const media = require('whatsapp-web.js').MessageMedia.fromFilePath(arquivoPath);
        await client.sendMessage(message.from, media);
        
    } catch (error) {
        console.error('Erro ao enviar estudo de célula:', error);
        message.reply('❌ Houve um erro ao enviar o arquivo. Tente novamente mais tarde.');
    }
}

// Função para coletar dados e armazenar a reserva de sala no Firestore
async function reservarSala(message) {
    message.reply('📅 Vamos fazer sua reserva!');

    // Coletando informações
    const respostas = {};

    // Perguntas para o usuário
    message.reply('Qual é o seu nome?');
    client.on('message', async (msg) => {
        if (msg.from !== message.from || !respostas.nome) {
            respostas.nome = msg.body.trim();
            message.reply('Qual é o período de utilização da Sala?');
        } else if (respostas.nome && !respostas.sala) {
            respostas.sala = msg.body.trim();
            message.reply('Qual será a data de utilização? (Formato: dd/mm/aaaa)');
        } else if (respostas.sala && !respostas.data) {
            respostas.data = msg.body.trim();
            message.reply('Qual é a Hora inicial do evento? (Formato: hh:mm)');
        } else if (respostas.data && !respostas.hora) {
            respostas.hora = msg.body.trim();
            message.reply('Por quanto tempo pretende usar? (Formato: hh:mm)');
        } else if (respostas.hora && !respostas.periodo) {
            respostas.periodo = msg.body.trim();
            message.reply('Qual é a finalidade da reserva?');
        } else if (respostas.periodo && !respostas.finalidade) {
            respostas.finalidade = msg.body.trim();
            
            // Armazenando no Firestore (comentado temporariamente)
            /*
            try {
                await db.collection('secretaria').doc('sala').collection('agSala').add({
                    nome: respostas.nome,
                    sala: respostas.sala,
                    data: respostas.data,
                    hora: respostas.hora,
                    periodo: respostas.periodo,
                    finalidade: respostas.finalidade
                });

                message.reply('✅ Sua reserva foi realizada com sucesso!');
            } catch (error) {
                console.error('Erro ao salvar reserva:', error);
                message.reply('❌ Houve um erro ao salvar sua reserva. Tente novamente mais tarde.');
            }
            */
            
            // Simulação de sucesso para teste
            console.log('Dados da reserva:', respostas);
            message.reply('✅ Sua reserva foi registrada! (modo teste - Firebase desabilitado)');
        }
    });
}

// Evento disparado quando uma mensagem é recebida
client.on('message', async (message) => {
    // Ignora mensagens enviadas pelo próprio bot
    if (message.fromMe) return;
    
    // Ignora mensagens de grupos
    if (message.from.includes('@g.us')) return;
    
    const mensagemTexto = message.body.trim();
    
    console.log(`📨 Mensagem recebida de ${message.from}: "${mensagemTexto}"`);
    
    try {
        // Verifica se é uma opção do menu
        switch (mensagemTexto) {
            case '1':
                console.log('🔄 Enviando Estudo de Célula...');
                await enviarEstudoCelula(message);
                break;
                
            case '2':
                console.log('🔄 Iniciando reserva de sala...');
                reservarSala(message);
                break;
                
            default:
                console.log('🔄 Enviando menu principal...');
                enviarMenuPrincipal(message);
                break;
        }
        
        console.log('✅ Resposta enviada com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error);
        message.reply('Desculpe, ocorreu um erro. Tente novamente em alguns instantes.');
    }
});

// Inicia o cliente
console.log('🚀 Iniciando o chatbot da igreja...');
client.initialize();

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Erro não tratado:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Exceção não capturada:', error);
    process.exit(1);
});
