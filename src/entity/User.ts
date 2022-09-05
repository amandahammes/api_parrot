 import { Post } from './Post';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from "typeorm"
import { Length, IsEmail, IsEmpty } from "class-validator"

@Entity({ name: 'user' })
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(4,20)
    name: string

    @Column()
    @IsEmail({ message: 'An e-mail is required' })
    email: string

    @Column()
    @IsEmpty()
    apartment: string

    @Column()
    @Length(6, 30, { message: 'The password must be at least 6 but not longer than 30 characters' })
    @IsEmpty({ message: 'The password is required' })
    password: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

}
