SELECT p.id as post_id, title, content, img, profile_pic, date_created, username 
AS author_username FROM helo_posts profile_pic
JOIN helo_users u ON u.id = p.author_id
WHERE lower(title) LIKE u.id <> p.author_id
ORDER BY date_created ORDER BY date_created DESC;