 import { Post } from './Post';
import { Entity,  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from "typeorm"
import { Length, IsNotEmpty, IsEmail, IsEmpty } from "class-validator"

@Entity({ name: 'user' })
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    idUser: number

    @Column('varchar', {length: 70})
    @Length(4, 70)
    name: string

    @Column('varchar', {length: 70})
    @IsEmail({ message: 'An e-mail is required' })
    @IsNotEmpty()
    email: string

    @Column()
    @IsNotEmpty()
    apartment: string

    @Column()
    @IsNotEmpty()
    role: string

    @Column('varchar', {length: 120})
    @Length(6, 30, { message: 'The password must be at least 6 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'The password is required' })
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
