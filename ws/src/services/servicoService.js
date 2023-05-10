const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const aws = require('../utils/aws/aws');
const Arquivo = require('../database/models/arquivo');
const Servico = require('../database/models/servico');
const errorThrow = require('../utils/errorThrow');

// Configuração do Multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads'); // Especifique o diretório onde os arquivos serão salvos
	},
	filename: function (req, file, cb) {
		const splitName = file.originalname.split('.');
		const fileName = `${new Date().getTime()}.${
			splitName[splitName.length - 1]
		}`;
		cb(null, fileName); // Use um nome único para o arquivo
	},
});

const upload = multer({ storage: storage }).any();

// Função para lidar com o upload de arquivos usando o Multer
const handleFileUpload = async (req) => {
	return new Promise((resolve, reject) => {
		upload(req, null, async (error) => {
			if (error) {
				reject(error);
				return;
			} else {
				const { salaoId, servico } = req.body;
				let errors = [];
				let arquivos = [];

				if (req.files && req.files.length > 0) {
					for (let file of req.files) {
						const splitName = file.originalname.split('.');
						const fileName = `${new Date().getTime()}.${
							splitName[splitName.length - 1]
						}`;
						const path = `servicos/${salaoId}/${fileName}`;

						const response = await aws.uploadToS3(file, path);

						response.error
							? errors.push({ error: true, message: response.message })
							: arquivos.push(path);
					}
				}

				if (errors.length > 0) {
					throw errorThrow(errors[0].message);
				}

				// Criar Serviço
				let jsonServico = JSON.parse(servico);
				const novoServico = await Servico(jsonServico).save();

				// Criar arquivo
				arquivos = arquivos.map((arquivo) => ({
					referenciaId: novoServico._id,
					model: 'Servico',
					caminho: arquivo,
				}));

				await Arquivo.insertMany(arquivos);

				resolve({ servico: novoServico, arquivos });
			}
		});
	});
};

module.exports = { handleFileUpload };

// const Busboy = require('busboy');
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// const fs = require('fs');
// const aws = require('../utils/aws/aws');
// const Arquivo = require('../database/models/arquivo');
// const Servico = require('../database/models/servico');

// // Função para lidar com o upload de arquivos usando o Busboy
// const handleFileUpload = async (req) => {
//   return new Promise((_resolve, reject) => {
//     const busboy = Busboy({ headers: req.headers });
//     busboy.on('close', async () => {
//       const { salaoId, servico } = req.body;
//       let errors = [];
//       let arquivos = [];

//       if (req.files && Object.keys(req.files).length > 0) {
//         for (let key of Object.keys(req.files)) {
//           const file = req.files[key];
//           const splitName = file.originalname.split('.');
//           const fileName = `${new Date().getTime()}.${splitName[splitName.length - 1]}`;
//           const path = `servicos/${salaoId}/${fileName}`;

//           const response = await aws.uploadToS3(file, path);

//           response.error ? errors.push({ error: true, message: response.message })
//             : arquivos.push(path);
//           };
//       }

//       if (errors.length > 0)
//         throw errorThrow(500, errors[0]);

//     //Criar Serviço
//       console.log(servico);
//       let jsonServico = JSON.parse(servico);
//       const novoServico = await Servico(jsonServico).save();

//     //Criar arquivo
//       arquivos = arquivos.map(arquivo => ({
//         referenciaId: novoServico._id,
//         model: 'Servico',
//         caminho: arquivo,
//       }));

//       await Arquivo.insertMany(arquivos);

//       return { servico: novoServico, arquivos };
//     });

//     busboy.on('error', (err) => {
//       reject(err);
//     });

//     req.pipe(busboy);
//   });
// }

// module.exports = { handleFileUpload };
