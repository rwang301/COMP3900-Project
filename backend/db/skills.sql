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

insert or replace into SkillsList values ('Python'), ('JavaScript'), ('Java'), ('C'), ('C#'), ('C++'), ('Go'), 
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

