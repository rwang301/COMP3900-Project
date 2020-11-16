import sqlite from 'sqlite3';
const db = new sqlite.Database('./db/database.db', (err) => {
    if (err) {
        throw Error(err.message);
    } else {
        console.log('Connected to sqlite database');
        db.run(`
            create table if not exists Users (
                email text,
                name text not null,
                password text not null,
                location text,
                profile text,
                token text,
                primary key (email)
            );
        `);

        db.run(`
            create table if not exists JobSeekers (
                email text primary key,
                education text,
                resume text,
                foreign key(email) references Users(email)
            );
        `);

        db.run(`
            create table if not exists Employers (
                email text primary key,
                company text,
                foreign key(email) references Users(email)
            );
        `);

        db.run(`
            create table if not exists Jobs (
                id integer primary key autoincrement,
                job_title text not null,
                location text not null,
                description text not null,
                employment_type text not null check (employment_type in ('casual', 'full-time', 'part-time')),
                closing_date text not null
            );
        `);

        db.run(`
            create table if not exists Posts (
                email text references Employers(email),
                id integer references Jobs(id),
                primary key(email, id)
            );
        `);

        db.run(`
            create table if not exists Skills (
                id integer primary key autoincrement,
                email text references JobSeekers(email),
                job_id integer references Jobs(id),
                skill1 text,
                skill2 text,
                skill3 text
            );
        `);

        db.run(`
            create table if not exists PotentialJobs (
                email text references JobSeekers(email),
                id integer references Jobs(id),
                has_swiped integer not null check (has_swiped in (1, 0)),
                matches integer not null check (matches in (1, 2, 3)),
                primary key(email, id)
            );
        `);

        db.run(`
            create table if not exists PotentialJobSeekers (
                employer_email text references Employers(email),
                job_seeker_email text references JobSeekers(email),
                has_swiped integer not null check (has_swiped in (1, 0)),
                matches integer not null check (matches > 0),
                primary key(employer_email, job_seeker_email)
            );
        `);

        db.run(`
            create table if not exists Matches (
                email integer references JobSeekers(email),
                id integer references Jobs(id),
                primary key (email, id)
            );
        `);

        db.run(`
            create table if not exists Offers (
                id integer primary key autoincrement,
                message text not null,
                kind text not null check (kind in ('offer', 'interview'))
            );
        `);

        db.run(`
            create table if not exists Sends (
                employer_email text references Employers(email),
                offer_id integer references Offers(id),
                primary key(employer_email, offer_id)
            );
        `);

        db.serialize(() => {
            db.run(`
                create table if not exists SkillsList (
                    skill text not null check (skill in ('Python', 'JavaScript', 'Java', 'C', 'C#', 'C++', 'Go', 
                    'R', 'Swift', 'PHP', 'Dart', 'Kotlin', 'MATLAB', 'Perl', 'Ruby', 'Rust', 'Scala', 'Objective-C', 
                    'TypeScript', 'VBA', 'Ada', 'Lua', 'Elm', 'Abap', 'Groovy', 'Julia', 'Cobol', 'Haskell', 'Delphi', 
                    'SQL', 'HTML', 'CSS', 'Assembly', 'Git', 'Tableau', 'Excel', 'PowerPoint', 'Word', 
                    'SAS', 'SPSS', 'Power BI', 'Hadoop', 'AutoCAD', 'Photoshop', 'Bash', 'AWS', 
                    'ArcGIS', 'Frameworks', 'Google Analytics', 'Google Cloud', 'OOP', 'REST API',
                    'Rhino 3D', 'Unity', 'Windows Server', 'WordPress', 'XML', 'Machine Learning', 'Agile', 'Dreamweaver',
                    'Maven', 'Spark', 'SEO', 'Adobe Acrobat', 'Microsoft Azure', 'Microsoft Access',
                    'Google Ads', 'Outlook', 'Power Automate', 'LaTeX', 'SharePoint', 'Visio',
                    'QuickBooks', 'Xero', 'MYOB', 'Adobe Animate', 'Illustrator', 'Lightroom', 'Premier Pro', 'Adobe XD', 'After Effects',
                    'Inventor', 'Maya', 'Media Composer', 'Final Cut Pro', 'iMovie', 'inDesign', 'Keynote', 'Logic Pro',
                    'Pro Tools', 'Revit', 'SketchUp', 'SOLIDWORKS', 'Data Wrangling', 'QlikView', 'DevOps', 'Dafny', 'SOAP API', 'JSON', 'NoSQL')),
                    primary key(skill)
                );
            `)
                .run(`insert or replace into SkillsList values ('Python'), ('JavaScript'), ('Java'), ('C'), ('C#'), ('C++'), ('Go'), 
                    ('R'), ('Swift'), ('PHP'), ('Dart'), ('Kotlin'), ('MATLAB'), ('Perl'), ('Ruby'), ('Rust'), ('Scala'), ('Objective-C'), 
                    ('TypeScript'), ('VBA'), ('Ada'), ('Lua'), ('Elm'), ('Abap'), ('Groovy'), ('Julia'), ('Cobol'), ('Haskell'), ('Delphi'), 
                    ('SQL'), ('HTML'), ('CSS'), ('Assembly'), ('Git'), ('Tableau'), ('Excel'), ('PowerPoint'), ('Word'), 
                    ('SAS'), ('SPSS'), ('Power BI'), ('Hadoop'), ('AutoCAD'), ('Photoshop'), ('Bash'), ('AWS'), 
                    ('ArcGIS'), ('Frameworks'), ('Google Analytics'), ('Google Cloud'), ('OOP'), ('REST API'),
                    ('Rhino 3D'), ('Unity'), ('Windows Server'), ('WordPress'), ('XML'), ('Machine Learning'), ('Agile'), ('Dreamweaver'),
                    ('Maven'), ('Spark'), ('SEO'), ('Adobe Acrobat'), ('Microsoft Azure'), ('Microsoft Access'),
                    ('Google Ads'), ('Outlook'), ('Power Automate'), ('LaTeX'), ('SharePoint'), ('Visio'),
                    ('QuickBooks'), ('Xero'), ('MYOB'), ('Adobe Animate'), ('Illustrator'), ('Lightroom'), ('Premier Pro'), ('Adobe XD'), ('After Effects'),
                    ('Inventor'), ('Maya'), ('Media Composer'), ('Final Cut Pro'), ('iMovie'), ('inDesign'), ('Keynote'), ('Logic Pro'),
                    ('Pro Tools'), ('Revit'), ('SketchUp'), ('SOLIDWORKS'), ('Data Wrangling'), ('QlikView'), ('DevOps'), ('Dafny'), ('SOAP API'), ('JSON'), ('NoSQL')
                `);
        });
    }
});

export default db;
