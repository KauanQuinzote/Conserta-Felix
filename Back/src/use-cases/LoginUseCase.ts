import { prisma } from "../infra/prisma/client";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class LoginUseCase {
    constructor() { }

    public async execute(email: string, password: string) {
        // Validar se email e senha foram fornecidos
        if (!email || !password) {
            throw new Error("E-mail e senha são obrigatórios.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("E-mail inválido.");
        }

        // Buscar usuário pelo e-mail
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                client: true // Incluir client relacionado automaticamente
            }
        });

        if (!user) {
            throw new Error("E-mail ou senha incorretos.");
        }

        // Verificar se o usuário está ativo
        if (!user.active) {
            throw new Error("Usuário inativo.");
        }

        // Comparar senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("E-mail ou senha incorretos.");
        }

        // Gerar token JWT
        const secret = process.env.JWT_SECRET || 'clicleteComBanana';
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            secret,
            { expiresIn: '7d' }
        );

        return {
            message: "Login realizado com sucesso!",
            data: {
                token,
                user: {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    clientId: user.client?.id
                }
            }
        };
    }
};

export default LoginUseCase;
