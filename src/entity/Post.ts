import { User } from './User';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'post' })
export class Post {
    @PrimaryGeneratedColumn()
    idPost: number

    @Column('varchar', {length: 300})
    content: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name: 'user_idUser'})
    user: User

}