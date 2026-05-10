import { neon } from '@neondatabase/serverless';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function auth(req) {
  const token = req.headers['x-admin-token'];
  return token === ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!auth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });

  const sql = neon(process.env.DATABASE_URL);

  // Ensure table exists
  await sql`
    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      published BOOLEAN NOT NULL DEFAULT false,
      chapter_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  try {
    // GET all chapters (admin sees drafts too)
    if (req.method === 'GET') {
      const chapters = await sql`
        SELECT * FROM chapters ORDER BY chapter_order ASC
      `;
      return res.status(200).json({ success: true, chapters });
    }

    // POST - create new chapter
    if (req.method === 'POST') {
      const { id, title, body, published, chapter_order } = req.body;
      await sql`
        INSERT INTO chapters (id, title, body, published, chapter_order)
        VALUES (${id}, ${title}, ${body}, ${published}, ${chapter_order})
      `;
      return res.status(200).json({ success: true });
    }

    // PUT - update chapter
    if (req.method === 'PUT') {
      const { id, title, body, published, chapter_order } = req.body;
      await sql`
        UPDATE chapters
        SET title = ${title},
            body = ${body},
            published = ${published},
            chapter_order = ${chapter_order},
            updated_at = NOW()
        WHERE id = ${id}
      `;
      return res.status(200).json({ success: true });
    }

    // DELETE - remove chapter
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await sql`DELETE FROM chapters WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    res.status(405).json({ success: false, error: 'Method not allowed' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}
