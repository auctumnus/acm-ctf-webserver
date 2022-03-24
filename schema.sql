drop table if exists pastes;
drop table if exists users;

create table users (
  internal_id serial primary key,
  id text unique not null,
  username text unique not null,
  password text not null,
  admin boolean
);

create table pastes (
  internal_id serial primary key,
  title text not null,
  filename text not null,
  username text references users(username)
);

insert into users
  (id, username, password, admin)
values
  ('D_DeNcCmQDDHWvSBpW64l', 'alice', '$2b$10$KVjooUcuFwhz8QZqYD2oF.FdIEIdewxr9psxCbpuBxhigsVj0lltG', true);
-- the password here is eLUThwS32DzeYVu
