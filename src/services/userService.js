const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getUserByEmail(email) {
  try {
    const user = await prisma.systemUser.findUnique({
      where: { email }
    });
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await prisma.systemUser.findUnique({
      where: { id }
    });
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
}

async function createUser(userData) {
  try {
    const user = await prisma.systemUser.create({
      data: userData
    });
    return user;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser
};