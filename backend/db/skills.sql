create table if not exists SkillsList (
    skill text not null check (skill in ('Python', 'JavaScript', 'Java', 'C', 'C#', 'C++', 'Go', 'R', 
    'Swift', 'PHP', 'Dart', 'Kotlin', 'MATLAB', 'Perl')),
    primary key(skill)
);

insert into SkillsList values ('Python');
insert into SkillsList values ('JavaScript');
insert into SkillsList values ('Java');