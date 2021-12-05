const multer = require('multer');


module.exports = (
    /**
     * @module Middleware-multer
     * @description armazena a imagem em um arquivo temporário
     * @param {BinaryData} image - imagem em binário.
     */
    multer({

        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './public/userImages')
            }
        }),
        fileFilter: (req, file, cb) => {
            const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

            if (extensaoImg) {
                return cb(null, true);
            }

            return cb(null, false);
        }
    }));