import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { join } from 'path';

@Entity({
    name: 'assets'
})
export class Asset extends CommonEntity {
    constructor(
    ) {
        super();
    }
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

    file_url: string;

    setExtraInfo(): void {
        this.file_url = `${process.env.API_URL}:${process.env.API_PORT}/${this.file_relative_path}/${this.file_name}`;
    }
}