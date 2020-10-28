create table if not exists Users (
    name text not null,
    email text,
    password text not null,
    primary key (email)
);

create table if not exists JobSeekers (
    email text primary key,
    foreign key(email) references Users(email)
);

create table if not exists Employers (
    email text primary key,
    foreign key(email) references Users(email)
    primary key(employer_email, jobseeker_email)
);


create table if not exists Offers (
    id serial,
    message text not null,
    kind text not null check (kind in ('offer', 'interview')),
    primary key(id)
);

create table if not exists Sends (
    employer_email text references Employers(email),
    offer_id serial references Offers(id),
    primary key(employer_email, offer_id)
);


create table if not exists Jobs (
    id serial,
    closing_date datetime not null,
    description text not null,
    responsibilities text not null,
    remuneration float not null,
    required_experience text not null,
    employment_type text not null check (employment_type in ('casual', 'full-time', 'part-time')),
    required_qualification text not null,
    location text not null,
    job_title text not null,
    primary key(id)
);

create table if not exists Posts (
    employer_email text references Employers(email),
    job_id serial references Jobs(id),
    primary key(employer_email, job_id)
);


create table if not exists Applications (
    id serial,
    cover_letter text,
    resume text not null,
    primary key(id)
);

create table if not exists Applies (
    job_seeker_email text references JobSeekers(email),
    application_id serial references Applications(id),
    primary key(job_seeker_email, application_id)
);


create table if not exists Skills (
    skill text,
    job_seeker_email serial,
    foreign key (job_seeker_email) references JobSeekers(email),
    primary key (job_seeker_email, skill)
);


create table if not exists Matches (
    application_id serial references Applications(id),
    job_id serial references Jobs(id),
    primary key (application_id, job_id)
);
