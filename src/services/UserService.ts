import { UserAccount } from '../bo/entities/UserAccount';
import { UserAccountRepository } from '../repositories/UserAccountRepository';
import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ResponseBase } from '../bo/models/ResponseBase';

@Service()
export class UserService extends BaseService<UserAccount, UserAccountRepository> {
  constructor(@InjectRepository(UserAccount) repository: UserAccountRepository) {
    super(repository);
  }

  public async getList(): Promise<ResponseBase<UserAccount[]> | undefined> {
    const list: UserAccount[] = await this.repository.getList().catch((ex) => {
      throw ex;
    });

    //-----------------------------------------------------------------
    // return
    const result: ResponseBase<UserAccount[]> = new ResponseBase<UserAccount[]>();
    result.data = list;
    return result;
  }
}
