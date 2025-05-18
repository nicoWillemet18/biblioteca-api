import { Router, Request, Response, NextFunction } from 'express';
import * as usuarioController from '../controllers/usuarioController';

const router = Router();

function wrapAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return function(req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
}

router.get('/', wrapAsync(usuarioController.getUsuarios));
router.get('/:id', wrapAsync(usuarioController.getUsuarioById));
router.post('/register', wrapAsync(usuarioController.registerUsuario));
router.put('/:id', wrapAsync(usuarioController.updateUsuario));
router.delete('/:id', wrapAsync(usuarioController.deleteUsuario));

export default router;
