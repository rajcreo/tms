module.exports = (resolver) => async (req, res) => {
  try {
    // console.log(req);
    const data = await resolver(req.body, req.params, req.query);
    res.send({ data, success: true });
  } catch (e) {
    console.error('error:', e.message);
    res.send({
      success: false,
      message: e.message,
    });
  }
};
