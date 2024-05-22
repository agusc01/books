import { body } from "express-validator";

const title = {
    minLength: 2,
    maxLength: 50
};

const year = {
    min: 100,
    max: new Date().getFullYear()
};

const price = {
    min: 10,
    max: 10000000
};

const titleValidation = body('title')
    .isLength({ min: title.minLength, max: title.maxLength })
    .withMessage(`El título puede tener un mínimo de ${title.minLength} y un máximo de ${title.maxLength} caracteres`);

const yearValidation = body('year')
    .isNumeric()
    .withMessage('El año solo puede ser númerico')
    .custom(value => {
        if (parseInt(value) < year.min) {
            throw new Error(`El año debe ser igual o mayor que ${year.min}`);
        }
        if (parseInt(value) > year.max) {
            throw new Error(`El año debe ser igual o menor que ${year.min}`);
        }
        return true;
    });

const priceValidatio = body('price')
    .isDecimal()
    .withMessage('El precio debe ser un número decimal')
    .custom(value => {
        if (parseInt(value) < price.min) {
            throw new Error(`El precio debe ser igual o mayor que ${price.min}`);
        }
        if (parseInt(value) > price.max) {
            throw new Error(`El precio debe ser igual o menor que ${price.min}`);
        }
        return true;
    });


export const createBookValidation = [titleValidation, yearValidation, priceValidatio];
export const updateBookvalidation = createBookValidation;