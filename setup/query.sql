-- create admin
INSERT INTO users (user_first_name, user_last_name, user_username, user_role, user_gender, user_password) VALUES ('root', 'admin', 'score_admin', 1, 1, crypt('score_admin', gen_salt('bf')));

-- auth/admin/login
SELECT * from users WHERE user_first_name=$1 and user_last_name=$2 and user_username=$3 and user_role=$4 and user_gender=$5 user_password=crypt($6, user_password);

-- insert course
INSERT INTO (course_name) VALUES($1) RETURNING *;