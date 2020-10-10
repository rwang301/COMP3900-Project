create table Users(
    email text not null unique,
    name text not null,
    password text not null,
    primary key (email)
);