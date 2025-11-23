import { Request, Response, NextFunction } from 'express';

export type UserRole = 'client' | 'admin';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    [key: string]: any;
  };
}

/**
 * Middleware para verificar se o usuário tem a role necessária
 * @param allowedRoles - Roles permitidas para acessar a rota
 */
export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user) {
      return res.status(401).json({ 
        error: 'Não autenticado. Faça login primeiro.' 
      });
    }

    const userRole = authReq.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        error: 'Acesso negado. Você não tem permissão para acessar este recurso.',
        requiredRole: allowedRoles,
        yourRole: userRole
      });
    }

    next();
  };
}
