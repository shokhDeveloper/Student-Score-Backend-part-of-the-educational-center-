CREATE DATABASE score;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

/*
    1. Admin
    2. Teacher
    3. Assistant
    4. Student
*/

DROP TABLE IF EXISTS courses CASCADE;
CREATE TABLE courses (
    course_id BIGSERIAL primary key,
    course_name VARCHAR(50) not null unique
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id BIGSERIAL primary key,
    user_first_name VARCHAR(30) not null,
    user_last_name VARCHAR(30) not null,
    user_username VARCHAR(30) not null,
    user_role INT not null,
    user_contact VARCHAR(12) default null,
    user_gender VARCHAR(12) not null,
    user_password VARCHAR(200) not null,
    user_created_at timestamptz default current_timestamp
);  


DROP TABLE IF EXISTS teachers CASCADE;
CREATE TABLE teachers (
    teacher_id BIGSERIAL primary key,
    user_id INT references users(user_id),
    course_id INT references courses(course_id)
);

DROP TABLE IF EXISTS assistants CASCADE;
CREATE TABLE assistants (
    assistant_id BIGSERIAL primary key,
    user_id INT references users(user_id)
);

DROP TABLE IF EXISTS students CASCADE;
CREATE TABLE students (
    student_id BIGSERIAL primary key,
    user_id INT references users(user_id)
);

DROP TABLE IF EXISTS groups CASCADE;
CREATE TABLE groups(
    group_id BIGSERIAL primary key,
    group_name VARCHAR(50) not null unique,
    teacher_id INT references teachers(teacher_id) not null,
    assistant_id INT references assistants(assistant_id) not null,
    group_created_at timestamptz default current_timestamp
);
DROP TABLE IF EXISTS group_assistants CASCADE;
CREATE TABLE group_assistants (
    group_id INT references groups(group_id),
    assistant_id INT references assistants(assistant_id)
);

DROP TABLE IF EXISTS group_students CASCADE;
CREATE TABLE group_students (
    group_id INT references groups(group_id),
    student_id INT references students(student_id)
);

DROP TABLE IF EXISTS lesson_theme CASCADE;
CREATE TABLE lesson_theme (
    theme_id BIGSERIAL primary key,
    theme_title VARCHAR(70) not null,
    theme_desc VARCHAR(40) default null,
    group_id INT references groups(group_id)
);

DROP TABLE IF EXISTS student_check CASCADE;
CREATE TABLE student_check (
    student_id INT references students(student_id),
    lesson_id INT references lesson_theme(theme_id),
    student_check BOOLEAN default false
);

DROP TABLE IF EXISTS scores CASCADE;
CREATE TABLE scores (
    score_id BIGSERIAL primary key,
    score_desc VARCHAR(70) not null,
    score_value INT not null,
    student_id INT references students(student_id),
    group_id INT references groups(group_id),
    score_created_at timestamptz default current_timestamp
);