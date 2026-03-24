-- =============================================================================
-- SEED DATA: Metal en México
-- =============================================================================
-- Limpia datos existentes
TRUNCATE order_items, orders, ticket_types, shows, events, bands, profiles CASCADE;

-- =============================================================================
-- PROFILES
-- =============================================================================
INSERT INTO profiles (id, email, name, role) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'admin@metalenmexico.com', 'Admin Metal', 'admin'),
  ('a0000000-0000-0000-0000-000000000002', 'promotor@metalenmexico.com', 'Carlos Reyes', 'user');

-- =============================================================================
-- BANDS
-- =============================================================================
INSERT INTO bands (id, name, slug, genre, origin) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Brujeria',        'brujeria',        'Grindcore / Death Metal',       'CDMX / Los Ángeles'),
  ('b0000000-0000-0000-0000-000000000002', 'Transmetal',       'transmetal',       'Thrash Metal',                  'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000003', 'The Chasm',        'the-chasm',        'Death Metal',                   'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000004', 'Cenotaph',         'cenotaph',         'Brutal Death Metal',            'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000005', 'Disgorge',         'disgorge',         'Brutal Death Metal',            'Guadalajara, Jalisco'),
  ('b0000000-0000-0000-0000-000000000006', 'Shub Niggurath',   'shub-niggurath',   'Death Metal',                   'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000007', 'Zombiefication',   'zombiefication',   'Death Metal / Old School',      'San Luis Potosí'),
  ('b0000000-0000-0000-0000-000000000008', 'Sargatanas Reign', 'sargatanas-reign', 'Black / Death Metal',           'Monterrey, Nuevo León'),
  ('b0000000-0000-0000-0000-000000000009', 'Denial',           'denial',           'Death Metal',                   'Monterrey, Nuevo León'),
  ('b0000000-0000-0000-0000-000000000010', 'Ravager',          'ravager',          'Thrash Metal',                  'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000011', 'Tulkas',           'tulkas',           'Progressive Death Metal',       'Querétaro'),
  ('b0000000-0000-0000-0000-000000000012', 'Mortuary',         'mortuary',         'Death Metal',                   'Tijuana, Baja California'),
  ('b0000000-0000-0000-0000-000000000013', 'Cemetery',         'cemetery',         'Thrash / Speed Metal',          'Guadalajara, Jalisco'),
  ('b0000000-0000-0000-0000-000000000014', 'Argentum',         'argentum',         'Symphonic Black Metal',         'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000015', 'Disorder',         'disorder',         'Thrash Metal',                  'San Luis Potosí'),
  ('b0000000-0000-0000-0000-000000000016', 'Masha',            'masha',            'Gothic / Doom Metal',           'Aguascalientes'),
  ('b0000000-0000-0000-0000-000000000017', 'Toxodeth',         'toxodeth',         'Death / Thrash Metal',          'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000018', 'Next',             'next',             'Thrash Metal',                  'Ciudad de México'),
  ('b0000000-0000-0000-0000-000000000019', 'Leprosy',          'leprosy',          'Death Metal',                   'Guadalajara, Jalisco'),
  ('b0000000-0000-0000-0000-000000000020', 'Dark Millennium',  'dark-millennium',  'Thrash / Death Metal',          'Toluca, Estado de México');

-- =============================================================================
-- EVENTS
-- =============================================================================
INSERT INTO events (id, title, slug, description, event_type, venue_name, venue_address, city, state, latitude, longitude, start_date, end_date, ticket_price_info, status, submitted_by, updated_at) VALUES

  -- CDMX
  ('e0000000-0000-0000-0000-000000000001',
   'Ritual Metal Fest 2026',
   'ritual-metal-fest-2026',
   'El festival más brutal de la Ciudad de México reúne a lo mejor del death metal nacional.',
   'festival',
   'Foro Indie Rocks!',
   'Zacatecas 39, Roma Norte, Cuauhtémoc',
   'Ciudad de México', 'CDMX',
   19.4180, -99.1590,
   '2026-04-12T17:00:00Z', '2026-04-12T23:59:00Z',
   'Preventa $350 / Día del evento $450',
   'approved',
   'a0000000-0000-0000-0000-000000000001',
   NOW()),

  ('e0000000-0000-0000-0000-000000000002',
   'Noche de Thrash: Transmetal + Ravager',
   'noche-de-thrash-transmetal-ravager',
   'Una noche dedicada al thrash metal mexicano.',
   'concert',
   'Multiforo Alicia',
   'Av. Cuauhtémoc 91A, Roma Sur',
   'Ciudad de México', 'CDMX',
   19.4065, -99.1590,
   '2026-04-19T20:00:00Z', NULL,
   '$250 en puerta',
   'approved',
   'a0000000-0000-0000-0000-000000000002',
   NOW()),

  ('e0000000-0000-0000-0000-000000000003',
   'Brujería: Gira Matando Güeros 2026',
   'brujeria-gira-matando-gueros-2026-cdmx',
   'Brujería regresa a la Ciudad de México con su gira de aniversario.',
   'concert',
   'Pepsi Center WTC',
   'Dakota s/n, Nápoles',
   'Ciudad de México', 'CDMX',
   19.3935, -99.1880,
   '2026-05-10T19:00:00Z', NULL,
   'General $600 / VIP $1,200',
   'approved',
   'a0000000-0000-0000-0000-000000000001',
   NOW()),

  -- Guadalajara / Jalisco
  ('e0000000-0000-0000-0000-000000000004',
   'Metal Alliance GDL',
   'metal-alliance-gdl-2026',
   'Death metal extremo en la Perla Tapatía. Disgorge, Cemetery y Leprosy en una sola noche.',
   'concert',
   'C3 Stage',
   'Av. Ignacio L. Vallarta 1110, Col. Americana',
   'Guadalajara', 'JAL',
   20.6751, -103.3648,
   '2026-04-26T19:30:00Z', NULL,
   'Preventa $300 / Día del evento $380',
   'approved',
   'a0000000-0000-0000-0000-000000000002',
   NOW()),

  -- Monterrey / Nuevo León
  ('e0000000-0000-0000-0000-000000000005',
   'Northern Darkness Fest',
   'northern-darkness-fest-2026',
   'El norte de México se pone oscuro. Sargatanas Reign y Denial encabezan esta noche black/death.',
   'festival',
   'Café Iguana',
   'Padre Mier 927, Centro, Monterrey',
   'Monterrey', 'NL',
   25.6700, -100.3100,
   '2026-05-03T18:00:00Z', '2026-05-03T23:59:00Z',
   'General $280',
   'approved',
   'a0000000-0000-0000-0000-000000000001',
   NOW()),

  -- San Luis Potosí
  ('e0000000-0000-0000-0000-000000000006',
   'Zombiefication + Disorder en SLP',
   'zombiefication-disorder-slp-2026',
   'Las bandas potosinas regresan a casa para una noche de death y thrash metal.',
   'concert',
   'Café del Mural',
   'Centro Histórico, San Luis Potosí',
   'San Luis Potosí', 'SLP',
   22.1500, -100.9800,
   '2026-04-05T20:00:00Z', NULL,
   '$200',
   'approved',
   'a0000000-0000-0000-0000-000000000002',
   NOW()),

  ('e0000000-0000-0000-0000-000000000007',
   'Masha en San Luis Potosí',
   'masha-slp-2026',
   'Masha presenta su nuevo álbum de gothic/doom metal en San Luis Potosí.',
   'concert',
   'Rawk Bar',
   'Av. Carranza 1050, Centro',
   'San Luis Potosí', 'SLP',
   22.1510, -100.9760,
   '2026-03-29T21:00:00Z', NULL,
   '$180',
   'approved',
   'a0000000-0000-0000-0000-000000000001',
   NOW()),

  -- Querétaro
  ('e0000000-0000-0000-0000-000000000008',
   'Noche Prog Death: Tulkas + The Chasm',
   'noche-prog-death-queretaro-2026',
   'Progressive y death metal técnico en Querétaro.',
   'concert',
   'Foro K',
   'Av. Universidad 101, Querétaro',
   'Querétaro', 'QRO',
   20.5930, -100.3899,
   '2026-05-17T20:00:00Z', NULL,
   'Preventa $250 / Día del evento $320',
   'approved',
   'a0000000-0000-0000-0000-000000000002',
   NOW()),

  -- Tijuana / Baja California
  ('e0000000-0000-0000-0000-000000000009',
   'Mortuary + Brujería en Tijuana',
   'mortuary-brujeria-tijuana-2026',
   'La frontera se prende con los reyes del grindcore y death metal.',
   'concert',
   'Black Box',
   'Calle 6ta, Zona Centro, Tijuana',
   'Tijuana', 'BC',
   32.5149, -117.0382,
   '2026-05-09T20:00:00Z', NULL,
   'General $400 / VIP $700',
   'approved',
   'a0000000-0000-0000-0000-000000000001',
   NOW()),

  -- Puebla
  ('e0000000-0000-0000-0000-000000000010',
   'Puebla Extreme Metal Night',
   'puebla-extreme-metal-night-2026',
   'Cenotaph y Toxodeth destruyen Puebla.',
   'concert',
   'Foro 2 de Marzo',
   'Calle 2 de Marzo 15, Centro, Puebla',
   'Puebla', 'PUE',
   19.0413, -98.2062,
   '2026-06-07T19:30:00Z', NULL,
   '$220',
   'approved',
   'a0000000-0000-0000-0000-000000000002',
   NOW()),

  -- Toluca / Estado de México
  ('e0000000-0000-0000-0000-000000000011',
   'Toluca Metal Underground',
   'toluca-metal-underground-2026',
   'El underground metalero de Toluca sale a flote con Dark Millennium y Next.',
   'concert',
   'Foro Cultural Quetzalli',
   'Av. Independencia 302, Centro, Toluca',
   'Toluca', 'MEX',
   19.2826, -99.6557,
   '2026-04-18T20:00:00Z', NULL,
   '$150',
   'approved',
   'a0000000-0000-0000-0000-000000000001',
   NOW()),

  -- Aguascalientes
  ('e0000000-0000-0000-0000-000000000012',
   'Aguascalientes Doom Fest',
   'aguascalientes-doom-fest-2026',
   'Un festival dedicado al doom y gothic metal. Masha y Argentum como headliners.',
   'festival',
   'Foro de las Estrellas',
   'Complejo Ferial, Aguascalientes',
   'Aguascalientes', 'AGS',
   21.8818, -102.2916,
   '2026-05-24T17:00:00Z', '2026-05-24T23:59:00Z',
   'General $350 / 2x1 en preventa',
   'approved',
   'a0000000-0000-0000-0000-000000000002',
   NOW());

-- =============================================================================
-- SHOWS (band ↔ event relationships)
-- =============================================================================
INSERT INTO shows (id, event_id, band_id, is_headliner, stage, show_date, start_time, sort_order) VALUES

  -- Ritual Metal Fest (CDMX) — 4 bandas
  ('50000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004', true,  'Escenario Principal', '2026-04-12', '22:00', 1), -- Cenotaph (headliner)
  ('50000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000006', false, 'Escenario Principal', '2026-04-12', '20:30', 2), -- Shub Niggurath
  ('50000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000017', false, 'Escenario Principal', '2026-04-12', '19:00', 3), -- Toxodeth
  ('50000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000014', false, 'Escenario Alterno',   '2026-04-12', '18:00', 4), -- Argentum

  -- Noche de Thrash (CDMX) — 2 bandas
  ('50000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', true,  NULL, '2026-04-19', '22:00', 1), -- Transmetal
  ('50000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000010', false, NULL, '2026-04-19', '20:30', 2), -- Ravager

  -- Brujería CDMX — 1 banda
  ('50000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', true, NULL, '2026-05-10', '21:00', 1), -- Brujería

  -- Metal Alliance GDL — 3 bandas
  ('50000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000005', true,  NULL, '2026-04-26', '22:00', 1), -- Disgorge
  ('50000000-0000-0000-0000-000000000009', 'e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000013', false, NULL, '2026-04-26', '20:30', 2), -- Cemetery
  ('50000000-0000-0000-0000-000000000010', 'e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000019', false, NULL, '2026-04-26', '19:30', 3), -- Leprosy

  -- Northern Darkness Fest (Monterrey) — 2 bandas
  ('50000000-0000-0000-0000-000000000011', 'e0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000008', true,  'Escenario Principal', '2026-05-03', '22:00', 1), -- Sargatanas Reign
  ('50000000-0000-0000-0000-000000000012', 'e0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000009', false, 'Escenario Principal', '2026-05-03', '20:00', 2), -- Denial

  -- Zombiefication + Disorder (SLP) — 2 bandas
  ('50000000-0000-0000-0000-000000000013', 'e0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000007', true,  NULL, '2026-04-05', '22:00', 1), -- Zombiefication
  ('50000000-0000-0000-0000-000000000014', 'e0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000015', false, NULL, '2026-04-05', '20:30', 2), -- Disorder

  -- Masha en SLP — 1 banda
  ('50000000-0000-0000-0000-000000000015', 'e0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000016', true, NULL, '2026-03-29', '21:30', 1), -- Masha

  -- Tulkas + The Chasm (Querétaro) — 2 bandas
  ('50000000-0000-0000-0000-000000000016', 'e0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000003', true,  NULL, '2026-05-17', '22:00', 1), -- The Chasm
  ('50000000-0000-0000-0000-000000000017', 'e0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000011', false, NULL, '2026-05-17', '20:30', 2), -- Tulkas

  -- Mortuary + Brujería (Tijuana) — 2 bandas
  ('50000000-0000-0000-0000-000000000018', 'e0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', true,  NULL, '2026-05-09', '22:00', 1), -- Brujería
  ('50000000-0000-0000-0000-000000000019', 'e0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000012', false, NULL, '2026-05-09', '20:30', 2), -- Mortuary

  -- Puebla Extreme Metal Night — 2 bandas
  ('50000000-0000-0000-0000-000000000020', 'e0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000004', true,  NULL, '2026-06-07', '21:30', 1), -- Cenotaph
  ('50000000-0000-0000-0000-000000000021', 'e0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000017', false, NULL, '2026-06-07', '20:00', 2), -- Toxodeth

  -- Toluca Metal Underground — 2 bandas
  ('50000000-0000-0000-0000-000000000022', 'e0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000020', true,  NULL, '2026-04-18', '21:30', 1), -- Dark Millennium
  ('50000000-0000-0000-0000-000000000023', 'e0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000018', false, NULL, '2026-04-18', '20:00', 2), -- Next

  -- Aguascalientes Doom Fest — 2 bandas
  ('50000000-0000-0000-0000-000000000024', 'e0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000016', true,  'Escenario Principal', '2026-05-24', '22:00', 1), -- Masha
  ('50000000-0000-0000-0000-000000000025', 'e0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000014', false, 'Escenario Principal', '2026-05-24', '20:00', 2); -- Argentum

-- =============================================================================
-- TICKET TYPES (boletos para eventos con venta interna)
-- =============================================================================
INSERT INTO ticket_types (id, event_id, name, description, price, quantity, sold, max_per_order, sort_order, is_active) VALUES

  -- Ritual Metal Fest (CDMX) — festival con 3 tiers
  ('d0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Early Bird',  'Acceso general — precio especial de preventa', 25000, 50,  50, 4, 0, false), -- agotado
  ('d0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'General',     'Acceso general al festival',                  35000, 150, 12, 5, 1, true),
  ('d0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'VIP',         'Acceso VIP + meet & greet con las bandas',     65000, 30,  3,  2, 2, true),

  -- Brujería CDMX — concierto grande con 2 tiers
  ('d0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000003', 'General',     'Acceso general',                              60000, 200, 45, 5, 0, true),
  ('d0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000003', 'VIP',         'Acceso VIP + zona preferencial',             120000, 50,  8,  2, 1, true),

  -- Metal Alliance GDL — concierto con 2 tiers
  ('d0000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000004', 'Preventa',    'Precio especial de preventa',                 30000, 80,  60, 4, 0, true),
  ('d0000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000004', 'General',     'Acceso general',                              38000, 120, 0,  5, 1, true),

  -- Northern Darkness Fest (Monterrey) — festival con 1 tier
  ('d0000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000005', 'General',     'Acceso general al festival',                  28000, 100, 15, 5, 0, true),

  -- Mortuary + Brujería (Tijuana) — concierto con 2 tiers
  ('d0000000-0000-0000-0000-000000000009', 'e0000000-0000-0000-0000-000000000009', 'General',     'Acceso general',                              40000, 150, 22, 5, 0, true),
  ('d0000000-0000-0000-0000-000000000010', 'e0000000-0000-0000-0000-000000000009', 'VIP',         'Acceso VIP + poster firmado',                 70000, 40,  5,  2, 1, true),

  -- Aguascalientes Doom Fest — festival con 2 tiers
  ('d0000000-0000-0000-0000-000000000011', 'e0000000-0000-0000-0000-000000000012', 'General',     'Acceso general al festival',                  35000, 120, 0,  5, 0, true),
  ('d0000000-0000-0000-0000-000000000012', 'e0000000-0000-0000-0000-000000000012', 'VIP',         'Acceso VIP + cerveza incluida',               55000, 40,  0,  3, 1, true);

