DROP TABLE IF EXISTS service_project;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
organization_id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
description TEXT NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);


INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Community Center Construction', 'Construction of a new community center to provide educational and recreational facilities.', 'Johannesburg', '2026-08-10'),
(1, 'School Roof Repairs', 'Repairing damaged roofs at local primary schools to create a safe learning environment.', 'Soweto', '2026-08-17'),
(1, 'Playground Renovation', 'Renovating playground equipment to improve safety and accessibility for children.', 'Sandton', '2026-08-24'),
(1, 'Affordable Housing Project', 'Building affordable homes for low-income families in the community.', 'Midrand', '2026-09-05'),
(1, 'Bridge Restoration', 'Restoring a pedestrian bridge to improve community access and safety.', 'Roodepoort', '2026-09-19'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'Community Garden Planting', 'Creating a community vegetable garden to promote food sustainability.', 'Randburg', '2026-08-12'),
(2, 'Urban Farming Workshop', 'Teaching residents modern urban farming techniques.', 'Johannesburg', '2026-08-20'),
(2, 'Tree Planting Campaign', 'Planting indigenous trees to improve local green spaces.', 'Kempton Park', '2026-08-28'),
(2, 'Composting Education Program', 'Educating families on composting and waste reduction.', 'Benoni', '2026-09-10'),
(2, 'School Vegetable Garden', 'Establishing vegetable gardens at local schools for educational purposes.', 'Alberton', '2026-09-24'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Food Bank Distribution', 'Organizing volunteers to distribute food parcels to families in need.', 'Johannesburg', '2026-08-15'),
(3, 'Blood Donation Drive', 'Coordinating a community blood donation campaign.', 'Pretoria', '2026-08-22'),
(3, 'Park Cleanup Day', 'Volunteers cleaning public parks and recreational areas.', 'Centurion', '2026-09-01'),
(3, 'Youth Mentorship Program', 'Providing mentorship and career guidance for local youth.', 'Soweto', '2026-09-14'),
(3, 'Winter Clothing Collection', 'Collecting and distributing warm clothing to vulnerable community members.', 'Johannesburg', '2026-09-27');

INSERT INTO category (name)
VALUES
('Construction'),
('Environmental'),
('Community Service');


-- Construction projects
INSERT INTO service_project_category (project_id, category_id)
VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,1);

-- Environmental projects
INSERT INTO service_project_category (project_id, category_id)
VALUES
(6,2),
(7,2),
(8,2),
(9,2),
(10,2);

-- Community Service projects
INSERT INTO service_project_category (project_id, category_id)
VALUES
(11,3),
(12,3),
(13,3),
(14,3),
(15,3);

INSERT INTO service_project_category (project_id, category_id)
VALUES
(3,3),   -- Playground Renovation
(8,3),   -- Tree Planting Campaign
(10,3),  -- School Vegetable Garden
(13,2);  -- Park Cleanup Day