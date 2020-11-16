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

insert into SkillsList values ('Python');
insert into SkillsList values ('JavaScript');
insert into SkillsList values ('Java');
insert into SkillsList values ('C (Programming Language)');
insert into SkillsList values ('C#');
insert into SkillsList values ('C++');
insert into SkillsList values ('Go');
insert into SkillsList values ('R (Programming Language)');
insert into SkillsList values ('Swift');
insert into SkillsList values ('PHP');
insert into SkillsList values ('Dart');
insert into SkillsList values ('Kotlin');
insert into SkillsList values ('MATLAB');
insert into SkillsList values ('Perl');
insert into SkillsList values ('Ruby');
insert into SkillsList values ('Rust');
insert into SkillsList values ('Scala');
insert into SkillsList values ('Objective-C');
insert into SkillsList values ('TypeScript');
insert into SkillsList values ('Visual Basic for Applications (VBA)');
insert into SkillsList values ('Ada');
insert into SkillsList values ('Lua');
insert into SkillsList values ('Elm');
insert into SkillsList values ('Abap');
insert into SkillsList values ('Groovy');
insert into SkillsList values ('Julia');
insert into SkillsList values ('Cobol');
insert into SkillsList values ('Haskell');
insert into SkillsList values ('Delphi');
insert into SkillsList values ('SQL');
insert into SkillsList values ('HTML');
insert into SkillsList values ('CSS');
insert into SkillsList values ('Assembly Language');
insert into SkillsList values ('Git');
insert into SkillsList values ('Tableau');
insert into SkillsList values ('Microsoft Excel');
insert into SkillsList values ('Microsoft PowerPoint');
insert into SkillsList values ('Microsoft Word');
insert into SkillsList values ('SAS');
insert into SkillsList values ('SPSS');
insert into SkillsList values ('Microsoft Power BI');
insert into SkillsList values ('Hadoop');
insert into SkillsList values ('AutoCAD');
insert into SkillsList values ('Adobe Photoshop');
insert into SkillsList values ('Bash');
insert into SkillsList values ('Amazon Web Services (AWS)');
insert into SkillsList values ('ArcGIS');
insert into SkillsList values ('Frameworks');
insert into SkillsList values ('Google Analytics');
insert into SkillsList values ('Google Cloud Platform (GCP)');
insert into SkillsList values ('Object-Oriented Programming');
insert into SkillsList values ('REST API');
insert into SkillsList values ('Rhino 3D');
insert into SkillsList values ('Unity');
insert into SkillsList values ('Windows Server');
insert into SkillsList values ('WordPress');
insert into SkillsList values ('XML');
insert into SkillsList values ('Machine Learning');
insert into SkillsList values ('Agile Methodologies');
insert into SkillsList values ('Adobe Dreamweaver');
insert into SkillsList values ('Apache Maven');
insert into SkillsList values ('Apache Spark');
insert into SkillsList values ('Search Engine Optimisation (SEO)');
insert into SkillsList values ('Adobe Acrobat');
insert into SkillsList values ('Microsoft Azure');
insert into SkillsList values ('Microsoft Access');
insert into SkillsList values ('Google Ads');
insert into SkillsList values ('Microsoft Outlook');
insert into SkillsList values ('Microsoft Power Automate (Flow)');
insert into SkillsList values ('Microsoft Project');
insert into SkillsList values ('Microsoft SharePoint');
insert into SkillsList values ('Microsoft Visio');
insert into SkillsList values ('QuickBooks');
insert into SkillsList values ('Xero');
insert into SkillsList values ('MYOB');
insert into SkillsList values ('Adobe Animate');
insert into SkillsList values ('Adobe Illustrator');
insert into SkillsList values ('Adobe Lightroom');
insert into SkillsList values ('Adobe Premier Pro');
insert into SkillsList values ('Adobe XD');
insert into SkillsList values ('After Effects');
insert into SkillsList values ('Autodesk Inventor');
insert into SkillsList values ('Autodesk Maya');
insert into SkillsList values ('Avid Media Composer');
insert into SkillsList values ('Final Cut Pro');
insert into SkillsList values ('iMovie');
insert into SkillsList values ('inDesign');
insert into SkillsList values ('Keynote');
insert into SkillsList values ('Logic Pro');
insert into SkillsList values ('Pro Tools');
insert into SkillsList values ('Revit');
insert into SkillsList values ('SketchUp');
insert into SkillsList values ('SOLIDWORKS');
insert into SkillsList values ('Data Wrangling');
insert into SkillsList values ('QlikView');
insert into SkillsList values ('DevOps');
insert into SkillsList values ('Dafny');
insert into SkillsList values ('SOAP API');
insert into SkillsList values ('JSON');
insert into SkillsList values ('NoSQL');