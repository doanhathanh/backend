import { EntityRepository, Repository } from 'typeorm';
import { UserAccount } from '../bo/entities/UserAccount';
import { Service } from 'typedi';

@Service()
@EntityRepository(UserAccount)
export class UserAccountRepository extends Repository<UserAccount> {
  async getList(): Promise<UserAccount[]> {
    return await this.find({
      order: {
        id: 'ASC'
      }
    });
  }
}
