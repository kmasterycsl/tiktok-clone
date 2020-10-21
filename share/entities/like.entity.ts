import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';

@Entity({
    name: 'likes'
})
export class Like extends CommonEntity {
    constructor(
    ) {
        super();
    }
    @PrimaryColumn({
        type: 'int',
    })
    user_id: number;

    @PrimaryColumn({
        type: 'int',
    })
    likable_id: number;

    @PrimaryColumn({
        type: 'string',
    })
    likable_type: string; // TWEET, COMMENT

    @JoinColumn({ name: "user_id" })
    user: User;
}