module.exports = (resolver) => async (req, res) => {
  try {
    const data = await resolver(req.body);
    res.send({ data });
  } catch (e) {
    console.error('error:', e.message);
    res.send({
      success: false,
      message: e.message,
    });
  }
};
