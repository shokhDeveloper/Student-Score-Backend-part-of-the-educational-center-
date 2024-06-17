CREATE DATABASE score;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

/*
    1. Admin
    2. Teacher
    3. Assistant
    4. Student
*/

CREATE TABLE courses (
    course_id BIGSERIAL primary key,
    course_name VARCHAR(50) not null unique
);

CREATE TABLE users (
    user_id BIGSERIAL primary key,
    user_first_name VARCHAR(30) not null,
    user_last_name VARCHAR(30) not null,
    user_username VARCHAR(30) not null,
    user_role INT not null,
    user_gender VARCHAR(12) not null,
    user_password VARCHAR(16) not null,
    user_created_at timestamptz default current_timestamp
);  

CREATE TABLE teachers (
    teacher_id BIGSERIAL primary key,
    user_id INT references users(user_id),
    course_id INT references courses(course_id)
);

CREATE TABLE assistants (
    assistant_id BIGSERIAL primary key,
    user_id INT references users(user_id)
);

CREATE TABLE students (
    student_id BIGSERIAL primary key,
    user_id INT references users(user_id)
);

CREATE TABLE group_assistants (
    group_id INT references groups(group_id),
    assistant_id INT references assistants(assistant_id)
);

CREATE TABLE group_students (
    group_id INT references groups(group_id),
    student_id INT references students(student_id)
);
