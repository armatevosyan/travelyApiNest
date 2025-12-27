import { Repository } from 'typeorm';
import { ERoles } from './role.types';
import { Role } from './role.entity';
export declare class RoleService {
    private readonly roleRepo;
    constructor(roleRepo: Repository<Role>);
    findByName(name: ERoles): Promise<Role | null>;
}
