import {z} from 'zod';

export const signupSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto',
    }).min(1,{
        message: 'El nombre no puede estar vacío',
    }).max(255,{
        message: 'El nombre no puede exceder los 255 caracteres',
    }),
    email: z.string({
        required_error: 'El correo electrónico es obligatorio',
        invalid_type_error: 'El correo electrónico debe ser una cadena de texto',
    }).email({
        message: 'El correo electrónico no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña es obligatoria',
        invalid_type_error: 'La contraseña debe ser una cadena de texto',
    }).min(6,{
        message: 'La contraseña debe tener al menos 6 caracteres',
    }).max(255,{
        message: 'La contraseña no puede exceder los 255 caracteres',
    }),
});

export const signinSchema = z.object({
    email: z.string({
        required_error: 'El correo electrónico es obligatorio',
        invalid_type_error: 'El correo electrónico debe ser una cadena de texto',
    }).email({
        message: 'El correo electrónico no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña es obligatoria',
        invalid_type_error: 'La contraseña debe ser una cadena de texto',
    }).min(6,{
        message: 'La contraseña debe tener al menos 6 caracteres',
    }).max(255,{
        message: 'La contraseña no puede exceder los 255 caracteres',
    }),
})
