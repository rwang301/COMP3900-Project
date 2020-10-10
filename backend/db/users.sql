create table if not exists Users(
    name text not null,
    email text not null unique,
    password text not null,
    primary key (email)
);