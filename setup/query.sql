-- create admin
INSERT INTO users (user_first_name, user_last_name, user_username, user_role, user_gender, user_password) VALUES ('root', 'admin', 'score_admin', 1, 1, crypt('score_admin', gen_salt('bf')));