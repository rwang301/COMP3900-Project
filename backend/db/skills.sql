create table if not exists SkillsList (
    skill text not null check (skill in ('Python', 'JavaScript', 'Java', 'C (Programming Language)', 'C#', 'C++', 'Go', 
    'R (Programming Language)', 'Swift', 'PHP', 'Dart', 'Kotlin', 'MATLAB', 'Perl', 'Ruby', 'Rust', 'Scala', 'Objective-C', 
    'TypeScript', 'Visual Basic for Applications (VBA)', 'Ada', 'Lua', 'Elm', 'Abap', 'Groovy', 'Julia', 'Cobol', 'Haskell', 'Delphi', 
    'SQL', 'HTML', 'CSS', 'Assembly Language', 'Git', 'Tableau', 'Microsoft Excel', 'Microsoft PowerPoint', 'Microsoft Word', 
    'SAS', 'SPSS', 'Microsoft Power BI', 'Hadoop', 'AutoCAD', 'Adobe Photoshop', 'Bash', 'Amazon Web Services (AWS)', 
    'ArcGIS', 'Frameworks', 'Google Analytics', 'Google Cloud Platform (GCP)', 'Object-Oriented Programming', 'REST API',
    'Rhino 3D', 'Unity', 'Windows Server', 'WordPress', 'XML', 'Machine Learning', 'Agile Methodologies', 'Adobe Dreamweaver',
    'Apache Maven', 'Apache Spark', 'Search Engine Optimisation (SEO)', 'Adobe Acrobat', 'Microsoft Azure', 'Microsoft Access',
    'Google Ads', 'Microsoft Outlook', 'Microsoft Power Automate (Flow)', 'Microsoft Project', 'Microsoft SharePoint', 'Microsoft Visio',
    'QuickBooks', 'Xero', 'MYOB', 'Adobe Animate', 'Adobe Illustrator', 'Adobe Lightroom', 'Adobe Premier Pro', 'Adobe XD', 'After Effects',
    'Autodesk Inventor', 'Autodesk Maya', 'Avid Media Composer', 'Final Cut Pro', 'iMovie', 'inDesign', 'Keynote', 'Logic Pro',
    'Pro Tools', 'Revit', 'SketchUp', 'SOLIDWORKS', 'Data Wrangling', 'QlikView', 'DevOps', 'Dafny', 'SOAP API', 'JSON', 'NoSQL')),
    primary key(skill)
);

insert or replace into SkillsList values ('Python'), ('JavaScript'), ('Java'), ('C (Programming Language)'), ('C#'), ('C++'), ('Go'), 
    ('R (Programming Language)'), ('Swift'), ('PHP'), ('Dart'), ('Kotlin'), ('MATLAB'), ('Perl'), ('Ruby'), ('Rust'), ('Scala'), ('Objective-C'), 
    ('TypeScript'), ('Visual Basic for Applications (VBA)'), ('Ada'), ('Lua'), ('Elm'), ('Abap'), ('Groovy'), ('Julia'), ('Cobol'), ('Haskell'), ('Delphi'), 
    ('SQL'), ('HTML'), ('CSS'), ('Assembly Language'), ('Git'), ('Tableau'), ('Microsoft Excel'), ('Microsoft PowerPoint'), ('Microsoft Word'), 
    ('SAS'), ('SPSS'), ('Microsoft Power BI'), ('Hadoop'), ('AutoCAD'), ('Adobe Photoshop'), ('Bash'), ('Amazon Web Services (AWS)'), 
    ('ArcGIS'), ('Frameworks'), ('Google Analytics'), ('Google Cloud Platform (GCP)'), ('Object-Oriented Programming'), ('REST API'),
    ('Rhino 3D'), ('Unity'), ('Windows Server'), ('WordPress'), ('XML'), ('Machine Learning'), ('Agile Methodologies'), ('Adobe Dreamweaver'),
    ('Apache Maven'), ('Apache Spark'), ('Search Engine Optimisation (SEO)'), ('Adobe Acrobat'), ('Microsoft Azure'), ('Microsoft Access'),
    ('Google Ads'), ('Microsoft Outlook'), ('Microsoft Power Automate (Flow)'), ('Microsoft Project'), ('Microsoft SharePoint'), ('Microsoft Visio'),
    ('QuickBooks'), ('Xero'), ('MYOB'), ('Adobe Animate'), ('Adobe Illustrator'), ('Adobe Lightroom'), ('Adobe Premier Pro'), ('Adobe XD'), ('After Effects'),
    ('Autodesk Inventor'), ('Autodesk Maya'), ('Avid Media Composer'), ('Final Cut Pro'), ('iMovie'), ('inDesign'), ('Keynote'), ('Logic Pro'),
    ('Pro Tools'), ('Revit'), ('SketchUp'), ('SOLIDWORKS'), ('Data Wrangling'), ('QlikView'), ('DevOps'), ('Dafny'), ('SOAP API'), ('JSON'), ('NoSQL')

