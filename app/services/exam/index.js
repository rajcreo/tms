const { get } = require('lodash');
const client = require('../../db/index');

module.exports = {
  getExamsList: async () => {
    console.log('you are in exam section');
    const query = 'SELECT * from "Exams"';
    const res = await client.query(query);
    return get(res, 'rows', null);
  },
  getExam: async (body, { id }) => {
    console.debug('requesting for examId:', id);
    const query = `SELECT * from "Exams" where id = '${id}'`;
    const res = await client.query(query);
    return get(res, 'rows.0', null);
  },
  addExam: async ({ name, subject, subjectId, duration }) => {
    console.debug('adding exam');
    const query = `SELECT count(*) from "Exams" where name = '${name}'`;
    const res = await client.query(query);
    const count = get(res, 'rows.0.count', null);

    if (count === '0') {
      const query = `INSERT INTO "Exams" (name, subject, "subjectId", duration) VALUES ('${name}', '${subject}', '${subjectId}', '${duration}') RETURNING id, name, subject, "subjectId", duration`;
      const res = await client.query(query);
      return get(res, 'rows.0', null);
    }else throw new Error('This Exam already exists');
  },
};
