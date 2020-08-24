import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Tweet } from './tweet.entity';

@Entity({
    name: 'assets'
})
export class Asset extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ nullable: true })
    title: string;

    @Column()
    file_mime: string;

    @Column()
    file_name: string;

    @Column()
    file_extension: string;

    @Column()
    file_relative_path: string;

    @ManyToOne(type => User, user => user.assets)
    @JoinColumn({ name: "user_id" })
    user: User;

    associated_objects: any[];
}