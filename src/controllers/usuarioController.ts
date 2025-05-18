import { Request, Response } from 'express';
import * as usuarioService from '../services/usuarioService';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Error desconocido';
}

export const getUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    return res.json(usuarios);
  } catch (error: unknown) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const getUsuarioById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(usuario);
  } catch (error: unknown) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const registerUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoUsuario = await usuarioService.createUsuario(nombre, email, password);
    return res.status(201).json(nuevoUsuario);
  } catch (error: unknown) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export const updateUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioActualizado = await usuarioService.updateUsuario(req.params.id, nombre, email, password);
    return res.json(usuarioActualizado);
  } catch (error: unknown) {
    const msg = getErrorMessage(error);
    if (msg === 'Usuario no encontrado') {
      return res.status(404).json({ message: msg });
    }
    return res.status(400).json({ message: msg });
  }
};

export const deleteUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    await usuarioService.deleteUsuario(req.params.id);
    return res.status(204).send();
  } catch (error: unknown) {
    const msg = getErrorMessage(error);
    if (msg === 'Usuario no encontrado') {
      return res.status(404).json({ message: msg });
    }
    return res.status(400).json({ message: msg });
  }
};
