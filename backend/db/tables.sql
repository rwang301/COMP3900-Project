create table not exists Users (
    name text not null,
    password text not null,
    email text,
    is_employer boolean not null,
    primary key (email)
);

create table not exists Job_Seekers (
    email text primary key,
    foreign key(email) references Users(email),
);

create table not exists Employers (
    email text primary key,
    foreign key(email) references Users(email) 
);

create table not exists Sends (
    employer_email text,
    foreign key(employer_email) references Employer(email),
    offer_id serial,
    foreign key(offer_id) references Offers(id),
    primary key(employer_email, offer_id)
)

create table not exists Offers (
    id serial,
    message text not null,
    type text not null check (type in ('offer', 'interview')),
    primary key(id)
);

create table not exists Jobs (
    id serial not null,
    closing_date datetime not null,
    description text not null,
    responsibilities text not null,
    remuneration float not null,
    required_experience text not null,
    employment_type text not null check (text in ('casual', 'full-time', 'part-time')),
    required_qualification text not null,
    location text not null,
    primary key(id)
);

create table not exists Posts (
    employer_email text,
    foreign key(employer_email) references Employer(email),
    job_id serial,
    foreign key(job_id) references Jobs(id),
    primary key(employer_email, job_id)
);

create table not exists Applications (
    id serial,
    cover_letter text,
    resume text not null,
    primary key(id)
);

create table not exists Applies (
    job_seeker_email text,
    foreign key(job_seeker_email) references Job_Seekers(email),
    application_id serial,
    foreign key(application_id) references Applications(id),
    primary key(job_seeker_email, application_id)
);

create table not exists Skills (
    skill text,
    job_seeker_email serial,
    foreign key (job_seeker_email) references Job_Seekers(email),
    primary key (job_seeker_email, skill)
); 