create table if not exists Users(
    name text not null,
    email text not null unique,
    password text not null,
    employer boolean not null,
    primary key (email)
);