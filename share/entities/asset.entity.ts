import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';

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

    @Column({ type: 'int' })
    user_id: number;

    @Column({
        type: 'int',
        nullable: true
    })
    thumbnail_id?: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    title: string;

    @Column({ type: 'varchar' })
    file_mime: string;

    @Column({ type: 'varchar' })
    file_name: string;

    @Column({ type: 'varchar' })
    file_extension: string;

    @Column({ type: 'varchar' })
    file_relative_path: string;

    @OneToOne(type => Asset, asset => asset.thumbnail)
    @JoinColumn({ name: "thumbnail_id" })
    thumbnail?: Asset;

    @ManyToOne(type => User, user => user.assets)
    @JoinColumn({ name: "user_id" })
    user: User;

    associated_objects: any[];

    file_url: string;

    setExtraInfo(): void {
        this.file_url = `${process.env.API_URL}:${process.env.API_PORT}/${this.file_relative_path}/${this.file_name}`;
        if (this.thumbnail) {
            this.thumbnail.file_url = `${process.env.API_URL}:${process.env.API_PORT}/${this.thumbnail.file_relative_path}/${this.thumbnail.file_name}`;
        }
    }
}