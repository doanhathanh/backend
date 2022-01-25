import { Request, Response, NextFunction } from 'express';
import { Controller, Get } from '@overnightjs/core';
import Log from '../utils/Log';
import { Service } from 'typedi';
import { ResponseBase } from '../bo/models/ResponseBase';
import { UserService } from '../services/UserService';
import { UserAccount } from '../bo/entities';

@Service()
@Controller('api/v1/user')
export class UserController {
  private className = 'UserController';
  constructor(private readonly userService: UserService) {}

  @Get('list')
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'list', `RQ`, { jwtPayload: res.locals.jwtPayload, req: req });

    try {
      const result: ResponseBase<UserAccount[]> = await this.userService.getList().catch((ex) => {
        throw ex;
      });

      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }
}
