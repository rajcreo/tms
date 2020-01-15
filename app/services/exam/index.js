const { get, map } = require('lodash');
const client = require('../../db/index');

module.exports = {
  getExamsList: async () => {
    console.log('you are in exam section');
    const query = 'SELECT * FROM "Exams"';
    const res = await client.query(query);
    return get(res, 'rows', null);
  },
  getExam: async ({ params, user }) => {
    const { id } = params;
    console.debug('requesting for examId:', id, user);
    const query = `SELECT * FROM "Exams" WHERE id = '${id}'`;
    const res = await client.query(query);
    return get(res, 'rows.0', null);
  },
  addExam: async ({ body }) => {
    const { name, subject, subjectId, duration } = body;
    console.debug('adding exam');
    const query = `SELECT count(*) FROM "Exams" WHER name = '${name}'`;
    const res = await client.query(query);
    const count = get(res, 'rows.0.count', null);

    if (count === '0' || count === 0) {
      const query = `INSERT INTO "Exams" (name, subject, "subjectId", duration) VALUES ('${name}', '${subject}', '${subjectId}', '${duration}') RETURNING id, name, subject, "subjectId", duration`;
      const res = await client.query(query);
      return get(res, 'rows.0', null);
    } else throw new Error('Exam Name already exist');
  },
  updateExam: async ({ body, params }) => {
    const { id } = params;

    const colValArray = map(body, (val, key) => {
      return `"${key}"='${val}'`;
    });

    const query = `
      UPDATE "Exams"
      SET ${colValArray.join()}
      WHERE id='${id}' 
      RETURNING id, name, subject, "subjectId", duration
    `;

    console.debug('query:', query);

    const res = await client.query(query);
    return get(res, 'rows.0', null);
  },
  deleteExam: async ({ params }) => {
    const { id } = params;
    const query = `DELETE FROM "Exams" WHERE id = '${id}' RETURNING id, name, subject, "subjectId", duration`;
    console.debug('query::::', query);
    const res = await client.query(query);
    return get(res, 'rows.0', null);
  },
};

