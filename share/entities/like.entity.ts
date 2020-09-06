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
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    likable_id: string;

    @PrimaryColumn()
    likable_type: string; // TWEET, COMMENT

    @JoinColumn({ name: "user_id" })
    user: User;
}