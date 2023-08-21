const multer = require('multer');
const path = require('path');
const aws = require('../utils/aws/aws');
const Arquivo = require('../database/models/arquivo');
const Servico = require('../database/models/servico');
const errorThrow = require('../utils/errorThrow');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const absolutePath = path.join(__dirname, '../../uploads');
		cb(null, absolutePath);
	},
	filename: function (req, file, cb) {
		const splitName = file.originalname.split('.');
		const fileName = `${new Date().getTime()}.${
			splitName[splitName.length - 1]
		}`;
		cb(null, fileName);
	},
});

const upload = multer({ storage: storage }).any();

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

				let jsonServico = JSON.parse(servico);
				const novoServico = await Servico(jsonServico).save();

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

const updateServico = async (req) => {
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
						const fileName = `${new Date().getTime()}.${splitName[splitName.length - 1]
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

				const novoServico = JSON.parse(servico);
				await Servico.findByIdAndUpdate(req.params.id, novoServico);

				arquivos = arquivos.map((arquivo) => ({
					referenciaId: req.params.id,
					model: 'Servico',
					caminho: arquivo,
				}));

				await Arquivo.insertMany(arquivos);

				resolve({ servico: novoServico, arquivos });
			}
		});
	});
};

const deleteArquivo = async (req) => {
	const {path} = req.body;

	await aws.deleteFileS3(path);

	await Arquivo.findOneAndDelete({
		caminho: path,
	});

	return { message: 'Arquivo deletado com sucesso!' };
};

const changeServicoStatus = async (id) => {
	await Servico.findByIdAndUpdate(id, {status: 'E'});

	return { message: 'Status alterado com sucesso!' };
};

const getServicosById = async (id) => {
	let servicosSalao = [];   
	const servicos = await Servico.find({
		salaoId: id,
		status: { $ne: 'E' },
	});
	
	for (let servico of servicos) {
		const arquivos = await Arquivo.find({
			referenciaId: servico._id,
			model: 'Servico',
		});
		servicosSalao.push({ ...servico._doc, arquivos });
	};

	return {servicos: servicosSalao};
};

module.exports = {
	handleFileUpload,
	updateServico,
	deleteArquivo,
	changeServicoStatus,
	getServicosById,
};
