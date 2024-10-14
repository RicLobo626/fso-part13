CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);
INSERT INTO blogs (author, title, url) VALUES ('Richard Wolf', 'some blog', 'www.richblogs.com');
INSERT INTO blogs (title, url) VALUES ('no author blog', 'www.noauthors.com');
