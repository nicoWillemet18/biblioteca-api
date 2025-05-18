import { prisma } from '../models/prismaClient';
import bcrypt from 'bcrypt';

export const getUsuarios = async () => {
  return await prisma.usuario.findMany();
};

export const getUsuarioById = async (id: string) => {
  return await prisma.usuario.findUnique({ where: { id } });
};

export const createUsuario = async (nombre: string, email: string, password: string) => {
  const existingUser = await prisma.usuario.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email ya registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.usuario.create({
    data: {
      nombre,
      email,
      password: hashedPassword,
    },
  });
};

export const updateUsuario = async (id: string, nombre: string, email: string, password?: string) => {
  const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
  if (!usuarioExistente) {
    throw new Error('Usuario no encontrado');
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  return await prisma.usuario.update({
    where: { id },
    data: {
      nombre,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
};

export const deleteUsuario = async (id: string) => {
  const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
  if (!usuarioExistente) {
    throw new Error('Usuario no encontrado');
  }

  await prisma.usuario.delete({ where: { id } });
};
